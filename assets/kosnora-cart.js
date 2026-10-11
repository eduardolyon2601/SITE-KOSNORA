/**
 * KOSNORA - Native Shopify Online Store 2.0 Cart Controller
 * Pure Vanilla JS, zero dependencies. Interacts with Shopify Ajax Cart API (/cart/change.js)
 * Enforces the strict maximum 4-case limit per order.
 */
(function () {
  'use strict';

  function initKosnoraCart() {
    const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';

    function getTotalCartQuantity(targetLineKey, targetQuantity) {
      let total = 0;
      document.querySelectorAll('.kosnora-cart-qty-input').forEach(input => {
        const line = input.getAttribute('data-line-key');
        if (line === targetLineKey) {
          total += Math.max(0, parseInt(targetQuantity, 10));
        } else {
          total += Math.max(0, parseInt(input.value, 10) || 0);
        }
      });
      return total;
    }

    async function changeItemQuantity(lineKey, newQuantity) {
      const parsedQty = Math.max(0, parseInt(newQuantity, 10));
      const projectedTotal = getTotalCartQuantity(lineKey, parsedQty);

      if (projectedTotal > 4) {
        alert('Order limit reached: A maximum of 4 cases per order is allowed.');
        return;
      }

      const loadingOverlay = document.getElementById('kosnora-cart-loading');
      if (loadingOverlay) loadingOverlay.style.display = 'flex';

      try {
        const response = await fetch(`${root}cart/change.js`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            id: lineKey,
            quantity: parsedQty
          })
        });

        if (!response.ok) {
          const err = await response.json();
          alert(err.description || err.message || 'Unable to update cart quantity.');
          if (loadingOverlay) loadingOverlay.style.display = 'none';
          return;
        }

        // Reload page to reflect server-side Liquid recalculations and discounts
        window.location.reload();
      } catch (e) {
        console.error('[KOSNORA] Cart update error:', e);
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        window.location.reload();
      }
    }

    // Attach listeners to all quantity adjusters
    document.querySelectorAll('[data-cart-adjust]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const action = button.getAttribute('data-cart-adjust');
        const lineKey = button.getAttribute('data-line-key');
        const currentQty = parseInt(button.getAttribute('data-current-qty'), 10) || 1;

        if (action === 'increase') {
          changeItemQuantity(lineKey, currentQty + 1);
        } else if (action === 'decrease') {
          changeItemQuantity(lineKey, Math.max(0, currentQty - 1));
        } else if (action === 'remove') {
          changeItemQuantity(lineKey, 0);
        }
      });
    });

    // Handle manual input changes
    document.querySelectorAll('.kosnora-cart-qty-input').forEach(input => {
      input.addEventListener('change', () => {
        const lineKey = input.getAttribute('data-line-key');
        const newQty = parseInt(input.value, 10);
        if (!isNaN(newQty)) {
          changeItemQuantity(lineKey, Math.max(0, newQty));
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKosnoraCart);
  } else {
    initKosnoraCart();
  }
})();
