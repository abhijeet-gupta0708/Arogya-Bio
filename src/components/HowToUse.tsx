import React from 'react';
import { LANDING_CONTENT } from '../data/landingData';

export const HowToUse: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 max-w-[1200px] mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#2E7D32] bg-[#EEEEE7] px-3.5 py-1 rounded-full border border-[#2E7D32]/20">
          सरल एवं सटीक विधि
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#0D2B0D] mt-3">
          {LANDING_CONTENT.howToUse.title}
        </h2>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
        {LANDING_CONTENT.howToUse.steps.map((step, idx) => (
          <div
            key={step.stepNumber}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8DF] shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow relative flex flex-col items-center text-center group"
          >
            {/* Step Number Circle */}
            <div className="w-14 h-14 rounded-full bg-[#B8860B] text-white font-extrabold text-2xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
              {step.stepNumber}
            </div>

            {/* Icon */}
            <div className="flex items-center gap-2 text-[#1B4D1B] font-bold text-lg mb-2">
              <span className="material-symbols-outlined text-2xl text-[#2E7D32]">
                {step.icon}
              </span>
              <h3>{step.title}</h3>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#41493F] leading-relaxed">
              {step.desc}
            </p>

            {/* Connection line indicator on desktop */}
            {idx < LANDING_CONTENT.howToUse.steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 translate-x-1/2 -translate-y-1/2 z-10 text-[#B8860B]/40">
                <span className="material-symbols-outlined text-3xl">chevron_right</span>
              </div>
            )}
          </div>
        ))}
      </div>

    </section>
  );
};
