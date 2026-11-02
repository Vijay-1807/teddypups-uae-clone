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
  await new Promise(r => server.listen(4177, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERR:', err.message));

  await page.goto('http://localhost:4177/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const testScrolls = [0, 200, 500, 1000, 1500, 2500, 4000, 6000, 8000, 10000];
  for (const s of testScrolls) {
    await page.evaluate((scrollVal) => {
      window.scrollTo(0, scrollVal);
    }, s);
    await page.waitForTimeout(200);
    const pos = await page.evaluate(() => {
      const actor = document.querySelector('.pup-actor');
      return {
        scrollY: window.scrollY,
        transform: actor ? actor.style.transform : null,
      };
    });
    console.log(`scrollY: ${s} =>`, pos);
  }

  await browser.close();
  server.close();
}

run();
