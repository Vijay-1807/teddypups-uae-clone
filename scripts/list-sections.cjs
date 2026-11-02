const fs = require('fs');
const html = fs.readFileSync('src/pages/HomePage.jsx', 'utf8');
const regex = /<section[^>]*className="([^"]*)"[^>]*>/g;
let m;
while ((m = regex.exec(html)) !== null) {
  console.log('Section at', m.index, 'className:', m[1]);
}
