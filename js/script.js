/* =========================================
   Mobile Navigation
========================================= */

const menuToggle = document.querySelector("#menu-toggle");
const navigationMenu = document.querySelector("#navigation-menu");

function closeMobileMenu() {
    if (!menuToggle || !navigationMenu) return;

    navigationMenu.classList.remove("menu-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-active");
}

if (menuToggle && navigationMenu) {
    menuToggle.addEventListener("click", function () {
        const menuIsOpen = navigationMenu.classList.toggle("menu-open");

        menuToggle.classList.toggle("is-open", menuIsOpen);
        menuToggle.setAttribute("aria-expanded", String(menuIsOpen));
        menuToggle.setAttribute(
            "aria-label",
            menuIsOpen ? "Close navigation menu" : "Open navigation menu"
        );

        document.body.classList.toggle("menu-active", menuIsOpen);
    });

    navigationMenu.addEventListener("click", function (event) {
        if (event.target.closest("a")) {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth >= 1024) {
            closeMobileMenu();
        }
    });
}

/* =========================================
   Sticky Header
========================================= */

const siteHeader = document.querySelector("#site-header");

function updateHeaderState() {
    if (!siteHeader) return;
    siteHeader.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

/* =========================================
   Best Seller Product Data
========================================= */

const bestSellerProducts = [
    {
        id: 1,
        name: "Oud Legacy",
        collection: "Heritage Collection",
        type: "Eau de Parfum",
        size: "50 ml",
        price: 145,
        image: "media/images/products/oud-legacy.webp",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "Velvet Rose",
        collection: "Heritage Collection",
        type: "Eau de Parfum",
        size: "50 ml",
        price: 140,
        image: "media/images/products/velvet-rose.webp",
        badge: ""
    },
    {
        id: 3,
        name: "Milano Noir",
        collection: "Milano Collection",
        type: "Eau de Parfum",
        size: "50 ml",
        price: 135,
        image: "media/images/products/milano-noir.webp",
        badge: "New"
    },
    {
        id: 4,
        name: "London Bloom",
        collection: "London Collection",
        type: "Eau de Parfum",
        size: "50 ml",
        price: 150,
        image: "media/images/products/london-bloom.webp",
        badge: ""
    }
];

/* =========================================
   Shopping Cart
========================================= */

let shoppingCart = [];

try {
    const savedCart = JSON.parse(localStorage.getItem("shoppingCart"));
    shoppingCart = Array.isArray(savedCart) ? savedCart : [];
} catch (error) {
    shoppingCart = [];
}

shoppingCart = shoppingCart
    .filter(function (item) {
        return item && Number.isFinite(Number(item.id));
    })
    .map(function (item) {
        return {
            ...item,
            id: Number(item.id),
            quantity:
                Number.isInteger(item.quantity) && item.quantity > 0
                    ? item.quantity
                    : 1
        };
    });

function updateCartCounter() {
    const cartCounter = document.querySelector("#cart-count");
    if (!cartCounter) return;

    const totalQuantity = shoppingCart.reduce(function (total, item) {
        return total + item.quantity;
    }, 0);

    cartCounter.textContent = totalQuantity;
}

function saveShoppingCart() {
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    updateCartCounter();
}

/* =========================================
   Create Best Seller Cards
========================================= */

const bestSellerGrid = document.querySelector("#best-sellers-grid");

if (bestSellerGrid) {
    bestSellerProducts.forEach(function (product) {
        const card = document.createElement("article");
        card.className = "product-card reveal";

        const productUrl = `product.html?id=${product.id}`;

        card.innerHTML = `
            <div class="product-media">
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
                        src="${product.image}"
                        alt="${product.name} perfume from the ${product.collection}"
                        width="1000"
                        height="1000"
                        loading="lazy"
                    >
                </a>
            </div>

            <div class="product-content">
                <p class="product-collection">${product.collection}</p>

                <h3>
                    <a class="product-name-link" href="${productUrl}">
                        ${product.name}
                    </a>
                </h3>

                <p class="product-price">£${product.price.toFixed(2)}</p>

                <p class="product-meta">${product.type} · ${product.size}</p>

                <button
                    class="add-cart-button"
                    type="button"
                    data-id="${product.id}"
                >
                    Add to bag
                </button>
            </div>
        `;

        bestSellerGrid.appendChild(card);
    });
}

/* =========================================
   Add Products to Cart
========================================= */

document.addEventListener("click", function (event) {
    const addButton = event.target.closest(".add-cart-button");
    if (!addButton) return;

    const productId = Number(addButton.dataset.id);

    const selectedProduct = bestSellerProducts.find(function (product) {
        return product.id === productId;
    });

    if (!selectedProduct) return;

    const existingItem = shoppingCart.find(function (item) {
        return item.id === productId;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        shoppingCart.push({
            ...selectedProduct,
            quantity: 1
        });
    }

    saveShoppingCart();

    const originalText = addButton.textContent.trim();
    addButton.textContent = "Added to bag";
    addButton.disabled = true;

    window.setTimeout(function () {
        addButton.textContent = originalText;
        addButton.disabled = false;
    }, 1200);
});

/* =========================================
   Newsletter
========================================= */

const newsletterForm = document.querySelector("#newsletter-form");
const newsletterEmail = document.querySelector("#newsletter-email");
const newsletterMessage = document.querySelector("#newsletter-message");

if (newsletterForm && newsletterEmail && newsletterMessage) {
    newsletterForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = newsletterEmail.value.trim();

        if (!email || !newsletterEmail.validity.valid) {
            newsletterMessage.textContent = "Please enter a valid email address.";
            newsletterEmail.focus();
            return;
        }

        const subscribers = JSON.parse(
            localStorage.getItem("mehekNewsletterSubscribers") || "[]"
        );

        const emailAlreadySaved = subscribers.some(function (savedEmail) {
            return savedEmail.toLowerCase() === email.toLowerCase();
        });

        if (!emailAlreadySaved) {
            subscribers.push(email);
            localStorage.setItem(
                "mehekNewsletterSubscribers",
                JSON.stringify(subscribers)
            );
        }

        newsletterMessage.textContent = emailAlreadySaved
            ? "You are already part of the MEHEK journal."
            : "Thank you. Welcome to the world of MEHEK.";

        newsletterForm.reset();
    });
}

/* =========================================
   Scroll Reveal
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(function (element) {
        element.classList.add("is-visible");
    });
}

/* =========================================
   Current Year
========================================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

updateCartCounter();