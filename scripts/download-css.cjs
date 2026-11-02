const https = require('https');
const fs = require('fs');
const path = require('path');

const files = [
  '/_next/static/chunks/2gh-2btcjgkih.css',
  '/_next/static/chunks/10jf32vdx50lp.css'
];

async function download(urlPath) {
  const fullUrl = 'https://puppy.instabizweb.com' + urlPath;
  const fileName = path.basename(urlPath);
  const outPath = path.join(__dirname, '..', 'src', fileName);

  return new Promise((resolve, reject) => {
    https.get(fullUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${fullUrl}: status ${res.statusCode}`));
        return;
      }
      const stream = fs.createWriteStream(outPath);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        console.log(`Saved ${fileName} (${fs.statSync(outPath).size} bytes)`);
        resolve();
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const f of files) {
    try {
      await download(f);
    } catch (e) {
      console.error(e.message);
    }
  }
})();

