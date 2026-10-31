import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, ShieldCheck, HeartHandshake, Plane, Sparkles, Star, CheckCircle2 } from 'lucide-react';
import { availablePuppies, polaroidMemories, faqList, siteMeta, happyFamiliesReviews } from '../data/puppiesData';
import PuppyCard from '../components/PuppyCard';
import PolaroidCard from '../components/PolaroidCard';
import FAQItem from '../components/FAQItem';

export default function HomePage({ onPlayVideo, onOpenLightbox }) {
  const [selectedBreed, setSelectedBreed] = useState('all');

  const breeds = ['all', 'Maltipoo', 'Pomeranian', 'Poodle', 'Cavapoo', 'Shih Tzu'];

  const filteredPuppies =
    selectedBreed === 'all'
      ? availablePuppies.slice(0, 8)
      : availablePuppies.filter((p) => p.breed.toLowerCase().includes(selectedBreed.toLowerCase())).slice(0, 8);

  const featuredHeroPups = availablePuppies.slice(0, 4);

  return (
    <div className="pt-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-cocoa/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Announcement Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-honey/25 border border-honey/50 text-toffee text-sm font-semibold mb-6 shadow-xs">
                <Sparkles className="w-4 h-4 text-toffee" />
                <span className="font-scrawl text-sm">every puppy is family</span>
              </div>

              {/* H1 Heading */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold text-cocoa tracking-tight leading-[1.08] mb-6">
                Premium teacup <br className="hidden sm:inline" />
                <span className="italic font-normal text-toffee">puppies</span> in Dubai
              </h1>

              {/* Subheading */}
              <p className="text-cocoa-soft text-lg sm:text-xl leading-relaxed max-w-xl mb-8">
                Meet your new best friend in our Downtown Dubai showroom, or order a rare miniature breed from trusted, certified breeders worldwide.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <Link
                  to="/puppies"
                  className="btn-cocoa text-base font-semibold px-8 py-4 justify-center hover:scale-102 transition-all shadow-md group"
                >
                  <span>View available puppies</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href={siteMeta.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-base font-semibold px-8 py-4 justify-center hover:scale-102 transition-all shadow-md"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 pt-6 border-t border-cocoa/10 flex flex-wrap items-center gap-6 text-xs text-cocoa-soft font-semibold">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Veterinary Health Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Microchipped & Vaccinated</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-emerald-600" />
                  <span>Downtown Dubai Showroom</span>
                </div>
              </div>
            </div>

            {/* Right Hero Showcase Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md">
                {/* Floating decorative elements */}
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-honey/30 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blush/40 rounded-full blur-2xl pointer-events-none"></div>

                {/* Primary Featured Card */}
                <div className="tp-sketch-card overflow-hidden bg-milk border-2 border-cocoa shadow-2xl relative z-10">
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#f3ebd9]">
                    <img
                      src={featuredHeroPups[0].image}
                      alt={featuredHeroPups[0].name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-milk text-cocoa border border-cocoa/20 shadow-sm flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Available
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-serif text-3xl font-bold text-cocoa">
                        {featuredHeroPups[0].name}
                      </h3>
                      <span className="font-scrawl text-sm text-toffee font-semibold">
                        {featuredHeroPups[0].gender}
                      </span>
                    </div>

                    <p className="text-sm text-cocoa-soft font-medium mb-4">
                      {featuredHeroPups[0].breed} • {featuredHeroPups[0].age} • {featuredHeroPups[0].origin}
                    </p>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/puppies/${featuredHeroPups[0].slug}`}
                        className="btn-cocoa flex-1 text-sm font-semibold !py-2.5 justify-center"
                      >
                        Meet {featuredHeroPups[0].name}
                      </Link>
                      <a
                        href={siteMeta.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-whatsapp text-sm font-semibold !py-2.5 px-4"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Secondary Mini Floating Card */}
                <div className="hidden sm:block absolute -bottom-8 -left-8 bg-white border-2 border-cocoa rounded-2xl p-3 shadow-xl z-20 w-48 rotate-[-3deg] hover:rotate-0 transition-transform">
                  <div className="flex items-center gap-3">
                    <img
                      src={featuredHeroPups[1].image}
                      alt={featuredHeroPups[1].name}
                      className="w-12 h-12 rounded-xl object-cover border border-cocoa/20"
                    />
                    <div>
                      <p className="font-serif text-sm font-bold text-cocoa truncate">
                        {featuredHeroPups[1].name}
                      </p>
                      <p className="text-[0.7rem] text-toffee font-semibold">
                        {featuredHeroPups[1].breed}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Meet the Pups (Available Puppies Grid) */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="font-scrawl text-sm text-toffee font-bold mb-1">
              from Teddy's sketchbook
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa tracking-tight">
              Meet the pups
            </h2>
          </div>

          {/* Breed Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {breeds.map((breed) => (
              <button
                key={breed}
                type="button"
                onClick={() => setSelectedBreed(breed)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedBreed === breed
                    ? 'bg-cocoa text-milk shadow-sm'
                    : 'bg-milk border border-cocoa/20 text-cocoa hover:border-cocoa'
                }`}
              >
                {breed === 'all' ? 'All Breeds' : breed}
              </button>
            ))}
          </div>
        </div>

        {/* Puppies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredPuppies.map((puppy) => (
            <PuppyCard key={puppy.slug} puppy={puppy} onPlayVideo={onPlayVideo} />
          ))}
        </div>

        {/* See All Puppies CTA */}
        <div className="text-center mt-12">
          <Link
            to="/puppies"
            className="btn-outline-cocoa text-base font-semibold px-8 py-3.5 inline-flex items-center gap-2"
          >
            <span>See all available puppies ({availablePuppies.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 3. Two Ways to Meet Your Puppy */}
      <section className="py-16 lg:py-24 bg-[#fbf5ec] border-y border-cocoa/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-scrawl text-toffee text-sm font-semibold">choose your way</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa tracking-tight mt-1 mb-4">
              Two ways to meet your puppy
            </h2>
            <p className="text-cocoa-soft text-base leading-relaxed">
              Whether you prefer visiting our local Downtown Dubai showroom or commissioning an ethical import from the world's most distinguished breeders, TeddyPups makes the journey seamless.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Way 1: In Dubai */}
            <div className="tp-sketch-card p-8 sm:p-10 bg-milk rounded-3xl flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-honey/30 text-toffee mb-4">
                  Option 1 • Local Showroom
                </span>
                <h3 className="font-serif text-3xl font-bold text-cocoa mb-4">
                  Puppies in Dubai
                </h3>
                <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed mb-6">
                  Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face. Sourced with utmost care from verified breeders, they are ready for same-day adoption.
                </p>

                <ul className="space-y-3 mb-8 text-sm text-cocoa-soft font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Meet, cuddle, and bond in our private Dubai lounge</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Same-day collection or white-glove home delivery</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full UAE health passport and vaccination verified</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/puppies?origin=local"
                className="btn-cocoa text-sm font-semibold py-3 px-6 text-center justify-center"
              >
                Browse Dubai showroom pups
              </Link>
            </div>

            {/* Way 2: Imported for You */}
            <div className="tp-sketch-card p-8 sm:p-10 bg-milk rounded-3xl flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blush/50 text-toffee mb-4">
                  Option 2 • VIP White-Glove Import
                </span>
                <h3 className="font-serif text-3xl font-bold text-cocoa mb-4">
                  Imported for you
                </h3>
                <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed mb-6">
                  Seeking rare Korean micro teacup lines or European champion bloodlines? We handle the entire ethical import process — video calls, paperwork, pet flight logistics, and veterinary clearances.
                </p>

                <ul className="space-y-3 mb-8 text-sm text-cocoa-soft font-medium">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Access to world-renowned Korean & European teacup lines</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live 4K video sessions & daily health reports before travel</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Stress-free pressurized cabin flight with attendant</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/puppies?origin=imported"
                className="btn-outline-cocoa text-sm font-semibold py-3 px-6 text-center justify-center"
              >
                Explore imported teacup breeds
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Your Puppy Journey (3 Steps) */}
      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-sm font-semibold">simple & joyful</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa tracking-tight mt-1 mb-4">
            Your puppy journey
          </h2>
          <p className="text-cocoa-soft text-base leading-relaxed">
            From your first glance to the moment your puppy steps into their new home, we guide you through every joyful milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative p-8 rounded-3xl bg-[#fdfaf3] border-2 border-cocoa/20 hover:border-cocoa transition-colors">
            <span className="w-12 h-12 rounded-2xl bg-honey/40 text-cocoa font-serif text-2xl font-bold flex items-center justify-center mb-6">
              1
            </span>
            <h3 className="font-serif text-2xl font-bold text-cocoa mb-3">
              Choose your breed
            </h3>
            <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed">
              Explore our real photos and video profiles. Tell us what you envision in size, temperament, and coat style.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative p-8 rounded-3xl bg-[#fdfaf3] border-2 border-cocoa/20 hover:border-cocoa transition-colors">
            <span className="w-12 h-12 rounded-2xl bg-honey/40 text-cocoa font-serif text-2xl font-bold flex items-center justify-center mb-6">
              2
            </span>
            <h3 className="font-serif text-2xl font-bold text-cocoa mb-3">
              Get photos & details
            </h3>
            <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed">
              We connect on WhatsApp with HD videos, health records, weight projections, and answers to all your questions.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative p-8 rounded-3xl bg-[#fdfaf3] border-2 border-cocoa/20 hover:border-cocoa transition-colors">
            <span className="w-12 h-12 rounded-2xl bg-honey/40 text-cocoa font-serif text-2xl font-bold flex items-center justify-center mb-6">
              3
            </span>
            <h3 className="font-serif text-2xl font-bold text-cocoa mb-3">
              Secure & safe delivery
            </h3>
            <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed">
              Meet your pup in our Downtown Dubai showroom, or receive them right at your doorstep with our starter care bundle.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Happy Families & Puppies (Polaroid Showcase) */}
      <section className="py-16 lg:py-24 bg-[#fbf5ec] border-t border-cocoa/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="font-scrawl text-sm text-toffee font-bold mb-1">
                our wall of happy endings
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa tracking-tight">
                Happy families & puppies
              </h2>
            </div>

            <Link
              to="/happy-families"
              className="text-sm font-bold text-toffee hover:text-cocoa inline-flex items-center gap-1 group"
            >
              <span>See every happy family</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Featured Testimonial Quote */}
          <div className="tp-polaroid max-w-3xl mx-auto mb-12 p-8 sm:p-10 bg-white rotate-[-0.5deg]">
            <div className="flex items-center gap-1 text-honey mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-honey" />
              ))}
            </div>
            <p className="font-serif text-lg sm:text-2xl italic text-cocoa leading-relaxed mb-6">
              "{happyFamiliesReviews[0].quote}"
            </p>
            <div className="flex items-center justify-between border-t border-cocoa/10 pt-4">
              <div>
                <p className="font-serif font-bold text-cocoa">
                  {happyFamiliesReviews[0].author}
                </p>
                <p className="text-xs text-cocoa-soft">
                  {happyFamiliesReviews[0].location}
                </p>
              </div>
              <span className="font-scrawl text-sm text-toffee font-semibold">
                {happyFamiliesReviews[0].puppyBreed}
              </span>
            </div>
          </div>

          {/* Polaroid Photos Grid Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {polaroidMemories.slice(0, 6).map((item, idx) => (
              <PolaroidCard
                key={idx}
                item={item}
                rotate={idx % 2 === 0 ? -1.5 : 1.5}
                onClick={() => {
                  if (onOpenLightbox) onOpenLightbox(polaroidMemories, idx);
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Questions, Answered (FAQ Preview) */}
      <section className="py-16 lg:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="font-scrawl text-toffee text-sm font-semibold">got questions?</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-cocoa tracking-tight mt-1 mb-4">
            Questions, answered
          </h2>
          <p className="text-cocoa-soft text-base">
            Everything you need to know about our health checks, adoption process, and delivery.
          </p>
        </div>

        <div className="divide-y divide-cocoa/15">
          {faqList.slice(0, 5).map((faq, idx) => (
            <FAQItem key={idx} faq={faq} defaultOpen={idx === 0} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/faq"
            className="btn-outline-cocoa text-sm font-semibold px-6 py-3 inline-flex items-center gap-2"
          >
            <span>Read all 9 questions & answers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 7. Bottom CTA Banner */}
      <section className="py-16 bg-[#2a170e] text-[#fffdf8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="font-scrawl text-honey text-base font-semibold">
            every puppy is family
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mt-2 mb-6 max-w-2xl mx-auto">
            Ready to meet your new best friend?
          </h2>
          <p className="text-milk/75 text-base sm:text-lg max-w-xl mx-auto mb-8">
            Speak with our puppy adoption specialists today on WhatsApp or visit our Downtown Dubai showroom.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={siteMeta.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-base font-semibold px-8 py-4 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Say hello on WhatsApp</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-milk text-milk px-8 py-4 text-base font-semibold hover:bg-milk hover:text-cocoa transition-colors w-full sm:w-auto"
            >
              <span>Visit & contact us</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
