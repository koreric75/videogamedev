# Quick Start Guide

Get up and running with **Ruins of Arkan** in just a few minutes!

## 🚀 For Players

### Play the Game

1. **Visit the game** (when hosted):
   - Open your web browser
   - Navigate to the game URL
   - Start playing immediately!

2. **Controls**:
   - **WASD** or **Arrow Keys**: Move
   - **P**: Pause/Unpause
   - **R**: Restart (after game over)
   - **I**: Debug inspector

3. **Objective**:
   - Survive as long as possible
   - Collect blue pickups (+20 HP)
   - Avoid orange enemies (-10 HP)

### Mobile Players

On mobile devices:
- Virtual joystick appears automatically (bottom-left)
- Touch to move in any direction
- No installation needed - play in browser!

---

## 💻 For Developers

### Prerequisites

- **Node.js** 16 or higher
- **npm** 7 or higher
- A code editor (VS Code recommended)
- Git

### Installation (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/koreric75/videogamedev.git
cd videogamedev

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

**That's it!** Open http://localhost:5173 in your browser.

### Verify Installation

You should see:
- ✅ Game canvas with green player
- ✅ Orange enemies spawning
- ✅ Blue pickups appearing
- ✅ Health bar at the top
- ✅ Smooth 60 FPS gameplay

### First Changes (10 minutes)

Let's make your first modification!

#### 1. Change Player Speed

Edit `src/game/config.ts`:

```typescript
player: {
  speed: 300,  // Changed from 200 to 300
  maxHealth: 100,
  size: 32,
  color: '#4ecca3',
}
```

**Result**: Player moves faster! The game updates automatically with hot reload.

#### 2. Change Player Color

```typescript
player: {
  speed: 200,
  maxHealth: 100,
  size: 32,
  color: '#ff00ff',  // Changed to purple!
}
```

**Result**: Player is now purple instead of green.

#### 3. Add More Starting Health

```typescript
player: {
  speed: 200,
  maxHealth: 150,  // Changed from 100 to 150
  size: 32,
  color: '#4ecca3',
}
```

**Result**: Game is easier - player starts with more health.

### Understanding the Code (15 minutes)

#### File Structure

```
src/
├── main.ts              ← Game entry point (start here!)
└── game/
    ├── config.ts        ← Game settings (modify this often)
    ├── engine.ts        ← Game loop
    ├── core/            ← Core systems
    └── scenes/          ← Game scenes
```

#### Key Concepts

**1. Entities** are game objects:
```typescript
const player = createEntity();  // Just an ID number
```

**2. Components** are data:
```typescript
{
  type: 'transform',
  x: 100,
  y: 100,
  rotation: 0
}
```

**3. Systems** process components:
```typescript
class PhysicsSystem {
  update(deltaTime) {
    // Update all entities with physics components
  }
}
```

### Common Tasks

#### Add a New Entity Type

1. Open `src/game/spawn.ts`
2. Create a spawn function:

```typescript
export function spawnPowerUp(x: number, y: number) {
  // Create entity with components
  const entity = createEntity();
  addComponent(entity, transformComponent);
  addComponent(entity, spriteComponent);
  return entity;
}
```

#### Modify Game Balance

Edit `src/game/config.ts`:

```typescript
enemy: {
  speed: 80,           // Make enemies slower
  damage: 5,           // Reduce damage
  spawnInterval: 5000  // Spawn less frequently
}
```

#### Add Custom Sprites

1. Create or find a sprite image (PNG, SVG, or JPEG)
2. Name it: `player.svg`, `enemy.svg`, or `pickup.svg`
3. Place in `assets/sprites/` directory
4. Restart dev server
5. Your sprite loads automatically!

### Next Steps

1. **Read the docs**:
   - [Architecture Guide](architecture.md) - Understand the system
   - [API Reference](API.md) - Learn the API
   - [Gameplay Guide](GAMEPLAY.md) - Game mechanics

2. **Make changes**:
   - Try modifying `config.ts`
   - Add a new entity type
   - Create custom sprites

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm run preview
   ```

5. **Contribute**:
   - See [CONTRIBUTING.md](CONTRIBUTING.md)
   - Check [ROADMAP.md](ROADMAP.md) for ideas

---

## 🛠️ Development Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run unit tests |
| `npm run lint` | Check code style |
| `npm run lint:fix` | Auto-fix code style |

---

## 🐛 Troubleshooting

### Dev Server Won't Start

**Problem**: `npm run dev` fails

**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Canvas Not Showing

**Problem**: Blank screen, no game canvas

**Solution**:
1. Check browser console (F12) for errors
2. Verify `src/main.ts` is loading
3. Try hard refresh (Ctrl+Shift+R)

### TypeScript Errors

**Problem**: Type errors in editor

**Solution**:
```bash
# Reinstall TypeScript
npm install --save-dev typescript
# Restart your editor
```

### Hot Reload Not Working

**Problem**: Changes don't appear automatically

**Solution**:
1. Stop dev server (Ctrl+C)
2. Clear browser cache
3. Restart: `npm run dev`
4. Hard refresh browser

---

## 📚 Learning Resources

### For Game Development

- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [Entity Component System FAQ](https://github.com/SanderMertens/ecs-faq)
- [HTML5 Game Development](https://developer.mozilla.org/en-US/docs/Games)

### For TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### For Canvas API

- [MDN Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)
- [Canvas Cheat Sheet](https://simon.html5.org/dump/html5-canvas-cheat-sheet.html)

---

## 🎯 Your First Feature

Ready to add your first feature? Try implementing a simple power-up system!

### Step-by-Step: Speed Boost Power-Up

**1. Add configuration** (`src/game/config.ts`):
```typescript
powerup: {
  duration: 5000,        // 5 seconds
  speedMultiplier: 1.5,  // 50% faster
  size: 20,
  color: '#ffdd00',      // Yellow
}
```

**2. Create spawn function** (`src/game/spawn.ts`):
```typescript
export function spawnSpeedBoost(x: number, y: number) {
  // Create entity with transform, sprite, collider components
  // Similar to spawnPickup but with different properties
}
```

**3. Add collection logic** (`src/game/scenes/mainScene.ts`):
```typescript
// In collision handler
if (powerup) {
  player.speed *= config.powerup.speedMultiplier;
  setTimeout(() => {
    player.speed /= config.powerup.speedMultiplier;
  }, config.powerup.duration);
}
```

**4. Test your feature**:
- Run `npm run dev`
- Play the game
- Collect the power-up
- Feel the speed boost!

---

## 💡 Tips for Success

1. **Start small**: Make one change at a time
2. **Read the code**: Understanding beats memorizing
3. **Use the inspector**: Press 'I' to debug entities
4. **Test frequently**: Run the game after each change
5. **Ask for help**: Open an issue if stuck
6. **Have fun**: Game development is creative and fun!

---

## 🤝 Get Help

- **Bug?** [Open an issue](https://github.com/koreric75/videogamedev/issues)
- **Question?** [Start a discussion](https://github.com/koreric75/videogamedev/discussions)
- **Stuck?** Check the [documentation](../README.md)
- **Want to contribute?** See [CONTRIBUTING.md](CONTRIBUTING.md)

---

**Ready to build something awesome?** Let's go! 🚀
