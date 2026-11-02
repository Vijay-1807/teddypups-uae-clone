const fs = require('fs');
const files = fs.readdirSync('chunks').filter(f => f.endsWith('.js'));
for (const f of files) {
  const c = fs.readFileSync('chunks/' + f, 'utf8');
  const idx = c.indexOf('tp-meet__track');
  if (idx !== -1) {
    console.log('Found tp-meet__track in:', f, 'at:', idx);
    console.log(c.slice(Math.max(0, idx - 200), idx + 300));
  }
}
