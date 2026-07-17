'use strict';

/* Dynamic MEHEK product page */
document.addEventListener('DOMContentLoaded', () => {
  const productList = Array.isArray(window.products) ? window.products : [];
  const params = new URLSearchParams(window.location.search);
  const requestedId = params.get('id');

  const product = productList.find(item =>
    String(item.id) === String(requestedId) || item.slug === requestedId
  );

  if (!product) {
    const main = document.querySelector('.product-page-main');
    if (main) {
      main.innerHTML = `
        <section class="product-not-found">
          <p class="product-eyebrow">MEHEK</p>
          <h1>Product not found</h1>
          <p>The requested product is unavailable.</p>
          <a class="btn-primary" href="products.html">Return to Shop</a>
        </section>`;
    }
    return;
  }

  const formatText = value => String(value || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, letter => letter.toUpperCase());

  const collection = `${formatText(product.collection)} Collection`;
  const images = Array.isArray(product.images) ? product.images.filter(Boolean) : [];
  const variants = Array.isArray(product.variants) && product.variants.length
    ? product.variants
    : [{ label: '', price: Number(product.price) || 0 }];

  const mainImage = document.querySelector('#main-product-image');
  const secondaryPanel = document.querySelector('#secondary-image-panel');
  const secondaryImage = document.querySelector('#secondary-product-image');
  const variantWrap = document.querySelector('#variant-wrap');
  const variantSelect = document.querySelector('#variant-select');
  const priceElement = document.querySelector('#product-price');
  const addButton = document.querySelector('#add-to-cart');

  document.title = `${product.name} | MEHEK`;
  document.querySelector('#product-collection').textContent = collection;
  document.querySelector('#product-name').textContent = product.name;
  document.querySelector('#product-meta').textContent = [product.type, product.gender ? formatText(product.gender) : '']
    .filter(Boolean)
    .join(' · ');
  document.querySelector('#product-description').textContent = product.description || '';
  document.querySelector('#top-notes').textContent = product.notes?.top || '—';
  document.querySelector('#heart-notes').textContent = product.notes?.heart || '—';
  document.querySelector('#base-notes').textContent = product.notes?.base || '—';

  if (mainImage) {
    mainImage.src = images[0] || '';
    mainImage.alt = `${product.name} by MEHEK`;
  }

  if (images[1] && secondaryPanel && secondaryImage) {
    secondaryImage.src = images[1];
    secondaryImage.alt = `${product.name} fragrance details`;
    secondaryPanel.hidden = false;
  }

  const updatePrice = () => {
    const selectedVariant = variants[Number(variantSelect?.value) || 0] || variants[0];
    priceElement.textContent = `£${Number(selectedVariant.price).toFixed(2)}`;
  };

  if (variants.length > 1 && variantWrap && variantSelect) {
    variantSelect.innerHTML = variants.map((variant, index) =>
      `<option value="${index}">${variant.label} — £${Number(variant.price).toFixed(2)}</option>`
    ).join('');
    variantWrap.hidden = false;
    variantSelect.addEventListener('change', updatePrice);
  }

  updatePrice();

  addButton?.addEventListener('click', () => {
    const selectedVariant = variants[Number(variantSelect?.value) || 0] || variants[0];
    let cart = [];

    try {
      const saved = JSON.parse(localStorage.getItem('shoppingCart'));
      cart = Array.isArray(saved) ? saved : [];
    } catch (error) {
      cart = [];
    }

    const cartKey = `${product.id}-${selectedVariant.label || 'default'}`;
    const existingItem = cart.find(item => item.cartKey === cartKey);

    if (existingItem) {
      existingItem.quantity = (Number(existingItem.quantity) || 0) + 1;
    } else {
      cart.push({
        cartKey,
        id: product.id,
        name: product.name,
        collection,
        type: product.type,
        size: selectedVariant.label,
        price: Number(selectedVariant.price),
        image: images[0] || '',
        quantity: 1
      });
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));

    const cartCount = document.querySelector('#cart-count');
    if (cartCount) {
      cartCount.textContent = cart.reduce((total, item) => total + (Number(item.quantity) || 0), 0);
    }

    const originalText = addButton.textContent;
    addButton.textContent = 'Added to Bag';
    addButton.disabled = true;
    window.setTimeout(() => {
      addButton.textContent = originalText;
      addButton.disabled = false;
    }, 1200);
  });
});