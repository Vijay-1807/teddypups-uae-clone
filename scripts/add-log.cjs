const fs = require('fs');
let c = fs.readFileSync('src/components/pup/PupJourney.jsx', 'utf8');

// Add console.log inside onFrame
const target = 'const interp = interpolateJourney(journeyData, curScrollY);';
const replacement = `const interp = interpolateJourney(journeyData, curScrollY);
      if (Math.floor(now * 2) !== Math.floor(prevTime * 2)) {
        console.log('[onFrame]', 'scrollY:', Math.round(curScrollY), 'k:', interp.k, 't:', interp.t.toFixed(2), 'x:', Math.round(interp.x), 'y:', Math.round(interp.y));
      }`;

c = c.replace(target, replacement);
fs.writeFileSync('src/components/pup/PupJourney.jsx', c, 'utf8');
console.log('Added log to PupJourney.jsx');
