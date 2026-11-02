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
  await new Promise(r => server.listen(4174, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4174/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const debugInfo = await page.evaluate(() => {
    const stopEls = [...document.querySelectorAll('[data-pup-stop]')];
    return stopEls.map(el => {
      const rect = el.getBoundingClientRect();
      return {
        className: el.className,
        pose: el.dataset.pose,
        top: rect.top,
        height: rect.height,
        width: rect.width,
        scrollY: window.scrollY
      };
    });
  });

  console.log('Found stops on page:', debugInfo.length);
  console.log(debugInfo);

  await browser.close();
  server.close();
}

run();
