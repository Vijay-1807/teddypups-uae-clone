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
  await new Promise(r => server.listen(4186, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
  await page.goto('http://localhost:4186/teddypups-uae-clone/', { waitUntil: 'networkidle' });

  // Check what is visible at 500, 700, 900
  for (const s of [500, 700, 800, 900]) {
    await page.evaluate((y) => window.scrollTo(0, y), s);
    await page.waitForTimeout(100);

    const visibleElements = await page.evaluate(() => {
      const vh = window.innerHeight;
      const all = [...document.querySelectorAll('h1, h2, h3, p, .pup-stop, .tp-door, .tp-lineup, .tp-quilt')];
      return all
        .map(el => {
          const r = el.getBoundingClientRect();
          const inView = r.bottom > 0 && r.top < vh;
          return {
            tag: el.tagName,
            cls: el.className,
            text: el.textContent?.slice(0, 30),
            top: Math.round(r.top),
            bottom: Math.round(r.bottom),
            inView
          };
        })
        .filter(x => x.inView);
    });

    console.log(`=== Visible at scroll ${s} ===`);
    console.log(visibleElements);
  }

  await browser.close();
  server.close();
}

run();
