/**
 * Base Entity System
 * Simple entity-component architecture for game objects
 */

import { config } from '../config';

export interface Vector2 {
  x: number;
  y: number;
}

export interface Component {
  type: string;
  update?(dt: number): void;
  render?(ctx: CanvasRenderingContext2D): void;
}

export interface TransformComponent extends Component {
  type: 'transform';
  position: Vector2;
  rotation: number;
  scale: Vector2;
}

export interface PhysicsComponent extends Component {
  type: 'physics';
  velocity: Vector2;
  acceleration: Vector2;
  mass: number;
  friction: number;
}

export interface SpriteComponent extends Component {
  type: 'sprite';
  image?: HTMLImageElement;
  width: number;
  height: number;
  color: string;
}

export interface ColliderComponent extends Component {
  type: 'collider';
  width: number;
  height: number;
  isTrigger: boolean;
  onCollision?(other: Entity): void;
}

export interface HealthComponent extends Component {
  type: 'health';
  current: number;
  max: number;
  onDeath?(): void;
}

/**
 * Base Entity class
 */
export class Entity {
  public id: string;
  public active: boolean = true;
  public components: Map<string, Component> = new Map();
  
  constructor(id?: string) {
    this.id = id || `entity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  addComponent(component: Component): this {
    this.components.set(component.type, component);
    return this;
  }
  
  getComponent<T extends Component>(type: string): T | undefined {
    return this.components.get(type) as T;
  }
  
  hasComponent(type: string): boolean {
    return this.components.has(type);
  }
  
  removeComponent(type: string): void {
    this.components.delete(type);
  }
  
  update(dt: number): void {
    if (!this.active) return;
    
    for (const component of this.components.values()) {
      if (component.update) {
        component.update(dt);
      }
    }
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;
    
    for (const component of this.components.values()) {
      if (component.render) {
        component.render(ctx);
      }
    }
  }
  
  destroy(): void {
    this.active = false;
    this.components.clear();
  }
}

/**
 * Entity Factory - Creates common entity types
 */
export class EntityFactory {
  static createPlayer(x: number, y: number): Entity {
    const entity = new Entity('player');
    
    entity.addComponent({
      type: 'transform',
      position: { x, y },
      rotation: 0,
      scale: { x: 1, y: 1 },
    } as TransformComponent);
    
    entity.addComponent({
      type: 'physics',
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      mass: 1,
      friction: config.physics.friction,
    } as PhysicsComponent);
    
    entity.addComponent({
      type: 'sprite',
      width: config.player.size,
      height: config.player.size,
      color: config.player.color,
    } as SpriteComponent);
    
    entity.addComponent({
      type: 'collider',
      width: config.player.size,
      height: config.player.size,
      isTrigger: false,
    } as ColliderComponent);
    
    entity.addComponent({
      type: 'health',
      current: config.player.maxHealth,
      max: config.player.maxHealth,
    } as HealthComponent);
    
    return entity;
  }
  
  static createEnemy(x: number, y: number): Entity {
    const entity = new Entity();
    
    entity.addComponent({
      type: 'transform',
      position: { x, y },
      rotation: 0,
      scale: { x: 1, y: 1 },
    } as TransformComponent);
    
    entity.addComponent({
      type: 'physics',
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      mass: 1,
      friction: config.physics.friction,
    } as PhysicsComponent);
    
    entity.addComponent({
      type: 'sprite',
      width: config.enemy.size,
      height: config.enemy.size,
      color: config.enemy.color,
    } as SpriteComponent);
    
    entity.addComponent({
      type: 'collider',
      width: config.enemy.size,
      height: config.enemy.size,
      isTrigger: false,
    } as ColliderComponent);
    
    return entity;
  }
  
  static createPickup(x: number, y: number): Entity {
    const entity = new Entity();
    
    entity.addComponent({
      type: 'transform',
      position: { x, y },
      rotation: 0,
      scale: { x: 1, y: 1 },
    } as TransformComponent);
    
    entity.addComponent({
      type: 'sprite',
      width: config.pickup.size,
      height: config.pickup.size,
      color: config.pickup.color,
    } as SpriteComponent);
    
    entity.addComponent({
      type: 'collider',
      width: config.pickup.size,
      height: config.pickup.size,
      isTrigger: true,
    } as ColliderComponent);
    
    return entity;
  }
}

/**
 * Entity Manager - Manages all entities in the game
 */
export class EntityManager {
  private entities: Map<string, Entity> = new Map();
  
  add(entity: Entity): void {
    this.entities.set(entity.id, entity);
  }
  
  remove(id: string): void {
    const entity = this.entities.get(id);
    if (entity) {
      entity.destroy();
      this.entities.delete(id);
    }
  }
  
  get(id: string): Entity | undefined {
    return this.entities.get(id);
  }
  
  getAll(): Entity[] {
    return Array.from(this.entities.values());
  }
  
  getByComponent(componentType: string): Entity[] {
    return this.getAll().filter(e => e.hasComponent(componentType));
  }
  
  update(dt: number): void {
    for (const entity of this.entities.values()) {
      entity.update(dt);
    }
  }
  
  render(ctx: CanvasRenderingContext2D): void {
    for (const entity of this.entities.values()) {
      entity.render(ctx);
    }
  }
  
  clear(): void {
    for (const entity of this.entities.values()) {
      entity.destroy();
    }
    this.entities.clear();
  }
}
