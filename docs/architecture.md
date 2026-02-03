# Architecture Documentation

## Overview

This document describes the architecture of the "Ruins of Arkan" game, a 2D top-down roguelite built with TypeScript and HTML5 Canvas.

## Architecture Pattern

The game uses an **Entity-Component-System (ECS)** architecture combined with a **Scene-based** structure.

### Key Principles

1. **Separation of Concerns**: Game logic, rendering, physics, and input are handled by separate systems
2. **Composition over Inheritance**: Entities are composed of components rather than using deep inheritance hierarchies
3. **Dependency Injection**: Systems receive dependencies through constructors
4. **Configuration Management**: All game constants are centralized in a single configuration file
5. **Data-Oriented Design**: Components are pure data, systems contain all logic
6. **Loose Coupling**: Systems communicate through entities and components, not direct references

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Game Engine                              │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                     Game Loop (60 FPS)                     │ │
│  └────────────────────────────────────────────────────────────┘ │
│         │                  │                  │                  │
│         ▼                  ▼                  ▼                  │
│  ┌──────────┐      ┌──────────┐      ┌──────────┐              │
│  │  Scene   │      │  Input   │      │  Config  │              │
│  │ Manager  │      │  System  │      │  System  │              │
│  └──────────┘      └──────────┘      └──────────┘              │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                         Main Scene                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                │
│  │  Physics   │  │  Render    │  │   Audio    │                │
│  │  System    │  │  System    │  │   System   │                │
│  └────────────┘  └────────────┘  └────────────┘                │
│         │                │                │                      │
│         └────────────────┴────────────────┘                      │
│                          │                                       │
│                          ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                 Entity Manager                            │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐         │  │
│  │  │ Player │  │ Enemy  │  │ Enemy  │  │ Pickup │   ...   │  │
│  │  └────────┘  └────────┘  └────────┘  └────────┘         │  │
│  │                                                            │  │
│  │  Each Entity = Components (Transform, Physics, etc.)      │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Core Systems

### 1. Entity System

The entity system provides the foundation for all game objects.

**Purpose**: Manage game entities and their components

**Key Concepts**:
- **Entity**: A unique ID (number) representing a game object
- **Component**: Data container attached to an entity
- **Entity Manager**: Creates, destroys, and tracks entities

**Implementation**:
```typescript
// Entity is just an ID
type Entity = number;

// Components are data
interface Transform {
  x: number;
  y: number;
  rotation: number;
}

// Entity has multiple components
const player: Entity = new Entity();
player.addComponent(transform);
player.addComponent(physics);
player.addComponent(sprite);
```

**Benefits**:
- Flexible composition
- Easy to add/remove features
- Memory efficient
- Cache-friendly data layout

### 2. Physics System

Handles collision detection and physics updates.

**Purpose**: Simulate physics and detect collisions

**Responsibilities**:
- Update entity positions based on velocity
- Apply friction and forces
- Detect collisions between entities
- Resolve collisions (separation)
- Trigger collision callbacks

**Algorithm**:
1. Update velocities based on forces
2. Apply friction
3. Update positions
4. Detect collisions (AABB or circle)
5. Resolve overlaps
6. Fire collision events

**Collision Detection**:
- **AABB**: Axis-Aligned Bounding Box (fast, simple)
- **Circle**: Distance-based (used for most entities)
- **Broad Phase**: Spatial partitioning for optimization

### 3. Rendering System

Manages all rendering operations.

**Purpose**: Draw entities and UI to the canvas

**Responsibilities**:
- Clear canvas each frame
- Render entities with sprites
- Draw debug visualizations
- Render UI overlays
- Handle camera transformations

**Rendering Pipeline**:
1. Clear canvas
2. Apply camera transform
3. Draw background
4. Draw entities (sorted by layer)
5. Draw effects/particles
6. Draw UI (health bar, score)
7. Draw debug info (FPS, colliders)

**Performance Optimizations**:
- Only render visible entities
- Batch similar draw calls
- Use sprite caching
- Minimize canvas state changes

### 4. Input System

Centralized input handling for keyboard, mouse, and touch.

**Purpose**: Capture and process user input

**Responsibilities**:
- Listen for keyboard events
- Track mouse/touch positions
- Handle virtual joystick
- Provide input state to game logic

