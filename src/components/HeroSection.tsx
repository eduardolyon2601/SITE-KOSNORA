import React, { useState, useRef } from 'react';
import { ArrowRight, Star, ShieldCheck, Check, ChevronLeft, ChevronRight, ShoppingBag, Truck } from 'lucide-react';
import { PricingTier } from '../types';
import { getPricingTiers, PRODUCT_IMAGES } from '../data/productData';

interface HeroSectionProps {
  onCtaClick: (imageId?: string) => void;
  onSelectTierAndBuy?: (tier: PricingTier, imageId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCtaClick,
  onSelectTierAndBuy,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const tiers = getPricingTiers();
  const [selectedTierId, setSelectedTierId] = useState<string>('single');
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 260;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleTierClick = (tier: PricingTier) => {
    setSelectedTierId(tier.id);
    if (onSelectTierAndBuy) {
      onSelectTierAndBuy(tier, PRODUCT_IMAGES[activeImageIdx]?.id);
    } else {
      onCtaClick(PRODUCT_IMAGES[activeImageIdx]?.id);
    }
  };

  const currentImage = PRODUCT_IMAGES[activeImageIdx];

  return (
    <section id="pricing" className="bg-white text-neutral-900 pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* MOBILE VIEW (< lg): Unchanged layout flow                    */}
        {/* Photo on top, thumbnails below, GET YOUR KOSNORA button,      */}
        {/* horizontal carousel of values below that                      */}
        {/* ============================================================ */}
        <div className="lg:hidden flex flex-col items-center max-w-2xl mx-auto text-center">
          {/* Social Proof Star Rating Tag */}
          <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-xs font-bold text-neutral-800">
            <div className="flex items-center text-[#9333EA]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#9333EA]" />
              ))}
            </div>
            <span className="text-[11px] font-black uppercase text-[#9333EA] tracking-wider">
              140+ Happy Customers
            </span>
          </div>

          {/* First Photo of the Header (Framed without cutting - object-contain) */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[645/800] rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-xl p-2 sm:p-2.5 flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-100/60 flex items-center justify-center">
              <img
                src={currentImage.url}
                alt={`KOSNORA - ${currentImage.name}`}
                className="w-full h-full object-contain block select-none transition-all duration-300"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                <span>{currentImage.name}</span>
              </div>
            </div>
          </div>

          {/* Miniature Photo Previews */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            {PRODUCT_IMAGES.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveImageIdx(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activeImageIdx === idx
                    ? 'bg-[#9333EA] text-white shadow-md scale-105 ring-2 ring-[#9333EA]/30'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="w-5 h-6 rounded overflow-hidden bg-neutral-100 border border-black/10 shrink-0 flex items-center justify-center">
                  <img src={img.url} alt={img.name} className="w-full h-full object-contain" />
                </div>
                <span>{img.name}</span>
              </button>
            ))}
          </div>

          {/* Direct CTA Button (Placed Below the First Photo) */}
          <div className="w-full flex flex-col items-center mt-6">
            <div className="w-full sm:w-auto flex flex-col items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => {
                  const selectedTier = tiers.find((t) => t.id === selectedTierId) || tiers[0];
                  if (onSelectTierAndBuy) {
                    onSelectTierAndBuy(selectedTier, currentImage.id);
                  } else {
                    onCtaClick(currentImage.id);
                  }
                }}
                className="w-full sm:w-auto px-10 py-4.5 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white font-black text-sm tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-102 active:scale-95 flex items-center justify-center gap-2.5 uppercase cursor-pointer"
              >
                <span>GET YOUR KOSNORA</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <span>Choose your bundle below to purchase</span>
              </div>
            </div>

            {/* Horizontal Carousel of Purchasing Options (1 for $79.90, 2 for 139.90, and 3 for 194.90) */}
            <div className="w-full max-w-4xl relative mt-1">
              {/* Carousel navigation buttons for tablet */}
              <div className="hidden sm:flex items-center justify-between absolute -top-10 right-0 gap-1.5 z-10">
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  aria-label="Previous"
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  aria-label="Next"
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Container (side-by-side carousel, not stacked) */}
              <div
                ref={carouselRef}
                className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto pb-4 pt-3 px-2 sm:px-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
                style={{ scrollbarWidth: 'thin' }}
              >
                {tiers.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  const isDouble = tier.quantity === 2;
                  const isTriple = tier.quantity === 3;

                  return (
                    <div
                      key={tier.id}
                      onClick={() => handleTierClick(tier)}
                      className={`min-w-[240px] sm:min-w-[270px] max-w-[290px] flex-1 shrink-0 snap-center rounded-2xl p-4 sm:p-5 transition-all cursor-pointer flex flex-col justify-between border-2 bg-white relative select-none hover:shadow-lg ${
                        isSelected
                          ? 'border-[#9333EA] shadow-md ring-2 ring-[#9333EA]/20 -translate-y-0.5'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {/* Top Badge for special bundles */}
                      {isDouble && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#9333EA] text-white text-[9px] font-black uppercase tracking-wider shadow-xs whitespace-nowrap">
                          Most Popular · 2 Cases
                        </div>
                      )}
                      {isTriple && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#9333EA] to-[#6B21A8] text-white text-[9px] font-black uppercase tracking-wider shadow-xs whitespace-nowrap">
                          Best Value · 3 Cases
                        </div>
                      )}

                      <div>
                        {/* Header quantity and tag */}
                        <div className="flex items-center justify-between mb-2 mt-1">
                          <span className="text-sm font-black text-neutral-950 uppercase tracking-tight">
                            {tier.quantity === 1 ? '1 Case' : `${tier.quantity} Cases`}
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-[#FAF5FF] text-[#9333EA]'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {tier.quantity === 1 ? 'Single' : `${tier.quantity}x Pack`}
                          </span>
                        </div>

                        {/* Price Display */}
                        <div className="text-left mb-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                              ${tier.totalPrice.toFixed(2)}
                            </span>
                            {tier.quantity > 1 && (
                              <span className="text-[11px] font-bold text-neutral-500">
                                (${tier.unitPrice.toFixed(2)}/ea)
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-semibold text-neutral-500 block">
                            {tier.quantity === 1
                              ? '1 for $79.90'
                              : tier.quantity === 2
                              ? '2 for $139.90'
                              : '3 for $194.90'}
                          </span>
                        </div>

                        {/* Feature bullets */}
                        <ul className="space-y-1.5 text-[11px] font-medium text-neutral-700 text-left mb-4">
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>{tier.quantity}x KOSNORA Case</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>Raised Protective Bezels</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>30-Day Money-Back Guarantee</span>
                          </li>
                        </ul>
                      </div>

                      {/* Buy / Select Button inside card */}
                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                        <div className="text-left">
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total</span>
                          <span className="text-xs font-black text-neutral-900">
                            ${tier.totalPrice.toFixed(2)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTierClick(tier);
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#9333EA] text-white shadow-sm hover:brightness-110'
                              : 'bg-neutral-900 text-white hover:bg-neutral-800'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scroll Indicator hint for mobile */}
              <div className="sm:hidden flex items-center justify-center gap-1.5 text-[11px] font-semibold text-neutral-400 mt-1">
                <span>← Swipe horizontally to see all options →</span>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="flex items-center justify-center gap-4 text-xs font-semibold text-neutral-500 pt-3">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#9333EA]" />
                <span>30-Day Guarantee</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#9333EA]" />
                <span>Tracked Shipping</span>
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP VIEW (Only for computer - lg:block):                 */}
        {/* Product & photos on the LEFT, values on the RIGHT            */}
        {/* ============================================================ */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-10 xl:gap-14 items-start">
            
            {/* LEFT COLUMN: Product & photos on the left of the page */}
            <div className="col-span-5 flex flex-col items-center">
              {/* Product Hero Image Gallery - Framed without cropping (object-contain) */}
              <div className="relative w-full aspect-[645/800] rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-xl p-3 flex items-center justify-center group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-100/60 flex items-center justify-center">
                  <img
                    src={currentImage.url}
                    alt={`KOSNORA - ${currentImage.name}`}
                    className="w-full h-full object-contain block select-none transition-all duration-300"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                    <span>{currentImage.name}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails Swatches with mini framed photo previews */}
              <div className="w-full mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-neutral-500 uppercase">
                    Select Color / Finish:
                  </span>
                  <span className="text-xs font-black text-[#9333EA] uppercase">
                    {currentImage.name}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {PRODUCT_IMAGES.map((img, idx) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`p-1.5 rounded-xl transition-all cursor-pointer flex flex-col items-center gap-1.5 text-center ${
                        activeImageIdx === idx
                          ? 'bg-[#FAF5FF] border-2 border-[#9333EA] shadow-sm ring-2 ring-[#9333EA]/20'
                          : 'bg-white border border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-neutral-100 flex items-center justify-center">
                        <img src={img.url} alt={img.name} className="w-full h-full object-contain" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase truncate max-w-full ${
                        activeImageIdx === idx ? 'text-[#9333EA]' : 'text-neutral-700'
                      }`}>
                        {img.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Trust assurances under photo */}
              <div className="w-full mt-5 pt-4 border-t border-neutral-200/80 flex items-center justify-around text-xs font-semibold text-neutral-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#9333EA]" />
                  <span>30-Day Guarantee</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#9333EA]" />
                  <span>Tracked Shipping</span>
                </span>
              </div>
            </div>

            {/* RIGHT COLUMN: Bundles and values on the right next to the product */}
            <div className="col-span-7 flex flex-col pt-1">
              {/* Star Rating Badge */}
              <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-xs font-bold text-neutral-800 self-start">
                <div className="flex items-center text-[#9333EA]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#9333EA]" />
                  ))}
                </div>
                <span className="text-[11px] font-black uppercase text-[#9333EA] tracking-wider">
                  140+ Happy Customers
                </span>
              </div>

              {/* Product Headline */}
              <h1 className="text-3xl xl:text-4xl font-black uppercase tracking-tight text-neutral-950 mb-2">
                KOSNORA Case
              </h1>
              <p className="text-sm font-semibold text-neutral-600 mb-5 leading-relaxed">
                Refined minimalist design, reinforced impact protection, and a smooth tactile finish. Pick your favorite color and enjoy our progressive bundle discounts.
              </p>

              {/* Direct CTA Button (GET YOUR KOSNORA) */}
              <button
                type="button"
                onClick={() => {
                  const selectedTier = tiers.find((t) => t.id === selectedTierId) || tiers[0];
                  if (onSelectTierAndBuy) {
                    onSelectTierAndBuy(selectedTier, currentImage.id);
                  } else {
                    onCtaClick(currentImage.id);
                  }
                }}
                className="w-full py-4.5 px-8 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white font-black text-sm tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2.5 uppercase cursor-pointer mb-5"
              >
                <span>GET YOUR KOSNORA</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              {/* Title for purchasing options */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-900">
                  Bundles & Pricing:
                </span>
                <span className="text-xs font-semibold text-neutral-500">
                  Click on an option below to buy
                </span>
              </div>

              {/* 3 Values Options (Side-by-side on desktop: 1 for $79.90, 2 for 139.90, and 3 for 194.90) */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {tiers.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  const isDouble = tier.quantity === 2;
                  const isTriple = tier.quantity === 3;

                  return (
                    <div
                      key={tier.id}
                      onClick={() => handleTierClick(tier)}
                      className={`rounded-2xl p-4 transition-all cursor-pointer flex flex-col justify-between border-2 bg-white relative select-none hover:shadow-lg ${
                        isSelected
                          ? 'border-[#9333EA] shadow-md ring-2 ring-[#9333EA]/20 -translate-y-0.5'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {/* Top Badges */}
                      {isDouble && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[#9333EA] text-white text-[9px] font-black uppercase tracking-wider shadow-xs whitespace-nowrap">
                          Most Popular
                        </div>
                      )}
                      {isTriple && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-gradient-to-r from-[#9333EA] to-[#6B21A8] text-white text-[9px] font-black uppercase tracking-wider shadow-xs whitespace-nowrap">
                          Best Value
                        </div>
                      )}

                      <div>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-1.5 mt-0.5">
                          <span className="text-xs font-black text-neutral-950 uppercase tracking-tight">
                            {tier.quantity === 1 ? '1 Case' : `${tier.quantity} Cases`}
                          </span>
                          <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-[#FAF5FF] text-[#9333EA]'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {tier.quantity === 1 ? '1x' : `${tier.quantity}x`}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-left mb-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-neutral-950">
                              ${tier.totalPrice.toFixed(2)}
                            </span>
                          </div>
                          <span className="text-[11px] font-bold text-neutral-600 block mt-0.5">
                            {tier.quantity === 1
                              ? '1 for $79.90'
                              : tier.quantity === 2
                              ? '2 for $139.90'
                              : '3 for $194.90'}
                          </span>
                          {tier.quantity > 1 && (
                            <span className="text-[10px] font-semibold text-[#9333EA] block">
                              (${tier.unitPrice.toFixed(2)}/ea)
                            </span>
                          )}
                        </div>

                        {/* Feature bullets */}
                        <ul className="space-y-1 text-[11px] font-medium text-neutral-700 text-left mb-3">
                          <li className="flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>{tier.quantity}x KOSNORA Case</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>Raised Protective Bezels</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>30-Day Guarantee</span>
                          </li>
                        </ul>
                      </div>

                      {/* Buy Button inside card */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTierClick(tier);
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#9333EA] text-white shadow-sm hover:brightness-110'
                            : 'bg-neutral-900 text-white hover:bg-neutral-800'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Buy Now</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Guarantees Box */}
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-around text-xs font-semibold text-neutral-600">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#9333EA]" />
                  <span>30-Day Guarantee</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#9333EA]" />
                  <span>Tracked Shipping</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-emerald-600">
                  <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                  <span>100% Secure Checkout</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
