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
  await new Promise(r => server.listen(4189, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto('http://localhost:4189/teddypups-uae-clone/');
  await page.waitForTimeout(500);

  const testInterp = await page.evaluate(() => {
    const j = window.__pupJourney;
    if (!j) return 'no journey';
    // Test findInterval on holds
    const holds = j.holds;
    const test430 = (function findInterval(holds, scrollY) {
      if (!holds.length || scrollY <= holds[0][1]) return { k: 0, t: 0 };
      for (let i = 0; i < holds.length - 1; i++) {
        const endCurrent = holds[i][1];
        const startNext = holds[i + 1][0];
        if (scrollY < startNext) {
          return { k: i, t: (scrollY - endCurrent) / Math.max(1, startNext - endCurrent) };
        }
        if (scrollY <= holds[i + 1][1]) {
          return { k: i + 1, t: 0 };
        }
      }
      return { k: holds.length - 1, t: 0 };
    })(holds, 430);

    const test1310 = (function findInterval(holds, scrollY) {
      if (!holds.length || scrollY <= holds[0][1]) return { k: 0, t: 0 };
      for (let i = 0; i < holds.length - 1; i++) {
        const endCurrent = holds[i][1];
        const startNext = holds[i + 1][0];
        if (scrollY < startNext) {
          return { k: i, t: (scrollY - endCurrent) / Math.max(1, startNext - endCurrent) };
        }
        if (scrollY <= holds[i + 1][1]) {
          return { k: i + 1, t: 0 };
        }
      }
      return { k: holds.length - 1, t: 0 };
    })(holds, 1310);

    return {
      holds,
      test430,
      test1310
    };
  });

  console.log('Test interp:', testInterp);

  await browser.close();
  server.close();
}

run();
