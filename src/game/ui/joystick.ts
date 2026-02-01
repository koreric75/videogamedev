/**
 * Mobile Touch Controls
 * Virtual joystick and action buttons for mobile gameplay
 */

export class VirtualJoystick {
  private element: HTMLElement;
  private joystick: HTMLDivElement;
  private stick: HTMLDivElement;
  private active: boolean = false;
  private startX: number = 0;
  private startY: number = 0;
  private currentX: number = 0;
  private currentY: number = 0;

  constructor(parent: HTMLElement) {
    this.element = parent;
    this.joystick = this.createJoystick();
    this.stick = this.joystick.querySelector('.stick') as HTMLDivElement;
    this.setupListeners();
  }

  private createJoystick(): HTMLDivElement {
    const joystick = document.createElement('div');
    joystick.className = 'virtual-joystick';
    joystick.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      z-index: 1000;
      display: none;
    `;

    const stick = document.createElement('div');
    stick.className = 'stick';
    stick.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    `;

    joystick.appendChild(stick);
    this.element.appendChild(joystick);

    // Show joystick on touch devices
    if ('ontouchstart' in window) {
      joystick.style.display = 'block';
    }

    return joystick;
  }

  private setupListeners(): void {
    this.joystick.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.active = true;
      const touch = e.touches[0];
      const rect = this.joystick.getBoundingClientRect();
      this.startX = rect.left + rect.width / 2;
      this.startY = rect.top + rect.height / 2;
    });

    window.addEventListener('touchmove', (e) => {
      if (!this.active) return;
      e.preventDefault();
      const touch = e.touches[0];
      this.currentX = touch.clientX - this.startX;
      this.currentY = touch.clientY - this.startY;

      // Limit stick movement
      const maxDistance = 30;
      const distance = Math.sqrt(this.currentX ** 2 + this.currentY ** 2);
      if (distance > maxDistance) {
        this.currentX = (this.currentX / distance) * maxDistance;
        this.currentY = (this.currentY / distance) * maxDistance;
      }

      // Update stick position
      this.stick.style.transform = `translate(calc(-50% + ${this.currentX}px), calc(-50% + ${this.currentY}px))`;
    });

    window.addEventListener('touchend', () => {
      this.active = false;
      this.currentX = 0;
      this.currentY = 0;
      this.stick.style.transform = 'translate(-50%, -50%)';
    });
  }

  getAxis(): { x: number; y: number } {
    return {
      x: this.currentX / 30,
      y: this.currentY / 30,
    };
  }
}

export class ActionButton {
  private button: HTMLButtonElement;
  private pressed: boolean = false;

  constructor(parent: HTMLElement) {
    this.button = this.createButton();
    parent.appendChild(this.button);
    this.setupListeners();
  }

  private createButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'action-button';
    button.textContent = 'A';
    button.style.cssText = `
      position: fixed;
      bottom: 40px;
      right: 40px;
      width: 60px;
      height: 60px;
      background: rgba(76, 175, 80, 0.7);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      color: white;
      font-size: 20px;
      font-weight: bold;
      z-index: 1000;
      display: none;
      cursor: pointer;
    `;

    // Show button on touch devices
    if ('ontouchstart' in window) {
      button.style.display = 'block';
    }

    return button;
  }

  private setupListeners(): void {
    this.button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.pressed = true;
      this.button.style.background = 'rgba(76, 175, 80, 1)';
    });

    this.button.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.pressed = false;
      this.button.style.background = 'rgba(76, 175, 80, 0.7)';
    });
  }

  isPressed(): boolean {
    return this.pressed;
  }
}

export class FireButton {
  private button: HTMLButtonElement;
  private pressed: boolean = false;

  constructor(parent: HTMLElement) {
    this.button = this.createButton();
    parent.appendChild(this.button);
    this.setupListeners();
  }

  private createButton(): HTMLButtonElement {
    const button = document.createElement('button');
    button.className = 'fire-button';
    button.textContent = 'B';
    button.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 100px;
      width: 50px;
      height: 50px;
      background: rgba(244, 67, 54, 0.7);
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      color: white;
      font-size: 18px;
      font-weight: bold;
      z-index: 1000;
      display: none;
      cursor: pointer;
    `;

    // Show button on touch devices
    if ('ontouchstart' in window) {
      button.style.display = 'block';
    }

    return button;
  }

  private setupListeners(): void {
    this.button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.pressed = true;
      this.button.style.background = 'rgba(244, 67, 54, 1)';
    });

    this.button.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.pressed = false;
      this.button.style.background = 'rgba(244, 67, 54, 0.7)';
    });
  }

  isPressed(): boolean {
    return this.pressed;
  }
}
