const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src');

function search(d) {
  const items = fs.readdirSync(d);
  for (const item of items) {
    const full = path.join(d, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      search(full);
    } else if (item.endsWith('.jsx') || item.endsWith('.js') || item.endsWith('.css') || item.endsWith('.html')) {
      const code = fs.readFileSync(full, 'utf8');
      const matches = [...code.matchAll(/&quot/g)];
      if (matches.length > 0) {
        console.log(`${item}: ${matches.length} occurrences of &quot`);
        let pos = 0;
        while ((pos = code.indexOf('&quot', pos)) !== -1) {
          console.log('  snippet:', code.slice(Math.max(0, pos - 40), pos + 50));
          pos += 5;
        }
      }
    }
  }
}

search(dir);
