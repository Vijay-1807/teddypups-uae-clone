
const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE = 'https://puppy.instabizweb.com/_next/static/media/';
const OUT_DIR = path.join(__dirname, '..', 'public', 'fonts');

// Extract all font filenames from the CSS
const css = fs.readFileSync(path.join(__dirname, '..', 'src', '2gh-2btcjgkih.css'), 'utf8');
const matches = [...css.matchAll(/url\(\.\.\/media\/([^)]+\.woff2)\)/g)];
const filenames = [...new Set(matches.map(m => m[1]))];

console.log(`Found ${filenames.length} unique font files to download`);

function download(filename) {
  return new Promise((resolve) => {
    const dest = path.join(OUT_DIR, filename);
    if (fs.existsSync(dest)) {
      const stats = fs.statSync(dest);
      if (stats.size > 100) {
        console.log(`  [SKIP] ${filename} already exists (${stats.size} bytes)`);
        resolve();
        return;
      }
    }
    const url = BASE + filename;
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode !== 200) {
        console.error(`  [FAIL] ${filename} - HTTP ${res.statusCode}`);
        file.close();
        try { fs.unlinkSync(dest); } catch(e) {}
        resolve();
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          const stats = fs.statSync(dest);
          console.log(`  [OK] ${filename} (${stats.size} bytes)`);
          resolve();
        });
      });
    }).on('error', err => {
      console.error(`  [ERR] ${filename} - ${err.message}`);
      resolve();
    });
  });
}

(async () => {
  for (const f of filenames) {
    await download(f);
  }
  console.log('\nDone!');
  const existing = fs.readdirSync(OUT_DIR);
  console.log(`Fonts in public/fonts/: ${existing.length}`);
  existing.forEach(f => console.log('  ' + f));
})();
