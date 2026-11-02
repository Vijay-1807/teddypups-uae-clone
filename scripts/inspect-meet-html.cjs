const fs = require('fs');
const html = fs.readFileSync('src/pages/HomePage.jsx', 'utf8');
const start = html.indexOf('tp-meet"');
const sectionStart = html.lastIndexOf('<section', start);
const sectionEnd = html.indexOf('</section>', start) + 10;
console.log('Meet section length:', sectionEnd - sectionStart);
fs.writeFileSync('chunks/extracted/meet_section_home.jsx', html.slice(sectionStart, sectionEnd));
console.log('Saved meet_section_home.jsx');

