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
  const types = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
  };
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

async function run() {
  await new Promise(r => server.listen(4194, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('--- 1. Testing /puppies page ---');
  await page.goto('http://localhost:4194/teddypups-uae-clone/puppies', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Take screenshot of top of /puppies
  await page.screenshot({ path: 'screenshots/verify_puppies_top.png' });

  // Scroll down to cards 5-10
  await page.evaluate(() => window.scrollTo({ top: 800, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/verify_puppies_middle.png' });

  // Scroll down to bottom
  await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'screenshots/verify_puppies_bottom.png' });

  // Check all puppy cards photos
  const puppyCards = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.tp-sketch')];
    return cards.map((c, i) => {
      const name = c.querySelector('.tp-sketch__name')?.textContent;
      const photo = c.querySelector('.tp-sketch__photo');
      const img = photo?.querySelector('img');
      const cs = photo ? window.getComputedStyle(photo) : null;
      return {
        i,
        name,
        armed: c.dataset.armed,
        revealed: c.dataset.revealed,
        clipPath: cs?.clipPath,
        imgComplete: img?.complete,
        imgNaturalWidth: img?.naturalWidth,
        photoVisible: photo ? photo.offsetWidth > 0 && photo.offsetHeight > 0 : false,
      };
    });
  });

  console.log(`Audited ${puppyCards.length} puppy cards:`);
  let allPhotosValid = true;
  for (const pc of puppyCards) {
    const isClippedZero = pc.clipPath && pc.clipPath.includes('circle(0%');
    const hasPhoto = pc.imgNaturalWidth > 0 && !isClippedZero;
    if (!hasPhoto) allPhotosValid = false;
    console.log(`  Card #${pc.i + 1} (${pc.name}): revealed=${pc.revealed}, clipPath=${pc.clipPath}, imgW=${pc.imgNaturalWidth}, valid=${hasPhoto}`);
  }
  console.log('All puppy photos valid & visible:', allPhotosValid);

  console.log('\n--- 2. Testing Homepage / ---');
  await page.goto('http://localhost:4194/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  // Take screenshot of Hero
  await page.screenshot({ path: 'screenshots/verify_home_hero.png' });

  // Check how many .pup-actor elements exist
  const actorCount = await page.evaluate(() => document.querySelectorAll('.pup-actor').length);
  console.log('Total .pup-actor elements in DOM:', actorCount);

  // Check initial dog position
  const heroDogPos = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const teddyStop = document.querySelector('.tp-hero__teddy');
    return {
      actorTransform: actor?.style.transform,
      actorHolding: actor?.dataset.holding,
      teddyRect: teddyStop?.getBoundingClientRect(),
    };
  });
  console.log('Hero Dog initial state:', heroDogPos);

  // Scroll to 450 (walking to meet stage)
  await page.evaluate(() => window.scrollTo({ top: 450, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/verify_home_walk_to_meet.png' });
  const walkState = await page.evaluate(() => ({
    scrollY: window.scrollY,
    actorTransform: document.querySelector('.pup-actor')?.style.transform,
    actorHolding: document.querySelector('.pup-actor')?.dataset.holding,
  }));
  console.log('Scroll 450 (walking) state:', walkState);

  // Scroll to 1500 (meet section sticky treadmill)
  await page.evaluate(() => window.scrollTo({ top: 1500, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/verify_home_meet_treadmill.png' });
  const treadmillState = await page.evaluate(() => {
    const meetStage = document.querySelector('.tp-meet__stage');
    const track = document.querySelector('.tp-meet__track');
    return {
      scrollY: window.scrollY,
      meetStageTop: meetStage?.getBoundingClientRect().top,
      meetStageSticky: meetStage?.getBoundingClientRect().top === 0,
      trackTransform: track?.style.transform,
      actorTransform: document.querySelector('.pup-actor')?.style.transform,
      actorHolding: document.querySelector('.pup-actor')?.dataset.holding,
    };
  });
  console.log('Scroll 1500 (treadmill) state:', treadmillState);

  // Scroll to Chat section (scroll 6500)
  await page.evaluate(() => window.scrollTo({ top: 6500, behavior: 'instant' }));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/verify_home_chat.png' });
  const chatState = await page.evaluate(() => ({
    scrollY: window.scrollY,
    actorTransform: document.querySelector('.pup-actor')?.style.transform,
    actorHolding: document.querySelector('.pup-actor')?.dataset.holding,
  }));
  console.log('Scroll 6500 (chat) state:', chatState);

  await browser.close();
  server.close();
  console.log('\nAll verifications finished!');
}

run();
