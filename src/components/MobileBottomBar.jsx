import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { siteMeta } from '../data/puppiesData';

export default function MobileBottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-[#fffdf8]/95 backdrop-blur-md border-t border-cocoa/10 p-3 sm:hidden shadow-[0_-4px_20px_rgba(42,23,14,0.08)]">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        <a
          href={siteMeta.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp flex-1 !py-3 text-sm font-semibold justify-center shadow-none"
        >
          <MessageCircle className="w-4 h-4 fill-white text-white" />
          <span>WhatsApp us</span>
        </a>

        <a
          href={`tel:${siteMeta.phone}`}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-cocoa bg-milk px-5 py-3 text-sm font-semibold text-cocoa hover:bg-cocoa hover:text-milk transition-colors"
          aria-label="Call TeddyPups"
        >
          <Phone className="w-4 h-4" />
          <span>Call</span>
        </a>
      </div>
    </div>
  );
}
