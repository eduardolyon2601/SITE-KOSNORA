import React from 'react';

const BENEFIT_MESSAGES = [
  'FREE SHIPPING ON ALL ORDERS',
  '30-DAY RETURNS',
  'TRACK YOUR ORDER',
  'SECURE CHECKOUT',
  'MAKE YOUR CASE YOURS',
];

export const AnnouncementBar: React.FC = () => {
  return (
    <div
      className="kosnora-announcement w-full max-w-full overflow-hidden bg-[#24153D] text-white relative z-50 border-b border-white/10 select-none"
      role="region"
      aria-label="Store benefits"
    >
      <div className="w-full overflow-hidden flex">
        <div className="flex w-max shrink-0 animate-kosnora-announcement-marquee will-change-transform">
          {/* Group 1: Primary list (repeated twice for wide display coverage) */}
          <div className="flex shrink-0 items-center min-w-max">
            {[...BENEFIT_MESSAGES, ...BENEFIT_MESSAGES].map((text, idx) => (
              <span
                key={`g1-${idx}`}
                className="inline-flex shrink-0 items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2 sm:py-2.5 whitespace-nowrap"
              >
                <span className="font-['Montserrat',sans-serif] text-[11px] sm:text-[12px] font-semibold tracking-[0.6px] uppercase leading-none text-white">
                  {text}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#C084FC] opacity-85 select-none" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>

          {/* Group 2: Cloned list for seamless continuous infinite loop */}
          <div className="flex shrink-0 items-center min-w-max" aria-hidden="true">
            {[...BENEFIT_MESSAGES, ...BENEFIT_MESSAGES].map((text, idx) => (
              <span
                key={`g2-${idx}`}
                className="inline-flex shrink-0 items-center gap-4 sm:gap-6 px-4 sm:px-6 py-2 sm:py-2.5 whitespace-nowrap"
              >
                <span className="font-['Montserrat',sans-serif] text-[11px] sm:text-[12px] font-semibold tracking-[0.6px] uppercase leading-none text-white">
                  {text}
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#C084FC] opacity-85 select-none" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
