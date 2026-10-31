import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { siteMeta } from '../data/puppiesData';

export default function Footer() {
  return (
    <footer className="relative bg-[#24130b] text-[#fffdf8] pt-16 pb-24 md:pb-12 overflow-hidden">
      {/* Decorative wavy top divider */}
      <div className="absolute top-0 inset-x-0 h-4 bg-[#fffdf8] rounded-b-[2rem] opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#fffdf8]/15">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/brand/logo.png"
                  alt="TeddyPups U.A.E."
                  className="w-10 h-10 object-contain invert brightness-200"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <h3 className="font-serif text-3xl font-bold tracking-tight text-milk">
                  TeddyPups
                </h3>
              </div>

              <p className="font-serif text-xl italic text-honey mb-3">
                Home, at last.
              </p>

              <p className="text-milk/75 text-sm leading-relaxed max-w-sm mb-6">
                {siteMeta.description}
              </p>

              {/* Basket Dog SVG Illustration */}
              <div className="inline-flex items-center gap-2 bg-[#fffdf8]/10 px-4 py-2 rounded-2xl border border-[#fffdf8]/15">
                <svg viewBox="0 0 48 48" className="w-8 h-8 text-honey fill-current" aria-hidden="true">
                  <path d="M24 10c-5.5 0-10 4.5-10 10 0 3.2 1.5 6 3.8 7.8L12 38h24l-5.8-10.2C32.5 26 34 23.2 34 20c0-5.5-4.5-10-10-10zm-4 8a2 2 0 110-4 2 2 0 010 4zm8 0a2 2 0 110-4 2 2 0 010 4zm-4 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
                </svg>
                <span className="font-scrawl text-xs text-milk/90">
                  Teddy, sitting snug in his basket
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href={siteMeta.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-milk/30 text-milk hover:border-honey hover:text-honey hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              <a
                href={siteMeta.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 h-10 rounded-full border border-milk/30 text-milk text-xs font-semibold hover:border-honey hover:text-honey hover:scale-105 transition-all"
                aria-label="TikTok"
              >
                TikTok
              </a>

              <a
                href={siteMeta.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-milk/30 text-milk hover:border-honey hover:text-honey hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-lg font-semibold text-milk mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-milk/75">
              <li>
                <Link to="/puppies" className="hover:text-honey transition-colors">
                  Available puppies
                </Link>
              </li>
              <li>
                <Link to="/gone-home" className="hover:text-honey transition-colors">
                  Gone home
                </Link>
              </li>
              <li>
                <Link to="/happy-families" className="hover:text-honey transition-colors">
                  Happy families
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-honey transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/how-it-works#delivery" className="hover:text-honey transition-colors">
                  Delivery & collection
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-honey transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-honey transition-colors">
                  Visit & contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Say Hello */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-lg font-semibold text-milk mb-4">
              Say hello
            </h4>
            <ul className="space-y-3.5 text-sm text-milk/75">
              <li>
                <a
                  href={siteMeta.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-milk font-medium hover:text-honey transition-colors group"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366] group-hover:scale-110 transition-transform" />
                  <span>WhatsApp: {siteMeta.phone}</span>
                </a>
              </li>

              <li>
                <a
                  href={`mailto:${siteMeta.email}`}
                  className="flex items-center gap-2.5 hover:text-honey transition-colors"
                >
                  <Mail className="w-4 h-4 text-honey" />
                  <span>{siteMeta.email}</span>
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-honey shrink-0 mt-0.5" />
                <span>{siteMeta.address}</span>
              </li>
            </ul>

            <div className="mt-6 p-4 rounded-2xl bg-milk/5 border border-milk/10">
              <p className="font-scrawl text-honey text-xs mb-1">ready to bond?</p>
              <p className="text-xs text-milk/80 leading-relaxed">
                Visit our Downtown Dubai showroom or schedule a private consultation.
              </p>
              <Link
                to="/contact"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-honey hover:underline"
              >
                <span>Book showroom visit &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-milk/60">
          <p>© 2026 {siteMeta.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="font-scrawl text-honey text-sm">
              every puppy is family
            </span>
            <span>•</span>
            <span>Crafted with love in Dubai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
