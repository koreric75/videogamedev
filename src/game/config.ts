/**
 * Game Configuration
 * Central configuration for all game constants and settings
 */

export interface GameConfig {
  canvas: {
    width: number;
    height: number;
    backgroundColor: string;
  };
  player: {
    speed: number;
    maxHealth: number;
    size: number;
    color: string;
  };
  enemy: {
    speed: number;
    damage: number;
    size: number;
    color: string;
    spawnInterval: number;
  };
  pickup: {
    healAmount: number;
    size: number;
    color: string;
    spawnInterval: number;
  };
  physics: {
    friction: number;
    maxVelocity: number;
  };
  ui: {
    joystickSize: number;
    buttonSize: number;
    fontSize: number;
  };
  assets: {
    placeholderSize: number;
    spritesPath: string;
    audioPath: string;
  };
  debug: {
    showFPS: boolean;
    showColliders: boolean;
    enableInspector: boolean;
  };
}

export const config: GameConfig = {
  canvas: {
    width: 640,
    height: 360,
    backgroundColor: '#1a1a2e',
  },
  player: {
    speed: 200, // pixels per second
    maxHealth: 100,
    size: 32,
    color: '#4ecca3',
  },
  enemy: {
    speed: 100,
    damage: 10,
    size: 32,
    color: '#ff6b6b',
    spawnInterval: 3000, // ms
  },
  pickup: {
    healAmount: 20,
    size: 24,
    color: '#4ecdc4',
    spawnInterval: 5000, // ms
  },
  physics: {
    friction: 0.8,
    maxVelocity: 500,
  },
  ui: {
    joystickSize: 80,
    buttonSize: 60,
    fontSize: 16,
  },
  assets: {
    placeholderSize: 32,
    spritesPath: 'assets/sprites',
    audioPath: 'assets/audio',
  },
  debug: {
    showFPS: false,
    showColliders: false,
    enableInspector: true,
  },
};

/**
 * Get a configuration value by path
 * Example: getConfig('player.speed') returns 200
 */
export function getConfig(path: string): any {
  const keys = path.split('.');
  let value: any = config;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }
  
  return value;
}

/**
 * Set a configuration value by path (useful for runtime overrides)
 */
export function setConfig(path: string, newValue: any): void {
  const keys = path.split('.');
  const lastKey = keys.pop();
  
  if (!lastKey) return;
  
  let obj: any = config;
  for (const key of keys) {
    if (!(key in obj)) {
      obj[key] = {};
    }
    obj = obj[key];
  }
  
  obj[lastKey] = newValue;
}

export default config;
