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
  await new Promise(r => server.listen(4186, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4186/teddypups-uae-clone/');
  await page.waitForTimeout(500);

  const stopsData = await page.evaluate(() => {
    const stopEls = [...document.querySelectorAll('[data-pup-stop]')].filter((el) => el.getClientRects().length);
    return stopEls.map((el, i) => {
      const rect = el.getBoundingClientRect();
      const scene = el.closest('[data-pup-scene]');
      return {
        i,
        className: el.className,
        pose: el.dataset.pose,
        act: el.dataset.act,
        rect: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
        sceneClass: scene?.className,
      };
    });
  });

  console.log('DOM stops found:', stopsData);

  await browser.close();
  server.close();
}

run();
