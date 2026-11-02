const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const origRootStyles = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    return {
      html: {
        className: html.className,
        overflow: window.getComputedStyle(html).overflow,
        overflowY: window.getComputedStyle(html).overflowY,
      },
      body: {
        className: body.className,
        overflow: window.getComputedStyle(body).overflow,
        overflowY: window.getComputedStyle(body).overflowY,
      }
    };
  });

  console.log('Original Root Styles:', origRootStyles);
  await browser.close();
}

run();
