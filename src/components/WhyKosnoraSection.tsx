import React from 'react';
import { ReviewsCarousel } from './ReviewsCarousel';

/**
 * Replaced "Why Kosnora" section with premium "Loved by Our Customers" Reviews Carousel.
 * Maintained as an alias so any legacy component references load the new carousel seamlessly.
 */
export const WhyKosnoraSection: React.FC = () => {
  return <ReviewsCarousel />;
};

export default WhyKosnoraSection;
