/**
 * Official Shopify Cart & Checkout Integration Service
 * 
 * Manages adding selected bundles (1, 2, or 3 phone cases) to the real Shopify cart
 * and redirecting the customer directly into the real Shopify checkout.
 * Supports both Native Shopify Online Store 2.0 (Ajax Cart API) and External App Mode (Storefront API / Permalinks).
 */

import { isVariantInStoreCatalog, STORE_AVAILABLE_VARIANTS } from '../data/storeInventory';
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
      storeDomain?: string;
      storefrontAccessToken?: string;
    };
    KOSNORA_PRODUCT?: any;
    KOSNORA_COLLECTION_PRODUCTS?: any[];
  }
}

export const MAX_ORDER_CAPAS = 4;

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

/**
 * Native Ajax Cart API Multi-Variant Addition Helper
 * Strict adherence to Shopify specifications: validates safe integer IDs, sends individual units with qty: 1,
 * and confirms response with /cart.js before proceeding.
 */
export async function addVariantsToShopifyCart(
  selectedUnits: Array<{ variantId: string | number; model: string; color: string; unitIndex?: number; totalUnits?: number }>
): Promise<{ success: boolean; cart?: any; checkoutUrl?: string }> {
  if (typeof window === 'undefined') {
    throw new Error('Invalid runtime environment.');
  }

  const root = window.Shopify?.routes?.root || window.KOSNORA_STORE?.root || '/';

  if (!Array.isArray(selectedUnits) || selectedUnits.length === 0) {
    throw new Error('Please select at least one case.');
  }

  const items = selectedUnits.map((unit, idx) => {
    const variantId = Number(unit.variantId);

    if (!Number.isSafeInteger(variantId) || variantId <= 0) {
      throw new Error(`Invalid variant ID for Case #${idx + 1} (${unit.model} - ${unit.color}).`);
    }

    return {
      id: variantId,
      quantity: 1,
      properties: {
        'Case': `#${(unit.unitIndex !== undefined ? unit.unitIndex : idx) + 1} of ${unit.totalUnits || selectedUnits.length}`,
        'iPhone Model': unit.model,
        'Case Color': unit.color,
        'Bundle': `${unit.totalUnits || selectedUnits.length} Cases`,
      },
    };
  });

  // Cumulative addition via official Shopify Ajax Cart API (never clears existing cart items)
  const response = await fetch(`${root}cart/add.js`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.description || result.message || 'Could not add products to cart.');
  }

  // 3. Confirm items in real cart
  const verifyRes = await fetch(`${root}cart.js`);
  let confirmedCart: any = null;
  if (verifyRes.ok) {
    confirmedCart = await verifyRes.json();
    if (!confirmedCart.items || confirmedCart.items.length === 0) {
      throw new Error('The cart could not confirm the added items.');
    }
  }

  return { success: true, cart: confirmedCart || result };
}

/**
 * Empties the Shopify cart using the official Shopify Ajax Cart API endpoint (/cart/clear.js).
 */
