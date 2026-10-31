import React from 'react';

export default function PolaroidCard({ item, onClick, rotate = 0 }) {
  const { img, caption } = item;

  return (
    <div
      onClick={onClick}
      style={{ transform: `rotate(${rotate}deg)` }}
      className="tp-tape tp-polaroid cursor-pointer group flex flex-col justify-between"
      title="Click to view full photo"
    >
      {/* Photo Frame */}
      <div className="relative aspect-square w-full overflow-hidden rounded bg-[#f4ebe1] border border-cocoa/10">
        <img
          src={img}
          alt={caption || 'TeddyPups happy family'}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            e.target.src = '/brand/logo.png';
            e.target.className = 'w-full h-full object-contain p-8 opacity-40';
          }}
        />
      </div>

      {/* Handwritten Polaroid Caption */}
      <div className="pt-3 pb-1 text-center min-h-[36px] flex items-center justify-center">
        <p className="font-scrawl text-sm text-cocoa group-hover:text-toffee transition-colors tracking-wide">
          {caption || 'happy family ❤️'}
        </p>
      </div>
    </div>
  );
}

