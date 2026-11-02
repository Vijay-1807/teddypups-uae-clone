const fs = require('fs');
const html = fs.readFileSync('screenshots/original/home.html', 'utf8');

const htmlTag = html.match(/<html[^>]*>/);
const bodyTag = html.match(/<body[^>]*>/);

console.log('HTML tag:', htmlTag ? htmlTag[0] : 'none');
console.log('BODY tag:', bodyTag ? bodyTag[0] : 'none');

// Check style attributes or inline styles
const inlineStyles = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g) || [];
inlineStyles.forEach((s, idx) => {
  console.log(`Style block ${idx}:`, s.slice(0, 300));
});

