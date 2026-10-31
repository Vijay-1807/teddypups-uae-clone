import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({ images = [], currentIndex = 0, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNavigate) onNavigate((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft' && onNavigate) onNavigate((currentIndex - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, images.length, onClose, onNavigate]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const imgSrc = typeof currentImage === 'string' ? currentImage : currentImage?.img || currentImage?.src;
  const caption = typeof currentImage === 'object' ? currentImage?.caption || currentImage?.alt : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className="absolute left-4 sm:left-8 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className="absolute right-4 sm:right-8 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Image & Caption */}
      <div className="relative z-10 max-w-4xl max-h-[85vh] flex flex-col items-center justify-center">
        <img
          src={imgSrc}
          alt={caption || 'TeddyPups photo'}
          className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/15"
        />

        {caption && (
          <p className="font-scrawl text-lg text-white mt-4 text-center">
            {caption}
          </p>
        )}

        <p className="text-white/60 text-xs mt-2 font-mono">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

