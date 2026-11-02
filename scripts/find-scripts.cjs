const fs = require('fs');

const html = fs.readFileSync('screenshots/original/home.html', 'utf8');
const scripts = [...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m => m[1]);
console.log('Scripts in original home.html:');
scripts.forEach(s => console.log('  ' + s));

