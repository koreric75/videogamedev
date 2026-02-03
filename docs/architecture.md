# Architecture Documentation

## 📋 Overview

This document provides a detailed architectural overview of **Ruins of Arkan**, a 2D top-down roguelite game built with TypeScript and HTML5 Canvas. The architecture is designed to be modular, testable, and maintainable, following industry best practices for game development.

## 🏗️ Architecture Pattern

The game implements an **Entity-Component-System (ECS)** architecture combined with a **Scene-based** structure. This approach provides several benefits:

- **Performance**: Systems can efficiently process entities in batch
- **Flexibility**: Easy to add/remove behaviors by composing components
- **Maintainability**: Clear separation of data (components) and logic (systems)
- **Testability**: Each system can be tested independently

### 🎯 Key Principles

1. **Separation of Concerns**: Game logic, rendering, physics, and input are handled by separate, specialized systems
2. **Composition over Inheritance**: Entities gain functionality through component composition rather than deep inheritance hierarchies
3. **Dependency Injection**: Systems receive their dependencies through constructors, making them more testable and flexible
4. **Configuration Management**: All game constants and parameters are centralized in a single configuration file
5. **Single Responsibility**: Each system, component, and class has one clear purpose

## 🧩 Core Systems

### 1. Entity System (`src/game/core/entity.ts`)

The entity system provides the foundation for all game objects through the ECS pattern.

**Key Components:**
- `Entity`: A unique identifier (ID) with a collection of components
- `Component`: Pure data structures (no logic)
- `EntityManager`: Handles entity creation, destruction, and component queries

**Common Components:**
- `Transform`: Position (x, y) and rotation
- `Physics`: Velocity and mass
- `Sprite`: Visual representation
- `Collider`: Collision bounds (width, height)
- `Health`: Current and maximum health points
- `AI`: Behavioral logic data

**Usage Example:**
```typescript
const player = entityManager.createEntity();
entityManager.addComponent(player, new Transform(100, 100));
entityManager.addComponent(player, new Sprite('player'));
entityManager.addComponent(player, new Health(100, 100));
```

### 2. Physics System (`src/game/core/physics.ts`)

Handles collision detection, physics updates, and spatial partitioning.

**Responsibilities:**
- Update entity positions based on velocity
- Detect collisions between entities using AABB (Axis-Aligned Bounding Box)
- Trigger collision callbacks
- Handle boundary constraints

**Features:**
- Efficient collision detection with spatial optimization
- Support for static and dynamic colliders
- Callback system for collision events
- Configurable physics parameters (friction, bounce)

**Usage Example:**
```typescript
const physicsSystem = new PhysicsSystem();
physicsSystem.update(deltaTime, entities);
```

### 3. Rendering System (`src/game/core/render.ts`)

Manages all rendering operations to the HTML5 Canvas.

**Responsibilities:**
- Clear and prepare the canvas each frame
- Render sprites with proper positioning and rotation
- Draw UI elements (health bars, score, HUD)
- Handle sprite loading and caching
- Debug visualization (collision boxes, FPS counter)

**Features:**
- Layered rendering (background, entities, UI, debug)
- Sprite batching for performance
- Camera/viewport support
- Debug overlay toggles

**Usage Example:**
```typescript
const renderSystem = new RenderSystem(canvas, context);
renderSystem.render(entities, camera);
```

### 4. Input System (`src/game/core/input.ts`)

Centralized input handling for keyboard, mouse, and touch events.

**Responsibilities:**
- Capture and normalize input from multiple sources
- Provide a unified API for querying input state
- Support for key bindings and input mapping
- Handle mobile virtual controls (joystick, buttons)

**Features:**
- Key state tracking (isPressed, justPressed, justReleased)
- Mouse position and click events
- Touch gesture support
- Input buffering for responsive controls

**Input Sources:**
- Keyboard (WASD, Arrow keys, action keys)
- Mouse (position, buttons)
- Touch (virtual joystick, tap gestures)

**Usage Example:**
```typescript
const inputSystem = new InputSystem(canvas);
if (inputSystem.isKeyPressed('w') || inputSystem.isKeyPressed('ArrowUp')) {
  player.velocity.y = -config.player.speed;
}
```

### 5. Asset System (`src/game/core/assets.ts`)

Manages loading and caching of game assets (sprites, audio).

**Responsibilities:**
- Asynchronous asset loading
- Caching to prevent redundant loads
- Fallback to generated placeholders if assets are missing
- Progress tracking for loading screens

**Supported Asset Types:**
- Images: SVG, PNG, JPG
- Audio: MP3, WAV, OGG

**Usage Example:**
```typescript
const assetManager = new AssetManager();
await assetManager.loadSprite('player', '/assets/sprites/player.svg');
const sprite = assetManager.getSprite('player');
```

### 6. Audio System (`src/game/core/audio.ts`)

Manages sound effects and music playback.

**Responsibilities:**
- Load and cache audio files
- Play sound effects with volume control
- Background music management
- Audio state management (mute, volume)

**Features:**
- Preloading for instant playback
- Multiple simultaneous sounds
- Volume and mute controls
- Audio pooling for repeated sounds

**Usage Example:**
```typescript
const audioSystem = new AudioSystem();
audioSystem.playSound('pickup');
audioSystem.setVolume(0.7);
```

