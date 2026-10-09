/**
 * Official Shopify Cart & Checkout Integration Service
 * 
 * Manages adding selected bundles (1, 2, or 3 phone cases) to the real Shopify cart
 * and redirecting the customer directly into the real Shopify checkout.
 */

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
    };
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

/**
 * Discovers and resolves the real Shopify variant ID.
 */
export async function resolveShopifyVariantId(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  // 1. Check window.KOSNORA_STORE populated by Shopify Liquid theme
  if (window.KOSNORA_STORE?.variantId && String(window.KOSNORA_STORE.variantId).trim() !== '' && String(window.KOSNORA_STORE.variantId) !== '1') {
    return String(window.KOSNORA_STORE.variantId).trim();
  }

  // 2. Check DOM hidden input from Liquid snippet
  const inputEl = document.getElementById('drawer-variant-id') as HTMLInputElement | null;
  if (inputEl && inputEl.value && inputEl.value !== '1' && inputEl.value.trim() !== '') {
    return inputEl.value.trim();
  }

  // 3. Dynamic Storefront query: fetch /products.json to discover live variants
  try {
    const root = (window.Shopify?.routes?.root) || (window.KOSNORA_STORE?.root) || '/';
    const res = await fetch(`${root}products.json?limit=10`);
    if (res.ok) {
      const data = await res.json();
      if (data?.products?.length > 0) {
        const product = data.products.find((p: any) =>
          p.title?.toLowerCase().includes('kosnora') || p.handle?.toLowerCase().includes('kosnora')
        ) || data.products[0];

        const variant = product?.variants?.find((v: any) => v.available !== false) || product?.variants?.[0];
        if (variant?.id) {
          const resolved = String(variant.id);
          if (inputEl) inputEl.value = resolved;
          if (window.KOSNORA_STORE) window.KOSNORA_STORE.variantId = resolved;
          return resolved;
        }
      }
    }
  } catch (err) {
    console.warn('[KOSNORA] Could not discover variant from /products.json:', err);
  }

  return null;
}

/**
 * Executes direct checkout by populating the Shopify cart and redirecting to /checkout.
 * Preserves the customer's selected quantity: 1, 2, or 3 cases.
 */
export async function redirectToShopifyCheckout(payload: CheckoutPayload): Promise<void> {
  if (typeof window === 'undefined') return;

  const root = (window.Shopify?.routes?.root) || (window.KOSNORA_STORE?.root) || '/';
  const checkoutUrl = `${root}checkout`;

  const variantId = payload.variantId || (await resolveShopifyVariantId());

  // 1. Clear cart first so previously clicked items do not duplicate
  try {
    await fetch(`${root}cart/clear.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
  } catch {
    // Non-fatal if clear is blocked
  }

  // 2. Add selected offer with exact quantity and item properties
  let addSuccess = false;
  try {
    const addRes = await fetch(`${root}cart/add.js`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        items: [
          {
            id: variantId || 1,
            quantity: payload.quantity,
            properties: {
              'iPhone Model': payload.model,
              'Case Color': payload.color,
              'Offer Selection': `${payload.quantity} Case${payload.quantity > 1 ? 's' : ''}`,
              'Promotion Eligibility': payload.isFirstPurchase ? 'First Purchase Promotion Applied' : 'Standard Purchase',
              'Price Structure': `$${payload.unitPrice.toFixed(2)} each · $${payload.totalPrice.toFixed(2)} total`,
            },
          },
        ],
      }),
    });

    if (addRes.ok) {
      addSuccess = true;
    } else {
      console.warn('[KOSNORA] cart/add.js returned status:', addRes.status);
    }
  } catch (err) {
    console.warn('[KOSNORA] cart/add.js fetch exception:', err);
  }

  // 3. If successfully added to cart, navigate immediately to real Shopify checkout
  if (addSuccess) {
    window.location.href = checkoutUrl;
    return;
  }

  // 4. Fallback A: Form POST with return_to=/checkout
  const form = document.getElementById('kosnora-drawer-cart-form') as HTMLFormElement | null;
  if (form && variantId) {
    const vInput = document.getElementById('drawer-variant-id') as HTMLInputElement | null;
    if (vInput) vInput.value = String(variantId);
    const qInput = document.getElementById('drawer-quantity-input') as HTMLInputElement | null;
    if (qInput) qInput.value = String(payload.quantity);
    form.submit();
    return;
  }

  // 5. Fallback B: Shopify Checkout Permalink /cart/{variant}:{quantity}
  if (variantId && String(variantId) !== '1') {
    window.location.href = `${root}cart/${variantId}:${payload.quantity}?return_to=/checkout`;
    return;
  }

  // 6. Direct checkout URL redirection
  window.location.href = checkoutUrl;
}
