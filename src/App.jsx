import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import PupJourney from './components/pup/PupJourney';

// Pages
import HomePage from './pages/HomePage';
import PuppiesPage from './pages/PuppiesPage';
import PuppyDetailPage from './pages/PuppyDetailPage';
import GoneHomePage from './pages/GoneHomePage';
import HappyFamiliesPage from './pages/HappyFamiliesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

// Reveal observer for sketchbook, polaroid, notes, and cards
function RevealObserver() {
  const { pathname } = useLocation();

  useEffect(() => {
    const reveal = (el) => {
      el.dataset.revealed = 'true';
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.05 }
    );

    const arm = (el) => {
      if (el.dataset.revealed === 'true') return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.dataset.revealed = 'true';
        return;
      }
      el.dataset.armed = 'true';
      observer.observe(el);
    };

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not([data-revealed])').forEach(arm);
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}

function RoutedPupJourney() {
  const location = useLocation();
  return <PupJourney key={location.pathname} />;
}

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <SmoothScroll />
      <ScrollToTop />
      <RevealObserver />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/puppies" element={<PuppiesPage />} />
        <Route path="/puppies/:slug" element={<PuppyDetailPage />} />
        <Route path="/gone-home" element={<GoneHomePage />} />
        <Route path="/happy-families" element={<HappyFamiliesPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
      <RoutedPupJourney />
      {/* Mobile Sticky WhatsApp / Call Bar */}
      <div
        data-whatsapp-bar="true"
        className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-cocoa bg-milk px-3 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 md:hidden"
      >
        <div className="mx-auto flex max-w-md gap-2">
          <a
            href="https://wa.me/971541676733?text=Hi%20TeddyPups!%20I'd%20love%20to%20know%20more%20about%20your%20puppies."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp !min-h-12 flex-1 !shadow-none"
          >
            WhatsApp us
          </a>
          <a
            href="tel:+971541676733"
            className="btn btn-ghost !min-h-12 !px-5"
          >
            Call
          </a>
        </div>
      </div>
    </Router>
  );
}
