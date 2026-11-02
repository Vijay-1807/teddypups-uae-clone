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
  await new Promise(r => server.listen(4192, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4192/teddypups-uae-clone/');
  await page.waitForTimeout(600);

  const initial = await page.evaluate(() => ({
    count: window.__journeyFrameCount,
    lastScroll: window.__lastCurScrollY,
    docPup: document.documentElement.dataset.pup,
    layerHidden: document.querySelector('.pup-layer')?.hidden,
  }));
  console.log('Initial RAF state:', initial);

  await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
  await page.waitForTimeout(200);

  const after500 = await page.evaluate(() => ({
    count: window.__journeyFrameCount,
    lastScroll: window.__lastCurScrollY,
    scrollY: window.scrollY,
    lastInterp: window.__lastInterp,
    actorTransform: document.querySelector('.pup-actor')?.style.transform,
  }));
  console.log('After 500 scroll:', after500);

  await browser.close();
  server.close();
}

run();