**Input Sources**:
- **Keyboard**: WASD, arrows, action keys
- **Mouse**: Click, drag, position
- **Touch**: Virtual joystick, touch buttons
- **Gamepad**: Future support planned

**Input Processing**:
1. Capture raw input events
2. Update input state
3. Systems query input state
4. Clear "just pressed" flags

### 5. Audio System

Manages game audio playback.

**Purpose**: Play sound effects and music

**Responsibilities**:
- Load audio files
- Play sound effects
- Manage background music
- Control volume levels
- Handle audio context

**Features**:
- Sound effect pooling
- Volume control
- Spatial audio (future)
- Audio mixing

### 6. Asset Manager

Handles loading and caching of game assets.

**Purpose**: Load and manage sprites, audio, and other resources

**Responsibilities**:
- Load images asynchronously
- Cache loaded assets
- Generate fallback placeholders
- Provide asset access to systems

**Asset Loading**:
1. Request asset
2. Check cache
3. Load if not cached
4. Generate placeholder if missing
5. Return asset or placeholder

### 7. Configuration System

Centralized game configuration.

**Purpose**: Store and manage game settings

**Structure**:
```typescript
config = {
  canvas: { width, height, backgroundColor },
  player: { speed, health, size, color },
  enemy: { speed, damage, size, spawnInterval },
  pickup: { healAmount, size, spawnInterval },
  physics: { friction, maxVelocity },
  ui: { joystickSize, buttonSize, fontSize },
  assets: { spritesPath, audioPath },
  debug: { showFPS, showColliders, enableInspector }
}
```

**Benefits**:
- Easy to adjust game balance
- No magic numbers in code
- Runtime configuration changes
- Easy to create presets

## Game Engine

The game engine orchestrates all systems and manages the main game loop.

**Architecture**:
```typescript
class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scene: Scene;
  private isRunning: boolean;
  
  constructor() {
    // Initialize canvas
    // Load initial scene
  }
  
  start() {
    // Start game loop
    requestAnimationFrame(this.loop);
  }
  
  loop(currentTime: number) {
    const deltaTime = (currentTime - lastTime) / 1000;
    
    // Update
    scene.update(deltaTime);
    
    // Render
    scene.render(ctx);
    
    // Continue loop
    requestAnimationFrame(this.loop);
  }
}
```

**Game Loop**:
1. Calculate delta time
2. Update input
3. Update scene
4. Render scene
5. Schedule next frame

**Frame Rate**:
- Target: 60 FPS
- Delta time: Variable (handles frame drops)
- requestAnimationFrame: Syncs with display

## Scene Architecture

Scenes encapsulate game states and gameplay.

**Main Scene Structure**:
```typescript
class MainScene {
  private entities: Entity[] = [];
  private physicsSystem: PhysicsSystem;
  private renderSystem: RenderSystem;
  private inputSystem: InputSystem;
  private audioSystem: AudioSystem;
  
  constructor(canvas: HTMLCanvasElement) {
    // Initialize systems
    // Create initial entities
    // Setup event listeners
  }
  
  update(deltaTime: number) {
    // Update input
    inputSystem.update();
    
    // Update game logic
    this.updateGameLogic(deltaTime);
    
    // Update physics
    physicsSystem.update(deltaTime);
    
    // Update audio
    audioSystem.update();
  }
  
  render(ctx: CanvasRenderingContext2D) {
    renderSystem.render(ctx);
  }
}
```

**Scene Lifecycle**:
1. Create: Initialize systems and entities
2. Update: Process game logic
3. Render: Draw to canvas
4. Destroy: Clean up resources

## Data Flow

```
User Input → Input System → Game Logic → Physics System
                                ↓
                            Entities & Components
                                ↓
                      Render System → Canvas
                                ↓
                          Audio System → Speakers
```

**Update Cycle**:
1. Input System captures user input
2. Game Logic processes input and updates entities
3. Physics System updates positions and detects collisions
4. Render System draws updated state
5. Audio System plays sounds based on events

## Component Examples

### Transform Component
```typescript
{
  type: 'transform',
  position: { x: 100, y: 100 },
  rotation: 0,
  scale: { x: 1, y: 1 }
}
```

### Physics Component
```typescript
{
  type: 'physics',
  velocity: { x: 0, y: 0 },
  acceleration: { x: 0, y: 0 },
  mass: 1,
  friction: 0.8
}
```

