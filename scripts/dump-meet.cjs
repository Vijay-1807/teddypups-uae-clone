const fs = require('fs');
const c = fs.readFileSync('chunks/1wa3jfz4v5w2v.js', 'utf8');
const idx = c.indexOf('tp-meet__track');
// find start of function
const start = c.lastIndexOf('function', idx);
const end = c.indexOf('tp-fork', idx);
console.log('Meet component length:', end - start);
fs.writeFileSync('chunks/extracted/meet_comp.js', c.slice(start, end !== -1 ? end : idx + 3000));
console.log('Saved meet_comp.js');

