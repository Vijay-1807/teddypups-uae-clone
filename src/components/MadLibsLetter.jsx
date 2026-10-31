import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, Stamp } from 'lucide-react';
import { availablePuppies, siteMeta } from '../data/puppiesData';

export default function MadLibsLetter({ selectedPuppySlug = '', onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    area: '',
    puppyId: selectedPuppySlug || '',
    message: '',
    website: '', // honeypot
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.website) return; // bot detection
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please provide your name and phone number so we can reach out!');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSuccess) onSuccess(formData);
    }, 600);
  };

  const selectedPuppy = availablePuppies.find((p) => p.slug === formData.puppyId || p.id === formData.puppyId);
  const puppyName = selectedPuppy ? selectedPuppy.name : 'a puppy';

  const whatsappInquiryUrl = `https://wa.me/971541676733?text=Hi%20TeddyPups!%20My%20name%20is%20${encodeURIComponent(
    formData.name || 'there'
  )},%20and%20I'd%20love%20to%20enquire%20about%20${encodeURIComponent(
    puppyName
  )}.%20My%20contact%20number%20is%20${encodeURIComponent(formData.phone || '')}.`;

  if (submitted) {
    return (
      <div className="bg-[#fffdf8] border-2 border-cocoa rounded-3xl p-8 sm:p-10 shadow-lg text-center max-w-2xl mx-auto animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-3xl font-bold text-cocoa mb-2">
          Letter Posted with Love!
        </h3>
        <p className="font-scrawl text-lg text-toffee mb-4">
          Thank you, {formData.name}!
        </p>
        <p className="text-cocoa-soft text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
          Our team in Downtown Dubai has received your note regarding{' '}
          <strong className="text-cocoa">{puppyName}</strong>. We will get back to you promptly on WhatsApp or phone!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm font-semibold justify-center"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp now</span>
          </a>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="btn-outline-cocoa text-sm"
          >
            Send another note
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#fffdf8] border-2 border-cocoa rounded-3xl p-6 sm:p-10 shadow-xl max-w-3xl mx-auto">
      {/* Decorative Vintage Stamp in top right corner */}
      <div className="absolute top-6 right-6 w-16 h-20 tp-letter__stamp rounded-lg p-1.5 flex flex-col items-center justify-between text-cocoa/70 shadow-xs rotate-2 hidden sm:flex">
        <svg viewBox="0 0 64 64" className="w-7 h-7 fill-current text-toffee" aria-hidden="true">
          <path d="M32 30.5c-7.6 0-15.6 8.3-15.6 15.5 0 5.4 4.2 8.3 9.2 8.3 2.6 0 4.5-1.1 6.4-1.1s3.8 1.1 6.4 1.1c5 0 9.2-2.9 9.2-8.3 0-7.2-8-15.5-15.6-15.5z" />
        </svg>
        <span className="font-scrawl text-[0.65rem] font-bold uppercase tracking-wider text-cocoa">
          Dubai Air Mail
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 text-cocoa">
        {/* Hidden Honeypot */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          className="hidden"
          tabIndex="-1"
          autoComplete="off"
        />

        {/* Salutation */}
        <div className="font-serif text-2xl sm:text-3xl font-bold text-cocoa">
          Dear TeddyPups,
        </div>

        {/* Mad-Libs Paragraph */}
        <div className="font-sans text-base sm:text-xl leading-relaxed sm:leading-loose text-cocoa">
          <span>my name is </span>
          <input
            type="text"
            name="name"
            placeholder="your name"
            required
            value={formData.name}
            onChange={handleChange}
            className="inline-block border-b-2 border-cocoa bg-transparent px-2 py-0.5 text-cocoa font-bold placeholder:text-cocoa/30 focus:outline-none focus:border-toffee transition-colors w-40 sm:w-52"
          />
          <span>, and you can reach me on </span>
          <input
            type="tel"
            name="phone"
            placeholder="+971 50 123 4567"
            required
            value={formData.phone}
            onChange={handleChange}
            className="inline-block border-b-2 border-cocoa bg-transparent px-2 py-0.5 text-cocoa font-bold placeholder:text-cocoa/30 focus:outline-none focus:border-toffee transition-colors w-44 sm:w-56"
          />
          <span> or by email at </span>
          <input
            type="email"
            name="email"
            placeholder="optional"
            value={formData.email}
            onChange={handleChange}
            className="inline-block border-b-2 border-cocoa/60 bg-transparent px-2 py-0.5 text-cocoa placeholder:text-cocoa/30 focus:outline-none focus:border-toffee transition-colors w-36 sm:w-48"
          />
          <span>. I live in </span>
          <input
            type="text"
            name="area"
            placeholder="e.g. Dubai Marina"
            value={formData.area}
            onChange={handleChange}
            className="inline-block border-b-2 border-cocoa/60 bg-transparent px-2 py-0.5 text-cocoa placeholder:text-cocoa/30 focus:outline-none focus:border-toffee transition-colors w-40 sm:w-52"
          />
          <span>, and I'm curious about </span>
          <select
            name="puppyId"
            value={formData.puppyId}
            onChange={handleChange}
            className="inline-block border-b-2 border-cocoa bg-transparent px-2 py-1 text-cocoa font-bold focus:outline-none focus:border-toffee transition-colors max-w-xs cursor-pointer"
          >
            <option value="">any puppy (not sure yet)</option>
            {availablePuppies.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name} ({p.breed}, {p.gender})
              </option>
            ))}
          </select>
          <span>.</span>
        </div>

        {/* Optional Extra Message */}
        <div>
          <label className="block font-scrawl text-sm text-toffee mb-1">
            Anything else you'd like to tell us… (optional)
          </label>
          <textarea
            name="message"
            rows="3"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your home, questions on vaccinations, or preferred visit date…"
            className="w-full rounded-2xl border-2 border-cocoa/30 bg-[#fbf5ec] p-4 text-sm text-cocoa placeholder:text-cocoa/40 focus:outline-none focus:border-cocoa transition-colors"
          ></textarea>
        </div>

        {/* Letter Closing */}
        <div className="pt-2">
          <p className="font-scrawl text-lg text-cocoa-soft">
            with love, a future puppy parent
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex items-center justify-between flex-wrap gap-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-cocoa text-base font-semibold px-8 py-3.5 hover:scale-102 transition-all shadow-md"
          >
            <Send className="w-4 h-4 text-honey" />
            <span>{loading ? 'Posting...' : 'Post my letter'}</span>
          </button>

          <span className="text-xs text-cocoa/60 font-medium">
            🔒 Safe & confidential. We reply within a few hours.
          </span>
        </div>
      </form>
    </div>
  );
}
