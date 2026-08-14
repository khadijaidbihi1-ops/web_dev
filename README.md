# MEHEK Fragrances

## Project Overview
MEHEK Fragrances is a fully responsive front-end luxury fragrance e-commerce website developed as a web development module assignment. The project demonstrates semantic HTML5, modern CSS and vanilla JavaScript while presenting a premium shopping experience inspired by luxury fragrance brands.


## Project Objectives
- Create a responsive multi-page e-commerce website using HTML5, CSS3 and vanilla JavaScript.
- Apply semantic structure, responsive layouts and mobile-first principles.
- Use JavaScript and DOM manipulation for interactive shopping features.
- Improve accessibility, performance and SEO through iterative testing.
- Deploy the completed front-end website using GitHub Pages.

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6)
- CSS Grid and Flexbox
- Responsive media queries
- Git and GitHub
- GitHub Pages
- Chrome DevTools and Lighthouse

## Project Structure
```text
web_dev/
├── css/
│   ├── style.css
│   ├── components.css
│   ├── about.css
│   ├── faq.css
│   └── mobile-refinements.css
├─── js/
│   ├── about.js
│   ├── cart-page.js
│   ├── checkout.js
│   ├── contact.js
│   └── filter-drawer.js
│   ├── product-page.js
│   ├── products-page.js
│   ├── products.js
│   ├── script.js
│   └── wishlist.js
├── media/
│   ├── images/
│   ├── collections/
│   ├── products/
│   ├── contact/
│   ├── hero/
│   └── categories/
├── evidence/
│   ├── screenshots/
│   └── optimisation evidence/
├── index.html
├── products.html
├── collections.html
├── product.html
├── cart.html
├── wishlist.html
├── checkout.html
├── about.html
├── contact.html
├── faq.html
├── returns-policy.html
├── shipping-policy.html
├── privacy-policy.html
├── terms.html
├── robots.txt
└── sitemap.xml

```

## Main Features
- Responsive Home, About, Collections, Shop and Contact pages
- Individual product pages
- Dynamic product rendering using JavaScript
- Search and filtering
- Shopping bag and wishlist
- Product variants and image gallery
- Checkout interface
- FAQ accordion
- Returns, Shipping, Privacy and Terms & Conditions pages
- Responsive navigation

## Responsive Design
The website was tested at multiple viewport sizes using Chrome DevTools. Mobile refinements were applied to Contact, Cart, Wishlist, FAQ, Returns Policy, Shipping Policy, Privacy Policy, Terms & Conditions and About. These changes reduced unnecessary scrolling, improved content prioritisation, refined hero sizing and improved touch targets while maintaining the luxury visual identity.

## Lighthouse Testing and Optimisation
Lighthouse audits were used to evaluate Performance, Accessibility, Best Practices and SEO. The audit process was used iteratively: identify a problem, implement a targeted fix, then test again.

### Problem 1 — Mobile scrolling and content prioritisation
The early Contact layout required excessive scrolling before the form and primary action. Similar spacing issues affected other mobile pages.

![Earlier Contact Lighthouse audit](evidence/Problem%201a.png)

The layout was made more compact by reducing hero heights, padding, heading sizes and unnecessary gaps. The Contact form was moved higher in the content hierarchy.

![Contact after optimisation](evidence/problem%201fix.png)

### Problem 2 — Image payload and LCP
The Collections page used large editorial images. An earlier Lighthouse audit recorded Performance 73 and an LCP of 17.8 seconds, while diagnostics showed a network payload of approximately 6 MB.

![Collections Lighthouse audit](evidence/Problem%202a.png)
![Collections LCP](evidence/Problem%202b.png)
![Collections network payload](evidence/Problem%202e.png)

Optimisation included WebP images, responsive image sources using `picture`, `srcset` and `sizes`, hero preloading, `fetchpriority="high"`, lazy loading, explicit image dimensions and deferred JavaScript.

![Collections after optimisation](evidence/problem%202fix.png)

### Problem 3 — About timeline
The original About timeline overlapped on larger screens because of narrow columns, conflicting CSS and complex positioning.

![About timeline problem](evidence/problem%203.png)

The timeline was rebuilt with a simpler responsive structure, wider content areas and clearer spacing.

![About timeline fixed](evidence/Problem%203fix.png)

### Problem 4 — FAQ accordion
An expanded FAQ answer escaped its container and overlapped nearby content.

![FAQ problem](evidence/Problem%204.png)

The accordion sizing, wrapping and positioning were corrected so answers expand vertically inside their own container.

![FAQ fixed](evidence/Problem%204fix.png)

