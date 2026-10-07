export type CaseColor = {
  id: string;
  name: string;
  hex: string;
  borderClass: string;
};

export type IPhoneModel = {
  id: string;
  name: string;
  series: string;
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
