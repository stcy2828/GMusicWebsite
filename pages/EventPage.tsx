
import React, { useEffect, useRef, useState } from 'react';
import { EVENT_POSTERS } from '../constants';
import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const EventPage: React.FC = () => {
  const years = Array.from(new Set(EVENT_POSTERS.map(p => p.year))).sort((a, b) => b - a);
  const observer = useRef<IntersectionObserver | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      });
    }, { threshold: 0.1 });

    const items = document.querySelectorAll('.animate-fade');
    items.forEach(item => observer.current?.observe(item));

    return () => observer.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 bg-black relative">
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:rotate-90 z-50 bg-black/50 rounded-full p-2"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} strokeWidth={1.5} />
          </button>
          
          <div 
            className="relative max-w-[95vw] max-h-[90vh]" 
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Enlarged Poster" 
              className="max-h-[85vh] w-auto object-contain shadow-[0_0_100px_rgba(212,175,55,0.15)] border border-[#D4AF37]/30"
            />
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto px-4 md:px-6">
        <h1 className="text-xl md:text-5xl font-serif gold-text tracking-[0.2em] mb-12 md:mb-20 text-center uppercase">{t.event.title}</h1>

        {years.map(year => (
          <div key={year} className="mb-20 md:mb-32">
            <div className="flex items-center mb-8 md:mb-16 px-2 md:px-4">
              <h2 className="text-5xl md:text-8xl font-serif gold-text leading-none">{year}</h2>
              <div className="h-[1px] md:h-[2px] flex-1 ml-6 md:ml-10 bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-10 md:gap-y-16">
              {EVENT_POSTERS
                .filter(p => p.year === year)
                // Strict ascending sort by Name/ID
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((poster) => (
                  <div 
                    key={poster.id}
                    className="animate-fade opacity-0 translate-y-10 transition-all duration-1000 ease-out group cursor-pointer"
                    onClick={() => setSelectedImage(poster.imageUrl)}
                  >
                    {/* Mobile: Use w-full and h-auto to show full poster (natural ratio). Desktop: Use h-[50vh] and object-cover (fixed height crop) */}
                    <div className="relative w-full md:w-auto md:h-[50vh] flex flex-col items-center">
                       <div className="w-full relative overflow-hidden border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-all duration-500 md:h-full md:w-full">
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-white/5 z-10 transition-colors duration-300 pointer-events-none" />
                         <img 
                          src={poster.imageUrl} 
                          alt={poster.name} 
                          className="w-full h-auto md:h-full md:w-full md:object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                       </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventPage;
