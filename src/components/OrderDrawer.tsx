import React, { useState } from 'react';
import { X, Check, ShieldCheck, Lock, ArrowRight, Truck, CreditCard } from 'lucide-react';
import { PRICING_TIERS, COMPATIBLE_IPHONE_MODELS, PRODUCT_COLORS } from '../data/productData';
import { PricingTier } from '../types';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: PricingTier;
  initialModelId?: string;
  initialColorId?: string;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  initialTier = PRICING_TIERS[1],
  initialModelId = COMPATIBLE_IPHONE_MODELS[0].id,
  initialColorId = PRODUCT_COLORS[0].id,
}) => {
  const [selectedTier, setSelectedTier] = useState<PricingTier>(initialTier);
  const [selectedModelId, setSelectedModelId] = useState<string>(initialModelId);
  const [selectedColorId, setSelectedColorId] = useState<string>(initialColorId);
  const [checkoutStep, setCheckoutStep] = useState<'configure' | 'checkout' | 'success'>('configure');

  // Customer checkout form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    paymentMethod: 'card' as 'card' | 'applepay' | 'paypal',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const currentModel =
    COMPATIBLE_IPHONE_MODELS.find((m) => m.id === selectedModelId) || COMPATIBLE_IPHONE_MODELS[0];
  const currentColor =
    PRODUCT_COLORS.find((c) => c.id === selectedColorId) || PRODUCT_COLORS[0];

  const handleProceedToCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderNumber(`KNR-${Math.floor(100000 + Math.random() * 900000)}`);
      setCheckoutStep('success');
    }, 900);
  };

  const handleReset = () => {
    setCheckoutStep('configure');
    onClose();
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
              {checkoutStep === 'success'
                ? 'ORDER CONFIRMED'
                : checkoutStep === 'checkout'
                ? 'SECURE CHECKOUT'
                : 'SELECT YOUR KOSNORA'}
            </span>
            <h3 className="text-lg font-black text-neutral-950 uppercase">
              {checkoutStep === 'success' ? 'Thank You For Your Order' : 'KOSNORA Smart Case'}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            aria-label="Close checkout drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="p-6 space-y-6 flex-1">
          {/* STEP 3: ORDER SUCCESS */}
          {checkoutStep === 'success' ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#9333EA] to-[#6B21A8] text-white flex items-center justify-center mx-auto shadow-lg animate-in zoom-in-75">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div>
                <span className="text-xs font-black text-[#9333EA] uppercase tracking-wider block mb-1">
                  ORDER #{orderNumber}
                </span>
                <h4 className="text-2xl font-black text-neutral-950 uppercase">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto font-medium mt-1">
                  We've received your order and are preparing your package for shipment. A confirmation email has been dispatched.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-4.5 rounded-2xl bg-white border border-neutral-200 text-left text-xs space-y-2.5 max-w-md mx-auto shadow-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Package:</span>
                  <span className="text-neutral-900 font-bold">{selectedTier.label}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Phone Model:</span>
                  <span className="text-neutral-900 font-bold">{currentModel.name}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Finish:</span>
                  <span className="text-neutral-900 font-bold">{currentColor.name}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Shipping:</span>
                  <span className="text-[#059669] font-bold">FREE Insured US Delivery</span>
                </div>
                <div className="flex justify-between text-neutral-600 pt-2.5 border-t border-neutral-200 font-bold">
                  <span>Total Paid:</span>
                  <span className="text-[#9333EA] font-black text-base">
                    ${selectedTier.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF] text-[11px] font-semibold text-[#7E22CE] max-w-md mx-auto flex items-center justify-center gap-2">
                <Truck className="w-4 h-4 text-[#9333EA]" />
                <span>Estimated Delivery: 3–5 Business Days (Tracked)</span>
              </div>

              <button
                onClick={handleReset}
                className="w-full max-w-md mx-auto py-3.5 bg-neutral-950 hover:bg-black text-white font-black text-xs tracking-widest uppercase rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Return to Store
              </button>
            </div>
          ) : checkoutStep === 'checkout' ? (
            /* STEP 2: COMPLETE CHECKOUT FORM */
            <form onSubmit={handleCompleteOrder} className="space-y-5">
              {/* Mini Order Summary */}
              <div className="p-3.5 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-between text-xs">
                <div>
                  <span className="font-black text-neutral-900 block">
                    {selectedTier.quantity}x KOSNORA ({currentModel.name})
                  </span>
                  <span className="text-neutral-500 font-semibold text-[11px]">
                    Finish: {currentColor.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-[#9333EA]">
                    ${selectedTier.totalPrice.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('configure')}
                    className="block text-[10px] text-neutral-500 font-bold underline hover:text-[#9333EA] cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {/* Express Payment Simulation Options */}
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600 mb-2">
                  Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'applepay', label: 'Apple Pay', icon: Lock },
                    { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: pm.id as any })}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        formData.paymentMethod === pm.id
                          ? 'border-[#9333EA] bg-[#FAF5FF] text-[#9333EA]'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      <pm.icon className="w-4 h-4" />
                      <span className="text-[11px]">{pm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer Contact & Shipping */}
              <div className="space-y-3">
                <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-600">
                  Shipping & Contact Details:
                </label>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-semibold focus:border-[#9333EA] focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address (for order tracking)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-semibold focus:border-[#9333EA] focus:outline-none"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-semibold focus:border-[#9333EA] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-semibold focus:border-[#9333EA] focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code / ZIP"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs sm:text-sm font-semibold focus:border-[#9333EA] focus:outline-none"
                  />
                </div>
              </div>

              {/* Trust Badges */}
              <div className="pt-2 flex items-center justify-center gap-4 text-[11px] font-semibold text-neutral-500">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#059669]" /> 256-bit SSL Encrypted
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#9333EA]" /> Free US Shipping
                </span>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>PROCESSING ORDER...</span>
                  ) : (
                    <>
                      <span>COMPLETE ORDER · ${selectedTier.totalPrice.toFixed(2)}</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* STEP 1: CONFIGURE BUNDLE & MODEL */
            <>
              {/* Step 1: Select Bundle */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 mb-2">
                  1. Select Bundle:
                </label>
                <div className="space-y-2.5">
                  {PRICING_TIERS.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
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
                                {tier.bestValue && (
                                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#9333EA] text-white">
                                    BEST VALUE
                                  </span>
                                )}
                                {tier.popular && !tier.bestValue && (
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
                            {tier.savingsTotal > 0 && (
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
                  className="w-full py-3 px-3.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 text-xs sm:text-sm font-bold focus:outline-none focus:border-[#9333EA]"
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
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-700 mb-1.5">
                  3. Finish: <span className="font-bold text-neutral-900">{currentColor.name}</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {PRODUCT_COLORS.map((c) => {
                    const isSelected = selectedColorId === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedColorId(c.id)}
                        className={`p-2.5 rounded-xl border-2 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#9333EA] bg-[#FAF5FF] shadow-xs'
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-neutral-300"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-[10px] font-bold text-neutral-800 truncate w-full text-center">
                          {c.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Sticky Footer Action (Only on configure step) */}
        {checkoutStep === 'configure' && (
          <div className="sticky bottom-0 bg-white border-t border-neutral-200 p-5 space-y-2">
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 text-white font-black text-xs sm:text-sm tracking-widest uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>CHECKOUT · ${selectedTier.totalPrice.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
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
        )}
      </div>
    </div>
  );
};
