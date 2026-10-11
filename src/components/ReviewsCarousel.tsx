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
  tag: string;
  headline: string;
  reviewText: string;
  rating: number;
  date: string;
}

export const REVIEWS_DATA: CustomerReview[] = [
  {
    id: 'review-1',
    name: 'Sarah M.',
    location: 'Miami, FL',
    verified: true,
    avatarUrl: 'https://i.postimg.cc/zfM6zWGb/Whats-App-Image-2026-10-09-at-02-08-45.jpg',
    productImageUrl: 'https://i.postimg.cc/0N3FkmyD/Whats-App-Image-2026-10-10-at-01-38-27.jpg',
    productName: 'KOSNORA Smart Case · Gray',
    tag: 'WATER RESISTANCE',
    headline: 'Total Peace of Mind Near Water',
    reviewText: "I love this phone case! Changing the picture is incredibly fast, and it's so easy to use. The water-resistance gives me total peace of mind whenever I'm outdoors or by the pool. High quality, feels rugged yet slim!",
    rating: 5,
    date: '2 days ago',
  },
  {
    id: 'review-2',
    name: 'Marcus V.',
    location: 'Austin, TX',
    verified: true,
    avatarUrl: 'https://i.postimg.cc/XvhmjFYy/Whats-App-Image-2026-10-09-at-02-20-20.jpg',
    productImageUrl: 'https://i.postimg.cc/s28qjSgh/Whats-App-Image-2026-10-10-at-01-30-48.jpg',
    productName: 'KOSNORA Smart Case · Black',
    tag: 'ZERO BATTERY DRAIN',
    headline: 'Crisp E-Ink Screen, No Battery Usage',
    reviewText: "The smart ink screen is ridiculously clear! Having my favorite photos right on the back of my phone with zero battery usage is pure magic. Everyone keeps asking where I got it. Hands down my best purchase.",
    rating: 5,
    date: '5 days ago',
  },
  {
    id: 'review-3',
    name: 'Olivia C.',
    location: 'Seattle, WA',
    verified: true,
    avatarUrl: 'https://i.postimg.cc/q7YSJnvK/Whats-App-Image-2026-10-09-at-02-08-58.jpg',
    productImageUrl: 'https://i.postimg.cc/cJj2xYLt/Whats-App-Image-2026-10-10-at-01-30-48-(1).jpg',
    productName: 'KOSNORA Smart Case · White',
    tag: 'DROP PROTECTION',
    headline: 'Saved My Phone From Concrete',
    reviewText: "Accidentally dropped my phone on concrete on day two and the reinforced shock bezels completely saved both my screen and camera lenses. Top-notch build quality and the silky grip feels amazing.",
    rating: 5,
    date: '1 week ago',
  },
  {
    id: 'review-4',
    name: 'Tyler B.',
    location: 'Denver, CO',
    verified: true,
    avatarUrl: 'https://i.postimg.cc/V6CTd6JS/Whats-App-Image-2026-10-10-at-01-54-00.jpg',
    productImageUrl: 'https://i.postimg.cc/hjdwfjXh/Whats-App-Image-2026-10-10-at-01-42-00.jpg',
    productName: 'KOSNORA Smart Case · Orange',
    tag: 'EFFORTLESS NFC SYNC',
    headline: 'Syncs via NFC in Just 3 Seconds',
    reviewText: "The NFC sync is seamless. Selected my favorite trip photo in the app, tapped the back of my phone, and it loaded immediately. No cords, no Bluetooth lag, pure convenience. Futuristic technology!",
    rating: 5,
    date: '2 weeks ago',
  },
  {
    id: 'review-5',
    name: 'Emily & Chris D.',
    location: 'San Diego, CA',
    verified: true,
    avatarUrl: 'https://i.postimg.cc/3Rv6dRk0/Whats-App-Image-2026-10-10-at-02-13-29.jpg',
    productImageUrl: 'https://i.postimg.cc/vBVjcB4T/Whats-App-Image-2026-10-10-at-01-42-00-(1).jpg',
    productName: 'KOSNORA Multi-Case Bundle',
    tag: 'BUNDLE VALUE',
    headline: 'Best iPhone Purchase for Our Family',
    reviewText: "Ordered the bundle so my partner and I could match our photos. Switching covers and updating pictures for special moments and date nights is so fun. Build quality is exceptional!",
    rating: 5,
    date: '3 weeks ago',
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
    const speed = 0.55; // pixels per millisecond approx

    const step = (now: number) => {
      const delta = now - lastTimestamp;
      lastTimestamp = now;

      if (!isPaused && container) {
        container.scrollLeft += delta * 0.05 * speed;

        // Reset scroll position when reaching halfway (infinite mirror)
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
      scrollContainerRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  // Duplicate items for continuous infinite scroll
  const duplicatedReviews = [...REVIEWS_DATA, ...REVIEWS_DATA];

  return (
    <section
      id="reviews"
      className="bg-[#FCFCFD] text-neutral-900 py-16 sm:py-20 border-b border-neutral-200 relative overflow-hidden"
    >
      {/* Subtle Purple Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-200/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-[#9333EA] text-xs font-black tracking-widest uppercase mb-3">
              <Heart className="w-3.5 h-3.5 fill-[#9333EA]" />
              <span>Real Customer Stories</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-neutral-950 leading-tight">
              Loved by Our Customers
            </h2>

            <p className="mt-2 text-base sm:text-lg text-neutral-600 font-medium italic">
              &ldquo;Your favorite memories, right on your phone.&rdquo;
            </p>
          </div>

          {/* Social Proof & Controls */}
          <div className="flex items-center gap-4 self-start md:self-auto">
            {/* Rating badge */}
            <div className="flex items-center gap-3 bg-white border border-neutral-200 px-4 py-2.5 rounded-2xl shadow-xs">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="text-xs">
                <span className="font-black text-neutral-950">4.9/5.0</span>
                <span className="text-neutral-500 ml-1">· 1,200+ Reviews</span>
              </div>
            </div>

            {/* Carousel Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleScrollLeft}
                className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-[#9333EA] hover:border-[#9333EA] hover:shadow-sm transition-all cursor-pointer active:scale-95"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleScrollRight}
                className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-[#9333EA] hover:border-[#9333EA] hover:shadow-sm transition-all cursor-pointer active:scale-95"
                aria-label="Next review"
              >
                <ChevronRight className="w-5 h-5" />
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
          className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-8 py-4"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {duplicatedReviews.map((review, idx) => (
            <article
              key={`${review.id}-${idx}`}
              className="flex-shrink-0 w-[310px] sm:w-[350px] bg-white border border-neutral-200 hover:border-[#9333EA]/40 rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div>
                {/* Top: Customer Profile */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={review.avatarUrl}
                        alt={review.name}
                        className="w-13 h-13 rounded-full object-cover border-2 border-purple-100 group-hover:border-[#9333EA] transition-colors"
                        loading="lazy"
                      />
                      <span className="absolute -bottom-1 -right-1 bg-[#9333EA] text-white p-0.5 rounded-full ring-2 ring-white">
                        <CheckCircle className="w-3 h-3 fill-[#9333EA] text-white" />
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-sm text-neutral-900 tracking-tight">
                          {review.name}
                        </h3>
                      </div>
                      <div className="text-[11px] font-semibold text-neutral-500">
                        {review.location}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 mt-0.5">
                        <span>Verified Buyer</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-medium text-neutral-400">
                    {review.date}
                  </span>
                </div>

                {/* Rating Stars & Feature Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#FAF5FF] text-[#9333EA] border border-[#E9D5FF]/60">
                    {review.tag}
                  </span>
                </div>

                {/* Case Purchased Image (Natural Aspect Ratio & Border) */}
                <div className="relative rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-100 mb-4 group/img">
                  <img
                    src={review.productImageUrl}
                    alt={review.productName}
                    className="w-full h-56 sm:h-64 object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-black/5 text-[10px] font-bold text-neutral-700 flex items-center justify-between">
                    <span className="truncate">{review.productName}</span>
                    <span className="text-[#9333EA] font-extrabold text-[9px] uppercase tracking-wider">Photo Screen</span>
                  </div>
                </div>

                {/* Headline & Review Text */}
                <h4 className="font-extrabold text-sm sm:text-base text-neutral-900 mb-2 leading-snug">
                  {review.headline}
                </h4>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-medium">
                  &ldquo;{review.reviewText}&rdquo;
                </p>
              </div>

              {/* Bottom Subtle Guarantee Badge */}
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-neutral-400">
                <span>NFC Smart Screen</span>
                <span className="text-[#9333EA]">KOSNORA Original</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
