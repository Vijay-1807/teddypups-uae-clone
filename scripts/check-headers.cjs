const fs = require('fs');
const path = require('path');

const files = ['home.html', 'puppies.html', 'gone-home.html', 'happy-families.html', 'how-it-works.html', 'faq.html', 'contact.html'];

files.forEach(f => {
  const html = fs.readFileSync(path.join('screenshots/original', f), 'utf8');
  const h = html.match(/<header id="site-header"[^>]*>/);
  console.log(f, 'Header tag:', h ? h[0] : 'none');
});

