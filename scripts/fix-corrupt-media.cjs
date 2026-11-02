const https = require('https');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'media', 'gAaGwoGej2g6', '5523e884dd');
const targetFile = path.join(targetDir, 'b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg');

if (fs.existsSync(targetFile)) {
  const stat = fs.statSync(targetFile);
  if (stat.isDirectory()) {
    console.log('Removing directory:', targetFile);
    fs.rmSync(targetFile, { recursive: true, force: true });
  }
}

// Download the real file
const url = 'https://puppy.instabizweb.com/media/gAaGwoGej2g6/5523e884dd/b942a5_50f0ae67c9ff437d911597d52a9e63b3-mv2.jpg';
console.log('Downloading from:', url);

const file = fs.createWriteStream(targetFile);
https.get(url, res => {
  if (res.statusCode !== 200) {
    console.error('Download failed with status:', res.statusCode);
    return;
  }
  res.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      const stats = fs.statSync(targetFile);
      console.log(`Success! Downloaded file size: ${stats.size} bytes`);
    });
  });
}).on('error', err => {
  console.error('Error downloading:', err.message);
});

