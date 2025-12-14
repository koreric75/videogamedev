import { MainScene } from './scenes/mainScene';

class GameEngine {
    private isRunning: boolean;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private scene: MainScene;
    private lastTime: number;

    constructor() {
        this.isRunning = false;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 640;
        this.canvas.height = 360;
        this.canvas.style.width = '100%';
        this.canvas.style.height = 'auto';
        document.body.appendChild(this.canvas);
        const ctx = this.canvas.getContext('2d');
        if (!ctx) throw new Error('Unable to get canvas context');
        this.ctx = ctx;

        this.scene = new MainScene(this.canvas);
        // preload sprites
        import('./core/assets').then(m => m.loadDefaultSprites()).catch(() => {/* ignore */});
        // preload audio if available
        import('./core/audio').then(a => a.loadDefaults()).catch(() => {/* ignore */});
        this.lastTime = performance.now();
        // attach mobile controls when touch is available
        try {
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                import('./ui/joystick').then(m => {
                    new m.VirtualJoystick(document.body);
                    new m.ActionButton(document.body);
                    if (m.FireButton) new m.FireButton(document.body);
                });
            }
            // sprite inspector (use KeyI)
            import('./ui/spriteInspector').then(m => {
                // create inspector overlay
                const inspector = new m.SpriteInspector(document.body);
                // expose for debug
                (window as any).__spriteInspector = inspector;
            });
        } catch (e) {
            // ignore
        }
    }

    start() {
        this.isRunning = true;
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.gameLoop(t));
    }

    stop() {
        this.isRunning = false;
    }

    private gameLoop(timestamp: number) {
        if (!this.isRunning) return;
        const deltaTime = Math.min((timestamp - this.lastTime) / 1000, 0.05);
        this.lastTime = timestamp;

        this.scene.update(deltaTime);

        // update optional inspector
        try {
            const insp = (window as any).__spriteInspector;
            if (insp && typeof insp.update === 'function') insp.update(deltaTime);
        } catch (e) {
            // ignore
        }

        // clear
        this.ctx.fillStyle = '#222';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.scene.render(this.ctx);

        requestAnimationFrame((t) => this.gameLoop(t));
    }
}

export default GameEngine;