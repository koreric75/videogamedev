/**
 * Physics System
 * Handles physics updates and collision detection
 */

import { Entity, TransformComponent, PhysicsComponent, ColliderComponent, Vector2 } from './entity';
import { config } from '../config';

export interface AABB {
  x: number;
  y: number;
  width: number;
  height: number;
}

export class PhysicsSystem {
  /**
   * Update physics for all entities
   */
  static update(entities: Entity[], dt: number): void {
    for (const entity of entities) {
      if (!entity.active) continue;
      
      const transform = entity.getComponent<TransformComponent>('transform');
      const physics = entity.getComponent<PhysicsComponent>('physics');
      
      if (!transform || !physics) continue;
      
      // Apply acceleration to velocity
      physics.velocity.x += physics.acceleration.x * dt;
      physics.velocity.y += physics.acceleration.y * dt;
      
      // Apply friction
      physics.velocity.x *= physics.friction;
      physics.velocity.y *= physics.friction;
      
      // Clamp velocity to max
      const maxVel = config.physics.maxVelocity;
      const speed = Math.sqrt(physics.velocity.x ** 2 + physics.velocity.y ** 2);
      if (speed > maxVel) {
        physics.velocity.x = (physics.velocity.x / speed) * maxVel;
        physics.velocity.y = (physics.velocity.y / speed) * maxVel;
      }
      
      // Update position
      transform.position.x += physics.velocity.x * dt;
      transform.position.y += physics.velocity.y * dt;
      
      // Keep within canvas bounds
      const canvasWidth = config.canvas.width;
      const canvasHeight = config.canvas.height;
      const sprite = entity.getComponent('sprite');
      const size = sprite ? (sprite as any).width : 32;
      
      if (transform.position.x < 0) {
        transform.position.x = 0;
        physics.velocity.x = 0;
      }
      if (transform.position.x > canvasWidth - size) {
        transform.position.x = canvasWidth - size;
        physics.velocity.x = 0;
      }
      if (transform.position.y < 0) {
        transform.position.y = 0;
        physics.velocity.y = 0;
      }
      if (transform.position.y > canvasHeight - size) {
        transform.position.y = canvasHeight - size;
        physics.velocity.y = 0;
      }
    }
  }
  
  /**
   * Check and resolve collisions between entities
   */
  static checkCollisions(entities: Entity[]): void {
    const collidableEntities = entities.filter(e => 
      e.active && e.hasComponent('transform') && e.hasComponent('collider')
    );
    
    for (let i = 0; i < collidableEntities.length; i++) {
      for (let j = i + 1; j < collidableEntities.length; j++) {
        const entityA = collidableEntities[i];
        const entityB = collidableEntities[j];
        
        if (this.isColliding(entityA, entityB)) {
          const colliderA = entityA.getComponent<ColliderComponent>('collider');
          const colliderB = entityB.getComponent<ColliderComponent>('collider');
          
          // Call collision callbacks
          if (colliderA?.onCollision) {
            colliderA.onCollision(entityB);
          }
          if (colliderB?.onCollision) {
            colliderB.onCollision(entityA);
          }
          
          // Resolve collision if not triggers
          if (!colliderA?.isTrigger && !colliderB?.isTrigger) {
            this.resolveCollision(entityA, entityB);
          }
        }
      }
    }
  }
  
  /**
   * Check if two entities are colliding (AABB)
   */
  static isColliding(entityA: Entity, entityB: Entity): boolean {
    const transformA = entityA.getComponent<TransformComponent>('transform');
    const transformB = entityB.getComponent<TransformComponent>('transform');
    const colliderA = entityA.getComponent<ColliderComponent>('collider');
    const colliderB = entityB.getComponent<ColliderComponent>('collider');
    
    if (!transformA || !transformB || !colliderA || !colliderB) {
      return false;
    }
    
    const aabbA: AABB = {
      x: transformA.position.x,
      y: transformA.position.y,
      width: colliderA.width,
      height: colliderA.height,
    };
    
    const aabbB: AABB = {
      x: transformB.position.x,
      y: transformB.position.y,
      width: colliderB.width,
      height: colliderB.height,
    };
    
    return (
      aabbA.x < aabbB.x + aabbB.width &&
      aabbA.x + aabbA.width > aabbB.x &&
      aabbA.y < aabbB.y + aabbB.height &&
      aabbA.y + aabbA.height > aabbB.y
    );
  }
  
  /**
   * Resolve collision between two entities
   */
  static resolveCollision(entityA: Entity, entityB: Entity): void {
    const transformA = entityA.getComponent<TransformComponent>('transform');
    const transformB = entityB.getComponent<TransformComponent>('transform');
    const physicsA = entityA.getComponent<PhysicsComponent>('physics');
    const physicsB = entityB.getComponent<PhysicsComponent>('physics');
    const colliderA = entityA.getComponent<ColliderComponent>('collider');
    const colliderB = entityB.getComponent<ColliderComponent>('collider');
    
    if (!transformA || !transformB || !colliderA || !colliderB) return;
    
    // Calculate overlap
    const overlapX = Math.min(
      transformA.position.x + colliderA.width - transformB.position.x,
      transformB.position.x + colliderB.width - transformA.position.x
    );
    
    const overlapY = Math.min(
      transformA.position.y + colliderA.height - transformB.position.y,
      transformB.position.y + colliderB.height - transformA.position.y
    );
    
    // Separate on the axis with smallest overlap
    if (overlapX < overlapY) {
      const separationX = overlapX / 2;
      if (transformA.position.x < transformB.position.x) {
        transformA.position.x -= separationX;
        transformB.position.x += separationX;
      } else {
        transformA.position.x += separationX;
        transformB.position.x -= separationX;
      }
      
      // Stop horizontal velocity
      if (physicsA) physicsA.velocity.x = 0;
      if (physicsB) physicsB.velocity.x = 0;
    } else {
      const separationY = overlapY / 2;
      if (transformA.position.y < transformB.position.y) {
        transformA.position.y -= separationY;
        transformB.position.y += separationY;
      } else {
        transformA.position.y += separationY;
        transformB.position.y -= separationY;
      }
      
      // Stop vertical velocity
      if (physicsA) physicsA.velocity.y = 0;
      if (physicsB) physicsB.velocity.y = 0;
    }
  }
  
  /**
   * Get distance between two positions
   */
  static distance(a: Vector2, b: Vector2): number {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  /**
   * Get direction vector from A to B
   */
  static direction(from: Vector2, to: Vector2): Vector2 {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    if (length === 0) return { x: 0, y: 0 };
    
    return {
      x: dx / length,
      y: dy / length,
    };
  }
}
