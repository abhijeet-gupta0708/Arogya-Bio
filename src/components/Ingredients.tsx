import React from 'react';
import { LANDING_CONTENT } from '../data/landingData';

export const Ingredients: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 max-w-[1200px] mx-auto">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#2E7D32] bg-[#EEEEE7] px-3.5 py-1 rounded-full border border-[#2E7D32]/20">
          100% प्राकृतिक जड़ी-बूटियाँ
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#0D2B0D] mt-3 mb-2">
          {LANDING_CONTENT.ingredients.sectionTitle}
        </h2>
        <p className="text-base sm:text-lg text-[#41493F]">
          {LANDING_CONTENT.ingredients.sectionSubtitle}
        </p>
      </div>

      {/* 3 Ingredient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {LANDING_CONTENT.ingredients.list.map((ing) => (
          <div
            key={ing.id}
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_4px_20px_rgba(27,77,27,0.06)] border border-[#E8E8DF] hover:border-[#B8860B]/50 transition-all duration-300 relative overflow-hidden group hover:-translate-y-1"
          >
            {/* Top Right Tag */}
            <div className="absolute top-4 right-4 bg-[#FAFAF3] text-[#1B4D1B] border border-[#1B4D1B]/20 px-3 py-0.5 rounded-full text-xs font-semibold">
              {ing.tag}
            </div>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#EEEEE7] text-[#1B4D1B] flex items-center justify-center mb-5 group-hover:bg-[#1B4D1B] group-hover:text-[#FDC34D] transition-colors">
              <span className="material-symbols-outlined text-3xl">
                {ing.icon}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold text-[#0D2B0D] mb-1">
              {ing.nameHindi}
            </h3>
            <span className="block text-xs font-medium text-[#7B5E10] italic mb-3">
              {ing.nameEnglish}
            </span>

            {/* Benefit Description */}
            <p className="text-sm sm:text-base text-[#41493F] leading-relaxed">
              {ing.benefit}
            </p>

            {/* Bottom Subtle Bar */}
            <div className="mt-6 pt-4 border-t border-[#E8E8DF] flex items-center gap-2 text-xs text-[#2E7D32] font-semibold">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>प्राकृतिक अर्क रूप में समाहित</span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
