import { ProductImage, PricingTier, FaqItem, CartCalculation } from '../types';

export const BRAND_NAME = "KOSNORA";
export const PRODUCT_NAME = "KOSNORA Premium Phone Case";

export const IPHONE_MODELS = [
  'iPhone 17 Pro Max',
  'iPhone 17 Pro',
  'iPhone 17',
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'iPhone 16 Plus',
  'iPhone 16',
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15 Plus',
  'iPhone 15',
  'iPhone 14 Pro Max',
  'iPhone 14 Pro',
  'iPhone 14 Plus',
  'iPhone 14',
  'iPhone 13 Pro Max',
  'iPhone 13 Pro',
  'iPhone 13',
  'iPhone 12 Pro Max',
  'iPhone 12 Pro',
  'iPhone 12',
];

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

// Pricing Tiers (1 for $69.90, 2 for $129.90, 3 for $189.90, and 4 for $239.90)
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'single',
    quantity: 1,
    label: '1 CASE',
    unitPrice: 69.90,
    totalPrice: 69.90,
    savingsTotal: 0,
    tagline: '1x KOSNORA Case',
  },
  {
    id: 'double',
    quantity: 2,
    label: '2 CASES',
    unitPrice: 64.95,
    totalPrice: 129.90,
    savingsTotal: 9.90,
    savingsPerUnit: 4.95,
    popular: true,
    tagline: '2x KOSNORA Cases',
  },
  {
    id: 'triple',
    quantity: 3,
    label: '3 CASES',
    unitPrice: 63.30,
    totalPrice: 189.90,
    savingsTotal: 19.80,
    savingsPerUnit: 6.60,
    bestValue: true,
    tagline: '3x KOSNORA Cases',
  },
  {
    id: 'quadruple',
    quantity: 4,
    label: '4 CASES',
    unitPrice: 59.98,
    totalPrice: 239.90,
    savingsTotal: 39.70,
    savingsPerUnit: 9.93,
    tagline: '4x KOSNORA Cases (Maximum Limit)',
  },
];

export function getPricingTiers(): PricingTier[] {
  return PRICING_TIERS;
}

export const MAX_ORDER_CAPAS = 4;

/**
 * Calculates progressive volume pricing according to official KOSNORA rules:
 * - 1 Unit: $69.90 (unit: $69.90, discount: $0.00)
 * - 2 Units: $129.90 (unit: $64.95, discount: $9.90 - 2x 69.90 = 139.80)
 * - 3 Units: $189.90 (unit: $63.30, discount: $19.80 - 3x 69.90 = 209.70)
 * - 4 Units (MAXIMUM BUNDLE): $239.90 (unit: $59.98, discount: $39.70 - 4x 69.90 = 279.60)
 */
export function calculateCartPricing(quantity: number, currency = '$'): CartCalculation {
  const clampedQty = Math.min(MAX_ORDER_CAPAS, Math.max(1, Math.round(quantity || 1)));
  const baseStandardPerUnit = 69.90;
  const standardSubtotal = Number((clampedQty * baseStandardPerUnit).toFixed(2));

  if (clampedQty === 1) {
    const total = 69.90;
    return {
      quantity: 1,
      unitPrice: total,
      subtotal: total,
      discount: 0,
      total,
      discountLabel: null,
      currency,
    };
  }

  if (clampedQty === 2) {
    const total = 129.90;
    const unitPrice = 64.95;
    const discount = Number((standardSubtotal - total).toFixed(2)); // 9.90
    return {
      quantity: 2,
      unitPrice,
      subtotal: standardSubtotal,
      discount,
      total,
      discountLabel: '2-Case Bundle (Save $9.90)',
      currency,
    };
  }

  if (clampedQty === 3) {
    const total = 189.90;
    const unitPrice = 63.30;
    const discount = Number((standardSubtotal - total).toFixed(2)); // 19.80
    return {
      quantity: 3,
      unitPrice,
      subtotal: standardSubtotal,
      discount,
      total,
      discountLabel: '3-Case Bundle (Save $19.80)',
      currency,
    };
  }

  // Exact 4 units (Maximum order limit of 4 cases per order)
  const unitPrice = 59.98;
  const total = 239.90;
  const discount = Number((standardSubtotal - total).toFixed(2)); // 39.70
  return {
    quantity: 4,
    unitPrice,
    subtotal: standardSubtotal,
    discount,
    total,
    discountLabel: 'Max 4-Case Bundle (Save $39.70)',
    currency,
  };
}

export function formatCurrency(amount: number, symbol = '$'): string {
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${symbol}${formatted}`;
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
    answer: 'Select your preferred iPhone model and color, then choose between 1 case ($69.90), 2 cases ($129.90), 3 cases ($189.90), or up to our maximum 4 cases ($239.90). Mix and match any models and colors in your order, then click ADD TO CART to review your bundle savings and proceed through Shopify secure checkout.',
  },
  {
    question: 'Does the case protect both the camera and the screen?',
    answer: 'Yes! The KOSNORA case is engineered with shock-absorbent composite bumpers and raised protective bezels surrounding both your camera array and front display to guard against everyday scratches and drops.',
  },
  {
    question: 'How long does shipping take within the United States?',
    answer: 'Orders are processed and dispatched within 24 to 48 business hours with fast domestic US shipping. You will receive an end-to-end tracking number to monitor your delivery directly to your door.',
  },
  {
    question: 'What is your guarantee and return policy?',
    answer: 'We provide an unconditional 30-Day Money-Back Guarantee. If for any reason you are not completely satisfied with the fit or quality, our customer support team will issue a prompt replacement or full refund.',
  },
  {
    question: 'How do I contact customer support?',
    answer: 'Our official support team is available Monday through Friday from 9:00 AM to 6:00 PM EST via email at support@kosnora.com or WhatsApp / phone at +1 (970) 996-2930.',
  },
];
