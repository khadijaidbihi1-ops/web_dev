'use strict';

/* =========================================
   Mobile Navigation
========================================= */

const menuToggle = document.querySelector('#menu-toggle');
const navigationMenu = document.querySelector('#navigation-menu');

// Closes the mobile menu and resets its button/label state
function closeMobileMenu() {
  if (!menuToggle || !navigationMenu) return;

  navigationMenu.classList.remove('menu-open');
  menuToggle.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
  document.body.classList.remove('menu-active');
}

if (menuToggle && navigationMenu) {
  // Opens/closes the menu when the toggle button is clicked
  menuToggle.addEventListener('click', () => {
    const menuIsOpen = navigationMenu.classList.toggle('menu-open');

    menuToggle.classList.toggle('is-open', menuIsOpen);
    menuToggle.setAttribute('aria-expanded', String(menuIsOpen));
    menuToggle.setAttribute('aria-label', menuIsOpen ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('menu-active', menuIsOpen);
  });

  // Closes the menu after tapping a link inside it
  navigationMenu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMobileMenu();
  });

  // Closes the menu automatically on desktop-sized viewports
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) closeMobileMenu();
  });
}

/* =========================================
   Sticky Header
========================================= */

const siteHeader = document.querySelector('#site-header');

// Adds a "scrolled" style to the header once the page scrolls past 20px
function updateHeaderState() {
  if (!siteHeader) return;
  siteHeader.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

/* =========================================
   Best Seller Product Data
========================================= */

const bestSellerProducts = [
  {
    id: 1,
    name: 'Oud Legacy',
    collection: 'Heritage Collection',
    type: 'Eau de Parfum',
    size: '50 ml',
    price: 145,
    image: 'media/images/products/oud-legacy.webp',
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Velvet Rose',
    collection: 'Heritage Collection',
    type: 'Eau de Parfum',
    size: '50 ml',
    price: 140,
    image: 'media/images/products/oud-cedar1.webp',
    badge: ''
  },
  {
    id: 3,
    name: 'Milano Noir',
    collection: 'Milano Collection',
    type: 'Eau de Parfum',
    size: '50 ml',
    price: 135,
    image: 'media/images/products/milano-noir.webp',
    badge: 'New'
  },
  {
    id: 4,
    name: 'London Bloom',
    collection: 'London Collection',
    type: 'Eau de Parfum',
    size: '50 ml',
    price: 150,
    image: 'media/images/products/london-bloom.webp',
    badge: ''
  }
];

/* =========================================
   Shopping Cart
========================================= */

// Loads the cart from localStorage, keeping only valid entries
// (a numeric id and a positive whole-number quantity, defaulting to 1)
let shoppingCart = [];

try {
  const savedCart = JSON.parse(localStorage.getItem('shoppingCart'));
  shoppingCart = Array.isArray(savedCart) ? savedCart : [];
} catch (error) {
  shoppingCart = [];
}

shoppingCart = shoppingCart
  .filter(item => item && Number.isFinite(Number(item.id)))
  .map(item => ({
    ...item,
    id: Number(item.id),
    quantity: Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1
  }));

// Updates the cart badge with the total quantity of items
function updateCartCounter() {
  const cartCounter = document.querySelector('#cart-count');
  if (!cartCounter) return;

  const totalQuantity = shoppingCart.reduce((total, item) => total + item.quantity, 0);
  cartCounter.textContent = totalQuantity;
}

// Saves the cart to localStorage and refreshes the badge
function saveShoppingCart() {
  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  updateCartCounter();
}

/* =========================================
   Create Best Seller Cards
========================================= */

const bestSellerGrid = document.querySelector('#best-sellers-grid');

if (bestSellerGrid) {
  bestSellerProducts.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card reveal';

    const productUrl = `product.html?id=${product.id}`;
    const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';

    card.innerHTML = `
      <div class="product-media">
        ${badge}
        <a class="product-image-link" href="${productUrl}" aria-label="View ${product.name}">
          <img class="product-image" src="${product.image}" alt="${product.name} perfume from the ${product.collection}" width="1000" height="1000" loading="lazy">
        </a>
      </div>
      <div class="product-content">
        <p class="product-collection">${product.collection}</p>
        <h3><a class="product-name-link" href="${productUrl}">${product.name}</a></h3>
        <p class="product-price">£${product.price.toFixed(2)}</p>
        <p class="product-meta">${product.type} · ${product.size}</p>
        <button class="add-cart-button" type="button" data-id="${product.id}">Add to bag</button>
      </div>`;

    bestSellerGrid.appendChild(card);
  });
}

