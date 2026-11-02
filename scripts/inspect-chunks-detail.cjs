const fs = require('fs');

const f1 = fs.readFileSync('chunks/1wa3jfz4v5w2v.js', 'utf8');
console.log('--- 1wa3jfz4v5w2v.js size:', f1.length);

// Find occurrences of pup-stop and treadmill
const m1 = f1.match(/(?:function|const|let|var)?\s*[\w$]*\b(?:treadmill|pup-stop|pupStop|usePup)[\s\S]{0,500}/gi);
if (m1) {
  console.log('Matches in 1wa3jfz4v5w2v.js:', m1.length);
  m1.slice(0, 5).forEach((m, i) => console.log(`\nMatch ${i}:\n`, m));
}

// Check 177ya708_1zuj.js
const f2 = fs.readFileSync('chunks/177ya708_1zuj.js', 'utf8');
console.log('\n--- 177ya708_1zuj.js size:', f2.length);
const m2 = f2.match(/(?:function|const|let|var)?\s*[\w$]*\b(?:pup-buddy|pupBuddy|buddy|Teddy|run|walk|tail)[\s\S]{0,500}/gi);
if (m2) {
  console.log('Matches in 177ya708_1zuj.js:', m2.length);
  m2.slice(0, 5).forEach((m, i) => console.log(`\nMatch ${i}:\n`, m));
}

