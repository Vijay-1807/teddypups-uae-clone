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
  await new Promise(r => server.listen(4187, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4187/teddypups-uae-clone/', { waitUntil: 'networkidle' });

  const rootStyles = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const main = document.getElementById('main');
    return {
      html: {
        className: html.className,
        overflow: window.getComputedStyle(html).overflow,
        overflowY: window.getComputedStyle(html).overflowY,
        height: window.getComputedStyle(html).height,
        scrollHeight: html.scrollHeight
      },
      body: {
        className: body.className,
        overflow: window.getComputedStyle(body).overflow,
        overflowY: window.getComputedStyle(body).overflowY,
        height: window.getComputedStyle(body).height,
        scrollHeight: body.scrollHeight
      },
      main: {
        className: main?.className,
        overflow: main ? window.getComputedStyle(main).overflow : null,
        scrollHeight: main?.scrollHeight
      },
      lenis: !!window.lenis
    };
  });

  console.log('Root styles:', JSON.stringify(rootStyles, null, 2));

  // Try mouse wheel scroll
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(300);
  console.log('ScrollY after mouse wheel:', await page.evaluate(() => window.scrollY));

  await browser.close();
  server.close();
}

run();