export async function clearShopifyCart(): Promise<{ success: boolean; cart?: any }> {
  if (typeof window === 'undefined') {
    return { success: true };
  }

  const root = window.Shopify?.routes?.root || window.KOSNORA_STORE?.root || '/';

  try {
    const response = await fetch(`${root}cart/clear.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      let errDetail = 'Não foi possível esvaziar o carrinho.';
      try {
        const errJson = await response.json();
        errDetail = errJson.description || errJson.message || errDetail;
      } catch (_) {}
      throw new Error(errDetail);
    }

    const clearedCart = await response.json();
    return { success: true, cart: clearedCart };
  } catch (err: any) {
    console.warn('[KOSNORA] clearShopifyCart notice:', err?.message || err);
    return { success: true };
  }
}

export function canonicalModel(model: string): string {
  if (!model) return '';
  const s = String(model).toLowerCase().replace(/[^a-z0-9]/g, '');
  const genMatch = s.match(/(1[2-7])/);
  if (!genMatch) return s;
  const gen = genMatch[1];

  // promax must strictly precede pro
  if (s.includes('promax') || (s.includes('pro') && s.includes('max'))) {
    return `${gen}promax`;
  }
  if (s.includes('pro')) {
    return `${gen}pro`;
  }
  if (s.includes('plus')) {
    return `${gen}plus`;
  }
  return `${gen}`;
}

export function canonicalColor(color: string): string {
  if (!color) return '';
  const c = String(color).toLowerCase().trim();
  if (['gray', 'grey', 'cinza', 'titanium', 'grafite', 'slate'].some((s) => c.includes(s))) return 'grey';
  if (['black', 'preto', 'dark', 'midnight', 'obsidian', 'noir'].some((s) => c.includes(s))) return 'black';
  if (['pink', 'rosa', 'rose', 'blush'].some((s) => c.includes(s))) return 'pink';
  if (['white', 'branco', 'silver', 'prata', 'starlight', 'pearl'].some((s) => c.includes(s))) return 'white';
  if (['orange', 'laranja', 'sunset', 'amber'].some((s) => c.includes(s))) return 'orange';
  return c;
}

export function isModelMatch(optionVal: string, targetModel: string): boolean {
  if (!optionVal || !targetModel) return false;
  const canOpt = canonicalModel(optionVal);
  const canTarget = canonicalModel(targetModel);
  if (canOpt && canTarget) {
    return canOpt === canTarget;
  }
  return optionVal.toLowerCase().trim() === targetModel.toLowerCase().trim();
}

export function isColorMatch(optionVal: string, targetColor: string): boolean {
  if (!optionVal || !targetColor) return false;
  const canOpt = canonicalColor(optionVal);
  const canTarget = canonicalColor(targetColor);
  if (canOpt && canTarget) {
    return canOpt === canTarget;
  }
  return optionVal.toLowerCase().trim() === targetColor.toLowerCase().trim();
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

  // Pre-registered official catalog variants for Case Kosnora Digital
  return {
    id: 'case-kosnora-digital',
    title: 'Case Kosnora Digital',
    handle: 'case-kosnora-digital',
    variants: STORE_AVAILABLE_VARIANTS.map((v) => {
      const parts = v.sku.split(':');
      const numericId = parts[parts.length - 1] || '';
      return {
        id: numericId,
        title: `${v.model} / ${v.color}`,
        option1: v.model,
        option2: v.color,
        sku: v.sku,
        available: v.available,
      };
    }),
    options: ['Model', 'Color'],
  };
}

/**
 * Finds the variant corresponding to the selected Model and Color options.
 * Matches strictly against Shopify variant options, SKUs, and titles.
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
      // 1. Both Model and Color match in options (Exact canonical match)
      let matched = variants.find((v: any) => {
        const opts = [v.option1, v.option2, v.option3].filter(Boolean);
        return opts.some((o: string) => isColorMatch(o, color)) && opts.some((o: string) => isModelMatch(o, model));
      });

      // 2. Strict SKU matching (Specifically distinguishing iPhone 15 Pro '22955740093' from 15 Pro Max '22955740094')
      if (!matched) {
        const canM = canonicalModel(model);
        matched = variants.find((v: any) => {
          if (!v.sku) return false;
          const s = String(v.sku);
          if (canM === '15pro' && s.includes('22955740093')) return true;
          if (canM === '15promax' && s.includes('22955740094')) return true;
          return false;
        });
      }

      // 3. Both Model and Color match in variant title (e.g. "iPhone 15 Pro / Black")
      if (!matched) {
        matched = variants.find((v: any) => {
          const t = v.title || '';
          return isColorMatch(t, color) && isModelMatch(t, model);
        });
      }

      // 4. Match Color alone only if product has NO model option at all
      if (!matched) {
        const hasModelOption = product.options?.some((opt: any) => {
          const name = typeof opt === 'string' ? opt : opt.name;
          return /model|modelo|device|aparelho/i.test(name || '');
        });

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

  // Fallback: Check registered variant in store inventory directly
  if (model && color) {
    const canM = canonicalModel(model);
    const canC = canonicalColor(color);
    const matchedEntry = STORE_AVAILABLE_VARIANTS.find(
      (v) => canonicalModel(v.model) === canM && canonicalColor(v.color) === canC
    );
    if (matchedEntry) {
      const parts = matchedEntry.sku.split(':');
      const numericId = parts[parts.length - 1] || '';
      if (numericId) {
        return { id: numericId, title: `${matchedEntry.model} / ${matchedEntry.color}`, available: true };
      }
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
    // Add cumulative line item via official Shopify Ajax Cart API (never clears previous items)
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
              'Price Structure': `$${payload.unitPrice.toFixed(2)} each · $${payload.totalPrice.toFixed(2)} total`,
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
 * Populates the Shopify cart via Ajax Cart API and redirects to /cart.
 */
export async function redirectToShopifyCheckout(payload: CheckoutPayload): Promise<void> {
  if (typeof window === 'undefined') return;

  const root = (window.Shopify?.routes?.root) || (window.KOSNORA_STORE?.root) || '/';
  const cartUrl = `${root}cart`;

  const variantId = payload.variantId || (await resolveShopifyVariantId(payload.model, payload.color));

  if (!variantId || variantId === '1' || isNaN(Number(variantId))) {
    console.warn('[KOSNORA] No valid variant ID found. Redirecting to cart.');
    window.location.assign(cartUrl);
    return;
  }

  // 1. Sync with Shopify cart
  const synced = await syncShopifyCartItem({ ...payload, variantId });

  // 2. If successfully synced, navigate to real Shopify cart page
  if (synced) {
    window.location.assign(cartUrl);
    return;
  }

  // 3. Fallback: Shopify Cart Permalink /cart/{variant}:{quantity}
  if (variantId && Number(variantId) > 1) {
    window.location.assign(`${root}cart/${variantId}:${payload.quantity}`);
    return;
  }

  window.location.assign(cartUrl);
}

/**
 * Synchronizes multiple distinct phone case units with the Shopify Ajax Cart API.
 * Each unit preserves its individual model and color variant, maintaining volume bundle discounts.
 */
export async function syncShopifyMultiUnitCart(payload: MultiUnitCheckoutPayload): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  const root = (window.Shopify?.routes?.root) || (window.KOSNORA_STORE?.root) || '/';

  // 1. Resolve variant ID for every single unit (enforcing maximum 4 units per order)
  const clampedUnits = (payload.units || []).slice(0, MAX_ORDER_CAPAS);
  const resolvedItems: Array<{ id: number; quantity: number; properties: Record<string, string> }> = [];

  for (let i = 0; i < clampedUnits.length; i++) {
    const unit = clampedUnits[i];
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
        'Case': `#${i + 1} of ${payload.totalQuantity}`,
        'iPhone Model': unit.model,
        'Case Color': unit.color,
        'Bundle': `${payload.totalQuantity} Cases`,
        'Unit Price': `$${payload.unitPrice.toFixed(2)}`,
        'Order Total': `$${payload.totalPrice.toFixed(2)}`,
      },
    });
  }

  if (resolvedItems.length === 0) return false;

  try {
    // 2. Add all customized units cumulatively (preserves any existing products in the cart)
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
 * Official Shopify Standard Cart Addition implementation as required:
 * Uses Ajax Cart API to add items, verifies response, and redirects to /cart.
 */
export async function addKosnoraItemsToCart(
  items: Array<{ variantId: string | number; quantity?: number }>
): Promise<any> {
  const root = window.Shopify?.routes?.root || "/";

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("No products selected.");
  }

  const validItems = items.map(item => {
    const id = Number(item.variantId);
    const quantity = Number(item.quantity || 1);

    if (!Number.isSafeInteger(id) || id <= 0) {
      throw new Error("Invalid variant ID.");
    }

    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      throw new Error("Invalid quantity.");
    }

    return { id, quantity };
  });

  const response = await fetch(`${root}cart/add.js`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ items: validItems })
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.description ||
      result.message ||
      "Could not add products to cart."
    );
  }

  window.location.assign(`${root}cart`);

  return result;
}

