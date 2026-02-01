/**
 * Input System
 * Centralized keyboard, mouse, and touch input handling
 */

export interface InputState {
  keys: Set<string>;
  mouse: {
    x: number;
    y: number;
    pressed: boolean;
  };
  touch: {
    active: boolean;
    x: number;
    y: number;
  };
}

export class InputSystem {
  private state: InputState = {
    keys: new Set(),
    mouse: { x: 0, y: 0, pressed: false },
    touch: { active: false, x: 0, y: 0 },
  };
  
  private canvas: HTMLCanvasElement;
  
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.setupListeners();
  }
  
  private setupListeners(): void {
    // Keyboard events
    window.addEventListener('keydown', (e) => {
      this.state.keys.add(e.key.toLowerCase());
    });
    
    window.addEventListener('keyup', (e) => {
      this.state.keys.delete(e.key.toLowerCase());
    });
    
    // Mouse events
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.state.mouse.x = e.clientX - rect.left;
      this.state.mouse.y = e.clientY - rect.top;
    });
    
    this.canvas.addEventListener('mousedown', () => {
      this.state.mouse.pressed = true;
    });
    
    this.canvas.addEventListener('mouseup', () => {
      this.state.mouse.pressed = false;
    });
    
    // Touch events
    this.canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.state.touch.active = true;
      this.state.touch.x = touch.clientX - rect.left;
      this.state.touch.y = touch.clientY - rect.top;
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      const touch = e.touches[0];
      this.state.touch.x = touch.clientX - rect.left;
      this.state.touch.y = touch.clientY - rect.top;
    });
    
    this.canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      this.state.touch.active = false;
    });
  }
  
  /**
   * Check if a key is currently pressed
   */
  isKeyPressed(key: string): boolean {
    return this.state.keys.has(key.toLowerCase());
  }
  
  /**
   * Check if any of the specified keys are pressed
   */
  isAnyKeyPressed(keys: string[]): boolean {
    return keys.some(key => this.isKeyPressed(key));
  }
  
  /**
   * Get horizontal input (-1 to 1)
   */
  getHorizontal(): number {
    let horizontal = 0;
    
    if (this.isAnyKeyPressed(['a', 'arrowleft'])) {
      horizontal -= 1;
    }
    if (this.isAnyKeyPressed(['d', 'arrowright'])) {
      horizontal += 1;
    }
    
    return horizontal;
  }
  
  /**
   * Get vertical input (-1 to 1)
   */
  getVertical(): number {
    let vertical = 0;
    
    if (this.isAnyKeyPressed(['w', 'arrowup'])) {
      vertical -= 1;
    }
    if (this.isAnyKeyPressed(['s', 'arrowdown'])) {
      vertical += 1;
    }
    
    return vertical;
  }
  
  /**
   * Get mouse position
   */
  getMousePosition(): { x: number; y: number } {
    return { x: this.state.mouse.x, y: this.state.mouse.y };
  }
  
  /**
   * Check if mouse is pressed
   */
  isMousePressed(): boolean {
    return this.state.mouse.pressed;
  }
  
  /**
   * Get touch position
   */
  getTouchPosition(): { x: number; y: number } | null {
    if (!this.state.touch.active) return null;
    return { x: this.state.touch.x, y: this.state.touch.y };
  }
  
  /**
   * Check if touch is active
   */
  isTouchActive(): boolean {
    return this.state.touch.active;
  }
  
  /**
   * Clear all input states (useful when switching scenes)
   */
  clear(): void {
    this.state.keys.clear();
    this.state.mouse.pressed = false;
    this.state.touch.active = false;
  }
}
