const fs = require('fs');
const content = fs.readFileSync('src/pages/HomePage.jsx', 'utf8');

['/media/gAaGwoGej2g6', '/media/FHyoHcIosLZE'].forEach(str => {
  let pos = 0;
  console.log(`\nSearching for: ${str}`);
  while ((pos = content.indexOf(str, pos)) !== -1) {
    console.log('Found at pos ' + pos + ':');
    console.log(content.slice(Math.max(0, pos - 80), pos + str.length + 80));
    pos += str.length;
  }
});
