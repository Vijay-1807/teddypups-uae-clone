const fs = require('fs');

const code1 = fs.readFileSync('chunks/1wa3jfz4v5w2v.js', 'utf8');
const code2 = fs.readFileSync('chunks/177ya708_1zuj.js', 'utf8');

// Find module 91360 in code1
const m91360Start = code1.indexOf('91360,e=>{');
console.log('m91360Start:', m91360Start);
if (m91360Start !== -1) {
  // Extract up to next module definition or 15000 chars
  fs.writeFileSync('chunks/module-91360-scroll.js', code1.slice(m91360Start, m91360Start + 25000));
  console.log('Saved chunks/module-91360-scroll.js');
}

// Check code2 for PupBuddy and animations
fs.writeFileSync('chunks/module-pup-buddy.js', code2);
console.log('Saved chunks/module-pup-buddy.js');