## Performance Optimisation
- WebP image conversion
- Responsive images
- Lazy loading
- Hero image preloading
- High-priority LCP image loading
- Asynchronous image decoding
- Explicit image dimensions
- Deferred JavaScript
- Reduced render-blocking work

## Accessibility
Accessibility improvements included semantic HTML, ARIA refinements, alternative text, clearer heading hierarchy, improved colour contrast, larger touch targets and accessible form structure.

## SEO
The project includes `robots.txt` and `sitemap.xml`. The robots file allows crawling and points to the sitemap, while the sitemap lists the main public pages. Lighthouse screenshots show SEO scores of 100 on the tested Contact and Collections pages.

## Testing
Testing covered navigation, forms, responsive layouts, product rendering, filters, search, shopping bag, wishlist, FAQ behaviour, image loading, accessibility and Lighthouse performance. Testing was carried out in Google Chrome and Microsoft Edge.

## Challenges and Solutions
| Challenge | Solution |
|---|---|
| Excessive mobile scrolling | Reduced hero heights, padding and gaps and prioritised primary actions |
| Slow LCP and large image payload | WebP, responsive sources, preloading, fetch priority and lazy loading |
| About timeline overlap | Simplified the responsive structure and removed unstable positioning |
| FAQ content overflow | Corrected container width, wrapping and vertical expansion |

## Limitations
MEHEK is a front-end academic project and does not include a production backend, database, authentication or live payment processing. Image-heavy pages may still benefit from further compression and caching in a production environment.

## Future Improvements
- Backend and database integration
- Secure authentication
- Payment gateway
- Order history and inventory management
- Product reviews
- Admin dashboard
- CDN and additional cache optimisation
- Further manual accessibility testing

## How to Use

MEHEK is a front-end website and can be used either through the deployed GitHub Pages version or locally from the project folder. No installation, package manager or backend server is required.

### Using the live website

1. Open the MEHEK Home page in a modern web browser.
2. Use the main navigation to move between Home, Shop, Collections, About and Contact.
3. Open **Shop** to browse products and use search and filters.
4. Select a product to view its details, imagery and available options.
5. Use the heart icon to save a product to the **Wishlist**.
6. Use **Add to Bag** to place a product in the shopping bag.
7. Open the bag to review selected items and continue to **Checkout**.
8. Use **Collections** to explore Heritage, Milano and London.
9. Use the FAQ and policy pages for supporting information.
10. Use **Contact** to access the contact form and customer-care information.

### Running the project locally

1. Download or clone the `web_dev` repository.
2. Keep the original folder structure unchanged.
3. Open the project folder in Visual Studio Code or another code editor.
4. Open `index.html` in a browser. A Live Server extension may also be used during development, but it is not required.
5. Navigate normally using the website links.
6. Use Chrome DevTools Device Toolbar to test responsive behaviour.
7. Use the Lighthouse panel in Chrome DevTools to run Performance, Accessibility, Best Practices and SEO audits.

## Project Links

| Resource | Link |
|---|---|
| GitHub Repository | https://github.com/khadijaidbihi1-ops/web_dev |
| Live Website / Home | https://khadijaidbihi1-ops.github.io/web_dev/ |
| Products / Shop | https://khadijaidbihi1-ops.github.io/web_dev/products.html |
| Collections | https://khadijaidbihi1-ops.github.io/web_dev/collections.html |
| About / Our Story | https://khadijaidbihi1-ops.github.io/web_dev/about.html |
| Contact | https://khadijaidbihi1-ops.github.io/web_dev/contact.html |
| Shopping Bag / Cart | https://khadijaidbihi1-ops.github.io/web_dev/cart.html |
| Wishlist | https://khadijaidbihi1-ops.github.io/web_dev/wishlist.html |
| Checkout | https://khadijaidbihi1-ops.github.io/web_dev/checkout.html |
| FAQ | https://khadijaidbihi1-ops.github.io/web_dev/faq.html |
| Returns Policy | https://khadijaidbihi1-ops.github.io/web_dev/returns-policy.html |
| Shipping Policy | https://khadijaidbihi1-ops.github.io/web_dev/shipping-policy.html |
| Privacy Policy | https://khadijaidbihi1-ops.github.io/web_dev/privacy-policy.html |
| Terms & Conditions | https://khadijaidbihi1-ops.github.io/web_dev/terms.html |
| Sitemap | https://khadijaidbihi1-ops.github.io/web_dev/sitemap.xml |
| Robots.txt | https://khadijaidbihi1-ops.github.io/web_dev/robots.txt |

## Deployment

The website is deployed using **GitHub Pages**.

**Live website:** https://khadijaidbihi1-ops.github.io/web_dev/

## Author

**Khadija Idbihi**  
Project: **MEHEK Fragrances**  
Web Development Assignment
