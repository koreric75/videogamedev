import { spawnSpriteAt, getPlacedSprites, clearPlacedSprites } from '../src/game/spawn';
import GameEngine from '../src/game/engine';

describe('spawn sprite', () => {
  beforeEach(() => {
    clearPlacedSprites();
    // ensure DOM is clean
    document.body.innerHTML = '';
  });

  test('spawnSpriteAt records sprites', () => {
    const s = spawnSpriteAt('player', 10, 20);
    const list = getPlacedSprites();
    expect(list).toHaveLength(1);
    expect(list[0]).toEqual(s);
    expect(list[0].name).toBe('player');
  });

  test('dropping a file onto the canvas spawns a sprite', () => {
    const engine = new GameEngine();
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    expect(canvas).toBeTruthy();

    // create a fake File
    const file = new File(['<svg></svg>'], 'enemy.svg', { type: 'image/svg+xml' });

    const dt: any = {
      files: [file],
      getData: (_: string) => '',
    };

    const rect = canvas.getBoundingClientRect();
    const dropEvent: any = new Event('drop', { bubbles: true });
    dropEvent.dataTransfer = dt;
    // drop at center of canvas
    dropEvent.clientX = rect.left + 50;
    dropEvent.clientY = rect.top + 60;

    canvas.dispatchEvent(dropEvent);

    const list = getPlacedSprites();
    expect(list.length).toBeGreaterThanOrEqual(1);
    expect(list[0].name).toBe('enemy');
    expect(typeof list[0].x).toBe('number');
  });
});
