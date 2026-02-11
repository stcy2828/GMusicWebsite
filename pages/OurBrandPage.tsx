
import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const OurBrandPage: React.FC = () => {
  const structureImage = "https://github.com/stcy2828/GMusicWebsite/blob/main/material/Company-Structure.webp?raw=true";
  const dinuImage = "https://github.com/stcy2828/GMusicWebsite/blob/main/material/DinU-intro.webp?raw=true";
  const in01Image = "https://github.com/stcy2828/GMusicWebsite/blob/main/material/In01-intro.webp?raw=true";
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
      {/* Unified Page Title */}
      <div className="max-w-[1400px] mx-auto px-6 mb-16">
        <h1 className="text-5xl font-serif gold-text tracking-[0.2em] mb-16 text-center uppercase">
          {t.brand.title}
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col items-center">
          
          {/* Unified Introductory Sentence */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-[1200ms] ease-out max-w-4xl mx-auto mb-16 text-center">
            <p className="text-gray-400 leading-relaxed tracking-wide text-base md:text-xl font-light px-4">
              {t.brand.intro}
            </p>
          </div>

          {/* Company Structure Image */}
          <div className="animate-on-scroll opacity-0 translate-y-12 transition-all duration-[1600ms] ease-out mb-24 w-full flex justify-center">
            <div className="w-full md:w-[70%]">
              <img 
                src={structureImage} 
                alt="G Music Company Structure" 
                className="w-full h-auto object-contain shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>

          {/* DRIVE IN ULTRA Description - Left Aligned */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-[2000ms] delay-300 ease-out w-full max-w-4xl text-left mb-32">
            <div className="">
              <h2 className="text-2xl font-serif gold-text tracking-widest uppercase flex items-center mb-6">
                {t.brand.dinu_title}
                <span className="ml-6 h-[1px] w-24 bg-[#D4AF37]/30" />
              </h2>
              <p className="text-gray-400 leading-relaxed tracking-wide text-base md:text-lg font-light text-justify mb-12">
                {t.brand.dinu_text}
              </p>
              
              {/* Drive In Ultra Image */}
              <div className="w-full overflow-hidden border border-[#D4AF37]/10 shadow-2xl group">
                <img 
                  src={dinuImage} 
                  alt="Drive In Ultra Atmosphere" 
                  className="w-full h-auto transition-transform duration-[2000ms] group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* Infinite One Description - Left Aligned */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-[2000ms] delay-500 ease-out w-full max-w-4xl text-left">
            <div className="">
              <h2 className="text-2xl font-serif gold-text tracking-widest uppercase flex items-center mb-6">
                {t.brand.in01_title}
                <span className="ml-6 h-[1px] w-24 bg-[#D4AF37]/30" />
              </h2>
              <div className="space-y-6 mb-12">
                <p className="text-gray-400 leading-relaxed tracking-wide text-base md:text-lg font-light text-justify">
                  {t.brand.in01_text1}
                </p>
                <p className="text-gray-400 leading-relaxed tracking-wide text-base md:text-lg font-light text-justify">
                  {t.brand.in01_text2}
                </p>
              </div>

              {/* Infinite One Image */}
              <div className="w-full overflow-hidden border border-[#D4AF37]/10 shadow-2xl group">
                <img 
                  src={in01Image} 
                  alt="Infinite One Atmosphere" 
                  className="w-full h-auto transition-transform duration-[2000ms] group-hover:scale-105"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OurBrandPage;
