const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const stageChildren = await page.evaluate(() => {
    const stage = document.querySelector('.tp-hero__stage');
    return [...stage.children].map(c => ({
      tagName: c.tagName,
      className: c.className
    }));
  });

  console.log('Original stage children:', stageChildren);

  await browser.close();
}

run();

