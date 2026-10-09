import { ProductImage, PricingTier, FaqItem } from '../types';

export const BRAND_NAME = "KOSNORA";
export const PRODUCT_NAME = "KOSNORA Premium Phone Case";

// The 5 official product images
export const PRODUCT_IMAGES: ProductImage[] = [
  {
    id: 'gray',
    name: 'Gray',
    url: 'https://i.postimg.cc/m24tHsKv/Whats-App-Image-2026-10-09-at-02-56-11.jpg',
  },
  {
    id: 'black',
    name: 'Black',
    url: 'https://i.postimg.cc/CMqq8J51/Whats-App-Image-2026-10-07-at-00-11-55.jpg',
  },
  {
    id: 'pink',
    name: 'Pink',
    url: 'https://i.postimg.cc/pVFFjkrr/Whats-App-Image-2026-10-09-at-02-44-27.jpg',
  },
  {
    id: 'white',
    name: 'White',
    url: 'https://i.postimg.cc/kGKRdML9/Whats-App-Image-2026-10-09-at-02-47-31.jpg',
  },
  {
    id: 'orange',
    name: 'Orange',
    url: 'https://i.postimg.cc/66vvZzqT/Whats-App-Image-2026-10-09-at-02-52-19.jpg',
  },
];

// Pricing Tiers (1 for $79.90, 2 for 139.90, and 3 for 194.90)
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'single',
    quantity: 1,
    label: '1 CASE',
    unitPrice: 79.90,
    totalPrice: 79.90,
    savingsTotal: 0,
    tagline: '1x KOSNORA Case',
  },
  {
    id: 'double',
    quantity: 2,
    label: '2 CASES',
    unitPrice: 69.95,
    totalPrice: 139.90,
    savingsTotal: 19.90,
    savingsPerUnit: 9.95,
    popular: true,
    tagline: '2x KOSNORA Cases',
  },
  {
    id: 'triple',
    quantity: 3,
    label: '3 CASES',
    unitPrice: 64.97,
    totalPrice: 194.90,
    savingsTotal: 44.80,
    savingsPerUnit: 14.93,
    bestValue: true,
    tagline: '3x KOSNORA Cases',
  },
];

export function getPricingTiers(): PricingTier[] {
  return PRICING_TIERS;
}

export const WHATS_INCLUDED = [
  'Original KOSNORA Case',
  'Shock-absorbent structure with raised bezels',
  'Silky smooth minimalist finish',
  '30-day money-back fit guarantee',
];

export const FAQ_LIST: FaqItem[] = [
  {
    question: 'How do I choose my bundle and complete my purchase?',
    answer: 'Select your preferred color from the gallery and choose between 1 case ($79.90), 2 cases ($139.90), or 3 cases ($194.90). Then simply click GET YOUR KOSNORA or Buy Now to proceed directly to secure checkout.',
  },
  {
    question: 'Does the case protect both the camera and the screen?',
    answer: 'Yes! The KOSNORA case is engineered with shock-absorbent composite bumpers and raised protective bezels surrounding both your camera array and front display to guard against everyday scratches and drops.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Orders are processed and dispatched rapidly within 24 to 48 business hours. You will receive an end-to-end tracking code to follow your package directly to your doorstep.',
  },
  {
    question: 'What is your guarantee and return policy?',
    answer: 'We provide an unconditional 30-Day Money-Back Guarantee. If for any reason you are not completely satisfied, our support team will issue a prompt replacement or full refund.',
  },
  {
    question: 'How do I contact customer support?',
    answer: 'Our dedicated customer service team is available Monday through Friday via email at support@kosnora.com to answer any questions or assist with your order.',
  },
];
