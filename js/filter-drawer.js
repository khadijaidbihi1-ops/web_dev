'use strict';

/* Independent mobile filter drawer controller.
   Kept separate from catalogue rendering so the drawer still works even if
   another shop script encounters an error. */
(() => {
  function initFilterDrawer() {
    const toggle = document.getElementById('filter-toggle');
    const panel = document.getElementById('product-filter-panel');
    const close = document.getElementById('filter-close');
    const overlay = document.getElementById('filter-overlay');
    const apply = document.getElementById('apply-filters');

    if (!toggle || !panel || !overlay) return;

    let returnFocus = toggle;

    const focusableSelector = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'a[href]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    function isMobileDrawer() {
      return window.matchMedia('(max-width: 1023px)').matches;
    }

    function openDrawer() {
      if (!isMobileDrawer()) return;
      returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : toggle;
      overlay.hidden = false;
      panel.setAttribute('aria-hidden', 'false');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('filters-open');
      requestAnimationFrame(() => {
        panel.classList.add('is-open');
        overlay.classList.add('is-visible');
        (close || panel.querySelector(focusableSelector))?.focus();
      });
    }

    function closeDrawer(restoreFocus = true) {
      panel.classList.remove('is-open');
      overlay.classList.remove('is-visible');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('filters-open');
      panel.setAttribute('aria-hidden', isMobileDrawer() ? 'true' : 'false');
      window.setTimeout(() => {
        if (!panel.classList.contains('is-open')) overlay.hidden = true;
      }, 240);
      if (restoreFocus) returnFocus?.focus();
    }

    toggle.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      openDrawer();
    });
    close?.addEventListener('click', event => {
      event.preventDefault();
      closeDrawer();
    });
    overlay.addEventListener('click', () => closeDrawer());
    apply?.addEventListener('click', () => {
      if (isMobileDrawer()) window.setTimeout(() => closeDrawer(false), 0);
    });

    document.addEventListener('keydown', event => {
      if (!panel.classList.contains('is-open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...panel.querySelectorAll(focusableSelector)]
        .filter(element => element.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (!isMobileDrawer()) {
        panel.classList.remove('is-open');
        overlay.classList.remove('is-visible');
        overlay.hidden = true;
        panel.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('filters-open');
      } else if (!panel.classList.contains('is-open')) {
        panel.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFilterDrawer, { once: true });
  } else {
    initFilterDrawer();
  }
})();
