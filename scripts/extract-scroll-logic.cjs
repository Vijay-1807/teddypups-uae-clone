const fs = require('fs');

const code = fs.readFileSync('chunks/1wa3jfz4v5w2v.js', 'utf8');

// Find module 91360 or function that calculates positions
const idx = code.indexOf('data-pup-stop');
console.log('Index of data-pup-stop:', idx);
if (idx !== -1) {
  console.log('Snippet around data-pup-stop:');
  console.log(code.slice(Math.max(0, idx - 400), idx + 800));
}

// Find module with pin/treadmill
const tIdx = code.indexOf('data-treadmill');
console.log('\nIndex of data-treadmill:', tIdx);
if (tIdx !== -1) {
  console.log('Snippet around data-treadmill:');
  console.log(code.slice(Math.max(0, tIdx - 400), tIdx + 800));
}

