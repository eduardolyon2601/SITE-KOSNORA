import React, { useState } from 'react';
import { Check, Smartphone, ArrowRight, Lock } from 'lucide-react';
import { COMPATIBLE_IPHONE_MODELS, PRODUCT_COLORS, PRICING_TIERS } from '../data/productData';
import { PricingTier } from '../types';

interface OfferSectionProps {
  onSelectTier: (tier: PricingTier, modelId?: string, colorId?: string) => void;
  onBuyNow?: (tier: PricingTier, modelId?: string, colorId?: string) => void;
  selectedTier?: PricingTier;
}

export const OfferSection: React.FC<OfferSectionProps> = ({ onSelectTier, onBuyNow, selectedTier }) => {
  const [selectedModel, setSelectedModel] = useState<string>(COMPATIBLE_IPHONE_MODELS[0].id);
  const [selectedColor, setSelectedColor] = useState<string>(PRODUCT_COLORS[0].id);
  const [activeTierId, setActiveTierId] = useState<string>(selectedTier?.id || PRICING_TIERS[0].id);

  // Sync if parent updates selectedTier
  React.useEffect(() => {
    if (selectedTier) {
      setActiveTierId(selectedTier.id);
    }
  }, [selectedTier]);

  const currentTier = PRICING_TIERS.find((t) => t.id === activeTierId) || PRICING_TIERS[0];
  const activeColorObj = PRODUCT_COLORS.find((c) => c.id === selectedColor) || PRODUCT_COLORS[0];

  const handleAddToCart = () => {
    onSelectTier(currentTier, selectedModel, selectedColor);
  };

  const handleInstantBuy = () => {
    if (onBuyNow) {
      onBuyNow(currentTier, selectedModel, selectedColor);
    } else {
      onSelectTier(currentTier, selectedModel, selectedColor);
    }
  };

  return (
    <section id="pricing" className="bg-white text-neutral-900 py-12 sm:py-20 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-black tracking-widest text-[#9333EA] uppercase block mb-1">
            PRODUCT & OFFER
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-neutral-950 mb-2">
            CHOOSE YOUR KOSNORA
          </h2>
          <p className="text-sm sm:text-base font-semibold text-neutral-600">
            Select your iPhone model and quantity bundle.
          </p>
        </div>

        {/* 1. Select iPhone Model & Finish */}
        <div className="max-w-3xl mx-auto bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Model Selector */}
          <div className="w-full sm:w-auto flex-1">
            <label className="text-[11px] font-black uppercase tracking-wider text-neutral-500 flex items-center gap-1.5 mb-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#9333EA]" />
              <span>1. Select iPhone Model:</span>
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-white border border-neutral-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl px-3 py-2.5 focus:border-[#9333EA] focus:ring-1 focus:ring-[#9333EA] focus:outline-none cursor-pointer"
            >
              {COMPATIBLE_IPHONE_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Color Finish */}
          <div className="w-full sm:w-auto">
            <label className="text-[11px] font-black uppercase tracking-wider text-neutral-500 block mb-1.5">
              Finish: <span className="text-neutral-900 font-bold">{activeColorObj.name}</span>
            </label>
            <div className="flex items-center gap-2">
              {PRODUCT_COLORS.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedColor(c.id)}
                  title={c.name}
                  className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                    selectedColor === c.id
                      ? 'border-[#9333EA] scale-110 shadow-xs'
                      : 'border-neutral-300 hover:border-neutral-400'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 2. Select Quantity Bundle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-8">
          {/* 1 UNIT: $79.90 */}
          <div
            onClick={() => setActiveTierId('single')}
            className={`rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between border-2 bg-white ${
              activeTierId === 'single'
                ? 'border-[#9333EA] shadow-md ring-2 ring-[#9333EA]/20'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-black text-neutral-950 uppercase">1 UNIT</h3>
                <span className="text-xs font-bold text-neutral-400">Single</span>
              </div>
              <div className="text-3xl font-black text-neutral-950 mb-1">$79.90</div>
              <span className="text-xs font-semibold text-neutral-500 block mb-4">Standard single case</span>

              <ul className="space-y-2 text-xs font-medium text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#9333EA] shrink-0" />
                  <span>1x KOSNORA Smart Case</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#9333EA] shrink-0" />
                  <span>Customizable display</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-bold text-neutral-500">Total: $79.90</span>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${activeTierId === 'single' ? 'border-[#9333EA] bg-[#9333EA]' : 'border-neutral-300'}`}>
                {activeTierId === 'single' && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </span>
            </div>
          </div>

          {/* 2 UNITS: $69.90 EACH / $139.80 TOTAL */}
          <div
            onClick={() => setActiveTierId('double')}
            className={`rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between border-2 bg-white relative ${
              activeTierId === 'double'
                ? 'border-[#9333EA] shadow-md ring-2 ring-[#9333EA]/20'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-black text-neutral-950 uppercase">2 UNITS</h3>
                <span className="text-xs font-bold text-[#9333EA]">Double Pack</span>
              </div>
              <div className="text-3xl font-black text-neutral-950 mb-0.5">
                $69.90 <span className="text-sm font-bold text-neutral-500">EACH</span>
              </div>
              <span className="text-xs font-black text-[#9333EA] block mb-4">$139.80 TOTAL</span>

              <ul className="space-y-2 text-xs font-medium text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#9333EA] shrink-0" />
                  <span>2x KOSNORA Smart Cases</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#9333EA] shrink-0" />
                  <span>Customizable display</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-black text-[#9333EA]">Total: $139.80</span>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${activeTierId === 'double' ? 'border-[#9333EA] bg-[#9333EA]' : 'border-neutral-300'}`}>
                {activeTierId === 'double' && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </span>
            </div>
          </div>

          {/* 3 UNITS: $59.90 EACH / $179.70 TOTAL (HIGHLIGHTED BEST VALUE) */}
          <div
            onClick={() => setActiveTierId('triple')}
            className={`rounded-2xl p-6 transition-all cursor-pointer flex flex-col justify-between border-2 bg-white relative ${
              activeTierId === 'triple'
                ? 'border-[#9333EA] shadow-md ring-2 ring-[#9333EA]/20'
                : 'border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
              BEST VALUE
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-black text-neutral-950 uppercase">3 UNITS</h3>
                <span className="text-xs font-black text-[#9333EA]">Best Price</span>
              </div>
              <div className="text-3xl font-black text-neutral-950 mb-0.5">
                $59.90 <span className="text-sm font-bold text-neutral-500">EACH</span>
              </div>
              <span className="text-xs font-black text-[#9333EA] block mb-4">$179.70 TOTAL</span>

              <ul className="space-y-2 text-xs font-medium text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#9333EA] shrink-0" />
                  <span>3x KOSNORA Smart Cases</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#9333EA] shrink-0" />
                  <span>Customizable display</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs font-black text-[#9333EA]">Total: $179.70</span>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${activeTierId === 'triple' ? 'border-[#9333EA] bg-[#9333EA]' : 'border-neutral-300'}`}>
                {activeTierId === 'triple' && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </span>
            </div>
          </div>
        </div>

        {/* 3. Action Buttons: Add to Cart & Buy Now */}
        <div className="max-w-xl mx-auto space-y-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-4.5 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white font-black text-sm sm:text-base tracking-widest uppercase rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-101 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>ADD TO CART · ${currentTier.totalPrice.toFixed(2)}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={handleInstantBuy}
            className="w-full py-3.5 bg-neutral-900 hover:bg-black text-white font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>BUY NOW</span>
          </button>
        </div>
      </div>
    </section>
  );
};
