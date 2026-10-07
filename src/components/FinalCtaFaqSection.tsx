import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

interface FinalCtaFaqSectionProps {
  onCtaClick: () => void;
}

export const FinalCtaFaqSection: React.FC<FinalCtaFaqSectionProps> = ({ onCtaClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does it work?',
      a: 'The KOSNORA case features a battery-free smart display on the back. It receives your selected picture from your phone via passive NFC in seconds. The image stays on display indefinitely without using power.',
    },
    {
      q: 'Can I use my own picture?',
      a: 'Yes. You can use any photo from your phone gallery — portraits, couple shots, pets, wallpapers, or custom artwork.',
    },
    {
      q: 'Does it need a battery?',
      a: 'No. The case is 100% battery-free. It requires no charging, cables, or internal battery. Your phone also does not drain power.',
    },
    {
      q: 'Which iPhone models are supported?',
      a: 'KOSNORA supports iPhone 17, 16, 15, 14, and 12 series, including Pro and Pro Max models. Select your model before ordering.',
    },
    {
      q: 'How do I customize it?',
      a: 'Choose your picture, align the frame on your phone, and hold it near the case. The image updates in under 5 minutes.',
    },
    {
      q: 'How long does shipping take?',
      a: 'Orders are processed within 24–48 hours. Standard US delivery typically arrives in 3–7 business days with tracking included.',
    },
  ];

  return (
    <section id="faq" className="bg-[#050508] text-white py-16 sm:py-24 border-b border-neutral-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Final CTA Banner */}
        <div className="text-center rounded-3xl bg-neutral-950 border border-neutral-800 p-8 sm:p-14 mb-16 relative overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.1)]">
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#9333EA]/15 rounded-full blur-[100px] pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-3">
            MAKE YOUR PHONE YOURS.
          </h2>

          <p className="text-base sm:text-xl font-bold text-neutral-300 max-w-xl mx-auto mb-8">
            Change your look whenever you want.
          </p>

          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2.5 px-10 sm:px-14 py-4.5 bg-gradient-to-r from-[#9333EA] via-[#A855F7] to-[#7E22CE] hover:brightness-110 text-white font-black text-sm sm:text-base tracking-widest rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.45)] transition-all hover:scale-105 active:scale-95 uppercase cursor-pointer"
          >
            <span>GET YOUR KOSNORA</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Compact FAQ Section */}
        <div>
          <div className="text-center mb-10">
            <span className="text-xs font-black tracking-widest text-[#C084FC] uppercase block mb-1">
              QUESTIONS & ANSWERS
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
              FREQUENTLY ASKED
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-neutral-950 border border-neutral-800/90 overflow-hidden transition-colors hover:border-neutral-700"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C084FC] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-neutral-400 font-medium leading-relaxed border-t border-neutral-900 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
