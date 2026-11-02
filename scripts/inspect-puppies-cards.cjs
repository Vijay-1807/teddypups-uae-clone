const fs = require('fs');
const content = fs.readFileSync('src/pages/PuppiesPage.jsx', 'utf8');

// find all <Link or <div with tp-sketch
const regex = /<Link[^>]+className="tp-sketch"[^>]*>/g;
let match;
let i = 0;
while ((match = regex.exec(content)) !== null) {
  i++;
  const tag = match[0];
  const hasArmed = tag.includes('data-armed');
  const hasRevealed = tag.includes('data-revealed');
  const armedVal = tag.match(/data-armed="([^"]+)"/)?.[1];
  const revealedVal = tag.match(/data-revealed="([^"]+)"/)?.[1];
  console.log(`Card ${i}: armed=${armedVal}, revealed=${revealedVal}, to=${tag.match(/to="([^"]+)"/)?.[1]}`);
}
console.log('Total cards found:', i);
