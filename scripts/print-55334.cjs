const fs = require('fs');
const c = fs.readFileSync('chunks/extracted/mod_55334.js', 'utf8');
console.log('55334 length:', c.length);
console.log(c.slice(0, 1500));

