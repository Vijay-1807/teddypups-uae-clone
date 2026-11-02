const fs = require('fs');

const code = fs.readFileSync('src/data/puppiesData.js', 'utf8');
const slugs = [...code.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
console.log('Total puppy slugs in data:', slugs.length);
console.log(slugs);
