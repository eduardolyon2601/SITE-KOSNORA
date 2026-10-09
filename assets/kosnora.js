/**
 * KOSNORA - Native Shopify Theme JavaScript
 * Pure Vanilla JS, zero runtime frameworks, 100% Online Store 2.0 compliant
 */

document.addEventListener('DOMContentLoaded', () => {
  initSimulator();
  initFaqAccordion();
  initDrawer();
  initPolicyModals();
  initSmoothScroll();
});

// 1. Phone Case Interactive Simulator
function initSimulator() {
  const mockup = document.getElementById('kosnora-mockup');
  const screenImg = document.getElementById('kosnora-screen-img');
  const colorBtns = document.querySelectorAll('[data-simulator-color]');
  const lookBtns = document.querySelectorAll('[data-simulator-look]');
  const uploadInput = document.getElementById('kosnora-upload-input');
  const uploadBtn = document.getElementById('kosnora-upload-btn');

  if (!mockup || !screenImg) return;

  // Handle color finish selection
  colorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const hex = btn.getAttribute('data-hex');
      const name = btn.getAttribute('data-name');
      mockup.style.backgroundColor = hex;

      colorBtns.forEach(b => b.classList.remove('active-color'));
      btn.classList.add('active-color');

      const label = document.getElementById('active-color-label');
      if (label && name) label.textContent = name;
    });
  });

  // Handle preset looks
  lookBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-src');
      if (!src) return;

      screenImg.style.opacity = '0.3';
      screenImg.style.transform = 'scale(0.96)';

      setTimeout(() => {
        screenImg.src = src;
        screenImg.style.opacity = '1';
        screenImg.style.transform = 'scale(1)';
      }, 180);

      lookBtns.forEach(b => b.classList.remove('active-look'));
      btn.classList.add('active-look');
    });
  });

  // Handle custom image upload preview
  if (uploadBtn && uploadInput) {
    uploadBtn.addEventListener('click', () => uploadInput.click());
    uploadInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          screenImg.style.opacity = '0.3';
          setTimeout(() => {
            screenImg.src = event.target.result;
            screenImg.style.opacity = '1';
            uploadBtn.textContent = 'Custom Photo Applied! Click to switch';
          }, 180);
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// 2. FAQ Accordion
function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isOpen = content.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('open'));
      document.querySelectorAll('.faq-trigger svg').forEach(icon => {
        icon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        content.classList.add('open');
        const icon = trigger.querySelector('svg');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

// 3. Checkout & Order Drawer
function initDrawer() {
  const drawerBackdrop = document.getElementById('kosnora-order-drawer');
  const closeBtns = document.querySelectorAll('[data-close-drawer]');
  const openBtns = document.querySelectorAll('[data-open-drawer]');
  const bundleCards = document.querySelectorAll('[data-bundle-quantity]');
  const modelSelect = document.getElementById('drawer-model-select');
  const colorSelectBtns = document.querySelectorAll('[data-drawer-color]');
  const summaryQty = document.getElementById('drawer-summary-qty');
  const summaryModel = document.getElementById('drawer-summary-model');
  const summaryColor = document.getElementById('drawer-summary-color');
  const summaryTotal = document.getElementById('drawer-summary-total');
  const summarySavings = document.getElementById('drawer-summary-savings');
  const ctaTotal = document.getElementById('drawer-cta-total');
  const proceedBtn = document.getElementById('drawer-proceed-checkout');
  const qtyInput = document.getElementById('drawer-quantity-input');
  const propModelInput = document.getElementById('drawer-prop-model');
  const propColorInput = document.getElementById('drawer-prop-color');

  function checkCustomerFirstPurchase() {
    if (window.KOSNORA_CUSTOMER) {
      if (window.KOSNORA_CUSTOMER.hasPreviousPurchase === true || (window.KOSNORA_CUSTOMER.ordersCount && window.KOSNORA_CUSTOMER.ordersCount > 0)) {
        return false;
      }
    }
    try {
      if (localStorage.getItem('kosnora_has_purchased') === 'true') {
        return false;
      }
      const rawOrders = localStorage.getItem('kosnora_customer_orders');
      if (rawOrders && JSON.parse(rawOrders).length > 0) {
        return false;
      }
    } catch (e) {}
    return true;
  }

  const PROMO_OFFERS = {
    1: { qty: 1, unitPrice: 79.90, total: 79.90, savings: 0, label: '1x KOSNORA Smart Case' },
    2: { qty: 2, unitPrice: 69.90, total: 139.80, savings: 20.00, label: '2x KOSNORA Smart Case' },
    3: { qty: 3, unitPrice: 59.90, total: 179.70, savings: 60.00, label: '3x KOSNORA Smart Case' }
  };

  const REGULAR_OFFERS = {
    1: { qty: 1, unitPrice: 79.90, total: 79.90, savings: 0, label: '1x KOSNORA Smart Case' },
    2: { qty: 2, unitPrice: 79.90, total: 159.80, savings: 0, label: '2x KOSNORA Smart Case' },
    3: { qty: 3, unitPrice: 79.90, total: 239.70, savings: 0, label: '3x KOSNORA Smart Case' }
  };

  function getActiveOffers() {
    return checkCustomerFirstPurchase() ? PROMO_OFFERS : REGULAR_OFFERS;
  }

  let currentQty = 1;
  let currentUnitPrice = 79.90;
  let currentTotal = 79.90;
  let currentSavings = 0;

  function syncEligibilityUI() {
    const isFirst = checkCustomerFirstPurchase();
    const offers = getActiveOffers();

    // Sync Offer Section on page
    const kicker = document.getElementById('pricing-offer-kicker');
    if (kicker) {
      kicker.textContent = isFirst ? 'EXCLUSIVE FIRST-PURCHASE OFFER' : 'PRODUCT & OFFER';
    }
    const subheadline = document.getElementById('pricing-offer-subheadline');
    if (subheadline) {
      subheadline.textContent = isFirst 
        ? 'Special promotional pricing available on your first order only.' 
        : 'Select your iPhone model and quantity bundle.';
    }

    const badge2 = document.getElementById('pricing-badge-2');
    if (badge2) {
      badge2.style.display = isFirst ? 'block' : 'none';
    }
    const badge3 = document.getElementById('pricing-badge-3');
    if (badge3) {
      badge3.style.display = isFirst ? 'block' : 'none';
    }

    const unitPrice2 = document.getElementById('pricing-unit-price-2');
    if (unitPrice2) unitPrice2.textContent = `$${offers[2].unitPrice.toFixed(2)}`;
    const totalPrice2 = document.getElementById('pricing-total-price-2');
    if (totalPrice2) totalPrice2.textContent = `$${offers[2].total.toFixed(2)} TOTAL`;

    const unitPrice3 = document.getElementById('pricing-unit-price-3');
    if (unitPrice3) unitPrice3.textContent = `$${offers[3].unitPrice.toFixed(2)}`;
    const totalPrice3 = document.getElementById('pricing-total-price-3');
    if (totalPrice3) totalPrice3.textContent = `$${offers[3].total.toFixed(2)} TOTAL`;

    // Sync bundle card details inside drawer
    bundleCards.forEach(card => {
      const q = parseInt(card.getAttribute('data-bundle-quantity'), 10);
      const offer = offers[q];
      if (!offer) return;

      const priceDiv = card.querySelector(':scope > div:last-child > div:first-child');
      if (priceDiv) priceDiv.textContent = `$${offer.total.toFixed(2)}`;

      const savingsDiv = card.querySelector(':scope > div:last-child > div:nth-child(2)');
      if (savingsDiv) {
        if (offer.savings > 0 && isFirst) {
          savingsDiv.style.display = 'block';
          savingsDiv.textContent = `Save $${offer.savings.toFixed(2)}`;
        } else {
          savingsDiv.style.display = 'none';
        }
      }

      const descDiv = card.querySelector(':scope > div:first-child > div:last-child > div:last-child');
      if (descDiv) {
        if (q === 1) {
          descDiv.textContent = '$79.90 single case';
        } else {
          descDiv.textContent = isFirst 
            ? `$${offer.unitPrice.toFixed(2)} each · $${offer.total.toFixed(2)} total`
            : `$${offer.unitPrice.toFixed(2)} each · $${offer.total.toFixed(2)} total`;
        }
      }
    });
  }

  function updateSummary() {
    if (summaryQty) summaryQty.textContent = `${currentQty}x KOSNORA Smart Case`;
    if (summaryTotal) summaryTotal.textContent = `$${currentTotal.toFixed(2)}`;
    if (ctaTotal) ctaTotal.textContent = `$${currentTotal.toFixed(2)}`;
    if (qtyInput) qtyInput.value = currentQty;

    if (summarySavings) {
      if (currentSavings > 0 && checkCustomerFirstPurchase()) {
        summarySavings.textContent = `-$${currentSavings.toFixed(2)}`;
        summarySavings.parentElement.style.display = 'flex';
      } else {
        summarySavings.parentElement.style.display = 'none';
      }
    }
  }

  function setQuantity(qty) {
    qty = parseInt(qty, 10);
    const offers = getActiveOffers();
    if (!offers[qty]) qty = 1;

    currentQty = qty;
    currentUnitPrice = offers[qty].unitPrice;
    currentTotal = offers[qty].total;
    currentSavings = offers[qty].savings;

    if (qtyInput) qtyInput.value = currentQty;

    bundleCards.forEach(card => {
      const cardQty = parseInt(card.getAttribute('data-bundle-quantity'), 10);
      const isSelected = cardQty === currentQty;
      const radio = card.querySelector('.bundle-radio-circle');
      const dot = card.querySelector('.bundle-radio-dot');

      if (isSelected) {
        card.classList.add('active-bundle');
        card.style.setProperty('border', '2px solid #9333EA', 'important');
        card.style.setProperty('background-color', '#FAF5FF', 'important');
        card.style.setProperty('box-shadow', '0 4px 14px rgba(147, 51, 234, 0.12)', 'important');
        if (radio) {
          radio.style.setProperty('border-color', '#9333EA', 'important');
          radio.style.setProperty('background-color', '#9333EA', 'important');
        }
        if (dot) {
          dot.style.setProperty('display', 'block', 'important');
          dot.style.setProperty('background-color', '#FFFFFF', 'important');
        }
      } else {
        card.classList.remove('active-bundle');
        card.style.setProperty('border', '1px solid #E5E5E5', 'important');
        card.style.setProperty('background-color', '#FFFFFF', 'important');
        card.style.setProperty('box-shadow', 'none', 'important');
        if (radio) {
          radio.style.setProperty('border-color', '#D1D5DB', 'important');
          radio.style.setProperty('background-color', '#FFFFFF', 'important');
        }
        if (dot) {
          dot.style.setProperty('display', 'none', 'important');
        }
      }
    });

    updateSummary();
  }

  // Subscribe to purchase completed event
  window.addEventListener('kosnora:purchase-completed', () => {
    syncEligibilityUI();
    setQuantity(currentQty);
  });
  window.addEventListener('storage', () => {
    syncEligibilityUI();
    setQuantity(currentQty);
  });

  syncEligibilityUI();

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (btn.hasAttribute('data-qty')) {
        const reqQty = parseInt(btn.getAttribute('data-qty'), 10);
        if ([1, 2, 3].includes(reqQty)) {
          setQuantity(reqQty);
        }
      } else {
        setQuantity(currentQty);
      }

      // Sync model and finish from section if selected on page
      const sectionModel = document.getElementById('pricing-model-select');
      if (sectionModel && modelSelect) {
        modelSelect.value = sectionModel.options[sectionModel.selectedIndex].text;
        if (summaryModel) summaryModel.textContent = modelSelect.value;
      }
      const sectionColorLabel = document.getElementById('pricing-finish-label');
      if (sectionColorLabel && summaryColor) {
        summaryColor.textContent = sectionColorLabel.textContent;
      }

      if (drawerBackdrop) drawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (drawerBackdrop) drawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  bundleCards.forEach(card => {
    card.addEventListener('click', () => {
      const qty = parseInt(card.getAttribute('data-bundle-quantity'), 10);
      setQuantity(qty);
    });
  });

  if (modelSelect) {
    modelSelect.addEventListener('change', () => {
      if (summaryModel) summaryModel.textContent = modelSelect.value;
      if (propModelInput) propModelInput.value = modelSelect.value;
    });
  }

  colorSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorSelectBtns.forEach(b => b.classList.remove('active-color'));
      btn.classList.add('active-color');
      const name = btn.getAttribute('data-name');
      if (summaryColor && name) summaryColor.textContent = name;
      if (propColorInput && name) propColorInput.value = name;
    });
  });

  let isSubmittingCheckout = false;

  async function resolveShopifyVariantId() {
    let vId = document.getElementById('drawer-variant-id')?.value;
    if (vId && vId !== '1' && vId !== 'default' && vId.trim() !== '') {
      return vId.trim();
    }
    if (window.KOSNORA_STORE && window.KOSNORA_STORE.variantId && String(window.KOSNORA_STORE.variantId).trim() !== '') {
      return String(window.KOSNORA_STORE.variantId).trim();
    }
    // Dynamic query fallback to /products.json on Shopify store
    try {
      const rootUrl = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || (window.KOSNORA_STORE && window.KOSNORA_STORE.root) || '/';
      const res = await fetch(rootUrl + 'products.json?limit=10');
      if (res.ok) {
        const data = await res.json();
        if (data && data.products && data.products.length > 0) {
          const product = data.products.find(p => p.title.toLowerCase().includes('kosnora')) || data.products[0];
          const variant = (product.variants && product.variants.find(v => v.available)) || (product.variants && product.variants[0]);
          if (variant && variant.id) {
            const foundId = String(variant.id);
            const input = document.getElementById('drawer-variant-id');
            if (input) input.value = foundId;
            if (window.KOSNORA_STORE) window.KOSNORA_STORE.variantId = foundId;
            return foundId;
          }
        }
      }
    } catch (e) {
      console.warn('Could not auto-resolve Shopify variant ID:', e);
    }
    return vId || null;
  }

  if (proceedBtn) {
    proceedBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (isSubmittingCheckout) return;
      isSubmittingCheckout = true;

      // Visual feedback: prevent double submission
      const originalBtnHtml = proceedBtn.innerHTML;
      proceedBtn.disabled = true;
      proceedBtn.style.opacity = '0.7';
      proceedBtn.innerHTML = '<span>REDIRECTING TO CHECKOUT...</span>';

      const selectedModelVal = (summaryModel && summaryModel.textContent) || (modelSelect && modelSelect.value) || 'iPhone 17 Pro Max';
      const selectedColorVal = (summaryColor && summaryColor.textContent) || 'Obsidian Black';

      if (propModelInput) propModelInput.value = selectedModelVal;
      if (propColorInput) propColorInput.value = selectedColorVal;
      if (qtyInput) qtyInput.value = currentQty;

      const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || (window.KOSNORA_STORE && window.KOSNORA_STORE.root) || '/';
      const checkoutUrl = root + 'checkout';

      try {
        const variantId = await resolveShopifyVariantId();
        if (variantId) {
          const varInput = document.getElementById('drawer-variant-id');
          if (varInput) varInput.value = variantId;
        }

        // 1. Clear cart first so the cart contains ONLY the chosen offer
        try {
          await fetch(root + 'cart/clear.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
        } catch (clearErr) {
          console.warn('Cart clear non-fatal error:', clearErr);
        }

        // 2. Add selected offer with exact quantity and item properties to Shopify cart
        const cartAddRes = await fetch(root + 'cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            items: [{
              id: variantId || 1,
              quantity: currentQty,
              properties: {
                'iPhone Model': selectedModelVal,
                'Case Color': selectedColorVal,
                'Offer Selection': `${currentQty} Case${currentQty > 1 ? 's' : ''}`,
                'Promotion Eligibility': checkCustomerFirstPurchase() ? 'First Purchase Offer Applied' : 'Standard Purchase',
                'Pricing Structure': `$${currentUnitPrice.toFixed(2)} each · $${currentTotal.toFixed(2)} total`
              }
            }]
          })
        });

        if (cartAddRes.ok) {
          try {
            localStorage.setItem('kosnora_has_purchased', 'true');
          } catch (e) {}

          // 3. Immediately redirect directly to the real Shopify checkout
          window.location.href = checkoutUrl;
          return;
        } else {
          const errData = await cartAddRes.json().catch(() => ({}));
          console.warn('Shopify cart/add.js returned status:', cartAddRes.status, errData);

          // Fallback A: Checkout permalink if variant ID exists
          if (variantId && variantId !== '1') {
            window.location.href = `${root}cart/${variantId}:${currentQty}?return_to=/checkout`;
            return;
          }

          // Fallback B: Standard POST form with return_to=/checkout
          const form = document.getElementById('kosnora-drawer-cart-form');
          if (form) {
            form.submit();
            return;
          }
        }
      } catch (err) {
        console.error('Checkout processing error:', err);
        // Fallback form submit
        const form = document.getElementById('kosnora-drawer-cart-form');
        if (form) {
          form.submit();
          return;
        }
      }

      // Final fallback: redirect directly to checkout URL
      window.location.href = checkoutUrl;
    });
  }

  // Initialize with Option 1 (1 Case - $79.90) as default
  setQuantity(1);
}

