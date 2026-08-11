import React from 'react';
import { LANDING_CONTENT } from '../data/landingData';

export const KeyBenefits: React.FC = () => {
  return (
    <section className="bg-[#EEEEE7] py-8 sm:py-10 border-y border-[#E8E8DF]">
      <div className="max-w-[1200px] mx-auto px-4">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {LANDING_CONTENT.benefitsStrip.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-xs border border-[#E8E8DF] hover:border-[#1B4D1B]/30 hover:shadow-md transition-all flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1B4D1B] text-[#FDC34D] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs">
                <span className="material-symbols-outlined text-2xl sm:text-3xl">
                  {item.icon}
                </span>
              </div>
              <h3 className="font-bold text-[#0D2B0D] text-sm sm:text-base mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#41493F] leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
