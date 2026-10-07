import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the KOSNORA case work?',
      a: 'The case features a built-in smart ink display on the back. It receives and refreshes your selected picture from your phone via passive NFC in seconds. The image remains visible continuously without drawing power.',
    },
    {
      q: 'Can I use my own pictures?',
      a: 'Yes. You can display any picture from your smartphone gallery — personal photos, couple portraits, pets, wallpapers, or custom artwork.',
    },
    {
      q: 'Does it require a battery?',
      a: 'No. The KOSNORA case is 100% battery-free. It requires no charging, internal batteries, or cables. The display retains your image permanently.',
    },
    {
      q: 'Which iPhone models are supported?',
      a: 'KOSNORA supports iPhone 17, 16, 15, 14, and 12 series, including Pro and Pro Max models. Select your exact model in the offer section above.',
    },
    {
      q: 'How do I order?',
      a: 'Select your iPhone model and quantity bundle in the offer section above, then tap Buy Now or Add to Cart to complete checkout.',
    },
  ];

  return (
    <section id="faq" className="bg-white text-neutral-900 py-12 sm:py-16 border-b border-neutral-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-black tracking-widest text-[#9333EA] uppercase block mb-1">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        {/* Accordion List (Max 5 Questions) */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-neutral-200 bg-white overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-4.5 flex items-center justify-between gap-4 font-black text-sm sm:text-base text-neutral-950 cursor-pointer hover:bg-neutral-50/70"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#9333EA] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5 pt-1 text-sm text-neutral-600 font-medium leading-relaxed border-t border-neutral-200/70">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
