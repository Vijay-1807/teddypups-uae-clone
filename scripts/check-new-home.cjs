const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  await page.goto('http://localhost:4173/teddypups-uae-clone/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  const outPath = path.join(__dirname, '..', 'screenshots', 'new-home.png');
  await page.screenshot({ path: outPath, fullPage: true });
  console.log('Saved new-home.png:', outPath);

  await browser.close();
})();

