const { chromium } = require('playwright');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('https://puppy.instabizweb.com/', { waitUntil: 'networkidle' });

  const heroStructure = await page.evaluate(() => {
    const heroTeddy = document.querySelector('.tp-hero__teddy');
    return {
      parentElement: heroTeddy?.parentElement?.className,
      grandParentElement: heroTeddy?.parentElement?.parentElement?.className,
      outerHtml: heroTeddy?.outerHTML.slice(0, 300)
    };
  });

  console.log('Original Hero Teddy placement:');
  console.log(JSON.stringify(heroStructure, null, 2));

  await browser.close();
}

run();

