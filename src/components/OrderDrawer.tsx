import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { COMPATIBLE_IPHONE_MODELS, PRODUCT_COLORS, getPricingTiers } from '../data/productData';
import { PricingTier } from '../types';
import { checkIsFirstPurchase, recordCompletedPurchase } from '../utils/customerEligibility';
import { redirectToShopifyCheckout } from '../utils/shopifyCart';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: PricingTier;
  initialModelId?: string;
  initialColorId?: string;
  onTierChange?: (tier: PricingTier) => void;
  isFirstPurchase?: boolean;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  initialTier,
  initialModelId = COMPATIBLE_IPHONE_MODELS[0].id,
  initialColorId = PRODUCT_COLORS[0].id,
  onTierChange,
  isFirstPurchase = true,
}) => {
  const [hasPriorPurchase] = useState<boolean>(!isFirstPurchase);
  const effectiveIsFirstPurchase = isFirstPurchase && !hasPriorPurchase && checkIsFirstPurchase();
  const currentTiers = getPricingTiers(effectiveIsFirstPurchase);

  const [selectedTier, setSelectedTier] = useState<PricingTier>(
    () => initialTier || currentTiers[0]
  );
  const [selectedModelId, setSelectedModelId] = useState<string>(initialModelId);
  const [selectedColorId, setSelectedColorId] = useState<string>(initialColorId);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep state synchronized with caller props whenever drawer opens or tier changes
  useEffect(() => {
    if (initialTier) {
      const matched = currentTiers.find((t) => t.quantity === initialTier.quantity) || initialTier;
      setSelectedTier(matched);
    }
  }, [initialTier, isOpen, effectiveIsFirstPurchase]);

  // If eligibility changes while open, update selectedTier pricing
  useEffect(() => {
    const matched = currentTiers.find((t) => t.quantity === selectedTier.quantity);
    if (matched && matched.totalPrice !== selectedTier.totalPrice) {
      setSelectedTier(matched);
      if (onTierChange) onTierChange(matched);
    }
  }, [effectiveIsFirstPurchase, currentTiers, selectedTier.quantity]);

  useEffect(() => {
    if (initialModelId) {
      setSelectedModelId(initialModelId);
    }
  }, [initialModelId, isOpen]);

  useEffect(() => {
    if (initialColorId) {
      setSelectedColorId(initialColorId);
    }
  }, [initialColorId, isOpen]);

  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier);
    if (onTierChange) {
      onTierChange(tier);
    }
  };

  if (!isOpen) return null;

  const currentModel =
    COMPATIBLE_IPHONE_MODELS.find((m) => m.id === selectedModelId) || COMPATIBLE_IPHONE_MODELS[0];
  const currentColor =
    PRODUCT_COLORS.find((c) => c.id === selectedColorId) || PRODUCT_COLORS[0];

  const handleProceedToCheckout = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // Record purchase in eligibility tracking
      recordCompletedPurchase({
        orderNumber: 'CHECKOUT-INITIATED',
        quantity: selectedTier.quantity,
        total: selectedTier.totalPrice,
      });

      // Redirect directly to real Shopify checkout with selected quantity
      await redirectToShopifyCheckout({
        quantity: selectedTier.quantity,
        model: currentModel.name,
        color: currentColor.name,
        unitPrice: selectedTier.unitPrice,
        totalPrice: selectedTier.totalPrice,
        isFirstPurchase: effectiveIsFirstPurchase,
      });
    } catch (err) {
      console.error('Checkout error:', err);
      // Fallback redirect directly to checkout URL
      window.location.href = '/checkout';
    } finally {
      setTimeout(() => setIsSubmitting(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div
        className="w-full max-w-xl h-full bg-white text-neutral-900 border-l border-neutral-200 flex flex-col shadow-2xl overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 bg-white/98 backdrop-blur-md px-6 py-4.5 border-b border-neutral-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#9333EA] block">
              SELECT YOUR KOSNORA
            </span>
            <h3 className="text-lg font-black text-neutral-950 uppercase">
              KOSNORA Smart Case
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close checkout drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* Step 1: Select Bundle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-700">
                1. Select Bundle:
              </label>
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                effectiveIsFirstPurchase
                  ? 'text-[#9333EA] bg-[#FAF5FF] border-[#E9D5FF]'
                  : 'text-neutral-600 bg-neutral-100 border-neutral-200'
              }`}>
                {effectiveIsFirstPurchase ? 'First Purchase Offer' : 'Standard Pricing'}
              </span>
            </div>
            <div className="space-y-2.5">
              {currentTiers.map((tier) => {
                const isSelected = selectedTier.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => handleSelectTier(tier)}
                    className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#FAF5FF] border-[#9333EA] shadow-xs'
                        : 'bg-white border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-[#9333EA] bg-[#9333EA] text-white' : 'border-neutral-400'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-sm text-neutral-900 uppercase">
                              {tier.label}
                            </span>
                            {tier.bestValue && effectiveIsFirstPurchase && (
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#9333EA] text-white">
                                BEST VALUE
                              </span>
                            )}
                            {tier.popular && !tier.bestValue && effectiveIsFirstPurchase && (
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#9333EA] text-white">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-neutral-500 font-medium">
                            {tier.quantity > 1
                              ? `$${tier.unitPrice.toFixed(2)} each · $${tier.totalPrice.toFixed(2)} total`
                              : '$79.90 single'}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-black text-neutral-900">
                          ${tier.totalPrice.toFixed(2)}
                        </div>
                        {tier.savingsTotal > 0 && effectiveIsFirstPurchase && (
                          <div className="text-[10px] text-[#9333EA] font-black uppercase">
                            Save ${tier.savingsTotal.toFixed(2)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Choose iPhone Model */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 mb-1.5">
              2. Compatible iPhone Model:
            </label>
            <select
              value={selectedModelId}
              onChange={(e) => setSelectedModelId(e.target.value)}
              className="w-full py-3 px-3.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#9333EA] cursor-pointer"
            >
              {COMPATIBLE_IPHONE_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Choose Case Color */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-700">
                3. Finish: <span className="font-bold text-neutral-900">{currentColor.name}</span>
              </label>
            </div>

            {/* Framed Selected Color Photo Preview (Sem cortes) */}
            {currentColor.imageUrl && (
              <div className="flex items-center gap-3 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200 mb-3">
                <div className="w-12 h-15 shrink-0 rounded-lg overflow-hidden bg-white border border-neutral-200 p-0.5 flex items-center justify-center">
                  <img
                    src={currentColor.imageUrl}
                    alt={currentColor.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Cor Selecionada
                  </span>
                  <span className="text-sm font-black text-neutral-950">
                    {currentColor.name}
                  </span>
                  <span className="text-[11px] text-[#9333EA] font-semibold block">
                    Foto enquadrada completa
                  </span>
                </div>
              </div>
            )}

            <div className="grid grid-cols-5 gap-2">
              {PRODUCT_COLORS.map((c) => {
                const isSelected = selectedColorId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColorId(c.id)}
                    className={`p-2 rounded-xl border-2 flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#9333EA] bg-[#FAF5FF] shadow-xs'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    {c.imageUrl ? (
                      <div className="w-6 h-8 rounded bg-white border border-black/10 overflow-hidden flex items-center justify-center">
                        <img src={c.imageUrl} alt={c.name} className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <span
                        className="w-5 h-5 rounded-full border border-neutral-300"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span className="text-[10px] font-bold text-neutral-800 truncate w-full text-center">
                      {c.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-xs space-y-2">
            <div className="flex justify-between text-neutral-600 font-medium">
              <span>Selected Bundle:</span>
              <span className="text-neutral-900 font-bold">{selectedTier.label} ({selectedTier.quantity} {selectedTier.quantity === 1 ? 'Case' : 'Cases'})</span>
            </div>
            <div className="flex justify-between text-neutral-600 font-medium">
              <span>Compatibility:</span>
              <span className="text-neutral-900 font-bold">{currentModel.name}</span>
            </div>
            <div className="flex justify-between text-neutral-600 font-medium">
              <span>Selected Finish:</span>
              <span className="text-neutral-900 font-bold">{currentColor.name}</span>
            </div>
            <div className="flex justify-between text-neutral-600 font-medium">
              <span>Shipping:</span>
              <span className="text-[#059669] font-bold">Free US Delivery</span>
            </div>
            <div className="border-t border-neutral-200 pt-2 flex justify-between font-bold text-sm text-neutral-950">
              <span>Total:</span>
              <span className="text-[#9333EA]">${selectedTier.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Drawer Sticky Footer Action */}
        <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-5 space-y-2">
          <button
            onClick={handleProceedToCheckout}
            disabled={isSubmitting}
            className="w-full py-4 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isSubmitting ? (
              <span>REDIRECTING TO CHECKOUT...</span>
            ) : (
              <>
                <span>PROCEED TO CHECKOUT · ${selectedTier.totalPrice.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </>
            )}
          </button>

          <div className="flex items-center justify-center gap-3 text-[11px] text-neutral-500 font-semibold pt-1">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-[#9333EA]" /> Free US Delivery
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9333EA]" /> 30-Day Guarantee
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

