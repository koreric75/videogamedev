/**
 * Rendering System
 * Handles rendering of entities with sprites, shapes, and debug visuals
 */

import { Entity, TransformComponent, SpriteComponent, ColliderComponent } from './entity';
import { config } from '../config';

export class RenderSystem {
  /**
   * Render all entities
   */
  static render(ctx: CanvasRenderingContext2D, entities: Entity[]): void {
    for (const entity of entities) {
      if (!entity.active) continue;
      
      const transform = entity.getComponent<TransformComponent>('transform');
      const sprite = entity.getComponent<SpriteComponent>('sprite');
      
      if (!transform || !sprite) continue;
      
      ctx.save();
      
      // Apply transform
      ctx.translate(transform.position.x, transform.position.y);
      ctx.rotate(transform.rotation);
      ctx.scale(transform.scale.x, transform.scale.y);
      
      // Render sprite or placeholder
      if (sprite.image) {
        ctx.drawImage(
          sprite.image,
          0,
          0,
          sprite.width,
          sprite.height
        );
      } else {
        // Draw colored rectangle as placeholder
        ctx.fillStyle = sprite.color;
        ctx.fillRect(0, 0, sprite.width, sprite.height);
      }
      
      ctx.restore();
      
      // Debug: Render colliders if enabled
      if (config.debug.showColliders) {
        this.renderCollider(ctx, entity);
      }
    }
  }
  
  /**
   * Render entity collider for debugging
   */
  static renderCollider(ctx: CanvasRenderingContext2D, entity: Entity): void {
    const transform = entity.getComponent<TransformComponent>('transform');
    const collider = entity.getComponent<ColliderComponent>('collider');
    
    if (!transform || !collider) return;
    
    ctx.save();
    ctx.strokeStyle = collider.isTrigger ? '#00ff00' : '#ff0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      transform.position.x,
      transform.position.y,
      collider.width,
      collider.height
    );
    ctx.restore();
  }
  
  /**
   * Clear the canvas
   */
  static clear(ctx: CanvasRenderingContext2D, width: number, height: number): void {
    ctx.fillStyle = config.canvas.backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }
  
  /**
   * Render UI text
   */
  static renderText(
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    options?: {
      color?: string;
      fontSize?: number;
      align?: CanvasTextAlign;
      baseline?: CanvasTextBaseline;
    }
  ): void {
    ctx.save();
    ctx.fillStyle = options?.color || '#ffffff';
    ctx.font = `${options?.fontSize || config.ui.fontSize}px Arial`;
    ctx.textAlign = options?.align || 'left';
    ctx.textBaseline = options?.baseline || 'top';
    ctx.fillText(text, x, y);
    ctx.restore();
  }
  
  /**
   * Render FPS counter
   */
  static renderFPS(ctx: CanvasRenderingContext2D, fps: number): void {
    this.renderText(ctx, `FPS: ${fps.toFixed(0)}`, 10, 10, {
      color: '#00ff00',
      fontSize: 14,
    });
  }
  
  /**
   * Render health bar
   */
  static renderHealthBar(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    current: number,
    max: number,
    width: number = 100,
    height: number = 10
  ): void {
    ctx.save();
    
    // Background
    ctx.fillStyle = '#333333';
    ctx.fillRect(x, y, width, height);
    
    // Health
    const healthWidth = (current / max) * width;
    const healthColor = current > max * 0.6 ? '#00ff00' : current > max * 0.3 ? '#ffff00' : '#ff0000';
    ctx.fillStyle = healthColor;
    ctx.fillRect(x, y, healthWidth, height);
    
    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
    
    ctx.restore();
  }
}
