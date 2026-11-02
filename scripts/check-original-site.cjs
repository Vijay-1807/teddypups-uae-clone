const { chromium } = require('playwright');
const fs = require('fs');

async function run() {
  fs.mkdirSync('screenshots/original_check', { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('Navigating to original: https://puppy.instabizweb.com/');
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.screenshot({ path: 'screenshots/original_check/01_home_top.png' });

  // Scroll to Meet
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/original_check/02_home_1000.png' });

  // Scroll to Meet deep
  await page.evaluate(() => window.scrollTo(0, 2200));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/original_check/03_home_2200.png' });

  // Check /puppies
  console.log('Navigating to original /puppies...');
  await page.goto('https://puppy.instabizweb.com/puppies', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/original_check/04_puppies.png' });

  // Check data attributes on original
  const origData = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.tp-sketch')];
    return {
      totalCards: cards.length,
      firstCardArmed: cards[0]?.dataset.armed,
      firstCardRevealed: cards[0]?.dataset.revealed,
      firstCardClasses: cards[0]?.className,
      firstCardStyle: cards[0]?.style.cssText,
      photoClipPath: window.getComputedStyle(cards[0]?.querySelector('.tp-sketch__photo')).clipPath
    };
  });
  console.log('Original /puppies card data:', origData);

  await browser.close();
  console.log('Original inspection completed!');
}

run().catch(console.error);

