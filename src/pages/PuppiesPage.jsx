import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Play, Search, Filter, Sparkles, ArrowRight } from 'lucide-react';
import { availablePuppies, goneHomePuppies } from '../data/puppiesData';
import PuppyCard from '../components/PuppyCard';
import TicketCard from '../components/TicketCard';

export default function PuppiesPage({ onPlayVideo }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const breedParam = searchParams.get('breed') || 'all';
  const originParam = searchParams.get('origin') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [onlyVideo, setOnlyVideo] = useState(false);

  const breeds = ['all', 'maltipoo', 'pomeranian', 'poodle', 'cavapoo', 'shih-tzu'];
  const origins = [
    { id: 'all', label: 'All locations' },
    { id: 'local', label: 'In Dubai showroom' },
    { id: 'imported', label: 'Imported for you' }
  ];

  const handleBreedChange = (b) => {
    const newParams = new URLSearchParams(searchParams);
    if (b === 'all') {
      newParams.delete('breed');
    } else {
      newParams.set('breed', b);
    }
    setSearchParams(newParams);
  };

  const handleOriginChange = (o) => {
    const newParams = new URLSearchParams(searchParams);
    if (o === 'all') {
      newParams.delete('origin');
    } else {
      newParams.set('origin', o);
    }
    setSearchParams(newParams);
  };

  // Filter puppies
  const filteredPuppies = useMemo(() => {
    return availablePuppies.filter((puppy) => {
      // Breed check
      if (breedParam !== 'all') {
        const matchesBreed = puppy.breed.toLowerCase().replace('-', '').includes(breedParam.replace('-', ''));
        if (!matchesBreed) return false;
      }

      // Origin check
      if (originParam !== 'all') {
        if (puppy.originCategory !== originParam) return false;
      }

      // Video check
      if (onlyVideo && !puppy.hasVideo) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = puppy.name.toLowerCase().includes(q);
        const matchesBreed = puppy.breed.toLowerCase().includes(q);
        const matchesDesc = puppy.description.toLowerCase().includes(q);
        if (!matchesName && !matchesBreed && !matchesDesc) return false;
      }

      return true;
    });
  }, [breedParam, originParam, onlyVideo, searchQuery]);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-scrawl text-toffee text-sm font-semibold tracking-wide">
            from Teddy's sketchbook
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cocoa tracking-tight mt-1 mb-4">
            Available puppies
          </h1>
          <p className="text-cocoa-soft text-base sm:text-lg leading-relaxed">
            Every listing shows real photos of the actual puppy. Open a profile to see them all, then ask us about them on WhatsApp.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#fbf5ec] border border-cocoa/15 rounded-3xl p-5 mb-10 shadow-xs">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa/50" />
              <input
                type="text"
                placeholder="Search puppy by name or breed…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-milk border border-cocoa/20 rounded-full pl-10 pr-4 py-2 text-sm text-cocoa placeholder:text-cocoa/40 focus:outline-none focus:border-toffee transition-colors"
              />
            </div>

            {/* Breed Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {breeds.map((b) => {
                const isActive = breedParam.toLowerCase() === b.toLowerCase();
                const displayLabel = b === 'all' ? 'All breeds' : b.replace('-', ' ');
                return (
                  <button
                    key={b}
                    type="button"
                    onClick={() => handleBreedChange(b)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-cocoa text-milk shadow-xs'
                        : 'bg-milk text-cocoa hover:border-cocoa border border-cocoa/15'
                    }`}
                  >
                    {displayLabel}
                  </button>
                );
              })}
            </div>

            {/* Origin & Video Toggle */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Origin Dropdown / Buttons */}
              <div className="flex items-center bg-milk border border-cocoa/15 rounded-full p-1 text-xs font-semibold">
                {origins.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => handleOriginChange(o.id)}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      originParam === o.id
                        ? 'bg-toffee text-milk'
                        : 'text-cocoa hover:text-toffee'
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>

              {/* Video Filter Toggle */}
              <button
                type="button"
                onClick={() => setOnlyVideo(!onlyVideo)}
                className={`inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  onlyVideo
                    ? 'bg-honey text-cocoa border-cocoa font-bold shadow-xs'
                    : 'bg-milk text-cocoa border-cocoa/20 hover:border-cocoa'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>With video</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8 text-sm text-cocoa-soft font-medium">
          <p>
            Showing <strong className="text-cocoa font-bold">{filteredPuppies.length}</strong> available puppies
          </p>
          {(breedParam !== 'all' || originParam !== 'all' || onlyVideo || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSearchParams(new URLSearchParams());
                setSearchQuery('');
                setOnlyVideo(false);
              }}
              className="text-toffee hover:underline text-xs font-bold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Puppy Grid */}
        {filteredPuppies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredPuppies.map((puppy) => (
              <PuppyCard key={puppy.slug} puppy={puppy} onPlayVideo={onPlayVideo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#fbf5ec] rounded-3xl border border-cocoa/10 p-8 max-w-xl mx-auto">
            <p className="font-serif text-2xl font-bold text-cocoa mb-2">
              No puppies match your current filter
            </p>
            <p className="text-cocoa-soft text-sm mb-6">
              Looking for a specific breed or Korean teacup puppy not listed? Let us know — we source customized pedigrees upon request!
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchParams(new URLSearchParams());
                setSearchQuery('');
                setOnlyVideo(false);
              }}
              className="btn-cocoa text-sm font-semibold"
            >
              Show all puppies
            </button>
          </div>
        )}

        {/* Bottom Banner: Already Gone Home */}
        <div className="mt-24 pt-16 border-t border-cocoa/15">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <p className="font-scrawl text-toffee text-sm font-bold mb-1">
                our happy alumni
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa">
                Already gone home
              </h2>
              <p className="text-cocoa-soft text-sm sm:text-base mt-2 max-w-xl">
                Every puppy here has already joined a loving family. Looking for one just like them? Tell us — we'll help you find your match.
              </p>
            </div>

            <Link
              to="/gone-home"
              className="btn-outline-cocoa text-sm font-semibold px-6 py-2.5 inline-flex items-center gap-2 shrink-0"
            >
              <span>View all {goneHomePuppies.length} tickets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {goneHomePuppies.slice(0, 4).map((p) => (
              <TicketCard key={p.slug} puppy={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
