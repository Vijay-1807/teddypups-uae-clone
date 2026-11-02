const fs = require('fs');

function htmlToJsx(html) {
  let jsx = html;
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '');
  jsx = jsx.replace(/\/_next\/image\?url=%2F([^&"']+)[^"']*/g, (m, p1) => {
    return '/' + decodeURIComponent(p1);
  });
  jsx = jsx.replace(/\s+srcset="[^"]*"/g, '');
  jsx = jsx.replace(/\s+sizes="[^"]*"/g, '');
  jsx = jsx.replace(/\bclass="/g, 'className="');
  jsx = jsx.replace(/\bfor="/g, 'htmlFor="');
  jsx = jsx.replace(/\btabindex="/g, 'tabIndex="');

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

  // Void elements that never have closing tags in HTML
  const voidTags = ['img', 'input', 'br', 'hr'];
  voidTags.forEach(tag => {
    const regex = new RegExp(`<(${tag})\\b([^>]*?[^\\/])>`, 'gi');
    jsx = jsx.replace(regex, '<$1$2 />');
  });

  return jsx;
}

// Convert Header
const headerRaw = fs.readFileSync('scripts/original-header.html', 'utf8');
let headerJsx = htmlToJsx(headerRaw);

// Replace <a> links with <Link> for internal routes
headerJsx = headerJsx.replace(/<a\b([^>]*?)href="(\/[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (m, before, href, after, inner) => {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return m;
  return `<Link${before}to="${href}"${after}>${inner}</Link>`;
});

headerJsx = headerJsx.replace(/src="\/brand\/logo\.png"/g, 'src={assetUrl("/brand/logo.png")}');

const headerComponent = `import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { assetUrl } from '../data/puppiesData';

export default function Header() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    ${headerJsx
      .replace('data-scrolled="false"', 'data-scrolled={isScrolled ? "true" : "false"}')
      .replace('data-home="true"', 'data-home={isHome ? "true" : undefined}')
      .replace(/<dialog\b[^>]*>/, '<dialog className="tp-header__menu" open={isMenuOpen}>')
      .replace(/<button type="button" className="tp-header__burger"([^>]*)>/, '<button type="button" className="tp-header__burger"$1 onClick={() => setIsMenuOpen(!isMenuOpen)}>')
      .replace(/<button type="button" className="tp-header__close"([^>]*)>/, '<button type="button" className="tp-header__close"$1 onClick={() => setIsMenuOpen(false)}>')
    }
  );
}
`;

fs.writeFileSync('src/components/Header.jsx', headerComponent, 'utf8');
console.log('Successfully generated src/components/Header.jsx');

// Convert Footer
const footerRaw = fs.readFileSync('scripts/original-footer.html', 'utf8');
let footerJsx = htmlToJsx(footerRaw);

footerJsx = footerJsx.replace(/<a\b([^>]*?)href="(\/[^"]*)"([^>]*)>([\s\S]*?)<\/a>/g, (m, before, href, after, inner) => {
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return m;
  return `<Link${before}to="${href}"${after}>${inner}</Link>`;
});

footerJsx = footerJsx.replace(/src="\/brand\/logo\.png"/g, 'src={assetUrl("/brand/logo.png")}');

const footerComponent = `import React from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../data/puppiesData';

export default function Footer() {
  return (
    ${footerJsx}
  );
}
`;

fs.writeFileSync('src/components/Footer.jsx', footerComponent, 'utf8');
console.log('Successfully generated src/components/Footer.jsx');
