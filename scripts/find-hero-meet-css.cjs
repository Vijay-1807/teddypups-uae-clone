const fs = require('fs');
const css = fs.readFileSync('src/10jf32vdx50lp.css', 'utf8');

function findRules(selector) {
  let pos = 0;
  console.log(`=== Matches for ${selector} ===`);
  while ((pos = css.indexOf(selector, pos)) !== -1) {
    console.log(css.slice(Math.max(0, pos - 20), pos + 200));
    pos += selector.length;
  }
}

findRules('.tp-hero');
findRules('.tp-meet');
