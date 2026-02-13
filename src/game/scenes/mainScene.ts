/**
 * Main Scene
 * Core gameplay scene with player, enemies, and pickups
 */

import { EntityManager, EntityFactory, Entity, HealthComponent } from '../core/entity';
import { PhysicsSystem } from '../core/physics';
import { RenderSystem } from '../core/render';
import { InputSystem } from '../core/input';
import { config } from '../config';
import audioManager from '../core/audio';
import { MusicUploader } from '../ui/musicUploader';

export enum GameState {
  PLAYING,
  PAUSED,
  GAME_OVER,
  VICTORY,
  AWAITING_MUSIC,
}

export class MainScene {
  private canvas: HTMLCanvasElement;
  private entityManager: EntityManager;
  private inputSystem: InputSystem;
  private player: Entity | null = null;
  private gameState: GameState = GameState.AWAITING_MUSIC;
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
  
  // Fire realm properties
  private musicUploader: MusicUploader;
  private musicDuration: number = 0;
  private gameTimer: number = 0;
  private flamesExtinguished: number = 0;
  private totalFlames: number = 0;
  private musicFileName: string = '';
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.entityManager = new EntityManager();
    this.inputSystem = new InputSystem(canvas);
    
    // Create music uploader UI
    this.musicUploader = new MusicUploader(document.body);
    this.musicUploader.setOnMusicLoaded((file) => this.handleMusicUpload(file));
    
