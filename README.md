# my-game — Ruins of Arkan (Prototype)

A compact top-down roguelite prototype built in TypeScript and HTML5 Canvas.

Quick start (dev server):

```powershell
npm install
npm run dev
```

Open http://localhost:5173 in your browser. Use WASD / arrow keys to move; collect blue pickups to heal; avoid orange enemies.

Mobile / touch controls:
- If you're on a touchscreen device, a **virtual joystick** and an **action button** appear automatically (bottom-left and bottom-right). Use the action button to start, open options (press O on keyboard) or restart after death.

Artist assets:
- Drop sprite files into `assets/sprites` with the filenames: `player.svg`, `enemy.svg`, `pickup.svg`, `wall.svg`. The game will automatically use those images; if they're missing, placeholders are generated.
- For animated SVG frames (vector frame sets): name files like `player_idle_0.svg`, `player_run_0.svg`, `player_run_1.svg`, etc. The engine will automatically load `player_idle` and `player_run` sequences when present and animate them.

Debugging / inspection:
- Press `I` to open the **Sprite Inspector** during gameplay — preview sequences, play/pause frames, step frames, and toggle "Prefer Cartoon" to swap cartoon variants.

Audio:
- The game uses a small built-in audio manager and will play simple SFX for pickup/hit/start/death. If you add audio files to `assets/audio` later, the audio manager will load them when present.

Build for production:

```powershell
npm run build
npm run preview
```

Project layout (relevant parts):

```
src/
  main.ts
  game/
    engine.ts
    scenes/mainScene.ts
    entities/player.ts
    systems/physics.ts
    levels/roomGenerator.ts
tests/
  game.test.ts
docs/design.md
index.html
```

