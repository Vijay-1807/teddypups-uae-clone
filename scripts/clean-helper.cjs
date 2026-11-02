function cleanHtmlToJsx(html) {
  let jsx = html;

  // 1. Remove comments
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');

  // 2. Remove script tags
  jsx = jsx.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

  // 3. Decode next/image URLs to direct media/brand URLs
  jsx = jsx.replace(/\/_next\/image\?url=%2F([^&"']+)[^"']*/g, (m, p1) => {
    return '/' + decodeURIComponent(p1);
  });

  // 4. Remove next/image specific attributes
  jsx = jsx.replace(/\s+srcset="[^"]*"/g, '');
  jsx = jsx.replace(/\s+sizes="[^"]*"/g, '');
  jsx = jsx.replace(/\s+data-nimg="[^"]*"/g, '');
  jsx = jsx.replace(/\s+fetchpriority="[^"]*"/g, '');

  // 5. Convert standard HTML attributes to JSX
  jsx = jsx.replace(/\bclass="/g, 'className="');
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
  jsx = jsx.replace(/\btabindex="/g, 'tabIndex="');
  jsx = jsx.replace(/\bautocomplete="/g, 'autoComplete="');
  jsx = jsx.replace(/\bnovalidate\b/g, 'noValidate');

  // 6. SVG attributes to camelCase
  const svgAttrs = [
    'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray',
    'stroke-dashoffset', 'stroke-miterlimit', 'stroke-opacity',
    'fill-rule', 'fill-opacity', 'clip-rule', 'clip-path',
    'stop-color', 'stop-opacity', 'font-family', 'font-size',
    'font-weight', 'text-anchor', 'dominant-baseline', 'shape-rendering',
    'color-interpolation-filters', 'preserveAspectRatio', 'patternUnits'
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
      const camelKey = key.startsWith('--') ? key : key.replace(/-([a-z])/g, g => g[1].toUpperCase());
      obj[camelKey] = val;
    });
    return `style={${JSON.stringify(obj)}}`;
  });

  // 8. Void elements: self-closing img, input, br, hr
  const voidTags = ['img', 'input', 'br', 'hr'];
  voidTags.forEach(tag => {
    const regex = new RegExp(`<(${tag})\\b([^>]*?[^\\/])>`, 'gi');
    jsx = jsx.replace(regex, '<$1$2 />');
  });

  // 9. Replace <a> links with <Link> for internal routes
  jsx = jsx.replace(/<a\b([^>]*?)href="(\/[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (m, before, href, after, inner) => {
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return m;
    return `<Link${before}to="${href}"${after}>${inner}</Link>`;
  });

  // 10. Wrap image src with assetUrl
  jsx = jsx.replace(/src="(\/(?:media|brand|cursor)[^"]*)"/g, 'src={assetUrl("$1")}');

  return jsx;
}

module.exports = { cleanHtmlToJsx };

