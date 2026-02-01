# my-game — Ruins of Arkan (Prototype)

A compact top-down roguelite prototype built in TypeScript and HTML5 Canvas with Entity-Component-System (ECS) architecture.

## Features

- ✅ Entity-Component-System architecture
- ✅ Physics system with collision detection
- ✅ Centralized input handling (keyboard, mouse, touch)
- ✅ Mobile touch controls (virtual joystick)
- ✅ Comprehensive configuration system
- ✅ Complete gameplay loop (player, enemies, pickups, scoring)
- ✅ Health system with visual health bar
- ✅ Game state management (playing, paused, game over)

## Quick start (dev server):

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser. 

### Controls
- **WASD / Arrow keys**: Move player
- **P**: Pause/unpause game
- **R**: Restart after game over
- **I**: Open sprite inspector (debugging)

### Gameplay
- Collect **blue pickups** to heal (+20 HP)
- Avoid **orange enemies** (they chase you and deal 10 damage on contact)
- Survive as long as possible and maximize your score!

Mobile / touch controls:
- If you're on a touchscreen device, a **virtual joystick** and **action buttons** appear automatically (bottom-left and bottom-right).

## Architecture

The game uses a clean **Entity-Component-System (ECS)** architecture:

- **Entities**: Game objects (player, enemies, pickups)
- **Components**: Data containers (Transform, Physics, Sprite, Collider, Health)
- **Systems**: Logic processors (PhysicsSystem, RenderSystem, InputSystem)

See [docs/architecture.md](docs/architecture.md) for detailed architecture documentation.

## Skills Framework

This project uses a skills framework to guide development decisions. Run:

```bash
./skills.sh
```

To see the enabled skill personas:
- **Solution Architect**: System design, architecture patterns, scalability
- **Functional Analyst**: Requirements analysis, user stories, feature specifications
- **Developers**: Implementation, coding, testing, debugging

Artist assets:
- Drop sprite files into `assets/sprites` with the filenames: `player.svg`, `enemy.svg`, `pickup.svg`, `wall.svg`. The game will automatically use those images; if they're missing, placeholders are generated.

Audio:
- The game includes an audio manager. Add audio files to `assets/audio` (pickup.mp3, hit.mp3, death.mp3, start.mp3) and they will be loaded automatically.

## Development

### Build for production:

```bash
npm run build
npm run preview
```

### Run tests:

```bash
npm test
```

### Lint code:

```bash
npm run lint
npm run lint:fix
```

## Project Structure

```
src/
  main.ts                    # Entry point
  game/
    config.ts               # Central configuration
    engine.ts               # Game engine (loop)
    spawn.ts                # Sprite spawning utilities
    core/
      entity.ts             # Entity-component system
      physics.ts            # Physics & collision detection
      render.ts             # Rendering system
      input.ts              # Input handling
      assets.ts             # Asset management
      audio.ts              # Audio system
    scenes/
      mainScene.ts          # Main gameplay scene
    ui/
      spriteInspector.ts    # Debug inspector
      joystick.ts           # Mobile controls
tests/
  *.test.ts                 # Unit tests
docs/
  architecture.md           # Architecture documentation
```

## Configuration

All game constants are centralized in `src/game/config.ts`:

```typescript
import { config } from './game/config';

// Canvas size
config.canvas.width;
config.canvas.height;

// Player properties
config.player.speed;
config.player.maxHealth;

// Debug options
config.debug.showFPS;
config.debug.showColliders;
```

## Contributing

1. Run `./skills.sh` to see current priorities
2. Follow the architecture patterns in `docs/architecture.md`
3. Add tests for new features
4. Run `npm run lint` before committing

## License

MIT

