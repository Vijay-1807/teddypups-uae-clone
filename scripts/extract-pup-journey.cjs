const fs = require('fs');

const code = fs.readFileSync('chunks/module-91360-scroll.js', 'utf8');

const pIdx = code.indexOf('"PupJourney"');
console.log('Index of PupJourney:', pIdx);
if (pIdx !== -1) {
  const pupJourneyCode = code.slice(pIdx, pIdx + 12000);
  fs.writeFileSync('chunks/PupJourney.js', pupJourneyCode);
  console.log('Saved chunks/PupJourney.js');
}

