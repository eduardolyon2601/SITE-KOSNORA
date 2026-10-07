import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FinalCtaSectionProps {
  onCtaClick: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({ onCtaClick }) => {
  return (
    <section className="bg-white text-neutral-900 py-12 sm:py-16 border-b border-neutral-200">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-950 mb-2">
          MAKE YOUR PHONE YOURS.
        </h2>

        <p className="text-base sm:text-lg font-semibold text-neutral-600 mb-6">
          Change your look whenever you want.
        </p>

        <button
          onClick={onCtaClick}
          className="inline-flex items-center justify-center gap-2.5 px-10 py-4.5 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white font-black text-sm tracking-widest uppercase rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-102 active:scale-95 cursor-pointer"
        >
          <span>GET YOUR KOSNORA</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </section>
  );
};
