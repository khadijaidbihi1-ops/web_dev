'use strict';

// Renders a single product page based on the "id" query parameter,
// lets the user pick a variant, and adds the product to the cart.
document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------------------
  // Find the product
  // ---------------------------------------------------------------------
  const products = Array.isArray(window.products) ? window.products : [];
  const productId = new URLSearchParams(location.search).get('id');
  const product = products.find(item => String(item.id) === String(productId) || item.slug === productId);

  // Show a "not found" message if there's no matching product
  if (!product) {
    document.querySelector('.product-page-main').innerHTML = `
      <section class="product-not-found">
        <h1>Product not found</h1>
        <a class="btn-primary" href="products.html">Return to Shop</a>
      </section>`;
    return;
  }

  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------

  // Turns a slug like "reed-diffuser" into "Reed Diffuser"
  function toTitleCase(value) {
    return String(value || '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  const images = (product.images || []).filter(Boolean);
  const variants = product.variants?.length ? product.variants : [{ label: '', price: product.price }];
  let selectedVariantIndex = 0;

  // Returns to the exact filtered Shop page used before opening the product.
  const storedShopUrl = sessionStorage.getItem('mehek:lastShopUrl');
  const continueShoppingUrl = storedShopUrl?.includes('products.html')
    ? storedShopUrl
    : 'products.html';

  const addToCartButton = document.querySelector('#add-to-cart');
  const addedActions = document.createElement('div');

  addedActions.className = 'product-added-actions';
  addedActions.hidden = true;
  addedActions.setAttribute('aria-live', 'polite');
  addedActions.innerHTML = `
    <p class="product-added-message">
      <strong>${product.name}</strong> has been added to your bag.
    </p>
    <a class="product-continue-shopping" href="${continueShoppingUrl}">
      Continue Shopping
    </a>
    <a class="product-view-bag" href="cart.html">
      View Bag
    </a>
  `;

  addToCartButton.insertAdjacentElement('afterend', addedActions);

  // ---------------------------------------------------------------------
  // Page text and images
  // ---------------------------------------------------------------------

  document.title = `${product.name} | MEHEK`;
  document.querySelector('#product-collection').textContent = `${toTitleCase(product.collection)} Collection`;
  document.querySelector('#product-name').textContent = product.name;
  document.querySelector('#product-meta').textContent = [product.type, product.gender ? toTitleCase(product.gender) : '']
    .filter(Boolean)
    .join(' · ');
  document.querySelector('#product-description').textContent = product.description || '';
  document.querySelector('#top-notes').textContent = product.notes?.top || '—';
  document.querySelector('#heart-notes').textContent = product.notes?.heart || '—';
  document.querySelector('#base-notes').textContent = product.notes?.base || '—';

  // Home-fragrance products get a "Best For" label instead of "When to Wear"
  const isHomeFragrance = ['scented-candle', 'reed-diffuser', 'room-spray'].includes(product.category);
  document.querySelector('#wear-guide-title').textContent = isHomeFragrance ? 'Best For' : 'When to Wear';
  document.querySelector('#wear-guide-text').textContent = product.occasion || 'Designed for modern everyday rituals.';

  // Main product image
  const mainImage = document.querySelector('#main-product-image');
  mainImage.src = images[0] || '';
  mainImage.alt = `${product.name} by MEHEK`;

  // Optional second image
  if (images[1]) {
    const secondaryPanel = document.querySelector('#secondary-image-panel');
    const secondaryImage = document.querySelector('#secondary-product-image');
    secondaryImage.src = images[1];
    secondaryImage.alt = `${product.name} fragrance details`;
    secondaryPanel.hidden = false;
  }

  // ---------------------------------------------------------------------
  // Variant selection
  // ---------------------------------------------------------------------

  const priceElement = document.querySelector('#product-price');
  const variantWrap = document.querySelector('#variant-wrap');
  const variantButtons = document.querySelector('#variant-buttons');

  // Updates the displayed price and highlights the selected variant button
  function updateVariantDisplay() {
    priceElement.textContent = `£${Number(variants[selectedVariantIndex].price).toFixed(2)}`;

    variantButtons?.querySelectorAll('button').forEach((button, index) => {
      const isSelected = index === selectedVariantIndex;
      button.classList.toggle('selected', isSelected);
      button.setAttribute('aria-pressed', isSelected);
    });
  }

  variantWrap.hidden = false;
  variantButtons.innerHTML = variants.map((variant, index) => `
    <button type="button" class="variant-button" data-index="${index}" aria-pressed="${index === 0}">
      ${variant.label || 'Standard'}
    </button>`
  ).join('');

  variantButtons.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;

    selectedVariantIndex = Number(button.dataset.index);
    updateVariantDisplay();
  });

  updateVariantDisplay();

  // ---------------------------------------------------------------------
  // Add to cart
  // ---------------------------------------------------------------------

  addToCartButton.addEventListener('click', event => {
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    } catch (error) {
      cart = [];
    }

    const variant = variants[selectedVariantIndex];
    const cartKey = `${product.id}-${variant.label || 'default'}`;
    const existingItem = cart.find(item => item.cartKey === cartKey);

    if (existingItem) {
      existingItem.quantity = (Number(existingItem.quantity) || 0) + 1;
    } else {
      cart.push({
        cartKey,
        id: product.id,
        name: product.name,
        collection: `${toTitleCase(product.collection)} Collection`,
        type: product.type,
        size: variant.label,
        price: Number(variant.price),
        image: images[0] || '',
        quantity: 1
      });
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent('cart:updated'));

    // Offer clear next steps without forcing the visitor away from the product
    addedActions.hidden = false;

    // Briefly show "Added to Bag" feedback on the button
    const button = event.currentTarget;
    const originalText = button.textContent;
    button.textContent = 'Added to Bag';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1200);
  });
});
