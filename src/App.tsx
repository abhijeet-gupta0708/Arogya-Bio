import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { KeyBenefits } from './components/KeyBenefits';
import { Ingredients } from './components/Ingredients';
import { OfferBanner } from './components/OfferBanner';
import { HowToUse } from './components/HowToUse';
import { Testimonials } from './components/Testimonials';
import { LeadForm } from './components/LeadForm';
import { MobileStickyCta } from './components/MobileStickyCta';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FAFAF3] text-[#1A1C18] flex flex-col font-body leaf-pattern antialiased selection:bg-[#B8860B] selection:text-white">
      
      {/* Top Bar & Header */}
      <Header />

      {/* Main Page Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Key Benefits Strip */}
        <KeyBenefits />

        {/* 3. Ingredients Section */}
        <Ingredients />

        {/* 4. Offer & Urgency Banner */}
        <OfferBanner />

        {/* 5. How To Use Section */}
        <HowToUse />

        {/* 6. Customer Testimonials */}
        <Testimonials />

        {/* 7. Working Lead Enquiry Form */}
        <LeadForm />

      </main>

      {/* Footer */}
      <Footer />

      {/* Sticky Bottom CTA for Mobile Browsers */}
      <MobileStickyCta />

    </div>
  );
}
