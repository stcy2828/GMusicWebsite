import React, { useEffect, useRef, useState } from 'react';
// 1. 直接引入原始資料，避免透過 constants 轉手
import { INFO_DATA } from '../infodata'; 
import { InfoItem } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const InfoSection: React.FC = () => {
  const [items, setItems] = useState<InfoItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  // 處理資料初始化
  useEffect(() => {
    if (INFO_DATA && Array.isArray(INFO_DATA)) {
      // 確保資料按日期排序（最新的在前），並取前 5 筆
      const recentItems = [...INFO_DATA]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
      setItems(recentItems);
      setIsLoaded(true);
    }
  }, []);

  // 處理動畫偵測
  useEffect(() => {
    if (items.length === 0) return;

    const observerOptions = {
      threshold: 0.01, // 只要有一點點出現在畫面就觸發
      rootMargin: '100px', // 提前 100px 開始載入動畫，避免用戶看到空白
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // 使用 setTimeout 確保 React 已經把 DOM 節點渲染出來
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll('.info-animate');
      elements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [items]);

  const formatDate = (dateStr: string) => {
    return dateStr.replace(/-/g, '.');
  };

  // 如果資料還在處理中，不顯示「沒有內容」，顯示空白佔位
  if (!isLoaded) return <div className="min-h-[400px] bg-black" />;

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-black min-h-[400px]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-serif gold-text tracking-[0.3em] mb-20 text-center">
          {t.info.title}
        </h2>
        
        <div className="space-y-4">
          {items.length > 0 ? (
            items.map((item) => (
              <div 
                key={item.id}
                className="info-animate opacity-0 translate-y-10 transition-all duration-1000 ease-out flex flex-col md:flex-row md:items-center py-10 border-b border-[#D4AF37]/10 group cursor-pointer hover:bg-white/5 px-6"
              >
                <div className="flex items-center mb-4 md:mb-0 md:w-64">
                  <span className="text-gray-500 text-xs tracking-[0.2em] mr-8 font-mono">
                    {formatDate(item.date)}
                  </span>
                  <span className="text-[9px] px-3 py-1 border border-[#D4AF37] gold-text font-bold uppercase tracking-[0.2em]">
                    {item.category}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-base text-gray-300 group-hover:gold-text transition-colors duration-300 tracking-[0.1em] leading-relaxed">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-600 tracking-widest uppercase text-xs border border-dashed border-gray-800">
              {t.info.noInfo}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
