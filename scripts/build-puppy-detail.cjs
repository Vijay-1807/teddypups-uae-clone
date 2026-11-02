const fs = require('fs');
const { cleanHtmlToJsx } = require('./clean-helper.cjs');

const fullHtml = fs.readFileSync('screenshots/original/puppy-detail.html', 'utf8');
const mainStart = fullHtml.indexOf('<main id="main"');
const mainEnd = fullHtml.indexOf('</main>', mainStart) + 7;
const mainContent = fullHtml.slice(mainStart, mainEnd);

const jsx = cleanHtmlToJsx(mainContent);

const code = `import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { assetUrl, availablePuppies } from '../data/puppiesData';

export default function PuppyDetailPage({ onPlayVideo, onOpenLightbox }) {
  const { slug } = useParams();
  const currentPup = availablePuppies.find(p => p.slug === slug) || availablePuppies[0];

  return (
    ${jsx}
  );
}
`;

fs.writeFileSync('src/pages/PuppyDetailPage.jsx', code, 'utf8');
console.log('Generated src/pages/PuppyDetailPage.jsx');

