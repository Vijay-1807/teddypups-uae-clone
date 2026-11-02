const fs = require('fs');
const c = fs.readFileSync('chunks/extracted/mod_91360.js', 'utf8');

// Let's print out the full text of mod_91360.js to a file we can inspect
fs.writeFileSync('chunks/extracted/mod_91360_pretty.js', c);
console.log('Saved mod_91360_pretty.js, length:', c.length);
