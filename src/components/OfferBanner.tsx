import React from 'react';
import { LANDING_CONTENT } from '../data/landingData';

export const OfferBanner: React.FC = () => {
  return (
    <section className="bg-[#0D2B0D] text-white py-10 sm:py-14 px-4 relative overflow-hidden my-8">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0D2B0D] via-[#1B4D1B] to-[#0D2B0D] opacity-90" />
      
      {/* Subtle Leaf Ornament Graphic Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FDC34D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-2 bg-[#FDC34D] text-[#271900] px-4 py-1.5 rounded-full text-xs sm:text-sm font-extrabold mb-4 shadow-sm animate-bounce">
          <span className="material-symbols-outlined text-base">local_fire_department</span>
          <span>{LANDING_CONTENT.offerBanner.badge}</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#FDC34D] mb-3 leading-tight">
          {LANDING_CONTENT.offerBanner.title}
        </h2>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl font-medium text-white/95 mb-6">
          {LANDING_CONTENT.offerBanner.subtitle}
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#order-form"
            className="bg-[#B8860B] hover:bg-[#996e08] text-white font-bold text-lg sm:text-xl py-3.5 px-8 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>अभी फॉर्म भरें और डिस्काउंट पाएं</span>
            <span className="material-symbols-outlined text-xl">shopping_bag</span>
          </a>
        </div>

        {/* Urgency Footer Note */}
        <p className="text-xs sm:text-sm text-white/70 mt-4 flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-base text-[#FDC34D]">inventory</span>
          <span>{LANDING_CONTENT.offerBanner.urgencyText}</span>
        </p>

      </div>
    </section>
  );
};
