const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

// The exact SVG path for the organic pebble mask on PuppiesPage
const MASK_SVG = "url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20d%3D%22M96.93%2050.00C97.05%2052.50%2096.91%2055.08%2096.51%2057.55C96.12%2060.02%2095.42%2062.50%2094.55%2064.83C93.67%2067.16%2092.53%2069.43%2091.26%2071.54C90.00%2073.66%2088.52%2075.66%2086.95%2077.51C85.39%2079.36%2083.67%2081.09%2081.88%2082.67C80.09%2084.24%2078.17%2085.68%2076.20%2086.95C74.22%2088.21%2072.14%2089.33%2070.02%2090.26C67.90%2091.18%2065.69%2091.94%2063.48%2092.50C61.27%2093.07%2059.00%2093.44%2056.75%2093.67C54.50%2093.90%2052.24%2093.93%2050.00%2093.87C47.76%2093.80%2045.53%2093.58%2043.31%2093.28C41.09%2092.97%2038.88%2092.56%2036.68%2092.02C34.47%2091.48%2032.25%2090.86%2030.08%2090.06C27.90%2089.26%2025.70%2088.34%2023.62%2087.20C21.54%2086.06%2019.46%2084.75%2017.59%2083.21C15.71%2081.68%2013.91%2079.93%2012.37%2078.02C10.83%2076.10%209.46%2073.96%208.34%2071.75C7.23%2069.54%206.35%2067.14%205.69%2064.75C5.03%2062.36%204.62%2059.86%204.37%2057.41C4.12%2054.95%204.10%2052.45%204.21%2050.00C4.32%2047.55%204.61%2045.10%205.05%2042.71C5.49%2040.31%206.08%2037.93%206.85%2035.63C7.62%2033.34%208.54%2031.07%209.65%2028.93C10.75%2026.79%2012.04%2024.72%2013.48%2022.81C14.92%2020.91%2016.55%2019.11%2018.28%2017.49C20.00%2015.88%2021.90%2014.41%2023.84%2013.11C25.78%2011.80%2027.85%2010.66%2029.94%209.66C32.03%208.66%2034.20%207.81%2036.39%207.09C38.59%206.38%2040.84%205.80%2043.10%205.39C45.37%204.98%2047.69%204.71%2050.00%204.65C52.31%204.58%2054.66%204.69%2056.95%205.03C59.24%205.37%2061.55%205.92%2063.74%206.67C65.93%207.42%2068.09%208.41%2070.12%209.54C72.15%2010.67%2074.09%2012.01%2075.92%2013.44C77.75%2014.87%2079.48%2016.46%2081.12%2018.12C82.76%2019.77%2084.30%2021.53%2085.76%2023.37C87.23%2025.22%2088.62%2027.14%2089.88%2029.18C91.14%2031.21%2092.35%2033.34%2093.33%2035.57C94.32%2037.81%2095.20%2040.16%2095.80%2042.57C96.40%2044.97%2096.81%2047.50%2096.93%2050.00Z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E')";

files.forEach(f => {
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');
  let before = content;

  // 1. Remove broken backgroundImage blur placeholders:
  // e.g. ,"backgroundImage":"url(&quot","data":"image/webp..."
  content = content.replace(/,"backgroundImage":"url\(&quot","data":"image\/[^"]*"/g, '');
  content = content.replace(/,"backgroundSize":"cover","backgroundPosition":"[^"]*","backgroundRepeat":"no-repeat"/g, '');

  // 2. Fix broken maskImage in PuppiesPage:
  // style={{"maskImage":"url(&quot","data":"image/svg+xml,...&quot","WebkitMaskImage":"url(&quot"}}
  // Replace with clean maskImage and WebkitMaskImage
  content = content.replace(/style=\{\{"maskImage":"url\(&quot[\s\S]*?&quot"\}\}/g, () => {
    return `style={{ maskImage: "${MASK_SVG}", WebkitMaskImage: "${MASK_SVG}" }}`;
  });

  // 3. Clean up any remaining &quot inside style objects
  content = content.replace(/&quot/g, '');

  if (content !== before) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned broken styles in ${f}`);
  }
});
