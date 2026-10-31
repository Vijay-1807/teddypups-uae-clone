import React, { useState, useEffect } from 'react';

export default function MascotWidget() {
  const [bubbleText, setBubbleText] = useState('hm?');
  const [showBubble, setShowBubble] = useState(false);
  const [isWinking, setIsWinking] = useState(false);
  const [pawPrints, setPawPrints] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Track mouse movements to make eyes gently follow
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate normalized direction (-1 to 1)
      const dx = (e.clientX / window.innerWidth - 0.5) * 4;
      const dy = (e.clientY / window.innerHeight - 0.5) * 3;
      setMousePos({ x: dx, y: dy });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = (e) => {
    setIsWinking(true);
    const messages = ['woof! 🐾', 'hello, friend!', 'every puppy is family ❤️', 'pick me! 🐶', 'snuggle time!'];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setBubbleText(randomMsg);
    setShowBubble(true);

    // Add paw print
    const id = Date.now();
    const newPaw = { id, x: e.clientX, y: e.clientY };
    setPawPrints((prev) => [...prev.slice(-4), newPaw]);

    setTimeout(() => {
      setIsWinking(false);
    }, 1200);

    setTimeout(() => {
      setShowBubble(false);
    }, 2500);
  };

  return (
    <>
      {/* Click Paw Prints */}
      {pawPrints.map((paw) => (
        <div
          key={paw.id}
          className="fixed pointer-events-none z-50 text-cocoa/40 animate-out fade-out zoom-out-95 duration-1000"
          style={{ left: paw.x - 12, top: paw.y - 12 }}
        >
          <svg viewBox="0 0 64 64" className="w-6 h-6 fill-current">
            <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5zM19.28 26.71C21.07 30.08 20.42 33.92 17.84 35.29C15.25 36.67 11.71 35.05 9.92 31.69C8.13 28.32 8.78 24.48 11.36 23.11C13.95 21.73 17.49 23.35 19.28 26.71ZM29.62 15.64C30.32 19.62 28.46 23.26 25.47 23.79C22.48 24.32 19.48 21.53 18.78 17.56C18.08 13.58 19.94 9.94 22.93 9.41C25.92 8.88 28.92 11.67 29.62 15.64ZM45.22 17.56C44.52 21.53 41.52 24.32 38.53 23.79C35.54 23.26 33.68 19.62 34.38 15.64C35.08 11.67 38.08 8.88 41.07 9.41C44.06 9.94 45.92 13.58 45.22 17.56ZM54.08 31.69C52.29 35.05 48.75 36.67 46.16 35.29C43.58 33.92 42.93 30.08 44.72 26.71C46.51 23.35 50.05 21.73 52.64 23.11C55.22 24.48 55.87 28.32 54.08 31.69Z" />
          </svg>
        </div>
      ))}

      {/* Mascot Pinned to Bottom Right */}
      <div
        className="fixed bottom-14 sm:bottom-4 right-4 z-40 select-none cursor-pointer group"
        onClick={handleClick}
        onMouseEnter={() => {
          setBubbleText('hm?');
          setShowBubble(true);
        }}
        onMouseLeave={() => {
          if (!isWinking) setShowBubble(false);
        }}
        title="Click Teddy for a wag!"
      >
        {/* Speech Bubble */}
        <div
          className={`absolute -top-10 right-4 px-3 py-1.5 bg-[#fffdf8] border-2 border-cocoa text-cocoa font-scrawl text-sm rounded-2xl shadow-lg transition-all duration-300 pointer-events-none ${
            showBubble ? 'opacity-100 scale-100 -translate-y-2' : 'opacity-0 scale-75 translate-y-2'
          }`}
        >
          {bubbleText}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#fffdf8] border-b-2 border-r-2 border-cocoa rotate-45"></div>
        </div>

        {/* Teddy Mascot SVG */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 transition-transform group-hover:scale-105 active:scale-95">
          <svg viewBox="0 0 250 250" className="w-full h-full drop-shadow-md">
            {/* Left Ear */}
            <g
              style={{
                transformOrigin: '70px 70px',
                transform: isWinking ? 'rotate(-12deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              <ellipse cx="65" cy="85" rx="26" ry="42" fill="#d38f45" stroke="#2a170e" strokeWidth="4" />
              <ellipse cx="68" cy="88" rx="16" ry="28" fill="#f2be6b" />
            </g>

            {/* Right Ear */}
            <g
              style={{
                transformOrigin: '180px 70px',
                transform: isWinking ? 'rotate(15deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              <ellipse cx="185" cy="85" rx="26" ry="42" fill="#d38f45" stroke="#2a170e" strokeWidth="4" />
              <ellipse cx="182" cy="88" rx="16" ry="28" fill="#f2be6b" />
            </g>

            {/* Head */}
            <circle cx="125" cy="115" r="62" fill="#f2be6b" stroke="#2a170e" strokeWidth="4.5" />

            {/* Rosy Cheeks */}
            <ellipse cx="85" cy="132" rx="10" ry="6" fill="#f9cdbf" opacity="0.8" />
            <ellipse cx="165" cy="132" rx="10" ry="6" fill="#f9cdbf" opacity="0.8" />

            {/* Eyes */}
            {isWinking ? (
              <>
                {/* Winking left eye */}
                <path d="M96 108 Q106 116 116 108" fill="none" stroke="#2a170e" strokeWidth="4.5" strokeLinecap="round" />
                {/* Wide open right eye */}
                <circle cx="144" cy="108" r="8" fill="#2a170e" />
                <circle cx="142" cy="105" r="2.8" fill="#ffffff" />
              </>
            ) : (
              <>
                {/* Left Eye with gentle cursor tracking */}
                <circle
                  cx={106 + mousePos.x}
                  cy={108 + mousePos.y}
                  r="7.5"
                  fill="#2a170e"
                  style={{ transition: 'cx 0.1s, cy 0.1s' }}
                />
                <circle cx={104 + mousePos.x} cy={105 + mousePos.y} r="2.5" fill="#ffffff" />

                {/* Right Eye */}
                <circle
                  cx={144 + mousePos.x}
                  cy={108 + mousePos.y}
                  r="7.5"
                  fill="#2a170e"
                  style={{ transition: 'cx 0.1s, cy 0.1s' }}
                />
                <circle cx={142 + mousePos.x} cy={105 + mousePos.y} r="2.5" fill="#ffffff" />
              </>
            )}

            {/* Snout */}
            <ellipse cx="125" cy="132" rx="20" ry="14" fill="#fffdf8" stroke="#2a170e" strokeWidth="3.5" />

            {/* Nose */}
            <path
              d="M118 126 C118 123 132 123 132 126 C132 131 127 134 125 134 C123 134 118 131 118 126 Z"
              fill="#2a170e"
            />

            {/* Mouth */}
            <path d="M125 134 v4" stroke="#2a170e" strokeWidth="3" strokeLinecap="round" />
            <path
              d="M117 138 Q125 144 133 138"
              fill="none"
              stroke="#2a170e"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Tongue */}
            <path
              d="M121 141 Q125 152 129 141 Z"
              fill="#e98c8c"
              stroke="#2a170e"
              strokeWidth="2"
              className={isWinking ? 'animate-bounce' : ''}
            />

            {/* Paws on Ledge */}
            <g>
              <ellipse cx="98" cy="172" rx="14" ry="10" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" />
              <ellipse cx="152" cy="172" rx="14" ry="10" fill="#f2be6b" stroke="#2a170e" strokeWidth="3.5" />
              {/* Toe lines */}
              <line x1="94" y1="170" x2="94" y2="175" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
              <line x1="102" y1="170" x2="102" y2="175" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
              <line x1="148" y1="170" x2="148" y2="175" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
              <line x1="156" y1="170" x2="156" y2="175" stroke="#2a170e" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

