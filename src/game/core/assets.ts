type SpriteMap = { [key: string]: HTMLImageElement };

const sprites: SpriteMap = {};
const sequences: { [key: string]: HTMLImageElement[] } = {};

export async function loadSprite(name: string, path: string) {
    if (sprites[name]) return sprites[name];

    try {
        const img = new Image();
        img.src = path;
        await new Promise((res, rej) => {
            img.onload = () => res(true);
            img.onerror = () => rej(new Error('Load failed'));
        });
        sprites[name] = img;
        return img;
    } catch (e) {
        // create placeholder canvas image
        const cvs = document.createElement('canvas');
        cvs.width = 32;
        cvs.height = 32;
        const ctx = cvs.getContext('2d')!;
        ctx.fillStyle = '#888';
        ctx.fillRect(0, 0, 32, 32);
        ctx.fillStyle = '#fff';
        ctx.fillRect(6, 6, 20, 20);
        const img = new Image();
        img.src = cvs.toDataURL();
        sprites[name] = img;
        return img;
    }
}

export async function loadDefaultSprites(): Promise<void> {
    // Try to load default sprites if they exist
    const defaultSprites = [
        { name: 'player', path: 'assets/sprites/player.svg' },
        { name: 'enemy', path: 'assets/sprites/enemy.svg' },
        { name: 'pickup', path: 'assets/sprites/pickup.svg' },
        { name: 'wall', path: 'assets/sprites/wall.svg' },
    ];

    for (const { name, path } of defaultSprites) {
        await loadSprite(name, path).catch(() => {
            // Ignore missing files - will use placeholders
        });
    }
}

export function getSprite(name: string): HTMLImageElement | undefined {
    return sprites[name];
}

export function getAllSprites(): SpriteMap {
    return { ...sprites };
}