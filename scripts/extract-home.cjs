const fs = require('fs');

const origHtml = fs.readFileSync('screenshots/original/home.html', 'utf8');

// Find main section
const mainStart = origHtml.indexOf('<main id="main"');
const mainEnd = origHtml.indexOf('</main>', mainStart) + 7;

const mainHtml = origHtml.slice(mainStart, mainEnd);
console.log('mainHtml length:', mainHtml.length);

fs.writeFileSync('scripts/home-main.html', mainHtml, 'utf8');
console.log('Saved scripts/home-main.html');

