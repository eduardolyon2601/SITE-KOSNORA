/**
 * Customer Purchase & Promotion Eligibility Service
 * 
 * Determines whether a customer is eligible for the one-time "First Purchase Only"
 * promotional pricing (2 cases for $139.80, 3 cases for $179.70).
 * 
 * Supports:
 * - Shopify server-side customer order history (customer.orders_count)
 * - Shopify checkout / customer order validation
 * - Client-side persistent purchase audit log
 */

declare global {
  interface Window {
    KOSNORA_CUSTOMER?: {
      loggedIn: boolean;
      ordersCount: number;
      email?: string;
      hasPreviousPurchase?: boolean;
    };
  }
}

const STORAGE_KEY_PURCHASED = 'kosnora_has_purchased';
const STORAGE_KEY_ORDERS = 'kosnora_customer_orders';

export interface PastOrderRecord {
  orderNumber: string;
  email: string;
  quantity: number;
  total: number;
  timestamp: number;
}

/**
 * Retrieves the persisted list of completed customer orders.
 */
export function getPastOrders(): PastOrderRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Checks whether the current visitor or email has already completed a purchase.
 * 
 * @param email Optional email to verify against order history
 * @returns true if customer is making their FIRST purchase, false if returning/already purchased
 */
export function checkIsFirstPurchase(email?: string): boolean {
  // 1. Shopify server-side customer validation (highest authority on Shopify stores)
  if (typeof window !== 'undefined' && window.KOSNORA_CUSTOMER) {
    if (window.KOSNORA_CUSTOMER.hasPreviousPurchase === true || (window.KOSNORA_CUSTOMER.ordersCount && window.KOSNORA_CUSTOMER.ordersCount > 0)) {
      return false;
    }
  }

  // 2. Persistent browser flag (persists across refreshes, re-opens, tabs, new carts)
  if (typeof window !== 'undefined') {
    try {
      const hasPurchasedFlag = localStorage.getItem(STORAGE_KEY_PURCHASED);
      if (hasPurchasedFlag === 'true') {
        return false;
      }

      // 3. Check order history log
      const pastOrders = getPastOrders();
      if (pastOrders.length > 0) {
        return false;
      }

      // 4. If email is provided, check if that specific email has purchased before
      if (email && email.trim()) {
        const cleanEmail = email.trim().toLowerCase();
        const emailMatch = pastOrders.some(
          (o) => o.email && o.email.trim().toLowerCase() === cleanEmail
        );
        if (emailMatch) {
          return false;
        }
      }
    } catch {
      // Fallback
    }
  }

  return true;
}

/**
 * Records a successfully placed purchase.
 * Permanently revokes first-purchase promotional eligibility.
 */
export function recordCompletedPurchase(order: {
  orderNumber: string;
  email?: string;
  quantity: number;
  total: number;
}): void {
  if (typeof window === 'undefined') return;

  try {
    // 1. Set permanent purchase flag
    localStorage.setItem(STORAGE_KEY_PURCHASED, 'true');

    // 2. Save order details in order log
    const pastOrders = getPastOrders();
    const newRecord: PastOrderRecord = {
      orderNumber: order.orderNumber,
      email: (order.email || '').trim().toLowerCase(),
      quantity: order.quantity,
      total: order.total,
      timestamp: Date.now(),
    };
    pastOrders.push(newRecord);
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(pastOrders));

    // 3. Dispatch events to notify all active components/scripts immediately
    window.dispatchEvent(new CustomEvent('kosnora:purchase-completed', { detail: newRecord }));
  } catch (err) {
    console.error('Failed to record completed purchase:', err);
  }
}
