/**
 * KOSNORA - Native Shopify Online Store 2.0 Cart Controller
 * Pure Vanilla JS, zero dependencies. Interacts with Shopify Ajax Cart API (/cart/change.js, /cart/clear.js)
 * Supports dynamic "Remover tudo" (Clear Cart) without requiring page reload.
 * Enforces the strict maximum 4-case limit per order.
 */
(function () {
  'use strict';

  function initKosnoraCart() {
    const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
    let isOperating = false;

    const clearBtn = document.getElementById('kosnora-cart-clear-btn');
    const activeContent = document.getElementById('kosnora-cart-active-content');
    const emptyContent = document.getElementById('kosnora-cart-empty-content');
    const subtitleEl = document.getElementById('kosnora-cart-header-subtitle');
    const errorBanner = document.getElementById('kosnora-cart-error-banner');
    const errorMsg = document.getElementById('kosnora-cart-error-message');
    const errorClose = document.getElementById('kosnora-cart-error-close');
    const loadingOverlay = document.getElementById('kosnora-cart-loading');

    function showError(message) {
      if (errorBanner && errorMsg) {
        errorMsg.textContent = message || 'An error occurred while updating the cart. Please try again.';
        errorBanner.style.display = 'flex';
        errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        alert(message || 'An error occurred while updating the cart.');
      }
    }

    function hideError() {
      if (errorBanner) {
        errorBanner.style.display = 'none';
      }
    }

    if (errorClose) {
      errorClose.addEventListener('click', hideError);
    }

    function renderEmptyCartState() {
      if (activeContent) activeContent.style.display = 'none';
      if (emptyContent) emptyContent.style.display = 'block';
      if (clearBtn) clearBtn.style.display = 'none';
      if (subtitleEl) subtitleEl.textContent = 'Your cart is currently empty.';

      // Update header badges
      document.querySelectorAll('.kosnora-cart-badge, [data-cart-count], .cart-count-bubble').forEach(el => {
        el.textContent = '0';
        if (el.classList.contains('cart-count-bubble')) {
          el.style.display = 'none';
        }
      });

      // Ensure checkout button inside active content cannot be submitted
      const checkoutBtn = document.getElementById('kosnora-proceed-checkout-btn');
      if (checkoutBtn) {
        checkoutBtn.disabled = true;
      }
    }

    // ============================================================
    // "REMOVER TUDO" (CLEAR ALL ITEMS VIA /cart/clear.js)
    // ============================================================
    async function clearAllCartItems() {
      if (isOperating) return; // Prevent duplicate clicks
      hideError();
      isOperating = true;

      // Visual feedback on button: disable and show spinner
      let originalBtnHtml = '';
      if (clearBtn) {
        clearBtn.disabled = true;
        clearBtn.style.opacity = '0.7';
        clearBtn.style.cursor = 'not-allowed';
        originalBtnHtml = clearBtn.innerHTML;
        clearBtn.innerHTML = `
          <span style="display:inline-block; width:12px; height:12px; border:2px solid #FECACA; border-top-color:#DC2626; border-radius:50%; animation:kosnora-spin 0.8s linear infinite;"></span>
          <span class="kosnora-clear-btn-text">Removendo...</span>
        `;
      }

      if (loadingOverlay) loadingOverlay.style.display = 'flex';

      try {
        const response = await fetch(`${root}cart/clear.js`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          let errDetail = 'Não foi possível esvaziar o carrinho.';
          try {
            const errData = await response.json();
            errDetail = errData.description || errData.message || errDetail;
          } catch (_) {}
          throw new Error(errDetail);
        }

        // Successfully cleared cart! Update visual state immediately without reloading
        renderEmptyCartState();

      } catch (err) {
        console.error('[KOSNORA] Clear cart error:', err);
        showError(err.message || 'Erro ao remover os produtos do carrinho. Tente novamente.');

        // Restore button state
        if (clearBtn) {
          clearBtn.disabled = false;
          clearBtn.style.opacity = '1';
          clearBtn.style.cursor = 'pointer';
          if (originalBtnHtml) clearBtn.innerHTML = originalBtnHtml;
        }
      } finally {
        isOperating = false;
        if (loadingOverlay) loadingOverlay.style.display = 'none';
      }
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        clearAllCartItems();
      });
    }

    // ============================================================
    // INDIVIDUAL ITEM QUANTITY ADJUSTMENTS
    // ============================================================
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
      if (isOperating) return;
      hideError();

      const parsedQty = Math.max(0, parseInt(newQuantity, 10));
      const projectedTotal = getTotalCartQuantity(lineKey, parsedQty);

      if (projectedTotal > 4) {
        showError('Order limit reached: A maximum of 4 cases per order is allowed.');
        return;
      }

      isOperating = true;
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
          let errDetail = 'Unable to update cart quantity.';
          try {
            const err = await response.json();
            errDetail = err.description || err.message || errDetail;
          } catch (_) {}
          showError(errDetail);
          if (loadingOverlay) loadingOverlay.style.display = 'none';
          isOperating = false;
          return;
        }

        const updatedCart = await response.json();

        // If cart has become empty, update state instantly without reload
        if (!updatedCart.items || updatedCart.items.length === 0 || updatedCart.item_count === 0) {
          renderEmptyCartState();
          if (loadingOverlay) loadingOverlay.style.display = 'none';
          isOperating = false;
          return;
        }

        // Otherwise reload to let Liquid recalculate multi-item bundle discounts and summary
        window.location.reload();
      } catch (e) {
        console.error('[KOSNORA] Cart update error:', e);
        showError(e.message || 'Cart update error. Please try again.');
        if (loadingOverlay) loadingOverlay.style.display = 'none';
        isOperating = false;
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
