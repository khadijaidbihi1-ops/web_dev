'use strict';

// Handles the checkout page: shows the cart summary, calculates totals,
// formats the payment fields, submits the order, and toggles the mobile menu.
document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------
  const STORAGE_KEY = 'shoppingCart';
  const FREE_SHIPPING_LIMIT = 100; // subtotal needed for free shipping
  const STANDARD_SHIPPING = 4.95;  // flat fee below that limit

  // ---------------------------------------------------------------------
  // DOM elements
  // ---------------------------------------------------------------------
  const content = document.querySelector('#checkout-content');
  const emptyState = document.querySelector('#checkout-empty');
  const form = document.querySelector('#checkout-form');

  const itemsElement = document.querySelector('#checkout-items');
  const subtotalElement = document.querySelector('#checkout-subtotal');
  const shippingElement = document.querySelector('#checkout-shipping');
  const shippingMessage = document.querySelector('#checkout-shipping-message');
  const totalElement = document.querySelector('#checkout-total');
  const cartCount = document.querySelector('#cart-count');

  const successState = document.querySelector('#order-success');
  const orderReference = document.querySelector('#order-reference');

  const cardNumberInput = document.querySelector('#card-number');
  const expiryInput = document.querySelector('#expiry');

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Cart loaded once when the page opens
  let cart = loadCart();

  // ---------------------------------------------------------------------
  // Load cart
  // ---------------------------------------------------------------------

  // Reads the cart from localStorage. Returns an empty array if anything
  // is missing, broken, or has a zero/negative quantity.
  function loadCart() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(value)
        ? value.filter(item => item && Number(item.quantity) > 0)
        : [];
    } catch (error) {
      return [];
    }
  }

  // ---------------------------------------------------------------------
  // Formatting helpers
  // ---------------------------------------------------------------------

  // Turns a number into a price string, e.g. 12.5 -> "£12.50"
  function formatMoney(value) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(Number(value) || 0);
  }

  // Makes text safe to insert into HTML
  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  // ---------------------------------------------------------------------
  // Cart calculations
  // ---------------------------------------------------------------------

  // Works out the line total for one item (price × quantity)
  function lineTotal(item) {
    return (Number(item.price) || 0) * (Number(item.quantity) || 0);
  }

  // Adds up every line total to get the cart subtotal
  function subtotal() {
    return cart.reduce((sum, item) => sum + lineTotal(item), 0);
  }

  // Adds up every quantity, used for the cart badge
  function totalQuantity() {
    return cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  }

  // Keeps the little cart badge in sync with the cart
  function updateCartBadge() {
    cartCount.textContent = totalQuantity();
  }

  // ---------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------

  // Draws each cart item as a row in the order summary
  function renderItems() {
    itemsElement.innerHTML = cart.map(item => `
      <article class="checkout-summary-item">
        <div class="checkout-summary-image">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
          <span>${item.quantity}</span>
        </div>
        <div>
          <h3>${escapeHtml(item.name || 'MEHEK Product')}</h3>
          <p>${[item.collection, item.size].filter(Boolean).map(escapeHtml).join(' · ')}</p>
        </div>
        <strong>${formatMoney(lineTotal(item))}</strong>
      </article>`
    ).join('');
  }

  // Draws the subtotal, shipping, and total, and the "free shipping" message
  function renderTotals() {
    const currentSubtotal = subtotal();
    const qualifiesForFreeShipping = currentSubtotal > FREE_SHIPPING_LIMIT;
    const shipping = qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING;
    const total = currentSubtotal + shipping;

    subtotalElement.textContent = formatMoney(currentSubtotal);
    shippingElement.textContent = qualifiesForFreeShipping ? 'Free' : formatMoney(shipping);
    totalElement.textContent = formatMoney(total);
    updateCartBadge();

    if (qualifiesForFreeShipping) {
      shippingMessage.textContent = 'Complimentary UK shipping applied.';
    } else {
      const remaining = FREE_SHIPPING_LIMIT - currentSubtotal;
      shippingMessage.textContent = `${formatMoney(remaining)} more for complimentary UK shipping.`;
    }
  }

  // Shows either the "cart is empty" view or the full checkout summary
  function renderCheckout() {
    const isEmpty = cart.length === 0;
    content.hidden = isEmpty;
    emptyState.hidden = !isEmpty;

    if (!isEmpty) {
      renderItems();
      renderTotals();
    } else {
      updateCartBadge();
    }
  }

  // ---------------------------------------------------------------------
  // Payment field formatting (just cosmetic, doesn't check if the card is real)
  // ---------------------------------------------------------------------

  // Keeps only digits, limits to 16, and groups them as "1234 5678 ..."
  cardNumberInput?.addEventListener('input', event => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 16);
    event.target.value = digits.replace(/(.{4})/g, '$1 ').trim();
  });

  // Keeps only digits, limits to 4, and adds "/" after the month (MM/YY)
  expiryInput?.addEventListener('input', event => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
    event.target.value = digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  });

  // ---------------------------------------------------------------------
  // Form submission
  // ---------------------------------------------------------------------

  form?.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Simple order reference based on the current time
    const reference = `MHK-${Date.now().toString().slice(-8)}`;

    // Empty the cart and show the success screen
    localStorage.removeItem(STORAGE_KEY);
    cart = [];
    content.hidden = true;
    successState.hidden = false;
    orderReference.textContent = reference;
    updateCartBadge();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------------------------------------------------------------------
  // Mobile menu toggle
  // ---------------------------------------------------------------------

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks?.classList.toggle('is-open', !isOpen);
  });

  // First render when the page loads
  renderCheckout();
});
