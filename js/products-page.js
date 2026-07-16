/* =========================================================
   MEHEK PRODUCTS PAGE
   Creates product cards and controls search, filters and sorting.
========================================================= */

/* =========================================================
   DOM ELEMENTS
========================================================= */

// Selects the main product grid.
const productsGrid = document.querySelector("#products-grid");

// Selects the search field.
const productSearch = document.querySelector("#product-search");

// Selects the product type filter.
const productTypeFilter = document.querySelector("#product-type-filter");

// Selects the gender filter container.
const genderFilterGroup = document.querySelector("#gender-filter-group");

// Selects the gender filter.
const genderFilter = document.querySelector("#gender-filter");

// Selects the sorting menu.
const sortProductsSelect = document.querySelector("#sort-products");

// Selects the reset filters button.
const resetFiltersButton = document.querySelector("#reset-filters");

// Selects the product result counter.
const productResultsCount = document.querySelector("#product-results-count");

// Selects the empty results message.
const emptyResultsMessage = document.querySelector("#empty-results-message");

// Selects the reset button displayed inside the empty results message.
const emptyResultsReset = document.querySelector("#empty-results-reset");


/* =========================================================
   PAGE STATE
========================================================= */

// Stores the current search and filter values.
const catalogueState = {
    searchTerm: "",
    productType: "all",
    gender: "all",
    sortValue: "featured"
};


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

/**
 * Converts a collection value into a user-friendly label.
 */
function formatCollectionName(collection) {
    const collectionNames = {
        heritage: "Heritage Collection",
        milano: "Milano Collection",
        london: "London Collection"
    };

    return collectionNames[collection] || collection;
}


/**
 * Converts a product type value into a user-friendly label.
 */
function formatProductType(productType) {
    const productTypeNames = {
        perfume: "Perfume",
        "hair-mist": "Hair Mist",
        "room-spray": "Room Spray",
        "reed-diffuser": "Reed Diffuser",
        "scented-candle": "Scented Candle"
    };

    return productTypeNames[productType] || productType;
}


/**
 * Converts a gender value into a user-friendly label.
 */
function formatGender(gender) {
    const genderNames = {
        unisex: "Unisex",
        men: "Men",
        women: "Women"
    };

    return genderNames[gender] || "";
}


/**
 * Creates a safe product detail URL.
 */
function createProductUrl(product) {
    return `product.html?product=${encodeURIComponent(product.slug)}`;
}


/**
 * Returns a filtered product list based on the current page state.
 */
function getFilteredProducts() {
    const searchValue = catalogueState.searchTerm.trim().toLowerCase();

    return window.products.filter(function (product) {
        // Checks whether the product matches the selected product type.
        const matchesProductType =
            catalogueState.productType === "all" ||
            product.productType === catalogueState.productType;

        // Checks gender only when Perfumes is selected.
        let matchesGender = true;

        if (
            catalogueState.productType === "perfume" &&
            catalogueState.gender !== "all"
        ) {
            matchesGender = product.gender === catalogueState.gender;
        }

        // Searches through several useful product properties.
        const searchableText = [
            product.name,
            product.collection,
            product.productType,
            product.fragranceFamily,
            product.shortDescription
        ]
            .join(" ")
            .toLowerCase();

        const matchesSearch =
            searchValue === "" ||
            searchableText.includes(searchValue);

        return matchesProductType && matchesGender && matchesSearch;
    });
}


/**
 * Sorts products according to the selected sorting option.
 */
function getSortedProducts(productList) {
    return window.sortProducts(
        productList,
        catalogueState.sortValue
    );
}


/* =========================================================
   CREATE PRODUCT CARD
========================================================= */

/**
 * Creates and returns one product card element.
 */
