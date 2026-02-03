# Deployment Guide

This guide covers different ways to deploy Ruins of Arkan for production use.

## 📦 Building for Production

First, create a production build:

```bash
npm run build
```

This creates an optimized bundle in the `dist/` directory with:
- Minified JavaScript
- Optimized assets
- Production-ready HTML

## 🌐 Deployment Options

### Option 1: GitHub Pages

GitHub Pages is free and perfect for static sites.

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Install gh-pages** (if not already installed):
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deployment script** to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages** in repository settings:
   - Go to Settings → Pages
   - Select `gh-pages` branch
   - Save

Your game will be available at: `https://koreric75.github.io/videogamedev/`

### Option 2: Netlify

Netlify provides automatic deployments from Git.

1. **Sign up** at [netlify.com](https://www.netlify.com)

2. **Connect your repository**:
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select your repository

3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will build and deploy automatically

**Continuous Deployment**: Every push to main branch triggers a new deployment.

### Option 3: Vercel

Similar to Netlify, optimized for modern web apps.

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Import your repository**:
   - Click "New Project"
   - Import from GitHub
   - Select your repository

3. **Configure** (auto-detected for Vite):
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Deploy**:
   - Click "Deploy"
   - Vercel handles the rest

**Preview Deployments**: Every pull request gets a preview URL.

### Option 4: Static Web Hosting

For traditional web hosts (Apache, Nginx):

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload the `dist/` folder** to your web server

3. **Configure your web server**:

   **Apache** (`.htaccess`):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **Nginx**:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

### Option 5: AWS S3 + CloudFront

For scalable production hosting:

1. **Create an S3 bucket**:
   - Enable static website hosting
   - Set index document to `index.html`

2. **Upload the `dist/` folder**

3. **Set bucket permissions** (public read)

4. **Configure CloudFront** (optional, for CDN):
   - Create CloudFront distribution
   - Point to S3 bucket
   - Configure caching

5. **Update DNS** to point to CloudFront or S3

## 🔧 Environment Configuration

### Production vs Development

The game automatically detects the environment. For explicit configuration:

```typescript
// src/game/config.ts
export const config = {
  debug: {
    showFPS: process.env.NODE_ENV !== 'production',
    showColliders: false,
  },
  // ...
};
```

### Build Optimizations

Vite automatically applies these optimizations in production:

- Code minification
- Tree shaking (removing unused code)
- Asset optimization
- Code splitting
- CSS minification

### Custom Configuration

Modify `vite.config.ts` for custom build settings:

```typescript
export default defineConfig({
  base: '/videogamedev/', // For GitHub Pages subdirectory
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for smaller bundle
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          // Custom code splitting
        }
      }
    }
  }
});
```

## 📊 Performance Optimization

### Asset Optimization

1. **Compress images** before adding to `assets/`:
   - Use SVG for sprites (scalable, small)
   - Optimize PNG/JPG with tools like ImageOptim
   - Consider WebP format for better compression

2. **Optimize audio**:
   - Use compressed formats (MP3, OGG)
   - Reduce bitrate for sound effects
   - Keep file sizes small

### Code Optimization

1. **Enable production mode**:
   - Vite automatically sets `NODE_ENV=production` during build
   - This removes debug code and warnings

2. **Analyze bundle size**:
   ```bash
   npm run build -- --mode analyze
   ```

3. **Lazy load assets**:
   - Load assets on-demand rather than upfront
   - Implement progressive loading

## 🔍 Testing Production Build

Before deploying, test the production build locally:

```bash
# Build
npm run build

# Preview
npm run preview
```

Open http://localhost:4173 to test the production build.

**Check:**
- ✅ Game loads correctly
- ✅ All assets display properly
- ✅ No console errors
- ✅ Performance is acceptable
- ✅ Mobile controls work

## 📈 Monitoring

### Analytics

Add analytics to track usage (optional):

```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Consider services like:
- [Sentry](https://sentry.io/) - Error tracking
- [LogRocket](https://logrocket.com/) - Session replay
- [Rollbar](https://rollbar.com/) - Error monitoring

## 🔐 Security

### Content Security Policy

Add CSP headers for security:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';">
```

### HTTPS

Always deploy with HTTPS:
- GitHub Pages: Automatic HTTPS
- Netlify/Vercel: Automatic HTTPS with free SSL
- Custom hosting: Use Let's Encrypt for free SSL

## 🚀 Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## 🎯 Post-Deployment Checklist

- [ ] Game loads without errors
- [ ] All sprites and audio work
- [ ] Controls (keyboard, mouse, touch) work
- [ ] Performance is acceptable
- [ ] Mobile version works on real devices
- [ ] HTTPS is enabled
- [ ] Analytics/monitoring configured (if applicable)
- [ ] DNS configured (if using custom domain)
- [ ] README updated with live demo link

## 🔗 Useful Links

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)

---

Need help? [Open an issue](https://github.com/koreric75/videogamedev/issues) on GitHub.
