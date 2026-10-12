import React, { useState } from 'react';
import { Star, CheckCircle, Heart } from 'lucide-react';

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  verified: boolean;
  avatarUrl: string;
  productImageUrl: string;
  productName: string;
  reviewText: string;
  rating: number;
}

export const REVIEWS_DATA: CustomerReview[] = [
  {
    id: 'review-1',
    name: 'Sarah M.',
    location: 'Miami, FL',
    verified: true,
    avatarUrl: 'https://i.postimg.cc/0N3FkmyD/Whats-App-Image-2026-10-10-at-01-38-27.jpg',
    productImageUrl: 'https://i.postimg.cc/zfM6zWGb/Whats-App-Image-2026-10-09-at-02-08-45.jpg',
    productName: 'Black Personalized Phone Case',
    reviewText: 'Love how quickly I can change the picture. Super easy to use!',
    rating: 5,
  },
  {
    id: 'review-2',
    name: 'Emily',
    location: 'Austin, TX',
    verified: true,
    avatarUrl: 'https://i.postimg.cc/s28qjSgh/Whats-App-Image-2026-10-10-at-01-30-48.jpg',
    productImageUrl: 'https://i.postimg.cc/XvhmjFYy/Whats-App-Image-2026-10-09-at-02-20-20.jpg',
    productName: 'White Personalized Phone Case',
    reviewText: 'Adding my favorite photo was fast, simple, and really fun.',
    rating: 5,
  },
  {
    id: 'review-3',
    name: 'Olivia C.',
    location: 'Seattle, WA',
    verified: true,
    avatarUrl: 'https://i.postimg.cc/cJj2xYLt/Whats-App-Image-2026-10-10-at-01-30-48-(1).jpg',
    productImageUrl: 'https://i.postimg.cc/q7YSJnvK/Whats-App-Image-2026-10-09-at-02-08-58.jpg',
    productName: 'White Personalized Phone Case',
    reviewText: 'The customization is so convenient. I can change the look anytime!',
    rating: 5,
  },
  {
    id: 'review-4',
    name: 'Tyler B.',
    location: 'Denver, CO',
    verified: true,
    avatarUrl: 'https://i.postimg.cc/hjdwfjXh/Whats-App-Image-2026-10-10-at-01-42-00.jpg',
    productImageUrl: 'https://i.postimg.cc/V6CTd6JS/Whats-App-Image-2026-10-10-at-01-54-00.jpg',
    productName: 'Black Personalized Phone Case',
    reviewText: 'Great design and easy personalization. Really practical!',
    rating: 5,
  },
  {
    id: 'review-5',
    name: 'Marcus V.',
    location: 'San Diego, CA',
    verified: true,
    avatarUrl: 'https://i.postimg.cc/vBVjcB4T/Whats-App-Image-2026-10-10-at-01-42-00-(1).jpg',
    productImageUrl: 'https://i.postimg.cc/3Rv6dRk0/Whats-App-Image-2026-10-10-at-02-13-29.jpg',
    productName: 'Black Personalized Phone Case',
    reviewText: 'Such a cool way to keep my favorite memories on my phone.',
    rating: 5,
  },
];