function createProductCard(product) {
    const card = document.createElement("article");

    card.className = "product-card catalogue-product-card";

    const productUrl = createProductUrl(product);

    // Displays gender only for perfumes.
    const genderText =
        product.productType === "perfume"
            ? `<span class="product-gender">${formatGender(product.gender)}</span>`
            : "";

    card.innerHTML = `
        ${
            product.badge
                ? `<span class="product-badge">${product.badge}</span>`
                : ""
        }

        <a
            class="product-image-link"
            href="${productUrl}"
            aria-label="View ${product.name}"
        >
            <img
                class="product-image"
                src="${product.image1}"
                alt="${product.name} from the ${formatCollectionName(product.collection)}"
                width="1000"
                height="1000"
                loading="lazy"
            >
        </a>

        <div class="product-content">

            <p class="product-collection">
                ${formatCollectionName(product.collection)}
            </p>

            <h3>
                <a
                    class="product-name-link"
                    href="${productUrl}"
                >
                    ${product.name}
                </a>
            </h3>

            <p class="product-meta">
                ${formatProductType(product.productType)}
                ${genderText ? ` · ${genderText}` : ""}
            </p>

            <p class="product-price">
                £${product.price.toFixed(2)}
            </p>

            <button
                class="primary-button catalogue-add-cart-button"
                type="button"
                data-product-id="${product.id}"
            >
                Add to Cart
            </button>

        </div>
    `;

    return card;
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

/**
 * Removes old cards and displays the latest filtered product list.
 */
function renderProducts() {
    if (!productsGrid) {
        return;
    }

    const filteredProducts = getFilteredProducts();
    const sortedProducts = getSortedProducts(filteredProducts);

    // Removes all current product cards.
    productsGrid.replaceChildren();

    // Creates and adds each card to the product grid.
    sortedProducts.forEach(function (product) {
        productsGrid.appendChild(createProductCard(product));
    });

    updateResultsCount(sortedProducts.length);
    updateEmptyResultsMessage(sortedProducts.length);
}


/**
 * Updates the product result counter.
 */
function updateResultsCount(productCount) {
    if (!productResultsCount) {
        return;
    }

    const productWord = productCount === 1 ? "product" : "products";

    productResultsCount.textContent =
        `Showing ${productCount} ${productWord}`;
}


/**
 * Shows or hides the empty results message.
 */
function updateEmptyResultsMessage(productCount) {
    if (!emptyResultsMessage || !productsGrid) {
        return;
    }

    const noProductsFound = productCount === 0;

    emptyResultsMessage.hidden = !noProductsFound;
    productsGrid.hidden = noProductsFound;
}


/* =========================================================
   GENDER FILTER VISIBILITY
========================================================= */

/**
 * Shows the gender filter only when Perfumes is selected.
 */
function updateGenderFilterVisibility() {
    if (!genderFilterGroup || !genderFilter) {
        return;
    }

    const perfumeSelected =
        catalogueState.productType === "perfume";

    genderFilterGroup.hidden = !perfumeSelected;

    if (!perfumeSelected) {
        catalogueState.gender = "all";
        genderFilter.value = "all";
    }
}


/* =========================================================
   URL FILTER SUPPORT
========================================================= */

/**
 * Reads an optional product type from the page URL.
 * Example: products.html?type=perfume
 */
function applyUrlFilters() {
    const urlParameters = new URLSearchParams(
        window.location.search
    );

    // Supports both ?type= and the earlier ?category= links.
    const requestedType =
        urlParameters.get("type") ||
        urlParameters.get("category");

    const validProductTypes = [
        "all",
        "perfume",
        "hair-mist",
        "room-spray",
        "reed-diffuser",
        "scented-candle"
    ];

    if (
        requestedType &&
        validProductTypes.includes(requestedType)
    ) {
        catalogueState.productType = requestedType;

        if (productTypeFilter) {
            productTypeFilter.value = requestedType;
        }
    }
}


/* =========================================================
   RESET FILTERS
========================================================= */

/**
 * Restores every product control to its default value.
 */
function resetCatalogueFilters() {
    catalogueState.searchTerm = "";
    catalogueState.productType = "all";
    catalogueState.gender = "all";
    catalogueState.sortValue = "featured";

    if (productSearch) {
        productSearch.value = "";
    }

    if (productTypeFilter) {
        productTypeFilter.value = "all";
    }

    if (genderFilter) {
        genderFilter.value = "all";
    }

    if (sortProductsSelect) {
        sortProductsSelect.value = "featured";
    }

    updateGenderFilterVisibility();
    renderProducts();

    // Removes filter parameters from the browser address.
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
}


/* =========================================================
   SHOPPING CART SUPPORT
========================================================= */

/**
 * Retrieves the current shopping cart from Local Storage.
 */
function getCatalogueCart() {
    return JSON.parse(
        localStorage.getItem("shoppingCart")
    ) || [];
}


/**
 * Saves the shopping cart and updates the header counter.
 */
function saveCatalogueCart(cart) {
    localStorage.setItem(
        "shoppingCart",
        JSON.stringify(cart)
    );

    updateCatalogueCartCounter(cart);
}


/**
 * Updates the cart quantity displayed in the navigation.
 */
function updateCatalogueCartCounter(cart = getCatalogueCart()) {
    const cartCounter = document.querySelector("#cart-count");

    if (!cartCounter) {
        return;
    }

    const totalQuantity = cart.reduce(
        function (total, item) {
            const quantity =
                Number.isInteger(item.quantity) && item.quantity > 0
                    ? item.quantity
                    : 1;

            return total + quantity;
        },
        0
    );

    cartCounter.textContent = totalQuantity;
}


/**
 * Adds one selected catalogue product to the shopping cart.
 */
function addCatalogueProductToCart(productId, button) {
    const selectedProduct = window.getProductById(productId);

    if (!selectedProduct) {
        return;
    }

    const cart = getCatalogueCart();

    const existingItem = cart.find(function (item) {
        return item.id === selectedProduct.id;
    });

    if (existingItem) {
        existingItem.quantity =
            (Number(existingItem.quantity) || 1) + 1;
    } else {
        cart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    saveCatalogueCart(cart);
    showAddToCartFeedback(button);
}


/**
 * Temporarily changes the button text after adding a product.
 */
function showAddToCartFeedback(button) {
    if (!button) {
        return;
    }

    const originalText = button.textContent.trim();

    button.textContent = "Added";
    button.disabled = true;

    setTimeout(function () {
        button.textContent = originalText;
        button.disabled = false;
    }, 1000);
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

// Updates the search results while the user types.
if (productSearch) {
    productSearch.addEventListener("input", function () {
        catalogueState.searchTerm = productSearch.value;
        renderProducts();
    });
}


// Updates the selected product type.
if (productTypeFilter) {
    productTypeFilter.addEventListener("change", function () {
        catalogueState.productType = productTypeFilter.value;

        updateGenderFilterVisibility();
        renderProducts();
    });
}


// Updates the selected perfume gender.
if (genderFilter) {
    genderFilter.addEventListener("change", function () {
        catalogueState.gender = genderFilter.value;
        renderProducts();
    });
}


// Updates the product sorting.
if (sortProductsSelect) {
    sortProductsSelect.addEventListener("change", function () {
        catalogueState.sortValue = sortProductsSelect.value;
        renderProducts();
    });
}


// Resets the controls using the main reset button.
if (resetFiltersButton) {
    resetFiltersButton.addEventListener(
        "click",
        resetCatalogueFilters
    );
}


// Resets the controls using the empty results button.
if (emptyResultsReset) {
    emptyResultsReset.addEventListener(
        "click",
        resetCatalogueFilters
    );
}


// Uses event delegation for dynamically created Add to Cart buttons.
document.addEventListener("click", function (event) {
    const addButton = event.target.closest(
        ".catalogue-add-cart-button"
    );

    if (!addButton) {
        return;
    }

    const productId = Number(
        addButton.dataset.productId
    );

    addCatalogueProductToCart(productId, addButton);
});


/* =========================================================
   INITIAL PAGE SETUP
========================================================= */

// Checks that the product database has loaded correctly.
if (
    !Array.isArray(window.products) ||
    typeof window.sortProducts !== "function"
) {
    console.error(
        "The MEHEK product database could not be loaded."
    );
} else {
    applyUrlFilters();
    updateGenderFilterVisibility();
    updateCatalogueCartCounter();
    renderProducts();
}
