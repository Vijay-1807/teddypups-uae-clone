const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple static server for dist/
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

  let filePath = path.join(DIST, reqUrl);
  if (!fs.existsSync(filePath)) {
    // SPA fallback
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

server.listen(5050, async () => {
  console.log('Static test server listening on http://localhost:5050' + BASE + '/');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const failedRequests = [];
  page.on('requestfailed', req => {
    failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
  });
  page.on('response', resp => {
    if (resp.status() >= 400) {
      failedRequests.push(`${resp.url()} [HTTP ${resp.status()}]`);
    }
  });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));

  try {
    console.log('Navigating to homepage...');
    await page.goto(`http://localhost:5050${BASE}/`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(2000);

    const outDir = path.join(__dirname, '..', 'screenshots');
    const viewportShot = path.join(outDir, 'local-home-viewport.png');
    await page.screenshot({ path: viewportShot });
    console.log('Saved viewport screenshot:', viewportShot);

    const fullShot = path.join(outDir, 'local-home-full.png');
    await page.screenshot({ path: fullShot, fullPage: true });
    console.log('Saved fullpage screenshot:', fullShot);

    console.log('\n--- Failed Requests (${failedRequests.length}) ---');
    failedRequests.forEach(r => console.log('  ' + r));

    console.log('\n--- Console Logs (${consoleLogs.length}) ---');
    consoleLogs.slice(0, 10).forEach(l => console.log('  ' + l));
  } catch (err) {
    console.error('Error during test:', err);
  } finally {
    await browser.close();
    server.close();
    console.log('Done test!');
  }
});