/* =========================================
   Add Products to Cart
========================================= */

document.addEventListener('click', event => {
  const addButton = event.target.closest('.add-cart-button');
  if (!addButton) return;

  const productId = Number(addButton.dataset.id);
  const selectedProduct = bestSellerProducts.find(product => product.id === productId);
  if (!selectedProduct) return;

  const existingItem = shoppingCart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    shoppingCart.push({ ...selectedProduct, quantity: 1 });
  }

  saveShoppingCart();

  // Briefly show "Added to bag" feedback on the button
  const originalText = addButton.textContent.trim();
  addButton.textContent = 'Added to bag';
  addButton.disabled = true;

  setTimeout(() => {
    addButton.textContent = originalText;
    addButton.disabled = false;
  }, 1200);
});

/* =========================================
   Scroll Reveal
========================================= */

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  // Fades in each element once it enters the viewport, then stops watching it
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => revealObserver.observe(element));
} else {
  // Fallback for browsers without IntersectionObserver: show everything immediately
  revealElements.forEach(element => element.classList.add('is-visible'));
}

/* =========================================
   Current Year
========================================= */

const currentYear = document.querySelector('#current-year');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

updateCartCounter();
/* =========================================
   Homepage Hero Slider
========================================= */

const heroSlider = document.querySelector('#hero-slider');

if (heroSlider) {
  const heroSlides = Array.from(heroSlider.querySelectorAll('.hero-slide'));
  const heroDots = Array.from(heroSlider.querySelectorAll('.hero-slider-dot'));
  const previousButton = heroSlider.querySelector('.hero-slider-previous');
  const nextButton = heroSlider.querySelector('.hero-slider-next');

  let activeSlideIndex = 0;
  let autoplayTimer;
  let touchStartX = 0;

  // Shows one slide and updates its matching navigation dot
  function showHeroSlide(newIndex) {
    activeSlideIndex = (newIndex + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, index) => {
      const slideIsActive = index === activeSlideIndex;

      slide.classList.toggle('is-active', slideIsActive);
      slide.setAttribute('aria-hidden', String(!slideIsActive));
    });

    heroDots.forEach((dot, index) => {
      const dotIsActive = index === activeSlideIndex;

      dot.classList.toggle('is-active', dotIsActive);
      dot.setAttribute('aria-current', String(dotIsActive));
    });
  }

  // Restarts automatic slide rotation after manual navigation
  function restartHeroAutoplay() {
    window.clearInterval(autoplayTimer);

    autoplayTimer = window.setInterval(() => {
      showHeroSlide(activeSlideIndex + 1);
    }, 4000);
  }

  previousButton.addEventListener('click', () => {
    showHeroSlide(activeSlideIndex - 1);
    restartHeroAutoplay();
  });

  nextButton.addEventListener('click', () => {
    showHeroSlide(activeSlideIndex + 1);
    restartHeroAutoplay();
  });

  heroDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showHeroSlide(index);
      restartHeroAutoplay();
    });
  });

  // Pauses autoplay while the user is interacting with the slider
  heroSlider.addEventListener('mouseenter', () => {
    window.clearInterval(autoplayTimer);
  });

  heroSlider.addEventListener('mouseleave', restartHeroAutoplay);

  heroSlider.addEventListener('focusin', () => {
    window.clearInterval(autoplayTimer);
  });

  heroSlider.addEventListener('focusout', event => {
    if (!heroSlider.contains(event.relatedTarget)) restartHeroAutoplay();
  });

  // Enables horizontal swipe navigation on touch devices
  heroSlider.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  heroSlider.addEventListener('touchend', event => {
    const touchDistance = event.changedTouches[0].clientX - touchStartX;

    if (Math.abs(touchDistance) < 50) return;

    showHeroSlide(activeSlideIndex + (touchDistance < 0 ? 1 : -1));
    restartHeroAutoplay();
  }, { passive: true });

  showHeroSlide(0);
  restartHeroAutoplay();
}

