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
  await new Promise(r => server.listen(4183, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4183/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Take screenshot at scroll 0
  await page.screenshot({ path: 'screenshots/home_scroll_0.png' });

  // Check positions of hero elements
  const info0 = await page.evaluate(() => {
    const hero = document.querySelector('.tp-hero');
    const heroCopy = document.querySelector('.tp-hero__copy');
    const heroStage = document.querySelector('.tp-hero__stage');
    const teddy = document.querySelector('.tp-hero__teddy');
    const meet = document.querySelector('.tp-meet');
    const meetStage = document.querySelector('.tp-meet__stage');
    const pupActor = document.querySelector('.pup-actor');
    const htmlPup = document.documentElement.getAttribute('data-pup');

    return {
      scrollY: window.scrollY,
      htmlPup,
      hero: hero?.getBoundingClientRect(),
      heroCopy: heroCopy?.getBoundingClientRect(),
      heroStage: heroStage?.getBoundingClientRect(),
      teddy: teddy?.getBoundingClientRect(),
      meet: meet?.getBoundingClientRect(),
      meetStage: meetStage?.getBoundingClientRect(),
      pupActor: pupActor?.getBoundingClientRect(),
      pupActorStyle: pupActor?.getAttribute('style'),
      pupActorHidden: pupActor?.offsetParent === null,
    };
  });
  console.log('Scroll 0 info:', JSON.stringify(info0, null, 2));

  // Now scroll to 300, 600, 1000
  for (const s of [200, 500, 800, 1200]) {
    await page.evaluate((y) => window.scrollTo(0, y), s);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `screenshots/home_scroll_${s}.png` });

    const info = await page.evaluate((y) => {
      const hero = document.querySelector('.tp-hero');
      const meet = document.querySelector('.tp-meet');
      const meetStage = document.querySelector('.tp-meet__stage');
      const teddy = document.querySelector('.tp-hero__teddy');
      const pupActor = document.querySelector('.pup-actor');
      return {
        y,
        scrollY: window.scrollY,
        heroRectTop: hero?.getBoundingClientRect().top,
        heroRectBottom: hero?.getBoundingClientRect().bottom,
        meetStageTop: meetStage?.getBoundingClientRect().top,
        meetStageHeight: meetStage?.getBoundingClientRect().height,
        teddyTop: teddy?.getBoundingClientRect().top,
        pupActorStyle: pupActor?.getAttribute('style'),
      };
    }, s);
    console.log(`Scroll ${s} info:`, info);
  }

  await browser.close();
  server.close();
}

run();
