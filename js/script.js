/* =========================================
   MOBILE NAVIGATION
========================================= */

// Selects the mobile menu button.
const menuToggle = document.querySelector("#menu-toggle");

// Selects the main navigation list.
const navigationMenu = document.querySelector("#navigation-menu");

// Checks that both elements exist before adding the interaction.
if (menuToggle && navigationMenu) {
    menuToggle.addEventListener("click", function () {
        // Shows or hides the mobile navigation.
        navigationMenu.classList.toggle("menu-open");

        // Checks whether the menu is currently open.
        const menuIsOpen = navigationMenu.classList.contains("menu-open");

        // Updates the accessible state of the button.
        menuToggle.setAttribute("aria-expanded", menuIsOpen);

        // Updates the button description for screen-reader users.
        menuToggle.setAttribute(
            "aria-label",
            menuIsOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });
}


/* =========================================
   BEST SELLER PRODUCTS DATA
========================================= */

// Array containing the featured products displayed on the homepage.
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
   CREATE BEST SELLER PRODUCT CARDS
========================================= */

// Selects the product grid from the HTML.
const bestSellerGrid = document.querySelector("#best-sellers-grid");

// Checks whether the grid exists on the current page.
if (bestSellerGrid) {
    // Creates one card for each product.
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

                <h3>
                    ${product.name}
                </h3>

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
   SHOPPING CART
========================================= */

// Retrieves the shopping cart from Local Storage.
// If no cart exists, an empty array is used.
let shoppingCart = JSON.parse(
    localStorage.getItem("shoppingCart")
) || [];


/* =========================================
   NORMALISE EXISTING CART DATA
========================================= */

// Converts old cart items into the new quantity-based structure.
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

// Saves the corrected cart structure.
localStorage.setItem(
    "shoppingCart",
    JSON.stringify(shoppingCart)
);


/* =========================================
   UPDATE CART COUNTER
========================================= */

function updateCartCounter() {
    // Selects the cart counter displayed in the navigation.
    const cartCounter = document.querySelector("#cart-count");

    // Stops the function if the counter is not available on the page.
    if (!cartCounter) {
        return;
    }

    // Calculates the total quantity of all products in the cart.
    const totalCartQuantity = shoppingCart.reduce(
        function (total, item) {
            return total + item.quantity;
        },
        0
    );

    // Displays the total quantity beside the cart icon.
    cartCounter.textContent = totalCartQuantity;
}


/* =========================================
   SAVE SHOPPING CART
========================================= */

function saveShoppingCart() {
    // Saves the current shopping cart in Local Storage.
    localStorage.setItem(
        "shoppingCart",
        JSON.stringify(shoppingCart)
    );

    // Updates the quantity displayed in the navigation.
    updateCartCounter();
}


/* =========================================
   ADD PRODUCT TO CART
========================================= */

document.addEventListener("click", function (event) {
    // Finds the nearest Add to Cart button.
    const addButton = event.target.closest(".add-cart-button");

    // Stops the function if another element was clicked.
    if (!addButton) {
        return;
    }

    // Retrieves the selected product ID from the button.
    const productId = Number(addButton.dataset.id);

    // Finds the selected product in the product data array.
    const selectedProduct = bestSellerProducts.find(
        function (product) {
            return product.id === productId;
        }
    );

    // Stops the function if the product cannot be found.
    if (!selectedProduct) {
        return;
    }

    // Checks whether the product already exists in the cart.
    const existingCartItem = shoppingCart.find(
        function (item) {
            return item.id === productId;
        }
    );

    if (existingCartItem) {
        // Increases the quantity if the product is already in the cart.
        existingCartItem.quantity += 1;
    } else {
        // Adds a new product with an initial quantity of one.
        shoppingCart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    // Saves the updated cart.
    saveShoppingCart();

    // Provides visual feedback to the user.
    const originalButtonText = addButton.textContent.trim();

    addButton.textContent = "Added";
    addButton.disabled = true;

    setTimeout(function () {
        addButton.textContent = originalButtonText;
        addButton.disabled = false;
    }, 1000);
});


/* =========================================
   INITIAL PAGE SETUP
========================================= */

// Displays the correct cart quantity when the page loads.
updateCartCounter();