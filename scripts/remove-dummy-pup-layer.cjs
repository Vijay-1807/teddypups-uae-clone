const fs = require('fs');
let content = fs.readFileSync('src/pages/HomePage.jsx', 'utf8');

const targetStr = '<div aria-hidden="true" className="pup-layer"';
const idx = content.lastIndexOf(targetStr);
if (idx === -1) {
  console.error('Target not found!');
  process.exit(1);
}

// The dummy layer ends right before </main>
const mainEndIdx = content.lastIndexOf('</main>');
console.log('Found dummy pup-layer from index', idx, 'to', mainEndIdx);
console.log('Snippet being removed:');
console.log(content.slice(idx, idx + 200), '...');
console.log(content.slice(mainEndIdx - 100, mainEndIdx));

// Replace the slice from idx to mainEndIdx with empty string
const newContent = content.slice(0, idx) + content.slice(mainEndIdx);
fs.writeFileSync('src/pages/HomePage.jsx', newContent, 'utf8');
console.log('Successfully removed dummy static pup-layer from HomePage.jsx!');
