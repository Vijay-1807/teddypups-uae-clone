const fs = require('fs');
const c = fs.readFileSync('chunks/177ya708_1zuj.js', 'utf8');

// Find module 1063
const idx = c.indexOf('1063,e=>{');
const nextIdx = c.indexOf(',e=>{', idx + 10);
const code = c.slice(idx, nextIdx !== -1 ? nextIdx : undefined);
console.log('1063 length:', code.length);
fs.writeFileSync('chunks/extracted/mod_1063_full.js', code);
console.log('Saved mod_1063_full.js');
