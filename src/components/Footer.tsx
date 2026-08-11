import React from 'react';
import { LANDING_CONTENT } from '../data/landingData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#EEEEE7] py-12 sm:py-16 px-4 border-t border-[#E8E8DF] text-center mb-16 md:mb-0">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-6">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#1B4D1B] text-[#FDC34D] flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">spa</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0D2B0D]">
            {LANDING_CONTENT.footer.brandName}
          </h2>
        </div>

        {/* Quality Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {LANDING_CONTENT.footer.badges.map((badge, idx) => (
            <span
              key={idx}
              className="bg-white px-3.5 py-1 rounded-full text-xs font-bold text-[#0D2B0D] border border-[#E8E8DF] shadow-2xs flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm text-[#2E7D32]">verified</span>
              {badge}
            </span>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs sm:text-sm text-[#72796E] max-w-2xl leading-relaxed">
          {LANDING_CONTENT.footer.disclaimer}
        </p>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-semibold text-[#41493F]">
          {LANDING_CONTENT.footer.links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="hover:text-[#1B4D1B] transition-colors"
              onClick={(e) => e.preventDefault()}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-[#72796E] pt-4 border-t border-[#C1C9BB]/30 w-full max-w-md">
          {LANDING_CONTENT.footer.copyright}
        </p>

      </div>
    </footer>
  );
};
