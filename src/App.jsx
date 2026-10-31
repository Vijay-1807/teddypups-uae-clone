import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import MascotWidget from './components/MascotWidget';
import VideoModal from './components/VideoModal';
import LightboxModal from './components/LightboxModal';

// Pages
import HomePage from './pages/HomePage';
import PuppiesPage from './pages/PuppiesPage';
import PuppyDetailPage from './pages/PuppyDetailPage';
import GoneHomePage from './pages/GoneHomePage';
import HappyFamiliesPage from './pages/HappyFamiliesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

// Scroll to top helper
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [activeVideoPuppy, setActiveVideoPuppy] = useState(null);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const handleOpenLightbox = (images, index = 0) => {
    setLightboxState({
      isOpen: true,
      images,
      currentIndex: index,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#fffdf8] text-[#2a170e] relative selection:bg-honey selection:text-cocoa">
        {/* Navigation Header */}
        <Header />

        {/* Main Content Pages */}
        <main id="main" className="flex-1">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  onPlayVideo={(puppy) => setActiveVideoPuppy(puppy)}
                  onOpenLightbox={handleOpenLightbox}
                />
              }
            />
            <Route
              path="/puppies"
              element={
                <PuppiesPage
                  onPlayVideo={(puppy) => setActiveVideoPuppy(puppy)}
                />
              }
            />
            <Route
              path="/puppies/:slug"
              element={
                <PuppyDetailPage
                  onPlayVideo={(puppy) => setActiveVideoPuppy(puppy)}
                  onOpenLightbox={handleOpenLightbox}
                />
              }
            />
            <Route path="/gone-home" element={<GoneHomePage />} />
            <Route
              path="/happy-families"
              element={<HappyFamiliesPage onOpenLightbox={handleOpenLightbox} />}
            />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Sticky Mobile Actions Bar */}
        <MobileBottomBar />

        {/* Interactive Mascot Pet Doggy */}
        <MascotWidget />

        {/* Video Clip Modal */}
        {activeVideoPuppy && (
          <VideoModal
            puppy={activeVideoPuppy}
            onClose={() => setActiveVideoPuppy(null)}
          />
        )}

        {/* Lightbox Photo Gallery Modal */}
        {lightboxState.isOpen && (
          <LightboxModal
            images={lightboxState.images}
            currentIndex={lightboxState.currentIndex}
            onClose={handleCloseLightbox}
            onNavigate={(newIdx) =>
              setLightboxState((prev) => ({ ...prev, currentIndex: newIdx }))
            }
          />
        )}
      </div>
    </Router>
  );
}
