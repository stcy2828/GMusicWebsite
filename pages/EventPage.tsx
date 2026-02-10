
import React, { useEffect, useRef } from 'react';
import { EVENT_POSTERS } from '../constants';

const EventPage: React.FC = () => {
  const years = Array.from(new Set(EVENT_POSTERS.map(p => p.year))).sort((a, b) => b - a);
  const observer = useRef<IntersectionObserver | null>(null);

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
    <div className="min-h-screen pt-32 pb-24 bg-black">
      <div className="max-w-[1400px] mx-auto px-6">
        <h1 className="text-5xl font-serif gold-text tracking-[0.2em] mb-20 text-center uppercase">Event Archive</h1>

        {years.map(year => (
          <div key={year} className="mb-32">
            <div className="flex items-center mb-16 px-4">
              <h2 className="text-8xl font-serif text-white/5 leading-none">{year}</h2>
              <div className="h-[2px] flex-1 ml-10 bg-gradient-to-r from-[#D4AF37]/40 to-transparent" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-16">
              {EVENT_POSTERS
                .filter(p => p.year === year)
                .map((poster) => (
                  <div 
                    key={poster.id}
                    className="animate-fade opacity-0 translate-y-10 transition-all duration-1000 ease-out"
                  >
                    <div className="relative h-[50vh] flex flex-col items-center">
                       <div className="h-full w-full relative overflow-hidden border border-[#D4AF37]/10">
                         <img 
                          src={poster.imageUrl} 
                          alt={poster.name} 
                          className="w-full h-full object-cover"
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
