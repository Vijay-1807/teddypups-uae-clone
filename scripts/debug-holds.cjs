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
  await new Promise(r => server.listen(4176, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Collect console messages
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERR:', err.message));

  await page.goto('http://localhost:4176/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Evaluate the holds directly
  const holdsResult = await page.evaluate(() => {
    // Let's inspect the holds
    const stopEls = [...document.querySelectorAll('[data-pup-stop]')].filter(el => el.getClientRects().length);
    return stopEls.map((el, i) => {
      const rect = el.getBoundingClientRect();
      let stickyParent = null;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        if (window.getComputedStyle(p).position === 'sticky') {
          stickyParent = p;
          break;
        }
      }
      return {
        idx: i,
        className: el.className,
        sticky: !!stickyParent,
        rectTop: rect.top,
        rectHeight: rect.height,
      };
    });
  });

  console.log('Stops debug:', holdsResult);

  await browser.close();
  server.close();
}

run();
