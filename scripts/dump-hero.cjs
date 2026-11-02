const fs = require('fs');
const html = fs.readFileSync('screenshots/original/home.html', 'utf8');

// Find tp-hero section
const start = html.indexOf('class="tp-scene tp-hero"');
if (start !== -1) {
  const sectionStart = html.lastIndexOf('<section', start);
  const nextSection = html.indexOf('<section', start);
  console.log('=== HERO SECTION HTML ===');
  console.log(html.slice(sectionStart, nextSection));
}

