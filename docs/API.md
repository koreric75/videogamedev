# API Documentation

This document provides detailed API reference for the Ruins of Arkan game engine.

## Table of Contents

- [Core Systems](#core-systems)
  - [Entity System](#entity-system)
  - [Physics System](#physics-system)
  - [Render System](#render-system)
  - [Input System](#input-system)
  - [Audio System](#audio-system)
  - [Asset Manager](#asset-manager)
- [Game Engine](#game-engine)
- [Configuration](#configuration)
- [Components](#components)
- [Utilities](#utilities)

## Core Systems

### Entity System

The entity system provides the foundation for creating and managing game objects using the Entity-Component-System (ECS) pattern.

#### `Entity`

An entity is a unique identifier (number) that references a game object.

```typescript
type Entity = number;
```

#### `Component`

Components are data containers attached to entities.

```typescript
interface Component {
  type: string;
  [key: string]: any;
}
```

#### Common Components

**Transform Component**
```typescript
interface Vector2 {
  x: number;
  y: number;
}

interface Transform extends Component {
  type: 'transform';
  position: Vector2;  // Position in pixels
  rotation: number;   // Rotation in radians
  scale: Vector2;     // Scale factors
}
```

**Physics Component**
```typescript
interface Physics extends Component {
  type: 'physics';
  velocity: Vector2;      // Current velocity in pixels/second
  acceleration: Vector2;  // Current acceleration in pixels/second^2
  mass: number;           // Mass (affects physics calculations)
  friction: number;       // Friction coefficient applied to motion
}
```

**Sprite Component**
```typescript
interface Sprite extends Component {
  type: 'sprite';
  image: HTMLImageElement | null;
  width: number;
  height: number;
  color: string;      // Fallback color if no image
}
```

**Collider Component**
```typescript
interface Collider extends Component {
  type: 'collider';
  width: number;
  height: number;
  isTrigger: boolean;     // True for non-physical collisions
  onCollision?: (other: Entity) => void;
}
```

**Health Component**
```typescript
interface Health extends Component {
  type: 'health';
  current: number;
  max: number;
  onDamage?: (amount: number) => void;
  onDeath?: () => void;
}
```

### Physics System

Handles physics simulation and collision detection.

#### Methods

**`update(deltaTime: number): void`**

Updates physics for all entities with physics components.

Parameters:
- `deltaTime` - Time elapsed since last frame in seconds

Example:
```typescript
physicsSystem.update(0.016); // ~60 FPS
```

**`detectCollision(entity1: Entity, entity2: Entity): boolean`**

Checks if two entities are colliding.

Parameters:
- `entity1` - First entity to check
- `entity2` - Second entity to check

Returns:
- `true` if entities are colliding, `false` otherwise

Example:
```typescript
const isColliding = physicsSystem.detectCollision(player, enemy);
```

**`resolveCollision(entity1: Entity, entity2: Entity): void`**

Resolves collision between two entities (separates them).

Parameters:
- `entity1` - First colliding entity
- `entity2` - Second colliding entity

### Render System

Manages rendering of sprites, debug visuals, and UI elements.

#### Methods

**`render(ctx: CanvasRenderingContext2D): void`**

Renders all entities with sprite components.

Parameters:
- `ctx` - Canvas 2D rendering context

Example:
```typescript
renderSystem.render(canvasContext);
```

**`setCamera(x: number, y: number): void`**

Sets camera position for viewport scrolling.

Parameters:
- `x` - Camera X position
- `y` - Camera Y position

**`drawSprite(ctx: CanvasRenderingContext2D, entity: Entity): void`**

Draws a single entity sprite.

Parameters:
- `ctx` - Canvas 2D rendering context
- `entity` - Entity to render

### Input System

Centralized input handling for keyboard, mouse, and touch.

#### Methods

**`update(): void`**

Updates input state (call once per frame).

**`isKeyDown(key: string): boolean`**

Check if a key is currently pressed.

Parameters:
- `key` - Key code (e.g., 'w', 'ArrowUp', ' ')

Returns:
- `true` if key is down, `false` otherwise

Example:
```typescript
if (inputSystem.isKeyDown('w')) {
  // Move player up
}
```

**`isKeyPressed(key: string): boolean`**

Check if a key was just pressed this frame.

Parameters:
- `key` - Key code

Returns:
- `true` if key was just pressed, `false` otherwise

**`getMousePosition(): { x: number; y: number }`**

Get current mouse position relative to canvas.

Returns:
- Object with `x` and `y` coordinates

**`isMouseDown(button: number): boolean`**

Check if mouse button is pressed.

Parameters:
- `button` - Mouse button (0 = left, 1 = middle, 2 = right)

Returns:
- `true` if button is down, `false` otherwise

**`getTouchPosition(touchIndex: number): { x: number; y: number } | null`**

Get position of a specific touch.

Parameters:
- `touchIndex` - Touch index (0 for first touch)

Returns:
- Position object or `null` if touch doesn't exist

### Audio System

Manages game audio playback.

#### Methods

**`loadSound(name: string, path: string): Promise<void>`**

Load an audio file.

Parameters:
- `name` - Sound identifier
- `path` - Path to audio file

Example:
```typescript
await audioSystem.loadSound('pickup', 'assets/audio/pickup.mp3');
```

**`play(name: string): void`**

Play a loaded sound effect.

Parameters:
- `name` - Sound identifier

Example:
```typescript
audioManager.play('pickup');
```

**`setVolume(volume: number): void`**

Set volume for all audio.

Parameters:
- `volume` - Volume level (0.0 to 1.0)

Example:
```typescript
audioManager.setVolume(0.7);
```

**`setEnabled(enabled: boolean): void`**

Enable or disable audio playback.

Parameters:
- `enabled` - Whether audio should be enabled

Example:
```typescript
audioManager.setEnabled(false);
```

### Asset Manager

Handles loading and caching of game assets.

#### Methods

**`loadImage(path: string): Promise<HTMLImageElement>`**

Load an image asset.

Parameters:
- `path` - Path to image file

Returns:
- Promise that resolves to loaded image

Example:
```typescript
const playerSprite = await assetManager.loadImage('assets/sprites/player.png');
```

**`loadImages(paths: string[]): Promise<HTMLImageElement[]>`**

Load multiple images.

Parameters:
- `paths` - Array of image paths

Returns:
- Promise that resolves to array of loaded images

**`getImage(path: string): HTMLImageElement | null`**

Get a previously loaded image from cache.

Parameters:
- `path` - Path to image file

Returns:
- Cached image or `null` if not loaded

## Game Engine

The main game engine that manages the game loop and scene.

### `GameEngine`

#### Constructor

```typescript
new GameEngine()
```

Creates a new game engine instance, initializes canvas, and sets up the game loop.

#### Methods

**`start(): void`**

Starts the game loop.

Example:
```typescript
const gameEngine = new GameEngine();
gameEngine.start();
```

**`stop(): void`**

Stops the game loop.

**`getCanvas(): HTMLCanvasElement`**

Returns the game canvas element.

**`getContext(): CanvasRenderingContext2D`**

Returns the canvas 2D rendering context.

## Configuration

All game configuration is centralized in the `config` object.

### `GameConfig`

```typescript
interface GameConfig {
  canvas: {
    width: number;
    height: number;
    backgroundColor: string;
  };
  player: {
    speed: number;
    maxHealth: number;
    size: number;
    color: string;
  };
  enemy: {
    speed: number;
    damage: number;
    size: number;
    color: string;
    spawnInterval: number;
  };
  pickup: {
    healAmount: number;
    size: number;
    color: string;
    spawnInterval: number;
  };
  physics: {
    friction: number;
    maxVelocity: number;
  };
  ui: {
    joystickSize: number;
    buttonSize: number;
    fontSize: number;
  };
  assets: {
    placeholderSize: number;
    spritesPath: string;
    audioPath: string;
  };
  debug: {
    showFPS: boolean;
    showColliders: boolean;
    enableInspector: boolean;
  };
}
```

### Functions

**`getConfig(path: string): unknown`**

Get a configuration value by dot-separated path.

Parameters:
- `path` - Configuration path (e.g., 'player.speed')

Returns:
- Configuration value or `undefined` if not found

Example:
```typescript
const playerSpeed = getConfig('player.speed'); // 200
```

**`setConfig(path: string, value: unknown): void`**

Set a configuration value at runtime.

Parameters:
- `path` - Configuration path
- `value` - New value to set

Example:
```typescript
setConfig('debug.showFPS', true);
```

## Components

### Creating Custom Components

Components should be simple data containers:

```typescript
interface MyComponent extends Component {
  type: 'mycomponent';
  myProperty: string;
  myNumber: number;
}
```

### Adding Components to Entities

Components are typically added through factory functions:

```typescript
function createPlayer(x: number, y: number): Entity {
  const entity = new Entity();
  
  entity.addComponent({
    type: 'transform',
    position: { x, y },
    rotation: 0,
    scale: { x: 1, y: 1 }
  });
  
  entity.addComponent({
    type: 'physics',
    velocity: { x: 0, y: 0 },
    acceleration: { x: 0, y: 0 },
    mass: 1,
    friction: 0.8
  });
  
  return entity;
}
```

## Utilities

### EntityFactory

Static methods for creating game entities. (Note: The actual EntityFactory in the codebase provides these create methods.)

**`EntityFactory.createPlayer(x: number, y: number): Entity`**

Create a player entity at the specified position.

**`EntityFactory.createEnemy(x: number, y: number): Entity`**

Create an enemy entity at the specified position.

**`EntityFactory.createPickup(x: number, y: number): Entity`**

Create a pickup entity at the specified position.

### Math Utilities

Common math functions for game development.

**`clamp(value: number, min: number, max: number): number`**

Clamp a value between min and max.

**`lerp(start: number, end: number, t: number): number`**

Linear interpolation between two values.

**`distance(x1: number, y1: number, x2: number, y2: number): number`**

Calculate distance between two points.

**`randomRange(min: number, max: number): number`**

Generate a random number in range [min, max].

## Examples

### Creating a New Entity Type

```typescript
function createPowerUp(x: number, y: number, powerType: string): Entity {
  const entity = new Entity();
  
  entity.addComponent({
    type: 'transform',
    position: { x, y },
    rotation: 0,
    scale: { x: 1, y: 1 }
  });
  
  entity.addComponent({
    type: 'sprite',
    image: null,
    width: config.pickup.size,
    height: config.pickup.size,
    color: '#ffdd00'
  });
  
  entity.addComponent({
    type: 'collider',
    width: config.pickup.size,
    height: config.pickup.size,
    isTrigger: true,
    onCollision: (other: Entity) => {
      // Apply power-up effect
      console.log(`Power-up collected: ${powerType}`);
    }
  });
  
  return entity;
}
```

### Implementing a New System

```typescript
class WeaponSystem {
  private entities: Entity[] = [];
  
  addEntity(entity: Entity): void {
    this.entities.push(entity);
  }
  
  update(deltaTime: number): void {
    for (const entity of this.entities) {
      const weapon = entity.getComponent<WeaponComponent>('weapon');
      if (!weapon) continue;
      
      // Update weapon cooldown
      if (weapon.cooldown > 0) {
        weapon.cooldown -= deltaTime;
      }
    }
  }
  
  fire(entity: Entity): void {
    const weapon = entity.getComponent<WeaponComponent>('weapon');
    if (!weapon || weapon.cooldown > 0) return;
    
    // Create projectile
    const transform = entity.getComponent<TransformComponent>('transform');
    if (transform) {
      createProjectile(transform.position.x, transform.position.y);
    }
    
    // Reset cooldown
    weapon.cooldown = weapon.fireRate;
  }
}
```

## Version History

- **v1.0.0** - Initial API documentation