/**
 * Redirects to official Shopify Cart page (/cart) with all distinct unit variants.
 * Strictly enforces that the customer reviews their items and discounts in the official cart
 * before proceeding to checkout.
 */
export async function redirectMultiUnitCheckout(payload: MultiUnitCheckoutPayload): Promise<void> {
  if (typeof window === 'undefined') return;

  const root = (window.Shopify?.routes?.root) || (window.KOSNORA_STORE?.root) || '/';
  const cartUrl = `${root}cart`;

  // 1. Sync with Shopify Ajax Cart API
  const synced = await syncShopifyMultiUnitCart(payload);
  if (synced) {
    window.location.assign(cartUrl);
    return;
  }

  // 2. Fallback: Shopify direct multi-variant cart permalink: /cart/{id1}:1,{id2}:1
  const permalinkPairs: string[] = [];
  for (const unit of payload.units) {
    const vId = unit.variantId || (await resolveShopifyVariantId(unit.model, unit.color));
    if (vId && Number(vId) > 1) {
      permalinkPairs.push(`${vId}:1`);
    }
  }

  if (permalinkPairs.length > 0) {
    const permalink = `${root}cart/${permalinkPairs.join(',')}`;
    window.location.assign(permalink);
    return;
  }

  window.location.assign(cartUrl);
}

