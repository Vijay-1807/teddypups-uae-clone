const fs = require('fs');

const code = fs.readFileSync('chunks/module-91360-scroll.js', 'utf8');

const exportMatches = [...code.matchAll(/e\.s\(\[[\s\S]*?\]\)/g)].map(m => m[0].slice(0, 100));
console.log('Exports in module-91360:', exportMatches);

const animMatches = [...code.matchAll(/(?:requestAnimationFrame|addEventListener\(['"]scroll['"]|useScroll|onScroll|lenis|scrollTrigger)[\s\S]{0,200}/gi)].map(m => m[0]);
console.log('\nAnimation triggers:', animMatches.length);
animMatches.forEach((m, i) => console.log(`Trigger ${i}:\n`, m));
