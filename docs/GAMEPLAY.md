# Gameplay Guide

Welcome to **Ruins of Arkan**! This guide will help you understand the game mechanics and become a master survivor.

## Table of Contents

- [Game Overview](#game-overview)
- [Controls](#controls)
- [Game Mechanics](#game-mechanics)
- [Entities](#entities)
- [Strategies and Tips](#strategies-and-tips)
- [Scoring](#scoring)
- [Debug Features](#debug-features)

## Game Overview

**Ruins of Arkan** is a top-down roguelite survival game where you control a lone adventurer exploring dangerous ruins. Your goal is to survive as long as possible while enemies spawn continuously and chase you down.

### Objective

- **Survive** as long as possible
- **Avoid** orange enemies that deal damage on contact
- **Collect** blue pickups to restore health
- **Maximize** your score by staying alive

### Game States

The game has three main states:

1. **Playing** - Active gameplay
2. **Paused** - Game is paused (press P to toggle)
3. **Game Over** - Player health reached 0 (press R to restart)

## Controls

### Keyboard Controls

| Key | Action |
|-----|--------|
| **W** or **↑** | Move up |
| **A** or **←** | Move left |
| **S** or **↓** | Move down |
| **D** or **→** | Move right |
| **P** | Pause/Unpause game |
| **R** | Restart game (when game over) |
| **I** | Toggle sprite inspector (debug) |

### Mobile Controls

On touchscreen devices, the game automatically displays:

- **Virtual Joystick** (bottom-left) - Move in any direction
- **Action Buttons** (bottom-right) - Context-sensitive actions

Touch controls are fully responsive and provide the same gameplay experience as keyboard controls.

### Mouse Controls

- **Click and drag** - Some debug features may use mouse input
- **Drop sprites** - Drag image files onto the canvas to spawn custom sprites

## Game Mechanics

### Movement

- **Speed**: 200 pixels per second (configurable)
- **Direction**: 8-directional movement (cardinal + diagonal)
- **Physics**: Smooth acceleration and deceleration with friction
- **Boundaries**: Player is confined to the canvas area

### Health System

- **Starting Health**: 100 HP
- **Maximum Health**: 100 HP
- **Health Bar**: Displayed at the top of the screen
- **Damage**: 10 HP per enemy collision
- **Death**: Game over when health reaches 0

### Healing

- **Pickup Items**: Blue circular items restore health
- **Heal Amount**: +20 HP per pickup
- **Spawn Rate**: New pickups spawn every 5 seconds
- **Max Health**: Cannot exceed 100 HP

### Enemy System

- **Enemy Type**: Orange circular entities
- **Behavior**: Chase the player using simple AI
- **Speed**: 100 pixels per second (slower than player)
- **Damage**: 10 HP on collision
- **Spawn Rate**: New enemy spawns every 3 seconds
- **Difficulty**: More enemies over time = harder gameplay

## Entities

### Player (Green)

The player character you control.

- **Color**: Green (#4ecca3)
- **Size**: 32x32 pixels
- **Speed**: 200 px/s
- **Health**: 100 HP
- **Special**: Can open sprite inspector with 'I' key

### Enemy (Orange)

Hostile entities that chase and damage the player.

- **Color**: Orange/Red (#ff6b6b)
- **Size**: 32x32 pixels
- **Speed**: 100 px/s (slower than player)
- **Damage**: 10 HP per collision
- **AI**: Moves directly toward player position
- **Spawn**: Every 3 seconds at random edge positions

### Pickup (Blue)

Health restoration items.

- **Color**: Cyan/Blue (#4ecdc4)
- **Size**: 24x24 pixels
- **Effect**: Restores 20 HP
- **Spawn**: Every 5 seconds at random positions
- **Collection**: Automatic on collision with player

## Strategies and Tips

### Survival Tips

1. **Keep Moving**: Standing still makes you an easy target
2. **Kite Enemies**: Use your speed advantage to maintain distance
3. **Plan Your Route**: Move toward pickups while avoiding enemies
4. **Use the Edges**: Corner enemies by using the canvas boundaries
5. **Don't Get Greedy**: Sometimes it's better to avoid a pickup than risk taking damage

### Advanced Strategies

1. **Circular Movement**: Move in large circles to group enemies together
2. **Diagonal Advantage**: Diagonal movement is as fast as cardinal movement
3. **Pickup Timing**: Wait for pickups to spawn in safe locations
4. **Health Management**: Don't collect pickups when at full health
5. **Enemy Grouping**: Lead enemies into tight groups to navigate around them easier

### Common Mistakes

- ❌ **Collecting pickups at full health** - Waste of resources
- ❌ **Moving into corners** - Easy to get trapped
- ❌ **Ignoring health bar** - Monitor your health constantly
- ❌ **Panic movement** - Stay calm and move deliberately
- ❌ **Fighting enemies** - You can't attack, only avoid!

## Scoring

### How Scoring Works

- **Time Alive**: Points awarded for survival time
- **Pickups Collected**: Bonus points for each pickup
- **Enemies Avoided**: Indirect scoring through survival

### High Score

- Your best score is tracked
- Try to beat your personal record!
- Challenge friends to compete

## Debug Features

### Sprite Inspector (Press I)

The sprite inspector is a powerful debug tool that shows:

- All entities in the game
- Entity properties (position, health, velocity)
- Component data
- Real-time updates

**How to use:**
1. Press 'I' to open/close inspector
2. View entity list on the right side
3. Click entities to highlight them
4. Monitor game state in real-time

### Debug Configuration

Enable additional debug features in `src/game/config.ts`:

```typescript
debug: {
  showFPS: true,           // Display frame rate
  showColliders: true,     // Show collision boxes
  enableInspector: true    // Enable sprite inspector
}
```

### FPS Counter

When enabled, shows:
- Current FPS (frames per second)
- Frame time in milliseconds
- Performance metrics

### Collision Boxes

When enabled, displays:
- Red boxes around colliders
- Helps understand collision detection
- Useful for debugging physics

## Customization

### Adding Custom Sprites

Replace placeholder graphics with custom sprites:

1. **Create sprite files** (PNG, SVG, or JPEG)
2. **Name them correctly**:
   - `player.svg` - Player sprite
   - `enemy.svg` - Enemy sprite
   - `pickup.svg` - Pickup sprite
3. **Place in** `assets/sprites/` directory
4. **Refresh the game** - Sprites load automatically

### Adding Audio

Enhance the game with sound effects:

1. **Prepare audio files** (MP3 format recommended)
2. **Name them**:
   - `pickup.mp3` - Pickup collection sound
   - `hit.mp3` - Player damage sound
   - `death.mp3` - Player death sound
   - `start.mp3` - Game start sound
3. **Place in** `assets/audio/` directory
4. **Restart game** - Audio loads automatically

### Modifying Game Balance

Edit `src/game/config.ts` to adjust game difficulty:

```typescript
// Make game easier
player: {
  speed: 250,        // Faster player
  maxHealth: 150,    // More health
}
enemy: {
  speed: 80,         // Slower enemies
  damage: 5,         // Less damage
  spawnInterval: 5000 // Spawn less frequently
}

// Make game harder
player: {
  speed: 150,        // Slower player
  maxHealth: 50,     // Less health
}
enemy: {
  speed: 120,        // Faster enemies
  damage: 20,        // More damage
  spawnInterval: 2000 // Spawn more frequently
}
```

## Troubleshooting

### Game Not Running

- Check console for errors (F12)
- Ensure all dependencies are installed (`npm install`)
- Restart the dev server (`npm run dev`)

### Poor Performance

- Close other browser tabs
- Disable debug features (FPS, collision boxes)
- Check system resources
- Try a different browser (Chrome recommended)

### Controls Not Working

- Click on the game canvas to focus
- Check if browser is blocking keyboard input
- Reload the page
- Try touch controls if on mobile

### Audio Not Playing

- Check browser audio permissions
- Ensure audio files are in correct directory
- Verify file formats are supported
- Check master volume settings

## Future Features

Coming soon to Ruins of Arkan:

- ⚔️ **Weapon System** - Fight back against enemies
- 🎯 **Power-Ups** - Temporary abilities and buffs
- 🗺️ **Multiple Levels** - Different environments and challenges
- 👾 **Boss Battles** - Epic encounters
- 📊 **Leaderboards** - Compete globally
- 🎨 **Visual Effects** - Particles, animations, and polish
- 🎵 **Music System** - Background music and soundtracks

## Community

- Report bugs and request features in GitHub Issues
- Share your high scores and strategies
- Contribute to the project (see CONTRIBUTING.md)
- Join the discussion and help improve the game!

---

**Good luck, adventurer! May you survive the Ruins of Arkan!** 🎮
