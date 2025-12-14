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
