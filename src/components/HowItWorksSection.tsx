import React from 'react';
import coupleImg from '../assets/images/kosnora_couple_look_1791272221398.jpg';
import petImg from '../assets/images/kosnora_pet_look_1791272230677.jpg';
import heroImg from '../assets/images/kosnora_hero_case_1791272211390.jpg';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'CHOOSE',
      desc: 'Choose the picture you want.',
      img: coupleImg,
      alt: 'Choose the picture you want',
    },
    {
      num: '02',
      title: 'SET',
      desc: 'Set up your KOSNORA case.',
      img: petImg,
      alt: 'Set up your KOSNORA case',
    },
    {
      num: '03',
      title: 'CHANGE',
      desc: 'Change your look whenever you want.',
      img: heroImg,
      alt: 'Change your look whenever you want',
    },
  ];

  return (
    <section id="how-it-works" className="bg-white text-neutral-900 py-12 sm:py-16 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-black tracking-widest text-[#9333EA] uppercase block mb-1">
            SIMPLE & FAST
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950">
            HOW IT WORKS
          </h2>
        </div>

        {/* 3 Step Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-black text-[#9333EA]">
                    {step.num}
                  </span>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                    Step {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-black text-neutral-950 uppercase mb-1">
                  {step.title}
                </h3>
                <p className="text-sm font-semibold text-neutral-600 mb-4">
                  {step.desc}
                </p>
              </div>

              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100">
                <img
                  src={step.img}
                  alt={step.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
