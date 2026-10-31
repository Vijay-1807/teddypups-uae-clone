import React from 'react';
import { Heart, CheckCircle2 } from 'lucide-react';

export default function TicketCard({ puppy }) {
  const { name, breed, gender, ticketText, image, slug } = puppy;

  return (
    <div className="tp-ticket p-4 flex flex-col justify-between h-full bg-[#fffdf8] hover:border-toffee transition-colors">
      {/* Top Header of Ticket */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-dashed border-cocoa/25 mb-3">
        <span className="font-scrawl text-xs font-bold text-toffee tracking-wider uppercase">
          one ticket home
        </span>
        <span className="flex items-center gap-1 text-[0.7rem] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <CheckCircle2 className="w-3 h-3" />
          Adopted
        </span>
      </div>

      {/* Middle Photo & Details */}
      <div className="flex gap-4 items-center mb-3">
        {/* Puppy Circle / Square Photo */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-cocoa bg-[#f2ebd9]">
          <img
            src={image}
            alt={`${name}, adopted ${breed}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.target.src = '/brand/logo.png';
              e.target.className = 'w-full h-full object-contain p-4 opacity-50';
            }}
          />
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-serif text-xl sm:text-2xl font-bold text-cocoa truncate">
            {name}
          </h4>
          <p className="text-sm font-medium text-cocoa-soft">
            {breed}, <span className="font-normal">{gender}</span>
          </p>
          <p className="font-scrawl text-xs text-toffee-deep mt-1">
            {ticketText || 'TeddyPups home'}
          </p>
        </div>
      </div>

      {/* Perforated Divider */}
      <div className="pt-2 border-t-2 border-dashed border-cocoa/25 flex items-center justify-between text-xs text-cocoa/60 font-mono">
        <span className="flex items-center gap-1 font-scrawl text-cocoa text-xs font-semibold">
          <span>home</span>
          <Heart className="w-3 h-3 fill-rose-500 text-rose-500 inline" />
        </span>
        <span className="uppercase tracking-widest text-[0.65rem] font-bold">
          admit one
        </span>
      </div>
    </div>
  );
}
