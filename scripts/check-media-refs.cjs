const fs = require('fs');
const path = require('path');

const pages = [
  'HomePage.jsx', 'PuppiesPage.jsx', 'PuppyDetailPage.jsx',
  'GoneHomePage.jsx', 'HappyFamiliesPage.jsx', 'HowItWorksPage.jsx',
  'FAQPage.jsx', 'ContactPage.jsx'
];

pages.forEach(p => {
  const filePath = path.join(__dirname, '..', 'src', 'pages', p);
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');

  // Check for bare "/media/" not inside assetUrl()
  const matches = [...content.matchAll(/([^\w])(\/media\/[a-zA-Z0-9_\-\.\/]+)/g)];
  const unwrapped = matches.filter(m => {
    // Check if preceded by assetUrl(
    const idx = m.index;
    const before = content.slice(Math.max(0, idx - 15), idx + 2);
    return !before.includes('assetUrl');
  });

  if (unwrapped.length > 0) {
    console.log(`${p}: ${unwrapped.length} unwrapped media URLs`);
    unwrapped.forEach(u => console.log('  ' + u[2]));
  } else {
    console.log(`${p}: All media URLs wrapped properly`);
  }
});
