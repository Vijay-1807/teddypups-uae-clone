const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const homeDom = await page.evaluate(() => {
    const main = document.getElementById('main');
    const sections = [...main.querySelectorAll('section')];
    return sections.map(s => ({
      className: s.className,
      dataScene: s.dataset.pupScene,
      dataTone: s.dataset.tone,
      dataPinned: s.dataset.pinned,
      style: s.getAttribute('style'),
      rect: s.getBoundingClientRect()
    }));
  });

  console.log('Original Home Sections:');
  console.log(JSON.stringify(homeDom, null, 2));

  await browser.close();
}

run();

