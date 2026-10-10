import React, { useState } from 'react';
import { X, Trash2, Plus, ShoppingBag, ArrowRight, ShieldCheck, Truck, Lock, AlertCircle, Sparkles } from 'lucide-react';
import { calculateCartPricing, formatCurrency, PRODUCT_IMAGES, PRODUCT_NAME, IPHONE_MODELS } from '../data/productData';
import { isVariantInStoreCatalog } from '../data/storeInventory';
import { redirectMultiUnitCheckout } from '../utils/shopifyCart';
import { CartItemUnit } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  units: CartItemUnit[];
  onUpdateUnit: (index: number, partial: Partial<CartItemUnit>) => void;
  onAddUnit: () => void;
  onRemoveUnit: (index: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  units,
  onUpdateUnit,
  onAddUnit,
  onRemoveUnit,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  if (!isOpen) return null;

  const totalQuantity = Math.max(1, units.length);
  const pricing = calculateCartPricing(totalQuantity, 'R$');

  // Check which units are out of stock
  const outOfStockUnits = units
    .map((u, idx) => ({ unit: u, index: idx, available: isVariantInStoreCatalog(u.model, u.color) }))
    .filter((item) => !item.available);

  const hasOutOfStockUnit = outOfStockUnits.length > 0;

  const handleProceedToCheckout = async () => {
    if (isSubmitting) return;

    if (hasOutOfStockUnit) {
      const firstBad = outOfStockUnits[0];
      setCheckoutError(
        `A Capa #${firstBad.index + 1} (${firstBad.unit.model} · ${firstBad.unit.color}) está esgotada no momento. Altere para outra opção para prosseguir.`
      );
      return;
    }

    setIsSubmitting(true);
    setCheckoutError(null);

    try {
      await redirectMultiUnitCheckout({
        units,
        totalQuantity,
        unitPrice: pricing.unitPrice,
        totalPrice: pricing.total,
      });
    } catch (err) {
      console.error('[KOSNORA] Multi-unit checkout error:', err);
      setCheckoutError('Ocorreu um erro ao processar o checkout da Shopify. Por favor, tente novamente.');
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

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
          
          {/* Header */}
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between bg-white sticky top-0 z-20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FAF5FF] text-[#9333EA] flex items-center justify-center">
                <ShoppingBag className="w-4.5 h-4.5" />
              </div>
              <div>
                <h2 id="cart-title" className="text-sm font-black uppercase tracking-wider text-neutral-900">
                  Seu Carrinho KOSNORA
                </h2>
                <p className="text-[11px] font-semibold text-neutral-500">
                  {totalQuantity} {totalQuantity === 1 ? 'capa selecionada' : 'capas personalizadas'}
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

          {/* Cart Content: Multi-Unit Customized Items */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            
            {/* Promotional Bundle Progress Banner */}
            {totalQuantity === 1 && (
              <div className="p-3 rounded-xl bg-[#FAF5FF] border border-[#E9D5FF] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#9333EA] font-bold">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Leve 2 capas por R$ 139,90 e economize R$ 19,90!</span>
                </div>
                <button
                  type="button"
                  onClick={onAddUnit}
                  className="px-2.5 py-1 rounded-md bg-[#9333EA] text-white text-[10px] font-black uppercase tracking-wider hover:brightness-110 cursor-pointer shrink-0 ml-2"
                >
                  + Adicionar
                </button>
              </div>
            )}

            {totalQuantity === 2 && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Desconto BUNDLE2 Ativado! Economia de R$ 19,90</span>
                </div>
                <button
                  type="button"
                  onClick={onAddUnit}
                  className="px-2 py-1 rounded-md bg-emerald-700 text-white text-[10px] font-black uppercase tracking-wider hover:brightness-110 cursor-pointer shrink-0 ml-2"
                >
                  + Levar 3 (Melhor Valor)
                </button>
              </div>
            )}

            {totalQuantity >= 3 && (
              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-[#FAF5FF] border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>Super Pacote Ativado! Maior desconto por unidade aplicado (R$ 64,97 cada)</span>
              </div>
            )}

            {/* List of Customized Phone Case Units */}
            <div className="space-y-3.5">
              {units.map((unit, idx) => {
                const isUnitAvailable = isVariantInStoreCatalog(unit.model, unit.color);
                const matchedImage = PRODUCT_IMAGES.find(
                  (img) => img.name.toLowerCase() === unit.color.toLowerCase() || img.id.toLowerCase() === unit.color.toLowerCase()
                ) || PRODUCT_IMAGES[0];

                return (
                  <div
                    key={unit.id || `unit-${idx}`}
                    className={`p-3.5 rounded-2xl border transition-all bg-white relative ${
                      !isUnitAvailable
                        ? 'border-amber-300 ring-2 ring-amber-200/50 shadow-xs'
                        : 'border-neutral-200 shadow-2xs hover:border-neutral-300'
                    }`}
                  >
                    {/* Unit Card Header */}
                    <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-100">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FAF5FF] text-[#9333EA] border border-[#E9D5FF]">
                          Capa #{idx + 1}
                        </span>
                        <span className="text-[11px] font-bold text-neutral-800">
                          {unit.model} · {unit.color}
                        </span>
                      </div>

                      {units.length > 1 && (
                        <button
                          type="button"
                          onClick={() => onRemoveUnit(idx)}
                          className="p-1 rounded-md text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remover esta capa"
                          aria-label={`Remover Capa #${idx + 1}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Unit Controls: Image Preview + Model & Color Selectors */}
                    <div className="flex gap-3 items-start">
                      {/* Color Preview Thumbnail */}
                      <div className="w-16 h-20 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200 shrink-0 p-1 flex items-center justify-center">
                        <img
                          src={matchedImage.url}
                          alt={matchedImage.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Selectors for this Unit */}
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Model Dropdown */}
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-0.5">
                            Modelo:
                          </label>
                          <select
                            value={unit.model}
                            onChange={(e) => onUpdateUnit(idx, { model: e.target.value })}
                            className="w-full py-1 px-2 text-xs font-bold text-neutral-900 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-[#9333EA] cursor-pointer"
                          >
                            {IPHONE_MODELS.map((m) => {
                              const isModelAvailableForColor = isVariantInStoreCatalog(m, unit.color);
                              return (
                                <option key={m} value={m}>
                                  {m}{!isModelAvailableForColor ? ' · (Esgotado)' : ''}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        {/* Color Buttons */}
                        <div>
                          <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                            Cor:
                          </label>
                          <div className="flex flex-wrap gap-1">
                            {PRODUCT_IMAGES.map((img) => {
                              const isSelected = unit.color.toLowerCase() === img.name.toLowerCase();
                              const isColorAvailableForModel = isVariantInStoreCatalog(unit.model, img.name);
                              return (
                                <button
                                  key={img.id}
                                  type="button"
                                  onClick={() => onUpdateUnit(idx, { color: img.name })}
                                  className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                                    isSelected
                                      ? 'bg-[#FAF5FF] border border-[#9333EA] text-[#9333EA] shadow-2xs'
                                      : isColorAvailableForModel
                                      ? 'bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                                      : 'bg-neutral-100 border border-neutral-200 text-neutral-400 opacity-70'
                                  }`}
                                  title={isColorAvailableForModel ? `${img.name} disponível` : `${img.name} esgotado para ${unit.model}`}
                                >
                                  <span
                                    className="w-2 h-2 rounded-full border border-black/10 inline-block"
                                    style={{
                                      backgroundColor:
                                        img.name === 'Gray' ? '#808080' :
                                        img.name === 'Black' ? '#111111' :
                                        img.name === 'Pink' ? '#F472B6' :
                                        img.name === 'White' ? '#F9FAFB' : '#FB923C'
                                    }}
                                  />
                                  <span>{img.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Availability Pill */}
                        <div className="pt-0.5">
                          {isUnitAvailable ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>Em estoque</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              <span>Esgotado nesta combinação</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Another Case Button */}
            <button
              type="button"
              onClick={onAddUnit}
              className="w-full py-2.5 px-3 rounded-xl border border-dashed border-[#9333EA]/60 hover:border-[#9333EA] bg-[#FAF5FF]/50 hover:bg-[#FAF5FF] text-[#9333EA] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Adicionar Outra Capa (Escolha Outro Modelo / Cor)</span>
            </button>

            {/* Financial Summary & Instant Pricing Recalculation */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-4.5 space-y-2.5 shadow-2xs">
              <div className="text-[11px] font-black uppercase tracking-wider text-neutral-500 mb-1">
                Resumo do Pedido ({totalQuantity} {totalQuantity === 1 ? 'capa' : 'capas'})
              </div>

              {/* Subtotal */}
              <div className="flex justify-between text-xs font-semibold text-neutral-600">
                <span>Subtotal ({totalQuantity}x R$ 79,90):</span>
                <span>{formatCurrency(pricing.subtotal)}</span>
              </div>

              {/* Promotional Discount Line */}
              {pricing.discount > 0 && (
                <div className="flex justify-between items-center text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Desconto por Quantidade:</span>
                  </span>
                  <span>-{formatCurrency(pricing.discount)}</span>
                </div>
              )}

              {/* Shipping Tag */}
              <div className="flex justify-between text-xs font-semibold text-neutral-600">
                <span>Envio para todo o Brasil:</span>
                <span className="text-emerald-600 font-bold">Grátis</span>
              </div>

              {/* Total */}
              <div className="pt-2.5 border-t border-neutral-200 flex justify-between items-baseline">
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
                  <span className="block text-[10px] text-neutral-400 font-medium">
                    (R$ {pricing.unitPrice.toFixed(2)} / capa)
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
          <div className="p-5 border-t border-neutral-200 bg-white space-y-2 sticky bottom-0 z-20">
            {checkoutError && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{checkoutError}</span>
              </div>
            )}

            {hasOutOfStockUnit && !checkoutError && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Uma ou mais capas estão esgotadas. Ajuste o modelo ou cor para continuar.</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleProceedToCheckout}
              disabled={isSubmitting || hasOutOfStockUnit}
              className={`w-full py-4 px-6 text-white font-black text-xs sm:text-sm tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                hasOutOfStockUnit
                  ? 'bg-neutral-200 text-neutral-400 border border-neutral-300 cursor-not-allowed opacity-80'
                  : 'bg-gradient-to-r from-[#9333EA] via-[#8015F5] to-[#6B21A8] hover:brightness-110 active:scale-98 hover:shadow-lg cursor-pointer'
              }`}
            >
              {isSubmitting ? (
                <span>REDIRECIONANDO PARA O CHECKOUT...</span>
              ) : hasOutOfStockUnit ? (
                <span>AJUSTE AS OPÇÕES ESGOTADAS</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>CONTINUAR PARA O CHECKOUT ({formatCurrency(pricing.total)})</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center font-medium text-neutral-400">
              Ambiente oficial Shopify · Todas as variantes e descontos são preservados
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
