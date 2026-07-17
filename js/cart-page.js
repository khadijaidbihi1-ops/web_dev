'use strict';

/* MEHEK shopping bag page */
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'shoppingCart';
  const FREE_SHIPPING_LIMIT = 100;
  const STANDARD_SHIPPING = 5;

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

  let cart = loadCart();

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

  function saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }

  function formatMoney(value) {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(Number(value) || 0);
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function itemKey(item, index) {
    return item.cartKey || `${item.id || 'item'}-${item.size || 'default'}-${index}`;
  }

  function totalQuantity() {
    return cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
  }

  function subtotal() {
    return cart.reduce((total, item) => {
      return total + (Number(item.price) || 0) * (Number(item.quantity) || 0);
    }, 0);
  }

  function updateItem(key, change) {
    const item = cart.find((entry, index) => itemKey(entry, index) === key);
    if (!item) return;

    item.quantity = Math.max(1, (Number(item.quantity) || 1) + change);
    saveCart();
    renderCart();
  }

  function removeItem(key) {
    cart = cart.filter((entry, index) => itemKey(entry, index) !== key);
    saveCart();
    renderCart();
  }

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

  function renderSummary() {
    const quantity = totalQuantity();
    const currentSubtotal = subtotal();
    const shippingCost = currentSubtotal === 0 || currentSubtotal >= FREE_SHIPPING_LIMIT
      ? 0
      : STANDARD_SHIPPING;
    const total = currentSubtotal + shippingCost;

    cartCountElement.textContent = quantity;
    headingCountElement.textContent = `(${quantity})`;
    subtotalElement.textContent = formatMoney(currentSubtotal);
    shippingElement.textContent = shippingCost === 0 ? 'Free' : formatMoney(shippingCost);
    totalElement.textContent = formatMoney(total);

    if (currentSubtotal > 0 && currentSubtotal < FREE_SHIPPING_LIMIT) {
      shippingMessageElement.textContent = `${formatMoney(FREE_SHIPPING_LIMIT - currentSubtotal)} away from complimentary UK shipping.`;
    } else if (currentSubtotal >= FREE_SHIPPING_LIMIT) {
      shippingMessageElement.textContent = 'Complimentary UK shipping applied.';
    } else {
      shippingMessageElement.textContent = '';
    }

    checkoutLink.setAttribute('aria-disabled', cart.length === 0 ? 'true' : 'false');
  }

  function renderCart() {
    if (cart.length === 0) {
      renderEmptyCart();
    } else {
      renderItems();
    }
    renderSummary();
  }

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

  checkoutLink.addEventListener('click', event => {
    if (cart.length === 0) event.preventDefault();
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks?.classList.toggle('is-open', !isOpen);
  });

  renderCart();
});