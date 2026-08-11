import React, { useState } from 'react';
import { LANDING_CONTENT } from '../data/landingData';
import { submitLead, validateIndianPhone } from '../services/leadService';
import { LeadFormData, LeadSubmissionResponse } from '../types';

export const LeadForm: React.FC = () => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState<LeadSubmissionResponse | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, phone: value }));
    setPhoneError(null);
    setGeneralError(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, name: value }));
    setNameError(null);
    setGeneralError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);
    setGeneralError(null);

    // Validate Name
    if (!formData.name || formData.name.trim().length < 2) {
      setNameError('कृपया अपना पूरा नाम दर्ज करें');
      return;
    }

    // Validate Indian Phone
    const phoneVal = validateIndianPhone(formData.phone);
    if (!phoneVal.isValid) {
      setPhoneError('कृपया 10 अंकों का सही भारतीय मोबाइल नंबर दर्ज करें (उदा. 9876543210)');
      return;
    }

    setLoading(true);

    try {
      const response = await submitLead({
        name: formData.name.trim(),
        phone: formData.phone
      });

      setSubmitResult(response);
      setFormData({ name: '', phone: '' }); // Reset form on success
    } catch (err: any) {
      console.error('Lead submission error:', err);
      setGeneralError(err?.message || LANDING_CONTENT.formSection.errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="order-form" className="py-12 sm:py-16 px-4 bg-[#FAFAF3] relative scroll-mt-20">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-radial from-[#1B4D1B]/5 to-transparent pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10">
        
        {/* Form Container Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgba(27,77,27,0.12)] border-2 border-[#1B4D1B]/20">
          
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 bg-[#EEEEE7] text-[#1B4D1B] px-3.5 py-1 rounded-full text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-sm text-[#B8860B]">verified</span>
              <span>कैश ऑन डिलीवरी (COD) उपलब्ध</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D2B0D]">
              {LANDING_CONTENT.formSection.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#41493F] mt-1">
              {LANDING_CONTENT.formSection.subtitle}
            </p>
          </div>

          {/* Success State Notification */}
          {submitResult && submitResult.success && (
            <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-col items-center text-center animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-3 shadow-md">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h3 className="font-extrabold text-lg mb-1">
                धन्यवाद!
              </h3>
              <p className="text-sm leading-relaxed mb-3">
                {LANDING_CONTENT.formSection.successMessage}
              </p>
              
              {/* Submission Summary */}
              {submitResult.payload && (
                <div className="w-full bg-white/80 p-3 rounded-xl text-left text-xs text-emerald-900 border border-emerald-200/60 font-mono space-y-1">
                  <div><strong>नाम:</strong> {submitResult.payload.name}</div>
                  <div><strong>फ़ोन:</strong> {submitResult.payload.phone}</div>
                  <div><strong>समय:</strong> {submitResult.payload.created}</div>
                  <div><strong>चैनल:</strong> {submitResult.payload.channel} ({submitResult.payload.source})</div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setSubmitResult(null)}
                className="mt-4 text-xs font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
              >
                + नया ऑर्डर फॉर्म भरें
              </button>
            </div>
          )}

          {/* Error Banner */}
          {generalError && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2">
              <span className="material-symbols-outlined text-lg text-red-600 shrink-0 mt-0.5">error</span>
              <div className="flex-1">
                <p className="font-bold">{generalError}</p>
                <p className="text-xs text-red-600 mt-0.5">कृपया अपना मोबाइल नंबर जांच कर पुनः प्रयास करें।</p>
              </div>
            </div>
          )}

          {/* Actual Enquiry Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Field */}
            <div>
              <label htmlFor="lead-name" className="block text-xs sm:text-sm font-bold text-[#0D2B0D] mb-1.5">
                {LANDING_CONTENT.formSection.nameLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#72796E]">
                  <span className="material-symbols-outlined text-xl">person</span>
                </div>
                <input
                  id="lead-name"
                  type="text"
                  required
                  disabled={loading}
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder={LANDING_CONTENT.formSection.namePlaceholder}
                  className={`block w-full pl-11 pr-4 py-3 bg-[#FAFAF3] border ${nameError ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C1C9BB] focus:border-[#1B4D1B] focus:bg-white'} rounded-xl text-sm font-medium text-[#1A1C18] focus:outline-none transition-colors`}
                />
              </div>
              {nameError && (
                <p className="text-xs text-red-600 mt-1 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">warning</span>
                  {nameError}
                </p>
              )}
            </div>

            {/* Phone Number Field */}
            <div>
              <label htmlFor="lead-phone" className="block text-xs sm:text-sm font-bold text-[#0D2B0D] mb-1.5">
                {LANDING_CONTENT.formSection.phoneLabel} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#72796E]">
                  <span className="material-symbols-outlined text-xl">call</span>
                </div>
                
                {/* +91 Country Tag */}
                <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none text-xs font-bold text-[#1B4D1B]">
                  +91
                </div>

                <input
                  id="lead-phone"
                  type="tel"
                  required
                  disabled={loading}
                  maxLength={13}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder={LANDING_CONTENT.formSection.phonePlaceholder}
                  className={`block w-full pl-20 pr-4 py-3 bg-[#FAFAF3] border ${phoneError ? 'border-red-500 ring-1 ring-red-500' : 'border-[#C1C9BB] focus:border-[#1B4D1B] focus:bg-white'} rounded-xl text-sm font-medium text-[#1A1C18] focus:outline-none transition-colors`}
                />
              </div>
              {phoneError ? (
                <p className="text-xs text-red-600 mt-1 font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs">warning</span>
                  {phoneError}
                </p>
              ) : (
                <p className="text-[11px] text-[#72796E] mt-1">
                  उदा. 9876543210 (10 अंकों का नंबर)
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B8860B] hover:bg-[#996e08] disabled:bg-gray-400 text-white font-extrabold text-base sm:text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex justify-center items-center gap-2 cursor-pointer pulse-btn mt-6"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{LANDING_CONTENT.formSection.submittingText}</span>
                </>
              ) : (
                <>
                  <span>{LANDING_CONTENT.formSection.submitButton}</span>
                  <span className="material-symbols-outlined text-xl">shopping_cart_checkout</span>
                </>
              )}
            </button>

            {/* Security Guarantee Note */}
            <p className="text-center text-xs text-[#72796E] pt-2 flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#2E7D32]">lock</span>
              <span>{LANDING_CONTENT.formSection.securityNote}</span>
            </p>

          </form>

        </div>

      </div>
    </section>
  );
};
