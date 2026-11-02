const fs = require('fs');
const files = fs.readdirSync('chunks').filter(f => f.endsWith('.js'));
for (const f of files) {
  const c = fs.readFileSync('chunks/' + f, 'utf8');
  const idx = c.indexOf('data-revealed');
  if (idx !== -1) {
    console.log('Found data-revealed in:', f, 'at:', idx);
    console.log(c.slice(Math.max(0, idx - 200), idx + 200));
  }
}

