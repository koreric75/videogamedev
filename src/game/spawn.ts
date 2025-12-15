export type PlacedSprite = { name: string; x: number; y: number };

const placedSprites: PlacedSprite[] = [];

export function getPlacedSprites() {
  return placedSprites;
}

export function clearPlacedSprites() {
  placedSprites.length = 0;
}

export function spawnSpriteAt(name: string, x: number, y: number) {
  const sprite = { name, x, y };
  placedSprites.push(sprite);
  // Dispatch a DOM event so other parts of the app can listen
  try {
    const ev = new CustomEvent('spriteSpawned', { detail: sprite });
    if (typeof document !== 'undefined' && document.dispatchEvent) document.dispatchEvent(ev);
  } catch (e) {
    // ignore
  }
  return sprite;
}

export default { spawnSpriteAt, getPlacedSprites, clearPlacedSprites };
