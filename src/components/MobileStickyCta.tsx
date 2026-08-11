import React from 'react';

export const MobileStickyCta: React.FC = () => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#E8E8DF] p-2.5 px-4 shadow-[0_-4px_15px_rgba(0,0,0,0.1)]">
      <a
        href="#order-form"
        className="w-full bg-[#B8860B] active:bg-[#996e08] text-white font-extrabold text-base py-3 px-6 rounded-xl shadow-md flex justify-center items-center gap-2 pulse-btn"
      >
        <span>अभी ऑर्डर करें (COD)</span>
        <span className="material-symbols-outlined text-xl">shopping_cart</span>
      </a>
    </div>
  );
};
