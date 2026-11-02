const fs = require('fs');

const origHtml = fs.readFileSync('screenshots/original/home.html', 'utf8');
const headerMatch = origHtml.match(/<header id="site-header"[\s\S]*?<\/header>/);

if (headerMatch) {
  fs.writeFileSync('scripts/original-header.html', headerMatch[0], 'utf8');
  console.log('Saved original header to scripts/original-header.html');
}

const footerMatch = origHtml.match(/<footer class="tp-footer[\s\S]*?<\/footer>/);
if (footerMatch) {
  fs.writeFileSync('scripts/original-footer.html', footerMatch[0], 'utf8');
  console.log('Saved original footer to scripts/original-footer.html');
}

