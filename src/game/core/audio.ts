/**
 * Audio System
 * Handles audio loading and playback
 */

export interface AudioConfig {
  volume: number;
  enabled: boolean;
}

class AudioManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private config: AudioConfig = {
    volume: 0.5,
    enabled: true,
  };

  /**
   * Load an audio file
   */
  async loadSound(name: string, url: string): Promise<void> {
    try {
      const audio = new Audio(url);
      audio.volume = this.config.volume;
      this.sounds.set(name, audio);
    } catch (e) {
      console.warn(`Failed to load sound: ${name}`, e);
    }
  }

  /**
   * Play a sound
   */
  play(name: string): void {
    if (!this.config.enabled) return;

    const sound = this.sounds.get(name);
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }

  /**
   * Set volume (0 to 1)
   */
  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume));
    for (const sound of this.sounds.values()) {
      sound.volume = this.config.volume;
    }
  }

  /**
   * Enable or disable audio
   */
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }
}

// Singleton instance
const audioManager = new AudioManager();

/**
 * Load default audio files
 */
export async function loadDefaults(): Promise<void> {
  // Try to load default audio files if they exist
  const defaultSounds = [
    { name: 'pickup', url: 'assets/audio/pickup.mp3' },
    { name: 'hit', url: 'assets/audio/hit.mp3' },
    { name: 'death', url: 'assets/audio/death.mp3' },
    { name: 'start', url: 'assets/audio/start.mp3' },
  ];

  for (const { name, url } of defaultSounds) {
    await audioManager.loadSound(name, url).catch(() => {
      // Ignore missing files
    });
  }
}

export default audioManager;
