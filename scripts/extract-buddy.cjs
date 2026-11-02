const fs = require('fs');

const c = fs.readFileSync('chunks/177ya708_1zuj.js', 'utf8');
const idx = c.indexOf('class{svg;els;written');
const start = c.lastIndexOf(',e=>{', idx);
const classEnd = c.indexOf('e.s(["M",0,', idx);
console.log('Class length:', classEnd - idx);
fs.writeFileSync('chunks/extracted/pup_anim_class.js', c.slice(idx, classEnd));
console.log('Saved pup_anim_class.js');

// Also let's extract the tricks / acts M object:
const tricksEnd = c.indexOf('e.s(["PupBuddy",0,', classEnd);
fs.writeFileSync('chunks/extracted/pup_tricks.js', c.slice(classEnd, tricksEnd));
console.log('Saved pup_tricks.js');

// Also let's extract PupBuddy component:
const buddyEnd = c.indexOf('e.s(["u",0,', tricksEnd);
fs.writeFileSync('chunks/extracted/pup_buddy_comp.js', c.slice(tricksEnd, buddyEnd));
console.log('Saved pup_buddy_comp.js');
