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
  await new Promise(r => server.listen(4188, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4188/teddypups-uae-clone/');
  await page.waitForTimeout(600);

  console.log('Scroll 0 transform:', await page.evaluate(() => document.querySelector('.pup-actor')?.style.transform));

  // Use mouse wheel to scroll 400px down
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(500);

  const scrollInfo = await page.evaluate(() => {
    return {
      scrollY: window.scrollY,
      transform: document.querySelector('.pup-actor')?.style.transform,
      holding: document.querySelector('.pup-actor')?.dataset.holding,
    };
  });
  console.log('After wheel 500:', scrollInfo);

  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(500);

  const scrollInfo2 = await page.evaluate(() => {
    return {
      scrollY: window.scrollY,
      transform: document.querySelector('.pup-actor')?.style.transform,
      holding: document.querySelector('.pup-actor')?.dataset.holding,
    };
  });
  console.log('After wheel 1000 more:', scrollInfo2);

  await browser.close();
  server.close();
}

run();
