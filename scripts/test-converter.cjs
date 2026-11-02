const fs = require('fs');

function htmlToJsx(html) {
  let jsx = html;

  // 1. Remove comments <!-- ... -->
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

  // 2. Rewrite _next/image URLs to direct media/brand URLs
  jsx = jsx.replace(/\/ _next\/image\?url=%2F([^&]+)&amp;[^\s"']+/g, '/$1');
  jsx = jsx.replace(/\/_next\/image\?url=%2F([^&"']+)[^"']*/g, (m, p1) => {
    return '/' + decodeURIComponent(p1);
  });

  // Remove srcset from next/image since we have local images
  jsx = jsx.replace(/\s+srcset="[^"]*"/g, '');
  jsx = jsx.replace(/\s+sizes="[^"]*"/g, '');

  // 3. Convert class to className
  jsx = jsx.replace(/\bclass="/g, 'className="');

  // 4. Convert for to htmlFor
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');

  // 5. Convert tabindex to tabIndex
  jsx = jsx.replace(/\btabindex="/g, 'tabIndex="');

  // 6. Convert SVG kebab-case attributes
  const svgAttrs = [
    'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray',
    'stroke-dashoffset', 'stroke-miterlimit', 'stroke-opacity',
    'fill-rule', 'fill-opacity', 'clip-rule', 'clip-path',
    'stop-color', 'stop-opacity', 'font-family', 'font-size',
    'font-weight', 'text-anchor', 'dominant-baseline', 'shape-rendering',
    'color-interpolation-filters', 'preserveAspectRatio'
  ];

  svgAttrs.forEach(attr => {
    const camel = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    const regex = new RegExp(`\\b${attr}="`, 'g');
    jsx = jsx.replace(regex, `${camel}="`);
  });

  // 7. Convert style="a:b;c:d" to style={{ a: 'b', c: 'd' }}
  jsx = jsx.replace(/\bstyle="([^"]*)"/g, (match, styleStr) => {
    if (!styleStr.trim()) return '';
    const rules = styleStr.split(';').filter(r => r.trim());
    const obj = {};
    rules.forEach(rule => {
      const colonIdx = rule.indexOf(':');
      if (colonIdx === -1) return;
      const key = rule.slice(0, colonIdx).trim();
      const val = rule.slice(colonIdx + 1).trim();
      // Handle CSS custom properties vs camelCase
      const camelKey = key.startsWith('--') ? key : key.replace(/-([a-z])/g, g => g[1].toUpperCase());
      obj[camelKey] = val;
    });
    return `style={${JSON.stringify(obj)}}`;
  });

  // 8. Self-close void elements: img, input, br, hr, rect, circle, path, ellipse, line, polygon, polyline, stop, use
  const voidTags = ['img', 'input', 'br', 'hr', 'rect', 'circle', 'path', 'ellipse', 'line', 'polygon', 'polyline', 'stop', 'use'];
  voidTags.forEach(tag => {
    // Matches <tag attributes> where it doesn't already end with />
    const regex = new RegExp(`<(${tag})\\b([^>]*?[^\\/])>`, 'gi');
    jsx = jsx.replace(regex, '<$1$2 />');
  });

  return jsx;
}

// Test with header
const html = fs.readFileSync('screenshots/original/home.html', 'utf8');
const headerMatch = html.match(/<header id="site-header"[\s\S]*?<\/header>/);
if (headerMatch) {
  const converted = htmlToJsx(headerMatch[0]);
  console.log('Converted Header JSX length:', converted.length);
  console.log(converted.slice(0, 500));
}

