'use strict';

/*
 * MEHEK — Shop page
 * Creates the product cards and combines the Category and Collection filters.
 */

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('#products-grid');
    const resultsCount = document.querySelector('#product-results-count');
    const emptyMessage = document.querySelector('#empty-results-message');
    const categoryButtons = [...document.querySelectorAll('[data-category]')];
    const collectionButtons = [...document.querySelectorAll('[data-collection]')];
    const emptyResetButton = document.querySelector('#empty-results-reset');

    if (!productsGrid) return;

    const productList =
        window.products ||
        window.mehekProducts ||
        window.productData ||
        window.PRODUCTS ||
        [];

    const normaliseValue = value =>
        String(value || '')
            .trim()
            .toLowerCase()
            .replace(/_/g, '-')
            .replace(/\s+/g, '-');

    const formatLabel = value =>
        String(value || '')
            .replace(/-/g, ' ')
            .replace(/\b\w/g, letter => letter.toUpperCase());

    const getProductImage = product => {
        if (Array.isArray(product.images) && product.images.length > 0) {
            return product.images[0];
        }
        return product.image || product.image1 || 'images/product-placeholder.png';
    };

    const getProductPrice = product => {
        const rawPrice = product.price ?? product.startingPrice ?? 0;
        const numberPrice = Number(rawPrice);
        return Number.isFinite(numberPrice) ? `£${numberPrice.toFixed(2)}` : String(rawPrice);
    };

    const createProductCard = product => {
        const article = document.createElement('article');
        article.className = 'product-card';

        const productId = encodeURIComponent(product.id || product.slug || product.name);
        const productUrl = `product.html?id=${productId}`;
        const collection = formatLabel(product.collection || 'MEHEK');
        const type = formatLabel(product.type || product.category || 'Fragrance');
        const gender = product.gender ? formatLabel(product.gender) : '';

        article.innerHTML = `
            <a class="product-image-link" href="${productUrl}" aria-label="View ${product.name}">
                <img class="product-image" src="${getProductImage(product)}" alt="${product.name}" loading="lazy">
            </a>
            <div class="product-content">
                <p class="product-collection">${collection} Collection</p>
                <h3><a class="product-name-link" href="${productUrl}">${product.name}</a></h3>
                <p class="product-meta">${type}${gender ? ` · <span class="product-gender">${gender}</span>` : ''}</p>
                <p class="product-price">${getProductPrice(product)}</p>
                <a class="product-view-link" href="${productUrl}">View Product <span aria-hidden="true">→</span></a>
            </div>`;

        return article;
    };

    const isHomeFragrance = product => {
        const values = [normaliseValue(product.category), normaliseValue(product.type)];
        return values.some(value => [
            'home-fragrance', 'candle', 'candles', 'scented-candle',
            'diffuser', 'diffusers', 'reed-diffuser',
            'room-spray', 'room-sprays'
        ].includes(value));
    };

    const matchesCategory = (product, category) => {
        if (category === 'all') return true;
        if (category === 'home-fragrance') return isHomeFragrance(product);

        const values = [normaliseValue(product.category), normaliseValue(product.type)];
        if (category === 'perfume') return values.some(value => ['perfume', 'fragrance'].includes(value));
        return values.includes(category);
    };

    const parameters = new URLSearchParams(window.location.search);
    let activeCategory = normaliseValue(parameters.get('category') || parameters.get('type') || 'all');
    let activeCollection = normaliseValue(parameters.get('collection') || 'all');

    const validCategories = ['all', 'perfume', 'hair-mist', 'home-fragrance'];
    const validCollections = ['all', 'heritage', 'milano', 'london'];

    if (!validCategories.includes(activeCategory)) {
        activeCategory = ['room-spray', 'reed-diffuser', 'scented-candle', 'candle', 'diffuser'].includes(activeCategory)
            ? 'home-fragrance'
            : 'all';
    }
    if (!validCollections.includes(activeCollection)) activeCollection = 'all';

    const setActiveButton = (buttons, value, dataName) => {
        buttons.forEach(button => {
            const selected = button.dataset[dataName] === value;
            button.classList.toggle('is-active', selected);
            button.setAttribute('aria-pressed', String(selected));
        });
    };

    const updateUrl = () => {
        const nextParameters = new URLSearchParams();
        if (activeCategory !== 'all') nextParameters.set('category', activeCategory);
        if (activeCollection !== 'all') nextParameters.set('collection', activeCollection);
        const query = nextParameters.toString();
        history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}`);
    };

    const renderProducts = () => {
        const filteredProducts = productList.filter(product => {
            const categoryMatches = matchesCategory(product, activeCategory);
            const collectionMatches = activeCollection === 'all' ||
                normaliseValue(product.collection) === activeCollection;
            return categoryMatches && collectionMatches;
        });

        const fragment = document.createDocumentFragment();
        filteredProducts.forEach(product => fragment.appendChild(createProductCard(product)));
        productsGrid.replaceChildren(fragment);

        if (resultsCount) {
            const word = filteredProducts.length === 1 ? 'product' : 'products';
            resultsCount.textContent = `Showing ${filteredProducts.length} ${word}`;
        }
        if (emptyMessage) emptyMessage.hidden = filteredProducts.length > 0;
    };

    const applyFilters = () => {
        setActiveButton(categoryButtons, activeCategory, 'category');
        setActiveButton(collectionButtons, activeCollection, 'collection');
        updateUrl();
        renderProducts();
    };

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeCategory = button.dataset.category;
            applyFilters();
        });
    });

    collectionButtons.forEach(button => {
        button.addEventListener('click', () => {
            activeCollection = button.dataset.collection;
            applyFilters();
        });
    });

    if (emptyResetButton) {
        emptyResetButton.addEventListener('click', () => {
            activeCategory = 'all';
            activeCollection = 'all';
            applyFilters();
        });
    }

    if (!Array.isArray(productList) || productList.length === 0) {
        productsGrid.replaceChildren();
        if (resultsCount) resultsCount.textContent = 'Showing 0 products';
        if (emptyMessage) emptyMessage.hidden = false;
        console.warn('MEHEK: no products were found in products.js.');
        return;
    }

    applyFilters();
});