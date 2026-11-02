const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple static server for dist/
const distDir = path.join(__dirname, '../dist');
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath.startsWith('/teddypups-uae-clone')) {
    reqPath = reqPath.slice('/teddypups-uae-clone'.length);
  }
  if (!reqPath || reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(distDir, reqPath);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

async function run() {
  await new Promise((resolve) => server.listen(4173, resolve));
  console.log('Test server listening on http://localhost:4173/teddypups-uae-clone/');

  fs.mkdirSync('screenshots/test_scroll', { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  console.log('Navigating to local build...');
  await page.goto('http://localhost:4173/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check html data-pup
  const htmlDataPup = await page.evaluate(() => document.documentElement.dataset.pup);
  console.log('html data-pup:', htmlDataPup);

  // Check pup-actor presence
  const actorVisible = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const layer = document.querySelector('.pup-layer');
    return {
      hasActor: !!actor,
      layerHidden: layer ? layer.hidden : null,
      actorTransform: actor ? actor.style.transform : null,
    };
  });
  console.log('Pup actor status:', actorVisible);

  await page.screenshot({ path: 'screenshots/test_scroll/01_hero.png' });

  // Scroll to Meet section (around 600px)
  console.log('Scrolling to Meet the pups...');
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);

  const meetStatus = await page.evaluate(() => {
    const meet = document.querySelector('.tp-meet');
    const hall = meet?.querySelector('.tp-meet__hall');
    const track = meet?.querySelector('.tp-meet__track');
    const actor = document.querySelector('.pup-actor');
    return {
      trackTransform: track ? track.style.transform : null,
      floorX: hall ? hall.style.getPropertyValue('--floor-x') : null,
      actorTransform: actor ? actor.style.transform : null,
      firstDoorOpen: track?.querySelector('.tp-door')?.dataset.open,
    };
  });
  console.log('Meet section status at 800px:', meetStatus);
  await page.screenshot({ path: 'screenshots/test_scroll/02_meet_800.png' });

  // Scroll deeper into Meet treadmill (around 1800px)
  console.log('Scrolling deeper into Meet treadmill...');
  await page.evaluate(() => window.scrollTo(0, 1800));
  await page.waitForTimeout(500);

  const meetStatusDeep = await page.evaluate(() => {
    const meet = document.querySelector('.tp-meet');
    const hall = meet?.querySelector('.tp-meet__hall');
    const track = meet?.querySelector('.tp-meet__track');
    const actor = document.querySelector('.pup-actor');
    const openDoors = [...(track?.querySelectorAll('.tp-door') || [])].filter((d) => d.dataset.open === 'true').length;
    return {
      trackTransform: track ? track.style.transform : null,
      floorX: hall ? hall.style.getPropertyValue('--floor-x') : null,
      actorTransform: actor ? actor.style.transform : null,
      openDoorsCount: openDoors,
    };
  });
  console.log('Meet section deep at 1800px:', meetStatusDeep);
  await page.screenshot({ path: 'screenshots/test_scroll/03_meet_1800.png' });

  // Scroll to chat section (around 4200px)
  console.log('Scrolling to Chat section...');
  await page.evaluate(() => window.scrollTo(0, 4200));
  await page.waitForTimeout(500);

  const chatStatus = await page.evaluate(() => {
    const chat = document.querySelector('.tp-chat');
    const activeSteps = chat?.querySelectorAll('.tp-chat__step[data-active="true"]').length;
    const shownMsgs = chat?.querySelectorAll('.tp-msg-group[data-show="true"]').length;
    const actor = document.querySelector('.pup-actor');
    return {
      activeSteps,
      shownMsgs,
      actorTransform: actor ? actor.style.transform : null,
    };
  });
  console.log('Chat section status at 4200px:', chatStatus);
  await page.screenshot({ path: 'screenshots/test_scroll/04_chat_4200.png' });

  // Test clicking the puppy!
  console.log('Testing dog click interaction...');
  await page.click('.pup-actor');
  await page.waitForTimeout(300);

  const bubbleText = await page.evaluate(() => {
    const b = document.querySelector('.pup-bubble');
    return {
      show: b?.dataset.show,
      text: b?.textContent,
    };
  });
  console.log('Dog bubble after click:', bubbleText);
  await page.screenshot({ path: 'screenshots/test_scroll/05_dog_click.png' });

  await browser.close();
  server.close();
  console.log('All tests completed successfully!');
}

run().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
