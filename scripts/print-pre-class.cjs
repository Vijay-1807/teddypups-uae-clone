const fs = require('fs');
const c = fs.readFileSync('chunks/177ya708_1zuj.js', 'utf8');
const idx = c.indexOf('class{svg;els;written');
console.log('Code before class:');
console.log(c.slice(Math.max(0, idx - 800), idx));

