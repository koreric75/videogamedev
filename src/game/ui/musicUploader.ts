/**
 * Music Uploader UI
 * Allows users to upload background music for the fire realm challenge
 */

export class MusicUploader {
  private container: HTMLDivElement;
  private fileInput: HTMLInputElement;
  private uploadButton: HTMLButtonElement;
  private statusText: HTMLDivElement;
  private onMusicLoaded: ((file: File) => void) | null = null;
  
  constructor(parent: HTMLElement) {
    // Create container
    this.container = document.createElement('div');
    this.container.style.position = 'fixed';
    this.container.style.top = '10px';
    this.container.style.left = '50%';
    this.container.style.transform = 'translateX(-50%)';
    this.container.style.zIndex = '1000';
    this.container.style.background = 'rgba(0, 0, 0, 0.8)';
    this.container.style.padding = '15px 20px';
    this.container.style.borderRadius = '8px';
    this.container.style.display = 'flex';
    this.container.style.gap = '10px';
    this.container.style.alignItems = 'center';
    this.container.style.fontFamily = 'Arial, sans-serif';
    this.container.style.fontSize = '14px';
    this.container.style.color = '#ffffff';
    
    // Create file input
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.accept = 'audio/*';
    this.fileInput.style.display = 'none';
    this.fileInput.addEventListener('change', () => this.handleFileSelect());
    
    // Create upload button
    this.uploadButton = document.createElement('button');
    this.uploadButton.textContent = 'Upload Music for Fire Realm';
    this.uploadButton.style.padding = '8px 16px';
    this.uploadButton.style.background = '#ff6b35';
    this.uploadButton.style.border = 'none';
    this.uploadButton.style.borderRadius = '4px';
    this.uploadButton.style.color = '#ffffff';
    this.uploadButton.style.cursor = 'pointer';
    this.uploadButton.style.fontSize = '14px';
    this.uploadButton.style.fontWeight = 'bold';
    this.uploadButton.addEventListener('click', () => this.fileInput.click());
    this.uploadButton.addEventListener('mouseenter', () => {
      this.uploadButton.style.background = '#ff8555';
    });
    this.uploadButton.addEventListener('mouseleave', () => {
      this.uploadButton.style.background = '#ff6b35';
    });
    
    // Create status text
    this.statusText = document.createElement('div');
    this.statusText.style.color = '#aaaaaa';
    this.statusText.textContent = 'No music selected';
    
    // Assemble UI
    this.container.appendChild(this.uploadButton);
    this.container.appendChild(this.statusText);
    this.container.appendChild(this.fileInput);
    parent.appendChild(this.container);
  }
  
  private handleFileSelect(): void {
    const file = this.fileInput.files?.[0];
    if (!file) return;
    
    this.statusText.textContent = `Selected: ${file.name}`;
    this.statusText.style.color = '#00ff00';
    
    if (this.onMusicLoaded) {
      this.onMusicLoaded(file);
    }
  }
  
  setOnMusicLoaded(callback: (file: File) => void): void {
    this.onMusicLoaded = callback;
  }
  
  hide(): void {
    this.container.style.display = 'none';
  }
  
  show(): void {
    this.container.style.display = 'flex';
  }
  
  updateStatus(message: string, color: string = '#aaaaaa'): void {
    this.statusText.textContent = message;
    this.statusText.style.color = color;
  }
}
