import React from 'react';
import { Star, Heart, MessageCircle } from 'lucide-react';
import { polaroidMemories, happyFamiliesReviews, siteMeta } from '../data/puppiesData';
import PolaroidCard from '../components/PolaroidCard';

export default function HappyFamiliesPage({ onOpenLightbox }) {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-sm font-semibold tracking-wide">
            our wall of happy endings
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cocoa tracking-tight mt-1 mb-4">
            Happy families
          </h1>
          <p className="text-cocoa-soft text-base sm:text-lg leading-relaxed mb-6">
            Nothing makes us happier than seeing our puppies in loving homes! Here are some beautiful moments shared by our amazing clients after welcoming their furry friends.
          </p>

          <span className="inline-block px-4 py-1.5 rounded-full bg-honey/30 text-toffee font-scrawl text-sm font-bold border border-honey/60">
            64 moments and counting ✨
          </span>
        </div>

        {/* Featured Review Spotlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {happyFamiliesReviews.map((review, idx) => (
            <div
              key={idx}
              className="tp-sketch-card p-6 sm:p-8 bg-milk rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-honey mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-honey" />
                  ))}
                </div>
                <p className="font-serif text-base sm:text-lg italic text-cocoa leading-relaxed mb-6">
                  "{review.quote}"
                </p>
              </div>

              <div className="border-t border-cocoa/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-cocoa text-sm">
                    {review.author}
                  </h4>
                  <p className="text-xs text-cocoa-soft">{review.location}</p>
                </div>
                <span className="font-scrawl text-xs text-toffee font-bold">
                  {review.puppyBreed}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Scrapbook Polaroid Photo Wall */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-bold text-cocoa">
              Every one of them was a Teddy Pup once
            </h2>
            <p className="font-scrawl text-toffee text-sm mt-1">
              click any photo to view in full resolution
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {polaroidMemories.map((item, idx) => {
              // gentle rotation variations
              const rotations = [-1.5, 1.2, -0.8, 1.8, -1.2, 0.9, -1.8, 1.4];
              const rot = rotations[idx % rotations.length];
              return (
                <PolaroidCard
                  key={idx}
                  item={item}
                  rotate={rot}
                  onClick={() => {
                    if (onOpenLightbox) onOpenLightbox(polaroidMemories, idx);
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Share your story CTA */}
        <div className="text-center pt-16 border-t border-cocoa/15 max-w-xl mx-auto">
          <h3 className="font-serif text-2xl font-bold text-cocoa mb-2">
            Are you already part of the TeddyPups family?
          </h3>
          <p className="text-cocoa-soft text-sm mb-6">
            We love seeing photos and updates as your pup grows! Send us your photos on WhatsApp to be featured on our memory wall.
          </p>
          <a
            href={siteMeta.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm font-semibold inline-flex"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Send your photos on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}

