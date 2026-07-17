'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'shoppingCart';
  const FREE_SHIPPING_LIMIT = 100;
  const STANDARD_SHIPPING = 4.95;

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
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  let cart = loadCart();

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

  function subtotal() {
    return cart.reduce((sum, item) => {
      return sum + (Number(item.price) || 0) * (Number(item.quantity) || 0);
    }, 0);
  }

  function totalQuantity() {
    return cart.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  }

  function renderItems() {
    itemsElement.innerHTML = cart.map(item => {
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const price = (Number(item.price) || 0) * quantity;

      return `
        <article class="checkout-summary-item">
          <div class="checkout-summary-image">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">
            <span>${quantity}</span>
          </div>
          <div>
            <h3>${escapeHtml(item.name || 'MEHEK Product')}</h3>
            <p>${[item.collection, item.size].filter(Boolean).map(escapeHtml).join(' · ')}</p>
          </div>
          <strong>${formatMoney(price)}</strong>
        </article>`;
    }).join('');
  }

  function renderTotals() {
    const currentSubtotal = subtotal();
    const shipping = currentSubtotal > FREE_SHIPPING_LIMIT ? 0 : STANDARD_SHIPPING;
    const total = currentSubtotal + shipping;

    subtotalElement.textContent = formatMoney(currentSubtotal);
    shippingElement.textContent = shipping === 0 ? 'Free' : formatMoney(shipping);
    totalElement.textContent = formatMoney(total);
    cartCount.textContent = totalQuantity();

    if (currentSubtotal > FREE_SHIPPING_LIMIT) {
      shippingMessage.textContent = 'Complimentary UK shipping applied.';
    } else {
      shippingMessage.textContent = `${formatMoney(FREE_SHIPPING_LIMIT - currentSubtotal + 0.01)} more for complimentary UK shipping.`;
    }
  }

  function renderCheckout() {
    const isEmpty = cart.length === 0;
    content.hidden = isEmpty;
    emptyState.hidden = !isEmpty;

    if (!isEmpty) {
      renderItems();
      renderTotals();
    } else {
      cartCount.textContent = '0';
    }
  }

  document.querySelector('#card-number')?.addEventListener('input', event => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 16);
    event.target.value = digits.replace(/(.{4})/g, '$1 ').trim();
  });

  document.querySelector('#expiry')?.addEventListener('input', event => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 4);
    event.target.value = digits.length > 2
      ? `${digits.slice(0, 2)}/${digits.slice(2)}`
      : digits;
  });

  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const reference = `MHK-${Date.now().toString().slice(-8)}`;
    localStorage.removeItem(STORAGE_KEY);
    cart = [];
    content.hidden = true;
    successState.hidden = false;
    orderReference.textContent = reference;
    cartCount.textContent = '0';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    navLinks?.classList.toggle('is-open', !isOpen);
  });

  renderCheckout();
});