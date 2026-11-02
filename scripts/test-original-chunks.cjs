const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Check what happens when original home.html is served
const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') {
    const html = fs.readFileSync('screenshots/original/home.html', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Check if it's a chunk
  if (urlPath.startsWith('/_next/static/chunks/')) {
    const chunkFile = path.basename(urlPath);
    const localChunk = path.join('chunks', chunkFile);
    if (fs.existsSync(localChunk)) {
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(fs.readFileSync(localChunk));
      return;
    }
  }

  // Check if it's css
  if (urlPath.endsWith('.css')) {
    const cssName = path.basename(urlPath);
    const localCss = path.join('src', cssName);
    if (fs.existsSync(localCss)) {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.end(fs.readFileSync(localCss));
      return;
    }
  }

  res.writeHead(404);
  res.end('Not found: ' + urlPath);
});

server.listen(5099, async () => {
  console.log('Testing original home.html on http://localhost:5099/');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const consoleLogs = [];
  page.on('console', msg => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));

  try {
    await page.goto('http://localhost:5099/', { waitUntil: 'networkidle', timeout: 15000 });
    console.log('Loaded! Scrolling down...');
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(1000);
    await page.mouse.wheel(0, 1500);
    await page.waitForTimeout(1000);

    console.log('Console logs:');
    consoleLogs.forEach(l => console.log('  ' + l));
  } catch (e) {
    console.log('Error:', e.message);
  } finally {
    await browser.close();
    server.close();
  }
});