## 🎮 Game Loop

The main game loop is implemented in `src/game/engine.ts` and follows a standard pattern:

```typescript
function gameLoop(currentTime) {
  // 1. Calculate delta time
  const deltaTime = (currentTime - lastTime) / 1000;
  
  // 2. Process input
  inputSystem.update();
  
  // 3. Update game logic
  update(deltaTime);
  
  // 4. Update physics
  physicsSystem.update(deltaTime);
  
  // 5. Render
  renderSystem.render();
  
  // 6. Request next frame
  requestAnimationFrame(gameLoop);
}
```

**Frame Timing:**
- Uses `requestAnimationFrame` for smooth 60 FPS
- Delta time calculation for frame-independent movement
- Fixed time step option for deterministic physics

## 🎬 Scene Management

Scenes encapsulate complete game states (main menu, gameplay, game over).

**Scene Lifecycle:**
1. `onEnter()`: Initialize scene resources
2. `update(deltaTime)`: Update scene logic each frame
3. `render()`: Render scene contents
4. `onExit()`: Cleanup scene resources

**Current Scenes:**
- `MainScene` (`src/game/scenes/mainScene.ts`): Core gameplay

**Usage Example:**
```typescript
class GameOverScene extends Scene {
  onEnter() {
    // Initialize UI, load assets
  }
  
  update(deltaTime) {
    // Handle restart input
  }
  
  render() {
    // Draw game over screen
  }
}
```

## 📊 Data Flow

```
Input Events → Input System → Game Logic → Physics System → Entities → Render System → Canvas
                                    ↓
                              Configuration
                                    ↓
                              Asset Manager
```

1. **Input**: User actions captured by Input System
2. **Logic**: Game rules update entity states
3. **Physics**: Collision and movement calculations
4. **Rendering**: Visual representation drawn to canvas

## 🎨 Design Patterns Used

### 1. Factory Pattern
**Location**: `EntityFactory` in entity creation
**Purpose**: Standardize entity creation with proper component setup

```typescript
class EntityFactory {
  static createPlayer(x, y) {
    const entity = entityManager.createEntity();
    entityManager.addComponent(entity, new Transform(x, y));
    entityManager.addComponent(entity, new Sprite('player'));
    // ... more components
    return entity;
  }
}
```

### 2. Component Pattern
**Location**: ECS architecture throughout
**Purpose**: Flexible entity composition without inheritance

### 3. Observer Pattern
**Location**: Component callbacks, event system
**Purpose**: Decouple event producers from consumers

```typescript
entity.on('collision', (other) => {
  // Handle collision
});
```

### 4. Strategy Pattern
**Location**: AI behaviors, input handlers
**Purpose**: Interchangeable algorithms for different behaviors

### 5. Singleton Pattern
**Location**: Configuration, Asset Manager
**Purpose**: Single source of truth for shared resources

## 🔧 Configuration System

All game parameters are centralized in `src/game/config.ts`:

```typescript
export const config = {
  canvas: {
    width: 800,
    height: 600,
    backgroundColor: '#2a2a2a'
  },
  player: {
    speed: 200,
    maxHealth: 100,
    size: 32
  },
  enemy: {
    speed: 100,
    damage: 10,
    spawnInterval: 3.0
  },
  debug: {
    showFPS: true,
    showColliders: false,
    showGrid: false
  }
};
```

**Benefits:**
- Single source of truth for all game parameters
- Easy to tweak without code changes
- Can be loaded from external files (JSON)
- Supports different configurations (dev, prod)

## 🧪 Testing Strategy

### Unit Tests
- **Location**: `tests/` directory
- **Framework**: Jest with ts-jest
- **Coverage**: Core systems and utilities

**Example Test:**
```typescript
describe('EntityManager', () => {
  it('should create entities with unique IDs', () => {
    const entity1 = entityManager.createEntity();
    const entity2 = entityManager.createEntity();
    expect(entity1.id).not.toBe(entity2.id);
  });
});
```

### Integration Tests
- Test system interactions
- Verify game loop behavior
- Validate scene transitions

## 🚀 Performance Considerations

1. **Object Pooling**: Reuse entities instead of creating/destroying
2. **Spatial Partitioning**: Optimize collision detection for large entity counts
3. **Batch Rendering**: Group similar sprites for efficient drawing
4. **Asset Caching**: Load assets once, reuse many times
5. **Delta Time**: Frame-independent updates for consistent behavior

## 📈 Future Improvements

Potential architectural enhancements:

1. **Save System**: Persistence layer for game state
2. **Network Layer**: Multiplayer support with client-server architecture
3. **Animation System**: Sprite animation and tweening
4. **Particle System**: Visual effects (explosions, trails)
5. **State Machine**: More robust AI and game state management
6. **Resource Manager**: Better asset streaming and memory management

## 🔗 Related Documentation

- [Main README](../README.md): Quick start and features
- [CONTRIBUTING](../CONTRIBUTING.md): Contribution guidelines
- [Package.json](../package.json): Dependencies and scripts

## 📚 Additional Resources

- [Entity-Component-System Pattern](https://en.wikipedia.org/wiki/Entity_component_system)
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [HTML5 Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
