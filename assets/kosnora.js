/**
 * KOSNORA - Native Shopify Theme JavaScript
 * Pure Vanilla JS, zero runtime frameworks, 100% Online Store 2.0 compliant
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroGallery();
  initFaqAccordion();
  initDrawer();
  initPolicyModals();
  initSmoothScroll();
});

// 1. Phone Case Product Photo & Looping Video Gallery (Shopify-Compatible)
function initHeroGallery() {
  function pauseVimeo(iframe) {
    if (!iframe) return;
    try {
      iframe.contentWindow.postMessage('{"method":"pause"}', '*');
    } catch (e) {}
  }

  function playVimeo(iframe) {
    if (!iframe) return;
    try {
      iframe.contentWindow.postMessage('{"method":"play"}', '*');
    } catch (e) {}
  }

  // Desktop
  const desktopVideo = document.getElementById('kosnora-desktop-video');
  const desktopVimeoIframe = document.getElementById('kosnora-vimeo-desktop');
  const desktopImg = document.getElementById('kosnora-desktop-img');
  const desktopBadge = document.getElementById('desktop-color-badge');
  const desktopLabel = document.getElementById('active-desktop-label');
  const desktopThumbs = document.querySelectorAll('[data-gallery-desktop]');

  if (desktopThumbs.length) {
    desktopThumbs.forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-src');
        const name = btn.getAttribute('data-name');
        const isVideo = !src || name === 'Video';

        if (isVideo) {
          // Show Video and resume loop
          if (desktopVideo) desktopVideo.style.display = 'block';
          if (desktopImg) desktopImg.style.display = 'none';
          if (desktopBadge) desktopBadge.style.display = 'none';
          if (desktopLabel) desktopLabel.textContent = 'Video';
          playVimeo(desktopVimeoIframe);
        } else {
          // Customer clicked a color: STOP VIDEO LOOP IMMEDIATELY & show photo
          pauseVimeo(desktopVimeoIframe);
          if (desktopVideo) desktopVideo.style.display = 'none';
          if (desktopImg) {
            desktopImg.src = src;
            desktopImg.style.display = 'block';
          }
          if (desktopBadge) {
            desktopBadge.textContent = name;
            desktopBadge.style.display = 'block';
          }
          if (desktopLabel) desktopLabel.textContent = name;
        }

        desktopThumbs.forEach(b => {
          b.style.borderColor = '#E5E7EB';
          b.style.background = '#FFF';
          const spans = b.querySelectorAll('span');
          spans.forEach(s => { s.style.color = '#374151'; });
        });
        btn.style.borderColor = '#9333EA';
        btn.style.background = '#FAF5FF';
        const activeSpans = btn.querySelectorAll('span');
        activeSpans.forEach(s => { s.style.color = '#9333EA'; });
      });
    });
  }

  // Mobile
  const mobileVideo = document.getElementById('kosnora-mobile-video');
  const mobileVimeoIframe = document.getElementById('kosnora-vimeo-mobile');
  const mobileImg = document.getElementById('kosnora-mobile-img');
  const mobileBadge = document.getElementById('mobile-color-badge');
  const mobileThumbs = document.querySelectorAll('[data-gallery-mobile]');

  if (mobileThumbs.length) {
    mobileThumbs.forEach(btn => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-src');
        const name = btn.getAttribute('data-name');
        const isVideo = !src || name === 'Video';

        if (isVideo) {
          // Show Video and resume loop
          if (mobileVideo) mobileVideo.style.display = 'block';
          if (mobileImg) mobileImg.style.display = 'none';
          if (mobileBadge) mobileBadge.style.display = 'none';
          playVimeo(mobileVimeoIframe);
        } else {
          // Customer clicked a color: STOP VIDEO LOOP IMMEDIATELY & show photo
          pauseVimeo(mobileVimeoIframe);
          if (mobileVideo) mobileVideo.style.display = 'none';
          if (mobileImg) {
            mobileImg.src = src;
            mobileImg.style.display = 'block';
          }
          if (mobileBadge) {
            mobileBadge.textContent = name;
            mobileBadge.style.display = 'block';
          }
        }

        mobileThumbs.forEach(b => {
          b.style.borderColor = '#E5E7EB';
          b.style.background = '#FFF';
          b.style.color = '#374151';
        });
        btn.style.borderColor = '#9333EA';
        btn.style.background = '#9333EA';
        btn.style.color = '#FFF';
      });
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
    1: { qty: 1, unitPrice: 79.90, total: 79.90, savings: 0, label: '1x KOSNORA Case' },
    2: { qty: 2, unitPrice: 69.95, total: 139.90, savings: 19.90, label: '2x KOSNORA Cases' },
    3: { qty: 3, unitPrice: 64.97, total: 194.90, savings: 44.80, label: '3x KOSNORA Cases' }
  };

  const REGULAR_OFFERS = {
    1: { qty: 1, unitPrice: 79.90, total: 79.90, savings: 0, label: '1x KOSNORA Case' },
    2: { qty: 2, unitPrice: 69.95, total: 139.90, savings: 19.90, label: '2x KOSNORA Cases' },
    3: { qty: 3, unitPrice: 64.97, total: 194.90, savings: 44.80, label: '3x KOSNORA Cases' }
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
    if (summaryQty) summaryQty.textContent = `${currentQty}x KOSNORA Case`;
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

  // ============================================================
  // SHOPIFY PRODUCT & VARIANT ENGINE
  // ============================================================
  let activeProduct = null;
  const variantAlertEl = document.getElementById('drawer-variant-alert');

  function showDrawerAlert(msg, type = 'error') {
    if (!variantAlertEl) return;
    variantAlertEl.style.display = 'block';
    if (type === 'error') {
      variantAlertEl.style.backgroundColor = '#FEF2F2';
      variantAlertEl.style.color = '#B91C1C';
      variantAlertEl.style.border = '1px solid #FECACA';
    } else if (type === 'info') {
      variantAlertEl.style.backgroundColor = '#EFF6FF';
      variantAlertEl.style.color = '#1D4ED8';
      variantAlertEl.style.border = '1px solid #BFDBFE';
    }
    variantAlertEl.textContent = msg;
  }

  function hideDrawerAlert() {
    if (!variantAlertEl) return;
    variantAlertEl.style.display = 'none';
    variantAlertEl.textContent = '';
  }

  function parseProductJson(jsonString) {
    try {
      if (!jsonString) return null;
      const parsed = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      if (parsed && (parsed.id || (parsed.variants && parsed.variants.length > 0))) {
        return parsed;
      }
    } catch (e) {}
    return null;
  }

  function isColorMatch(optionVal, targetColor) {
    if (!optionVal || !targetColor) return false;
    const v = optionVal.toLowerCase().trim();
    const t = targetColor.toLowerCase().trim();
    if (v === t || v.includes(t) || t.includes(v)) return true;

    const synonyms = {
      'gray': ['gray', 'grey', 'cinza', 'titanium', 'grafite', 'slate'],
      'black': ['black', 'preto', 'obsidian', 'dark', 'midnight', 'noir'],
      'pink': ['pink', 'rosa', 'rose', 'blush'],
      'white': ['white', 'branco', 'silver', 'prata', 'starlight', 'pearl'],
      'orange': ['orange', 'laranja', 'sunset', 'amber']
    };

    for (const key in synonyms) {
      if (synonyms[key].includes(t)) {
        if (synonyms[key].some(s => v.includes(s))) return true;
      }
    }
    return false;
  }

  function isModelMatch(optionVal, targetModel) {
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

  async function loadActiveProduct() {
    if (activeProduct && activeProduct.variants && activeProduct.variants.length > 0) {
      return activeProduct;
    }

    // 1. Check window.KOSNORA_PRODUCT injected by theme.liquid
    if (window.KOSNORA_PRODUCT && window.KOSNORA_PRODUCT.variants && window.KOSNORA_PRODUCT.variants.length > 0) {
      activeProduct = window.KOSNORA_PRODUCT;
      return activeProduct;
    }

    // 2. Check JSON script tags in DOM
    const scriptTags = [
      document.getElementById('kosnora-product-data'),
      document.getElementById('kosnora-hero-product-data')
    ];
    for (const tag of scriptTags) {
      if (tag && tag.textContent) {
        const parsed = parseProductJson(tag.textContent);
        if (parsed && parsed.variants && parsed.variants.length > 0) {
          activeProduct = parsed;
          return activeProduct;
        }
      }
    }

    // 3. Check window.KOSNORA_STORE variants
    if (window.KOSNORA_STORE && Array.isArray(window.KOSNORA_STORE.variants) && window.KOSNORA_STORE.variants.length > 0) {
      activeProduct = {
        id: window.KOSNORA_STORE.productId,
        handle: window.KOSNORA_STORE.productHandle,
        title: window.KOSNORA_STORE.productTitle,
        variants: window.KOSNORA_STORE.variants,
        options: window.KOSNORA_STORE.options || []
      };
      return activeProduct;
    }

    // 4. Check window.KOSNORA_COLLECTION_PRODUCTS
    if (window.KOSNORA_COLLECTION_PRODUCTS && Array.isArray(window.KOSNORA_COLLECTION_PRODUCTS) && window.KOSNORA_COLLECTION_PRODUCTS.length > 0) {
      const match = window.KOSNORA_COLLECTION_PRODUCTS.find(p =>
        (p.title && p.title.toLowerCase().includes('kosnora')) ||
        (p.handle && p.handle.toLowerCase().includes('kosnora'))
      ) || window.KOSNORA_COLLECTION_PRODUCTS[0];
      if (match && match.variants && match.variants.length > 0) {
        activeProduct = match;
        return activeProduct;
      }
    }

    // 5. Query /products.json dynamically on Shopify store
    const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || (window.KOSNORA_STORE && window.KOSNORA_STORE.root) || '/';
    try {
      const res = await fetch(root + 'products.json?limit=25');
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.products) && data.products.length > 0) {
          const match = data.products.find(p =>
            (p.title && p.title.toLowerCase().includes('kosnora')) ||
            (p.handle && p.handle.toLowerCase().includes('kosnora'))
          ) || data.products[0];
          if (match && match.variants && match.variants.length > 0) {
            activeProduct = match;
            return activeProduct;
          }
        }
      }
    } catch (err) {
      console.warn('[KOSNORA] products.json lookup:', err);
    }

    return null;
  }

  function findVariantForOptions(modelName, colorName) {
    if (!activeProduct || !activeProduct.variants || activeProduct.variants.length === 0) {
      const domId = document.getElementById('drawer-variant-id')?.value;
      const storeId = window.KOSNORA_STORE && window.KOSNORA_STORE.variantId;
      const validFallback = (domId && domId !== '1' && domId.trim() !== '') ? domId.trim() : (storeId && String(storeId) !== '1' && String(storeId).trim() !== '') ? String(storeId).trim() : null;
      if (validFallback) {
        return { id: validFallback, available: true, title: 'Default' };
      }
      return null;
    }

    const variants = activeProduct.variants;

    // 1. Match both Model and Color in option values (option1, option2, option3)
    let matched = variants.find(v => {
      const opts = [v.option1, v.option2, v.option3].filter(Boolean);
      const hasColor = opts.some(o => isColorMatch(o, colorName));
      const hasModel = opts.some(o => isModelMatch(o, modelName));
      return hasColor && hasModel;
    });

    // 2. Match both in variant title
    if (!matched) {
      matched = variants.find(v => {
        const title = (v.title || '').toLowerCase();
        return isColorMatch(title, colorName) && isModelMatch(title, modelName);
      });
    }

    // 3. Match Color alone (Model preserved via Line Item Properties)
    if (!matched) {
      matched = variants.find(v => {
        const opts = [v.option1, v.option2, v.option3].filter(Boolean);
        return opts.some(o => isColorMatch(o, colorName));
      });
    }

    if (!matched) {
      matched = variants.find(v => {
        const title = (v.title || '').toLowerCase();
        return isColorMatch(title, colorName);
      });
    }

    // 4. Match Model alone (Color preserved via Line Item Properties)
    if (!matched) {
      matched = variants.find(v => {
        const opts = [v.option1, v.option2, v.option3].filter(Boolean);
        return opts.some(o => isModelMatch(o, modelName));
      });
    }

    // 5. If only 1 variant in product (Standard single variant)
    if (!matched && variants.length === 1) {
      matched = variants[0];
    }

    // 6. Fallback: First available variant in product
    if (!matched) {
      matched = variants.find(v => v.available !== false) || variants[0];
    }

    return matched;
  }

  function updateSelectedVariant() {
    const selectedModelVal = (summaryModel && summaryModel.textContent) || (modelSelect && modelSelect.value) || 'iPhone 17 Pro Max';
    const selectedColorVal = (summaryColor && summaryColor.textContent) || 'Gray';

    const variant = findVariantForOptions(selectedModelVal, selectedColorVal);
    const varInput = document.getElementById('drawer-variant-id');

    if (!variant || !variant.id) {
      if (varInput) varInput.value = '';
      showDrawerAlert('Selecione o produto KOSNORA no painel/tema da Shopify para ativar as opções.', 'info');
      return null;
    }

    // Set real variant ID
    const validId = String(variant.id);
    if (varInput) varInput.value = validId;
    if (window.KOSNORA_STORE) window.KOSNORA_STORE.variantId = validId;

    // Check availability
    if (variant.available === false) {
      showDrawerAlert(`A opção "${selectedModelVal} - ${selectedColorVal}" está esgotada no momento. Por favor, escolha outra cor ou modelo.`, 'error');
      if (proceedBtn) {
        proceedBtn.disabled = true;
        proceedBtn.style.opacity = '0.6';
        proceedBtn.innerHTML = '<span>OPÇÃO ESGOTADA</span>';
      }
      return variant;
    }

    // Available and valid
    hideDrawerAlert();
    if (proceedBtn) {
      proceedBtn.disabled = false;
      proceedBtn.style.opacity = '1';
      proceedBtn.innerHTML = `<span>PROCEED TO CHECKOUT (<span id="drawer-cta-total">$${currentTotal.toFixed(2)}</span>)</span>`;
    }

    return variant;
  }

  // Pre-load active product
  loadActiveProduct().then(() => {
    updateSelectedVariant();
  });

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (btn.hasAttribute('data-qty')) {
        const reqQty = parseInt(btn.getAttribute('data-qty'), 10);
        if ([1, 2, 3].includes(reqQty)) {
          setQuantity(reqQty);
        }
      } else {
        setQuantity(currentQty);
      }

      // Sync active color from page gallery
      const activeDesktopThumb = document.querySelector('[data-gallery-desktop].active-thumb');
      const activeMobileThumb = document.querySelector('[data-gallery-mobile].active-thumb');
      const chosenColor = (activeDesktopThumb && activeDesktopThumb.getAttribute('data-name')) || (activeMobileThumb && activeMobileThumb.getAttribute('data-name'));
      if (chosenColor && chosenColor !== 'Video') {
        colorSelectBtns.forEach(b => {
          if (b.getAttribute('data-name') === chosenColor) {
            colorSelectBtns.forEach(cb => cb.classList.remove('active-color'));
            b.classList.add('active-color');
            if (summaryColor) summaryColor.textContent = chosenColor;
            if (propColorInput) propColorInput.value = chosenColor;
          }
        });
      }

      // Update variant match immediately
      updateSelectedVariant();

      if (drawerBackdrop) drawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (drawerBackdrop) drawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      hideDrawerAlert();
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
      updateSelectedVariant();
    });
  }

  colorSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorSelectBtns.forEach(b => b.classList.remove('active-color'));
      btn.classList.add('active-color');
      const name = btn.getAttribute('data-name');
      if (summaryColor && name) summaryColor.textContent = name;
      if (propColorInput && name) propColorInput.value = name;
      updateSelectedVariant();
    });
  });

  let isSubmittingCheckout = false;

  if (proceedBtn) {
    proceedBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (isSubmittingCheckout) return;

      // 1. Ensure product is loaded and variant is matched
      await loadActiveProduct();
      const variant = updateSelectedVariant();
      const variantId = document.getElementById('drawer-variant-id')?.value;

      if (!variantId || variantId === '1' || variantId === 'default' || isNaN(Number(variantId))) {
        showDrawerAlert('Não foi possível identificar a variante do produto. Por favor, verifique se o produto está selecionado no tema da Shopify.', 'error');
        return;
      }

      if (variant && variant.available === false) {
        showDrawerAlert('Esta variante está esgotada no momento. Por favor, selecione outra cor ou modelo.', 'error');
        return;
      }

      isSubmittingCheckout = true;
      proceedBtn.disabled = true;
      proceedBtn.style.opacity = '0.75';
      proceedBtn.innerHTML = '<span>PROCESSANDO PEDIDO...</span>';

      const selectedModelVal = (summaryModel && summaryModel.textContent) || (modelSelect && modelSelect.value) || 'iPhone 17 Pro Max';
      const selectedColorVal = (summaryColor && summaryColor.textContent) || 'Gray';

      if (propModelInput) propModelInput.value = selectedModelVal;
      if (propColorInput) propColorInput.value = selectedColorVal;
      if (qtyInput) qtyInput.value = currentQty;

      const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || (window.KOSNORA_STORE && window.KOSNORA_STORE.root) || '/';
      const checkoutUrl = root + 'checkout';

      try {
        // Add selected offer with exact quantity and item properties to Shopify cart
        const cartAddRes = await fetch(root + 'cart/add.js', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            items: [{
              id: Number(variantId),
              quantity: currentQty,
              properties: {
                'iPhone Model': selectedModelVal,
                'Case Color': selectedColorVal,
                'Offer Selection': `${currentQty} Case${currentQty > 1 ? 's' : ''}`,
                'Promotion Eligibility': checkCustomerFirstPurchase() ? 'First Purchase Promotion Applied' : 'Standard Purchase',
                'Price Structure': `$${currentUnitPrice.toFixed(2)} each · $${currentTotal.toFixed(2)} total`
              }
            }]
          })
        });

        if (cartAddRes.ok) {
          proceedBtn.innerHTML = '<span>REDIRECIONANDO PARA O CHECKOUT...</span>';
          try {
            localStorage.setItem('kosnora_has_purchased', 'true');
          } catch (e) {}

          window.location.href = checkoutUrl;
          return;
        } else {
          const errData = await cartAddRes.json().catch(() => ({}));
          console.warn('[KOSNORA] cart/add.js returned status:', cartAddRes.status, errData);

          // Fallback A: Checkout permalink with confirmed real variant ID
          if (variantId && Number(variantId) > 1) {
            proceedBtn.innerHTML = '<span>REDIRECIONANDO PARA O CHECKOUT...</span>';
            window.location.href = `${root}cart/${variantId}:${currentQty}?return_to=/checkout`;
            return;
          }

          // Show Shopify error cleanly to user without submitting empty form
          const errDescription = errData.description || errData.message || 'Erro ao adicionar o produto ao carrinho. Verifique a disponibilidade.';
          showDrawerAlert(errDescription, 'error');
          isSubmittingCheckout = false;
          proceedBtn.disabled = false;
          proceedBtn.style.opacity = '1';
          proceedBtn.innerHTML = `<span>TENTAR NOVAMENTE ($${currentTotal.toFixed(2)})</span>`;
          return;
        }
      } catch (err) {
        console.error('[KOSNORA] Checkout exception:', err);
        // Fallback permalink if variantId is numeric
        if (variantId && Number(variantId) > 1) {
          window.location.href = `${root}cart/${variantId}:${currentQty}?return_to=/checkout`;
          return;
        }
        showDrawerAlert('Erro de conexão ao acessar o carrinho. Por favor, tente novamente.', 'error');
        isSubmittingCheckout = false;
        proceedBtn.disabled = false;
        proceedBtn.style.opacity = '1';
        proceedBtn.innerHTML = `<span>TENTAR NOVAMENTE ($${currentTotal.toFixed(2)})</span>`;
      }
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
