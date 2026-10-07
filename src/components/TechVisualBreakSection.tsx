import React from 'react';
import { Zap, Shield, Sparkles, Smartphone, ArrowRight } from 'lucide-react';
import heroImg from '../assets/images/kosnora_hero_case_1791272211390.jpg';
import closeUpImg from '../assets/images/kosnora_close_up_1791329422710.jpg';

interface TechVisualBreakSectionProps {
  onCtaClick: () => void;
}

export const TechVisualBreakSection: React.FC<TechVisualBreakSectionProps> = ({ onCtaClick }) => {
  return (
    <section id="tech" className="bg-black text-white py-20 sm:py-32 border-b border-neutral-900 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#8015F5]/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Massive Rooog-Style Statement Headline */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950 border border-[#A855F7]/40 text-[#C084FC] text-xs font-black tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Zap className="w-3.5 h-3.5 fill-[#C084FC]" />
            <span>THE DISPLAY REVOLUTION</span>
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.98] text-white">
            SAME PHONE.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E9D5FF] to-[#C084FC] drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">
              DIFFERENT ENERGY.
            </span>
          </h2>

          <p className="text-base sm:text-xl font-semibold text-neutral-300 max-w-2xl mx-auto mt-6 leading-relaxed">
            Standard phone cases lock you into one single look forever. KOSNORA unlocks a permanent smart ink display on your back cover with zero battery draw.
          </p>
        </div>

        {/* 2-Column Split: Macro Visual & Tech Spec Callouts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Close-Up Visual Card */}
          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl group">
            <img
              src={closeUpImg}
              alt="KOSNORA Precision Engineering"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <span className="text-xs font-black tracking-widest text-[#C084FC] uppercase mb-1">
                COMPOSITE ARMOR × SMART SCREEN
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase">
                Zero Charging. Permanent View.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-medium mt-1">
                Image remains visible in direct sunlight and in total darkness with no battery loss.
              </p>
            </div>
          </div>

          {/* Right: 4 Tech Breakdown Features */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-[#A855F7]/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#C084FC]">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="font-black text-lg text-white uppercase tracking-tight">
                  100% Passive NFC Energy
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed pl-12">
                No lithium-ion batteries or charging cables. It momentarily pulls microscopic energy during the 3-second transmission, then stays on indefinitely.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-[#A855F7]/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#C084FC]">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="font-black text-lg text-white uppercase tracking-tight">
                  Mil-Grade Impact Protection
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed pl-12">
                Engineered with raised bezels for camera lens protection and high-density TPU corners that absorb everyday impacts from up to 1.5 meters.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-[#A855F7]/50 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#C084FC]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h4 className="font-black text-lg text-white uppercase tracking-tight">
                  Seamless iPhone Integration
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed pl-12">
                Form-fitted for selected iPhone models from iPhone 12 to 17 Pro Max, maintaining wireless charging compatibility and smooth button clicks.
              </p>
            </div>

            {/* Quick Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#9333EA] via-[#A855F7] to-[#7E22CE] text-white font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>CHOOSE YOUR CASE NOW</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
