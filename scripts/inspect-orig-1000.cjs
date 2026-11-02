const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(600);

  const visibleAt1000 = await page.evaluate(() => {
    const meetStage = document.querySelector('.tp-meet__stage');
    const meetHead = document.querySelector('.tp-meet__head');
    const meetTrack = document.querySelector('.tp-meet__track');
    const pupActor = document.querySelector('.pup-actor');
    return {
      stageRect: meetStage?.getBoundingClientRect(),
      headRect: meetHead?.getBoundingClientRect(),
      trackRect: meetTrack?.getBoundingClientRect(),
      actorRect: pupActor?.getBoundingClientRect(),
      scrollY: window.scrollY
    };
  });

  console.log('Original visible at scrollY 1000:', visibleAt1000);

  await browser.close();
}

run();

