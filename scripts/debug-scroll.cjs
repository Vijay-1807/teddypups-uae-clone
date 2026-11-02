const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.startsWith('/teddypups-uae-clone')) reqPath = reqPath.slice('/teddypups-uae-clone'.length);
  if (!reqPath || reqPath === '/') reqPath = '/index.html';
  let filePath = path.join(distDir, reqPath);
  if (!fs.existsSync(filePath)) filePath = path.join(distDir, 'index.html');
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

async function run() {
  await new Promise(r => server.listen(4175, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4175/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  console.log('ScrollY before:', await page.evaluate(() => window.scrollY));

  await page.evaluate(() => {
    if (window.lenis) {
      window.lenis.scrollTo(800, { immediate: true });
    } else {
      window.scrollTo(0, 800);
    }
  });

  await page.waitForTimeout(500);

  const after = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    return {
      scrollY: window.scrollY,
      actorTransform: actor ? actor.style.transform : null,
    };
  });

  console.log('After scroll to 800:', after);

  // Now scroll to 2000
  await page.evaluate(() => {
    if (window.lenis) {
      window.lenis.scrollTo(2000, { immediate: true });
    } else {
      window.scrollTo(0, 2000);
    }
  });
  await page.waitForTimeout(500);

  const after2000 = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    return {
      scrollY: window.scrollY,
      actorTransform: actor ? actor.style.transform : null,
    };
  });

  console.log('After scroll to 2000:', after2000);

  await browser.close();
  server.close();
}

run();
