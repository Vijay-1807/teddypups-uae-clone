const fs = require('fs');
const html = fs.readFileSync('screenshots/original/home.html', 'utf8');

const cssLinks = html.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/g) || [];
console.log('CSS links:', cssLinks);

// Extract hrefs
cssLinks.forEach(link => {
  const m = link.match(/href=["']([^"']+)["']/);
  if (m) console.log('HREF:', m[1]);
});

