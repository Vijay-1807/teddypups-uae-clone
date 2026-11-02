const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '../dist');
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0].replace('/teddypups-uae-clone', '') || '/index.html';
  let filePath = path.join(distDir, reqPath);
  if (!fs.existsSync(filePath)) filePath = path.join(distDir, 'index.html');
  if (fs.statSync(filePath).isDirectory()) filePath = path.join(filePath, 'index.html');
  const ext = path.extname(filePath);
  const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css' };
  res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

async function run() {
  await new Promise(r => server.listen(4181, r));
  fs.mkdirSync('screenshots/verify_scroll', { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => {
    if (msg.text().includes('[onFrame]')) console.log(msg.text());
  });

  await page.goto('http://localhost:4181/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  console.log('1. Capturing Hero peek...');
  await page.screenshot({ path: 'screenshots/verify_scroll/01_hero_peek.png' });

  console.log('2. Scrolling to Meet treadmill (1200px)...');
  await page.evaluate(() => window.scrollTo({ top: 1200, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/verify_scroll/02_meet_treadmill.png' });

  console.log('3. Scrolling deeper into Meet treadmill (2400px)...');
  await page.evaluate(() => window.scrollTo({ top: 2400, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/verify_scroll/03_meet_treadmill_deep.png' });

  console.log('4. Scrolling to WhatsApp Journey (6500px)...');
  await page.evaluate(() => window.scrollTo({ top: 6500, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/verify_scroll/04_whatsapp_chat.png' });

  console.log('5. Scrolling to Night / FAQ (10500px)...');
  await page.evaluate(() => window.scrollTo({ top: 10500, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/verify_scroll/05_night_faq.png' });

  console.log('6. Scrolling to Basket Pup (12000px)...');
  await page.evaluate(() => window.scrollTo({ top: 12000, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'screenshots/verify_scroll/06_basket_pup.png' });

  await browser.close();
  server.close();
  console.log('All screenshots captured successfully!');
}

run();
