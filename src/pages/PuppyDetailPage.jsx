import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Play, MessageCircle, ChevronLeft, ChevronRight, ShieldCheck, Heart, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { availablePuppies, siteMeta } from '../data/puppiesData';
import MadLibsLetter from '../components/MadLibsLetter';

export default function PuppyDetailPage({ onPlayVideo, onOpenLightbox }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const puppyIndex = availablePuppies.findIndex((p) => p.slug === slug);
  const puppy = availablePuppies[puppyIndex] || availablePuppies[0];

  const prevPuppy = puppyIndex > 0 ? availablePuppies[puppyIndex - 1] : availablePuppies[availablePuppies.length - 1];
  const nextPuppy = puppyIndex < availablePuppies.length - 1 ? availablePuppies[puppyIndex + 1] : availablePuppies[0];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const prefilledWhatsApp = `https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'm%20interested%20in%20${encodeURIComponent(
    puppy.name
  )}%20(${encodeURIComponent(puppy.breed)},%20${encodeURIComponent(puppy.gender)}).%20Could%20you%20please%20share%20more%20details%20and%20videos?`;

  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry-form');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-cocoa-soft mb-8">
          <Link to="/puppies" className="hover:text-cocoa flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-4 h-4" />
            <span>Available puppies</span>
          </Link>
          <span className="opacity-40">/</span>
          <span className="font-bold text-cocoa">{puppy.name}</span>
        </nav>

        {/* Main Grid: Gallery on Left, Profile Tag Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Photo & Video Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#f4ebe1] border-2 border-cocoa shadow-lg">
              <img
                src={puppy.images[activePhotoIdx] || puppy.image}
                alt={`${puppy.name}, ${puppy.breed}`}
                className="w-full h-full object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
                onClick={() => {
                  if (onOpenLightbox) onOpenLightbox(puppy.images, activePhotoIdx);
                }}
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-milk text-cocoa border border-cocoa/20 shadow-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {puppy.status}
                </span>
              </div>

              {/* Video Play Button on main photo if puppy has video */}
              {puppy.hasVideo && (
                <button
                  type="button"
                  onClick={() => onPlayVideo(puppy)}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-cocoa text-milk hover:bg-toffee transition-colors shadow-lg group"
                >
                  <Play className="w-3.5 h-3.5 fill-honey text-honey group-hover:fill-milk group-hover:text-milk" />
                  <span>Watch video</span>
                </button>
              )}

              {/* Counter Pill */}
              <div className="absolute bottom-4 left-4 bg-cocoa/75 backdrop-blur-xs text-milk text-xs px-3 py-1 rounded-full font-mono">
                {activePhotoIdx + 1} / {puppy.images.length}
              </div>
            </div>

            {/* Thumbnails Row */}
            {puppy.images.length > 1 && (
              <div className="flex items-center gap-3">
                {puppy.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActivePhotoIdx(i)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${
                      activePhotoIdx === i
                        ? 'border-cocoa scale-105 shadow-md'
                        : 'border-cocoa/20 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Puppy Profile Tag Card */}
          <div className="lg:col-span-5 relative">
            <div className="tp-sketch-card p-6 sm:p-8 bg-milk rounded-3xl border-2 border-cocoa shadow-xl">
              {/* Teddy mascot peek illustration */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-scrawl text-toffee text-sm font-semibold">
                  hello, it's me
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-honey/30 text-cocoa font-bold">
                  {puppy.origin}
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-cocoa mb-1">
                {puppy.name}
              </h1>

              <p className="text-lg font-medium text-toffee mb-6">
                {puppy.breed} • {puppy.gender} • {puppy.age}
              </p>

              {/* Specifications List */}
              <div className="bg-[#fbf5ec] rounded-2xl p-4 sm:p-5 border border-cocoa/10 space-y-2.5 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-cocoa-soft">Breed</span>
                  <strong className="text-cocoa">{puppy.breed}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-cocoa-soft">Boy or girl</span>
                  <strong className="text-cocoa">{puppy.gender}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-cocoa-soft">Age</span>
                  <strong className="text-cocoa">{puppy.age}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-cocoa-soft">Where</span>
                  <strong className="text-cocoa">{puppy.origin}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-cocoa-soft">Vaccinations</span>
                  <strong className="text-emerald-700">Verified & Current</strong>
                </div>
              </div>

              {/* Temperament Tags */}
              {puppy.temperament && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {puppy.temperament.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-milk border border-cocoa/20 text-cocoa"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed mb-8">
                {puppy.description}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <a
                  href={prefilledWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center text-base py-3.5 font-semibold shadow-md"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Ask about {puppy.name} on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={scrollToEnquiry}
                  className="btn-outline-cocoa w-full justify-center text-sm font-semibold py-3"
                >
                  Send an enquiry letter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Every Teddy Pup Comes With */}
        <div className="mt-20 pt-16 border-t border-cocoa/15">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="font-scrawl text-toffee text-sm font-semibold">guaranteed care</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-1 mb-3">
              Every Teddy Pup comes with
            </h2>
            <p className="text-cocoa-soft text-sm sm:text-base">
              We hold the highest standards of veterinary care and pedigree transparency in the UAE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#fbf5ec] border border-cocoa/10">
              <ShieldCheck className="w-8 h-8 text-toffee mb-3" />
              <h3 className="font-serif text-lg font-bold text-cocoa mb-1">
                Health Certificate
              </h3>
              <p className="text-xs text-cocoa-soft leading-relaxed">
                Official veterinary health clearance verifying healthy heart, lungs, eyes, joints, and genetics.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#fbf5ec] border border-cocoa/10">
              <CheckCircle2 className="w-8 h-8 text-toffee mb-3" />
              <h3 className="font-serif text-lg font-bold text-cocoa mb-1">
                Vaccinated & Dewormed
              </h3>
              <p className="text-xs text-cocoa-soft leading-relaxed">
                Age-appropriate immunization course administered by licensed practitioners with verifiable stamp.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#fbf5ec] border border-cocoa/10">
              <Sparkles className="w-8 h-8 text-toffee mb-3" />
              <h3 className="font-serif text-lg font-bold text-cocoa mb-1">
                Microchip ID
              </h3>
              <p className="text-xs text-cocoa-soft leading-relaxed">
                ISO 11784/11785 standard microchip implant registered for permanent lifetime safety and identification.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#fbf5ec] border border-cocoa/10">
              <Heart className="w-8 h-8 text-toffee mb-3" />
              <h3 className="font-serif text-lg font-bold text-cocoa mb-1">
                24/7 Puppy Support
              </h3>
              <p className="text-xs text-cocoa-soft leading-relaxed">
                Direct WhatsApp access to our care specialists for feeding advice, crate training, and settling in.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Coming Home Journey Steps */}
        <div className="mt-20 pt-16 border-t border-cocoa/15">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="font-scrawl text-toffee text-sm font-semibold">the way home</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-1 mb-3">
              {puppy.originCategory === 'imported' ? 'Coming home from abroad' : 'Coming home from Downtown Dubai'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#fffdf8] border-2 border-cocoa/20">
              <span className="font-serif text-2xl font-bold text-toffee block mb-2">1</span>
              <h4 className="font-serif text-base font-bold text-cocoa mb-1">Reserve your puppy</h4>
              <p className="text-xs text-cocoa-soft leading-relaxed">
                Confirm your reservation with our Dubai team to begin the personalized handover.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fffdf8] border-2 border-cocoa/20">
              <span className="font-serif text-2xl font-bold text-toffee block mb-2">2</span>
              <h4 className="font-serif text-base font-bold text-cocoa mb-1">Personalized consultation</h4>
              <p className="text-xs text-cocoa-soft leading-relaxed">
                Receive updated high-resolution video clips, feeding schedules, and vet paperwork.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fffdf8] border-2 border-cocoa/20">
              <span className="font-serif text-2xl font-bold text-toffee block mb-2">3</span>
              <h4 className="font-serif text-base font-bold text-cocoa mb-1">Health check & travel</h4>
              <p className="text-xs text-cocoa-soft leading-relaxed">
                Comprehensive health check and climate-controlled flight or Dubai transport.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fffdf8] border-2 border-cocoa/20">
              <span className="font-serif text-2xl font-bold text-toffee block mb-2">4</span>
              <h4 className="font-serif text-base font-bold text-cocoa mb-1">Welcome home</h4>
              <p className="text-xs text-cocoa-soft leading-relaxed">
                Collect your puppy from our lounge or enjoy safe, white-glove doorstep delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Enquiry Letter Form */}
        <div id="enquiry-form" className="mt-20 pt-16 border-t border-cocoa/15">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa">
              Ask about {puppy.name}
            </h2>
            <p className="text-cocoa-soft text-sm mt-2">
              Fill in your details below and our Dubai team will respond within a few hours.
            </p>
          </div>

          <MadLibsLetter selectedPuppySlug={puppy.slug} />
        </div>

        {/* Section 5: Previous / Next Puppy Navigation */}
        <div className="mt-20 pt-8 border-t border-cocoa/15 flex items-center justify-between">
          <Link
            to={`/puppies/${prevPuppy.slug}`}
            className="flex items-center gap-3 p-3 rounded-2xl border border-cocoa/15 hover:border-cocoa hover:bg-[#fbf5ec] transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-toffee group-hover:-translate-x-1 transition-transform" />
            <div className="text-left hidden sm:block">
              <span className="text-[0.7rem] uppercase tracking-wider text-cocoa-soft font-bold block">
                Previous pup
              </span>
              <span className="font-serif text-sm font-bold text-cocoa">
                {prevPuppy.name} ({prevPuppy.breed})
              </span>
            </div>
          </Link>

          <Link
            to="/puppies"
            className="btn-outline-cocoa text-xs py-2 px-4"
          >
            All puppies
          </Link>

          <Link
            to={`/puppies/${nextPuppy.slug}`}
            className="flex items-center gap-3 p-3 rounded-2xl border border-cocoa/15 hover:border-cocoa hover:bg-[#fbf5ec] transition-all group"
          >
            <div className="text-right hidden sm:block">
              <span className="text-[0.7rem] uppercase tracking-wider text-cocoa-soft font-bold block">
                Next pup
              </span>
              <span className="font-serif text-sm font-bold text-cocoa">
                {nextPuppy.name} ({nextPuppy.breed})
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-toffee group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

