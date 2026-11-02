const fs = require('fs');
const html = fs.readFileSync('screenshots/original/home.html', 'utf8');

// Find all elements after </main> and before </body>
const mainEnd = html.indexOf('</main>');
const footerEnd = html.indexOf('</footer>');
const bodyEnd = html.indexOf('</body>');

console.log('=== AFTER FOOTER ===');
console.log(html.slice(footerEnd + 9, bodyEnd));

