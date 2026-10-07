import { CaseColor, IPhoneModel, PricingTier, FaqItem, ReviewItem } from '../types';

export const BRAND_NAME = "KOSNORA";
export const PRODUCT_NAME = "KOSNORA Ink NFC Smart Phone Case";

export const PRODUCT_COLORS: CaseColor[] = [
  { id: 'obsidian-black', name: 'Obsidian Black', hex: '#161618', borderClass: 'border-neutral-700' },
  { id: 'titanium-gray', name: 'Titanium Gray', hex: '#4A4C50', borderClass: 'border-neutral-500' },
  { id: 'cloud-white', name: 'Cloud White', hex: '#EAEAEA', borderClass: 'border-neutral-300' },
  { id: 'midnight-navy', name: 'Midnight Navy', hex: '#1C2433', borderClass: 'border-blue-900' },
];

export const COMPATIBLE_IPHONE_MODELS: IPhoneModel[] = [
  // iPhone 17 Series
  { id: 'ip-17-pm', name: 'iPhone 17 Pro Max', series: 'iPhone 17' },
  { id: 'ip-17-p', name: 'iPhone 17 Pro', series: 'iPhone 17' },
  { id: 'ip-17', name: 'iPhone 17', series: 'iPhone 17' },

  // iPhone 16 Series
  { id: 'ip-16-pm', name: 'iPhone 16 Pro Max', series: 'iPhone 16' },
  { id: 'ip-16-p', name: 'iPhone 16 Pro', series: 'iPhone 16' },
  { id: 'ip-16-plus', name: 'iPhone 16 Plus', series: 'iPhone 16' },
  { id: 'ip-16', name: 'iPhone 16', series: 'iPhone 16' },

  // iPhone 15 Series
  { id: 'ip-15-pm', name: 'iPhone 15 Pro Max', series: 'iPhone 15' },
  { id: 'ip-15-p', name: 'iPhone 15 Pro', series: 'iPhone 15' },
  { id: 'ip-15-plus', name: 'iPhone 15 Plus', series: 'iPhone 15' },
  { id: 'ip-15', name: 'iPhone 15', series: 'iPhone 15' },

  // iPhone 14 Series
  { id: 'ip-14-pm', name: 'iPhone 14 Pro Max', series: 'iPhone 14' },
  { id: 'ip-14-p', name: 'iPhone 14 Pro', series: 'iPhone 14' },
  { id: 'ip-14-plus', name: 'iPhone 14 Plus', series: 'iPhone 14' },
  { id: 'ip-14', name: 'iPhone 14', series: 'iPhone 14' },

  // iPhone 12 Series
  { id: 'ip-12-pm', name: 'iPhone 12 Pro Max', series: 'iPhone 12' },
  { id: 'ip-12-p', name: 'iPhone 12 Pro', series: 'iPhone 12' },
  { id: 'ip-12', name: 'iPhone 12', series: 'iPhone 12' },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'single',
    quantity: 1,
    label: '1 CASE',
    unitPrice: 79.90,
    totalPrice: 79.90,
    savingsTotal: 0,
    tagline: '1 KOSNORA Smart Phone Case',
  },
  {
    id: 'double',
    quantity: 2,
    label: '2 CASES',
    unitPrice: 69.90,
    totalPrice: 139.80,
    savingsTotal: 20.00,
    savingsPerUnit: 10.00,
    popular: true,
    tagline: '2 KOSNORA Smart Phone Cases',
  },
  {
    id: 'triple',
    quantity: 3,
    label: '3 CASES',
    unitPrice: 59.90,
    totalPrice: 179.70,
    savingsTotal: 60.00,
    savingsPerUnit: 20.00,
    bestValue: true,
    tagline: '3 KOSNORA Smart Phone Cases',
  },
];

export const WHATS_INCLUDED = [
  'KOSNORA Smart Phone Case',
  'Customizable image display',
  'Battery-free design',
  'Protective phone case structure',
];

export const FAQ_LIST: FaqItem[] = [
  {
    question: 'How does the KOSNORA case work?',
    answer: 'The KOSNORA case features a built-in smart ink display on the back. It utilizes passive NFC technology to receive and refresh your selected photo in seconds. Once transmitted, the image stays displayed indefinitely without drawing any power.',
  },
  {
    question: 'Can I change the picture whenever I want?',
    answer: 'Yes, completely on demand! You can refresh your case display as many times as you like. Whether you want to feature a favorite memory, switch to a couple photo for date night, or show off your pet, you can update it anytime.',
  },
  {
    question: 'Does it need a battery?',
    answer: 'No. The KOSNORA case is completely battery-free. It does not require charging, cables, or internal batteries. The smart screen retains your chosen image continuously with zero standby power consumption.',
  },
  {
    question: 'How long does it take to change the image?',
    answer: 'From selecting your favorite photo to having it fully displayed on the back of your phone takes just a few moments — typically under 5 minutes from start to finish.',
  },
  {
    question: 'How do I customize my case?',
    answer: 'Simply select any photo or artwork from your photo gallery, align the frame to match your case orientation, and transfer the image via NFC. The case screen updates and holds the picture seamlessly.',
  },
  {
    question: 'Which iPhone models are compatible?',
    answer: 'KOSNORA is currently engineered for iPhone 17, 16, 15, 14, and 12 series, including selected Pro and Pro Max editions. Check our interactive compatibility selector before placing your order.',
  },
  {
    question: 'Is the case protective?',
    answer: 'Yes. Beyond the smart customizable display, the KOSNORA case is engineered with a high-grade shock-absorbent composite frame, raised camera bezels, and reinforced corner buffers to safeguard your iPhone against everyday drops and scratches.',
  },
  {
    question: 'Can I use my own photo?',
    answer: 'Absolutely. You can display any picture from your smartphone gallery — personal photography, candid moments, scenic travel memories, or custom graphic designs.',
  },
  {
    question: 'Can I use pictures of my pets, family or partner?',
    answer: 'Yes! Pet portraits, couple photos, and family moments look sharp and distinctive on the KOSNORA smart ink screen, turning your everyday phone into a personalized keepsake.',
  },
  {
    question: 'How do I select my iPhone model?',
    answer: 'Select your exact model in the model selector on this page or during the checkout step. Ensure you confirm whether your iPhone is a standard, Pro, or Pro Max edition.',
  },
  {
    question: 'How long does shipping take?',
    answer: '[Insert actual shipping times and fulfillment schedule here. Orders are processed within standard fulfillment hours.]',
  },
  {
    question: 'What happens if I select the wrong iPhone model?',
    answer: '[Insert actual customer support and order amendment policy here. Please contact our support team immediately if you need to update your model before shipment.]',
  },
];

export const SOCIAL_PROOF_CARDS: ReviewItem[] = [
  {
    quote: "Add real customer review here.",
    author: "Verified Customer",
    location: "United States",
    verified: true,
    rating: 5,
  },
  {
    quote: "Add real customer review here.",
    author: "Verified Customer",
    location: "United States",
    verified: true,
    rating: 5,
  },
  {
    quote: "Add real customer review here.",
    author: "Verified Customer",
    location: "United States",
    verified: true,
    rating: 5,
  },
];
