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
          b.classList.remove('active-thumb');
          b.style.borderColor = '#E5E7EB';
          b.style.background = '#FFF';
          const spans = b.querySelectorAll('span');
          spans.forEach(s => { s.style.color = '#374151'; });
        });
        btn.classList.add('active-thumb');
        btn.style.borderColor = '#9333EA';
        btn.style.background = '#FAF5FF';
        const activeSpans = btn.querySelectorAll('span');
        activeSpans.forEach(s => { s.style.color = '#9333EA'; });

        if (!isVideo && name) {
          window.dispatchEvent(new CustomEvent('kosnora:colorchange', { detail: { name, src } }));
        }
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
          b.classList.remove('active-thumb');
          b.style.borderColor = '#E5E7EB';
          b.style.background = '#FFF';
          b.style.color = '#374151';
        });
        btn.classList.add('active-thumb');
        btn.style.borderColor = '#9333EA';
        btn.style.background = '#9333EA';
        btn.style.color = '#FFF';

        if (!isVideo && name) {
          window.dispatchEvent(new CustomEvent('kosnora:colorchange', { detail: { name, src } }));
        }
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

// 3. Checkout & Order Drawer (Minimalist, Conversion-Optimized)
function initDrawer() {
  const drawerBackdrop = document.getElementById('kosnora-order-drawer');
  const closeBtns = document.querySelectorAll('[data-close-drawer]');
  const openBtns = document.querySelectorAll('[data-open-drawer]');

  // Stepper elements
  const qtyMinusBtn = document.getElementById('drawer-qty-minus');
  const qtyPlusBtn = document.getElementById('drawer-qty-plus');
  const qtyDisplay = document.getElementById('drawer-qty-display');
  const itemCountLabel = document.getElementById('drawer-item-count-label');

  // Product card elements
  const productImg = document.getElementById('drawer-product-img');
  const summaryModel = document.getElementById('drawer-summary-model');
  const summaryColor = document.getElementById('drawer-summary-color');
  const unitPriceVal = document.getElementById('drawer-unit-price-val');
  const unitPriceSuffix = document.getElementById('drawer-unit-price-suffix');
  const bundleTag = document.getElementById('drawer-bundle-tag');

  // Financial summary elements
  const subtotalLabel = document.getElementById('drawer-subtotal-label');
  const subtotalVal = document.getElementById('drawer-subtotal-val');
  const discountRow = document.getElementById('drawer-discount-row');
  const discountVal = document.getElementById('drawer-discount-val');
  const savingsNote = document.getElementById('drawer-savings-note');
  const totalPriceEl = document.getElementById('drawer-total-price');
  const ctaTotal = document.getElementById('drawer-cta-total');
  const proceedBtn = document.getElementById('drawer-proceed-checkout');

  // Hidden form inputs
  const varInput = document.getElementById('drawer-variant-id');
  const qtyInput = document.getElementById('drawer-quantity-input');
  const propModelInput = document.getElementById('drawer-prop-model');
  const propColorInput = document.getElementById('drawer-prop-color');
  const propOfferInput = document.getElementById('drawer-prop-offer');

  const variantAlertEl = document.getElementById('drawer-variant-alert');

  let currentQty = 1;
  let currentColor = 'Gray';
  let currentModel = 'iPhone 16 Pro Max';
  let activeProduct = null;
  let isSubmittingCheckout = false;
  let syncTimeout = null;

  // Currency helper
  function getCurrencySymbol() {
    return (window.KOSNORA_STORE && window.KOSNORA_STORE.currency) || 'R$';
  }

  function formatMoney(amount) {
    const sym = getCurrencySymbol();
    const formatted = (amount || 0).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return `${sym} ${formatted}`;
  }

  /**
   * KOSNORA Progressive Pricing Rules:
   * 1 unit: R$ 79,90 (R$ 79,90/each, 0 discount)
   * 2 units: R$ 139,90 (R$ 69,95/each, R$ 19,90 discount from 159.80)
   * 3 units: R$ 194,90 (R$ 64,97/each, R$ 44,80 discount from 239.70)
   * 4+ units: R$ 64,97/each, progressive volume savings
   */
  function calculatePricing(qty) {
    qty = Math.max(1, parseInt(qty, 10) || 1);
    const baseUnitPrice = 79.90;
    const subtotal = Number((qty * baseUnitPrice).toFixed(2));

    if (qty === 1) {
      return {
        qty: 1,
        unitPrice: baseUnitPrice,
        subtotal,
        discount: 0,
        total: baseUnitPrice,
        tag: null,
        savingsText: null
      };
    }

    if (qty === 2) {
      const total = 139.90;
      const unitPrice = 69.95;
      const discount = Number((subtotal - total).toFixed(2)); // 19.90
      return {
        qty: 2,
        unitPrice,
        subtotal,
        discount,
        total,
        tag: '2x Pack',
        savingsText: 'Você economiza ' + formatMoney(discount)
      };
    }

    if (qty === 3) {
      const total = 194.90;
      const unitPrice = 64.97;
      const discount = Number((subtotal - total).toFixed(2)); // 44.80
      return {
        qty: 3,
        unitPrice,
        subtotal,
        discount,
        total,
        tag: 'Melhor Valor',
        savingsText: 'Você economiza ' + formatMoney(discount)
      };
    }

    // 4 or more
    const unitPrice = 64.97;
    const total = Number((qty * unitPrice).toFixed(2));
    const discount = Number((subtotal - total).toFixed(2));
    return {
      qty,
      unitPrice,
      subtotal,
      discount,
      total,
      tag: `Oferta Volume (${qty}x)`,
      savingsText: 'Você economiza ' + formatMoney(discount)
    };
  }

  function showDrawerAlert(msg, type = 'error') {
    if (!variantAlertEl) return;
    variantAlertEl.style.display = 'block';
    if (type === 'error') {
      variantAlertEl.style.backgroundColor = '#FEF2F2';
      variantAlertEl.style.color = '#B91C1C';
      variantAlertEl.style.border = '1px solid #FECACA';
    } else {
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

  function updateCartUI() {
    const pricing = calculatePricing(currentQty);

    if (qtyDisplay) qtyDisplay.textContent = String(pricing.qty);
    if (qtyInput) qtyInput.value = String(pricing.qty);

    if (itemCountLabel) {
      itemCountLabel.textContent = `${pricing.qty} ${pricing.qty === 1 ? 'item selecionado' : 'itens selecionados'}`;
    }

    // Unit price
    if (unitPriceVal) unitPriceVal.textContent = formatMoney(pricing.unitPrice);
    if (unitPriceSuffix) {
      unitPriceSuffix.style.display = pricing.qty > 1 ? 'inline' : 'none';
    }

    // Bundle tag badge
    if (bundleTag) {
      if (pricing.tag) {
        bundleTag.style.display = 'inline-block';
        bundleTag.textContent = pricing.tag;
      } else {
        bundleTag.style.display = 'none';
      }
    }

    // Financial breakdown
    if (subtotalLabel) {
      subtotalLabel.textContent = `Subtotal (${pricing.qty} ${pricing.qty === 1 ? 'unidade' : 'unidades'}):`;
    }
    if (subtotalVal) subtotalVal.textContent = formatMoney(pricing.subtotal);

    // Promotional discount row (Instant and dynamic!)
    if (discountRow) {
      if (pricing.discount > 0) {
        discountRow.style.display = 'flex';
        if (discountVal) discountVal.textContent = `-${formatMoney(pricing.discount)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    // Savings note
    if (savingsNote) {
      if (pricing.savingsText) {
        savingsNote.style.display = 'block';
        savingsNote.textContent = pricing.savingsText;
      } else {
        savingsNote.style.display = 'none';
      }
    }

    // Total and CTA
    if (totalPriceEl) totalPriceEl.textContent = formatMoney(pricing.total);
    if (ctaTotal) ctaTotal.textContent = formatMoney(pricing.total);

    if (proceedBtn && !isSubmittingCheckout) {
      proceedBtn.innerHTML = `<span>CONTINUAR PARA O CHECKOUT (<span id="drawer-cta-total">${formatMoney(pricing.total)}</span>)</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 6px;"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>`;
    }

    if (propOfferInput) {
      propOfferInput.value = pricing.tag || `${pricing.qty} Case${pricing.qty > 1 ? 's' : ''}`;
    }
  }

  // ============================================================
  // SHOPIFY VARIANT ENGINE (Matches and Preserves)
  // ============================================================
  function parseProductJson(jsonString) {
    try {
      if (!jsonString) return null;
      return typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
    } catch (e) {
      return null;
    }
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

  // Official Shopify variants registered in store
  const STORE_INVENTORY = [
    { color: 'orange', model: '17pro' },
    { color: 'orange', model: '17' },
    { color: 'orange', model: '17promax' },
    { color: 'pink', model: '15promax' },
    { color: 'pink', model: '14pro' },
    { color: 'pink', model: '15pro' },
    { color: 'pink', model: '13' },
    { color: 'pink', model: '14' },
    { color: 'pink', model: '13promax' },
    { color: 'pink', model: '14promax' },
    { color: 'pink', model: '16promax' },
    { color: 'pink', model: '13pro' },
    { color: 'pink', model: '16pro' },
    { color: 'pink', model: '15' },
    { color: 'white', model: '16promax' },
    { color: 'white', model: '13pro' },
    { color: 'white', model: '17pro' },
    { color: 'white', model: '16pro' },
    { color: 'white', model: '17' },
    { color: 'white', model: '15' },
    { color: 'white', model: '17promax' },
    { color: 'white', model: '15promax' },
    { color: 'white', model: '14pro' },
    { color: 'white', model: '15pro' },
    { color: 'white', model: '13' },
    { color: 'white', model: '14' },
    { color: 'white', model: '13promax' },
    { color: 'white', model: '14promax' },
    { color: 'grey', model: '15promax' },
    { color: 'grey', model: '14pro' },
    { color: 'grey', model: '15pro' },
    { color: 'grey', model: '13' },
    { color: 'grey', model: '14' },
    { color: 'grey', model: '13promax' },
    { color: 'grey', model: '14promax' },
    { color: 'grey', model: '16promax' },
    { color: 'grey', model: '13pro' },
    { color: 'grey', model: '17pro' },
    { color: 'grey', model: '16pro' },
    { color: 'grey', model: '17' },
    { color: 'grey', model: '15' },
    { color: 'grey', model: '17promax' },
    { color: 'black', model: '16promax' },
    { color: 'black', model: '12pro' },
    { color: 'black', model: '13pro' },
    { color: 'black', model: '17pro' },
    { color: 'black', model: '12' },
    { color: 'black', model: '16pro' },
    { color: 'black', model: '17' },
    { color: 'black', model: '15' },
    { color: 'black', model: '17promax' },
    { color: 'black', model: '15promax' },
    { color: 'black', model: '14pro' },
    { color: 'black', model: '15pro' },
    { color: 'black', model: '13' },
    { color: 'black', model: '14' },
    { color: 'black', model: '13promax' },
    { color: 'black', model: '14promax' }
  ];

  // 22 explicitly identified out-of-stock combinations from official inventory export
  const OUT_OF_STOCK_COMBINATIONS = [
    // Orange (13)
    { color: 'orange', model: '16promax' },
    { color: 'orange', model: '12pro' },
    { color: 'orange', model: '13pro' },
    { color: 'orange', model: '12' },
    { color: 'orange', model: '16pro' },
    { color: 'orange', model: '15' },
    { color: 'orange', model: '15promax' },
    { color: 'orange', model: '14pro' },
    { color: 'orange', model: '15pro' },
    { color: 'orange', model: '13' },
    { color: 'orange', model: '14' },
    { color: 'orange', model: '13promax' },
    { color: 'orange', model: '14promax' },

    // White (2)
    { color: 'white', model: '12pro' },
    { color: 'white', model: '12' },

    // Pink (5)
    { color: 'pink', model: '12pro' },
    { color: 'pink', model: '17pro' },
    { color: 'pink', model: '12' },
    { color: 'pink', model: '17' },
    { color: 'pink', model: '17promax' },

    // Grey (2)
    { color: 'grey', model: '12pro' },
    { color: 'grey', model: '12' }
  ];

  function normalizeModelCode(model) {
    return (model || '')
      .toLowerCase()
      .replace(/^iphone\s*/i, '')
      .replace(/\s+/g, '')
      .trim();
  }

  function normalizeColorCode(color) {
    const c = (color || '').toLowerCase().trim();
    if (['gray', 'grey', 'cinza', 'titanium', 'grafite'].includes(c)) return 'grey';
    if (['black', 'preto', 'dark', 'midnight'].includes(c)) return 'black';
    if (['pink', 'rosa', 'rose'].includes(c)) return 'pink';
    if (['white', 'branco', 'silver', 'prata'].includes(c)) return 'white';
    if (['orange', 'laranja', 'sunset'].includes(c)) return 'orange';
    return c;
  }

  function isCombinationInStoreInventory(model, color) {
    const normColor = normalizeColorCode(color);
    const normModel = normalizeModelCode(model);

    // 1. Explicit out-of-stock verification
    if (OUT_OF_STOCK_COMBINATIONS.some(item => item.color === normColor && item.model === normModel)) {
      return false;
    }

    // 2. Real-time Shopify product availability verification
    if (activeProduct && Array.isArray(activeProduct.variants) && activeProduct.variants.length > 0) {
      const liveMatched = activeProduct.variants.find(v => {
        const opts = [v.option1, v.option2, v.option3].filter(Boolean);
        return opts.some(o => isColorMatch(o, color)) && opts.some(o => isModelMatch(o, model));
      }) || activeProduct.variants.find(v => {
        const title = (v.title || '').toLowerCase();
        return isColorMatch(title, color) && isModelMatch(title, model);
      });

      if (liveMatched && liveMatched.available === false) {
        return false;
      }
    }

    // 3. Fallback to registered catalog
    return STORE_INVENTORY.some(item => item.color === normColor && item.model === normModel);
  }

  async function loadActiveProduct() {
    if (activeProduct && activeProduct.variants && activeProduct.variants.length > 0) {
      return activeProduct;
    }

    if (window.KOSNORA_PRODUCT && window.KOSNORA_PRODUCT.variants && window.KOSNORA_PRODUCT.variants.length > 0) {
      activeProduct = window.KOSNORA_PRODUCT;
      return activeProduct;
    }

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

    const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || (window.KOSNORA_STORE && window.KOSNORA_STORE.root) || '/';
    const candidateHandles = [
      window.KOSNORA_STORE && window.KOSNORA_STORE.productHandle,
      'case-kosnora-digital',
      'ink-nfc-phone-case-for-iphone-17-16-15-14-pro-max-12-diy-picture-smart-screen-phone-cases-four-colors-image-screen-battery-free',
      'kosnora-case',
      'kosnora'
    ].filter(Boolean);

    for (const handle of candidateHandles) {
      try {
        const pRes = await fetch(root + 'products/' + handle + '.js');
        if (pRes.ok) {
          const pData = await pRes.json();
          if (pData && Array.isArray(pData.variants) && pData.variants.length > 0) {
            activeProduct = pData;
            return activeProduct;
          }
        }
      } catch (e) {}
    }

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
    // Check real store inventory first
    if (!isCombinationInStoreInventory(modelName, colorName)) {
      return { id: '', available: false, title: `${modelName} / ${colorName}` };
    }

    if (!activeProduct || !activeProduct.variants || activeProduct.variants.length === 0) {
      const domId = varInput?.value;
      const storeId = window.KOSNORA_STORE && window.KOSNORA_STORE.variantId;
      const validFallback = (domId && domId !== '1' && domId.trim() !== '') ? domId.trim() : (storeId && String(storeId) !== '1' && String(storeId).trim() !== '') ? String(storeId).trim() : null;
      if (validFallback) {
        return { id: validFallback, available: true, title: 'Default' };
      }
      return null;
    }

    const variants = activeProduct.variants;

    // 1. Match both Model and Color in options
    let matched = variants.find(v => {
      const opts = [v.option1, v.option2, v.option3].filter(Boolean);
      return opts.some(o => isColorMatch(o, colorName)) && opts.some(o => isModelMatch(o, modelName));
    });

    // 2. Match both Model and Color in title
    if (!matched) {
      matched = variants.find(v => {
        const title = (v.title || '').toLowerCase();
        return isColorMatch(title, colorName) && isModelMatch(title, modelName);
      });
    }

    // 3. Match Color alone only if store has no Model options
    if (!matched) {
      const hasModelOption = activeProduct.options && activeProduct.options.some(opt => {
        const name = typeof opt === 'string' ? opt : (opt.name || '');
        return /model|modelo|device|aparelho/i.test(name);
      });

      if (!hasModelOption) {
        matched = variants.find(v => {
          const opts = [v.option1, v.option2, v.option3].filter(Boolean);
          return opts.some(o => isColorMatch(o, colorName));
        });
      }
    }

    // 4. Default variant if store has only 1 single default title
    if (!matched && variants.length === 1 && (variants[0].title === 'Default Title' || variants[0].option1 === 'Default Title')) {
      matched = variants[0];
    }

    return matched || null;
  }

  function syncVariantSelection() {
    const variant = findVariantForOptions(currentModel, currentColor);

    if (variant && variant.id) {
      const validId = String(variant.id);
      if (varInput) varInput.value = validId;
      if (window.KOSNORA_STORE) window.KOSNORA_STORE.variantId = validId;

      if (variant.available === false) {
        showDrawerAlert(`A opção "${currentModel} - ${currentColor}" está esgotada no momento.`, 'error');
        if (proceedBtn) {
          proceedBtn.disabled = true;
          proceedBtn.style.opacity = '0.6';
          proceedBtn.innerHTML = '<span>OPÇÃO ESGOTADA</span>';
        }
        return variant;
      }

      hideDrawerAlert();
      if (proceedBtn) {
        proceedBtn.disabled = false;
        proceedBtn.style.opacity = '1';
        updateCartUI();
      }
      return variant;
    }

    // Combination does not exist in store
    showDrawerAlert(`A combinação "${currentModel} - ${currentColor}" não está disponível na loja.`, 'error');
    if (proceedBtn) {
      proceedBtn.disabled = true;
      proceedBtn.style.opacity = '0.6';
      proceedBtn.innerHTML = '<span>COMBINAÇÃO INDISPONÍVEL</span>';
    }
    return null;
  }

  // Real Shopify Cart API Sync (Debounced for flawless performance)
  function syncShopifyCartLive() {
    clearTimeout(syncTimeout);
    syncTimeout = setTimeout(async () => {
      const variantId = varInput?.value;
      if (!variantId || variantId === '1' || isNaN(Number(variantId))) return;

      const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || (window.KOSNORA_STORE && window.KOSNORA_STORE.root) || '/';
      const pricing = calculatePricing(currentQty);

      try {
        await fetch(root + 'cart/clear.js', { method: 'POST' }).catch(() => {});
        await fetch(root + 'cart/add.js', {
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
                'iPhone Model': currentModel,
                'Case Color': currentColor,
                'Offer Selection': pricing.tag || `${currentQty} Case${currentQty > 1 ? 's' : ''}`,
                'Price Structure': `${formatMoney(pricing.unitPrice)} cada · ${formatMoney(pricing.total)} total`
              }
            }]
          })
        });
      } catch (e) {
        console.warn('[KOSNORA] Background cart sync:', e);
      }
    }, 400);
  }

  // Stepper Event Listeners
  if (qtyPlusBtn) {
    qtyPlusBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentQty += 1;
      updateCartUI();
      syncShopifyCartLive();
    });
  }

  if (qtyMinusBtn) {
    qtyMinusBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentQty > 1) {
        currentQty -= 1;
        updateCartUI();
        syncShopifyCartLive();
      }
    });
  }

  function updateLandingPageStockUI() {
    const isAvailable = isCombinationInStoreInventory(currentModel, currentColor);

    // 1. Update landing page primary CTA buttons
    const heroCtaBtns = document.querySelectorAll('.kosnora-btn-primary[data-open-drawer]');
    heroCtaBtns.forEach(btn => {
      if (!isAvailable) {
        btn.disabled = true;
        btn.setAttribute('aria-disabled', 'true');
        btn.style.opacity = '0.65';
        btn.style.cursor = 'not-allowed';
        btn.style.background = '#E5E7EB';
        btn.style.color = '#6B7280';
        btn.innerHTML = '<span>COMBINAÇÃO ESGOTADA</span>';
      } else {
        btn.disabled = false;
        btn.removeAttribute('aria-disabled');
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
        btn.style.background = 'linear-gradient(135deg, #9333EA 0%, #8015F5 50%, #6B21A8 100%)';
        btn.style.color = '#FFF';
        btn.innerHTML = '<span>GET YOUR KOSNORA</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align:middle; margin-left:6px;"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>';
      }
    });

    // 2. Update landing page tier card buy buttons
    const tierBuyBtns = document.querySelectorAll('.kosnora-tier-buy-btn');
    tierBuyBtns.forEach(btn => {
      if (!isAvailable) {
        btn.disabled = true;
        btn.setAttribute('aria-disabled', 'true');
        btn.style.opacity = '0.6';
        btn.style.cursor = 'not-allowed';
        btn.textContent = 'Esgotado';
      } else {
        btn.disabled = false;
        btn.removeAttribute('aria-disabled');
        btn.style.opacity = '1';
        btn.style.cursor = 'pointer';
        btn.textContent = 'Buy Now';
      }
    });

    // 3. Update model select dropdown options with stock indicators
    const selects = [
      document.getElementById('hero-desktop-model-select'),
      document.getElementById('hero-mobile-model-select')
    ];
    selects.forEach(sel => {
      if (!sel) return;
      Array.from(sel.options).forEach(opt => {
        const rawModel = opt.value;
        const optAvail = isCombinationInStoreInventory(rawModel, currentColor);
        opt.textContent = optAvail ? rawModel : `${rawModel} · (Esgotado)`;
      });
    });

    // 4. Update color thumbnails with status indication
    const allThumbs = document.querySelectorAll('[data-gallery-desktop], [data-gallery-mobile]');
    allThumbs.forEach(thumb => {
      const colorName = thumb.getAttribute('data-name');
      if (!colorName || colorName === 'Video') return;
      const colAvail = isCombinationInStoreInventory(currentModel, colorName);
      if (!colAvail) {
        thumb.title = `${colorName} - Esgotado para ${currentModel}`;
        if (!thumb.classList.contains('active-thumb')) {
          thumb.style.opacity = '0.7';
        }
      } else {
        thumb.title = `${colorName} - Em estoque`;
        if (!thumb.classList.contains('active-thumb')) {
          thumb.style.opacity = '1';
        }
      }
    });
  }

  // Open Drawer Listeners
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Capture selected model from the landing page
      const desktopModelSelect = document.getElementById('hero-desktop-model-select');
      const mobileModelSelect = document.getElementById('hero-mobile-model-select');
      const chosenModel = (desktopModelSelect && desktopModelSelect.value) ||
                          (mobileModelSelect && mobileModelSelect.value);
      if (chosenModel) {
        currentModel = chosenModel;
      }

      // Capture selected color from the landing page
      const activeDesktopThumb = document.querySelector('[data-gallery-desktop].active-thumb');
      const activeMobileThumb = document.querySelector('[data-gallery-mobile].active-thumb');
      const chosenColor = (activeDesktopThumb && activeDesktopThumb.getAttribute('data-name')) ||
                          (activeMobileThumb && activeMobileThumb.getAttribute('data-name'));
      if (chosenColor && chosenColor !== 'Video') {
        currentColor = chosenColor;
      }

      // Guard: Do NOT open drawer if combination is out of stock!
      const isAvailable = isCombinationInStoreInventory(currentModel, currentColor);
      if (!isAvailable) {
        updateLandingPageStockUI();
        return;
      }

      // Set quantity from tier if specified (e.g. data-qty="2")
      if (btn.hasAttribute('data-qty')) {
        const reqQty = parseInt(btn.getAttribute('data-qty'), 10);
        if (reqQty >= 1) currentQty = reqQty;
      }

      // Match product thumbnail with chosen color
      const colorSrc = (activeDesktopThumb && activeDesktopThumb.getAttribute('data-src')) ||
                       (activeMobileThumb && activeMobileThumb.getAttribute('data-src'));
      if (colorSrc && productImg) {
        productImg.src = colorSrc;
      }

      // Update read-only pill labels (Preserving customer choices!)
      if (summaryColor) summaryColor.textContent = currentColor;
      if (summaryModel) summaryModel.textContent = currentModel;
      if (propColorInput) propColorInput.value = currentColor;
      if (propModelInput) propModelInput.value = currentModel;

      updateCartUI();
      syncVariantSelection();
      syncShopifyCartLive();

      if (drawerBackdrop) drawerBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  // Close Drawer Listeners
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (drawerBackdrop) drawerBackdrop.classList.remove('open');
      document.body.style.overflow = '';
      hideDrawerAlert();
    });
  });

  // Sync on page model changes
  const desktopModelSelect = document.getElementById('hero-desktop-model-select');
  const mobileModelSelect = document.getElementById('hero-mobile-model-select');
  if (desktopModelSelect) {
    desktopModelSelect.addEventListener('change', () => {
      currentModel = desktopModelSelect.value;
      if (mobileModelSelect) mobileModelSelect.value = currentModel;
      if (summaryModel) summaryModel.textContent = currentModel;
      updateLandingPageStockUI();
      syncVariantSelection();
    });
  }
  if (mobileModelSelect) {
    mobileModelSelect.addEventListener('change', () => {
      currentModel = mobileModelSelect.value;
      if (desktopModelSelect) desktopModelSelect.value = currentModel;
      if (summaryModel) summaryModel.textContent = currentModel;
      updateLandingPageStockUI();
      syncVariantSelection();
    });
  }

  // Listen to color changes from hero gallery
  window.addEventListener('kosnora:colorchange', (e) => {
    if (e.detail && e.detail.name && e.detail.name !== 'Video') {
      currentColor = e.detail.name;
      if (summaryColor) summaryColor.textContent = currentColor;
      updateLandingPageStockUI();
      syncVariantSelection();
    }
  });

  // Pre-load active product and sync initial landing page UI
  loadActiveProduct().then(() => {
    updateLandingPageStockUI();
    syncVariantSelection();
  });

  // Proceed to Checkout Button Listener
  if (proceedBtn) {
    proceedBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (isSubmittingCheckout) return;

      await loadActiveProduct();
      const variant = syncVariantSelection();
      const variantId = varInput?.value;

      if (!variantId || variantId === '1' || variantId === 'default' || isNaN(Number(variantId))) {
        showDrawerAlert('Não foi possível identificar a variante do produto. Por favor, verifique se o produto está selecionado na loja da Shopify.', 'error');
        return;
      }

      if (variant && variant.available === false) {
        showDrawerAlert('Esta variante está esgotada no momento. Por favor, selecione outra opção.', 'error');
        return;
      }

      isSubmittingCheckout = true;
      proceedBtn.disabled = true;
      proceedBtn.style.opacity = '0.8';
      proceedBtn.innerHTML = '<span>PROCESSANDO PEDIDO...</span>';

      const pricing = calculatePricing(currentQty);
      const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || (window.KOSNORA_STORE && window.KOSNORA_STORE.root) || '/';
      let checkoutUrl = root + 'checkout';

      if (currentQty === 2) {
        checkoutUrl += '?discount=BUNDLE2';
      } else if (currentQty >= 3) {
        checkoutUrl += '?discount=BUNDLE3';
      }

      try {
        await fetch(root + 'cart/clear.js', { method: 'POST' }).catch(() => {});
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
                'iPhone Model': currentModel,
                'Case Color': currentColor,
                'Offer Selection': pricing.tag || `${currentQty} Case${currentQty > 1 ? 's' : ''}`,
                'Price Structure': `${formatMoney(pricing.unitPrice)} cada · ${formatMoney(pricing.total)} total`
              }
            }]
          })
        });

        if (cartAddRes.ok) {
          proceedBtn.innerHTML = '<span>REDIRECIONANDO PARA O CHECKOUT...</span>';
          try {
            localStorage.setItem('kosnora_has_purchased', 'true');
          } catch (err) {}

          window.location.href = checkoutUrl;
          return;
        } else {
          // Fallback permalink
          proceedBtn.innerHTML = '<span>REDIRECIONANDO PARA O CHECKOUT...</span>';
          window.location.href = `${root}cart/${variantId}:${currentQty}?return_to=/checkout`;
          return;
        }
      } catch (err) {
        console.error('[KOSNORA] Checkout exception:', err);
        // Fallback permalink
        window.location.href = `${root}cart/${variantId}:${currentQty}?return_to=/checkout`;
      }
    });
  }

  // Initial render
  updateCartUI();
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
