import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Heart, ArrowRight } from 'lucide-react';
import { goneHomePuppies, siteMeta } from '../data/puppiesData';
import TicketCard from '../components/TicketCard';

export default function GoneHomePage() {
  const [selectedBreed, setSelectedBreed] = useState('all');

  const breeds = ['all', 'Maltipoo', 'Pomeranian', 'Poodle', 'Pomsky', 'Maltese', 'Bichon'];

  const filteredTickets =
    selectedBreed === 'all'
      ? goneHomePuppies
      : goneHomePuppies.filter((p) => p.breed.toLowerCase().includes(selectedBreed.toLowerCase()));

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-scrawl text-toffee text-sm font-semibold tracking-wide">
            tickets home
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cocoa tracking-tight mt-1 mb-4">
            Gone home
          </h1>
          <p className="text-cocoa-soft text-base sm:text-lg leading-relaxed mb-8">
            Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link to="/puppies" className="btn-cocoa text-sm font-semibold px-6 py-3">
              <span>See available puppies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={siteMeta.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-sm font-semibold px-6 py-3"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask us on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {breeds.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setSelectedBreed(b)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                selectedBreed === b
                  ? 'bg-cocoa text-milk shadow-sm'
                  : 'bg-milk text-cocoa border border-cocoa/20 hover:border-cocoa'
              }`}
            >
              {b === 'all' ? 'All Alumni' : b}
            </button>
          ))}
        </div>

        {/* Ticket Counter */}
        <div className="text-center mb-8">
          <p className="text-xs text-cocoa-soft font-mono uppercase tracking-wider">
            Displaying {filteredTickets.length} / {goneHomePuppies.length} tickets home
          </p>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredTickets.map((puppy) => (
            <TicketCard key={puppy.slug} puppy={puppy} />
          ))}
        </div>
      </div>
    </div>
  );
}
