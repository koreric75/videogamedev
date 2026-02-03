# 🎮 Ruins of Arkan

> A top-down roguelite survival game built with TypeScript and HTML5 Canvas

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.5+-blue.svg)](https://www.typescriptlang.org/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()

**Ruins of Arkan** is a compact top-down roguelite prototype featuring Entity-Component-System (ECS) architecture, smooth physics, and engaging survival gameplay. Collect pickups, avoid enemies, and survive as long as you can!

---

## ✨ Features

- ✅ **ECS Architecture** - Clean, maintainable Entity-Component-System design
- ✅ **Physics System** - Smooth movement with collision detection
- ✅ **Multi-Platform Input** - Keyboard, mouse, and touch controls
- ✅ **Mobile Support** - Virtual joystick for touchscreen devices
- ✅ **Configuration System** - Centralized, easy-to-modify game settings
- ✅ **Complete Gameplay** - Player, enemies, pickups, scoring, and health
- ✅ **Health System** - Visual health bar with damage feedback
- ✅ **Game States** - Playing, paused, and game over states
- ✅ **Debug Tools** - Sprite inspector and performance monitoring
- ✅ **Asset Management** - Automatic loading of sprites and audio

---

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm 7+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone the repository
git clone https://github.com/koreric75/videogamedev.git
cd videogamedev

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser and start playing!

---

## 🎯 How to Play

### Objective

Survive as long as possible by avoiding enemies and collecting health pickups!

### Controls

| Input | Action |
|-------|--------|
| **W A S D** / **Arrow Keys** | Move player |
| **P** | Pause/unpause game |
| **R** | Restart after game over |
| **I** | Toggle sprite inspector (debug) |

### Gameplay Elements

- 🟢 **Player (Green)** - You! Speed: 200 px/s, Health: 100 HP
- 🟠 **Enemies (Orange)** - Chase you and deal 10 damage on contact
- 🔵 **Pickups (Blue)** - Restore 20 HP when collected

### Mobile Controls

On touchscreen devices, virtual controls appear automatically:
- **Virtual Joystick** (bottom-left) - Move in any direction
- **Action Buttons** (bottom-right) - Context-sensitive actions

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Architecture Guide](docs/architecture.md) | Detailed system architecture and design patterns |
| [API Reference](docs/API.md) | Complete API documentation for all systems |
| [Gameplay Guide](docs/GAMEPLAY.md) | How to play, strategies, and tips |
| [Contributing Guide](docs/CONTRIBUTING.md) | How to contribute to the project |
| [Assets Guide](docs/ASSETS.md) | Working with sprites, audio, and assets |
| [Roadmap](docs/ROADMAP.md) | Planned features and development timeline |

---

## 🏗️ Architecture

**Ruins of Arkan** uses a clean **Entity-Component-System (ECS)** architecture:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Entities   │ ←→  │ Components  │ ←→  │   Systems   │
│             │     │             │     │             │
│ player      │     │ Transform   │     │ Physics     │
│ enemy       │     │ Physics     │     │ Render      │
│ pickup      │     │ Sprite      │     │ Input       │
│             │     │ Collider    │     │ Audio       │
└─────────────┘     └─────────────┘     └─────────────┘
```

### Core Concepts

- **Entities**: Game objects (player, enemies, pickups)
- **Components**: Data containers (Transform, Physics, Sprite, Health)
- **Systems**: Logic processors (PhysicsSystem, RenderSystem, InputSystem)

See [Architecture Documentation](docs/architecture.md) for detailed information.

---

## 📁 Project Structure

```
videogamedev/
├── src/
│   ├── main.ts                  # Entry point
│   └── game/
│       ├── config.ts            # Game configuration
│       ├── engine.ts            # Game loop and engine
│       ├── spawn.ts             # Entity spawning utilities
│       ├── core/
│       │   ├── entity.ts        # Entity-component system
│       │   ├── physics.ts       # Physics & collision
│       │   ├── render.ts        # Rendering system
│       │   ├── input.ts         # Input handling
│       │   ├── assets.ts        # Asset management
│       │   └── audio.ts         # Audio system
│       ├── scenes/
│       │   └── mainScene.ts     # Main gameplay scene
│       └── ui/
│           ├── spriteInspector.ts # Debug tool
│           └── joystick.ts       # Mobile controls
├── assets/
│   ├── sprites/                 # Sprite images
│   └── audio/                   # Sound effects
├── docs/                        # Documentation
├── tests/                       # Unit tests
└── package.json                 # Dependencies
```

---

## 🔧 Development

### Build Commands

```bash
# Development server (hot reload)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint code
npm run lint

# Fix linting errors
npm run lint:fix
```

### Configuration

All game settings are in `src/game/config.ts`:

```typescript
import { config } from './game/config';

// Modify game behavior
config.player.speed = 250;        // Make player faster
config.enemy.damage = 5;          // Reduce enemy damage
config.debug.showFPS = true;      // Show FPS counter
```

### Adding Custom Assets

**Sprites**: Drop files into `assets/sprites/`
- `player.svg` - Player character
- `enemy.svg` - Enemy sprite
- `pickup.svg` - Pickup item

**Audio**: Drop files into `assets/audio/`
- `pickup.mp3` - Pickup sound
- `hit.mp3` - Damage sound
- `death.mp3` - Death sound

Assets load automatically on restart!

---

## 🧪 Testing

Run the test suite:

```bash
npm test              # Run all tests
npm test -- --watch   # Watch mode
npm test -- --coverage # Coverage report
```

Tests are located in the `tests/` directory and use Jest with jsdom.

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests and linter
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to your branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 🗺️ Roadmap

### Coming Soon

- ⚔️ **Combat System** - Fight back with weapons
- 🎯 **Power-Ups** - Speed boost, shields, multi-shot
- 👾 **Enemy Variety** - Ranged, tank, and swarm enemies
- 🗺️ **Multiple Levels** - Different arenas and environments
- 📊 **Progression** - XP, levels, and upgrades
- 🎨 **Visual Polish** - Particles, animations, effects
- 🎵 **Audio** - Background music and sound effects

See the full [Development Roadmap](docs/ROADMAP.md) for details.

---

## 🛠️ Skills Framework

This project uses a skills-based development approach:

```bash
./skills.sh
```

Active personas:
- **Solution Architect** - System design and architecture
- **Functional Analyst** - Requirements and features
- **Developers** - Implementation and testing

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [TypeScript](https://www.typescriptlang.org/)
- Powered by [Vite](https://vitejs.dev/)
- Tested with [Jest](https://jestjs.io/)
- Inspired by classic roguelite games

---

## 📞 Support

- 🐛 **Bug Reports**: [Open an issue](https://github.com/koreric75/videogamedev/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/koreric75/videogamedev/discussions)
- 📖 **Documentation**: Check the [docs](docs/) folder
- 💬 **Questions**: Open a discussion or issue

---

<div align="center">

**[Play Now](http://localhost:5173)** • **[Documentation](docs/)** • **[Contribute](docs/CONTRIBUTING.md)** • **[Roadmap](docs/ROADMAP.md)**

Made with ❤️ and TypeScript

</div>

