const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'src', 'pages', 'HomePage.jsx');
let content = fs.readFileSync(file, 'utf8');

// Replace any src="/media/..." with src={assetUrl("/media/...")}
const before = content;
content = content.replace(/src="(\/media\/[^"]+)"/g, 'src={assetUrl("$1")}');

// Also check for any backgroundImage: "url(/media/...)" or similar
content = content.replace(/url\(["']?(\/media\/[^"')]+)["']?\)/g, (m, p) => {
  return `url(\${assetUrl("${p}")})`;
});

if (content !== before) {
  fs.writeFileSync(file, content, 'utf8');
  console.log('Fixed unwrapped media URLs in HomePage.jsx');
} else {
  console.log('No changes made via simple regex. Checking exact occurrences...');
  const idx1 = content.indexOf('/media/gAaGwoGej2g6');
  console.log('idx1 snippet:', content.slice(Math.max(0, idx1 - 50), idx1 + 100));
}
