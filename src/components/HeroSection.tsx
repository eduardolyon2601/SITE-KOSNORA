import React, { useState } from 'react';
import { ArrowRight, Check, Star, ShieldCheck, Zap } from 'lucide-react';
import heroImg from '../assets/images/kosnora_hero_case_1791272211390.jpg';
import coupleImg from '../assets/images/kosnora_couple_look_1791272221398.jpg';
import petImg from '../assets/images/kosnora_pet_look_1791272230677.jpg';
import travelImg from '../assets/images/kosnora_travel_art_1791272238854.jpg';

interface HeroSectionProps {
  onCtaClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick }) => {
  const previewOptions = [
    { id: 'art', label: 'Minimalist', src: heroImg },
    { id: 'couple', label: 'Couple', src: coupleImg },
    { id: 'pet', label: 'Pet', src: petImg },
    { id: 'travel', label: 'Travel', src: travelImg },
  ];

  const [activePreview, setActivePreview] = useState(0);

  return (
    <section className="bg-white text-neutral-900 pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Direct-Response Buy & Conversion Column (Inspired by perksupply.store clean layout) */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Social Proof Star Rating Tag */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-xs font-bold text-neutral-800">
              <div className="flex items-center text-[#9333EA]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#9333EA]" />
                ))}
              </div>
              <span className="text-[11px] font-black uppercase text-[#9333EA] tracking-wider">
                140+ Happy Customers
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-950 uppercase leading-[1.05] mb-3">
              YOUR PHONE.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8]">
                YOUR LOOK.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-neutral-600 font-semibold leading-relaxed max-w-lg mb-6">
              Change the picture on your phone whenever you want — in just 5 minutes.
            </p>

            {/* 3 Core Benefits */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center lg:items-start gap-2.5 sm:gap-3 mb-8 text-xs sm:text-sm font-bold text-neutral-800">
              <div className="inline-flex items-center gap-2 bg-white border border-neutral-200 px-3.5 py-2 rounded-xl shadow-2xs">
                <span className="w-4 h-4 rounded-full bg-[#9333EA] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>Personalize your phone</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white border border-neutral-200 px-3.5 py-2 rounded-xl shadow-2xs">
                <span className="w-4 h-4 rounded-full bg-[#9333EA] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>Change image anytime</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white border border-neutral-200 px-3.5 py-2 rounded-xl shadow-2xs">
                <span className="w-4 h-4 rounded-full bg-[#9333EA] text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                <span>No battery required</span>
              </div>
            </div>

            {/* Direct CTA Button + Pricing Badge */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-4 mb-4">
              <button
                type="button"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-10 py-4.5 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white font-black text-sm tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-102 active:scale-95 flex items-center justify-center gap-2.5 uppercase cursor-pointer"
              >
                <span>GET YOUR KOSNORA</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="text-center sm:text-left">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-neutral-950">$59.90</span>
                  <span className="text-xs font-bold text-neutral-400 line-through">$79.90</span>
                  <span className="text-[10px] font-black uppercase text-[#9333EA] bg-[#FAF5FF] px-2 py-0.5 rounded-full border border-[#E9D5FF]">
                    SAVE 50% ON BUNDLE
                  </span>
                </div>
                <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                  Battery-Free NFC Smart Case
                </span>
              </div>
            </div>

            {/* Quick Guarantees (perksupply style) */}
            <div className="flex items-center gap-4 text-xs font-semibold text-neutral-500 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#9333EA]" />
                <span>30-Day Fit Guarantee</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#9333EA]" />
                <span>Zero Battery Draw</span>
              </span>
            </div>
          </div>

          {/* Right: Product Hero Image Gallery (Interactive switch) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-neutral-200 shadow-xl group">
              <img
                src={previewOptions[activePreview].src}
                alt={previewOptions[activePreview].label}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                Display: {previewOptions[activePreview].label}
              </div>
            </div>

            {/* Thumbnails Swatches */}
            <div className="flex items-center gap-2.5 mt-4">
              <span className="text-[11px] font-bold text-neutral-500 uppercase mr-1">Preview look:</span>
              {previewOptions.map((opt, idx) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setActivePreview(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activePreview === idx
                      ? 'bg-[#9333EA] text-white shadow-xs scale-105'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
