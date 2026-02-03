# Assets Guide

This guide explains how to work with game assets (sprites, audio, and other media) in Ruins of Arkan.

## Table of Contents

- [Asset Structure](#asset-structure)
- [Sprite Assets](#sprite-assets)
- [Audio Assets](#audio-assets)
- [Creating Custom Assets](#creating-custom-assets)
- [Asset Guidelines](#asset-guidelines)
- [Troubleshooting](#troubleshooting)

## Asset Structure

```
assets/
├── sprites/          # Visual assets (PNG, SVG, JPEG)
│   ├── player.svg    # Player character sprite
│   ├── enemy.svg     # Enemy sprite
│   ├── pickup.svg    # Pickup item sprite
│   └── wall.svg      # Wall/obstacle sprite
└── audio/            # Sound effects and music (MP3, OGG, WAV)
    ├── pickup.mp3    # Pickup collection sound
    ├── hit.mp3       # Player hit sound
    ├── death.mp3     # Player death sound
    └── start.mp3     # Game start sound
```

## Sprite Assets

### Supported Formats

- **SVG** (Recommended) - Scalable, looks good at any size
- **PNG** - Best for detailed pixel art or photos
- **JPEG** - Use for complex backgrounds

### Required Sprites

The game expects these sprite files (in `assets/sprites/`):

| File | Purpose | Default Size | Fallback Color |
|------|---------|--------------|----------------|
| `player.svg` | Player character | 32x32 px | Green (#4ecca3) |
| `enemy.svg` | Enemy entity | 32x32 px | Orange (#ff6b6b) |
| `pickup.svg` | Health pickup | 24x24 px | Cyan (#4ecdc4) |
| `wall.svg` | Wall/obstacle (future) | 32x32 px | Gray (#666666) |

### Fallback Behavior

If a sprite file is missing, the game will:
1. Generate a colored placeholder square
2. Use the color specified in `config.ts`
3. Display a console warning

This allows the game to run even without custom sprites.

### Adding Custom Sprites

**Method 1: File System**

1. Create or obtain your sprite image
2. Name it according to the table above
3. Place it in `assets/sprites/` directory
4. Restart the dev server
5. Sprite loads automatically!

**Method 2: Drag and Drop**

1. Run the game (`npm run dev`)
2. Drag an image file onto the game canvas
3. The sprite will be spawned at that location
4. Useful for testing sprite appearance

### Sprite Specifications

**Player Sprite**
- Size: 32x32 pixels (or scalable SVG)
- Style: Top-down view, facing up
- Color scheme: Green/bright colors for visibility
- Transparency: Use alpha channel for rounded edges

**Enemy Sprite**
- Size: 32x32 pixels
- Style: Top-down view
- Color scheme: Red/orange for danger indication
- Should look distinct from player

**Pickup Sprite**
- Size: 24x24 pixels (smaller than entities)
- Style: Recognizable as beneficial item
- Color scheme: Blue/cyan for health
- Can include visual effects (glow, sparkle)

### Sprite Templates

Here's a simple SVG template for creating sprites:

```svg
<!-- player.svg -->
<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="14" fill="#4ecca3" stroke="#fff" stroke-width="2"/>
  <path d="M 16 8 L 12 16 L 16 14 L 20 16 Z" fill="#fff"/>
</svg>
```

```svg
<!-- enemy.svg -->
<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="14" fill="#ff6b6b" stroke="#000" stroke-width="2"/>
  <circle cx="12" cy="12" r="3" fill="#000"/>
  <circle cx="20" cy="12" r="3" fill="#000"/>
</svg>
```

```svg
<!-- pickup.svg -->
<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="10" fill="#4ecdc4" opacity="0.8"/>
  <path d="M 12 4 L 12 20 M 4 12 L 20 12" stroke="#fff" stroke-width="2"/>
</svg>
```

## Audio Assets

### Supported Formats

- **MP3** (Recommended) - Wide browser support, good compression
- **OGG** - Alternative format, good quality
- **WAV** - Uncompressed, large file size

### Required Audio Files

Place these files in `assets/audio/`:

| File | Purpose | Duration | Type |
|------|---------|----------|------|
| `pickup.mp3` | Pickup collection | 0.5s | Sound effect |
| `hit.mp3` | Player takes damage | 0.3s | Sound effect |
| `death.mp3` | Player death | 1-2s | Sound effect |
| `start.mp3` | Game start | 1-2s | Sound effect |

### Optional Audio

| File | Purpose | Type |
|------|---------|------|
| `bgm.mp3` | Background music | Music |
| `shoot.mp3` | Weapon firing (future) | Sound effect |
| `explosion.mp3` | Explosions (future) | Sound effect |
| `powerup.mp3` | Power-up activation (future) | Sound effect |

### Audio Specifications

**Sound Effects**
- Format: MP3 or OGG
- Sample rate: 44.1kHz
- Bit rate: 128kbps (minimum)
- Duration: 0.2s - 2s (keep short)
- Volume: Normalized to prevent clipping

**Music**
- Format: MP3 or OGG
- Sample rate: 44.1kHz
- Bit rate: 192kbps (good quality)
- Duration: 1-3 minutes (looping)
- Volume: Lower than sound effects

### Adding Custom Audio

1. Create or obtain your audio file
2. Convert to MP3 or OGG if needed
3. Name according to the tables above
4. Place in `assets/audio/` directory
5. Restart the dev server
6. Audio loads automatically!

### Audio Configuration

Adjust audio in `src/game/config.ts`:

```typescript
audio: {
  volume: 0.7,      // Overall volume (0.0 - 1.0)
  enabled: true     // Enable/disable all audio
}
```

Note: The current AudioManager implementation supports `volume` and `enabled` settings. More granular controls (like separate `sfxVolume` and `musicVolume`) are planned for future versions.

## Creating Custom Assets

### Tools for Creating Sprites

**Free Tools:**
- [Inkscape](https://inkscape.org/) - SVG editor (recommended)
- [GIMP](https://www.gimp.org/) - Raster graphics editor
- [Piskel](https://www.piskelapp.com/) - Pixel art editor
- [Aseprite](https://www.aseprite.org/) - Pixel art (paid)

**Online Tools:**
- [Figma](https://www.figma.com/) - Vector design
- [Pixlr](https://pixlr.com/) - Online image editor
- [Method Draw](https://editor.method.ac/) - Simple SVG editor

### Tools for Creating Audio

**Free Tools:**
- [Audacity](https://www.audacityteam.org/) - Audio editing
- [LMMS](https://lmms.io/) - Music creation
- [Bfxr](https://www.bfxr.net/) - Sound effect generator
- [ChipTone](https://sfbgames.itch.io/chiptone) - Retro sound effects

**Sound Libraries:**
- [Freesound.org](https://freesound.org/) - Free sound effects
- [OpenGameArt.org](https://opengameart.org/) - Free game assets
- [Incompetech](https://incompetech.com/) - Royalty-free music

## Asset Guidelines

### Sprite Design Guidelines

**Visual Consistency**
- Use similar art style across all sprites
- Maintain consistent color palette
- Match perspective (all top-down)
- Similar level of detail

**Color Guidelines**
- **Player**: Bright, friendly colors (green, blue)
- **Enemies**: Danger colors (red, orange, yellow)
- **Pickups**: Beneficial colors (cyan, blue, green)
- **Neutral**: Gray, brown for obstacles

**Size Guidelines**
- Keep sprites at defined pixel sizes
- Use power of 2 dimensions when possible (32x32, 64x64)
- Ensure readability at small sizes
- Test in-game to verify visibility

**Performance Guidelines**
- Keep file sizes small (< 50KB per sprite)
- Use SVG for simple shapes
- Use PNG for detailed artwork
- Optimize images before adding to project

### Audio Design Guidelines

**Sound Effects**
- Short and punchy (< 1 second)
- Clear and recognizable
- Not too loud or jarring
- Match the action (pickup = positive sound)

**Music**
- Loop-friendly (seamless transitions)
- Not too repetitive
- Matches game mood
- Doesn't overpower sound effects

**Technical Quality**
- No clipping or distortion
- Proper normalization
- Consistent volume across files
- Compressed appropriately

## Advanced Asset Features

### Animated Sprites (Future)

Support for sprite animations is planned:

```
assets/sprites/
├── player/
│   ├── idle.png       # Idle animation frames
│   ├── walk.png       # Walking animation
│   └── attack.png     # Attack animation
```

Animation configuration:
```typescript
{
  frameWidth: 32,
  frameHeight: 32,
  frameCount: 4,
  frameRate: 10  // frames per second
}
```

### Sprite Sheets (Future)

Multiple sprites in one image:

```
[player_idle_1][player_idle_2][player_walk_1][player_walk_2]
```

### Dynamic Assets

Load assets at runtime:

```typescript
import { assetManager } from './game/core/assets';

// Load custom sprite
const customSprite = await assetManager.loadImage('path/to/sprite.png');

// Load custom audio
await audioManager.loadSound('custom', 'path/to/sound.mp3');
```

## Troubleshooting

### Sprites Not Loading

**Problem**: Sprites don't appear or placeholders are shown

**Solutions**:
1. Check file names match exactly (case-sensitive)
2. Verify files are in `assets/sprites/` directory
3. Check browser console for errors
4. Try hard refresh (Ctrl+Shift+R)
5. Verify file format is supported (SVG, PNG, JPEG)

### Audio Not Playing

**Problem**: Sound effects don't play

**Solutions**:
1. Check file names match exactly
2. Verify files are in `assets/audio/` directory
3. Check browser audio permissions
4. Ensure audio format is supported (MP3, OGG)
5. Check master volume setting
6. Try different browser

### Performance Issues

**Problem**: Game runs slowly after adding assets

**Solutions**:
1. Optimize image file sizes
2. Reduce audio quality/bitrate
3. Use SVG instead of large PNG files
4. Compress images before adding
5. Limit number of simultaneous audio plays

### File Size Limits

**Recommended Limits**:
- Sprites: < 50KB each
- Sound effects: < 100KB each
- Music: < 5MB each
- Total assets: < 20MB

Large files can cause:
- Slow loading times
- High memory usage
- Poor performance on mobile devices

## Asset Export Scripts

The project includes helper scripts for asset management:

```bash
# Export sprites to different formats (available)
npm run export:sprites
```

Note: The `optimize:images` and `convert:audio` scripts are not currently implemented. If you need image optimization or audio conversion, you can add these scripts to `package.json` and implement them in the `scripts/` directory.

The `export:sprites` script is currently defined in `scripts/export-sprites.js` and available for use.

## Contributing Assets

Want to contribute assets to the project?

1. Follow the guidelines above
2. Ensure you have rights to the assets
3. Include attribution if required
4. Submit via pull request
5. Add documentation for new assets

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution guidelines.

## Resources

**Learning Resources**:
- [Pixel Art Tutorial](https://www.pixilart.com/tutorials)
- [SVG Tutorial](https://www.w3schools.com/graphics/svg_intro.asp)
- [Game Audio Guide](https://www.gamedev.net/tutorials/audio/)

**Asset Packs**:
- [Kenny.nl](https://kenney.nl/) - Free game assets
- [itch.io](https://itch.io/game-assets/free) - Free and paid assets
- [OpenGameArt](https://opengameart.org/) - Community assets

---

**Need help?** Open an issue on GitHub or check the [documentation](../README.md).
