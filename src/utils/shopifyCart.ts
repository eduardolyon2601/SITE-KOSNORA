/**
 * Official Shopify Cart & Checkout Integration Service
 * 
 * Manages adding selected bundles (1, 2, or 3 phone cases) to the real Shopify cart
 * and redirecting the customer directly into the real Shopify checkout.
 */

import { isVariantInStoreCatalog } from '../data/storeInventory';
import { CartItemUnit } from '../types';

declare global {
  interface Window {
    Shopify?: {
      routes?: {
        root?: string;
      };
      [key: string]: any;
    };
    KOSNORA_STORE?: {
      root?: string;
      cartAddUrl?: string;
      cartClearUrl?: string;
      cartUrl?: string;
      checkoutUrl?: string;
      variantId?: string | number;
      productId?: string | number;
      productHandle?: string;
      productTitle?: string;
      variants?: any[];
      options?: string[];
    };
    KOSNORA_PRODUCT?: any;
    KOSNORA_COLLECTION_PRODUCTS?: any[];
  }
}

export interface CheckoutPayload {
  quantity: number;
  model: string;
  color: string;
  unitPrice: number;
  totalPrice: number;
  isFirstPurchase?: boolean;
  variantId?: string | number;
}

export interface MultiUnitCheckoutPayload {
  units: CartItemUnit[];
  totalQuantity: number;
  unitPrice: number;
  totalPrice: number;
  isFirstPurchase?: boolean;
}

function isColorMatch(optionVal: string, targetColor: string): boolean {
  if (!optionVal || !targetColor) return false;
  const v = optionVal.toLowerCase().trim();
  const t = targetColor.toLowerCase().trim();
  if (v === t || v.includes(t) || t.includes(v)) return true;

  const synonyms: Record<string, string[]> = {
    gray: ['gray', 'grey', 'cinza', 'titanium', 'grafite', 'slate'],
    black: ['black', 'preto', 'obsidian', 'dark', 'midnight', 'noir'],
    pink: ['pink', 'rosa', 'rose', 'blush'],
    white: ['white', 'branco', 'silver', 'prata', 'starlight', 'pearl'],
    orange: ['orange', 'laranja', 'sunset', 'amber'],
  };

  for (const key in synonyms) {
    if (synonyms[key].includes(t)) {
      if (synonyms[key].some((s) => v.includes(s))) return true;
    }
  }
  return false;
}

function isModelMatch(optionVal: string, targetModel: string): boolean {
  if (!optionVal || !targetModel) return false;
  const v = optionVal.toLowerCase().trim();
  const t = targetModel.toLowerCase().trim();
  if (v === t || v.includes(t) || t.includes(v)) return true;

  const strippedTarget = t.replace(/^iphone\s*/i, '').trim();
  const strippedOpt = v.replace(/^iphone\s*/i, '').trim();
  if (strippedTarget && (strippedOpt === strippedTarget || strippedOpt.includes(strippedTarget) || strippedTarget.includes(strippedOpt))) {
    return true;
  }
  return false;
}

/**
 * Loads product details from global Liquid variables, DOM scripts, or Storefront endpoints.
 */
