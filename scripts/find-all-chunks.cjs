const fs = require('fs');
const path = require('path');

const dir = 'screenshots/original';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const cssSet = new Set();
const jsSet = new Set();

files.forEach(f => {
  const html = fs.readFileSync(path.join(dir, f), 'utf8');
  const cssMatches = html.matchAll(/href="(\/_next\/static\/chunks\/[^"]+\.css)"/g);
  for (const m of cssMatches) cssSet.add(m[1]);
  const jsMatches = html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g);
  for (const m of jsMatches) jsSet.add(m[1]);
});

console.log('Unique CSS chunks:', Array.from(cssSet));
console.log('Unique JS chunks count:', Array.from(jsSet).length);

