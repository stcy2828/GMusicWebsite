
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_URL, SOCIAL_LINKS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC = () => {
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t.nav.top, path: '/' },
    { name: t.nav.about, path: '/about' },
    { name: t.nav.brand, path: '/brand' },
    { name: t.nav.event, path: '/event' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-[#D4AF37]/30">
      <div className="max-w-[1400px] mx-auto px-6 h-24 grid grid-cols-3 items-center">
        {/* Logo - Left column */}
        <div className="flex justify-start">
          <Link to="/" className="flex items-center">
            <img src={LOGO_URL} alt="G Music Logo" className="h-16 w-auto object-contain" />
          </Link>
        </div>

        {/* Navigation - Center column */}
        <nav className="flex items-center justify-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-[10px] font-bold tracking-[0.2em] transition-all duration-300 hover:text-[#D4AF37] uppercase whitespace-nowrap ${
                location.pathname === link.path ? 'gold-text scale-105' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Icons & Language - Right column */}
        <div className="flex items-center justify-end space-x-6">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110"
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}

          <div className="h-6 w-[1px] bg-gray-700 mx-2" />

          {/* Language Selector */}
          <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest">
             <button 
               onClick={() => setLanguage('EN')} 
               className={`transition-colors duration-300 hover:text-[#D4AF37] ${language === 'EN' ? 'gold-text' : 'text-gray-500'}`}
             >
               EN
             </button>
             <span className="text-gray-700">|</span>
             <button 
               onClick={() => setLanguage('TC')} 
               className={`transition-colors duration-300 hover:text-[#D4AF37] ${language === 'TC' ? 'gold-text' : 'text-gray-500'}`}
             >
               繁
             </button>
             <span className="text-gray-700">|</span>
             <button 
               onClick={() => setLanguage('JP')} 
               className={`transition-colors duration-300 hover:text-[#D4AF37] ${language === 'JP' ? 'gold-text' : 'text-gray-500'}`}
             >
               JP
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
