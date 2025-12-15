const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function exportSprites() {
  const src = path.join(__dirname, '..', 'assets', 'sprites');
  const out = path.join(__dirname, '..', 'assets', 'exports');
  if (!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true });
  const files = fs.readdirSync(src).filter(f => f.endsWith('.svg'));
  for (const f of files) {
    const name = path.basename(f, '.svg');
    const input = path.join(src, f);
    const outp = path.join(out, `${name}.png`);
    try {
      await sharp(input).png().toFile(outp);
      console.log('Exported', outp);
    } catch (e) {
      console.error('Failed to export', input, e.message);
    }
  }
}

if (require.main === module) {
  exportSprites().catch(err => { console.error(err); process.exit(1); });
}
