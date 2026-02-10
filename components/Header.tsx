
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO_URL, NAV_LINKS, SOCIAL_LINKS } from '../constants';

const Header: React.FC = () => {
  const location = useLocation();

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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-bold tracking-[0.2em] transition-all duration-300 hover:text-[#D4AF37] uppercase whitespace-nowrap ${
                location.pathname === link.path ? 'gold-text scale-105' : 'text-gray-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Icons - Right column */}
        <div className="flex items-center justify-end space-x-5">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
