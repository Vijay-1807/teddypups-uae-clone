const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('10jf32vdx50lp.css')) {
  css = `@import './10jf32vdx50lp.css';\n` + css;
  fs.writeFileSync('src/index.css', css, 'utf8');
  console.log('Imported 10jf32vdx50lp.css into index.css');
}

