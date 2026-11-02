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
  await new Promise(r => server.listen(4179, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4179/teddypups-uae-clone/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const debug = await page.evaluate(() => {
    const stopEls = [...document.querySelectorAll('[data-pup-stop]')].filter(el => el.getClientRects().length);
    const clientWidth = document.documentElement.clientWidth;
    const headerH = document.getElementById('site-header')?.offsetHeight ?? 76;
    const safeArea = {
      left: 10,
      top: headerH + 10,
      right: clientWidth - 10,
      bottom: window.innerHeight - 10,
    };

    const holds = [];
    const stopInfos = [];

    stopEls.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const pose = el.dataset.pose || 'sit';
      const scale = rect.width / 300;
      const finalScale = 1.12 * scale;
      const pivot = pose === 'peek' ? { x: 150, y: 159 } : { x: 150, y: 228 };

      let stickyParent = null;
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        if (window.getComputedStyle(p).position === 'sticky') {
          stickyParent = p;
          break;
        }
      }

      let trackKind = 'page';
      let trackTop = rect.top + window.scrollY;
      let pinFrom = 0;
      let pinTo = 0;

      if (stickyParent) {
        const stickyTop = parseFloat(window.getComputedStyle(stickyParent).top) || 0;
        const offsetInsideSticky = rect.top - stickyParent.getBoundingClientRect().top;
        const origPos = stickyParent.style.position;
        stickyParent.style.position = 'relative';
        const stickyRect = stickyParent.getBoundingClientRect();
        const parentOfSticky = stickyParent.parentElement;
        const bottomLimit = parentOfSticky.getBoundingClientRect().bottom - (parseFloat(window.getComputedStyle(parentOfSticky).paddingBottom) || 0);
        stickyParent.style.position = origPos;

        const pFrom = stickyRect.top + window.scrollY - stickyTop;
        const pTo = bottomLimit + window.scrollY - stickyRect.height - stickyTop;
        if (pTo > pFrom) {
          trackKind = 'pin';
          trackTop = stickyTop + offsetInsideSticky;
          pinFrom = pFrom;
          pinTo = pTo;
        }
      }

      trackTop += pivot.y * (scale - finalScale);
      const box = [50, 26, 284, 234];

      let holdRange;
      if (trackKind === 'pin') {
        holdRange = [pinFrom, pinTo];
      } else {
        const sTop = trackTop;
        const n = sTop + box[1] * finalScale;
        const l = sTop + box[3] * finalScale;
        const mid = (n + l) / 2;
        const h = safeArea.bottom - safeArea.top;
        const ratio = [0.42, 0.78];
        let o = mid - (safeArea.top + ratio[1] * h);
        let d = mid - (safeArea.top + ratio[0] * h);
        if (o > d) o = d = mid - (safeArea.top + h / 2);
        holdRange = [o, d];
      }

      stopInfos.push({ idx, className: el.className, trackKind, trackTop, pinFrom, pinTo, rawHold: [...holdRange] });
      holds.push(holdRange);
    });

    // Run normalizing
    for (let i = 0; i < holds.length; i++) {
      if (holds[i][0] > holds[i][1]) {
        const avg = (holds[i][0] + holds[i][1]) / 2;
        holds[i] = [avg, avg];
      }
    }
    holds[0][0] = -Infinity;
    holds[holds.length - 1][1] = Infinity;

    for (let i = 0; i < holds.length - 1; i++) {
      if (holds[i + 1][0] < holds[i][1]) {
        const mid = (holds[i][1] + holds[i + 1][0]) / 2;
        holds[i][1] = mid;
        holds[i + 1][0] = mid;
      }
    }

    return { stopInfos, normalizedHolds: holds };
  });

  console.log('Stop Infos:');
  console.log(JSON.stringify(debug.stopInfos, null, 2));
  console.log('Normalized Holds:');
  console.log(JSON.stringify(debug.normalizedHolds, null, 2));

  await browser.close();
  server.close();
}

run();
