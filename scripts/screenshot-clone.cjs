const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });

  await page.goto('https://vijay-1807.github.io/teddypups-uae-clone/', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);

  const outPath = path.join(__dirname, '..', 'screenshots', 'clone-home.png');
  await page.screenshot({ path: outPath, fullPage: true });
  console.log('Saved clone screenshot to:', outPath);

  await browser.close();
})();

