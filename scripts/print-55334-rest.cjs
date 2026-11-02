const fs = require('fs');
const c = fs.readFileSync('chunks/extracted/mod_55334.js', 'utf8');
console.log(c.slice(1500, 3500));

