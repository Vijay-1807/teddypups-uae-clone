const fs = require('fs');
const cheerio = require('cheerio') || null;

// Simple regex parser if cheerio not installed
const html = fs.readFileSync('screenshots/original/home.html', 'utf8');

console.log('=== HEADER STRUCTURE ===');
const headerMatch = html.match(/<header id="site-header"[\s\S]*?<\/header>/);
if (headerMatch) {
  console.log(headerMatch[0]);
}

console.log('\n=== MAIN SECTIONS ===');
const sections = html.match(/<section[^>]*class="[^"]*tp-scene[^"]*"[\s\S]*?<\/section>/g) || [];
console.log('Found tp-scene sections:', sections.length);
sections.forEach((sec, idx) => {
  const classMatch = sec.match(/class="([^"]*)"/);
  const ariaLabel = sec.match(/aria-labelledby="([^"]*)"/);
  const h = sec.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/);
  console.log(`[${idx}] Class: ${classMatch ? classMatch[1] : ''} | Aria: ${ariaLabel ? ariaLabel[1] : ''} | Heading: ${h ? h[1].replace(/<[^>]+>/g, '').trim() : ''}`);
});

