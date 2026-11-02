const { chromium } = require('playwright');
const fs = require('fs');

async function run() {
  fs.mkdirSync('screenshots/live_scroll', { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to LIVE site: https://vijay-1807.github.io/teddypups-uae-clone/');
  await page.goto('https://vijay-1807.github.io/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const heroStatus = await page.evaluate(() => {
    const actor = document.querySelector('.pup-actor');
    const layer = document.querySelector('.pup-layer');
    return {
      pupMode: document.documentElement.dataset.pup,
      actorVisible: !layer?.hidden,
      actorTransform: actor?.style.transform,
    };
  });
  console.log('Live Hero status:', heroStatus);
  await page.screenshot({ path: 'screenshots/live_scroll/01_hero.png' });

  // Scroll to Meet treadmill (1500px)
  console.log('Scrolling live site to 1500px (Meet treadmill)...');
  await page.evaluate(() => window.scrollTo({ top: 1500, behavior: 'smooth' }));
  await page.waitForTimeout(1200);

  const meetStatus = await page.evaluate(() => {
    const track = document.querySelector('.tp-meet__track');
    const hall = document.querySelector('.tp-meet__hall');
    const actor = document.querySelector('.pup-actor');
    const openDoors = [...document.querySelectorAll('.tp-door')].filter(d => d.dataset.open === 'true').length;
    return {
      trackTransform: track?.style.transform,
      floorX: hall?.style.getPropertyValue('--floor-x'),
      actorTransform: actor?.style.transform,
      openDoorsCount: openDoors,
    };
  });
  console.log('Live Meet status at 1500px:', meetStatus);
  await page.screenshot({ path: 'screenshots/live_scroll/02_meet_treadmill.png' });

  // Scroll to WhatsApp journey (6500px)
  console.log('Scrolling live site to 6500px (WhatsApp steps)...');
  await page.evaluate(() => window.scrollTo({ top: 6500, behavior: 'smooth' }));
  await page.waitForTimeout(1200);

  const chatStatus = await page.evaluate(() => {
    const activeSteps = document.querySelectorAll('.tp-chat__step[data-active="true"]').length;
    const shownMsgs = document.querySelectorAll('.tp-msg-group[data-show="true"]').length;
    const actor = document.querySelector('.pup-actor');
    return {
      activeSteps,
      shownMsgs,
      actorTransform: actor?.style.transform,
    };
  });
  console.log('Live Chat status at 6500px:', chatStatus);
  await page.screenshot({ path: 'screenshots/live_scroll/03_chat_journey.png' });

  await browser.close();
  console.log('Live site verification finished successfully!');
}

run().catch(err => {
  console.error('Live test error:', err);
  process.exit(1);
});

