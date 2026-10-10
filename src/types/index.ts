export type ProductImage = {
  id: string;
  name: string;
  url: string;
};

export type PricingTier = {
  id: string;
  quantity: number;
  label: string;
  unitPrice: number;
  totalPrice: number;
  savingsTotal: number;
  savingsPerUnit?: number;
  popular?: boolean;
  bestValue?: boolean;
  tagline: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ReviewItem = {
  quote: string;
  author: string;
  location?: string;
  verified: boolean;
  rating: number;
};

export type CartCalculation = {
  quantity: number;
  unitPrice: number;
  subtotal: number;
  discount: number;
  total: number;
  discountLabel: string | null;
  currency: string;
};

export type CartItemUnit = {
  id: string; // Unique unit ID (e.g. 'unit-1', 'unit-2')
  model: string;
  color: string;
  variantId?: string;
  isAvailable?: boolean;
};

