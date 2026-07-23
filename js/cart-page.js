'use strict';

/* MEHEK shopping bag page */
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
  const cartItemsElement = document.querySelector('#cart-items');
  const cartSummaryElement = document.querySelector('#cart-summary');
  const cartCountElement = document.querySelector('#cart-count');
  const headingCountElement = document.querySelector('#cart-heading-count');
  const subtotalElement = document.querySelector('#cart-subtotal');
  const shippingElement = document.querySelector('#cart-shipping');
  const shippingMessageElement = document.querySelector('#shipping-message');
  const totalElement = document.querySelector('#cart-total');
  const checkoutLink = document.querySelector('#checkout-link');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Cart loaded once when the page opens
  let cart = loadCart();

  // ---------------------------------------------------------------------
  // Load / save cart
  // ---------------------------------------------------------------------

  // Reads the cart from localStorage. Returns an empty array if anything
  // is missing, broken, or has a zero/negative quantity.
  function loadCart() {
    try {
      const savedCart = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(savedCart)
        ? savedCart.filter(item => item && Number(item.quantity) > 0)
        : [];
    } catch (error) {
      return [];
    }
  }

  // Writes the current cart back to localStorage
  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
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

  // Builds a unique key for a cart item, used to find/update/remove it later
  function itemKey(item, index) {
    return item.cartKey || `${item.id || 'item'}-${item.size || 'default'}-${index}`;
  }

  // ---------------------------------------------------------------------
  // Cart calculations
  // ---------------------------------------------------------------------

  // Adds up every quantity, used for the cart badge and heading
  function totalQuantity() {
    return cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
  }

  // Adds up price × quantity for every item
  function subtotal() {
    return cart.reduce((total, item) => {
      return total + (Number(item.price) || 0) * (Number(item.quantity) || 0);
    }, 0);
  }

  // ---------------------------------------------------------------------
  // Cart actions
  // ---------------------------------------------------------------------

  // Changes an item's quantity by +1/-1 (never below 1), then saves and re-renders
  function updateItem(key, change) {
    const item = cart.find((entry, index) => itemKey(entry, index) === key);
    if (!item) return;

    item.quantity = Math.max(1, (Number(item.quantity) || 1) + change);
    saveCart();
    renderCart();
  }

  // Removes an item from the cart, then saves and re-renders
  function removeItem(key) {
    cart = cart.filter((entry, index) => itemKey(entry, index) !== key);
    saveCart();
    renderCart();
  }

  // ---------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------

  // Shows the "your bag is empty" message and hides the summary
  function renderEmptyCart() {
    cartItemsElement.innerHTML = `
      <div class="empty-cart">
        <p class="eyebrow">Your Bag Is Empty</p>
        <h2>Discover your next signature scent.</h2>
        <p>Explore MEHEK fragrances, hair mists and home scents.</p>
        <a class="btn-primary" href="products.html">Continue Shopping</a>
      </div>`;

    cartSummaryElement.hidden = true;
  }

  // Draws each cart item as a row, with image, details, quantity controls, and price
  function renderItems() {
    cartItemsElement.innerHTML = cart.map((item, index) => {
      const key = itemKey(item, index);
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const unitPrice = Number(item.price) || 0;
      const productUrl = item.id ? `product.html?id=${encodeURIComponent(item.id)}` : 'products.html';

      return `
        <article class="cart-item" data-cart-key="${escapeHtml(key)}">
          <a class="cart-item-image" href="${productUrl}" aria-label="View ${escapeHtml(item.name)}">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy">
          </a>

          <div class="cart-item-details">
            <p class="cart-item-collection">${escapeHtml(item.collection || '')}</p>
            <h2><a href="${productUrl}">${escapeHtml(item.name || 'MEHEK Product')}</a></h2>
            <p class="cart-item-meta">${[item.type, item.size].filter(Boolean).map(escapeHtml).join(' · ')}</p>

            <div class="cart-item-actions">
              <div class="quantity-control" aria-label="Quantity for ${escapeHtml(item.name)}">
                <button type="button" data-action="decrease" aria-label="Decrease quantity">−</button>
                <span aria-live="polite">${quantity}</span>
                <button type="button" data-action="increase" aria-label="Increase quantity">+</button>
              </div>
              <button class="cart-remove-button" type="button" data-action="remove">Remove</button>
            </div>
          </div>

          <p class="cart-item-price">${formatMoney(unitPrice * quantity)}</p>
        </article>`;
    }).join('');

    cartSummaryElement.hidden = false;
  }

  // Draws the item count, subtotal, shipping, total, and shipping message
  function renderSummary() {
    const quantity = totalQuantity();
    const currentSubtotal = subtotal();
    const shippingCost = currentSubtotal === 0 || currentSubtotal > FREE_SHIPPING_LIMIT
      ? 0
      : STANDARD_SHIPPING;
    const total = currentSubtotal + shippingCost;

    cartCountElement.textContent = quantity;
    headingCountElement.textContent = `(${quantity})`;
    subtotalElement.textContent = formatMoney(currentSubtotal);
    shippingElement.textContent = shippingCost === 0 ? 'Free' : formatMoney(shippingCost);
    totalElement.textContent = formatMoney(total);

    if (currentSubtotal > 0 && currentSubtotal < FREE_SHIPPING_LIMIT) {
      shippingMessageElement.textContent = `${formatMoney(FREE_SHIPPING_LIMIT - currentSubtotal + 0.01)} away from complimentary UK shipping.`;
    } else if (currentSubtotal > FREE_SHIPPING_LIMIT) {
      shippingMessageElement.textContent = 'Complimentary UK shipping applied.';
    } else {
      shippingMessageElement.textContent = '';
    }

    // Disable the checkout link when the cart is empty
    checkoutLink.setAttribute('aria-disabled', cart.length === 0 ? 'true' : 'false');
  }

  // Top-level render: item list (or empty state) plus the summary
  function renderCart() {
    if (cart.length === 0) {
      renderEmptyCart();
    } else {
      renderItems();
    }
    renderSummary();
  }

  // ---------------------------------------------------------------------
  // Event listeners
  // ---------------------------------------------------------------------

  // One listener for all quantity/remove buttons, using the clicked item's cart key
  cartItemsElement.addEventListener('click', event => {
    const button = event.target.closest('button[data-action]');
    const itemElement = event.target.closest('[data-cart-key]');
    if (!button || !itemElement) return;

    const key = itemElement.dataset.cartKey;
    const action = button.dataset.action;

    if (action === 'increase') updateItem(key, 1);
    if (action === 'decrease') updateItem(key, -1);
    if (action === 'remove') removeItem(key);
  });

  // Blocks navigation to checkout if the cart is empty
  checkoutLink.addEventListener('click', event => {
    if (cart.length === 0) event.preventDefault();
  });

  // Mobile menu toggle
  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks?.classList.toggle('is-open', !isOpen);
  });

  // First render when the page loads
  renderCart();
});
