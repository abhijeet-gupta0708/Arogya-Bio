import React, { useState } from 'react';
import { LANDING_CONTENT } from '../data/landingData';

export const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative py-8 sm:py-12 px-4 max-w-[1200px] mx-auto overflow-hidden">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#1B4D1B]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#B8860B]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
        
        {/* Left Column: Headlines & Call to Action */}
        <div className="md:col-span-7 text-center md:text-left">
          
          {/* Trust Badge Pill */}
          <div className="inline-flex items-center gap-2 bg-[#EEEEE7] text-[#1B4D1B] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 border border-[#1B4D1B]/15 shadow-2xs">
            <span className="material-symbols-outlined text-lg text-[#2E7D32]">verified_user</span>
            <span>{LANDING_CONTENT.hero.badge}</span>
          </div>

          {/* Main Headline in Devanagari */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0D2B0D] leading-[1.25] mb-4 tracking-tight">
            {LANDING_CONTENT.hero.headline}
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-[#41493F] mb-6 sm:mb-8 font-medium leading-relaxed">
            {LANDING_CONTENT.hero.subheadline}
          </p>

          {/* Hero CTAs & Trust Signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-6">
            <a
              href="#order-form"
              className="w-full sm:w-auto bg-[#B8860B] hover:bg-[#996e08] text-white font-bold text-lg sm:text-xl py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 pulse-btn group"
            >
              <span>{LANDING_CONTENT.hero.ctaText}</span>
              <span className="material-symbols-outlined text-2xl group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </a>
          </div>

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm text-[#41493F]">
            <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#E8E8DF]">
              <span className="material-symbols-outlined text-base text-[#2E7D32]">shield</span>
              सुरक्षित चेकआउट
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#E8E8DF]">
              <span className="material-symbols-outlined text-base text-[#B8860B]">payments</span>
              कैश ऑन डिलीवरी (COD)
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-[#E8E8DF]">
              <span className="material-symbols-outlined text-base text-[#2E7D32]">local_shipping</span>
              फ्री डिलीवरी
            </span>
          </div>
        </div>

        {/* Right Column: Exact Product Image Display */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[420px] bg-white p-3 sm:p-4 rounded-3xl shadow-[0_10px_30px_rgba(27,77,27,0.12)] border-2 border-[#E8E8DF] group hover:border-[#B8860B]/40 transition-all">
            
            {/* Top Product Ribbon */}
            <div className="absolute top-4 left-4 bg-[#1B4D1B] text-white text-xs font-bold py-1 px-3 rounded-full z-10 shadow-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#FDC34D]">star</span>
              ओरिजिनल कॉम्बो पैकाज
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden bg-[#FAFAF3] flex items-center justify-center relative">
              {!imageError ? (
                <img
                  src={LANDING_CONTENT.hero.productImage}
                  alt={LANDING_CONTENT.hero.productAlt}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="p-6 text-center">
                  <span className="material-symbols-outlined text-5xl text-[#1B4D1B] mb-2">inventory_2</span>
                  <p className="font-bold text-[#0D2B0D]">आरोग्य बायो गाउटहेल्थ कॉम्बो</p>
                  <p className="text-xs text-gray-500 mt-1">ऑयल 100ml + कैप्सूल 30 पीस</p>
                </div>
              )}
            </div>

            {/* Bottom Combo Highlights */}
            <div className="mt-3 bg-[#EEEEE7] p-3 rounded-xl flex justify-between items-center text-xs font-bold text-[#0D2B0D]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                <span>100ml ऑयल</span>
              </div>
              <span className="text-[#B8860B]">+</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#2E7D32]" />
                <span>30 कैप्सूल</span>
              </div>
              <span className="text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                पूर्ण इलाज
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
