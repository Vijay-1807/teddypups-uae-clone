const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '..', 'src', '10jf32vdx50lp.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(
  /cursor:url\(\/cursor\/paw\.svg\)\s*9\s*6,auto/g,
  'cursor:url(/teddypups-uae-clone/cursor/paw.svg) 9 6, url(/cursor/paw.svg) 9 6, auto'
);

css = css.replace(
  /cursor:url\(\/cursor\/paw-press\.svg\)\s*9\s*6,pointer/g,
  'cursor:url(/teddypups-uae-clone/cursor/paw-press.svg) 9 6, url(/cursor/paw-press.svg) 9 6, pointer'
);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Fixed cursor paths in 10jf32vdx50lp.css');

