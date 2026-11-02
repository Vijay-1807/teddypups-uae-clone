const fs = require('fs');
const path = require('path');

const pages = [
  'src/pages/PuppiesPage.jsx',
  'src/pages/HappyFamiliesPage.jsx',
  'src/pages/GoneHomePage.jsx',
  'src/pages/HomePage.jsx',
  'src/pages/FAQPage.jsx',
  'src/pages/HowItWorksPage.jsx',
  'src/pages/ContactPage.jsx',
  'src/pages/PuppyDetailPage.jsx',
];

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  let content = fs.readFileSync(p, 'utf8');

  // Replace data-armed="true" where data-revealed is missing
  // Pattern 1: data-armed="true" not followed by data-revealed="true"
  // Let's replace any data-armed="true" that doesn't have data-revealed="true"
  let count = 0;
  // Replace <tag ... data-armed="true" ...> that does NOT have data-revealed="true"
  content = content.replace(/(<[A-Za-z0-9_]+[^>]*\bdata-armed="true"[^>]*>)/g, (tag) => {
    if (!tag.includes('data-revealed="true"')) {
      count++;
      return tag.replace('data-armed="true"', 'data-armed="true" data-revealed="true"');
    }
    return tag;
  });

  // Also for any data-reveal="true" without data-revealed="true"
  content = content.replace(/(<[A-Za-z0-9_]+[^>]*\bdata-reveal="true"[^>]*>)/g, (tag) => {
    if (!tag.includes('data-revealed="true"')) {
      count++;
      return tag.replace('data-reveal="true"', 'data-reveal="true" data-armed="true" data-revealed="true"');
    }
    return tag;
  });

  fs.writeFileSync(p, content, 'utf8');
  console.log(`Updated ${p}: ${count} elements updated with data-revealed="true"`);
}
