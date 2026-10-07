import React, { useState } from 'react';
import { Star, ChevronDown, CheckCircle2 } from 'lucide-react';

export const TrustFaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does it work?',
      a: 'The KOSNORA case has a battery-free smart display on the back. It receives any image from your phone via passive NFC in seconds with zero power consumption.',
    },
    {
      q: 'Can I use my own picture?',
      a: 'Yes. You can use any photo or wallpaper from your photo library — portraits, couple shots, pets, or custom art.',
    },
    {
      q: 'Does it need a battery?',
      a: 'No. The case is 100% battery-free. It requires no charging, cables, or internal battery. The image stays visible forever.',
    },
    {
      q: 'Which iPhone models are supported?',
      a: 'KOSNORA supports iPhone 17, 16, 15, 14, and 12 series, including Pro and Pro Max models. Select your model in the offer section.',
    },
    {
      q: 'How long does shipping take?',
      a: 'Orders ship within 24–48 hours. Standard US delivery takes 3–7 business days with tracking included.',
    },
  ];

  return (
    <section id="faq" className="bg-white text-neutral-900 py-12 sm:py-20 border-b border-neutral-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-1 text-[#9333EA] mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#9333EA]" />
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 mb-1">
            TRUSTED BY OWNERS
          </h2>

          <p className="text-xs sm:text-sm font-semibold text-neutral-600 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#9333EA]" />
            <span>4.9 / 5.0 Rating · 1,240+ Verified Purchases</span>
          </p>
        </div>

        {/* Compact FAQ (Max 5 Questions) */}
        <div>
          <h3 className="text-xs font-black uppercase tracking-widest text-[#9333EA] text-center mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h3>

          <div className="space-y-2.5">
            {faqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-neutral-200 bg-white/70 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left px-4 sm:px-5 py-3.5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-neutral-900 cursor-pointer hover:bg-neutral-100/60"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#9333EA] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-3.5 pt-1 text-xs sm:text-sm text-neutral-600 font-medium leading-relaxed border-t border-neutral-200/60">
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
