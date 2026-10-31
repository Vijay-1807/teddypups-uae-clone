import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQItem({ faq, defaultOpen = false }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-cocoa/15 py-4 transition-colors">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left gap-4 py-2 group focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="font-serif text-lg sm:text-xl font-bold text-cocoa group-hover:text-toffee transition-colors">
          {faq.question}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border border-cocoa/20 flex items-center justify-center transition-transform duration-300 ${
            isOpen ? 'rotate-180 bg-cocoa text-milk' : 'bg-milk text-cocoa group-hover:border-cocoa'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>

      {isOpen && (
        <div className="pt-2 pb-3 pr-6 text-cocoa-soft text-sm sm:text-base leading-relaxed animate-in fade-in duration-200">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

