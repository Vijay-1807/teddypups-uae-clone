const fs = require('fs');
const path = require('path');

const dir = 'screenshots/original';
const files = ['home.html', 'puppies.html', 'puppy-detail.html', 'gone-home.html', 'happy-families.html', 'how-it-works.html', 'faq.html', 'contact.html'];

files.forEach(f => {
  const filePath = path.join(dir, f);
  if (!fs.existsSync(filePath)) return;
  const html = fs.readFileSync(filePath, 'utf8');
  const mainMatch = html.match(/<main id="main"[^>]*>([\s\S]*?)<\/main>/);
  if (mainMatch) {
    const mainContent = mainMatch[1];
    // Find first 3 headings or sections
    const headings = mainContent.match(/<h[1-3][^>]*>[\s\S]*?<\/h[1-3]>/g) || [];
    const cleanHeadings = headings.map(h => h.replace(/<[^>]+>/g, '').trim()).slice(0, 5);
    console.log(`=== ${f} === (Main length: ${mainContent.length} chars)`);
    console.log('Headings:', cleanHeadings);
  } else {
    console.log(`=== ${f} === NO MAIN TAG FOUND`);
  }
});