### Sprite Component
```typescript
{
  type: 'sprite',
  image: HTMLImageElement,
  width: 32,
  height: 32,
  color: '#4ecca3'
}
```

### Collider Component
```typescript
{
  type: 'collider',
  width: 32,
  height: 32,
  isTrigger: false,
  onCollision: (other: Entity) => void
}
```

### Health Component
```typescript
{
  type: 'health',
  current: 100,
  max: 100,
  onDamage: (amount: number) => void,
  onDeath: () => void
}
```

## System Communication

Systems communicate through:
1. **Entities**: Shared reference point
2. **Components**: Shared data
3. **Events**: Callbacks and event handlers
4. **Configuration**: Global settings

**Example**:
```typescript
// Physics System detects collision
if (collision) {
  // Trigger callback on component
  collider.onCollision(otherEntity);
  
  // Other systems react to component changes
  healthComponent.current -= damage;
}
```

## Design Patterns Used

### 1. Factory Pattern

**Used for**: Creating entities with predefined components

```typescript
class EntityFactory {
  static createPlayer(x: number, y: number): Entity {
    const entity = new Entity();
    entity.addComponent(createTransform(x, y));
    entity.addComponent(createPhysics());
    entity.addComponent(createSprite());
    return entity;
  }
}
```

### 2. Component Pattern

**Used for**: Entity composition

```typescript
// Instead of inheritance
class Player extends Character { }

// Use composition
const player = new Entity();
player.addComponent(transform);
player.addComponent(controllable);
player.addComponent(health);
```

### 3. Observer Pattern

**Used for**: Component callbacks and events

```typescript
health.onDamage = (amount) => {
  console.log(`Took ${amount} damage!`);
  audioSystem.play('hit');
};

health.onDeath = () => {
  console.log('Player died!');
  scene.gameOver();
};
```

### 4. Strategy Pattern

**Used for**: Different entity behaviors

```typescript
// Different AI strategies
enemyAI.strategy = 'chase'; // Chase player
enemyAI.strategy = 'patrol'; // Patrol area
enemyAI.strategy = 'ranged'; // Keep distance and shoot
```

### 5. Singleton Pattern

**Used for**: Configuration and asset manager

```typescript
// Single instance of config
export const config: GameConfig = { ... };

// Single instance of asset manager
export const assetManager = new AssetManager();
```

## Performance Considerations

### Optimization Strategies

1. **Object Pooling**: Reuse entities instead of creating/destroying
2. **Spatial Partitioning**: Only check nearby entities for collision
3. **Dirty Flags**: Only update when data changes
4. **Batch Rendering**: Group similar draw calls
5. **Request Animation Frame**: Sync with display refresh

### Memory Management

- Components stored in arrays (cache-friendly)
- Entities reused from pool
- Assets cached after first load
- Event listeners cleaned up properly

### Profiling

Enable debug features to monitor performance:
```typescript
config.debug.showFPS = true; // Monitor frame rate
config.debug.showColliders = true; // Visualize collisions
```

## Testing Strategy

### Unit Tests

Test individual systems in isolation:
```typescript
test('Physics system detects collision', () => {
  const e1 = createEntity();
  const e2 = createEntity();
  const collision = physics.detectCollision(e1, e2);
  expect(collision).toBe(true);
});
```

### Integration Tests

Test system interactions:
```typescript
test('Player takes damage on enemy collision', () => {
  const player = createPlayer(0, 0);
  const enemy = createEnemy(0, 0);
  physics.update(0.016);
  expect(player.health.current).toBe(90);
});
```

## Future Architecture Improvements

### Planned Enhancements

1. **Event Bus**: Central event system for loose coupling
2. **State Machine**: Formal state management for game states
3. **Save System**: Serialize/deserialize game state
4. **Networking**: Client-server architecture for multiplayer
5. **Scripting**: Lua or JavaScript integration for modding

### Scalability

The architecture is designed to scale:
- Adding new entity types: Create factory function
- Adding new systems: Implement system interface
- Adding new components: Define component interface
- Adding new features: Compose existing components

## References

- [Entity Component System FAQ](https://github.com/SanderMertens/ecs-faq)
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [Data-Oriented Design](https://www.dataorienteddesign.com/dodbook/)

## See Also

- [API Documentation](API.md) - Detailed API reference
- [Contributing Guide](CONTRIBUTING.md) - How to contribute
- [Gameplay Guide](GAMEPLAY.md) - How to play the game
