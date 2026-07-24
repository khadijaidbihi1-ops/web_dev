'use strict';

// Renders the product grid with search, filters, and sorting,
// and lets the user add products to the cart from the grid.
document.addEventListener('DOMContentLoaded', () => {

  // ---------------------------------------------------------------------
  // Constants
  // ---------------------------------------------------------------------
  const HOME_FRAGRANCE_CATEGORIES = ['scented-candle', 'reed-diffuser', 'room-spray'];
  const VALID_TYPE_FILTERS = ['perfume', 'hair-mist', 'home-fragrance'];
  const VALID_HOME_TYPE_FILTERS = ['scented-candle', 'reed-diffuser', 'room-spray'];

  // ---------------------------------------------------------------------
  // DOM elements
  // ---------------------------------------------------------------------
  const products = Array.isArray(window.products) ? window.products : [];
  const grid = document.querySelector('#products-grid');
  if (!grid) return;

  const searchInput = document.querySelector('#product-search');
  const typeFilter = document.querySelector('#product-type-filter');
  const collectionFilter = document.querySelector('#collection-filter');
  const homeTypeFilter = document.querySelector('#home-type-filter');
  const homeTypeFilterGroup = document.querySelector('#home-type-filter-group');
  const genderFilter = document.querySelector('#gender-filter');
  const genderFilterGroup = document.querySelector('#gender-filter-group');
  const sortSelect = document.querySelector('#sort-products');
  const resultsCount = document.querySelector('#product-results-count');
  const emptyMessage = document.querySelector('#empty-results-message');
  const applyButton = document.querySelector('#apply-filters');
  const resetButton = document.querySelector('#reset-filters');
  const emptyResetButton = document.querySelector('#empty-results-reset');

  const searchParams = new URLSearchParams(location.search);

  // ---------------------------------------------------------------------
  // Formatting helpers
  // ---------------------------------------------------------------------

  // Turns a slug like "reed-diffuser" into "Reed Diffuser"
  function toTitleCase(value) {
    return String(value || '')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  // Turns a number into a price string, e.g. 12.5 -> "£12.50"
  function formatMoney(value) {
    return `£${Number(value).toFixed(2)}`;
  }

  // ---------------------------------------------------------------------
  // Cart helpers
  // ---------------------------------------------------------------------

  // Reads the cart from localStorage, or returns an empty array if it's missing/broken
  function getCart() {
    try {
      const savedCart = JSON.parse(localStorage.getItem('shoppingCart'));
      return Array.isArray(savedCart) ? savedCart : [];
    } catch (error) {
      return [];
    }
  }

  // Saves the cart and lets other parts of the page know it changed
  function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    document.dispatchEvent(new CustomEvent('cart:updated'));
  }

  // Shows a small temporary confirmation message at the bottom of the page
  function showToast(text) {
    let toast = document.querySelector('.shop-toast');

    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'shop-toast';
      toast.setAttribute('role', 'status');
      document.body.append(toast);
    }

    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  }

  // Adds a product (using its first variant) to the cart
  function addToBag(product) {
    const variant = product.variants?.[0] || { label: '', price: product.price };
    const cartKey = `${product.id}-${variant.label || 'default'}`;
    const cart = getCart();
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
        image: product.images?.[0] || '',
        quantity: 1
      });
    }

    saveCart(cart);
    showToast(`${product.name} added to bag`);
  }

  // ---------------------------------------------------------------------
  // Rendering
  // ---------------------------------------------------------------------

  // Builds one product card element
  function createProductCard(product) {
    const article = document.createElement('article');
    article.className = 'product-card';

    const url = `product.html?id=${encodeURIComponent(product.id)}`;
    const genderLabel = product.gender ? ` · ${toTitleCase(product.gender)}` : '';

    article.innerHTML = `
      <div class="product-media">
        <a class="product-image-link" href="${url}" aria-label="View ${product.name}">
          <img class="product-image" src="${product.images?.[0] || ''}" alt="${product.name} from the ${toTitleCase(product.collection)} Collection" loading="lazy">
        </a>
      </div>
      <div class="product-content">
        <p class="product-collection">${toTitleCase(product.collection)} Collection</p>
        <h3><a class="product-name-link" href="${url}">${product.name}</a></h3>
        <p class="product-meta">${product.type}${genderLabel}</p>
        <p class="product-price">${formatMoney(product.price)}</p>
        <button class="add-cart-button" type="button" data-id="${product.id}">Add to Bag</button>
      </div>`;

    return article;
  }

  // Shows the home product filter only when browsing Home Fragrance
  function syncHomeTypeFilter() {
    const isHomeFragrance = typeFilter.value === 'home-fragrance';
    homeTypeFilterGroup.hidden = !isHomeFragrance;
    homeTypeFilter.disabled = !isHomeFragrance;

    if (!isHomeFragrance) {
      homeTypeFilter.value = 'all';
    }
  }

  // Shows the gender filter only when browsing perfumes, and resets it otherwise
  function syncGenderFilter() {
    const isPerfume = typeFilter.value === 'perfume';
    genderFilterGroup.hidden = !isPerfume;

    if (!isPerfume) {
      genderFilter.value = 'all';
    }
  }

  // Checks whether a product matches the current type filter
  function matchesTypeFilter(product) {
    const selectedType = typeFilter.value;

    if (selectedType === 'all') return true;
    if (selectedType === 'home-fragrance') return HOME_FRAGRANCE_CATEGORIES.includes(product.category);
    return product.category === selectedType;
  }

  // Checks the selected subtype when Home Fragrance is active
  function matchesHomeTypeFilter(product) {
    if (typeFilter.value !== 'home-fragrance') return true;
    if (homeTypeFilter.value === 'all') return true;
    return product.category === homeTypeFilter.value;
  }

  // Checks whether a product matches the current search text
  function matchesSearch(product, query) {
    if (!query) return true;

    const searchableText = [
      product.name,
      product.collection,
      product.category,
      product.type,
      product.gender,
      product.description,
      product.notes?.top,
      product.notes?.heart,
      product.notes?.base
    ].join(' ').toLowerCase();

    return searchableText.includes(query);
  }

  // Sorts the product list based on the selected sort option
  function sortProducts(list) {
    const sortMode = sortSelect.value;

    return list.sort((a, b) => {
      if (sortMode === 'price-low-high') return a.price - b.price;
      if (sortMode === 'price-high-low') return b.price - a.price;
      if (sortMode === 'name-a-z') return a.name.localeCompare(b.name);
      if (sortMode === 'name-z-a') return b.name.localeCompare(a.name);
      return a.id - b.id; // "featured" / default order
    });
  }

  // Filters, sorts, and redraws the product grid based on the current filter values
  function render() {
    const query = searchInput.value.trim().toLowerCase();

    const filteredProducts = products.filter(product => {
      const collectionMatches = collectionFilter.value === 'all' || product.collection === collectionFilter.value;
      const genderMatches = genderFilter.value === 'all' || product.gender === genderFilter.value;

      return matchesTypeFilter(product) && matchesHomeTypeFilter(product)
        && collectionMatches && genderMatches && matchesSearch(product, query);
    });

    const sortedProducts = sortProducts(filteredProducts);

    grid.replaceChildren(...sortedProducts.map(createProductCard));
    resultsCount.textContent = `Showing ${sortedProducts.length} ${sortedProducts.length === 1 ? 'product' : 'products'}`;
    emptyMessage.hidden = sortedProducts.length > 0;
  }

  // Clears every filter back to its default value
  function resetFilters() {
    searchInput.value = '';
    typeFilter.value = 'all';
    collectionFilter.value = 'all';
    homeTypeFilter.value = 'all';
    genderFilter.value = 'all';
    sortSelect.value = 'featured';
    syncHomeTypeFilter();
    syncGenderFilter();
    render();
  }

  // ---------------------------------------------------------------------
  // Set initial filter values from the URL, then render
  // ---------------------------------------------------------------------

  const requestedType = searchParams.get('type') || searchParams.get('category') || 'all';
  const requestedHomeType = searchParams.get('home-type') || 'all';
  const legacyHomeType = VALID_HOME_TYPE_FILTERS.includes(requestedType) ? requestedType : 'all';

  typeFilter.value = legacyHomeType !== 'all'
    ? 'home-fragrance'
    : (VALID_TYPE_FILTERS.includes(requestedType) ? requestedType : 'all');

  homeTypeFilter.value = VALID_HOME_TYPE_FILTERS.includes(requestedHomeType)
    ? requestedHomeType
    : legacyHomeType;

  collectionFilter.value = searchParams.get('collection') || 'all';
  searchInput.value = searchParams.get('search') || '';

  syncHomeTypeFilter();
  syncGenderFilter();
  render();

  // ---------------------------------------------------------------------
  // Event listeners
  // ---------------------------------------------------------------------

  typeFilter.addEventListener('change', () => {
    syncHomeTypeFilter();
    syncGenderFilter();
  });
  applyButton.addEventListener('click', render);
  sortSelect.addEventListener('change', render);

  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') render();
  });

  resetButton.addEventListener('click', resetFilters);
  emptyResetButton?.addEventListener('click', resetFilters);

  // One listener for every "Add to Bag" button in the grid
  grid.addEventListener('click', event => {
    const button = event.target.closest('.add-cart-button');
    if (!button) return;

    const product = products.find(item => item.id === Number(button.dataset.id));
    if (product) addToBag(product);
  });
});
