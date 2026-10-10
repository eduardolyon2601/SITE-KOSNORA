import React, { useState, useEffect } from 'react';
import { ArrowRight, Star, ShieldCheck, Check, ShoppingBag, Truck, Layers } from 'lucide-react';
import { PricingTier, CartItemUnit } from '../types';
import { getPricingTiers, PRODUCT_IMAGES, IPHONE_MODELS } from '../data/productData';
import { isVariantInStoreCatalog } from '../data/storeInventory';

interface HeroSectionProps {
  onCtaClick: () => void;
  units: CartItemUnit[];
  activeUnitIndex: number;
  onActiveUnitIndexChange: (idx: number) => void;
  onUpdateUnit: (index: number, partial: Partial<CartItemUnit>) => void;
  selectedTier: PricingTier;
  onSelectTier: (tier: PricingTier) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onCtaClick,
  units,
  activeUnitIndex,
  onActiveUnitIndexChange,
  onUpdateUnit,
  selectedTier,
  onSelectTier,
}) => {
  const tiers = getPricingTiers();
  const currentUnit = units[activeUnitIndex] || units[0] || { id: 'unit-1', model: 'iPhone 16 Pro Max', color: 'Gray' };
  
  // Media state
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  // Current active unit's color image index
  const activeColorIdx = PRODUCT_IMAGES.findIndex(
    (img) => img.name.toLowerCase() === currentUnit.color.toLowerCase() || img.id.toLowerCase() === currentUnit.color.toLowerCase()
  );
  const currentImage = PRODUCT_IMAGES[activeColorIdx >= 0 ? activeColorIdx : 0];

  // Stock check for active unit
  const isActiveUnitAvailable = isVariantInStoreCatalog(currentUnit.model, currentUnit.color);

  // Check if ANY unit in the bundle is out of stock
  const outOfStockList = units
    .map((u, i) => ({ ...u, index: i, available: isVariantInStoreCatalog(u.model, u.color) }))
    .filter((u) => !u.available);
  const hasOutOfStock = outOfStockList.length > 0;

  const handleModelChange = (newModel: string) => {
    onUpdateUnit(activeUnitIndex, { model: newModel });
  };

  const handleColorClick = (idx: number) => {
    setIsPlayingVideo(false);
    const chosen = PRODUCT_IMAGES[idx];
    if (chosen) {
      onUpdateUnit(activeUnitIndex, { color: chosen.name });
    }
  };

  const handleVideoClick = () => {
    setIsPlayingVideo(true);
  };

  const getColorHex = (c: string) => {
    const norm = (c || '').toLowerCase();
    if (norm.includes('gray') || norm.includes('grey') || norm.includes('cinza')) return '#808080';
    if (norm.includes('black') || norm.includes('preto')) return '#111111';
    if (norm.includes('pink') || norm.includes('rosa')) return '#F472B6';
    if (norm.includes('white') || norm.includes('branco')) return '#E5E7EB';
    if (norm.includes('orange') || norm.includes('laranja')) return '#FB923C';
    return '#9333EA';
  };

  return (
    <section id="pricing" className="bg-white text-neutral-900 pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-neutral-200 relative overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ============================================================ */}
        {/* MOBILE VIEW (< lg)                                           */}
        {/* ============================================================ */}
        <div className="lg:hidden flex flex-col items-center max-w-2xl mx-auto text-center">
          {/* Social Proof Star Rating Tag */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-white border border-[#E9D5FF] shadow-xs">
            <div className="flex -space-x-2 shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&auto=format&fit=crop&q=80"
                alt="Verified Customer"
                className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&auto=format&fit=crop&q=80"
                alt="Verified Customer"
                className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&auto=format&fit=crop&q=80"
                alt="Verified Customer"
                className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
              />
            </div>

            <div className="flex items-center gap-1">
              <span className="text-xs font-black text-neutral-900 leading-none">4.7</span>
              <div className="flex items-center text-[#9333EA] -space-x-0.5">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#9333EA]" />
                ))}
                <div className="relative w-3.5 h-3.5">
                  <Star className="w-3.5 h-3.5 text-neutral-200 fill-neutral-200 absolute inset-0" />
                  <div className="overflow-hidden absolute inset-0 w-[70%]">
                    <Star className="w-3.5 h-3.5 fill-[#9333EA] text-[#9333EA]" />
                  </div>
                </div>
              </div>
            </div>

            <span className="text-[11px] font-bold text-neutral-700 tracking-wide flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span><strong className="font-black text-neutral-900">140+</strong> Happy Customers</span>
            </span>

            <span className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-black uppercase tracking-wider text-[#9333EA] bg-[#FAF5FF] px-1.5 py-0.5 rounded-md border border-[#E9D5FF]">
              <Check className="w-2.5 h-2.5 stroke-[3]" /> Verified
            </span>
          </div>

          {/* Multi-Unit Switcher for Bundles (Mobile) */}
          {units.length > 1 && (
            <div className="w-full max-w-sm mb-3">
              <div className="text-[10px] font-black uppercase tracking-wider text-[#9333EA] mb-1.5 flex items-center justify-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Personalize cada capa do seu pacote:</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 p-1 bg-neutral-100/90 rounded-2xl overflow-x-auto">
                {units.map((u, i) => {
                  const isActive = i === activeUnitIndex;
                  const isUAvail = isVariantInStoreCatalog(u.model, u.color);
                  return (
                    <button
                      key={u.id || i}
                      type="button"
                      onClick={() => onActiveUnitIndexChange(i)}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-white text-[#9333EA] shadow-xs ring-1 ring-[#9333EA]/30'
                          : 'text-neutral-600 hover:text-neutral-950 hover:bg-white/50'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: getColorHex(u.color) }} />
                      <span>Capa #{i + 1}</span>
                      {!isUAvail && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Esgotado" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile Media: Looping Video / Photo */}
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[645/800] rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-xl p-2 sm:p-2.5 flex items-center justify-center">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              {isPlayingVideo ? (
                <div className="absolute inset-0 w-full h-full bg-black z-10 overflow-hidden flex items-center justify-center">
                  <iframe
                    src="https://player.vimeo.com/video/1234575864?h=86322bd9-a325-437a-a838-9ae5a0653601&autoplay=1&loop=1&muted=1&playsinline=1&autopause=0&controls=0&background=1"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full scale-150 origin-center border-0 pointer-events-none"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="KOSNORA Video"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 pointer-events-none shadow-sm z-20">
                    <span className="w-2 h-2 rounded-full bg-[#9333EA] animate-pulse inline-block" />
                    <span>Video</span>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={currentImage.url}
                    alt={`KOSNORA - ${currentImage.name}`}
                    className="w-full h-full object-contain block select-none transition-all duration-300 bg-neutral-50"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider shadow-sm z-20 flex items-center gap-1.5">
                    {units.length > 1 && <span className="text-[#E9D5FF] font-bold">Capa #{activeUnitIndex + 1}:</span>}
                    <span>{currentImage.name}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Color Pills for Active Unit */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5 max-w-sm">
            <button
              type="button"
              onClick={handleVideoClick}
              className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                isPlayingVideo
                  ? 'bg-[#9333EA] text-white shadow-xs scale-102 ring-1 ring-[#9333EA]/30'
                  : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <span>▶ Video</span>
            </button>

            {PRODUCT_IMAGES.map((img, idx) => {
              const isSelected = !isPlayingVideo && currentUnit.color.toLowerCase() === img.name.toLowerCase();
              const isColorAvailable = isVariantInStoreCatalog(currentUnit.model, img.name);
              return (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => handleColorClick(idx)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#FAF5FF] border border-[#9333EA] text-[#9333EA] shadow-xs ring-1 ring-[#9333EA]/30'
                      : isColorAvailable
                      ? 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                      : 'bg-neutral-50 border border-neutral-200 text-neutral-400 hover:bg-neutral-100 opacity-80'
                  }`}
                  title={isColorAvailable ? `${img.name} - Em estoque` : `${img.name} - Esgotado para ${currentUnit.model}`}
                >
                  <div className="w-3 h-4 rounded overflow-hidden bg-neutral-100 border border-black/10 shrink-0 flex items-center justify-center">
                    <img src={img.url} alt={img.name} className="w-full h-full object-contain" />
                  </div>
                  <span>{img.name}</span>
                  {!isColorAvailable && (
                    <span className="text-[8px] font-bold text-amber-700 bg-amber-100/90 px-1 py-0.2 rounded leading-none">
                      Esgotado
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Model selection on page for Active Unit */}
          <div className="w-full max-w-xs mt-3 flex items-center justify-center gap-2">
            <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider whitespace-nowrap">
              {units.length > 1 ? `Modelo (Capa #${activeUnitIndex + 1}):` : 'Modelo:'}
            </span>
            <select
              value={currentUnit.model}
              onChange={(e) => handleModelChange(e.target.value)}
              className="py-1 px-2.5 text-xs font-bold text-neutral-800 bg-white border border-neutral-300 rounded-lg shadow-2xs focus:outline-none focus:border-[#9333EA] cursor-pointer"
            >
              {IPHONE_MODELS.map((m) => {
                const isModelAvailable = isVariantInStoreCatalog(m, currentUnit.color);
                return (
                  <option key={m} value={m}>
                    {m}{!isModelAvailable ? ' · (Esgotado)' : ''}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Stock Availability Indicator Pill */}
          <div className="mt-2.5">
            {isActiveUnitAvailable ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Em estoque · Pronta entrega {units.length > 1 ? `(Capa #${activeUnitIndex + 1})` : ''}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-amber-800 bg-amber-50 border border-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>Esgotado nesta combinação {units.length > 1 ? `(Capa #${activeUnitIndex + 1})` : `(${currentUnit.color} / ${currentUnit.model})`}</span>
              </span>
            )}
          </div>

          {/* Direct CTA Button */}
          <div className="w-full flex flex-col items-center mt-4">
            <div className="w-full sm:w-auto flex flex-col items-center justify-center gap-3 mb-6">
              <button
                type="button"
                disabled={hasOutOfStock}
                onClick={onCtaClick}
                className={`w-full sm:w-auto px-10 py-4.5 font-black text-sm tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2.5 uppercase ${
                  !hasOutOfStock
                    ? 'bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white hover:shadow-lg transform hover:scale-102 active:scale-95 cursor-pointer'
                    : 'bg-neutral-200 text-neutral-400 border border-neutral-300 cursor-not-allowed opacity-80'
                }`}
              >
                <span>
                  {hasOutOfStock
                    ? `COMBINAÇÃO ESGOTADA (Capa #${outOfStockList[0].index + 1})`
                    : `GET YOUR KOSNORA (${units.length} ${units.length === 1 ? 'CAPA' : 'CAPAS'})`}
                </span>
                {!hasOutOfStock && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                <span>Clique em um pacote abaixo para comprar com desconto</span>
              </div>
            </div>

            {/* Purchasing Options Tiers (Mobile Stack) */}
            <div className="w-full max-w-4xl relative mt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-4 pb-2 px-1">
                {tiers.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  const isDouble = tier.quantity === 2;
                  const isTriple = tier.quantity === 3;

                  return (
                    <div
                      key={tier.id}
                      onClick={() => onSelectTier(tier)}
                      className={`w-full rounded-2xl p-4 sm:p-5 transition-all cursor-pointer flex flex-col justify-between border-2 bg-white relative select-none hover:shadow-lg ${
                        isSelected
                          ? 'border-[#9333EA] shadow-md ring-2 ring-[#9333EA]/20 -translate-y-0.5'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {isDouble && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#9333EA] text-white text-[9px] font-black uppercase tracking-wider shadow-xs whitespace-nowrap z-10">
                          Most Popular · 2 Cases
                        </div>
                      )}
                      {isTriple && (
                        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#9333EA] to-[#6B21A8] text-white text-[9px] font-black uppercase tracking-wider shadow-xs whitespace-nowrap z-10">
                          Best Value · 3 Cases
                        </div>
                      )}

                      <div>
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
                          {tier.quantity > 1 && (
                            <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">
                              {tier.quantity === 2 ? 'Save $19.90 (Modelos e cores livres!)' : 'Save $44.80 (Modelos e cores livres!)'}
                            </span>
                          )}
                        </div>

                        <ul className="space-y-1.5 text-[11px] font-medium text-neutral-700 text-left mb-4">
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>{tier.quantity}x KOSNORA Smart Case</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>Misture modelos e cores à vontade</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>30-Day Money-Back Guarantee</span>
                          </li>
                        </ul>
                      </div>

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
                            onSelectTier(tier);
                            onCtaClick();
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#9333EA] text-white shadow-sm hover:brightness-110'
                              : 'bg-neutral-900 text-white hover:bg-neutral-800'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Selecionar</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP VIEW (>= lg)                                         */}
        {/* ============================================================ */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8 xl:gap-12 items-start">
            
            {/* LEFT COLUMN: Media Container */}
            <div className="col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[645/800] rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-2xl p-2.5 xl:p-3 flex items-center justify-center">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                  {isPlayingVideo ? (
                    <div className="absolute inset-0 w-full h-full bg-black z-10 overflow-hidden flex items-center justify-center">
                      <iframe
                        src="https://player.vimeo.com/video/1234575864?h=86322bd9-a325-437a-a838-9ae5a0653601&autoplay=1&loop=1&muted=1&playsinline=1&autopause=0&controls=0&background=1"
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full scale-150 origin-center border-0 pointer-events-none"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title="KOSNORA Video"
                      />
                      <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 pointer-events-none shadow-sm z-20">
                        <span className="w-2 h-2 rounded-full bg-[#9333EA] animate-pulse inline-block" />
                        <span>Video</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img
                        src={currentImage.url}
                        alt={`KOSNORA - ${currentImage.name}`}
                        className="w-full h-full object-contain block select-none transition-all duration-300 bg-neutral-50"
                      />
                      <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider shadow-sm z-20 flex items-center gap-1.5">
                        {units.length > 1 && <span className="text-[#E9D5FF] font-bold">Capa #{activeUnitIndex + 1}:</span>}
                        <span>{currentImage.name}</span>
                      </div>
                    </>
                  )}
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

            {/* RIGHT COLUMN: Configuration, Units & Bundles */}
            <div className="col-span-7 flex flex-col pt-1">
              {/* Star Rating Badge */}
              <div className="inline-flex items-center gap-2.5 mb-3 px-3 py-1.5 rounded-full bg-white border border-[#E9D5FF] shadow-xs self-start">
                <div className="flex -space-x-2 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&auto=format&fit=crop&q=80"
                    alt="Verified Customer"
                    className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&auto=format&fit=crop&q=80"
                    alt="Verified Customer"
                    className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&auto=format&fit=crop&q=80"
                    alt="Verified Customer"
                    className="w-5 h-5 rounded-full ring-2 ring-white object-cover"
                  />
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-neutral-900 leading-none">4.7</span>
                  <div className="flex items-center text-[#9333EA] -space-x-0.5">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#9333EA]" />
                    ))}
                    <div className="relative w-3.5 h-3.5">
                      <Star className="w-3.5 h-3.5 text-neutral-200 fill-neutral-200 absolute inset-0" />
                      <div className="overflow-hidden absolute inset-0 w-[70%]">
                        <Star className="w-3.5 h-3.5 fill-[#9333EA] text-[#9333EA]" />
                      </div>
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-neutral-700 tracking-wide flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-neutral-300" />
                  <span><strong className="font-black text-neutral-900">140+</strong> Happy Customers</span>
                </span>

                <span className="inline-flex items-center gap-0.5 text-[10px] font-black uppercase tracking-wider text-[#9333EA] bg-[#FAF5FF] px-1.5 py-0.5 rounded-md border border-[#E9D5FF]">
                  <Check className="w-2.5 h-2.5 stroke-[3]" /> Verified
                </span>
              </div>

              {/* Product Headline */}
              <h1 className="text-3xl xl:text-4xl font-black uppercase tracking-tight text-neutral-950 mb-1.5">
                KOSNORA Case
              </h1>
              <p className="text-sm font-semibold text-neutral-600 mb-3 leading-relaxed">
                Refined minimalist design, reinforced impact protection, and battery-free NFC smart display. Combine different models and colors freely in the same order.
              </p>

              {/* Multi-Unit Switcher Tabs (Desktop) */}
              {units.length > 1 && (
                <div className="w-full mb-3.5 p-3 rounded-2xl bg-[#FAF5FF] border border-[#E9D5FF]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#9333EA] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Seu Pacote de {units.length} Capas:</span>
                    </span>
                    <span className="text-[11px] font-bold text-neutral-500">
                      Clique para configurar cada uma:
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
                    {units.map((u, i) => {
                      const isActive = i === activeUnitIndex;
                      const isUAvail = isVariantInStoreCatalog(u.model, u.color);
                      return (
                        <button
                          key={u.id || i}
                          type="button"
                          onClick={() => onActiveUnitIndexChange(i)}
                          className={`px-3 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                            isActive
                              ? 'bg-white text-[#9333EA] shadow-xs ring-2 ring-[#9333EA]'
                              : 'bg-white/70 text-neutral-700 hover:bg-white hover:text-neutral-950 border border-neutral-200'
                          }`}
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: getColorHex(u.color) }}
                          />
                          <span className="truncate max-w-[130px]">
                            #{i + 1}: {u.model} ({u.color})
                          </span>
                          {!isUAvail && (
                            <span className="text-[9px] font-bold text-amber-700 bg-amber-100 px-1 py-0.2 rounded">
                              Esgotado
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* iPhone Model Selection for Active Unit */}
              <div className="w-full mb-3 flex items-center justify-between gap-3 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <span className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider whitespace-nowrap">
                  {units.length > 1 ? `Modelo da Capa #${activeUnitIndex + 1}:` : 'Modelo do iPhone:'}
                </span>
                <select
                  value={currentUnit.model}
                  onChange={(e) => handleModelChange(e.target.value)}
                  className="w-full max-w-[220px] py-1 px-2.5 text-xs font-bold text-neutral-900 bg-white border border-neutral-300 rounded-lg shadow-2xs focus:outline-none focus:border-[#9333EA] cursor-pointer"
                >
                  {IPHONE_MODELS.map((m) => {
                    const isModelAvailable = isVariantInStoreCatalog(m, currentUnit.color);
                    return (
                      <option key={m} value={m}>
                        {m}{!isModelAvailable ? ' · (Esgotado)' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Compact Color Selection for Active Unit */}
              <div className="w-full mb-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                    {units.length > 1 ? `Cor da Capa #${activeUnitIndex + 1}:` : 'Media / Color:'}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black text-[#9333EA] uppercase tracking-wider">
                      {isPlayingVideo ? 'Video' : currentUnit.color}
                    </span>
                    {!isPlayingVideo && (
                      isActiveUnitAvailable ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Em estoque</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>Esgotado</span>
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleVideoClick}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                      isPlayingVideo
                        ? 'bg-[#FAF5FF] border border-[#9333EA] text-[#9333EA] shadow-xs ring-1 ring-[#9333EA]/30'
                        : 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                    }`}
                  >
                    <span className="text-[10px] text-[#9333EA]">▶</span>
                    <span>Video</span>
                  </button>

                  {PRODUCT_IMAGES.map((img, idx) => {
                    const isSelected = !isPlayingVideo && currentUnit.color.toLowerCase() === img.name.toLowerCase();
                    const isColorAvailable = isVariantInStoreCatalog(currentUnit.model, img.name);
                    return (
                      <button
                        key={img.id}
                        type="button"
                        onClick={() => handleColorClick(idx)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FAF5FF] border border-[#9333EA] text-[#9333EA] shadow-xs ring-1 ring-[#9333EA]/30'
                            : isColorAvailable
                            ? 'bg-white border border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:bg-neutral-50'
                            : 'bg-neutral-50 border border-neutral-200 text-neutral-400 hover:bg-neutral-100 opacity-80'
                        }`}
                        title={isColorAvailable ? `${img.name} - Em estoque` : `${img.name} - Esgotado para ${currentUnit.model}`}
                      >
                        <div className="w-3.5 h-4.5 rounded overflow-hidden bg-neutral-100 shrink-0 flex items-center justify-center">
                          <img src={img.url} alt={img.name} className="w-full h-full object-contain" />
                        </div>
                        <span>{img.name}</span>
                        {!isColorAvailable && (
                          <span className="text-[8px] font-bold text-amber-700 bg-amber-100/90 px-1 py-0.2 rounded leading-none">
                            Esgotado
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Direct CTA Button (GET YOUR KOSNORA) */}
              <button
                type="button"
                disabled={hasOutOfStock}
                onClick={onCtaClick}
                className={`w-full py-4.5 px-8 font-black text-sm tracking-widest rounded-xl shadow-md transition-all flex items-center justify-center gap-2.5 uppercase mb-5 ${
                  !hasOutOfStock
                    ? 'bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white hover:shadow-lg transform hover:scale-[1.01] active:scale-95 cursor-pointer'
                    : 'bg-neutral-200 text-neutral-400 border border-neutral-300 cursor-not-allowed opacity-80'
                }`}
              >
                <span>
                  {hasOutOfStock
                    ? `COMBINAÇÃO ESGOTADA (Capa #${outOfStockList[0].index + 1})`
                    : `GET YOUR KOSNORA (${units.length} ${units.length === 1 ? 'CAPA' : 'CAPAS'})`}
                </span>
                {!hasOutOfStock && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
              </button>

              {/* Title for purchasing options */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-neutral-900">
                  Bundles & Pricing:
                </span>
                <span className="text-xs font-semibold text-neutral-500">
                  Selecione seu pacote (combine variantes diferentes livremente)
                </span>
              </div>

              {/* 3 Values Options Desktop Grid */}
              <div className="grid grid-cols-3 gap-3.5 pt-4 pb-2 px-1 mb-5">
                {tiers.map((tier) => {
                  const isSelected = selectedTier.id === tier.id;
                  const isDouble = tier.quantity === 2;
                  const isTriple = tier.quantity === 3;

                  return (
                    <div
                      key={tier.id}
                      onClick={() => onSelectTier(tier)}
                      className={`rounded-2xl p-4 transition-all cursor-pointer flex flex-col justify-between border-2 bg-white relative select-none hover:shadow-lg ${
                        isSelected
                          ? 'border-[#9333EA] shadow-md ring-2 ring-[#9333EA]/20 -translate-y-0.5'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
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

                        <ul className="space-y-1 text-[11px] font-medium text-neutral-700 text-left mb-3">
                          <li className="flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>{tier.quantity}x KOSNORA Smart Case</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>Misture modelos e cores livres</span>
                          </li>
                          <li className="flex items-center gap-1">
                            <Check className="w-3.5 h-3.5 text-[#9333EA] shrink-0 stroke-[2.5]" />
                            <span>30-Day Guarantee</span>
                          </li>
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTier(tier);
                          onCtaClick();
                        }}
                        className={`w-full py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#9333EA] text-white shadow-sm hover:brightness-110'
                            : 'bg-neutral-900 text-white hover:bg-neutral-800'
                        }`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Selecionar</span>
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
