const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'chunks');
const files = fs.readdirSync(dir);

const terms = ['pup-buddy', 'data-pup-stop', 'data-treadmill', 'lenis', 'tp-hero__teddy'];

terms.forEach(term => {
  console.log(`\n=== Searching for: ${term} ===`);
  files.forEach(f => {
    const code = fs.readFileSync(path.join(dir, f), 'utf8');
    if (code.includes(term)) {
      console.log(`  Found in ${f} (${code.length} bytes)`);
    }
  });
});

