const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://vijay-1807.github.io/teddypups-uae-clone';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const failedUrls = [];
  page.on('requestfailed', req => failedUrls.push(`FAILED: ${req.url()}`));
  page.on('response', resp => {
    if (resp.status() >= 400) failedUrls.push(`HTTP ${resp.status()}: ${resp.url()}`);
  });

  const routes = [
    { name: 'live-home', path: '/' },
    { name: 'live-puppies', path: '/puppies' },
    { name: 'live-puppy-detail', path: '/puppies/maltipoo-max-male' },
    { name: 'live-gone-home', path: '/gone-home' },
    { name: 'live-happy-families', path: '/happy-families' },
    { name: 'live-how-it-works', path: '/how-it-works' },
    { name: 'live-faq', path: '/faq' },
    { name: 'live-contact', path: '/contact' },
  ];

  const outDir = path.join(__dirname, '..', 'screenshots', 'live');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('--- Verifying Live Site on GitHub Pages ---');

  for (const r of routes) {
    const url = `${BASE_URL}${r.path}`;
    try {
      console.log(`Checking ${url}...`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 35000 });
      await page.waitForTimeout(2000);

      const shotPath = path.join(outDir, `${r.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
      console.log(`  [OK] ${r.name} -> ${shotPath}`);
    } catch (e) {
      console.error(`  [ERR] ${r.name}: ${e.message}`);
    }
  }

  console.log(`\nLive Site Failed Requests (${failedUrls.length}):`);
  failedUrls.slice(0, 15).forEach(f => console.log('  ' + f));

  await browser.close();
  console.log('\nLive site verification complete!');
})();

