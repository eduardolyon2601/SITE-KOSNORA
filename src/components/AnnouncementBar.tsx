import React from 'react';

export const AnnouncementBar: React.FC = () => {
  const announcements = [
    'WELCOME TO KOSNORA',
    'UP TO 50% OFF BUNDLES',
    'FREE SHIPPING ON ALL ORDERS',
    '100% BATTERY-FREE NFC SMART CASE',
  ];

  return (
    <div className="w-full bg-[#FAF5FF] text-neutral-900 border-b border-[#E9D5FF] text-[11px] sm:text-xs font-black tracking-widest uppercase overflow-hidden py-2 select-none">
      <div className="flex whitespace-nowrap animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]">
        {[...announcements, ...announcements, ...announcements].map((text, idx) => (
          <span key={idx} className="mx-6 flex items-center gap-4">
            <span className="text-neutral-900">{text}</span>
            <span className="text-[#9333EA] font-black text-xs">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};
