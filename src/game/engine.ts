import * as Spawner from './spawn';

class GameEngine {
    private isRunning: boolean;
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private scene: any;
    private lastTime: number;

    constructor() {
        this.isRunning = false;
        this.canvas = document.createElement('canvas');
        this.canvas.width = 640;
        this.canvas.height = 360;
        this.canvas.style.width = '100%';
        this.canvas.style.height = 'auto';
        document.body.appendChild(this.canvas);
        let ctx: CanvasRenderingContext2D | null = null;
        try {
            ctx = this.canvas.getContext('2d');
        } catch (e) {
            ctx = null;
        }
        if (!ctx) {
            // provide a minimal stub for test environments (jsdom w/o canvas)
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            ctx = ({
                fillStyle: '#000',
                fillRect: (_x: number, _y: number, _w: number, _h: number) => {},
            } as unknown) as CanvasRenderingContext2D;
        }
        this.ctx = ctx;

        // try to dynamically import the MainScene; if missing, use a minimal stub
        this.scene = { update: (_dt: number) => {}, render: (_ctx: any) => {} };
        // @ts-ignore - optional runtime module, may not exist in test env
        import('./scenes/mainScene').then(m => {
            try {
                this.scene = new m.MainScene(this.canvas);
            } catch (e) {
                // keep stub
            }
        }).catch(() => {
            // keep stub
        });
        // allow drag-to-insert sprites onto the canvas
        this.canvas.addEventListener('dragover', (ev) => ev.preventDefault());
        this.canvas.addEventListener('drop', (ev: DragEvent) => {
            ev.preventDefault();
            const dt = ev.dataTransfer;
            let name = 'sprite';
            if (dt) {
                if (dt.files && dt.files.length > 0) {
                    name = dt.files[0].name.replace(/\.[^/.]+$/, '');
                } else {
                    name = dt.getData('text/plain') || name;
                }
            }
            const rect = this.canvas.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const y = ev.clientY - rect.top;
            // spawn placed sprite and dispatch event
            try {
                Spawner.spawnSpriteAt(name, x, y);
            } catch (e) {
                // ignore
            }
        });
        // preload sprites
        // @ts-ignore - optional runtime module, may not exist in test env
        import('./core/assets').then(m => m.loadDefaultSprites()).catch(() => {/* ignore */});
        // preload audio if available
        // @ts-ignore - optional runtime module, may not exist in test env
        import('./core/audio').then(a => a.loadDefaults()).catch(() => {/* ignore */});
        this.lastTime = performance.now();
        // attach mobile controls when touch is available
        try {
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                // @ts-ignore - optional runtime module, may not exist in test env
                import('./ui/joystick').then(m => {
                    new m.VirtualJoystick(document.body);
                    new m.ActionButton(document.body);
                    if (m.FireButton) new m.FireButton(document.body);
                });
            }
            // sprite inspector (use KeyI)
            // @ts-ignore - optional runtime module, may not exist in test env
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