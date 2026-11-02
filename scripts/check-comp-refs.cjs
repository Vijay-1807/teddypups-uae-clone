const fs = require('fs');

['Header.jsx', 'Footer.jsx'].forEach(c => {
  const code = fs.readFileSync('src/components/' + c, 'utf8');
  const unwrapped = [...code.matchAll(/([^\w])(\/(?:media|brand|cursor)[a-zA-Z0-9_\-\.\/]+)/g)]
    .filter(m => {
      const idx = m.index;
      const before = code.slice(Math.max(0, idx - 15), idx + 2);
      return !before.includes('assetUrl');
    });
  console.log(`${c}: ${unwrapped.length} unwrapped`);
  unwrapped.forEach(u => console.log('  ' + u[2]));
});
