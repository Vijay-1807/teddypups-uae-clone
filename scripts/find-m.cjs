const fs = require('fs');
const c = fs.readFileSync('chunks/177ya708_1zuj.js', 'utf8');
const idx = c.indexOf('["M",0,');
if (idx !== -1) {
  const modHeader = c.lastIndexOf(',e=>{', idx);
  console.log('Found! Module header:', c.slice(modHeader - 30, modHeader + 10));
  console.log('Exports:', c.slice(idx, idx + 400));
} else {
  console.log('Not found');
}

