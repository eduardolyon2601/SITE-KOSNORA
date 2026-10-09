import React, { useState, useRef } from 'react';
import { ArrowRight, Star, ShieldCheck, Zap, Check, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { PricingTier } from '../types';
import { getPricingTiers } from '../data/productData';

interface HeroSectionProps {
  onCtaClick: () => void;
  onSelectTierAndBuy?: (tier: PricingTier, colorId?: string) => void;
  isFirstPurchase?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCtaClick,
  onSelectTierAndBuy,
  isFirstPurchase = true,
}) => {
  const previewOptions = [
    {
      id: 'cinza',
      label: 'Cinza',
      hex: '#71717A',
      src: 'https://i.postimg.cc/m24tHsKv/Whats-App-Image-2026-10-09-at-02-56-11.jpg',
    },
    {
      id: 'preta',
      label: 'Preta',
      hex: '#18181B',
      src: 'https://i.postimg.cc/CMqq8J51/Whats-App-Image-2026-10-07-at-00-11-55.jpg',
    },
    {
      id: 'rosa',
      label: 'Rosa',
      hex: '#F472B6',
      src: 'https://i.postimg.cc/pVFFjkrr/Whats-App-Image-2026-10-09-at-02-44-27.jpg',
    },
    {
      id: 'branca',
      label: 'Branca',
      hex: '#FFFFFF',
      src: 'https://i.postimg.cc/kGKRdML9/Whats-App-Image-2026-10-09-at-02-47-31.jpg',
    },
    {
      id: 'laranja',
      label: 'Laranja',
      hex: '#EA580C',
      src: 'https://i.postimg.cc/66vvZzqT/Whats-App-Image-2026-10-09-at-02-52-19.jpg',
    },
  ];

  const [activePreview, setActivePreview] = useState(0);
  const tiers = getPricingTiers(isFirstPurchase);
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
      onSelectTierAndBuy(tier, previewOptions[activePreview]?.id);
    } else {
      onCtaClick();
    }
  };

  return (
    <section className="bg-white text-neutral-900 pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-neutral-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center max-w-2xl mx-auto text-center">
          {/* Social Proof Star Rating Tag */}
          <div className="inline-flex items-center gap-2 mb-5 px-3.5 py-1 rounded-full bg-[#FAF5FF] border border-[#E9D5FF] text-xs font-bold text-neutral-800">
            <div className="flex items-center text-[#9333EA]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#9333EA]" />
              ))}
            </div>
            <span className="text-[11px] font-black uppercase text-[#9333EA] tracking-wider">
              140+ Happy Customers
            </span>
          </div>

          {/* First Photo of the Header (Product Hero Image Gallery - Enquadrada sem cortar) */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[645/800] rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-xl p-2 sm:p-2.5 group flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-100/60 flex items-center justify-center">
              <img
                src={previewOptions[activePreview].src}
                alt={`KOSNORA - ${previewOptions[activePreview].label}`}
                className="w-full h-full object-contain block select-none transition-all duration-300"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-2 shadow-sm">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/60 shrink-0"
                  style={{ backgroundColor: previewOptions[activePreview].hex }}
                />
                <span>Cor: {previewOptions[activePreview].label}</span>
              </div>
            </div>
          </div>

          {/* Thumbnails Swatches with mini framed photo previews */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-[11px] font-bold text-neutral-500 uppercase mr-1">Cor:</span>
            {previewOptions.map((opt, idx) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setActivePreview(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  activePreview === idx
                    ? 'bg-[#9333EA] text-white shadow-md scale-105 ring-2 ring-[#9333EA]/30'
                    : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <div className="w-5 h-6 rounded overflow-hidden bg-neutral-100 border border-black/10 shrink-0 flex items-center justify-center">
                  <img src={opt.src} alt={opt.label} className="w-full h-full object-contain" />
                </div>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Direct CTA Button (Placed Below the First Photo) */}
          <div className="w-full flex flex-col items-center mt-6">
            <div className="w-full sm:w-auto flex flex-col items-center justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={onCtaClick}
                className="w-full sm:w-auto px-10 py-4.5 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white font-black text-sm tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-102 active:scale-95 flex items-center justify-center gap-2.5 uppercase cursor-pointer"
              >
                <span>GET YOUR KOSNORA</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <span>Escolha a sua oferta abaixo para comprar</span>
              </div>
            </div>

            {/* Horizontal Carousel of Purchasing Options (1 por $79,90, 2 por 139,90 e 3 por 194,90) */}
            <div className="w-full max-w-4xl relative mt-1">
              {/* Carousel navigation buttons for desktop/tablet */}
              <div className="hidden sm:flex items-center justify-between absolute -top-10 right-0 gap-1.5 z-10">
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  aria-label="Anterior"
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  aria-label="Próximo"
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
                          Mais Popular · 2 Capinhas
                        </div>
                      )}
                      {isTriple && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#9333EA] to-[#6B21A8] text-white text-[9px] font-black uppercase tracking-wider shadow-xs whitespace-nowrap">
                          Melhor Valor · 3 Capinhas
                        </div>
                      )}

                      <div>
                        {/* Header quantity and tag */}
                        <div className="flex items-center justify-between mb-2 mt-1">
                          <span className="text-sm font-black text-neutral-950 uppercase tracking-tight">
                            {tier.quantity === 1 ? '1 Capinha' : `${tier.quantity} Capinhas`}
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-[#FAF5FF] text-[#9333EA]'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}>
                            {tier.quantity === 1 ? 'Individual' : `${tier.quantity}x Unidades`}
                          </span>
                        </div>

                        {/* Price Display */}
                        <div className="text-left mb-2">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl sm:text-3xl font-black text-neutral-950">
                              ${tier.totalPrice.toFixed(2).replace('.', ',')}
                            </span>
                            {tier.quantity > 1 && (
                              <span className="text-[11px] font-bold text-neutral-500">
                                (${tier.unitPrice.toFixed(2).replace('.', ',')}/un)
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-semibold text-neutral-500 block">
                            {tier.quantity === 1
                              ? '1 por $79,90'
                              : tier.quantity === 2
                              ? '2 por 139,90'
                              : '3 por 194,90'}
                          </span>
                        </div>

                        {/* Feature bullets */}
                        <ul className="space-y-1.5 text-[11px] font-medium text-neutral-700 text-left mb-4">
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>{tier.quantity}x KOSNORA Smart Case</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>Tela Smart Ink sem bateria</span>
                          </li>
                        </ul>
                      </div>

                      {/* Buy / Select Button inside card */}
                      <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
                        <div className="text-left">
                          <span className="text-[10px] uppercase font-bold text-neutral-400 block">Total</span>
                          <span className="text-xs font-black text-neutral-900">
                            ${tier.totalPrice.toFixed(2).replace('.', ',')}
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
                          <span>Comprar</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Scroll Indicator hint for mobile */}
              <div className="sm:hidden flex items-center justify-center gap-1.5 text-[11px] font-semibold text-neutral-400 mt-1">
                <span>← Deslize para ver todas as opções →</span>
              </div>
            </div>

            {/* Quick Guarantees (perksupply style) */}
            <div className="flex items-center justify-center gap-4 text-xs font-semibold text-neutral-500 pt-3">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#9333EA]" />
                <span>30-Day Fit Guarantee</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#9333EA]" />
                <span>Zero Battery Draw</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
