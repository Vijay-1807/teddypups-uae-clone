const fs = require('fs');
const c = fs.readFileSync('chunks/module-91360-scroll.js', 'utf8');

// Find module 91360
const idx = c.indexOf('91360,e=>{');
console.log('Found 91360 at:', idx);
const end = c.indexOf(',41405,', idx);
console.log('End at:', end);

const code = c.slice(idx, end !== -1 ? end : undefined);
fs.writeFileSync('chunks/extracted/mod_91360.js', code);
console.log('Saved mod_91360.js, length:', code.length);

