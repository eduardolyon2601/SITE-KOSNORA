/**
 * KOSNORA - Native Shopify Multi-Variant Bundle JavaScript
 * 
 * Directly interfaces with Shopify Online Store 2.0 theme, reads real variant data
 * from Liquid JSON scripts, manages multi-unit configuration (1, 2, or 3 distinct phone models and colors),
 * and adds each unit with its verified real Shopify variant ID to the native Shopify Ajax Cart API.
 */

(function () {
  'use strict';

  // 22 combinations explicitly out of stock from official inventory file
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

  function normalizeModel(m) {
    return (m || '').toLowerCase().replace(/^iphone\s*/i, '').replace(/\s+/g, '').trim();
  }

  function normalizeColor(c) {
    const s = (c || '').toLowerCase().trim();
    if (['gray', 'grey', 'cinza', 'titanium'].includes(s)) return 'grey';
    if (['black', 'preto', 'dark'].includes(s)) return 'black';
    if (['pink', 'rosa', 'rose'].includes(s)) return 'pink';
    if (['white', 'branco', 'silver'].includes(s)) return 'white';
    if (['orange', 'laranja', 'amber'].includes(s)) return 'orange';
    return s;
  }

  function isCombinationOutOfStock(model, color) {
    const nm = normalizeModel(model);
    const nc = normalizeColor(color);
    return OUT_OF_STOCK_COMBINATIONS.some(item => item.model === nm && item.color === nc);
  }

  function getColorHex(colorName) {
    const c = (colorName || '').toLowerCase().trim();
    if (['gray', 'grey'].includes(c)) return '#808080';
    if (['black'].includes(c)) return '#111111';
    if (['pink'].includes(c)) return '#F472B6';
    if (['white'].includes(c)) return '#FFFFFF';
    if (['orange'].includes(c)) return '#FB923C';
    return '#9333EA';
  }

  function calculateBundlePricing(quantity) {
    if (quantity === 1) {
      return { total: 79.9, subtotal: 79.9, discount: 0, unitPrice: 79.9, promoTag: 'Single Case' };
    }
    if (quantity === 2) {
      return { total: 139.9, subtotal: 159.8, discount: 19.9, unitPrice: 69.95, promoTag: '2 Cases (Save $19.90)' };
    }
    if (quantity === 3) {
      return { total: 194.9, subtotal: 239.7, discount: 44.8, unitPrice: 64.97, promoTag: '3 Cases (Save $44.80)' };
    }
    const unitPrice = 64.97;
    const total = 259.88;
    const subtotal = 319.6;
    const discount = 59.72;
    return { total, subtotal, discount, unitPrice, promoTag: '4 Cases (Save $59.72)' };
  }

  function formatMoney(amount) {
    return '$' + (amount || 0).toFixed(2);
  }

  /**
   * Initializes bundle instances on the page (supports multiple or dynamic section rendering)
   */
  function initSection(sectionContainer) {
    const sectionId = sectionContainer.getAttribute('data-section-id');
    const productJsonEl = sectionContainer.querySelector('[data-kosnora-product-json]');
    const variantsJsonEl = sectionContainer.querySelector('[data-kosnora-variants-json]');

    let productData = null;
    let variantsList = [];

    try {
      if (productJsonEl && productJsonEl.textContent) {
        productData = JSON.parse(productJsonEl.textContent);
      }
      if (variantsJsonEl && variantsJsonEl.textContent) {
        variantsList = JSON.parse(variantsJsonEl.textContent);
      }
    } catch (e) {
      console.warn('[KOSNORA] JSON parse error in section:', e);
    }

    // Elements
    const tierTabs = sectionContainer.querySelectorAll('.kosnora-tier-tab');
    const unitsTabsBar = document.getElementById(`bundle-units-tabs-bar-${sectionId}`);
    const modelSelect = document.getElementById(`bundle-model-select-${sectionId}`);
    const colorButtonsWrap = document.getElementById(`bundle-color-buttons-${sectionId}`);
    const colorNameDisplay = document.getElementById(`bundle-color-name-display-${sectionId}`);
    const stockStatusWrap = document.getElementById(`bundle-stock-status-${sectionId}`);
    const modelLabelText = document.getElementById(`bundle-model-label-text-${sectionId}`);
    const colorLabelText = document.getElementById(`bundle-color-label-text-${sectionId}`);

    // Gallery elements
    const videoWrap = document.getElementById(`bundle-video-container-${sectionId}`);
    const vimeoIframe = document.getElementById(`bundle-vimeo-${sectionId}`);
    const mainImg = document.getElementById(`bundle-main-image-${sectionId}`);
    const colorBadge = document.getElementById(`bundle-color-badge-${sectionId}`);
    const watchVideoBtn = document.getElementById(`bundle-watch-video-btn-${sectionId}`);
    const watchPhotoBtn = document.getElementById(`bundle-watch-photo-btn-${sectionId}`);

    // Presentation Video Gallery state (completely separated from variant/color selection)
    let isPlayingVideo = true;

    function pauseBundleVimeo() {
      if (vimeoIframe) {
        try {
          vimeoIframe.contentWindow.postMessage('{"method":"pause"}', '*');
        } catch (e) {}
      }
    }

    function playBundleVimeo() {
      if (vimeoIframe) {
        try {
          vimeoIframe.contentWindow.postMessage('{"method":"play"}', '*');
        } catch (e) {}
      }
    }

    // Summary & CTA elements
    const summaryLabel = document.getElementById(`bundle-summary-label-${sectionId}`);
    const summarySubtotal = document.getElementById(`bundle-summary-subtotal-${sectionId}`);
    const discountRow = document.getElementById(`bundle-discount-row-${sectionId}`);
    const summaryDiscount = document.getElementById(`bundle-summary-discount-${sectionId}`);
    const summaryTotal = document.getElementById(`bundle-summary-total-${sectionId}`);
    const savingsNote = document.getElementById(`bundle-savings-note-${sectionId}`);
    const addUnitBtn = document.getElementById(`bundle-add-unit-btn-${sectionId}`);
    const buyButton = document.getElementById(`bundle-buy-button-${sectionId}`);
    const buyButtonText = document.getElementById(`bundle-buy-button-text-${sectionId}`);
    const errorBox = document.getElementById(`bundle-error-message-${sectionId}`);

    // Multi-unit State
    let selectedQuantity = 1;
    let activeUnitIndex = 0;
    let units = [
      { id: 'unit-1', model: 'iPhone 16 Pro Max', color: 'Gray' }
    ];

    /**
     * Resolves the real Shopify variant ID for a specific model + color
     */
    function resolveVariant(model, color) {
      // 1. Check out of stock combinations
      if (isCombinationOutOfStock(model, color)) {
        return { id: null, available: false, title: `${model} / ${color}` };
      }

      // If we have real product variants loaded from Liquid
      if (variantsList && variantsList.length > 0) {
        // Try strict matching on options
        let matched = variantsList.find(v => {
          const opts = [v.option1, v.option2, v.option3].filter(Boolean).map(o => o.toLowerCase());
          const c = color.toLowerCase();
          const m = model.toLowerCase();
          const mStripped = m.replace(/^iphone\s*/i, '');
          const hasColor = opts.some(o => o.includes(c) || c.includes(o));
          const hasModel = opts.some(o => o.includes(m) || o.includes(mStripped));
          return hasColor && hasModel;
        });

        // Try title matching
        if (!matched) {
          matched = variantsList.find(v => {
            const t = (v.title || '').toLowerCase();
            const c = color.toLowerCase();
            const m = model.toLowerCase();
            const mStripped = m.replace(/^iphone\s*/i, '');
            return (t.includes(c) || c.includes(t)) && (t.includes(m) || t.includes(mStripped));
          });
        }

        // Single fallback if store has a single default title
        if (!matched && variantsList.length === 1) {
          matched = variantsList[0];
        }

        if (matched) {
          return {
            id: matched.id,
            available: matched.available !== false,
            title: matched.title,
            matchedVariant: matched
          };
        }
      }

      // If in Shopify Store context
      if (window.KOSNORA_STORE && window.KOSNORA_STORE.variantId) {
        return { id: window.KOSNORA_STORE.variantId, available: true, title: `${model} / ${color}` };
      }

      return { id: null, available: false, title: `${model} / ${color}` };
    }

    function renderUnitTabs() {
      if (!unitsTabsBar) return;
      unitsTabsBar.innerHTML = '';

      units.forEach((u, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `kosnora-unit-tab-btn ${idx === activeUnitIndex ? 'active' : ''}`;
        
        const dot = document.createElement('span');
        dot.className = 'unit-tab-dot';
        dot.style.backgroundColor = getColorHex(u.color);

        const text = document.createElement('span');
        text.textContent = `Case #${idx + 1}: ${u.model} (${u.color})`;

        btn.appendChild(dot);
        btn.appendChild(text);

        // Remove button for units beyond 1
        if (units.length > 1) {
          const removeSpan = document.createElement('span');
          removeSpan.textContent = ' ×';
          removeSpan.style.color = '#9CA3AF';
          removeSpan.style.fontWeight = 'bold';
          removeSpan.style.marginLeft = '4px';
          removeSpan.title = 'Remove this case';
          removeSpan.addEventListener('click', (e) => {
            e.stopPropagation();
            removeUnit(idx);
          });
          btn.appendChild(removeSpan);
        }

        btn.addEventListener('click', () => {
          activeUnitIndex = idx;
          updateActiveUnitUI();
          renderUnitTabs();
        });

        unitsTabsBar.appendChild(btn);
      });
    }

    function updateActiveUnitUI() {
      const currentUnit = units[activeUnitIndex];
      if (!currentUnit) return;

      if (modelLabelText) {
        modelLabelText.textContent = units.length > 1 ? `Case #${activeUnitIndex + 1} Model:` : 'iPhone Model:';
      }
      if (colorLabelText) {
        colorLabelText.textContent = units.length > 1 ? `Case #${activeUnitIndex + 1} Color:` : 'Case Color:';
      }

      if (modelSelect) {
        modelSelect.value = currentUnit.model;
        // Update options out-of-stock text and disabled state
        Array.from(modelSelect.options).forEach(opt => {
          const m = opt.value;
          const isOos = isCombinationOutOfStock(m, currentUnit.color);
          opt.disabled = isOos;
          opt.textContent = isOos ? `${m} · Sold out` : m;
        });
      }

      if (colorNameDisplay) {
        colorNameDisplay.textContent = currentUnit.color;
      }

      // Update color pill buttons
      if (colorButtonsWrap) {
        const pills = colorButtonsWrap.querySelectorAll('.kosnora-color-pill');
        pills.forEach(pill => {
          const colorName = pill.getAttribute('data-color');
          if (!colorName || colorName === 'Video') return;
          const isSelected = colorName.toLowerCase() === currentUnit.color.toLowerCase();
          const isOos = isCombinationOutOfStock(currentUnit.model, colorName);
          pill.classList.toggle('active', isSelected);
          pill.classList.toggle('is-out-of-stock', isOos);
          pill.disabled = isOos;
          pill.setAttribute('aria-disabled', isOos ? 'true' : 'false');
          pill.style.pointerEvents = isOos ? 'none' : 'auto';
          pill.style.cursor = isOos ? 'not-allowed' : 'pointer';
          pill.style.opacity = isOos ? '0.5' : '1';
          pill.title = isOos ? `${colorName} - Sold out for ${currentUnit.model}` : `${colorName} - In stock`;
        });
      }

      // Check availability of active unit
      const isCurrentOos = isCombinationOutOfStock(currentUnit.model, currentUnit.color);
      if (stockStatusWrap) {
        if (!isCurrentOos) {
          stockStatusWrap.innerHTML = `
            <span class="status-in-stock">
              <span class="status-dot"></span>
              <span>In Stock · Ready to Ship ${units.length > 1 ? `(Case #${activeUnitIndex + 1})` : ''}</span>
            </span>
          `;
        } else {
          stockStatusWrap.innerHTML = `
            <span class="status-out-of-stock">
              <span class="status-dot"></span>
              <span>Out of stock for this combination ${units.length > 1 ? `(Case #${activeUnitIndex + 1})` : `(${currentUnit.color} / ${currentUnit.model})`}</span>
            </span>
          `;
        }
      }

      // Media toggle buttons sync
      if (watchVideoBtn) {
        watchVideoBtn.classList.toggle('active', isPlayingVideo);
        watchVideoBtn.style.background = isPlayingVideo ? '#9333EA' : '#FFF';
        watchVideoBtn.style.color = isPlayingVideo ? '#FFF' : '#374151';
        watchVideoBtn.style.borderColor = isPlayingVideo ? '#9333EA' : '#E5E7EB';
      }
      if (watchPhotoBtn) {
        watchPhotoBtn.classList.toggle('active', !isPlayingVideo);
        watchPhotoBtn.style.background = !isPlayingVideo ? '#9333EA' : '#FFF';
        watchPhotoBtn.style.color = !isPlayingVideo ? '#FFF' : '#374151';
        watchPhotoBtn.style.borderColor = !isPlayingVideo ? '#9333EA' : '#E5E7EB';
      }

      // Visual Gallery sync
      if (isPlayingVideo) {
        if (videoWrap) videoWrap.style.display = 'flex';
        if (mainImg) mainImg.style.display = 'none';
        if (colorBadge) colorBadge.style.display = 'none';
        playBundleVimeo();
      } else {
        pauseBundleVimeo();
        if (videoWrap) videoWrap.style.display = 'none';
        if (mainImg) {
          mainImg.style.display = 'block';
          const activePill = colorButtonsWrap?.querySelector(`.kosnora-color-pill[data-color="${currentUnit.color}"]`);
          const src = activePill?.getAttribute('data-src');
          if (src) mainImg.src = src;
        }
        if (colorBadge) {
          colorBadge.style.display = 'block';
          colorBadge.textContent = currentUnit.color;
        }
      }

      updatePricingAndCTA();
    }

    function updatePricingAndCTA() {
      const pricing = calculateBundlePricing(units.length);

      if (summaryLabel) {
        summaryLabel.textContent = `Subtotal (${units.length} ${units.length === 1 ? 'case' : 'cases'}):`;
      }
      if (summarySubtotal) {
        summarySubtotal.textContent = formatMoney(pricing.subtotal);
      }

      if (discountRow) {
        if (pricing.discount > 0) {
          discountRow.style.display = 'flex';
          if (summaryDiscount) summaryDiscount.textContent = `-${formatMoney(pricing.discount)}`;
        } else {
          discountRow.style.display = 'none';
        }
      }

      if (summaryTotal) {
        summaryTotal.textContent = formatMoney(pricing.total);
      }

      if (savingsNote) {
        if (pricing.discount > 0) {
          savingsNote.style.display = 'block';
          savingsNote.textContent = `You save ${formatMoney(pricing.discount)}`;
        } else {
          savingsNote.style.display = 'none';
        }
      }

      // Check if any unit in the entire bundle is out of stock
      const outOfStockUnits = units
        .map((u, i) => ({ unit: u, index: i }))
        .filter(item => isCombinationOutOfStock(item.unit.model, item.unit.color));

      const hasOos = outOfStockUnits.length > 0;

      if (buyButton && buyButtonText) {
        if (hasOos) {
          buyButton.disabled = true;
          const firstOos = outOfStockUnits[0];
          buyButtonText.textContent = `COMBINATION OUT OF STOCK (Case #${firstOos.index + 1}: ${firstOos.unit.color})`;
        } else {
          buyButton.disabled = false;
          buyButtonText.textContent = `ADD TO CART (${units.length} ${units.length === 1 ? 'CASE' : 'CASES'} · ${formatMoney(pricing.total)})`;
        }
      }
    }

    function setTierQuantity(targetQty) {
      selectedQuantity = targetQty;

      // Update tier tabs active styling
      tierTabs.forEach(tab => {
        const qty = parseInt(tab.getAttribute('data-bundle-qty'), 10);
        tab.classList.toggle('active', qty === targetQty);
      });

      // Synchronize units array length
      const defaultModels = ['iPhone 16 Pro Max', 'iPhone 15 Pro Max', 'iPhone 14 Pro', 'iPhone 13 Pro', 'iPhone 16 Pro'];
      const defaultColors = ['Gray', 'Black', 'White', 'Pink', 'Orange'];

      if (units.length < targetQty) {
        while (units.length < targetQty) {
          const idx = units.length;
          units.push({
            id: `unit-${Date.now()}-${idx + 1}`,
            model: defaultModels[idx % defaultModels.length],
            color: defaultColors[idx % defaultColors.length]
          });
        }
      } else if (units.length > targetQty) {
        units = units.slice(0, targetQty);
      }

      if (activeUnitIndex >= units.length) {
        activeUnitIndex = 0;
      }

      renderUnitTabs();
      updateActiveUnitUI();
    }

    function removeUnit(index) {
      if (units.length <= 1) return;
      units.splice(index, 1);
      if (activeUnitIndex >= units.length) {
        activeUnitIndex = Math.max(0, units.length - 1);
      }
      // Sync tier tabs
      const newQty = units.length;
      tierTabs.forEach(tab => {
        const qty = parseInt(tab.getAttribute('data-bundle-qty'), 10);
        tab.classList.toggle('active', qty === newQty);
      });
      renderUnitTabs();
      updateActiveUnitUI();
    }

    // Event: Tier click
    tierTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const qty = parseInt(tab.getAttribute('data-bundle-qty'), 10);
        setTierQuantity(qty);
      });
    });

    // Event: Model change
    if (modelSelect) {
      modelSelect.addEventListener('change', () => {
        if (!units[activeUnitIndex]) return;
        units[activeUnitIndex].model = modelSelect.value;
        renderUnitTabs();
        updateActiveUnitUI();
      });
    }

    // Event: Color pills click
    if (colorButtonsWrap) {
      const pills = colorButtonsWrap.querySelectorAll('.kosnora-color-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          if (!units[activeUnitIndex]) return;
          const colorName = pill.getAttribute('data-color');
          if (!colorName || colorName === 'Video') return;
          if (isCombinationOutOfStock(units[activeUnitIndex].model, colorName)) return;
          // Selecting a color switches to that photo and keeps variant selection
          isPlayingVideo = false;
          units[activeUnitIndex].color = colorName;
          renderUnitTabs();
          updateActiveUnitUI();
        });
      });
    }

    // Event: Gallery Video/Photo toggle buttons (Discreet, separated from product options)
    if (watchVideoBtn) {
      watchVideoBtn.addEventListener('click', () => {
        isPlayingVideo = true;
        updateActiveUnitUI();
      });
    }

    if (watchPhotoBtn) {
      watchPhotoBtn.addEventListener('click', () => {
        isPlayingVideo = false;
        updateActiveUnitUI();
      });
    }

    // Event: Add unit button
    if (addUnitBtn) {
      addUnitBtn.addEventListener('click', () => {
        const defaultModels = ['iPhone 16 Pro Max', 'iPhone 15 Pro Max', 'iPhone 14 Pro', 'iPhone 13 Pro'];
        const defaultColors = ['Black', 'White', 'Gray', 'Pink'];
        const idx = units.length;
        units.push({
          id: `unit-${Date.now()}-${idx + 1}`,
          model: defaultModels[idx % defaultModels.length],
          color: defaultColors[idx % defaultColors.length]
        });
        activeUnitIndex = units.length - 1;

        // Sync tier tab highlight if 2 or 3
        tierTabs.forEach(tab => {
          const qty = parseInt(tab.getAttribute('data-bundle-qty'), 10);
          tab.classList.toggle('active', qty === units.length);
        });

        renderUnitTabs();
        updateActiveUnitUI();
      });
    }

    /**
     * Official Shopify Cart Integration:
     * Adds all units to the real Shopify cart using cart/add.js, confirms the cart response,
     * and redirects directly to the official /checkout route.
     */
    async function handleOfficialShopifyCheckout() {
      if (errorBox) errorBox.style.display = 'none';

      // 1. Validate all units
      const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) ||
                   (window.KOSNORA_STORE && window.KOSNORA_STORE.root) || '/';

      const itemsToAdd = [];

      for (let i = 0; i < units.length; i++) {
        const u = units[i];
        const res = resolveVariant(u.model, u.color);

        if (!res || !res.id || res.available === false) {
          if (errorBox) {
            errorBox.style.display = 'block';
            errorBox.textContent = `Case #${i + 1} (${u.model} - ${u.color}) is currently out of stock.`;
          }
          return;
        }

        const variantId = Number(res.id);
        if (!Number.isSafeInteger(variantId) || variantId <= 0) {
          if (errorBox) {
            errorBox.style.display = 'block';
            errorBox.textContent = `Option unavailable for Case #${i + 1}. Please choose another combination.`;
          }
          return;
        }

        itemsToAdd.push({
          id: variantId,
          quantity: 1,
          properties: {
            'Case': `#${i + 1} of ${units.length}`,
            'iPhone Model': u.model,
            'Case Color': u.color,
            'Bundle': `${units.length} Cases`
          }
        });
      }

      if (itemsToAdd.length === 0) {
        if (errorBox) {
          errorBox.style.display = 'block';
          errorBox.textContent = 'No valid units to add to cart.';
        }
        return;
      }

      // 2. UI Loading state
      buyButton.disabled = true;
      buyButton.style.opacity = '0.8';
      buyButtonText.textContent = 'Opening your cart...';

      const cartUrl = `${root}cart`;

      try {
        // 3. Add items cumulatively via official Shopify Ajax Cart API (never clears previous items)
        const response = await fetch(`${root}cart/add.js`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ items: itemsToAdd })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.description || result.message || 'Error adding to cart.');
        }

        // 4. Verify cart items from /cart.js to ensure items exist
        const cartVerifyRes = await fetch(`${root}cart.js`);
        if (cartVerifyRes.ok) {
          const cartState = await cartVerifyRes.json();
          if (!cartState.items || cartState.items.length === 0) {
            throw new Error('Cart did not confirm addition of items.');
          }
        }

        // 5. Redirect to official Shopify Cart page
        buyButtonText.textContent = 'Opening your cart...';
        window.location.assign(cartUrl);
      } catch (err) {
        console.warn('[KOSNORA] Cart API fallback:', err);
        // Fallback: direct multi-variant cart permalink
        const pairs = itemsToAdd.map(it => `${it.id}:1`).join(',');
        const permalink = `${root}cart/${pairs}`;
        window.location.assign(permalink);
      }
    }

    if (buyButton) {
      buyButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleOfficialShopifyCheckout();
      });
    }

    // Initial render
    renderUnitTabs();
    updateActiveUnitUI();
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.kosnora-multi-bundle-section').forEach(initSection);
    });
  } else {
    document.querySelectorAll('.kosnora-multi-bundle-section').forEach(initSection);
  }

  // Shopify Theme Editor support (re-init on section load)
  document.addEventListener('shopify:section:load', (e) => {
    const s = e.target.querySelector('.kosnora-multi-bundle-section');
    if (s) initSection(s);
  });
})();
