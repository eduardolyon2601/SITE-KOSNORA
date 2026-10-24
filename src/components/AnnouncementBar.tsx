import React, { memo } from 'react';

const BENEFIT_MESSAGES = [
  'FREE SHIPPING ON ALL ORDERS',
  '30-DAY RETURNS',
  'TRACK YOUR ORDER',
  'SECURE CHECKOUT',
  'MAKE YOUR CASE YOURS',
];

// Repeat 4 times per group to ensure complete viewport coverage (> 4,500px) on any resolution up to 4K
const REPEATED_ITEMS = [
  ...BENEFIT_MESSAGES,
  ...BENEFIT_MESSAGES,
  ...BENEFIT_MESSAGES,
  ...BENEFIT_MESSAGES,
];

export const AnnouncementBar: React.FC = memo(() => {
  return (
    <div
      className="kosnora-announcement relative w-full max-w-full min-w-0 overflow-hidden bg-[#24153D] text-white z-50 border-b border-white/10 select-none box-border"
      role="region"
      aria-label="Store benefits"
    >
      <div className="kosnora-announcement__viewport w-full max-w-full min-w-0 overflow-hidden flex box-border">
        <div
          className="kosnora-announcement__track flex flex-row flex-nowrap w-max max-w-none shrink-0 animate-kosnora-announcement-marquee will-change-transform"
          style={{
            animation: 'kosnora-announcement-marquee 50s linear infinite',
            WebkitAnimation: 'kosnora-announcement-marquee 50s linear infinite',
          }}
        >
          {/* Group 1: Primary list */}
          <div className="kosnora-announcement__group flex flex-row flex-nowrap shrink-0 items-center min-w-max">
            {REPEATED_ITEMS.map((text, idx) => (
              <span
                key={`g1-${idx}`}
                className="kosnora-announcement__item inline-flex shrink-0 items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2 sm:py-2.5 whitespace-nowrap"
              >
                <span className="kosnora-announcement__text font-['Montserrat',sans-serif] text-[11px] sm:text-[12px] font-semibold tracking-[0.6px] uppercase leading-none text-white">
                  {text}
                </span>
                <span
                  className="kosnora-announcement__separator text-[10px] sm:text-[11px] text-[#C084FC] opacity-85 select-none"
                  aria-hidden="true"
                >
                  ✦
                </span>
              </span>
            ))}
          </div>

          {/* Group 2: Cloned list for seamless continuous infinite loop */}
          <div
            className="kosnora-announcement__group flex flex-row flex-nowrap shrink-0 items-center min-w-max"
            aria-hidden="true"
          >
            {REPEATED_ITEMS.map((text, idx) => (
              <span
                key={`g2-${idx}`}
                className="kosnora-announcement__item inline-flex shrink-0 items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2 sm:py-2.5 whitespace-nowrap"
              >
                <span className="kosnora-announcement__text font-['Montserrat',sans-serif] text-[11px] sm:text-[12px] font-semibold tracking-[0.6px] uppercase leading-none text-white">
                  {text}
                </span>
                <span
                  className="kosnora-announcement__separator text-[10px] sm:text-[11px] text-[#C084FC] opacity-85 select-none"
                  aria-hidden="true"
                >
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

AnnouncementBar.displayName = 'AnnouncementBar';

