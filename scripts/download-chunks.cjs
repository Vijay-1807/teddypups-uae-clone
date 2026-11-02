const https = require('https');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync('screenshots/original/home.html', 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*src="(\/_next\/static\/chunks\/[^"]+)"/g)].map(m => m[1]);

const outDir = path.join(__dirname, '..', 'chunks');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function download(rel) {
  const filename = path.basename(rel);
  const dest = path.join(outDir, filename);
  if (fs.existsSync(dest)) return;

  const url = 'https://puppy.instabizweb.com' + rel;
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode !== 200) {
        console.error(`Failed ${filename}: ${res.statusCode}`);
        file.close();
        fs.unlinkSync(dest);
        resolve();
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          console.log(`Downloaded: ${filename}`);
          resolve();
        });
      });
    }).on('error', err => {
      console.error(`Error ${filename}:`, err.message);
      resolve();
    });
  });
}

(async () => {
  for (const s of scripts) {
    await download(s);
  }
  console.log('All chunks downloaded!');
})();

