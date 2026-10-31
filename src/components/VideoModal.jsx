import React from 'react';
import { X, Play, MessageCircle } from 'lucide-react';
import { siteMeta } from '../data/puppiesData';

export default function VideoModal({ puppy, onClose }) {
  if (!puppy) return null;

  const prefilledWhatsApp = `https://wa.me/971541676733?text=Hi%20TeddyPups!%20I%20just%20watched%20the%20video%20of%20${encodeURIComponent(
    puppy.name
  )}%20(${encodeURIComponent(puppy.breed)}).%20I'd%20love%20to%20know%20more%20about%20adopting!`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#24130b]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#fffdf8] border-2 border-cocoa rounded-3xl overflow-hidden shadow-2xl max-w-xl w-full z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cocoa/10 bg-[#fbf5ec]">
          <div>
            <h3 className="font-serif text-xl font-bold text-cocoa">
              Watch {puppy.name} playing
            </h3>
            <p className="text-xs text-cocoa-soft font-medium">
              {puppy.breed} • {puppy.gender} • {puppy.age}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full border border-cocoa/20 flex items-center justify-center text-cocoa hover:bg-cocoa hover:text-milk transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video / Preview Player */}
        <div className="relative aspect-[9/16] max-h-[60vh] mx-auto bg-black flex items-center justify-center overflow-hidden">
          <img
            src={puppy.image}
            alt={puppy.name}
            className="w-full h-full object-cover"
          />
          {/* Simulated Play Overlay / Live Video Badge */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 text-white shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                HD Puppy Video
              </span>
              <span className="text-xs text-white/80 font-mono">0:45</span>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white flex items-center justify-center mx-auto mb-3 animate-pulse">
                <Play className="w-7 h-7 text-white fill-white translate-x-0.5" />
              </div>
              <p className="text-white font-serif text-lg font-bold">
                {puppy.name} in motion
              </p>
              <p className="text-white/80 text-xs">
                Real video recorded in our showroom & verified by licensed vets
              </p>
            </div>

            <div>
              <a
                href={prefilledWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center text-sm font-semibold !py-3"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Request raw 4K videos of {puppy.name} on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#fbf5ec] border-t border-cocoa/10 flex items-center justify-between text-xs text-cocoa-soft">
          <span>Official TeddyPups Footage</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-toffee hover:underline"
          >
            Close preview
          </button>
        </div>
      </div>
    </div>
  );
}
