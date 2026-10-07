import React from 'react';
import { Star } from 'lucide-react';
import coupleImg from '../assets/images/kosnora_couple_look_1791272221398.jpg';
import petImg from '../assets/images/kosnora_pet_look_1791272230677.jpg';
import travelImg from '../assets/images/kosnora_travel_art_1791272238854.jpg';
import heroImg from '../assets/images/kosnora_hero_case_1791272211390.jpg';

export const SocialProofSection: React.FC = () => {
  const visuals = [
    {
      img: heroImg,
      title: 'Monochrome Portrait',
      type: 'Studio Product Shot',
    },
    {
      img: coupleImg,
      title: 'Couple Snapshot',
      type: 'Lifestyle Moment',
    },
    {
      img: petImg,
      title: 'Pet Keepsake',
      type: 'Daily Companion',
    },
    {
      img: travelImg,
      title: 'Travel Landscape',
      type: 'Curated Artwork',
    },
  ];

  return (
    <section className="bg-[#050508] text-white py-16 sm:py-24 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Trust Statement */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 mb-3 text-[#C084FC]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#C084FC]" />
            ))}
          </div>

          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
            SEEN ON EVERYDAY SCREENS
          </h2>

          <p className="text-base sm:text-lg font-bold text-neutral-300">
            Designed for people who want their phone to feel different.
          </p>
        </div>

        {/* Visual Product & Lifestyle Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12">
          {visuals.map((v, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-[4/5] hover:border-[#A855F7]/50 transition-all"
            >
              <img
                src={v.img}
                alt={v.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3 sm:p-4">
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#C084FC] uppercase">
                  {v.type}
                </span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {v.title}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Clean Customer Feedback Placeholders (Honest & Ready for Verified Reviews) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {[
            { tag: 'Couple Memory', text: 'Transferred a date night photo straight to the case screen. Everyone asks where I got it.' },
            { tag: 'Pet Portrait', text: 'My dog is right there on the back of my phone wherever I set it down. Zero battery loss.' },
            { tag: 'Daily Minimalist', text: 'Switching wallpapers without changing cases feels like a brand new iPhone every week.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-neutral-950 border border-neutral-800/80 p-4 sm:p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-2.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-[#C084FC] text-[#C084FC]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed italic mb-3">
                  "{item.text}"
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-500 font-semibold pt-3 border-t border-neutral-900">
                <span>Verified Buyer</span>
                <span className="text-[#C084FC] font-bold">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
