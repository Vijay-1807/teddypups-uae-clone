const fs = require('fs');

const fullHtml = fs.readFileSync('screenshots/original/puppies.html', 'utf8');
const mainStart = fullHtml.indexOf('<main id="main"');
const mainEnd = fullHtml.indexOf('</main>', mainStart) + 7;
const mainContent = fullHtml.slice(mainStart, mainEnd);

const { cleanHtmlToJsx } = require('./clean-helper.cjs');
const jsx = cleanHtmlToJsx(mainContent);

const code = `import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { assetUrl } from '../data/puppiesData';

export default function PuppiesPage({ onPlayVideo }) {
  return (
    ${jsx}
  );
}
`;

fs.writeFileSync('src/pages/PuppiesPage.jsx', code, 'utf8');
console.log('Generated src/pages/PuppiesPage.jsx');

