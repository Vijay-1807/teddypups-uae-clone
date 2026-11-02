const fs = require('fs');

const origHtml = fs.readFileSync('screenshots/original/home.html', 'utf8');

// Find all section elements with class in origHtml
const sectionRegex = /<section\b[^>]*class="([^"]*)"[^>]*>/g;
let match;
console.log('=== ORIGINAL SECTIONS ===');
while ((match = sectionRegex.exec(origHtml)) !== null) {
  console.log(match[1]);
}

