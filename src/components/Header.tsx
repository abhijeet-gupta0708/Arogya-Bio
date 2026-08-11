import React from 'react';
import { LANDING_CONTENT } from '../data/landingData';

export const Header: React.FC = () => {
  return (
    <>
      {/* Sticky Top Trust Bar */}
      <div className="bg-[#1B4D1B] text-white py-2 px-4 text-xs sm:text-sm font-semibold flex justify-center items-center gap-3 sm:gap-6 sticky top-0 z-50 shadow-md">
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-base text-[#FDC34D]">verified</span>
          {LANDING_CONTENT.trustBar.ayurvedic}
        </span>
        <span className="hidden sm:inline-block text-white/30">•</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-base text-[#FDC34D]">eco</span>
          {LANDING_CONTENT.trustBar.formula}
        </span>
        <span className="inline-block text-white/30">•</span>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-base text-[#FDC34D]">local_shipping</span>
          {LANDING_CONTENT.trustBar.cod}
        </span>
      </div>

      {/* Main Navbar */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#E8E8DF] sticky top-[33px] sm:top-[36px] w-full z-40 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex justify-between items-center">
          
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-[#1B4D1B] text-[#FDC34D] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">spa</span>
            </div>
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-[#7B5E10]">
                {LANDING_CONTENT.header.subtitle}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-[#0D2B0D] leading-tight">
                {LANDING_CONTENT.header.brandName}
              </h1>
            </div>
          </a>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            <a
              href="#order-form"
              className="bg-[#B8860B] hover:bg-[#996e08] text-white font-bold py-2.5 px-5 rounded-full shadow-md text-sm sm:text-base flex items-center gap-2 pulse-btn transition-colors"
            >
              <span>{LANDING_CONTENT.header.ctaText}</span>
              <span className="material-symbols-outlined text-lg">shopping_cart</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
};