export async function loadShopifyProduct(): Promise<any | null> {
  if (typeof window === 'undefined') return null;

  if (window.KOSNORA_PRODUCT && window.KOSNORA_PRODUCT.variants?.length > 0) {
    return window.KOSNORA_PRODUCT;
  }

  const scriptTags = [
    document.getElementById('kosnora-product-data'),
    document.getElementById('kosnora-hero-product-data'),
  ];
  for (const tag of scriptTags) {
    if (tag?.textContent) {
      try {
        const parsed = JSON.parse(tag.textContent);
        if (parsed?.variants?.length > 0) {
          window.KOSNORA_PRODUCT = parsed;
          return parsed;
        }
      } catch {}
    }
  }

  if (window.KOSNORA_STORE?.variants && window.KOSNORA_STORE.variants.length > 0) {
    return {
      id: window.KOSNORA_STORE.productId,
      handle: window.KOSNORA_STORE.productHandle,
      title: window.KOSNORA_STORE.productTitle,
      variants: window.KOSNORA_STORE.variants,
      options: window.KOSNORA_STORE.options || [],
    };
  }

  if (window.KOSNORA_COLLECTION_PRODUCTS && window.KOSNORA_COLLECTION_PRODUCTS.length > 0) {
    const match = window.KOSNORA_COLLECTION_PRODUCTS.find((p: any) =>
      p.title?.toLowerCase().includes('kosnora') || p.handle?.toLowerCase().includes('kosnora')
    ) || window.KOSNORA_COLLECTION_PRODUCTS[0];
    if (match?.variants?.length > 0) {
      window.KOSNORA_PRODUCT = match;
      return match;
    }
  }

  try {
    const root = (window.Shopify?.routes?.root) || (window.KOSNORA_STORE?.root) || '/';
    const candidateHandles = [
      window.KOSNORA_STORE?.productHandle,
      'case-kosnora-digital',
      'ink-nfc-phone-case-for-iphone-17-16-15-14-pro-max-12-diy-picture-smart-screen-phone-cases-four-colors-image-screen-battery-free',
      'kosnora-case',
      'kosnora',
    ].filter(Boolean) as string[];

    for (const handle of candidateHandles) {
      try {
        const pRes = await fetch(`${root}products/${handle}.js`);
        if (pRes.ok) {
          const pData = await pRes.json();
          if (pData?.variants?.length > 0) {
            window.KOSNORA_PRODUCT = pData;
            return pData;
          }
        }
      } catch {}
    }

    const res = await fetch(`${root}products.json?limit=25`);
    if (res.ok) {
      const data = await res.json();
      if (data?.products?.length > 0) {
        const product = data.products.find((p: any) =>
          p.title?.toLowerCase().includes('kosnora') || p.handle?.toLowerCase().includes('kosnora')
        ) || data.products[0];
        if (product?.variants?.length > 0) {
          window.KOSNORA_PRODUCT = product;
          return product;
        }
      }
    }
  } catch (err) {
    console.warn('[KOSNORA] product lookup:', err);
  }

  return null;
}

/**
 * Finds the variant corresponding to the selected Model and Color options.
 * Matches strictly against Shopify variant options and titles.
 * If activeProduct is loaded but has no matching variant, returns null (never swaps secretly).
 */
export async function resolveShopifyVariant(
  model?: string,
  color?: string
): Promise<{ id: string; title?: string; available?: boolean; matchedVariant?: any } | null> {
  if (typeof window === 'undefined') return null;

  // 0. Primary Inventory Verification:
  // If the selected Model + Color is NOT registered as available in store inventory,
  // it is out of stock / not available for sale.
  if (model && color) {
    const isAvailableInCatalog = isVariantInStoreCatalog(model, color);
    if (!isAvailableInCatalog) {
      return {
        id: '',
        title: `${model} / ${color}`,
        available: false,
      };
    }
  }

  const product = await loadShopifyProduct();
  if (product?.variants?.length > 0) {
    const variants = product.variants;

    if (model && color) {
      // 1. Both Model and Color match in options
      let matched = variants.find((v: any) => {
        const opts = [v.option1, v.option2, v.option3].filter(Boolean);
        return opts.some((o: string) => isColorMatch(o, color)) && opts.some((o: string) => isModelMatch(o, model));
      });

      // 2. Both Model and Color match in variant title (e.g. "iPhone 16 Pro Max / Orange")
      if (!matched) {
        matched = variants.find((v: any) => {
          const t = (v.title || '').toLowerCase();
          return isColorMatch(t, color) && isModelMatch(t, model);
        });
      }

      // 3. Match Color alone if product only differentiates by Color
      if (!matched) {
        const hasModelOption = product.options?.some((opt: any) => {
          const name = typeof opt === 'string' ? opt : opt.name;
          return /model|modelo|device|aparelho/i.test(name || '');
        });

        // Only fallback to matching Color if the store does not have distinct Model options
        if (!hasModelOption) {
          matched = variants.find((v: any) => {
            const opts = [v.option1, v.option2, v.option3].filter(Boolean);
            return opts.some((o: string) => isColorMatch(o, color));
          });
        }
      }

      // If single default variant exists in store (e.g. "Default Title")
      if (!matched && variants.length === 1 && (variants[0].title === 'Default Title' || variants[0].option1 === 'Default Title')) {
        matched = variants[0];
      }

      if (matched && matched.id) {
        return {
          id: String(matched.id),
          title: matched.title,
          available: matched.available !== false,
          matchedVariant: matched,
        };
      }

      // Active product exists but no variant matches the selected combination!
      return null;
    }
  }

  // Fallback only if no product catalog could be loaded at all
  const domInput = document.getElementById('drawer-variant-id') as HTMLInputElement | null;
  if (domInput?.value && domInput.value !== '1' && domInput.value.trim() !== '') {
    return { id: domInput.value.trim(), available: true };
  }

  if (window.KOSNORA_STORE?.variantId && String(window.KOSNORA_STORE.variantId) !== '1' && String(window.KOSNORA_STORE.variantId).trim() !== '') {
    return { id: String(window.KOSNORA_STORE.variantId).trim(), available: true };
  }

  return null;
}

