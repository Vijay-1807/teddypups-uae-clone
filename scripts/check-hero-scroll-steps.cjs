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
  const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png' };
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

async function run() {
  await new Promise(r => server.listen(4185, r));
  const browser = await chromium.launch({ headless: true });
  // In user's screenshot media_1793598894922_d84ae869.png, screen width is 1920x1080 or window is maximized on laptop
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:4185/teddypups-uae-clone/', { waitUntil: 'networkidle' });

  // Take screenshot at top
  await page.screenshot({ path: 'screenshots/debug_top_1366.png' });

  // Scroll down incrementally by 100px from 0 to 1200px
  for (let s = 100; s <= 1200; s += 200) {
    await page.evaluate((scrollPos) => window.scrollTo(0, scrollPos), s);
    await page.waitForTimeout(100);
    await page.screenshot({ path: `screenshots/debug_scroll_${s}.png` });
  }

  await browser.close();
  server.close();
  console.log('Incremental screenshots captured!');
}

run();