    this.init();
  }
  
  private async handleMusicUpload(file: File): Promise<void> {
    try {
      this.musicUploader.updateStatus('Loading music...', '#ffaa00');
      const duration = await audioManager.loadBackgroundMusic(file);
      this.musicDuration = duration;
      this.musicFileName = file.name;
      
      // Calculate total flames based on duration and room setup
      this.totalFlames = config.room.totalRooms * config.room.enemiesPerRoom;
      
      this.musicUploader.updateStatus(`Ready! Duration: ${Math.floor(duration)}s`, '#00ff00');
      
      // Hide uploader after brief delay and start game
      setTimeout(() => {
        this.musicUploader.hide();
        this.startGame();
      }, 2000);
    } catch (e) {
      this.musicUploader.updateStatus('Failed to load music. Try again.', '#ff0000');
    }
  }
  
  private startGame(): void {
    this.gameState = GameState.PLAYING;
    audioManager.playBackgroundMusic();
    this.gameTimer = 0;
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
    // Handle awaiting music state
    if (this.gameState === GameState.AWAITING_MUSIC) {
      return;
    }
    
    if (this.gameState === GameState.GAME_OVER || this.gameState === GameState.VICTORY) {
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
    
    // Update game timer
    this.gameTimer += dt;
    
    // Check if time is up
    if (this.musicDuration > 0 && this.gameTimer >= this.musicDuration) {
      // Time's up - check if all flames extinguished
      if (this.flamesExtinguished >= this.totalFlames) {
        this.gameState = GameState.VICTORY;
      } else {
        this.gameState = GameState.GAME_OVER;
      }
      audioManager.stopBackgroundMusic();
      return;
    }
    
    // Update player input
    this.updatePlayerInput(dt);
    
    // Update music quality based on player health
    if (this.player) {
      const health = this.player.getComponent<HealthComponent>('health');
      if (health) {
        const healthPercent = health.current / health.max;
        audioManager.updateMusicQuality(healthPercent);
      }
    }
    
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
    // Clear canvas with fire realm theme
    if (this.gameState === GameState.AWAITING_MUSIC) {
      RenderSystem.clear(ctx, config.canvas.width, config.canvas.height);
    } else {
      // Fire realm background - dark red/orange gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, config.canvas.height);
      gradient.addColorStop(0, '#2a0a0a');
      gradient.addColorStop(0.5, '#4a1010');
      gradient.addColorStop(1, '#6a1a0a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
    }
    
    // Render all entities
    RenderSystem.render(ctx, this.entityManager.getAll());
    
    // Render UI
    this.renderUI(ctx);
  }
  
  private updatePlayerInput(_dt: number): void {
    if (!this.player) return;
    
    const physics = this.player.getComponent('physics');
    if (!physics) return;
    
    const horizontal = this.inputSystem.getHorizontal();
    const vertical = this.inputSystem.getVertical();
    
    // Apply movement
    physics.velocity.x = horizontal * config.player.speed;
    physics.velocity.y = vertical * config.player.speed;
  }
  
  private updateEnemies(_dt: number): void {
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
        
        // Enemy collision (flames in fire realm)
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
          // Remove enemy and count as flame extinguished
          this.entityManager.remove(entity.id);
          this.flamesExtinguished++;
          this.score += 20;
        }
        
        // Pickup collision (water/grass restoration)
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
    // Render awaiting music screen
    if (this.gameState === GameState.AWAITING_MUSIC) {
      ctx.save();
      ctx.fillStyle = 'rgba(20, 10, 0, 0.9)';
      ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
      
      RenderSystem.renderText(ctx, '🔥 ANCIENT FIRE REALM 🔥', config.canvas.width / 2, config.canvas.height / 2 - 80, {
        color: '#ff6600',
        fontSize: 36,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, 'Upload a song to begin your quest', config.canvas.width / 2, config.canvas.height / 2 - 20, {
        color: '#ffffff',
        fontSize: 18,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, 'Song length = Time to extinguish all flames', config.canvas.width / 2, config.canvas.height / 2 + 10, {
        color: '#aaaaaa',
        fontSize: 14,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, 'Music degrades as you weaken, recovers as you heal', config.canvas.width / 2, config.canvas.height / 2 + 35, {
        color: '#aaaaaa',
        fontSize: 14,
        align: 'center',
        baseline: 'middle',
      });
      
      ctx.restore();
      return;
    }
    
    // Render score
    RenderSystem.renderText(ctx, `Score: ${this.score}`, 10, 10, {
      color: '#ffffff',
      fontSize: 20,
    });
    
    // Render timer
    const timeRemaining = Math.max(0, this.musicDuration - this.gameTimer);
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = Math.floor(timeRemaining % 60);
    const timeColor = timeRemaining < 30 ? '#ff0000' : timeRemaining < 60 ? '#ffaa00' : '#00ff00';
    RenderSystem.renderText(ctx, `⏱️ ${minutes}:${seconds.toString().padStart(2, '0')}`, 10, 35, {
      color: timeColor,
      fontSize: 18,
    });
    
    // Render fire realm progress
    RenderSystem.renderText(ctx, `🔥 Flames: ${this.flamesExtinguished}/${this.totalFlames}`, 10, 60, {
      color: '#ff8800',
      fontSize: 16,
    });
    
    // Render music info
    RenderSystem.renderText(ctx, `♫ ${this.musicFileName}`, config.canvas.width / 2, 10, {
      color: '#cccccc',
      fontSize: 12,
      align: 'center',
    });
    
    // Render room information
    RenderSystem.renderText(ctx, `Realm: ${this.currentRoom + 1}/${config.room.totalRooms}`, 10, 85, {
      color: '#ffffff',
      fontSize: 16,
    });
    
    // Render room status
    if (this.roomsCleared.has(this.currentRoom)) {
      RenderSystem.renderText(ctx, 'Realm Cleared!', 10, 105, {
        color: '#00ff00',
        fontSize: 16,
      });
      
      // Show transition prompts
      if (this.currentRoom + 1 < config.room.totalRooms) {
        RenderSystem.renderText(ctx, 'Press E for next realm', config.canvas.width / 2, config.canvas.height - 40, {
          color: '#00ff00',
          fontSize: 14,
          align: 'center',
        });
      }
      if (this.currentRoom > 0) {
        RenderSystem.renderText(ctx, 'Press Q for previous realm', config.canvas.width / 2, config.canvas.height - 20, {
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
    
    // Render victory screen
    if (this.gameState === GameState.VICTORY) {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 50, 0, 0.8)';
      ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
      
      RenderSystem.renderText(ctx, '🌿 VICTORY! 🌿', config.canvas.width / 2, config.canvas.height / 2 - 60, {
        color: '#00ff00',
        fontSize: 48,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, 'The Fire Realm is Restored!', config.canvas.width / 2, config.canvas.height / 2 - 10, {
        color: '#88ff88',
        fontSize: 24,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, `Flames Extinguished: ${this.flamesExtinguished}/${this.totalFlames}`, config.canvas.width / 2, config.canvas.height / 2 + 20, {
        color: '#ffffff',
        fontSize: 20,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, `Final Score: ${this.score}`, config.canvas.width / 2, config.canvas.height / 2 + 50, {
        color: '#ffffff',
        fontSize: 20,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, 'Press R to Restart', config.canvas.width / 2, config.canvas.height / 2 + 90, {
        color: '#00ff00',
        fontSize: 18,
        align: 'center',
        baseline: 'middle',
      });
      
      ctx.restore();
    }
    
    // Render game over screen
    if (this.gameState === GameState.GAME_OVER) {
      ctx.save();
      ctx.fillStyle = 'rgba(50, 0, 0, 0.8)';
      ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
      
      RenderSystem.renderText(ctx, '🔥 TIME\'S UP! 🔥', config.canvas.width / 2, config.canvas.height / 2 - 60, {
        color: '#ff0000',
        fontSize: 48,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, 'The Fire Realm Consumes All', config.canvas.width / 2, config.canvas.height / 2 - 10, {
        color: '#ff8888',
        fontSize: 24,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, `Flames Extinguished: ${this.flamesExtinguished}/${this.totalFlames}`, config.canvas.width / 2, config.canvas.height / 2 + 20, {
        color: '#ffffff',
        fontSize: 20,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, `Final Score: ${this.score}`, config.canvas.width / 2, config.canvas.height / 2 + 50, {
        color: '#ffffff',
        fontSize: 20,
        align: 'center',
        baseline: 'middle',
      });
      
      RenderSystem.renderText(ctx, 'Press R to Restart', config.canvas.width / 2, config.canvas.height / 2 + 90, {
        color: '#ff0000',
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
    this.gameState = GameState.AWAITING_MUSIC;
    this.score = 0;
    this.enemySpawnTimer = 0;
    this.pickupSpawnTimer = 0;
    this.currentRoom = 0;
    this.roomsCleared.clear();
    this.enemiesSpawnedInRoom = 0;
    this.gameTimer = 0;
    this.flamesExtinguished = 0;
    this.musicDuration = 0;
    this.musicFileName = '';
    this.inputSystem.clear();
    
    // Stop any playing music
    audioManager.stopBackgroundMusic();
    
    // Show music uploader again
    this.musicUploader.show();
    this.musicUploader.updateStatus('No music selected', '#aaaaaa');
    
    this.init();
  }
}
