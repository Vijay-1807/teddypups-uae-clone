const fs = require('fs');

const path = 'src/pages/HomePage.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace import
content = content.replace("import React from 'react';", "import React, { useEffect } from 'react';");

const target = 'export default function HomePage({ onPlayVideo, onOpenLightbox }) {';
const insertion = `export default function HomePage({ onPlayVideo, onOpenLightbox }) {
  // 1. Meet Section Treadmill Controller
  useEffect(() => {
    const meetSection = document.querySelector('.tp-meet');
    const pinRange = meetSection?.querySelector('[data-pin-range]');
    const hall = meetSection?.querySelector('.tp-meet__hall');
    const track = meetSection?.querySelector('.tp-meet__track');

    if (!meetSection || !pinRange || !hall || !track) return;

    const doors = [...track.children];

    const onScroll = () => {
      const rect = pinRange.getBoundingClientRect();
      const totalDist = pinRange.offsetHeight - window.innerHeight;
      if (totalDist <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalDist));
      const maxScrollX = Math.max(0, track.scrollWidth - hall.clientWidth);
      const curX = -progress * maxScrollX;

      track.style.transform = \`translate3d(\${curX.toFixed(1)}px, 0, 0)\`;
      hall.style.setProperty('--floor-x', \`\${curX.toFixed(1)}px\`);

      const openThreshold = 0.36 * window.innerWidth;
      doors.forEach((door) => {
        const isOpen = door.offsetLeft + curX < openThreshold;
        if (door.dataset.open !== String(isOpen)) {
          door.dataset.open = String(isOpen);
          if (isOpen) {
            window.dispatchEvent(new CustomEvent('pup:cue', { detail: { look: door, secs: 0.9 } }));
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // 2. Chat Section Journey Steps Controller
  useEffect(() => {
    const chatSection = document.querySelector('.tp-chat');
    const stepList = chatSection?.querySelector('.tp-chat__steps');
    const phoneScreen = chatSection?.querySelector('.tp-phone__screen');
    const phoneStatus = chatSection?.querySelector('.tp-phone__status');

    if (!chatSection || !stepList || !phoneScreen) return;

    const steps = [...stepList.children];
    const msgGroups = [...phoneScreen.querySelectorAll('.tp-msg-group')];

    const onScroll = () => {
      const vh = window.innerHeight;
      let activeIdx = -1;

      steps.forEach((step, idx) => {
        const rect = step.getBoundingClientRect();
        if (rect.top < vh * 0.6) {
          activeIdx = idx;
        }
      });

      steps.forEach((step, idx) => {
        const isActive = idx === activeIdx;
        const isDone = idx < activeIdx;
        step.dataset.active = isActive ? 'true' : 'false';
        step.dataset.done = isDone ? 'true' : 'false';
      });

      msgGroups.forEach((group, idx) => {
        const isShown = idx <= activeIdx;
        if (group.dataset.show !== String(isShown)) {
          group.dataset.show = String(isShown);
          if (isShown && idx === 1) {
            window.dispatchEvent(new CustomEvent('pup:cue', { detail: { say: 'ooh, photos!', secs: 1.4 } }));
          } else if (isShown && idx === 2) {
            window.dispatchEvent(new CustomEvent('pup:cue', { detail: { say: 'home soon!', secs: 1.4 } }));
          }
        }
      });

      if (phoneStatus) {
        phoneStatus.textContent = activeIdx >= 0 ? 'online' : 'typing…';
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
`;

content = content.replace(target, insertion);
fs.writeFileSync(path, content, 'utf8');
console.log('Successfully updated HomePage.jsx with treadmill and chat scroll effects!');

