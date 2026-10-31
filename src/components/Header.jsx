import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X, Phone } from 'lucide-react';
import { siteMeta } from '../data/puppiesData';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Track scroll for subtle border / elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Puppies', path: '/puppies' },
    { name: 'Happy families', path: '/happy-families' },
    { name: 'How it works', path: '/how-it-works' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Visit & contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#fffdf8]/95 backdrop-blur-md shadow-sm border-b border-cocoa/10 py-3'
            : 'bg-[#fffdf8]/85 backdrop-blur-sm py-4 border-b border-cocoa/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/brand/logo.png"
                alt="TeddyPups Logo"
                className="w-9 h-9 object-contain transition-transform group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-cocoa leading-none group-hover:text-toffee transition-colors">
                  TeddyPups
                </span>
                <span className="font-scrawl text-xs text-toffee font-medium tracking-wide">
                  every puppy is family
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-1.5 rounded-full text-[0.95rem] font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-cocoa text-milk font-semibold shadow-sm'
                        : 'text-cocoa/85 hover:text-cocoa hover:bg-cocoa/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action: WhatsApp CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={siteMeta.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm font-semibold !py-2 !px-4"
              >
                <MessageCircle className="w-4 h-4 fill-white text-white" />
                <span>WhatsApp us</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={siteMeta.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-xs !py-1.5 !px-3 sm:hidden"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border-2 border-cocoa bg-milk px-3.5 text-sm font-semibold text-cocoa hover:bg-cocoa hover:text-milk transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-cocoa/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Drawer */}
          <div className="fixed inset-x-0 top-16 bg-[#fffdf8] border-b border-cocoa/15 shadow-2xl p-6 rounded-b-3xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col gap-2">
              <p className="font-scrawl text-sm text-toffee mb-1">where to, friend?</p>
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center justify-between px-4 py-3 rounded-2xl text-lg font-medium transition-colors ${
                      isActive
                        ? 'bg-cocoa text-milk font-semibold'
                        : 'text-cocoa hover:bg-cocoa/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="text-xs bg-honey text-cocoa px-2 py-0.5 rounded-full font-bold">Current</span>}
                  </Link>
                );
              })}

              <div className="mt-4 pt-4 border-t border-cocoa/10 flex flex-col gap-3">
                <a
                  href={siteMeta.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full justify-center text-base py-3 font-semibold"
                >
                  <MessageCircle className="w-5 h-5 fill-white text-white" />
                  <span>WhatsApp us (+971 54 167 6733)</span>
                </a>

                <a
                  href={`tel:${siteMeta.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-cocoa px-5 py-2.5 text-sm font-semibold text-cocoa hover:bg-cocoa hover:text-milk transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Direct Call: {siteMeta.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

