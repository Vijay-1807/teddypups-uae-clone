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
  await new Promise(r => server.listen(4183, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4183/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const heroLayout = await page.evaluate(() => {
    const hero = document.querySelector('.tp-hero');
    const title = document.getElementById('hero-title');
    const copy = document.querySelector('.tp-hero__copy');
    const stage = document.querySelector('.tp-hero__stage');
    const lineup = document.querySelector('.tp-lineup');
    const pupStops = [...document.querySelectorAll('.pup-stop')];
    const pupActor = document.querySelector('.pup-actor');
    const pupLayer = document.querySelector('.pup-layer');

    return {
      heroRect: hero ? hero.getBoundingClientRect() : null,
      titleRect: title ? title.getBoundingClientRect() : null,
      copyRect: copy ? copy.getBoundingClientRect() : null,
      stageRect: stage ? stage.getBoundingClientRect() : null,
      lineupRect: lineup ? lineup.getBoundingClientRect() : null,
      pupActorRect: pupActor ? pupActor.getBoundingClientRect() : null,
      pupLayerHidden: pupLayer?.hidden,
      stops: pupStops.map(s => ({
        className: s.className,
        rect: s.getBoundingClientRect(),
        visible: window.getComputedStyle(s).visibility,
        opacity: window.getComputedStyle(s).opacity,
        display: window.getComputedStyle(s).display,
        buddyVisible: s.querySelector('.pup-buddy') ? window.getComputedStyle(s.querySelector('.pup-buddy')).visibility : null
      }))
    };
  });

  console.log('Hero layout debug:');
  console.log(JSON.stringify(heroLayout, null, 2));

  await browser.close();
  server.close();
}

run();

