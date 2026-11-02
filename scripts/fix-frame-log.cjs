const fs = require('fs');
let c = fs.readFileSync('src/components/pup/PupJourney.jsx', 'utf8');

c = c.replace(/if \(Math\.floor\(now \* 2\) !== Math\.floor\(prevTime \* 2\)\) \{[\s\S]*?\}/, `
      if (!window.__frameCount) window.__frameCount = 0;
      if (window.__frameCount++ % 30 === 0) {
        console.log('[onFrame]', 'curScrollY:', Math.round(curScrollY), 'k:', interp.k, 't:', interp.t.toFixed(2), 'x:', Math.round(interp.x), 'y:', Math.round(interp.y));
      }
`);

fs.writeFileSync('src/components/pup/PupJourney.jsx', c, 'utf8');
console.log('Fixed log in onFrame');

