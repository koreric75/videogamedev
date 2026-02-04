/**
 * Main Scene
 * Core gameplay scene with player, enemies, and pickups
 */

import { EntityManager, EntityFactory, Entity, HealthComponent } from '../core/entity';
import { PhysicsSystem } from '../core/physics';
import { RenderSystem } from '../core/render';
import { InputSystem } from '../core/input';
import { config } from '../config';

export enum GameState {
  PLAYING,
  PAUSED,
  GAME_OVER,
}

export class MainScene {
  private canvas: HTMLCanvasElement;
  private entityManager: EntityManager;
  private inputSystem: InputSystem;
  private player: Entity | null = null;
  private gameState: GameState = GameState.PLAYING;
  private score: number = 0;
  private enemySpawnTimer: number = 0;
  private pickupSpawnTimer: number = 0;
  private fps: number = 60;
  private frameCount: number = 0;
  private lastFpsUpdate: number = 0;
  
  // Room system properties
  private currentRoom: number = 0;
  private roomsCleared: Set<number> = new Set();
  private enemiesSpawnedInRoom: number = 0;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.entityManager = new EntityManager();
    this.inputSystem = new InputSystem(canvas);
    
    this.init();
  }
  
  private init(): void {
    // Create player at center
    const centerX = config.canvas.width / 2 - config.player.size / 2;
    const centerY = config.canvas.height / 2 - config.player.size / 2;
    this.player = EntityFactory.createPlayer(centerX, centerY);
    this.entityManager.add(this.player);
    
    // Setup player health callback
    const health = this.player.getComponent<HealthComponent>('health');
    if (health && health.onDeath) {
      health.onDeath = () => {
        this.gameState = GameState.GAME_OVER;
      };
    }
    
    // Spawn initial enemies for current room
    this.spawnRoomEnemies();
    
    // Spawn initial pickups
    this.spawnPickup();
  }
  
  update(dt: number): void {
    if (this.gameState === GameState.GAME_OVER) {
      // Check for restart input
      if (this.inputSystem.isKeyPressed('r')) {
        this.restart();
      }
      return;
    }
    
    if (this.gameState === GameState.PAUSED) {
      // Check for unpause
      if (this.inputSystem.isKeyPressed('p')) {
        this.gameState = GameState.PLAYING;
      }
      return;
    }
    
    // Check for pause
    if (this.inputSystem.isKeyPressed('p')) {
      this.gameState = GameState.PAUSED;
      return;
    }
    
    // Update player input
    this.updatePlayerInput(dt);
    
    // Update physics
    PhysicsSystem.update(this.entityManager.getAll(), dt);
    
    // Check collisions
    this.handleCollisions();
    
    // Update entities
    this.entityManager.update(dt);
    
    // Update enemy AI
    this.updateEnemies(dt);
    
    // Check if room is cleared
    this.checkRoomCleared();
    
    // Check for room transition input
    this.handleRoomTransition();
    
    // Spawn pickups periodically
    this.pickupSpawnTimer += dt;
    if (this.pickupSpawnTimer >= config.pickup.spawnInterval / 1000) {
      this.spawnPickup();
      this.pickupSpawnTimer = 0;
    }
    
    // Update FPS counter
    this.updateFPS(dt);
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    // Clear canvas
    RenderSystem.clear(ctx, config.canvas.width, config.canvas.height);
    
    // Render all entities
    RenderSystem.render(ctx, this.entityManager.getAll());
    
    // Render UI
    this.renderUI(ctx);
  }
  
  private updatePlayerInput(dt: number): void {
    if (!this.player) return;
    
    const physics = this.player.getComponent('physics');
    if (!physics) return;
    
    const horizontal = this.inputSystem.getHorizontal();
    const vertical = this.inputSystem.getVertical();
    
    // Apply movement
    physics.velocity.x = horizontal * config.player.speed;
    physics.velocity.y = vertical * config.player.speed;
  }
  
  private updateEnemies(dt: number): void {
    if (!this.player) return;
    
    const playerTransform = this.player.getComponent('transform');
    if (!playerTransform) return;
    
    const enemies = this.getEnemies();
    
    for (const enemy of enemies) {
      const transform = enemy.getComponent('transform');
      const physics = enemy.getComponent('physics');
      
      if (!transform || !physics) continue;
      
      // Move towards player
      const direction = PhysicsSystem.direction(
        transform.position,
        playerTransform.position
      );
      
      physics.velocity.x = direction.x * config.enemy.speed;
      physics.velocity.y = direction.y * config.enemy.speed;
    }
  }
  
  private handleCollisions(): void {
    if (!this.player) return;
    
    const entities = this.entityManager.getAll();
    
    for (const entity of entities) {
      if (entity.id === 'player' || !entity.active) continue;
      
      if (PhysicsSystem.isColliding(this.player, entity)) {
        const sprite = entity.getComponent('sprite');
        
        // Enemy collision
        if (sprite?.color === config.enemy.color) {
          const health = this.player.getComponent<HealthComponent>('health');
          if (health) {
            health.current -= config.enemy.damage;
            if (health.current <= 0) {
              health.current = 0;
              if (health.onDeath) {
                health.onDeath();
              }
            }
          }
        }
        
        // Pickup collision
        if (sprite?.color === config.pickup.color) {
          const health = this.player.getComponent<HealthComponent>('health');
          if (health) {
            health.current = Math.min(
              health.current + config.pickup.healAmount,
              health.max
            );
          }
          this.score += 10;
          this.entityManager.remove(entity.id);
        }
      }
    }
  }
  
  private spawnEnemy(): void {
    // Random position at edge of screen
    const side = Math.floor(Math.random() * 4);
    let x = 0;
    let y = 0;
    
    switch (side) {
      case 0: // Top
        x = Math.random() * config.canvas.width;
        y = -config.enemy.size;
        break;
      case 1: // Right
        x = config.canvas.width;
        y = Math.random() * config.canvas.height;
        break;
      case 2: // Bottom
        x = Math.random() * config.canvas.width;
        y = config.canvas.height;
        break;
      case 3: // Left
        x = -config.enemy.size;
        y = Math.random() * config.canvas.height;
        break;
    }
    
    const enemy = EntityFactory.createEnemy(x, y);
    this.entityManager.add(enemy);
  }
  
  private spawnPickup(): void {
    // Random position on screen
    const x = Math.random() * (config.canvas.width - config.pickup.size);
    const y = Math.random() * (config.canvas.height - config.pickup.size);
    
    const pickup = EntityFactory.createPickup(x, y);
    this.entityManager.add(pickup);
  }
  
  private renderUI(ctx: CanvasRenderingContext2D): void {
    // Render score
    RenderSystem.renderText(ctx, `Score: ${this.score}`, 10, 10, {
      color: '#ffffff',
      fontSize: 20,
    });
    
    // Render room information
    RenderSystem.renderText(ctx, `Room: ${this.currentRoom + 1}/${config.room.totalRooms}`, 10, 35, {
      color: '#ffffff',
      fontSize: 16,
    });
    
    // Render room status
    if (this.roomsCleared.has(this.currentRoom)) {
      RenderSystem.renderText(ctx, 'Room Cleared!', 10, 55, {
        color: '#00ff00',
        fontSize: 16,
      });
      
      // Show transition prompts
      if (this.currentRoom + 1 < config.room.totalRooms) {
        RenderSystem.renderText(ctx, 'Press E for next room', config.canvas.width / 2, config.canvas.height - 40, {
          color: '#00ff00',
          fontSize: 14,
          align: 'center',
        });
      }
      if (this.currentRoom > 0) {
        RenderSystem.renderText(ctx, 'Press Q for previous room', config.canvas.width / 2, config.canvas.height - 20, {
          color: '#00ff00',
          fontSize: 14,
          align: 'center',
        });
      }
    }
    
    // Render health bar
    if (this.player) {
      const health = this.player.getComponent<HealthComponent>('health');
      if (health) {
        RenderSystem.renderHealthBar(
          ctx,
          config.canvas.width - 160,
          config.canvas.height - 20,
          health.current,
          health.max,
          150,
          10
        );
      }
    }
    
    // Render FPS if debug enabled
    if (config.debug.showFPS) {
      RenderSystem.renderFPS(ctx, this.fps);
    }
    
    // Render game over screen
    if (this.gameState === GameState.GAME_OVER) {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
      
      RenderSystem.renderText(ctx, 'GAME OVER', config.canvas.width / 2, config.canvas.height / 2 - 40, {
        color: '#ff0000',
        fontSize: 48,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, `Final Score: ${this.score}`, config.canvas.width / 2, config.canvas.height / 2 + 20, {
        color: '#ffffff',
        fontSize: 24,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, 'Press R to Restart', config.canvas.width / 2, config.canvas.height / 2 + 60, {
        color: '#00ff00',
        fontSize: 18,
        align: 'center',
        baseline: 'middle',
      });
      
      ctx.restore();
    }
    
    // Render pause screen
    if (this.gameState === GameState.PAUSED) {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
      
      RenderSystem.renderText(ctx, 'PAUSED', config.canvas.width / 2, config.canvas.height / 2, {
        color: '#ffffff',
        fontSize: 48,
        align: 'center',
        baseline: 'middle',
      });
      
      ctx.restore();
    }
  }
  
  private updateFPS(dt: number): void {
    this.frameCount++;
    this.lastFpsUpdate += dt;
    
    if (this.lastFpsUpdate >= 1.0) {
      this.fps = this.frameCount / this.lastFpsUpdate;
      this.frameCount = 0;
      this.lastFpsUpdate = 0;
    }
  }
  
  private spawnRoomEnemies(): void {
    // Spawn enemies for the current room
    for (let i = 0; i < config.room.enemiesPerRoom; i++) {
      this.spawnEnemy();
      this.enemiesSpawnedInRoom++;
    }
  }
  
  private getEnemies(): Entity[] {
    return this.entityManager.getAll().filter(e => 
      e.id !== 'player' && e.hasComponent('physics') && 
      e.getComponent('sprite')?.color === config.enemy.color
    );
  }
  
  private checkRoomCleared(): void {
    // Count remaining enemies
    const enemies = this.getEnemies();
    
    // If all enemies defeated and room not already cleared
    if (enemies.length === 0 && this.enemiesSpawnedInRoom > 0 && !this.roomsCleared.has(this.currentRoom)) {
      this.roomsCleared.add(this.currentRoom);
    }
  }
  
  private handleRoomTransition(): void {
    // Check for room transition inputs
    // E key to go to next room
    if (this.inputSystem.isKeyPressed('e') && this.roomsCleared.has(this.currentRoom)) {
      const nextRoom = this.currentRoom + 1;
      if (nextRoom < config.room.totalRooms) {
        this.transitionToRoom(nextRoom);
      }
    }
    
    // Q key to go to previous room
    if (this.inputSystem.isKeyPressed('q') && this.roomsCleared.has(this.currentRoom)) {
      const prevRoom = this.currentRoom - 1;
      if (prevRoom >= 0) {
        this.transitionToRoom(prevRoom);
      }
    }
  }
  
  private transitionToRoom(roomNumber: number): void {
    // Clear current room enemies
    const enemies = this.getEnemies();
    enemies.forEach(enemy => this.entityManager.remove(enemy.id));
    
    // Update current room
    this.currentRoom = roomNumber;
    this.enemiesSpawnedInRoom = 0;
    
    // Spawn enemies if room not cleared yet (immediate respawn)
    if (!this.roomsCleared.has(this.currentRoom)) {
      this.spawnRoomEnemies();
    }
  }
  
  private restart(): void {
    this.entityManager.clear();
    this.gameState = GameState.PLAYING;
    this.score = 0;
    this.enemySpawnTimer = 0;
    this.pickupSpawnTimer = 0;
    this.currentRoom = 0;
    this.roomsCleared.clear();
    this.enemiesSpawnedInRoom = 0;
    this.inputSystem.clear();
    this.init();
  }
}