/**
 * Finds the variant ID corresponding to the selected Model and Color options.
 */
export async function resolveShopifyVariantId(model?: string, color?: string): Promise<string | null> {
  const result = await resolveShopifyVariant(model, color);
  return result ? result.id : null;
}

/**
 * Synchronizes the item quantity and metadata directly with the Shopify Ajax Cart API.
 */
export async function syncShopifyCartItem(payload: CheckoutPayload): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const root = (window.Shopify?.routes?.root) || (window.KOSNORA_STORE?.root) || '/';
  const variantId = payload.variantId || (await resolveShopifyVariantId(payload.model, payload.color));

  if (!variantId || variantId === '1' || isNaN(Number(variantId))) {
    return false;
  }

  try {
    // Clear and re-add with exact single line item to guarantee 100% price and bundle integrity
    await fetch(`${root}cart/clear.js`, { method: 'POST' }).catch(() => {});

    const res = await fetch(`${root}cart/add.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            id: Number(variantId),
            quantity: payload.quantity,
            properties: {
              'iPhone Model': payload.model,
              'Case Color': payload.color,
              'Offer Selection': `${payload.quantity} Case${payload.quantity > 1 ? 's' : ''}`,
              'Price Structure': `R$ ${payload.unitPrice.toFixed(2)} cada · R$ ${payload.totalPrice.toFixed(2)} total`,
            },
          },
        ],
      }),
    });

    return res.ok;
  } catch (err) {
    console.warn('[KOSNORA] syncShopifyCartItem error:', err);
    return false;
  }
}

/**
 * Executes direct checkout by populating the Shopify cart and redirecting to /checkout.
 */
export async function redirectToShopifyCheckout(payload: CheckoutPayload): Promise<void> {
  if (typeof window === 'undefined') return;

  const root = (window.Shopify?.routes?.root) || (window.KOSNORA_STORE?.root) || '/';
  let checkoutUrl = `${root}checkout`;

  // Attach bundle promo code if configured
  if (payload.quantity === 2) {
    checkoutUrl += '?discount=BUNDLE2';
  } else if (payload.quantity >= 3) {
    checkoutUrl += '?discount=BUNDLE3';
  }

  const variantId = payload.variantId || (await resolveShopifyVariantId(payload.model, payload.color));

  if (!variantId || variantId === '1' || isNaN(Number(variantId))) {
    console.warn('[KOSNORA] No valid variant ID found. Redirecting to storefront.');
    window.location.href = checkoutUrl;
    return;
  }

  // 1. Sync with Shopify cart
  const synced = await syncShopifyCartItem({ ...payload, variantId });

  // 2. If successfully synced, navigate to real Shopify checkout
  if (synced) {
    window.location.href = checkoutUrl;
    return;
  }

  // 3. Fallback: Shopify Direct Checkout Permalink /cart/{variant}:{quantity}
  if (variantId && Number(variantId) > 1) {
    window.location.href = `${root}cart/${variantId}:${payload.quantity}?return_to=/checkout`;
    return;
  }

  window.location.href = checkoutUrl;
}

/**
 * Synchronizes multiple distinct phone case units with the Shopify Ajax Cart API.
 * Each unit preserves its individual model and color variant, maintaining volume bundle discounts.
 */
export async function syncShopifyMultiUnitCart(payload: MultiUnitCheckoutPayload): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const root = (window.Shopify?.routes?.root) || (window.KOSNORA_STORE?.root) || '/';

  // 1. Resolve variant ID for every single unit
  const resolvedItems: Array<{ id: number; quantity: number; properties: Record<string, string> }> = [];

  for (let i = 0; i < payload.units.length; i++) {
    const unit = payload.units[i];
    let vId = unit.variantId;
    if (!vId) {
      const res = await resolveShopifyVariant(unit.model, unit.color);
      if (!res || res.available === false || !res.id) {
        console.warn(`[KOSNORA] Unit #${i + 1} (${unit.model} - ${unit.color}) is not available or has no variant ID`);
        return false;
      }
      vId = res.id;
    }

    if (!vId || vId === '1' || isNaN(Number(vId))) {
      return false;
    }

    resolvedItems.push({
      id: Number(vId),
      quantity: 1,
      properties: {
        'Capa': `#${i + 1} de ${payload.totalQuantity}`,
        'iPhone Model': unit.model,
        'Case Color': unit.color,
        'Pacote': `${payload.totalQuantity} Capas`,
        'Preço Unitário': `R$ ${payload.unitPrice.toFixed(2)}`,
        'Total do Pedido': `R$ ${payload.totalPrice.toFixed(2)}`,
      },
    });
  }

  if (resolvedItems.length === 0) return false;

  try {
    // 2. Clear cart and add all customized units
    await fetch(`${root}cart/clear.js`, { method: 'POST' }).catch(() => {});

    const res = await fetch(`${root}cart/add.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ items: resolvedItems }),
    });

    return res.ok;
  } catch (err) {
    console.warn('[KOSNORA] syncShopifyMultiUnitCart error:', err);
    return false;
  }
}

/**
 * Redirects to official Shopify Checkout with all distinct unit variants and bundle coupon.
 */
export async function redirectMultiUnitCheckout(payload: MultiUnitCheckoutPayload): Promise<void> {
  if (typeof window === 'undefined') return;

  const root = (window.Shopify?.routes?.root) || (window.KOSNORA_STORE?.root) || '/';
  let checkoutUrl = `${root}checkout`;

  // Attach bundle promo code if configured
  if (payload.totalQuantity === 2) {
    checkoutUrl += '?discount=BUNDLE2';
  } else if (payload.totalQuantity >= 3) {
    checkoutUrl += '?discount=BUNDLE3';
  }

  // 1. Sync with Shopify Ajax Cart API
  const synced = await syncShopifyMultiUnitCart(payload);
  if (synced) {
    window.location.href = checkoutUrl;
    return;
  }

  // 2. Fallback: Shopify direct multi-variant cart permalink: /cart/{id1}:1,{id2}:1?discount=...
  const permalinkPairs: string[] = [];
  for (const unit of payload.units) {
    const vId = unit.variantId || (await resolveShopifyVariantId(unit.model, unit.color));
    if (vId && Number(vId) > 1) {
      permalinkPairs.push(`${vId}:1`);
    }
  }

  if (permalinkPairs.length > 0) {
    let permalink = `${root}cart/${permalinkPairs.join(',')}`;
    if (payload.totalQuantity === 2) {
      permalink += '?discount=BUNDLE2';
    } else if (payload.totalQuantity >= 3) {
      permalink += '?discount=BUNDLE3';
    }
    window.location.href = permalink;
    return;
  }

  window.location.href = checkoutUrl;
}

