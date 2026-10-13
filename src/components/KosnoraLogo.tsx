import React from 'react';
import brandLogoImg from '../assets/kosnora-logo-transparent.png';

interface KosnoraLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'light' | 'dark' | 'purple';
}

export const KosnoraLogo: React.FC<KosnoraLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  // Proportional sizes for mobile and desktop, maintaining original aspect ratio
  const sizeClasses = {
    xs: 'h-5 sm:h-6',
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-10',
    lg: 'h-10 sm:h-12',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Official Brand Logo completely clean (no glow, no filters, no shadows, no modification) */}
      <img
        src={brandLogoImg}
        alt="KOSNORA"
        className={`${sizeClasses[size]} w-auto object-contain block`}
        loading="eager"
      />
    </div>
  );
};
