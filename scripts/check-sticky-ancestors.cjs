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
  await new Promise(r => server.listen(4184, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4184/teddypups-uae-clone/', { waitUntil: 'networkidle' });

  const ancestors = await page.evaluate(() => {
    let el = document.querySelector('.tp-meet__stage');
    const list = [];
    while (el && el !== document.documentElement) {
      const cs = window.getComputedStyle(el);
      list.push({
        tag: el.tagName,
        className: el.className,
        id: el.id,
        overflow: cs.overflow,
        overflowX: cs.overflowX,
        overflowY: cs.overflowY,
        position: cs.position,
        height: cs.height,
      });
      el = el.parentElement;
    }
    const htmlCs = window.getComputedStyle(document.documentElement);
    list.push({
      tag: 'HTML',
      overflow: htmlCs.overflow,
      overflowX: htmlCs.overflowX,
      overflowY: htmlCs.overflowY,
    });
    return list;
  });

  console.log('Ancestors of .tp-meet__stage:', ancestors);

  await browser.close();
  server.close();
}

run();
