const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, '..', 'dist');
const indexHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

// 1. Copy to 404.html
fs.writeFileSync(path.join(DIST, '404.html'), indexHtml, 'utf8');
console.log('Created dist/404.html');

// 2. Base routes
const staticRoutes = [
  'puppies',
  'gone-home',
  'happy-families',
  'how-it-works',
  'faq',
  'contact'
];

// 3. Puppy slug routes
const code = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'puppiesData.js'), 'utf8');
const slugs = [...code.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);

slugs.forEach(s => {
  staticRoutes.push(`puppies/${s}`);
});

console.log(`Generating ${staticRoutes.length} static route index.html files...`);

staticRoutes.forEach(r => {
  const dir = path.join(DIST, r);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), indexHtml, 'utf8');
});

console.log('Successfully generated all static routes for GitHub Pages HTTP 200 responses!');

