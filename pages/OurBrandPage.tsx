
import React, { useEffect } from 'react';

const OurBrandPage: React.FC = () => {
  const structureImage = "https://github.com/stcy2828/GMusicWebsite/blob/main/material/Company-Structure.webp?raw=true";

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
          OUR BRAND
        </h1>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col items-center">
          
          {/* Unified Introductory Sentence */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-[1200ms] ease-out max-w-4xl mx-auto mb-16 text-center">
            <p className="text-gray-400 leading-relaxed tracking-wide text-base md:text-xl font-light px-4">
              G Music has established two independent brands: "DRIVE IN ULTRA" and "Infinite One", to elevate our presence and connect more deeply with audiences.
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
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-[2000ms] delay-300 ease-out w-full max-w-4xl text-left mb-24">
            <div className="">
              <h2 className="text-2xl font-serif gold-text tracking-widest uppercase flex items-center mb-6">
                DRIVE IN ULTRA
                <span className="ml-6 h-[1px] w-24 bg-[#D4AF37]/30" />
              </h2>
              <p className="text-gray-400 leading-relaxed tracking-wide text-base md:text-lg font-light text-justify">
                As a pioneering large-scale outdoor concert brand, DRIVE IN ULTRA revolutionized the local scene by becoming the first in Hong Kong to offer a hybrid experience, seamlessly combining drive-in viewing with traditional seating. This innovative format has already hosted iconic performances, debuting successfully with "WEE ARE RONALD CHENG" in April 2021, followed by the spectacular "LOVFINITY VIVIENNE TAM X LEON LAI FASHION CONCERT" in December 2022. Looking ahead, G Music is committed to inviting top-tier artists to this unique stage, steadily building DRIVE IN ULTRA into a renowned international music brand.
              </p>
            </div>
          </div>

          {/* Infinite One Description - Left Aligned */}
          <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-[2000ms] delay-500 ease-out w-full max-w-4xl text-left">
            <div className="">
              <h2 className="text-2xl font-serif gold-text tracking-widest uppercase flex items-center mb-6">
                Infinite One
                <span className="ml-6 h-[1px] w-24 bg-[#D4AF37]/30" />
              </h2>
              <div className="space-y-6">
                <p className="text-gray-400 leading-relaxed tracking-wide text-base md:text-lg font-light text-justify">
                  Infinite One is G Music's original brand dedicated to celebrating Japanese anime culture, bridging the gap between the essence of Japanese creativity and passionate audiences across Asia. As Japanese creative culture flourishes throughout the region, we established Infinite One to elevate these experiences through authenticity and innovation. Our mission is to lead the industry by seamlessly connecting creators with fans, ensuring a distinct and engaging platform for all.
                </p>
                <p className="text-gray-400 leading-relaxed tracking-wide text-base md:text-lg font-light text-justify">
                  The successful hosting of "hololive STAGE World Tour ’25 -Synchronize- @ Hong Kong" and "hololive Meet @ Hong Kong 2025 ft. Hakos Baelz & Kobo Kanaeru" in July 2025 served as a powerful cornerstone for the brand. These events have laid a solid foundation, paving the way for us to develop an even more diverse range of anime-related activities in the future.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OurBrandPage;
