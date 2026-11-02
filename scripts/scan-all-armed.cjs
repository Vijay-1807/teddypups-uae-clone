const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      checkDir(full);
    } else if (f.endsWith('.jsx') || f.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      // find tags with data-armed
      const tagRegex = /<[A-Za-z0-9_]+[^>]*data-armed[^>]*>/g;
      let match;
      let armedTotal = 0;
      let missingRevealed = 0;
      while ((match = tagRegex.exec(content)) !== null) {
        armedTotal++;
        if (!match[0].includes('data-revealed="true"') && !match[0].includes("data-revealed='true'")) {
          missingRevealed++;
          console.log(`[${f}] Missing data-revealed in tag:`, match[0].slice(0, 120));
        }
      }
      if (armedTotal > 0) {
        console.log(`File: ${f} -> Total data-armed: ${armedTotal}, Missing data-revealed: ${missingRevealed}`);
      }
    }
  }
}

checkDir('src');
