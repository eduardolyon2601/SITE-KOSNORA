import React, { useState, useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Lock, AlertCircle } from 'lucide-react';
import { calculateCartPricing, formatCurrency, PRODUCT_IMAGES, PRODUCT_NAME } from '../data/productData';
import { redirectToShopifyCheckout, resolveShopifyVariant } from '../utils/shopifyCart';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  selectedColor: string;
  selectedModel: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  quantity,
  onQuantityChange,
  selectedColor,
  selectedModel,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [variantError, setVariantError] = useState<string | null>(null);
  const [isCheckingVariant, setIsCheckingVariant] = useState(false);
  const [resolvedVariant, setResolvedVariant] = useState<{ id: string; available?: boolean } | null>(null);

  // Validate and resolve variant whenever drawer opens or options change
  useEffect(() => {
    if (!isOpen) {
      setVariantError(null);
      return;
    }

    let isMounted = true;
    setIsCheckingVariant(true);
    setVariantError(null);

    resolveShopifyVariant(selectedModel, selectedColor)
      .then((res) => {
        if (!isMounted) return;
        setResolvedVariant(res);
        if (res && res.available === false) {
          setVariantError(`A opção "${selectedModel} - ${selectedColor}" está esgotada no momento.`);
        } else {
          setVariantError(null);
        }
      })
      .catch((err) => {
        console.warn('[KOSNORA] Variant check error:', err);
      })
      .finally(() => {
        if (isMounted) setIsCheckingVariant(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedModel, selectedColor]);

  if (!isOpen) return null;

  // Active product image based on selected color
  const matchedImage = PRODUCT_IMAGES.find(
    (img) => img.name.toLowerCase() === selectedColor.toLowerCase() || img.id.toLowerCase() === selectedColor.toLowerCase()
  ) || PRODUCT_IMAGES[0];

  const pricing = calculateCartPricing(quantity, 'R$');

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  const handleProceedToCheckout = async () => {
    if (isSubmitting) return;

    // Check if variant is available
    if (resolvedVariant && resolvedVariant.available === false) {
      setVariantError(`A opção "${selectedModel} - ${selectedColor}" está esgotada no momento. Escolha outra opção para continuar.`);
      return;
    }

    setIsSubmitting(true);
    setVariantError(null);

    try {
      await redirectToShopifyCheckout({
        quantity: pricing.quantity,
        model: selectedModel,
        color: selectedColor,
        unitPrice: pricing.unitPrice,
        totalPrice: pricing.total,
        variantId: resolvedVariant?.id,
      });
    } catch (err) {
      console.error('[KOSNORA] Checkout error:', err);
      setVariantError('Ocorreu um erro ao processar o checkout. Por favor, tente novamente.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-title" role="dialog" aria-modal="true">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          
          {/* Header */}
          <div className="px-6 py-4.5 border-b border-neutral-200 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 id="cart-title" className="text-sm font-black uppercase tracking-wider text-neutral-900">
                  Seu Carrinho
                </h2>
                <p className="text-[11px] font-semibold text-neutral-500">
                  {quantity} {quantity === 1 ? 'item selecionado' : 'itens selecionados'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Fechar carrinho"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content: Minimalist & Focused on Conversion */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            
            {/* Essential Product Card (Zero duplicate selectors!) */}
            <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/50 flex gap-4 items-start">
              {/* Product Thumbnail */}
              <div className="w-20 h-24 rounded-xl overflow-hidden bg-white border border-neutral-200 shrink-0 p-1.5 flex items-center justify-center shadow-xs">
                <img
                  src={matchedImage.url}
                  alt={matchedImage.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-neutral-950 uppercase tracking-tight truncate">
                  {PRODUCT_NAME}
                </h3>

                {/* Selected Options Badge (Preserves page selection - NO duplicate selector!) */}
                <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-[11px] font-bold text-neutral-700 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-[#9333EA]" />
                  <span className="truncate">{selectedColor}</span>
                  <span className="text-neutral-300">•</span>
                  <span className="truncate">{selectedModel}</span>
                </div>

                {/* Unit Price when applicable */}
                <div className="mt-2 text-xs font-bold text-neutral-600">
                  {quantity > 1 ? (
                    <span>
                      {formatCurrency(pricing.unitPrice)} <span className="text-[10px] text-neutral-400 font-semibold">/ cada</span>
                    </span>
                  ) : (
                    <span>{formatCurrency(pricing.unitPrice)}</span>
                  )}
                </div>

                {/* Quantity Stepper [ - ] qty [ + ] */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="inline-flex items-center rounded-xl bg-white border border-neutral-300 p-0.5 shadow-2xs">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                      aria-label="Diminuir quantidade"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>

                    <span className="w-10 text-center text-xs font-black text-neutral-950">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={handleIncrease}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer transition-colors"
                      aria-label="Aumentar quantidade"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>

                  {/* Quantity Badge */}
                  {quantity === 2 && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#9333EA] bg-[#FAF5FF] px-2 py-0.5 rounded-full border border-[#E9D5FF]">
                      2x Pack
                    </span>
                  )}
                  {quantity >= 3 && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Melhor Valor
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Summary & Instant Pricing Recalculation */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 space-y-3 shadow-2xs">
              <div className="text-[11px] font-black uppercase tracking-wider text-neutral-500 mb-1">
                Resumo do Pedido
              </div>

              {/* Subtotal */}
              <div className="flex justify-between text-xs font-semibold text-neutral-600">
                <span>Subtotal ({quantity} {quantity === 1 ? 'unidade' : 'unidades'}):</span>
                <span>{formatCurrency(pricing.subtotal)}</span>
              </div>

              {/* Promotional Discount Line (Dynamic and Instant) */}
              {pricing.discount > 0 && (
                <div className="flex justify-between items-center text-xs font-black text-emerald-600 bg-emerald-50/70 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Desconto Promocional:</span>
                  </span>
                  <span>-{formatCurrency(pricing.discount)}</span>
                </div>
              )}

              {/* Shipping Tag */}
              <div className="flex justify-between text-xs font-semibold text-neutral-600">
                <span>Envio:</span>
                <span className="text-emerald-600 font-bold">Grátis</span>
              </div>

              <div className="pt-3 border-t border-neutral-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-black text-neutral-950 uppercase tracking-tight">Total:</span>
                  {pricing.discount > 0 && (
                    <span className="block text-[10px] font-bold text-emerald-600">
                      Você economiza {formatCurrency(pricing.discount)}
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-neutral-950">
                    {formatCurrency(pricing.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust and Safety Badges */}
            <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold text-neutral-600">
              <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#9333EA]" />
                <span>Rastreamento Ponta a Ponta</span>
              </div>
              <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9333EA]" />
                <span>Garantia de 30 Dias</span>
              </div>
            </div>
          </div>

          {/* Drawer Footer: Official Shopify Checkout CTA */}
          <div className="p-6 border-t border-neutral-200 bg-white space-y-2 sticky bottom-0">
            {variantError && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{variantError}</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleProceedToCheckout}
              disabled={Boolean(isSubmitting || (resolvedVariant && resolvedVariant.available === false))}
              className="w-full py-4 px-6 bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 active:scale-98 text-white font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>REDIRECIONANDO PARA O CHECKOUT...</span>
              ) : resolvedVariant && resolvedVariant.available === false ? (
                <span>OPÇÃO ESGOTADA</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>CONTINUAR PARA O CHECKOUT ({formatCurrency(pricing.total)})</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center font-medium text-neutral-400">
              Ambiente seguro Shopify · Seus dados e variantes estão preservados
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
