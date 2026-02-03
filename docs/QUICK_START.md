# Quick Start Guide

Get up and running with Ruins of Arkan in minutes!

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** version 14 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- A code editor (optional, for development)

### Verify Installation

Check your versions:

```bash
node --version  # Should be 14.x or higher
npm --version   # Should be 6.x or higher
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/koreric75/videogamedev.git
cd videogamedev
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- TypeScript (language)
- Vite (build tool)
- Jest (testing framework)
- ESLint (code quality)

**Note**: You may see some deprecation warnings - this is normal and won't affect the game.

### 3. Start the Development Server

```bash
npm run dev
```

You should see output like:

```
  VITE v7.2.7  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 4. Play the Game!

Open your browser and navigate to:

```
http://localhost:5173
```

The game should load immediately! 🎮

## 🎮 Basic Controls

### Desktop Controls

- **WASD** or **Arrow Keys**: Move the player
- **P**: Pause/unpause the game
- **R**: Restart after game over
- **I**: Open sprite inspector (debug tool)

### Mobile Controls

If you're on a touchscreen device:
- **Virtual Joystick** (bottom-left): Move the player
- Touch controls appear automatically

## 🎯 How to Play

1. **Move your player** around the screen using WASD or arrow keys
2. **Collect blue pickups** to restore health (+20 HP)
3. **Avoid orange enemies** - they chase you and deal damage!
4. **Survive as long as possible** and maximize your score
5. When you die, press **R** to restart

## 🛠️ Development Commands

### Running Tests

```bash
npm test
```

Runs all unit tests with Jest.

### Linting Code

```bash
npm run lint
```

Check code quality with ESLint.

```bash
npm run lint:fix
```

Automatically fix linting issues where possible.

### Building for Production

```bash
npm run build
```

Creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally at http://localhost:4173

## 🔧 Troubleshooting

### Port Already in Use

If port 5173 is already in use:

```bash
npm run dev -- --port 3000
```

This runs the server on port 3000 instead.

### Dependencies Not Installing

Try cleaning npm cache:

```bash
npm cache clean --force
npm install
```

### Build Errors

Ensure you're using a compatible Node.js version:

```bash
node --version
```

Should be 14.x or higher. If not, upgrade Node.js.

### Game Not Loading

1. Check browser console for errors (F12 → Console tab)
2. Clear browser cache and reload
3. Try a different browser
4. Ensure dev server is running (`npm run dev`)

### Tests Failing

Canvas-related warnings in tests are expected (jsdom limitation). As long as tests pass, everything is fine.

## 🎨 Customization

### Changing Game Settings

Edit `src/game/config.ts` to modify:

- Player speed
- Enemy behavior
- Canvas size
- Debug options

Example:

```typescript
export const config = {
  player: {
    speed: 300,  // Increase for faster movement
    maxHealth: 150,  // More starting health
  },
  debug: {
    showFPS: true,  // Show FPS counter
  }
};
```

Save the file and the dev server will auto-reload!

### Adding Custom Sprites

1. Create your sprite images (SVG, PNG, or JPG)
2. Save them in `assets/sprites/` with these names:
   - `player.svg`
   - `enemy.svg`
   - `pickup.svg`
3. Reload the game - your sprites will be loaded automatically!

If sprites are missing, the game generates placeholder graphics.

### Adding Sound Effects

1. Create/download sound files (MP3, WAV, or OGG)
2. Save them in `assets/audio/` with these names:
   - `pickup.mp3` - Played when collecting items
   - `hit.mp3` - Played when taking damage
   - `death.mp3` - Played when player dies
   - `start.mp3` - Played when game starts
3. Reload - sounds will play automatically!

## 📚 Next Steps

### Learn the Architecture

Read the [Architecture Documentation](docs/architecture.md) to understand how the game is structured using Entity-Component-System (ECS) design.

### Contribute

Want to add features or fix bugs? See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Deploy Your Game

Ready to share your game with the world? Check out the [Deployment Guide](docs/DEPLOYMENT.md) for various hosting options.

## 🎓 Learning Resources

New to TypeScript or game development?

- [TypeScript in 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [HTML5 Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Entity-Component-System Pattern](https://en.wikipedia.org/wiki/Entity_component_system)
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)

## 💡 Tips

- **Hot Reload**: Changes to source files automatically reload the game
- **Browser DevTools**: Press F12 to see console logs and debug
- **Sprite Inspector**: Press 'I' in-game to see entity details
- **Debug Mode**: Enable debug options in `config.ts` to visualize collision boxes
- **Performance**: Check FPS counter (enable in config) to monitor performance

## ❓ Getting Help

Need help?

1. Check the [README.md](README.md) for detailed information
2. Review the [Architecture Documentation](docs/architecture.md)
3. Search existing [GitHub Issues](https://github.com/koreric75/videogamedev/issues)
4. Open a new issue if your problem isn't covered

## 🎉 You're Ready!

You now have everything you need to:
- Play the game
- Modify it to your liking
- Build and deploy it
- Contribute improvements

**Happy gaming! 🎮✨**

---

[Back to README](../README.md) | [View Architecture](docs/architecture.md) | [Contributing Guide](CONTRIBUTING.md)
