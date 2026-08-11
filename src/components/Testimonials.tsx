import React from 'react';
import { LANDING_CONTENT } from '../data/landingData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 bg-[#EEEEE7] border-y border-[#E8E8DF]">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#2E7D32] bg-white px-3.5 py-1 rounded-full border border-[#2E7D32]/20">
            वास्तविक ग्राहक समीक्षाएं
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#0D2B0D] mt-3 mb-2">
            {LANDING_CONTENT.testimonials.title}
          </h2>
          <p className="text-sm sm:text-base text-[#41493F]">
            {LANDING_CONTENT.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {LANDING_CONTENT.testimonials.list.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs border border-[#E8E8DF] flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Star Ratings */}
                <div className="flex items-center gap-1 text-[#7B5800] mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-xl fill-current text-[#B8860B]">
                      star
                    </span>
                  ))}
                  <span className="ml-2 text-xs font-bold text-[#0D2B0D]">5.0 / 5.0</span>
                </div>

                {/* Review Quote */}
                <p className="text-sm sm:text-base text-[#41493F] italic leading-relaxed mb-6">
                  "{item.review}"
                </p>
              </div>

              {/* Reviewer Info */}
              <div className="pt-4 border-t border-[#E8E8DF] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B4D1B] text-[#FDC34D] font-bold text-lg flex items-center justify-center">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0D2B0D] text-sm sm:text-base">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#72796E]">{item.city}</p>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="flex items-center gap-1 text-[11px] font-semibold text-[#2E7D32] bg-[#FAFAF3] px-2.5 py-1 rounded-full border border-[#2E7D32]/20">
                  <span className="material-symbols-outlined text-sm">verified</span>
                  <span>{item.verified}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
