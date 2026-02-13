/**
 * Audio System
 * Handles audio loading and playback with advanced Web Audio API features
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
  
  // Background music with Web Audio API for advanced effects
  private bgMusic: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  // eslint-disable-next-line no-undef
  private sourceNode: MediaElementAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private lowPassFilter: BiquadFilterNode | null = null;
  private gainReduction: GainNode | null = null;
  private currentMusicDuration: number = 0;
  private musicStartTime: number = 0;

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
    if (this.gainNode) {
      this.gainNode.gain.value = this.config.volume;
    }
  }

  /**
   * Enable or disable audio
   */
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }
  
  /**
   * Load background music from a file
   */
  async loadBackgroundMusic(file: File): Promise<number> {
    try {
      // Stop any existing music
      this.stopBackgroundMusic();
      
      // Create audio element from file
      const url = URL.createObjectURL(file);
      this.bgMusic = new Audio(url);
      this.bgMusic.loop = true;
      
      // Wait for metadata to load to get duration
      await new Promise<void>((resolve, reject) => {
        if (!this.bgMusic) {
          reject(new Error('No music loaded'));
          return;
        }
        this.bgMusic.addEventListener('loadedmetadata', () => resolve(), { once: true });
        this.bgMusic.addEventListener('error', () => reject(new Error('Failed to load music')), { once: true });
      });
      
      this.currentMusicDuration = this.bgMusic.duration;
      
      // Setup Web Audio API for effects
      this.setupAudioContext();
      
      return this.currentMusicDuration;
    } catch (e) {
      console.error('Failed to load background music:', e);
      throw e;
    }
  }
  
  /**
   * Setup Web Audio API context and effects chain
   */
  private setupAudioContext(): void {
    if (!this.bgMusic) return;
    
    // Create audio context if not exists
    if (!this.audioContext) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    // Create source node from audio element
    this.sourceNode = this.audioContext.createMediaElementSource(this.bgMusic);
    
    // Create gain node for volume control
    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = this.config.volume;
    
    // Create low-pass filter for quality degradation
    this.lowPassFilter = this.audioContext.createBiquadFilter();
    this.lowPassFilter.type = 'lowpass';
    this.lowPassFilter.frequency.value = 22050; // Start at full quality
    this.lowPassFilter.Q.value = 1;
    
    // Create gain reduction for bit-crushing effect simulation
    this.gainReduction = this.audioContext.createGain();
    this.gainReduction.gain.value = 1.0;
    
    // Connect the audio graph: source -> lowpass -> gainReduction -> gain -> destination
    this.sourceNode.connect(this.lowPassFilter);
    this.lowPassFilter.connect(this.gainReduction);
    this.gainReduction.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
  }
  
  /**
   * Play background music
   */
  playBackgroundMusic(): void {
    if (!this.config.enabled || !this.bgMusic) return;
    
    this.musicStartTime = performance.now();
    this.bgMusic.play().catch(() => {
      // Ignore autoplay errors
    });
  }
  
  /**
   * Stop background music
   */
  stopBackgroundMusic(): void {
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
      
      // Disconnect nodes
      if (this.sourceNode) {
        try {
          this.sourceNode.disconnect();
        } catch (e) {
          // Already disconnected
        }
      }
      
      this.bgMusic = null;
      this.sourceNode = null;
    }
  }
  
  /**
   * Update music quality based on health percentage (0-1)
   * 1.0 = full health (pristine audio), 0.0 = critical health (8-bit degraded)
   */
  updateMusicQuality(healthPercent: number): void {
    if (!this.lowPassFilter || !this.gainReduction) return;
    
    // Map health to filter frequency (100% = 22050Hz, 0% = 1000Hz for 8-bit sound)
    const minFreq = 1000;  // Very degraded, NES-like
    const maxFreq = 22050; // Full quality
    const frequency = minFreq + (maxFreq - minFreq) * healthPercent;
    this.lowPassFilter.frequency.value = frequency;
    
    // Add some gain reduction at low health for additional degradation
    const gainValue = 0.7 + (0.3 * healthPercent); // Range from 0.7 to 1.0
    this.gainReduction.gain.value = gainValue;
  }
  
  /**
   * Get music duration in seconds
   */
  getMusicDuration(): number {
    return this.currentMusicDuration;
  }
  
  /**
   * Get elapsed time since music started
   */
  getElapsedTime(): number {
    if (this.musicStartTime === 0) return 0;
    return (performance.now() - this.musicStartTime) / 1000;
  }
  
  /**
   * Check if background music is loaded
   */
  hasBackgroundMusic(): boolean {
    return this.bgMusic !== null;
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
