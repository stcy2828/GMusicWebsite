
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
            className="absolute top-8 right-8 text-white/50 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:rotate-90"
            onClick={() => setSelectedImage(null)}
          >
            <X size={40} strokeWidth={1} />
          </button>
          
          <div 
            className="relative max-w-[90vw] max-h-[90vh]" 
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

      <div className="max-w-[1400px] mx-auto px-6">
        <h1 className="text-5xl font-serif gold-text tracking-[0.2em] mb-20 text-center uppercase">{t.event.title}</h1>

        {years.map(year => (
          <div key={year} className="mb-32">
            <div className="flex items-center mb-16 px-4">
              <h2 className="text-8xl font-serif gold-text leading-none">{year}</h2>
              <div className="h-[2px] flex-1 ml-10 bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-16">
              {EVENT_POSTERS
                .filter(p => p.year === year)
                // Strict ascending sort by Name/ID (e.g., 2025-01 comes before 2025-02)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((poster) => (
                  <div 
                    key={poster.id}
                    className="animate-fade opacity-0 translate-y-10 transition-all duration-1000 ease-out group cursor-pointer"
                    onClick={() => setSelectedImage(poster.imageUrl)}
                  >
                    <div className="relative h-[50vh] flex flex-col items-center">
                       <div className="h-full w-full relative overflow-hidden border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/50 transition-all duration-500">
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-white/5 z-10 transition-colors duration-300 pointer-events-none" />
                         <img 
                          src={poster.imageUrl} 
                          alt={poster.name} 
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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
