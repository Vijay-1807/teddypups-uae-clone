const fs = require('fs');

const html = fs.readFileSync('scripts/home-main.html', 'utf8');
const imgMatches = html.matchAll(/<img[^>]+src="([^"]+)"/g);

const srcs = new Set();
for (const m of imgMatches) {
  srcs.add(m[1]);
}

console.log('Total img tags:', Array.from(srcs).length);
console.log('Sample image srcs:', Array.from(srcs).slice(0, 10));

