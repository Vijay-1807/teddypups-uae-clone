const fs = require('fs');

function dumpModule(id, name) {
  const c = fs.readFileSync('chunks/177ya708_1zuj.js', 'utf8');
  const idx = c.indexOf(id + ',e=>{') !== -1 ? c.indexOf(id + ',e=>{') : c.indexOf(id + ',(e,t,a)=>{');
  if (idx === -1) {
    console.log('Not found:', id);
    return;
  }
  const end = c.indexOf(',e.s([', idx);
  const nextMod = c.indexOf(',e=>{', idx + 10);
  console.log(`Module ${id} found at ${idx}`);
  fs.writeFileSync(`chunks/extracted/${name}.js`, c.slice(idx, nextMod !== -1 ? nextMod : idx + 4000));
}

dumpModule('8478', 'mod_8478');
dumpModule('49054', 'mod_49054');
dumpModule('1063', 'mod_1063');
