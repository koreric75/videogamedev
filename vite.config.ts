import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  // Base public path when deployed
  base: './',
  
  // Build optimization
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          engine: ['./src/game/engine.ts'],
          ui: ['./src/game/ui/spriteInspector.ts', './src/game/ui/joystick.ts'],
        },
      },
    },
    // Optimize for production
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
      },
    },
  },
  
  // Development server configuration
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    cors: true,
  },
  
  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
  },
  
  // Resolve configuration
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@game': resolve(__dirname, './src/game'),
      '@assets': resolve(__dirname, './assets'),
    },
  },
  
  // Optimization
  optimizeDeps: {
    include: [],
  },
  
  // Asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.mp3', '**/*.wav'],
});
