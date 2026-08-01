# MEHEK Fragrances

MEHEK is a responsive luxury fragrance e-commerce website created with HTML, CSS and JavaScript. The project presents a fictional fragrance house inspired by Moroccan and Pakistani heritage, Italian refinement and London creativity.

## Project purpose

The website was created as a front-end e-commerce project. It demonstrates responsive design, DOM manipulation, product filtering, local storage and accessible user interface components without using a back-end framework.

## Main features

- Mobile-first responsive layout
- Product catalogue with search and filters
- Individual product pages
- Shopping cart stored in local storage
- Wishlist stored in local storage
- Products are removed from the wishlist when added to the cart
- Newsletter form with client-side validation
- FAQ accordion
- Contact form validation
- Checkout interface
- Shipping, returns, privacy and terms pages
- Responsive navigation and footer

## Pages

- `index.html` - Homepage
- `products.html` - Product catalogue
- `product.html` - Product details
- `collections.html` - Collection stories
- `about.html` - Brand story
- `wishlist.html` - Saved products
- `cart.html` - Shopping cart
- `checkout.html` - Checkout interface
- `contact.html` - Contact page
- `faq.html` - Frequently asked questions
- `shipping-policy.html` - Delivery information
- `returns-policy.html` - Returns policy
- `privacy-policy.html` - Privacy policy
- `terms.html` - Terms and conditions

## Technologies

- HTML5
- CSS3
- JavaScript ES6
- Web Storage API
- Responsive images in WebP format
- Google Fonts

## Project structure

```text
MEHEK/
├── css/
│   ├── style.css
│   ├── components.css
│   ├── about.css
│   └── faq.css
├── js/
│   ├── script.js
│   ├── products.js
│   ├── products-page.js
│   ├── product-page.js
│   ├── wishlist.js
│   ├── cart-page.js
│   ├── checkout.js
│   ├── contact.js
│   ├── about.js
│   └── filter-drawer.js
├── media/
│   └── images/
├── evidence/
├── index.html
├── products.html
├── product.html
├── collections.html
├── about.html
├── wishlist.html
├── cart.html
├── checkout.html
├── contact.html
├── faq.html
├── shipping-policy.html
├── returns-policy.html
├── privacy-policy.html
├── terms.html
├── robots.txt
└── sitemap.xml
```

## Mobile-first approach

The base CSS is written for small screens first. Larger layouts are added with `min-width` media queries. Navigation, product grids, forms, the About page and footer adapt progressively for tablet and desktop screens.

## JavaScript and local storage

The project uses JavaScript to manage interactive behaviour. Cart and wishlist data are saved in the browser with local storage, so the selected products remain available after the page is refreshed.

When a product is added to the shopping cart, the same product is automatically removed from the wishlist, regardless of the page where the cart action takes place.

## How to run the project

The website can be opened directly by double-clicking `index.html`.

For the most reliable local testing, run a simple local server from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Accessibility

The website includes:

- Semantic HTML landmarks
- Alternative text for images
- Accessible labels for forms and icon links
- Keyboard-friendly navigation and accordion controls
- A skip link to the main content
- Visible focus states
- Reduced-motion support on the About page

## Design direction

The visual identity uses a neutral cream, black and warm gold palette. Serif headings, generous spacing and editorial imagery support the luxury fragrance concept while keeping the interface readable and consistent.

## Credits

MEHEK is an original fictional brand concept created for educational purposes. Product names, written content and brand direction were developed specifically for this project. Visual content was created or adapted with AI-assisted tools for educational use.

## Future improvements

A production version could include a real database, secure user accounts, payment processing, server-side form handling, stock management and an email marketing service.
