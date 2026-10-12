import React, { useRef, useState, useEffect } from 'react';
import { Star, CheckCircle, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll loop for infinite carousel effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let lastTimestamp: number = performance.now();
    const speed = 0.55;

    const step = (now: number) => {
      const delta = now - lastTimestamp;
      lastTimestamp = now;

      if (!isPaused && container) {
        container.scrollLeft += delta * 0.05 * speed;

        const halfScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= halfScroll) {
          container.scrollLeft = container.scrollLeft - halfScroll;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  // Duplicate items for continuous infinite scroll
  const duplicatedReviews = [...REVIEWS_DATA, ...REVIEWS_DATA];

  return (
    <section
      id="reviews"
      className="bg-[#FCFCFD] text-neutral-900 py-10 sm:py-14 border-b border-neutral-200 relative overflow-hidden"
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

          {/* Rating Presentation (4.7 / 5) & Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Visual rating score: 4.7 / 5 */}
            <div className="flex items-center gap-2.5 bg-white border border-neutral-200 px-3.5 py-2 rounded-xl shadow-xs">
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
            </div>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleScrollLeft}
                className="w-8.5 h-8.5 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-[#9333EA] hover:border-[#9333EA] transition-all cursor-pointer active:scale-95 shadow-2xs"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                className="w-8.5 h-8.5 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-[#9333EA] hover:border-[#9333EA] transition-all cursor-pointer active:scale-95 shadow-2xs"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Carousel Track */}
      <div
        className="w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 py-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {duplicatedReviews.map((review, idx) => (
            <article
              key={`${review.id}-${idx}`}
              className="flex-shrink-0 w-[250px] sm:w-[270px] bg-white border border-neutral-200 hover:border-[#9333EA]/40 rounded-2xl p-3.5 sm:p-4 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col justify-between group"
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
                  />
                  <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded-md border border-black/5 text-[9px] font-bold text-neutral-700 truncate">
                    <span>{review.productName}</span>
                  </div>
                </div>

                {/* 3. DEPOIMENTO CURTO E OBJETIVO (2-3 linhas, legível e direto) */}
                <p className="text-xs text-neutral-700 leading-relaxed font-medium line-clamp-3">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
              </div>

              {/* Verified badge tag */}
              <div className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-bold text-neutral-400">
                <span className="text-emerald-600 font-extrabold">Verified Buyer</span>
                <span className="text-[#9333EA] font-semibold">KOSNORA</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