export const ReviewsCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const renderCard = (review: CustomerReview, isClone: boolean, keyPrefix = '') => (
    <article
      key={`${keyPrefix}${review.id}`}
      className="flex-shrink-0 w-[260px] sm:w-[280px] bg-white border border-neutral-200 hover:border-[#9333EA]/40 rounded-2xl p-3.5 sm:p-4 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
      aria-hidden={isClone ? true : undefined}
      tabIndex={isClone ? -1 : undefined}
    >
      <div>
        {/* 1. TOP: AVATAR DO PRODUTO (Compacto: 36px circular com a capinha) */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative shrink-0">
              <img
                src={review.avatarUrl}
                alt={review.name}
                className="w-9 h-9 rounded-full object-contain p-0.5 bg-neutral-50 border border-purple-100 group-hover:border-[#9333EA] transition-colors"
                loading="lazy"
                draggable={false}
              />
              <span className="absolute -bottom-0.5 -right-0.5 bg-[#9333EA] text-white p-0.5 rounded-full ring-1 ring-white">
                <CheckCircle className="w-2.5 h-2.5 fill-[#9333EA] text-white" />
              </span>
            </div>

            <div className="min-w-0">
              <h3 className="font-extrabold text-xs text-neutral-900 tracking-tight truncate">
                {review.name}
              </h3>
              <div className="text-[10px] font-semibold text-neutral-500 truncate">
                {review.location}
              </div>
            </div>
          </div>

          {/* 5 Stars Rating */}
          <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* 2. IMAGEM PRINCIPAL DO REVIEW: Fotografia da Pessoa */}
        <div className="relative rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100 mb-2.5">
          <img
            src={review.productImageUrl}
            alt={review.name}
            className="w-full h-35 sm:h-38 object-cover transition-transform duration-300 group-hover:scale-103"
            loading="lazy"
            draggable={false}
          />
          <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-black/5 text-[9px] font-bold text-neutral-700 truncate">
            <span>{review.productName}</span>
          </div>
        </div>

        {/* 3. DEPOIMENTO CURTO E OBJETIVO */}
        <p className="text-xs text-neutral-700 leading-relaxed font-medium line-clamp-3">
          &ldquo;{review.reviewText}&rdquo;
        </p>
      </div>

      {/* Verified badge tag */}
      <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-bold text-neutral-400">
        <span className="text-emerald-600 font-extrabold">✓ Verified Buyer</span>
        <span className="text-[#9333EA] font-semibold">KOSNORA</span>
      </div>
    </article>
  );

  return (
    <section
      id="reviews"
      className="bg-[#FCFCFD] text-neutral-900 py-10 sm:py-14 border-t border-b border-neutral-200 relative overflow-hidden"
    >
      {/* Subtle Purple Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[220px] bg-purple-200/20 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Compact Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-7 gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-[#9333EA] text-[10px] font-black tracking-widest uppercase mb-2">
              <Heart className="w-3 h-3 fill-[#9333EA]" />
              <span>Customer Stories</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-neutral-950 leading-tight">
              Loved by Our Customers
            </h2>

            <p className="mt-1 text-sm sm:text-base text-neutral-600 font-medium italic">
              &ldquo;Your favorite memories, right on your phone.&rdquo;
            </p>
          </div>

          {/* Rating Presentation (4.7 / 5) — Zero manual arrows */}
          <div className="flex items-center self-start md:self-auto">
            <div className="flex items-center gap-2.5 bg-white border border-[#E9D5FF] px-3.5 py-2 rounded-xl shadow-xs">
              <div className="flex items-center gap-0.5 text-[#9333EA]">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#9333EA] text-[#9333EA]" />
                ))}
                {/* 5th star 70% filled for 4.7 score */}
                <div className="relative w-3.5 h-3.5">
                  <Star className="w-3.5 h-3.5 text-neutral-200 fill-neutral-200 absolute inset-0" />
                  <div className="overflow-hidden absolute inset-0 w-[70%]">
                    <Star className="w-3.5 h-3.5 fill-[#9333EA] text-[#9333EA]" />
                  </div>
                </div>
              </div>
              <div className="text-xs font-black text-neutral-900 leading-none">
                <span>4.7 / 5</span>
              </div>
              <span className="text-[10px] font-bold text-[#9333EA] uppercase tracking-wider bg-[#FAF5FF] px-1.5 py-0.5 rounded">
                Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee Track (Continuous Hardware-Accelerated 38s Loop, No Manual Drag) */}
      <div
        className="w-full overflow-hidden py-2"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 2.5%, black 97.5%, transparent 100%)',
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className="flex w-max select-none"
          style={{
            animation: 'kosnora-reviews-marquee 38s linear infinite',
            animationPlayState: isPaused ? 'paused' : 'running',
            willChange: 'transform',
          }}
        >
          {/* Group 1: Original Accessible Reviews Set */}
          <div className="flex gap-4 pr-4 shrink-0">
            {REVIEWS_DATA.map((review) => renderCard(review, false))}
          </div>

          {/* Group 2: Cloned Loop Set for Seamless Infinite Motion */}
          <div className="flex gap-4 pr-4 shrink-0" aria-hidden="true">
            {REVIEWS_DATA.map((review, idx) => renderCard(review, true, `clone-${idx}-`))}
          </div>
        </div>
      </div>
    </section>
  );
};

