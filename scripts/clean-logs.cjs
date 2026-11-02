const fs = require('fs');
let c = fs.readFileSync('src/components/pup/PupJourney.jsx', 'utf8');

// Remove console.logs
c = c.replace(/console\.log\('\[PupJourney\][\s\S]*?'\);/g, '');
c = c.replace(/if \(!window\.__frameCount\)[\s\S]*?console\.log\('\[onFrame\]'[\s\S]*?;\s*\}/g, '');

fs.writeFileSync('src/components/pup/PupJourney.jsx', c, 'utf8');
console.log('Cleaned up debug logs from PupJourney.jsx');

