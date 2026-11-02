const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. href="/media/..." -> href={assetUrl("/media/...")}
  content = content.replace(/\bhref="(\/(?:media|brand|cursor)[^"]*)"/g, (m, p) => {
    changed = true;
    return `href={assetUrl("${p}")}`;
  });

  // 2. poster="/media/..." -> poster={assetUrl("/media/...")}
  content = content.replace(/\bposter="(\/(?:media|brand|cursor)[^"]*)"/g, (m, p) => {
    changed = true;
    return `poster={assetUrl("${p}")}`;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${f} with href/poster assetUrl wrapping`);
  }
});
