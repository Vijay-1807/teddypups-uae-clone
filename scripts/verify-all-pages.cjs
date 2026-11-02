const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const BASE = '/teddypups-uae-clone';

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl.startsWith(BASE)) {
    reqUrl = reqUrl.slice(BASE.length) || '/';
  }
  if (reqUrl === '/') reqUrl = '/index.html';

  // Fix Windows path.join leading slash issue:
  // If reqUrl starts with '/', strip it so path.join stays relative to DIST
  const safePath = reqUrl.replace(/^\/+/, '');
  let filePath = path.join(DIST, safePath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

const PORT = 5055;
server.listen(PORT, async () => {
  console.log(`Verification server running at http://localhost:${PORT}${BASE}/`);

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
    { name: 'home', path: '/' },
    { name: 'puppies', path: '/puppies' },
    { name: 'puppy-detail', path: '/puppies/maltipoo-max-male' },
    { name: 'gone-home', path: '/gone-home' },
    { name: 'happy-families', path: '/happy-families' },
    { name: 'how-it-works', path: '/how-it-works' },
    { name: 'faq', path: '/faq' },
    { name: 'contact', path: '/contact' },
  ];

  const outDir = path.join(__dirname, '..', 'screenshots', 'clone');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  console.log('\n--- Testing all 8 routes ---');

  for (const r of routes) {
    const url = `http://localhost:${PORT}${BASE}${r.path}`;
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 });
      await page.waitForTimeout(1000);

      const shotPath = path.join(outDir, `${r.name}.png`);
      await page.screenshot({ path: shotPath, fullPage: true });
      console.log(`  [OK] ${r.name} (${r.path}) -> ${shotPath}`);
    } catch (e) {
      console.error(`  [ERR] ${r.name}: ${e.message}`);
    }
  }

  console.log(`\nTotal network failures: ${failedUrls.length}`);
  failedUrls.slice(0, 10).forEach(f => console.log('  ' + f));

  await browser.close();
  server.close();
  console.log('\nVerification complete!');
});

