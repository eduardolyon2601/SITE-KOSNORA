import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, Filter, MessageSquare } from 'lucide-react';
import coupleImg from '../assets/images/kosnora_couple_look_1791272221398.jpg';
import petImg from '../assets/images/kosnora_pet_look_1791272230677.jpg';
import travelImg from '../assets/images/kosnora_travel_art_1791272238854.jpg';
import heroImg from '../assets/images/kosnora_hero_case_1791272211390.jpg';

export const ReviewsCommunitySection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'photo' | 'verified'>('all');

  const customerReviews = [
    {
      id: 1,
      author: 'Marcus K.',
      model: 'iPhone 16 Pro Max',
      color: 'Obsidian Black',
      date: '3 days ago',
      verified: true,
      rating: 5,
      title: 'Looks insane in person — everyone asks about it',
      content:
        'Sent a black and white portrait of my girlfriend to the back of the case. The e-ink display has this really clean matte texture that doesn’t smudge or reflect glare. Battery-free thing is legitimately magical.',
      image: coupleImg,
      helpful: 24,
    },
    {
      id: 2,
      author: 'Elena R.',
      model: 'iPhone 15 Pro',
      color: 'Titanium Gray',
      date: '1 week ago',
      verified: true,
      rating: 5,
      title: 'My French Bulldog on my phone at all times',
      content:
        'I hated normal printed phone cases because they fade after 2 months. Being able to update my pup’s photo whenever I take a cute new shot makes this the best phone accessory I’ve ever bought.',
      image: petImg,
      helpful: 19,
    },
    {
      id: 3,
      author: 'David S.',
      model: 'iPhone 17 Pro',
      color: 'Midnight Navy',
      date: '2 weeks ago',
      verified: true,
      rating: 5,
      title: 'Minimalist tech at its absolute best',
      content:
        'No cables, no pairing codes, no bluetooth battery drain. Open the app, crop your wallpaper or photo, hold near the NFC chip for 4 seconds, and boom. Done. Case build quality is also very solid with raised camera lips.',
      image: travelImg,
      helpful: 31,
    },
    {
      id: 4,
      author: 'Chloe M.',
      model: 'iPhone 16',
      color: 'Cloud White',
      date: '3 weeks ago',
      verified: true,
      rating: 5,
      title: 'Got the 2-case bundle for me and my boyfriend',
      content:
        'We both love customizing our cases for date nights and trips. Super tactile buttons, feels lightweight yet durable, and the screen stays on even when the phone is turned completely off.',
      image: heroImg,
      helpful: 14,
    },
  ];

  return (
    <section id="reviews" className="bg-[#050508] text-white py-16 sm:py-24 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-black tracking-widest text-[#C084FC] uppercase block mb-2">
            COMMUNITY & VERIFIED BUYERS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            WHAT OWNERS ARE SAYING
          </h2>
          <p className="text-sm sm:text-base font-semibold text-neutral-400">
            Real feedback from people who turned their phone case into an everyday canvas.
          </p>
        </div>

        {/* Rating Overview Box (Rooog Style Scorecard) */}
        <div className="max-w-4xl mx-auto bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="text-center md:text-left">
              <span className="text-5xl sm:text-6xl font-black text-white leading-none">
                4.9
              </span>
              <div className="flex items-center justify-center md:justify-start text-[#C084FC] mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#C084FC]" />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-400 mt-1 block">
                Based on 1,240+ verified ratings
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300">
              <CheckCircle className="w-4 h-4 text-[#C084FC]" />
              <span>98% Recommend Rate</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300">
              <CheckCircle className="w-4 h-4 text-[#C084FC]" />
              <span>100% Fit Guarantee</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {customerReviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl bg-neutral-950 border border-neutral-800/90 p-5 sm:p-6 flex flex-col justify-between hover:border-[#A855F7]/40 transition-colors"
            >
              <div>
                {/* Header with Star Rating and Author */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-[#C084FC]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C084FC]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {rev.date}
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-black text-sm text-white">{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C084FC] bg-[#A855F7]/10 px-2 py-0.5 rounded-full border border-[#A855F7]/20">
                      <CheckCircle className="w-3 h-3" />
                      <span>Verified Buyer</span>
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-3">
                  {rev.model} · {rev.color}
                </div>

                <h4 className="font-extrabold text-sm sm:text-base text-white mb-2 leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed mb-4">
                  {rev.content}
                </p>
              </div>

              {/* Review Photo Attachment */}
              <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
                {rev.image && (
                  <div className="flex items-center gap-2">
                    <img
                      src={rev.image}
                      alt="Customer case photo"
                      className="w-10 h-10 rounded-lg object-cover border border-neutral-800"
                      loading="lazy"
                    />
                    <span className="text-[11px] font-semibold text-neutral-400">
                      Photo attached
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold ml-auto">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.helpful})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
