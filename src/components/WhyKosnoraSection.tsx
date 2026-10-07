import React from 'react';
import { User, RefreshCcw, BatteryCharging, Sparkles } from 'lucide-react';

export const WhyKosnoraSection: React.FC = () => {
  const benefits = [
    {
      title: 'YOUR STYLE',
      desc: 'Make your phone feel truly yours.',
      icon: User,
    },
    {
      title: 'CHANGE ANYTIME',
      desc: 'Switch the image whenever you want.',
      icon: RefreshCcw,
    },
    {
      title: 'BATTERY-FREE',
      desc: 'No charging required for the display concept.',
      icon: BatteryCharging,
    },
    {
      title: 'STAND OUT',
      desc: 'A phone case unlike ordinary cases.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="benefits" className="bg-white text-neutral-900 py-12 sm:py-16 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-black tracking-widest text-[#9333EA] uppercase block mb-1">
            KEY BENEFITS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950">
            WHY KOSNORA
          </h2>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="bg-white border border-neutral-200 hover:border-[#9333EA]/40 rounded-2xl p-6 transition-all shadow-xs hover:shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-center text-[#9333EA] mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-black text-neutral-950 uppercase tracking-wide mb-1.5">
                  {b.title}
                </h3>

                <p className="text-sm font-semibold text-neutral-600 leading-snug">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
