# MEHEK Fragrances

MEHEK Fragrances is a fully responsive front-end luxury fragrance e-commerce website developed as web development module assignment.

The project was designed to demonstrate modern front-end development practices using HTML, CSS and vanilla JavaScript while creating a premium online shopping experience inspired by luxury fragrance brands.

The website showcases three exclusive fragrance collections inspired by Morocco, Pakistan, Italy and London, combining storytelling, elegant design and responsive user interfaces.

---

# Project Objectives

The aim of this project was to design and develop a responsive multi-page e-commerce website that:

- Demonstrates semantic HTML5 structure
- Applies modern CSS styling and responsive layouts
- Uses JavaScript for interactive functionality
- Provides a consistent shopping experience across devices
- Follows accessibility and performance best practices
- Optimises loading speed using modern web techniques

---

# Website Features

The website includes:

- Responsive Home page
- About page
- Collections page
- Shop page
- Individual Product pages
- Shopping Bag
- Wishlist
- Contact page
- FAQ page
- Returns Policy
- Shipping Policy
- Privacy Policy
- Terms & Conditions
- Checkout page

---

# Product Features

- Product catalogue
- Category filtering
- Collection filtering
- Search functionality
- Product details
- Image gallery
- Product variants
- Shopping bag
- Wishlist
- Dynamic product rendering using JavaScript

---

# Technologies Used

### Front-end

- HTML5
- CSS3
- JavaScript (ES6)

### Design

- Responsive Design
- Mobile-first improvements
- CSS Grid
- Flexbox

### Performance

- WebP images
- Responsive images
- Lazy loading
- Image preloading
- Deferred JavaScript
- Lighthouse optimisation

### Development

- Visual Studio Code
- Git
- GitHub
- GitHub Pages

---

# Responsive Design

The website has been designed to work across desktop, tablet and mobile devices.

Several pages were refined after Lighthouse testing, including:

- Contact
- Cart
- Wishlist
- FAQ
- Returns Policy
- Shipping Policy
- Privacy Policy
- Terms & Conditions
- About

Mobile layouts were redesigned to:

- reduce unnecessary scrolling
- improve content prioritisation
- optimise hero sections
- improve touch targets
- maintain a premium luxury appearance

---

# Performance Optimisation

Following multiple Lighthouse audits, several optimisations were implemented throughout the website.

These include:

- Conversion of images to WebP format
- Responsive images using the `<picture>` element
- Multiple image sizes with `srcset` and `sizes`
- Hero image preloading
- High priority loading (`fetchpriority="high"`)
- Lazy loading for below-the-fold images
- Asynchronous image decoding
- Explicit image dimensions
- Deferred JavaScript loading
- Reduced render-blocking resources
- Improved Largest Contentful Paint (LCP)
- Reduced Cumulative Layout Shift (CLS)
- Improved accessibility compliance

These optimisations significantly improved loading efficiency while preserving image quality and the overall luxury appearance of the website.

---

# Accessibility

Accessibility improvements include:

- Semantic HTML elements
- Improved ARIA attributes
- Better keyboard navigation
- Higher colour contrast
- Larger touch targets
- Improved heading hierarchy
- Accessible forms
- Alternative text for images

---

# Lighthouse

Lighthouse audits were carried out during development to evaluate:

- Performance
- Accessibility
- Best Practices
- SEO

The issues identified were analysed and resolved through iterative optimisation.

Documentation and evidence of the optimisation process can be found inside the `evidence` folder and more details on 'LIGHTHOUS_REPORT.md' file. 

---

# Project Structure

```
web_dev/
│
├── css/
├── js/
├── media/
│   ├── images/
│   ├── collections/
│   ├── products/
│   ├── contact/
│   ├── hero/
│   └── categories/
│
├── evidence/
│   ├── LIGHTHOUSE_REPORT.md
│   ├── screenshots
│   ├── optimisation evidence
│   └── README.md
│
├── index.html
├── shop.html
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
└── terms.html

```

---

# Testing

The website was tested on:

- Google Chrome
- Microsoft Edge

Responsive behaviour was verified using Chrome DevTools across multiple viewport sizes.

Testing included:

- Navigation
- Forms
- Product filtering
- Search
- Shopping bag
- Wishlist
- Responsive layouts
- Accessibility
- Lighthouse performance

---

# Future Improvements

Potential future enhancements include:

- Backend integration
- User authentication
- Payment gateway
- Order history
- Product reviews
- Inventory management
- Customer accounts
- Admin dashboard

---

# Author

**Khadija Idbihi**

Project: **MEHEK Fragrances**