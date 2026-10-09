import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_LIST } from '../data/productData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white text-neutral-900 py-12 sm:py-16 border-b border-neutral-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-black tracking-widest text-[#9333EA] uppercase block mb-1">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950">
            QUESTIONS & ANSWERS
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_LIST.map((faq, idx) => {
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
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#9333EA] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 font-medium">
                    {faq.answer}
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
