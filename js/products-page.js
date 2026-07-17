'use strict';

/*
 * MEHEK — Shop page
 *
 * This first version has one job only:
 * read the product list from products.js and display the product cards.
 * Search, filters and sorting will be added later, one step at a time.
 */

document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('#products-grid');
    const resultsCount = document.querySelector('#product-results-count');
    const emptyMessage = document.querySelector('#empty-results-message');

    if (!productsGrid) {
        return;
    }

    /*
     * Accepts the most common names for the product array.
     * The first one found will be used.
     */
    const productList =
        window.products ||
        window.mehekProducts ||
        window.productData ||
        window.PRODUCTS ||
        [];

    if (!Array.isArray(productList) || productList.length === 0) {
        productsGrid.innerHTML = '';

        if (resultsCount) {
            resultsCount.textContent = 'Showing 0 products';
        }

        if (emptyMessage) {
            emptyMessage.hidden = false;
        }

        console.warn(
            'MEHEK: no products were found. Check that products.js creates an array called products.'
        );
        return;
    }

    const formatLabel = (value = '') => {
        return String(value)
            .replace(/-/g, ' ')
            .replace(/\b\w/g, letter => letter.toUpperCase());
    };

    const getProductImage = product => {
        if (Array.isArray(product.images) && product.images.length > 0) {
            return product.images[0];
        }

        return product.image || product.image1 || 'images/product-placeholder.png';
    };

    const getProductPrice = product => {
        const rawPrice = product.price ?? product.startingPrice ?? 0;
        const numberPrice = Number(rawPrice);

        return Number.isFinite(numberPrice)
            ? `£${numberPrice.toFixed(2)}`
            : String(rawPrice);
    };

    const createProductCard = product => {
        const article = document.createElement('article');
        article.className = 'product-card';

        const productId = encodeURIComponent(product.id || product.slug || product.name);
        const productUrl = `product.html?id=${productId}`;
        const image = getProductImage(product);
        const collection = formatLabel(product.collection || 'MEHEK');
        const type = formatLabel(product.type || product.category || 'Fragrance');
        const gender = product.gender ? formatLabel(product.gender) : '';

        article.innerHTML = `
            <a class="product-image-link" href="${productUrl}" aria-label="View ${product.name}">
                <img
                    class="product-image"
                    src="${image}"
                    alt="${product.name}"
                    loading="lazy"
                >
            </a>

            <div class="product-content">
                <p class="product-collection">${collection} Collection</p>

                <h3>
                    <a class="product-name-link" href="${productUrl}">
                        ${product.name}
                    </a>
                </h3>

                <p class="product-meta">
                    ${type}${gender ? ` · <span class="product-gender">${gender}</span>` : ''}
                </p>

                <p class="product-price">${getProductPrice(product)}</p>
            </div>
        `;

        return article;
    };

    /*
     * Read the links coming from the homepage, for example:
     * products.html?collection=heritage
     * products.html?category=home-fragrance
     */
    const urlParameters = new URLSearchParams(window.location.search);
    const selectedCollection = (urlParameters.get('collection') || '').toLowerCase();
    const selectedCategory = (urlParameters.get('category') || '').toLowerCase();

    const normaliseValue = value =>
        String(value || '')
            .trim()
            .toLowerCase()
            .replace(/_/g, '-')
            .replace(/\s+/g, '-');

    const isHomeFragrance = product => {
        const category = normaliseValue(product.category);
        const type = normaliseValue(product.type);
        const value = category || type;

        return [
            'home-fragrance',
            'candle',
            'candles',
            'diffuser',
            'diffusers',
            'room-spray',
            'room-sprays'
        ].includes(value);
    };

    const matchesCategory = product => {
        if (!selectedCategory) {
            return true;
        }

        if (selectedCategory === 'home-fragrance') {
            return isHomeFragrance(product);
        }

        const category = normaliseValue(product.category);
        const type = normaliseValue(product.type);

        if (selectedCategory === 'perfume') {
            return ['perfume', 'fragrance'].includes(category) ||
                ['perfume', 'fragrance'].includes(type);
        }

        if (selectedCategory === 'hair-mist') {
            return category === 'hair-mist' || type === 'hair-mist';
        }

        return category === selectedCategory || type === selectedCategory;
    };

    const filteredProducts = productList.filter(product => {
        const collectionMatches = !selectedCollection ||
            normaliseValue(product.collection) === selectedCollection;

        return collectionMatches && matchesCategory(product);
    });

    const fragment = document.createDocumentFragment();

    filteredProducts.forEach(product => {
        fragment.appendChild(createProductCard(product));
    });

    productsGrid.replaceChildren(fragment);

    if (resultsCount) {
        const word = filteredProducts.length === 1 ? 'product' : 'products';
        resultsCount.textContent = `Showing ${filteredProducts.length} ${word}`;
    }

    if (emptyMessage) {
        emptyMessage.hidden = filteredProducts.length > 0;
    }
});
