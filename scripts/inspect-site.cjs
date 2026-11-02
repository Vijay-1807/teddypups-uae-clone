const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://puppy.instabizweb.com';
const OUT_DIR = path.join(__dirname, '..', 'screenshots', 'original');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const routes = [
  { name: 'home', path: '/' },
  { name: 'puppies', path: '/puppies' },
  { name: 'puppy-detail', path: '/puppies/maltipoo-max-male' },
  { name: 'gone-home', path: '/gone-home' },
  { name: 'happy-families', path: '/happy-families' },
  { name: 'how-it-works', path: '/how-it-works' },
  { name: 'faq', path: '/faq' },
  { name: 'contact', path: '/contact' }
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1
  });
  const page = await context.newPage();

  for (const r of routes) {
    const url = BASE_URL + r.path;
    console.log(`Navigating to ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // wait a bit for any animations
      await page.waitForTimeout(2000);

      const shotPath = path.join(OUT_DIR, `${r.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
      console.log(`Saved screenshot: ${shotPath}`);

      // Also dump HTML
      const htmlPath = path.join(OUT_DIR, `${r.name}.html`);
      const content = await page.content();
      fs.writeFileSync(htmlPath, content, 'utf8');
      console.log(`Saved HTML: ${htmlPath}`);
    } catch (err) {
      console.error(`Failed ${r.name}:`, err.message);
    }
  }

  await browser.close();
  console.log('Inspection complete!');
})();
