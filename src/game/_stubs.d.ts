declare module './scenes/mainScene' {
  export class MainScene {
    constructor(canvas: HTMLCanvasElement);
    update(dt: number): void;
    render(ctx: CanvasRenderingContext2D): void;
  }
}

declare module './core/assets' {
  export function loadDefaultSprites(): Promise<void>;
}

declare module './core/audio' {
  export function loadDefaults(): Promise<void>;
}

declare module './ui/joystick' {
  export class VirtualJoystick {
    constructor(el: HTMLElement);
  }
  export class ActionButton {
    constructor(el: HTMLElement);
  }
  export class FireButton {
    constructor(el: HTMLElement);
  }
}

declare module './ui/spriteInspector' {
  export class SpriteInspector {
    constructor(el: HTMLElement);
    update?(dt: number): void;
  }
  export default SpriteInspector;
}