/* =========================================
   Collection Story Slider
========================================= */

const collectionSlider = document.querySelector('#collection-slider');

if (collectionSlider) {
  const collectionSlides = Array.from(
    collectionSlider.querySelectorAll('.collection-slide')
  );
  const collectionTabs = Array.from(
    document.querySelectorAll('.collection-tab')
  );
  const collectionDots = Array.from(
    collectionSlider.querySelectorAll('.collection-slider-dot')
  );
  const previousCollectionButton = collectionSlider.querySelector(
    '.collection-slider-previous'
  );
  const nextCollectionButton = collectionSlider.querySelector(
    '.collection-slider-next'
  );

  let activeCollectionIndex = 0;
  let collectionTouchStartX = 0;

  // Changes the visible collection and keeps tabs, dots and URL hash in sync
  function showCollectionSlide(newIndex, updateHash = true) {
    const previousIndex = activeCollectionIndex;
    activeCollectionIndex = (
      newIndex + collectionSlides.length
    ) % collectionSlides.length;

    collectionSlides.forEach((slide, index) => {
      const isActive = index === activeCollectionIndex;
      const isLeaving = index === previousIndex && index !== activeCollectionIndex;

      slide.classList.toggle('is-active', isActive);
      slide.classList.toggle('is-leaving', isLeaving);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    collectionTabs.forEach((tab, index) => {
      const isActive = index === activeCollectionIndex;

      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-current', String(isActive));
    });

    collectionDots.forEach((dot, index) => {
      const isActive = index === activeCollectionIndex;

      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });

    window.setTimeout(() => {
      collectionSlides.forEach(slide => {
        slide.classList.remove('is-leaving');
      });
    }, 430);

    if (updateHash) {
      const activeId = collectionSlides[activeCollectionIndex].id;
      window.history.replaceState(null, '', `#${activeId}`);
    }
  }

  collectionTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      showCollectionSlide(index);
    });
  });

  collectionDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showCollectionSlide(index);
    });
  });

  previousCollectionButton.addEventListener('click', () => {
    showCollectionSlide(activeCollectionIndex - 1);
  });

  nextCollectionButton.addEventListener('click', () => {
    showCollectionSlide(activeCollectionIndex + 1);
  });

  // Enables horizontal swipe navigation on touch devices
  collectionSlider.addEventListener('touchstart', event => {
    collectionTouchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  collectionSlider.addEventListener('touchend', event => {
    const touchDistance = (
      event.changedTouches[0].clientX - collectionTouchStartX
    );

    if (Math.abs(touchDistance) < 50) return;

    showCollectionSlide(
      activeCollectionIndex + (touchDistance < 0 ? 1 : -1)
    );
  }, { passive: true });

  // Opens the collection requested by a direct link or footer link
  const requestedCollection = window.location.hash.replace('#', '');
  const requestedIndex = collectionSlides.findIndex(
    slide => slide.id === requestedCollection
  );

  showCollectionSlide(requestedIndex >= 0 ? requestedIndex : 0, false);
}

/* =========================================
   Collections Back to Top Button
========================================= */

const backToTopButton = document.querySelector('#back-to-top-button');

if (backToTopButton) {
  // Shows the button after the visitor moves beyond the opening section
  function updateBackToTopButton() {
    backToTopButton.hidden = window.scrollY < 500;
  }

  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', updateBackToTopButton, {
    passive: true
  });

  updateBackToTopButton();
}

