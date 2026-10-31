import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, Plane, Sparkles, Truck, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { howItWorksData, siteMeta } from '../data/puppiesData';

export default function HowItWorksPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-sm font-semibold tracking-wide">
            the TeddyPups promise
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cocoa tracking-tight mt-1 mb-4">
            How it works
          </h1>
          <p className="text-cocoa-soft text-base sm:text-lg leading-relaxed">
            {howItWorksData.intro}
          </p>

          {/* Quick Anchor Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 text-xs sm:text-sm font-semibold">
            <a href="#two-ways" className="px-4 py-1.5 rounded-full bg-milk border border-cocoa/20 text-cocoa hover:border-cocoa">
              1. Two ways home
            </a>
            <a href="#promise" className="px-4 py-1.5 rounded-full bg-milk border border-cocoa/20 text-cocoa hover:border-cocoa">
              2. Premium puppy promise
            </a>
            <a href="#delivery" className="px-4 py-1.5 rounded-full bg-milk border border-cocoa/20 text-cocoa hover:border-cocoa">
              3. Delivery & collection
            </a>
            <a href="#why-us" className="px-4 py-1.5 rounded-full bg-milk border border-cocoa/20 text-cocoa hover:border-cocoa">
              4. Why choose us
            </a>
          </div>
        </div>

        {/* Section 1: Two Ways Home */}
        <section id="two-ways" className="mb-24 pt-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-scrawl text-toffee text-sm font-semibold">choose your way</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-1">
              Two ways home
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {howItWorksData.ways.map((way, idx) => (
              <div
                key={idx}
                className="tp-sketch-card p-8 sm:p-10 bg-milk rounded-3xl border-2 border-cocoa flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-honey/30 text-toffee mb-4">
                    {way.badge}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cocoa mb-4">
                    {way.title}
                  </h3>
                  <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed mb-8">
                    {way.description}
                  </p>

                  <div className="space-y-6 mb-8">
                    {way.steps.map((s, stepIdx) => (
                      <div key={stepIdx} className="flex gap-4">
                        <span className="w-8 h-8 rounded-full bg-cocoa text-milk font-serif font-bold text-sm flex items-center justify-center shrink-0">
                          {stepIdx + 1}
                        </span>
                        <div>
                          <h4 className="font-serif font-bold text-cocoa text-base mb-1">
                            {s.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-cocoa-soft leading-relaxed">
                            {s.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={idx === 0 ? '/puppies?origin=local' : '/puppies?origin=imported'}
                  className="btn-outline-cocoa text-sm font-semibold py-3 px-6 text-center justify-center"
                >
                  {idx === 0 ? 'Browse showroom puppies' : 'Explore import lines'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Premium Puppy Promise */}
        <section id="promise" className="mb-24 pt-16 border-t border-cocoa/15">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-scrawl text-toffee text-sm font-semibold">uncompromising standards</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-1">
              Our premium puppy promise
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorksData.promises.map((p, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-[#fbf5ec] border border-cocoa/10 flex flex-col justify-between">
                <div>
                  <ShieldCheck className="w-8 h-8 text-toffee mb-4" />
                  <h3 className="font-serif text-lg font-bold text-cocoa mb-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-cocoa-soft leading-relaxed">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Delivery & Collection */}
        <section id="delivery" className="mb-24 pt-16 border-t border-cocoa/15">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-scrawl text-toffee text-sm font-semibold">safe travels</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cocoa mt-1">
              Delivery & collection
            </h2>
            <p className="text-cocoa-soft text-sm mt-2">
              We make welcoming your puppy into your home stress-free and smooth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-milk border-2 border-cocoa/20">
              <HeartHandshake className="w-8 h-8 text-toffee mb-4" />
              <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
                Downtown Showroom Pickup
              </h3>
              <p className="text-sm text-cocoa-soft leading-relaxed">
                Schedule a private handover in our Downtown Dubai showroom. We walk you through feeding instructions, grooming essentials, and paperwork.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-milk border-2 border-cocoa/20">
              <Truck className="w-8 h-8 text-toffee mb-4" />
              <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
                White-Glove Dubai Delivery
              </h3>
              <p className="text-sm text-cocoa-soft leading-relaxed">
                Enjoy safe, climate-controlled doorstep delivery anywhere across Dubai and the UAE with an experienced pet attendant.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-milk border-2 border-cocoa/20">
              <Plane className="w-8 h-8 text-toffee mb-4" />
              <h3 className="font-serif text-xl font-bold text-cocoa mb-2">
                Worldwide Cargo Transport
              </h3>
              <p className="text-sm text-cocoa-soft leading-relaxed">
                We coordinate certified IATA pet cargo transport with international flight clearances to deliver safely to loving homes worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Why Choose Us */}
        <section id="why-us" className="pt-16 border-t border-cocoa/15">
          <div className="bg-[#2a170e] text-[#fffdf8] rounded-3xl p-8 sm:p-14 relative overflow-hidden">
            <div className="max-w-2xl relative z-10">
              <span className="font-scrawl text-honey text-sm font-semibold">the TeddyPups difference</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mt-2 mb-4">
                Why families trust TeddyPups
              </h2>
              <p className="text-milk/75 text-sm sm:text-base leading-relaxed mb-8">
                Adopting a puppy is a lifelong emotional journey. We believe in 100% transparency, ethical breeding partnerships, and ongoing support for you and your furry family member.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/puppies"
                  className="btn-cocoa !bg-honey !text-cocoa font-bold text-sm px-6 py-3.5 justify-center"
                >
                  View available puppies
                </Link>

                <a
                  href={siteMeta.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-sm font-semibold px-6 py-3.5 justify-center"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Ask us any questions</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
