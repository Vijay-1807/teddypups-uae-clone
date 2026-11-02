const fs = require('fs');

function auditFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  console.log('=== Auditing', file, '===');
  
  // Find all occurrences of tp-sketch or data-reveal or data-armed
  const sketchMatches = content.match(/class(?:Name)?="[^"]*tp-sketch[^"]*"/g) || [];
  console.log('Total tp-sketch matches:', sketchMatches.length);

  const armedWithoutRevealed = [];
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('data-armed="true"') && !l.includes('data-revealed="true"')) {
      armedWithoutRevealed.push(idx + 1);
    }
  });
  console.log('Lines with data-armed="true" but without data-revealed="true":', armedWithoutRevealed.length);
}

auditFile('src/pages/PuppiesPage.jsx');
auditFile('src/pages/GoneHomePage.jsx');
auditFile('src/pages/HappyFamiliesPage.jsx');
auditFile('src/pages/HomePage.jsx');
