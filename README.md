# Ruins of Arkan

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5+-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2+-646CFF.svg)](https://vitejs.dev/)

A compact top-down roguelite prototype built with TypeScript and HTML5 Canvas, featuring a clean Entity-Component-System (ECS) architecture. This project demonstrates modern game development practices with strong typing, modular architecture, and comprehensive testing.

## 🎮 Live Demo

Run locally with `npm run dev` or build for production with `npm run build`.

## 📚 Documentation

- **[Quick Start Guide](docs/QUICK_START.md)** - Get started in minutes
- **[Architecture Documentation](docs/architecture.md)** - Technical deep-dive into the ECS architecture
- **[Deployment Guide](docs/DEPLOYMENT.md)** - Deploy to GitHub Pages, Netlify, Vercel, and more
- **[Contributing Guidelines](CONTRIBUTING.md)** - How to contribute to the project

## ✨ Features

### Core Game Mechanics
- 🔥 **Ancient Fire Realm Challenge** - Navigate through a fire realm with music-based time limits
- 🎵 **Custom Music Upload** - Upload your own song to set the challenge duration
- 🎼 **Dynamic Audio Degradation** - Music quality degrades/recovers with player health (8-bit NES effect)
- 🎯 Complete gameplay loop with player, enemies, pickups, and scoring
- 🚪 **Room-based progression system** with immediate enemy respawning in adjacent rooms
- 💚 Health system with visual health bar
- 🎮 Game state management (playing, paused, game over, victory)
- 📊 Real-time scoring system
- 🗺️ Multi-room exploration (5 realms with forward/backward navigation)
- ⏱️ **Timer-based victory conditions** linked to song duration

### Technical Features
- 🏗️ **Entity-Component-System (ECS) architecture** for clean, scalable code
- ⚙️ **Physics system** with robust collision detection
- 🎛️ **Centralized input handling** supporting keyboard, mouse, and touch
- 📱 **Mobile touch controls** with virtual joystick (auto-detected)
- ⚡ **Comprehensive configuration system** for easy tweaking
- 🧪 **Unit testing** with Jest
- 🔧 **ESLint** for code quality
- 📦 **Vite** for fast development and optimized builds

## 🚀 Quick Start

### Prerequisites

- Node.js 14+ and npm
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/koreric75/videogamedev.git
cd videogamedev

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open http://localhost:5173 in your browser to start playing! 

### 🎮 Game Controls

#### Desktop
- **WASD / Arrow keys**: Move player
- **P**: Pause/unpause game
- **R**: Restart after game over
- **E**: Advance to next realm (after clearing current realm)
- **Q**: Return to previous realm (after clearing current realm)
- **I**: Open sprite inspector (debugging tool)

#### Mobile / Touch
- **Virtual Joystick** (bottom-left): Move player
- **Action Buttons** (bottom-right): Interact with game

Touch controls automatically appear when a touchscreen is detected.

### 🎯 Gameplay - Ancient Fire Realm Challenge

#### Getting Started
1. **Upload a song** using the "Upload Music for Fire Realm" button
2. Song duration = Time limit to complete the challenge
3. Music begins playing once loaded

#### Objectives
- **Extinguish all flames** (orange-red enemies) across all 5 realms before time runs out
- **Collect water pickups** (cyan) to heal (+20 HP) and restore music quality
- **Survive the timer** - When time expires, you must have extinguished all flames to win

#### Game Mechanics
- **Music Degradation**: As your health decreases, the music quality degrades to 8-bit NES-style sound
- **Music Recovery**: Healing restores both health and music fidelity
- **Flame Combat**: Touching flames damages you (-10 HP) but extinguishes them
- **Realm Progression**: Press E to advance, Q to return (after clearing each realm)
- **Victory**: Extinguish all flames within the song duration
- **Defeat**: Time expires with flames remaining

The game features a realm-based progression system where enemies spawn immediately in adjacent realms once you clear the current realm.

## 🏗️ Architecture

The game is built using a clean **Entity-Component-System (ECS)** architecture, promoting:

- **Separation of Concerns**: Clear boundaries between game logic, rendering, physics, and input
- **Composition over Inheritance**: Flexible entity composition through components
- **Testability**: Isolated systems are easy to test independently
- **Maintainability**: Changes to one system don't affect others

### Core Concepts

- **Entities**: Game objects (player, enemies, pickups) that are containers for components
- **Components**: Pure data containers (Transform, Physics, Sprite, Collider, Health)
- **Systems**: Logic processors that operate on entities with specific components
  - `PhysicsSystem`: Handles movement and collision detection
  - `RenderSystem`: Manages all rendering operations
  - `InputSystem`: Processes keyboard, mouse, and touch input
  - `AudioSystem`: Manages sound effects and music

For detailed architecture documentation, see [docs/architecture.md](docs/architecture.md).

## Skills Framework

This project uses a skills framework to guide development decisions. Run:

```bash
./skills.sh
```

To see the enabled skill personas:
- **Solution Architect**: System design, architecture patterns, scalability
- **Functional Analyst**: Requirements analysis, user stories, feature specifications
- **Developers**: Implementation, coding, testing, debugging

## 🎨 Customizing Assets

### Sprites

Drop custom sprite files into `assets/sprites/` with these filenames:
- `player.svg` - Player character sprite
- `enemy.svg` - Enemy sprite
- `pickup.svg` - Pickup/collectible sprite  
- `wall.svg` - Wall/obstacle sprite

The game automatically loads these images. If missing, placeholder graphics are generated.

Supported formats: SVG, PNG, JPG

### Audio

Add audio files to `assets/audio/` with these filenames:
- `pickup.mp3` - Sound when collecting pickups
- `hit.mp3` - Sound when taking damage
- `death.mp3` - Sound when player dies
- `start.mp3` - Sound when game starts

Supported formats: MP3, WAV, OGG

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Check code with ESLint
npm run lint:fix     # Auto-fix ESLint issues
npm test             # Run unit tests with Jest

# Assets
npm run export:sprites  # Export sprite assets
```

### Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

The production build will be output to the `dist/` directory, ready for deployment to any static hosting service.

## 📁 Project Structure

```
videogamedev/
├── src/
│   ├── main.ts                    # Application entry point
│   └── game/
│       ├── config.ts              # Centralized configuration
│       ├── engine.ts              # Game loop and engine
│       ├── spawn.ts               # Entity spawning utilities
│       ├── core/                  # Core systems
│       │   ├── entity.ts          # ECS entity management
│       │   ├── physics.ts         # Physics & collision detection
│       │   ├── render.ts          # Rendering system
│       │   ├── input.ts           # Input handling (keyboard/mouse/touch)
│       │   ├── assets.ts          # Asset loading and management
│       │   └── audio.ts           # Audio system
│       ├── scenes/                # Game scenes
│       │   └── mainScene.ts       # Main gameplay scene
│       └── ui/                    # UI components
│           ├── spriteInspector.ts # Debug sprite inspector
│           └── joystick.ts        # Virtual joystick for mobile
├── tests/                         # Unit tests
│   ├── entity.test.ts
│   ├── spawn.test.ts
│   └── positionFiles.test.ts
├── docs/                          # Documentation
│   └── architecture.md            # Architecture deep-dive
├── assets/                        # Game assets
│   ├── sprites/                   # Sprite images (SVG/PNG)
│   └── audio/                     # Sound effects and music
├── scripts/                       # Build and utility scripts
│   └── export-sprites.js          # Sprite export tool
├── index.html                     # HTML entry point
├── package.json                   # Project dependencies and scripts
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite build configuration
└── .eslintrc.json                 # ESLint configuration
```

## ⚙️ Configuration

All game parameters are centralized in `src/game/config.ts` for easy customization:

```typescript
import { config } from './game/config';

// Canvas dimensions
config.canvas.width;      // 800
config.canvas.height;     // 600

// Player settings
config.player.speed;      // Movement speed
config.player.maxHealth;  // Starting health

// Enemy settings
config.enemy.speed;       // Chase speed
config.enemy.damage;      // Damage per hit

// Debug options
config.debug.showFPS;         // Display FPS counter
config.debug.showColliders;   // Visualize collision boxes
```

This centralized approach makes it easy to balance gameplay or enable/disable debug features.

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Review the codebase**: Run `./skills.sh` to understand the current development priorities and skill personas
2. **Follow architecture patterns**: Read [docs/architecture.md](docs/architecture.md) for design guidelines
3. **Write tests**: Add unit tests for new features in the `tests/` directory
4. **Code quality**: Run `npm run lint` before committing to ensure code quality
5. **Submit a PR**: Describe your changes and link any related issues

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the existing code style
4. Add/update tests as needed
5. Run `npm run lint` and `npm test` to verify
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to your branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## 🎓 Skills Framework

This project uses a skills framework to guide development decisions and maintain consistent quality. Run the skills script to see the active skill personas:

```bash
./skills.sh
```

**Active Skill Personas:**
- **Solution Architect**: Focuses on system design, architecture patterns, and scalability
- **Functional Analyst**: Handles requirements analysis, user stories, and feature specifications
- **Developers**: Manages implementation, coding standards, testing, and debugging

Each persona helps ensure different aspects of the project are well-considered and documented.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**koreric75** - [GitHub Profile](https://github.com/koreric75)

## 🙏 Acknowledgments

- Built with [TypeScript](https://www.typescriptlang.org/)
- Powered by [Vite](https://vitejs.dev/)
- Tested with [Jest](https://jestjs.io/)
- Inspired by classic roguelite games

---

**Happy Gaming! 🎮**

For questions or issues, please [open an issue](https://github.com/koreric75/videogamedev/issues) on GitHub.

