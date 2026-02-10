
import React from 'react';
import { TOP_POSTERS } from '../constants';

const Carousel: React.FC = () => {
  // Use exactly the 8 random posters as requested
  const posters = TOP_POSTERS;

  return (
    <div className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden bg-black pt-24">
      {/* Side gradients for atmospheric depth */}
      <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />
      
      <div className="h-full flex items-center">
        {/* 
          Container with exactly 8 posters.
          gap-0 ensures no space between posters.
          animate-scroll-fade handles the scroll and the 1s fade-out/in transition.
        */}
        <div className="flex animate-scroll-fade items-center gap-0 py-10 will-change-transform">
          {posters.map((poster) => (
            <div 
              key={poster.id}
              className="h-[55vh] md:h-[65vh] flex-shrink-0 relative"
            >
              <img 
                src={poster.imageUrl} 
                alt={poster.name}
                className="h-full w-auto block border-y border-[#D4AF37]/20 shadow-2xl"
                loading="eager"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-fade {
          /* Total cycle: 40s (Slower speed)
             Scroll takes 39s (97.5%).
             Fade out takes 0.5s (1.25%).
             Fade in takes 0.5s (1.25%).
          */
          0% { 
            transform: translateX(0); 
            opacity: 1; 
          }
          97.5% { 
            /* End of 39s scroll: all 8 posters have moved past */
            transform: translateX(-100%); 
            opacity: 1; 
          }
          98.75% { 
            /* 39.5s mark: fade out complete */
            transform: translateX(-100%); 
            opacity: 0; 
          }
          98.751% {
            /* Instant reset while invisible */
            transform: translateX(0);
            opacity: 0;
          }
          100% { 
            /* 40s mark: fade in complete at starting position */
            transform: translateX(0); 
            opacity: 1; 
          }
        }
        .animate-scroll-fade {
          /* linear timing ensures steady movement, 40s total duration */
          animation: scroll-fade 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