// 4. Policy Modals
function initPolicyModals() {
  const modalBackdrop = document.getElementById('kosnora-policy-modal');
  const modalTitle = document.getElementById('policy-modal-title');
  const modalBody = document.getElementById('policy-modal-body');
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  const triggers = document.querySelectorAll('[data-policy-trigger]');

  const POLICIES = {
    contact: {
      title: 'Customer Contact & Support',
      content: '[Insert customer support contact details here]\n\nEmail: [Insert support@kosnora.com]\nOperational Hours: [Insert operational business hours]\nResponse time: Within 24-48 business hours.',
    },
    shipping: {
      title: 'Shipping Policy',
      content: '[Insert actual shipping policy and estimated delivery timelines here]\n\nStandard domestic shipping across the US is handled via certified parcel services.\nTracking numbers are automatically emailed upon order dispatch.',
    },
    return: {
      title: 'Return Policy',
      content: '[Insert actual return & exchange policy here]\n\nItems must be in original condition with intact packaging. For return instructions, contact customer service.',
    },
    privacy: {
      title: 'Privacy Policy',
      content: '[Insert formal privacy policy here]\n\nKOSNORA values customer privacy. We collect only necessary transaction and shipping information to fulfill orders and do not sell your personal data.',
    },
    terms: {
      title: 'Terms of Service',
      content: '[Insert formal terms of service here]\n\nBy purchasing KOSNORA accessories, customers agree to standard terms of purchase, warranty conditions, and usage guidelines.',
    },
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const key = trigger.getAttribute('data-policy-trigger');
      const policy = POLICIES[key];
      if (policy && modalTitle && modalBody && modalBackdrop) {
        modalTitle.textContent = policy.title;
        modalBody.innerText = policy.content;
        modalBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modalBackdrop) modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// 5. Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}
