/**
 * KOSNORA Reviews Carousel — Native Shopify Online Store 2.0 JavaScript
 * Calculates dynamic track width for seamless infinite linear loop (35-45 px/s)
 * Completely eliminates manual drag, arrows, and swipe, retaining vertical scroll safety.
 */

(function () {
  'use strict';

  function initReviewsSection(section) {
    if (!section) return;

    var track = section.querySelector('.kosnora-reviews__track');
    var group1 = section.querySelector('.kosnora-reviews__group:first-child');
    if (!track || !group1) return;

    // Read configured speed (default 40 pixels per second)
    var speedPxPerSec = parseFloat(section.getAttribute('data-speed')) || 40;
    if (speedPxPerSec <= 0) speedPxPerSec = 40;

    function updateDuration() {
      var groupWidth = group1.offsetWidth;
      if (groupWidth > 0) {
        var duration = groupWidth / speedPxPerSec;
        track.style.setProperty('--kosnora-reviews-duration', duration.toFixed(2) + 's');
      }
    }

    // Initial calculation after images/layout settle
    updateDuration();
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(updateDuration);
    }

    // Debounced resize handler
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateDuration, 150);
    });

    // Touch accessibility: pause marquee on active touch without blocking page scrolling
    section.addEventListener(
      'touchstart',
      function () {
        section.classList.add('is-paused');
      },
      { passive: true }
    );

    section.addEventListener(
      'touchend',
      function () {
        section.classList.remove('is-paused');
      },
      { passive: true }
    );

    section.addEventListener(
      'touchcancel',
      function () {
        section.classList.remove('is-paused');
      },
      { passive: true }
    );

    // Prevent image ghost dragging
    var images = section.querySelectorAll('img');
    for (var i = 0; i < images.length; i++) {
      images[i].setAttribute('draggable', 'false');
    }
  }

  function initAll() {
    var sections = document.querySelectorAll('.kosnora-reviews');
    for (var i = 0; i < sections.length; i++) {
      initReviewsSection(sections[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Shopify Theme Editor Integration
  document.addEventListener('shopify:section:load', function (event) {
    if (event && event.target) {
      var section = event.target.querySelector('.kosnora-reviews') || event.target;
      if (section && section.classList && section.classList.contains('kosnora-reviews')) {
        initReviewsSection(section);
      }
    }
  });

  document.addEventListener('shopify:section:select', function (event) {
    if (event && event.target) {
      var section = event.target.querySelector('.kosnora-reviews') || event.target;
      if (section && section.classList && section.classList.contains('kosnora-reviews')) {
        initReviewsSection(section);
      }
    }
  });
})();
