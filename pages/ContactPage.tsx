
import React, { useEffect } from 'react';
import { MapPin, Phone, Printer, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });

    const animatedItems = document.querySelectorAll('.animate-on-scroll');
    animatedItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-32 bg-black selection:bg-[#D4AF37] selection:text-black">
      {/* Page Title */}
      <div className="max-w-[1400px] mx-auto px-6 mb-12 md:mb-16">
        <h1 className="text-xl md:text-5xl font-serif gold-text tracking-[0.2em] mb-16 text-center uppercase animate-on-scroll opacity-0 translate-y-8 transition-all duration-1000">
          {t.contact.title}
        </h1>
      </div>

      <div className="max-w-[1000px] mx-auto px-6">
        <div className="bg-white/5 border border-[#D4AF37]/20 p-8 md:p-20 shadow-2xl animate-on-scroll opacity-0 translate-y-12 transition-all duration-[1200ms] ease-out">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            
            {/* Left Column: Address & Map Label */}
            <div className="space-y-12">
              <div className="group">
                <div className="flex items-center mb-6">
                  <div className="p-3 border border-[#D4AF37]/30 rounded-full mr-5 group-hover:bg-[#D4AF37]/10 transition-colors">
                    <MapPin className="gold-text" size={24} />
                  </div>
                  <h2 className="text-xl font-serif gold-text tracking-widest uppercase">{t.contact.address_label}</h2>
                </div>
                <p className="text-gray-400 leading-relaxed tracking-wide text-base md:text-lg font-light pl-2 whitespace-pre-line">
                  {t.contact.address_val}
                </p>
              </div>
            </div>

            {/* Right Column: Communications */}
            <div className="space-y-12">
              {/* Telephone */}
              <div className="group">
                <div className="flex items-center mb-6">
                  <div className="p-3 border border-[#D4AF37]/30 rounded-full mr-5 group-hover:bg-[#D4AF37]/10 transition-colors">
                    <Phone className="gold-text" size={24} />
                  </div>
                  <h2 className="text-xl font-serif gold-text tracking-widest uppercase">{t.contact.tel_label}</h2>
                </div>
                <a href="tel:+85235498998" className="text-gray-400 hover:gold-text transition-colors leading-relaxed tracking-widest text-base md:text-lg font-light pl-2 block">
                  +852 3549 8998
                </a>
              </div>

              {/* Fax */}
              <div className="group">
                <div className="flex items-center mb-6">
                  <div className="p-3 border border-[#D4AF37]/30 rounded-full mr-5 group-hover:bg-[#D4AF37]/10 transition-colors">
                    <Printer className="gold-text" size={24} />
                  </div>
                  <h2 className="text-xl font-serif gold-text tracking-widest uppercase">{t.contact.fax_label}</h2>
                </div>
                <p className="text-gray-400 leading-relaxed tracking-widest text-base md:text-lg font-light pl-2">
                  +852 3914 7520
                </p>
              </div>

              {/* Email */}
              <div className="group">
                <div className="flex items-center mb-6">
                  <div className="p-3 border border-[#D4AF37]/30 rounded-full mr-5 group-hover:bg-[#D4AF37]/10 transition-colors">
                    <Mail className="gold-text" size={24} />
                  </div>
                  <h2 className="text-xl font-serif gold-text tracking-widest uppercase">{t.contact.email_label}</h2>
                </div>
                <a href="mailto:info@gmusichk.com" className="text-gray-400 hover:gold-text transition-colors leading-relaxed tracking-widest text-base md:text-lg font-light pl-2 block">
                  info@gmusichk.com
                </a>
              </div>
            </div>

          </div>

          {/* Bottom border line remains for design balance */}
          <div className="mt-20 pt-10 border-t border-[#D4AF37]/10 text-center">
            {/* Removed "Connecting Talent and Passion Since 2008" */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
