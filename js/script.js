/* =========================================
   Mobile Navigation
========================================= */

// Selects the mobile menu button.
const menuToggle = document.querySelector("#menu-toggle");

// Selects the main navigation list.
const navigationMenu = document.querySelector("#navigation-menu");

// Adds the mobile menu interaction only when both elements exist.
if (menuToggle && navigationMenu) {
    menuToggle.addEventListener("click", function () {
        navigationMenu.classList.toggle("menu-open");

        const menuIsOpen = navigationMenu.classList.contains("menu-open");

        menuToggle.setAttribute("aria-expanded", menuIsOpen);

        menuToggle.setAttribute(
            "aria-label",
            menuIsOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}

/* =========================================
   Best Seller Product Data
========================================= */

// Stores the four products displayed on the homepage.
const bestSellerProducts = [
    {
        id: 1,
        name: "Oud Legacy",
        collection: "Heritage Collection",
        price: 145,
        image: "media/images/products/oud-legacy.webp",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Velvet Rose",
        collection: "Heritage Collection",
        price: 140,
        image: "media/images/products/velvet-rose.webp",
        badge: ""
    },
    {
        id: 3,
        name: "Milano Noir",
        collection: "Milano Collection",
        price: 135,
        image: "media/images/products/milano-noir.webp",
        badge: "New"
    },
    {
        id: 4,
        name: "London Bloom",
        collection: "London Collection",
        price: 150,
        image: "media/images/products/london-bloom.webp",
        badge: ""
    }
];

/* =========================================
   Create Best Seller Cards
========================================= */

// Selects the Best Sellers grid.
const bestSellerGrid = document.querySelector("#best-sellers-grid");

// Creates the cards only when the grid exists on the current page.
if (bestSellerGrid) {
    bestSellerProducts.forEach(function (product) {
        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            ${
                product.badge
                    ? `<span class="product-badge">${product.badge}</span>`
                    : ""
            }

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name} perfume from the ${product.collection}"
                width="1000"
                height="1000"
                loading="lazy"
            >

            <div class="product-content">
                <p class="product-collection">
                    ${product.collection}
                </p>

                <h3>${product.name}</h3>

                <p class="product-price">
                    £${product.price.toFixed(2)}
                </p>

                <button
                    class="primary-button add-cart-button"
                    type="button"
                    data-id="${product.id}"
                >
                    Add to Cart
                </button>
            </div>
        `;

        bestSellerGrid.appendChild(card);
    });
}

/* =========================================
   Shopping Cart
========================================= */

// Retrieves the saved cart or creates an empty cart.
let shoppingCart =
    JSON.parse(localStorage.getItem("shoppingCart")) || [];

// Corrects any old cart items that do not contain a quantity.
shoppingCart = shoppingCart
    .filter(function (item) {
        return item && item.id;
    })
    .map(function (item) {
        return {
            ...item,
            quantity:
                Number.isInteger(item.quantity) && item.quantity > 0
                    ? item.quantity
                    : 1
        };
    });

/* =========================================
   Save Shopping Cart
========================================= */

function saveShoppingCart() {
    localStorage.setItem(
        "shoppingCart",
        JSON.stringify(shoppingCart)
    );

    updateCartCounter();
}

/* =========================================
   Update Cart Counter
========================================= */

function updateCartCounter() {
    const cartCounter = document.querySelector("#cart-count");

    if (!cartCounter) {
        return;
    }

    const totalCartQuantity = shoppingCart.reduce(
        function (total, item) {
            return total + item.quantity;
        },
        0
    );

    cartCounter.textContent = totalCartQuantity;
}

/* =========================================
   Add Products to Cart
========================================= */

document.addEventListener("click", function (event) {
    const addButton = event.target.closest(".add-cart-button");

    if (!addButton) {
        return;
    }

    const productId = Number(addButton.dataset.id);

    const selectedProduct = bestSellerProducts.find(
        function (product) {
            return product.id === productId;
        }
    );

    if (!selectedProduct) {
        return;
    }

    const existingCartItem = shoppingCart.find(
        function (item) {
            return item.id === productId;
        }
    );

    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        shoppingCart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    saveShoppingCart();

    const originalButtonText = addButton.textContent.trim();

    addButton.textContent = "Added";
    addButton.disabled = true;

    setTimeout(function () {
        addButton.textContent = originalButtonText;
        addButton.disabled = false;
    }, 1000);
});

/* =========================================
   Current Year
========================================= */

// Updates the copyright year automatically.
const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

/* =========================================
   Initial Page Setup
========================================= */

// Displays the correct cart quantity when the page loads.
updateCartCounter();
