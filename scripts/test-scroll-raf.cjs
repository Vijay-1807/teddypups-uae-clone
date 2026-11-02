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
  await new Promise(r => server.listen(4191, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4191/teddypups-uae-clone/');
  await page.waitForTimeout(600);

  // Check RAF execution counter
  const initialFrame = await page.evaluate(() => {
    let frames = 0;
    return new Promise(resolve => {
      const step = () => {
        frames++;
        if (frames >= 5) resolve(frames);
        else requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
  console.log('Frames ticking in browser:', initialFrame);

  // Inspect actor style before and after
  console.log('Actor transform before scroll:', await page.evaluate(() => document.querySelector('.pup-actor')?.style.transform));

  // Let's scroll via window.scrollTo
  await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
  await page.waitForTimeout(100);

  const state500 = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    return {
      scrollY: window.scrollY,
      pageOffset: window.pageYOffset,
      docScrollTop: document.documentElement.scrollTop,
      bodyScrollTop: document.body.scrollTop,
      actorTransform: actor?.style.transform,
      actorHolding: actor?.dataset.holding,
    };
  });
  console.log('State after instant scroll to 500:', state500);

  await browser.close();
  server.close();
}

run();
