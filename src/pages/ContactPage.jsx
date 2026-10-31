import React from 'react';
import { MessageCircle, Phone, Mail, MapPin, ExternalLink, Clock, ShieldCheck } from 'lucide-react';
import { siteMeta } from '../data/puppiesData';
import MadLibsLetter from '../components/MadLibsLetter';

export default function ContactPage() {
  const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query=Downtown+Dubai+United+Arab+Emirates';

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-scrawl text-toffee text-sm font-semibold tracking-wide">
            say hello
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cocoa tracking-tight mt-1 mb-4">
            Get in touch with us
          </h1>
          <p className="text-cocoa-soft text-base sm:text-lg leading-relaxed">
            Have questions about our puppies or adoption process? Fill out the letter below, and our team will get back to you promptly. Whether ready to adopt or just seeking info, we'd love to hear from you!
          </p>
        </div>

        {/* Two-column layout: Form on Left/Center, Showroom Info on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Mad-Libs Envelope Letter */}
          <div className="lg:col-span-8">
            <MadLibsLetter />
          </div>

          {/* Right Column: Showroom Card & Quick Contacts */}
          <div className="lg:col-span-4 space-y-6">
            {/* Showroom Visit Card */}
            <div className="tp-sketch-card p-6 sm:p-8 bg-[#fbf5ec] rounded-3xl border-2 border-cocoa">
              <span className="font-scrawl text-toffee text-xs font-bold uppercase tracking-wider block mb-2">
                Downtown Dubai showroom
              </span>
              <h3 className="font-serif text-2xl font-bold text-cocoa mb-3">
                Visit us in Downtown Dubai
              </h3>
              <p className="text-cocoa-soft text-sm leading-relaxed mb-6">
                Step into our Downtown Dubai showroom and experience the joy of choosing your puppy face-to-face in our private, sanitized lounge.
              </p>

              <div className="space-y-3 text-sm text-cocoa mb-6">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-toffee shrink-0 mt-0.5" />
                  <span>{siteMeta.address}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-cocoa-soft">
                  <Clock className="w-4 h-4 text-toffee shrink-0" />
                  <span>Daily visits by appointment: 10:00 AM – 9:00 PM</span>
                </div>
              </div>

              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-cocoa w-full justify-center text-xs font-bold py-2.5 inline-flex items-center gap-1.5"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Direct Contact Buttons */}
            <div className="bg-milk border-2 border-cocoa rounded-3xl p-6 space-y-3">
              <h4 className="font-serif font-bold text-cocoa text-base mb-2">
                Direct Contact
              </h4>

              <a
                href={siteMeta.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center text-xs font-semibold py-2.5"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp: {siteMeta.phone}</span>
              </a>

              <a
                href={`tel:${siteMeta.phone}`}
                className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-cocoa/30 px-4 py-2.5 text-xs font-bold text-cocoa hover:bg-cocoa hover:text-milk transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us: {siteMeta.phone}</span>
              </a>

              <a
                href={`mailto:${siteMeta.email}`}
                className="inline-flex items-center justify-center gap-2 w-full rounded-full border border-cocoa/30 px-4 py-2.5 text-xs font-bold text-cocoa hover:bg-cocoa hover:text-milk transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email: {siteMeta.email}</span>
              </a>
            </div>

            {/* Social Follow */}
            <div className="p-6 rounded-3xl bg-[#fdfaf3] border border-cocoa/15 text-center">
              <p className="font-scrawl text-xs text-toffee font-semibold mb-3">
                follow our puppy journeys
              </p>
              <div className="flex items-center justify-center gap-4 text-sm font-semibold">
                <a
                  href={siteMeta.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cocoa hover:text-toffee underline"
                >
                  Instagram
                </a>
                <span>•</span>
                <a
                  href={siteMeta.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cocoa hover:text-toffee underline"
                >
                  TikTok
                </a>
                <span>•</span>
                <a
                  href={siteMeta.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cocoa hover:text-toffee underline"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
