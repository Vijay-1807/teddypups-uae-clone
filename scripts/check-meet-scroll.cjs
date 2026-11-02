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
  await page.waitForTimeout(500);

  // Scroll to 800px
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(400);

  const debug = await page.evaluate(() => {
    const meet = document.querySelector('.tp-meet');
    const stage = document.querySelector('.tp-meet__stage');
    const head = document.querySelector('.tp-meet__head');
    const hall = document.querySelector('.tp-meet__hall');
    const track = document.querySelector('.tp-meet__track');
    const floor = document.querySelector('.tp-meet__floor');
    const teddy = document.querySelector('.tp-meet__teddy');
    const heroTeddy = document.querySelector('.tp-hero__teddy');
    const actor = document.querySelector('.pup-actor');

    return {
      meetRect: meet?.getBoundingClientRect(),
      stageRect: stage?.getBoundingClientRect(),
      headRect: head?.getBoundingClientRect(),
      hallRect: hall?.getBoundingClientRect(),
      trackRect: track?.getBoundingClientRect(),
      floorRect: floor?.getBoundingClientRect(),
      teddyRect: teddy?.getBoundingClientRect(),
      heroTeddyRect: heroTeddy?.getBoundingClientRect(),
      actorRect: actor?.getBoundingClientRect(),
      stageStyle: stage ? {
        position: window.getComputedStyle(stage).position,
        top: window.getComputedStyle(stage).top,
        height: window.getComputedStyle(stage).height,
        overflow: window.getComputedStyle(stage).overflow,
      } : null,
      trackStyle: track ? {
        transform: track.style.transform,
        left: window.getComputedStyle(track).left,
        bottom: window.getComputedStyle(track).bottom,
      } : null
    };
  });

  console.log('Meet debug at 800px:');
  console.log(JSON.stringify(debug, null, 2));

  await page.screenshot({ path: 'screenshots/meet_debug_800.png' });

  await browser.close();
  server.close();
}

run();

