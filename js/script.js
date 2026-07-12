// Mobile Navigation
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

// Array containing the featured products displayed on the homepage

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

// Selects the product grid from the HTML

const bestSellerGrid = document.querySelector("#best-sellers-grid");

// Checks whether the grid exists on the current page

if (bestSellerGrid) {

    // Creates one card for each product

    bestSellerProducts.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `

            ${product.badge
                ? `<span class="product-badge">${product.badge}</span>`
                : ""}

            <img
                class="product-image"
                src="${product.image}"
                alt="${product.name}"
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
                    £${product.price}
                </p>

                <button
                    class="primary-button add-cart-button"
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

// Retrieves the shopping cart from Local Storage

let shoppingCart =
    JSON.parse(localStorage.getItem("shoppingCart")) || [];

/* =========================================
   UPDATE CART COUNTER
========================================= */

function updateCartCounter() {

    const cartCounter =
        document.querySelector("#cart-count");

    if (!cartCounter) return;

    cartCounter.textContent =
        shoppingCart.length;

}

/* =========================================
   ADD PRODUCT TO CART
========================================= */

document.addEventListener("click", function(event){

    if(
        event.target.classList.contains("add-cart-button")
    ){

        const productId =
            Number(event.target.dataset.id);

        const selectedProduct =
            bestSellerProducts.find(product =>
                product.id === productId
            );

        shoppingCart.push(selectedProduct);

        localStorage.setItem(
            "shoppingCart",
            JSON.stringify(shoppingCart)
        );

        updateCartCounter();

    }

});

updateCartCounter();

