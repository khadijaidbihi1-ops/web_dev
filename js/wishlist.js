'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('#wishlist-grid');
  const empty = document.querySelector('#wishlist-empty');
  const products = Array.isArray(window.products) ? window.products : [];

  function titleCase(value) { return String(value || '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()); }
  function readCart() { try { const c = JSON.parse(localStorage.getItem('shoppingCart')); return Array.isArray(c) ? c : []; } catch { return []; } }

  function render() {
    const ids = window.MehekWishlist ? window.MehekWishlist.read() : [];
    const saved = ids.map(id => products.find(p => Number(p.id) === Number(id))).filter(Boolean);
    grid.innerHTML = '';
    empty.hidden = saved.length > 0;
    grid.hidden = saved.length === 0;
    saved.forEach(product => {
      const variant = product.variants?.[0] || { label: '', price: product.price };
      const card = document.createElement('article');
      card.className = 'product-card wishlist-product-card';
      card.innerHTML = `<div class="product-media"><a class="product-image-link" href="product.html?id=${product.id}"><img class="product-image" src="${product.images?.[0] || ''}" alt="${product.name}" loading="lazy"></a><button class="wishlist-button is-active" type="button" data-id="${product.id}" aria-label="Remove from wishlist" aria-pressed="true"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"></path></svg></button></div><div class="product-content"><p class="product-collection">${titleCase(product.collection)} Collection</p><h2><a class="product-name-link" href="product.html?id=${product.id}">${product.name}</a></h2><p class="product-meta">${product.type} · ${variant.label}</p><p class="product-price">£${Number(variant.price).toFixed(2)}</p><button class="add-cart-button" data-wishlist-add-cart type="button" data-id="${product.id}">Add to Bag</button></div>`;
      card.querySelector('.add-cart-button').addEventListener('click', event => {
        const cart = readCart();
        const cartKey = `${product.id}-${variant.label || 'default'}`;
        const existing = cart.find(item => item.cartKey === cartKey);
        if (existing) existing.quantity = (Number(existing.quantity) || 0) + 1;
        else cart.push({ cartKey, id: product.id, name: product.name, collection: `${titleCase(product.collection)} Collection`, type: product.type, size: variant.label, price: Number(variant.price), image: product.images?.[0] || '', quantity: 1 });
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        window.MehekWishlist.write(window.MehekWishlist.read().filter(id => id !== Number(product.id)));
        document.dispatchEvent(new CustomEvent('cart:updated'));
      });
      grid.append(card);
    });
  }
  document.addEventListener('wishlist:updated', render);
  render();
});
