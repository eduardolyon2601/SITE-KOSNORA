import React, { useState } from 'react';
import {
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Zap,
  ChevronDown,
  Lock,
  ArrowRight,
  Maximize2,
  Sliders,
  Layers,
  Heart,
  Dog,
  Mountain
} from 'lucide-react';
import {
  PRODUCT_COLORS,
  COMPATIBLE_IPHONE_MODELS,
  PRICING_TIERS,
  PRODUCT_NAME,
  WHATS_INCLUDED
} from '../data/productData';
import { PricingTier } from '../types';

interface ProductHeroSectionProps {
  onAddToCart: (tier: PricingTier, modelId: string, colorId: string) => void;
  onBuyNow: (tier: PricingTier, modelId: string, colorId: string) => void;
}

export const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({
  onAddToCart,
  onBuyNow,
}) => {
  // Gallery State
  const galleryImages = [
    {
      id: 'cinza',
      src: 'https://i.postimg.cc/m24tHsKv/Whats-App-Image-2026-10-09-at-02-56-11.jpg',
      title: 'Cinza',
      tag: 'Cinza',
    },
    {
      id: 'preta',
      src: 'https://i.postimg.cc/CMqq8J51/Whats-App-Image-2026-10-07-at-00-11-55.jpg',
      title: 'Preta',
      tag: 'Preta',
    },
    {
      id: 'rosa',
      src: 'https://i.postimg.cc/pVFFjkrr/Whats-App-Image-2026-10-09-at-02-44-27.jpg',
      title: 'Rosa',
      tag: 'Rosa',
    },
    {
      id: 'branca',
      src: 'https://i.postimg.cc/kGKRdML9/Whats-App-Image-2026-10-09-at-02-47-31.jpg',
      title: 'Branca',
      tag: 'Branca',
    },
    {
      id: 'laranja',
      src: 'https://i.postimg.cc/66vvZzqT/Whats-App-Image-2026-10-09-at-02-52-19.jpg',
      title: 'Laranja',
      tag: 'Laranja',
    },
  ];

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Variant States
  const [selectedTier, setSelectedTier] = useState<PricingTier>(PRICING_TIERS[1]); // Default 2 cases (popular)
  const [selectedModel, setSelectedModel] = useState<string>(COMPATIBLE_IPHONE_MODELS[0].id);
  const [selectedColor, setSelectedColor] = useState<string>(PRODUCT_COLORS[0].id);

  // Accordion Tabs State
  const [openAccordion, setOpenAccordion] = useState<string | null>('specs');

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const activeColorObj = PRODUCT_COLORS.find((c) => c.id === selectedColor) || PRODUCT_COLORS[0];
  const activeModelObj = COMPATIBLE_IPHONE_MODELS.find((m) => m.id === selectedModel) || COMPATIBLE_IPHONE_MODELS[0];

  return (
    <section id="product" className="bg-black text-white pt-4 pb-16 sm:pt-8 sm:pb-24 border-b border-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Bar */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-400 tracking-wider uppercase mb-6 sm:mb-8">
          <span className="text-[#C084FC]">HOME</span>
          <span>/</span>
          <span>SMART ACCESSORIES</span>
          <span>/</span>
          <span className="text-white">KOSNORA INK SMART CASE</span>
        </div>

        {/* 2-Column Master Rooog Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* ================= LEFT COLUMN: PRODUCT GALLERY ================= */}
          <div className="lg:col-span-7 flex flex-col gap-4 sticky top-24">
            {/* Main Hero Product Display - Enquadrada sem cortes */}
            <div className="relative aspect-[645/800] max-w-md mx-auto w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl group flex items-center justify-center p-2">
              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#A855F7]/50 text-[#C084FC] text-[10px] font-black uppercase tracking-widest shadow-[0_0_12px_rgba(168,85,247,0.3)] flex items-center gap-1.5">
                  <Zap className="w-3 h-3 fill-[#C084FC]" />
                  <span>BATTERY-FREE NFC DISPLAY</span>
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-neutral-700 text-neutral-300 text-[10px] font-bold uppercase tracking-wider">
                  {galleryImages[activeImageIdx].tag}
                </span>
              </div>

              {/* Main Image */}
              <img
                src={galleryImages[activeImageIdx].src}
                alt={galleryImages[activeImageIdx].title}
                className="w-full h-full object-contain transition-all duration-500"
              />

              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-xs font-semibold text-neutral-300 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-xl border border-neutral-800">
                <span className="font-bold text-white">{galleryImages[activeImageIdx].title}</span>
                <span className="text-neutral-400 font-mono text-[11px]">
                  {activeImageIdx + 1} / {galleryImages.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-neutral-950 ${
                    activeImageIdx === idx
                      ? 'border-[#A855F7] shadow-[0_0_12px_rgba(168,85,247,0.4)] scale-102'
                      : 'border-neutral-800 opacity-60 hover:opacity-100 hover:border-neutral-600'
                  }`}
                  aria-label={`View image ${idx + 1}: ${img.title}`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>

            {/* Interactive Feature Pills */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-center">
                <span className="block text-[#C084FC] text-sm font-black mb-0.5">5 MIN</span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Fast Refresh</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-center">
                <span className="block text-[#C084FC] text-sm font-black mb-0.5">0% DRAIN</span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Zero Battery</span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800/80 text-center">
                <span className="block text-[#C084FC] text-sm font-black mb-0.5">MIL-SPEC</span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Drop Defense</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PRODUCT BUY BOX ================= */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {/* Title & Reviews */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center text-[#C084FC]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C084FC]" />
                  ))}
                </div>
                <span className="text-xs font-black text-neutral-300 tracking-wider">
                  4.9 / 5.0
                </span>
                <span className="text-xs font-bold text-neutral-500">·</span>
                <span className="text-xs font-bold text-neutral-400 underline underline-offset-2">
                  1,240+ Verified Reviews
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
                {PRODUCT_NAME}
              </h1>

              <p className="text-xs font-bold tracking-widest text-[#C084FC] uppercase mt-1">
                DIY PICTURE SMART SCREEN · PASSIVE NFC TECHNOLOGY
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    ${selectedTier.totalPrice.toFixed(2)}
                  </span>
                  {selectedTier.quantity > 1 && (
                    <span className="text-sm font-bold text-neutral-400 ml-2">
                      (${selectedTier.unitPrice.toFixed(2)} each)
                    </span>
                  )}
                </div>

                {selectedTier.savingsTotal > 0 && (
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#9333EA] to-[#7E22CE] text-white text-xs font-black uppercase tracking-wider shadow-[0_0_12px_rgba(168,85,247,0.4)]">
                    SAVE ${selectedTier.savingsTotal.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs font-semibold text-neutral-400">
                Have the picture you want on your phone whenever you want — in just 5 minutes.
              </p>
            </div>

            {/* Step 1: Bundle Selection Tiers */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-neutral-300 flex items-center justify-between">
                <span>1. SELECT PACKAGE:</span>
                <span className="text-[#C084FC] text-[11px] font-bold">Progressive Savings</span>
              </label>

              <div className="space-y-2.5">
                {PRICING_TIERS.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedTier(tier)}
                      className={`relative p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#150F22] border-[#A855F7] shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-[#C084FC] bg-[#A855F7]'
                              : 'border-neutral-600 bg-neutral-900'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white stroke-[3]" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm sm:text-base text-white uppercase">
                              {tier.label}
                            </span>
                            {tier.bestValue && (
                              <span className="px-2 py-0.5 rounded bg-[#A855F7] text-[10px] font-black uppercase tracking-wider text-white">
                                BEST VALUE
                              </span>
                            )}
                            {tier.popular && !tier.bestValue && (
                              <span className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] font-bold uppercase tracking-wider text-[#C084FC]">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-medium text-neutral-400 block mt-0.5">
                            {tier.tagline}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-black text-base sm:text-lg text-white">
                          ${tier.totalPrice.toFixed(2)}
                        </div>
                        {tier.savingsTotal > 0 ? (
                          <div className="text-[11px] font-bold text-[#C084FC]">
                            Save ${tier.savingsTotal.toFixed(2)}
                          </div>
                        ) : (
                          <div className="text-[11px] font-bold text-neutral-500">
                            Standard Price
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: iPhone Model Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-neutral-300 flex items-center justify-between">
                <span>2. SELECT IPHONE MODEL:</span>
                <span className="text-neutral-400 text-[11px] font-semibold">{activeModelObj.name}</span>
              </label>

              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-neutral-950 border-2 border-neutral-800 text-white font-bold text-sm rounded-xl px-4 py-3.5 focus:border-[#A855F7] focus:outline-none cursor-pointer transition-colors shadow-inner"
              >
                {COMPATIBLE_IPHONE_MODELS.map((model) => (
                  <option key={model.id} value={model.id} className="bg-neutral-900 text-white">
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Color Finish Selector */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-neutral-300 flex items-center justify-between">
                <span>3. CHOOSE CASE FINISH:</span>
                <span className="text-[#C084FC] text-[11px] font-bold">{activeColorObj.name}</span>
              </label>

              <div className="grid grid-cols-4 gap-2.5">
                {PRODUCT_COLORS.map((c) => {
                  const isSelected = selectedColor === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedColor(c.id)}
                      className={`p-2.5 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#150F22] border-[#A855F7] shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                          : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-neutral-700 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[10px] font-bold text-neutral-300 truncate w-full text-center">
                        {c.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Buttons (Rooog Style Dual CTA) */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => onAddToCart(selectedTier, selectedModel, selectedColor)}
                className="w-full py-4.5 sm:py-5 bg-gradient-to-r from-[#9333EA] via-[#A855F7] to-[#7E22CE] hover:brightness-110 text-white font-black text-sm sm:text-base tracking-widest uppercase rounded-xl shadow-[0_0_25px_rgba(168,85,247,0.45)] hover:shadow-[0_0_35px_rgba(168,85,247,0.65)] transition-all duration-200 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>ADD TO CART · ${selectedTier.totalPrice.toFixed(2)}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => onBuyNow(selectedTier, selectedModel, selectedColor)}
                className="w-full py-4 bg-white hover:bg-neutral-200 text-black font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Lock className="w-4 h-4 stroke-[2.5]" />
                <span>BUY NOW (INSTANT CHECKOUT)</span>
              </button>
            </div>

            {/* Trust and Assurance Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-semibold text-neutral-300">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-950 border border-neutral-850">
                <Truck className="w-4 h-4 text-[#C084FC] shrink-0" />
                <span>Fast 3–7 Day US Delivery</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-950 border border-neutral-850">
                <RotateCcw className="w-4 h-4 text-[#C084FC] shrink-0" />
                <span>30-Day Fit Guarantee</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-950 border border-neutral-850">
                <ShieldCheck className="w-4 h-4 text-[#C084FC] shrink-0" />
                <span>100% Guaranteed Fit</span>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-950 border border-neutral-850">
                <Zap className="w-4 h-4 text-[#C084FC] shrink-0" />
                <span>Zero Battery Consumption</span>
              </div>
            </div>

            {/* Rooog-Style Collapsible Product Tabs Accordion */}
            <div className="border-t border-neutral-900 pt-4 space-y-2">
              {/* Tab 1: Product Specifications */}
              <div className="rounded-xl bg-neutral-950 border border-neutral-800/80 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('specs')}
                  className="w-full px-4 py-3.5 text-left flex items-center justify-between font-extrabold text-xs tracking-wider uppercase text-white cursor-pointer hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#C084FC]" />
                    <span>PRODUCT SPECIFICATIONS</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                      openAccordion === 'specs' ? 'rotate-180 text-[#C084FC]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'specs' && (
                  <div className="px-4 pb-4 pt-2 border-t border-neutral-900 text-xs text-neutral-400 space-y-2 font-medium">
                    <div className="flex justify-between py-1 border-b border-neutral-900/60">
                      <span className="text-neutral-500 font-bold uppercase">Display Screen:</span>
                      <span className="text-neutral-200 font-semibold">Passive 4-Color Smart Ink Screen</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-900/60">
                      <span className="text-neutral-500 font-bold uppercase">Transmission:</span>
                      <span className="text-neutral-200 font-semibold">Near Field Communication (NFC 13.56 MHz)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-900/60">
                      <span className="text-neutral-500 font-bold uppercase">Power Source:</span>
                      <span className="text-neutral-200 font-semibold">100% Battery-Free (Passive Harvesting)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-900/60">
                      <span className="text-neutral-500 font-bold uppercase">Materials:</span>
                      <span className="text-neutral-200 font-semibold">TPU Frame + Polycarbonate Backing</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-neutral-900/60">
                      <span className="text-neutral-500 font-bold uppercase">Protection:</span>
                      <span className="text-neutral-200 font-semibold">1.5m Drop-Tested Shock Absorption</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tab 2: What's Included */}
              <div className="rounded-xl bg-neutral-950 border border-neutral-800/80 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('included')}
                  className="w-full px-4 py-3.5 text-left flex items-center justify-between font-extrabold text-xs tracking-wider uppercase text-white cursor-pointer hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#C084FC]" />
                    <span>WHAT'S IN THE BOX</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                      openAccordion === 'included' ? 'rotate-180 text-[#C084FC]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'included' && (
                  <div className="px-4 pb-4 pt-2 border-t border-neutral-900 text-xs text-neutral-400 space-y-2">
                    <ul className="space-y-1.5 list-disc list-inside">
                      {WHATS_INCLUDED.map((item, i) => (
                        <li key={i} className="text-neutral-300 font-medium">
                          {item}
                        </li>
                      ))}
                      <li className="text-neutral-300 font-medium">Quick Start Setup Instruction Card</li>
                      <li className="text-neutral-300 font-medium">Companion App Access (iOS Compatible)</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Tab 3: Shipping & Returns */}
              <div className="rounded-xl bg-neutral-950 border border-neutral-800/80 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full px-4 py-3.5 text-left flex items-center justify-between font-extrabold text-xs tracking-wider uppercase text-white cursor-pointer hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#C084FC]" />
                    <span>SHIPPING & RETURNS</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${
                      openAccordion === 'shipping' ? 'rotate-180 text-[#C084FC]' : ''
                    }`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="px-4 pb-4 pt-2 border-t border-neutral-900 text-xs text-neutral-400 space-y-2 font-medium leading-relaxed">
                    <p>
                      Orders processed within 24–48 business hours. Standard domestic delivery across the US typically arrives within 3–7 business days.
                    </p>
                    <p>
                      We offer a 30-day money-back guarantee. If you select the wrong model or are not fully satisfied, contact support for a quick exchange or return.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
