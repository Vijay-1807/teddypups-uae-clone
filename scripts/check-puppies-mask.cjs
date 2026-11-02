const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].replace('/teddypups-uae-clone', '') || '/index.html';
  let filePath = path.join(distDir, reqPath);
  if (!fs.existsSync(filePath)) filePath = path.join(distDir, 'index.html');
  if (fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  const ext = path.extname(filePath);
  const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

async function run() {
  await new Promise(r => server.listen(4182, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4182/teddypups-uae-clone/puppies', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const photoInfo = await page.evaluate(() => {
    const photo = document.querySelector('.tp-sketch__photo');
    const img = photo?.querySelector('img');
    const compStyle = photo ? window.getComputedStyle(photo) : null;
    return {
      photoExists: !!photo,
      imgSrc: img?.src,
      imgComplete: img?.complete,
      imgNaturalWidth: img?.naturalWidth,
      imgNaturalHeight: img?.naturalHeight,
      maskImage: compStyle?.maskImage,
      webkitMaskImage: compStyle?.webkitMaskImage,
      photoWidth: photo?.offsetWidth,
      photoHeight: photo?.offsetHeight,
    };
  });

  console.log('Photo info in /puppies:', photoInfo);

  // Let's take a screenshot of /puppies
  await page.screenshot({ path: 'screenshots/verify_puppies_debug.png' });

  await browser.close();
  server.close();
}

run();

