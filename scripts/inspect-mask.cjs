const fs = require('fs');
const html = fs.readFileSync('screenshots/original/puppies.html', 'utf8');
const match = html.match(/class="[^"]*sketch__photo[^"]*"\s+style="([^"]+)"/);
if (match) {
  console.log('Original sketch__photo style:');
  console.log(match[1]);
} else {
  console.log('Not found');
}
