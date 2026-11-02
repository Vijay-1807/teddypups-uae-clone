const fs = require('fs');

const animClass = fs.readFileSync('chunks/extracted/pup_anim_class.js', 'utf8');
const tricks = fs.readFileSync('chunks/extracted/pup_tricks.js', 'utf8');

console.log('--- anim class ---');
console.log(animClass);

console.log('--- tricks ---');
console.log(tricks);
