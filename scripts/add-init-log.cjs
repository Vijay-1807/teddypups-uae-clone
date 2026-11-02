const fs = require('fs');
let c = fs.readFileSync('src/components/pup/PupJourney.jsx', 'utf8');

c = c.replace('const initEngine = () => {', `const initEngine = () => {
      console.log('[PupJourney] initEngine starting...');`);

c = c.replace('if (!data) return;', `if (!data) {
        console.log('[PupJourney] calculateStops returned null!');
        return;
      }
      console.log('[PupJourney] calculateStops succeeded with', data.stops.length, 'stops!');`);

fs.writeFileSync('src/components/pup/PupJourney.jsx', c, 'utf8');
console.log('Added debug logs to initEngine');
