import React from 'react';
import { Link } from 'react-router-dom';
import { Play, MessageCircle, Heart, Sparkles } from 'lucide-react';
import { siteMeta } from '../data/puppiesData';

export default function PuppyCard({ puppy, onPlayVideo }) {
  const { slug, name, breed, gender, age, origin, status, hasVideo, image, specs } = puppy;

  const prefilledWhatsApp = `https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'm%20interested%20in%20${encodeURIComponent(
    name
  )}%20(${encodeURIComponent(breed)},%20${encodeURIComponent(gender)}).%20Could%20you%20please%20share%20more%20details%20and%20videos?`;

  return (
    <div className="group relative tp-sketch-card overflow-hidden flex flex-col justify-between transition-all duration-300">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#f4ebe1]">
        <Link to={`/puppies/${slug}`} className="block w-full h-full">
          <img
            src={image}
            alt={`${name}, ${breed} puppy`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              // fallback if specific image fails
              e.target.src = '/brand/logo.png';
              e.target.className = 'w-full h-full object-contain p-12 opacity-50';
            }}
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
          {/* Status Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-milk text-cocoa border border-cocoa/20 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {status || 'Available'}
          </span>

          {/* Video Pill */}
          {hasVideo && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (onPlayVideo) onPlayVideo(puppy);
              }}
              className="pointer-events-auto inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-cocoa text-milk hover:bg-toffee hover:scale-105 transition-all shadow-md group/video"
              title="Watch puppy video"
            >
              <Play className="w-3 h-3 fill-honey text-honey group-hover/video:fill-milk group-hover/video:text-milk" />
              <span>video</span>
            </button>
          )}
        </div>

        {/* Origin Pill (Bottom left of photo) */}
        <div className="absolute bottom-3 left-3 pointer-events-none">
          <span className="px-2.5 py-0.5 rounded-full text-[0.75rem] font-semibold bg-milk/90 backdrop-blur-xs text-cocoa-soft border border-cocoa/10">
            {origin}
          </span>
        </div>
      </div>

      {/* Card Body Info */}
      <div className="p-5 flex flex-col flex-1 justify-between bg-milk">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link
              to={`/puppies/${slug}`}
              className="font-serif text-2xl font-bold text-cocoa hover:text-toffee transition-colors line-clamp-1"
            >
              {name}
            </Link>
            <span className="text-xs px-2 py-0.5 rounded-full bg-honey/30 text-toffee font-semibold">
              {gender}
            </span>
          </div>

          <p className="text-sm font-medium text-cocoa-soft mb-3">
            <span>{breed}</span>
            <span className="mx-1.5 opacity-40">•</span>
            <span>{age}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-cocoa/10 flex items-center gap-2">
          <Link
            to={`/puppies/${slug}`}
            className="flex-1 py-2 px-3 text-center text-xs font-bold rounded-full border-2 border-cocoa text-cocoa hover:bg-cocoa hover:text-milk transition-colors"
          >
            Meet {name}
          </Link>

          <a
            href={prefilledWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-whatsapp text-white hover:bg-[#20ba59] hover:scale-110 transition-all shadow-sm"
            title={`Ask about ${name} on WhatsApp`}
          >
            <MessageCircle className="w-4 h-4 fill-white" />
          </a>
        </div>
      </div>
    </div>
  );
}
