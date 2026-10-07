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

  let currentQty = 2;
  let currentUnitPrice = 69.90;
  let currentTotal = 139.80;
  let currentSavings = 20.00;

  function updateSummary() {
    if (summaryQty) summaryQty.textContent = `${currentQty}x KOSNORA Smart Case`;
    if (summaryTotal) summaryTotal.textContent = `$${currentTotal.toFixed(2)}`;
    if (ctaTotal) ctaTotal.textContent = `$${currentTotal.toFixed(2)}`;
    if (summarySavings) {
      if (currentSavings > 0) {
        summarySavings.textContent = `-$${currentSavings.toFixed(2)}`;
        summarySavings.parentElement.style.display = 'flex';
      } else {
        summarySavings.parentElement.style.display = 'none';
      }
    }
  }

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const qty = parseInt(btn.getAttribute('data-qty') || '2', 10);
      if (qty === 1) {
        currentQty = 1; currentUnitPrice = 79.90; currentTotal = 79.90; currentSavings = 0;
      } else if (qty === 3) {
        currentQty = 3; currentUnitPrice = 59.90; currentTotal = 179.70; currentSavings = 60.00;
      } else {
        currentQty = 2; currentUnitPrice = 69.90; currentTotal = 139.80; currentSavings = 20.00;
      }

      bundleCards.forEach(card => {
        const cardQty = parseInt(card.getAttribute('data-bundle-quantity'), 10);
        if (cardQty === currentQty) {
          card.classList.add('active-bundle');
        } else {
          card.classList.remove('active-bundle');
        }
      });

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

      updateSummary();
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
      if (qty === 1) {
        currentQty = 1; currentUnitPrice = 79.90; currentTotal = 79.90; currentSavings = 0;
      } else if (qty === 3) {
        currentQty = 3; currentUnitPrice = 59.90; currentTotal = 179.70; currentSavings = 60.00;
      } else {
        currentQty = 2; currentUnitPrice = 69.90; currentTotal = 139.80; currentSavings = 20.00;
      }

      bundleCards.forEach(c => c.classList.remove('active-bundle'));
      card.classList.add('active-bundle');
      updateSummary();
    });
  });

  if (modelSelect) {
    modelSelect.addEventListener('change', () => {
      if (summaryModel) summaryModel.textContent = modelSelect.value;
    });
  }

  colorSelectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      colorSelectBtns.forEach(b => b.classList.remove('active-color'));
      btn.classList.add('active-color');
      const name = btn.getAttribute('data-name');
      if (summaryColor && name) summaryColor.textContent = name;
    });
  });

  if (proceedBtn) {
    proceedBtn.addEventListener('click', () => {
      // Direct checkout integration: on real Shopify store, route to /checkout
      if (window.Shopify && window.Shopify.routes) {
        window.location.href = (window.Shopify.routes.root || '/') + 'checkout';
        return;
      }
      const checkoutArea = document.getElementById('drawer-checkout-confirmation');
      const configArea = document.getElementById('drawer-config-area');
      if (checkoutArea && configArea) {
        configArea.style.display = 'none';
        checkoutArea.style.display = 'block';
      }
    });
  }
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
