import React, { useState, useMemo } from 'react';
import { Search, MessageCircle, HelpCircle } from 'lucide-react';
import { faqList, siteMeta } from '../data/puppiesData';
import FAQItem from '../components/FAQItem';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqList;
    const q = searchQuery.toLowerCase();
    return faqList.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-scrawl text-toffee text-sm font-semibold tracking-wide">
            clear & honest answers
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-cocoa tracking-tight mt-1 mb-4">
            Questions & answers
          </h1>
          <p className="text-cocoa-soft text-base sm:text-lg leading-relaxed">
            Everything you need to know about our health guarantees, adoption policies, and international sourcing.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-10">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-cocoa/40" />
          <input
            type="text"
            placeholder="Search questions (e.g. vaccinated, delivery, import)…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#fbf5ec] border-2 border-cocoa/20 rounded-2xl pl-12 pr-4 py-3.5 text-sm sm:text-base text-cocoa placeholder:text-cocoa/40 focus:outline-none focus:border-toffee transition-colors"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-cocoa/15 bg-milk rounded-3xl p-6 sm:p-8 border-2 border-cocoa/20 shadow-md">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
              <FAQItem key={idx} faq={faq} defaultOpen={idx === 0 && !searchQuery} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="font-serif text-lg font-bold text-cocoa mb-1">
                No matching questions found
              </p>
              <p className="text-xs text-cocoa-soft">
                Feel free to ask us directly on WhatsApp and we will answer right away!
              </p>
            </div>
          )}
        </div>

        {/* Still have questions banner */}
        <div className="mt-14 p-8 rounded-3xl bg-[#fbf5ec] border border-cocoa/15 text-center flex flex-col items-center">
          <HelpCircle className="w-10 h-10 text-toffee mb-3" />
          <h3 className="font-serif text-2xl font-bold text-cocoa mb-2">
            Have a question not listed here?
          </h3>
          <p className="text-cocoa-soft text-sm sm:text-base max-w-md mx-auto mb-6">
            Our puppy specialists in Downtown Dubai are available 24/7 to provide guidance on breeds, temperament, and care.
          </p>

          <a
            href={siteMeta.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp text-sm font-semibold px-6 py-3"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp (+971 54 167 6733)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
