MEHEK SHOP PAGE FILES

1. Put products.html in the main project folder.
2. Put products.js and products-page.js inside the js folder.
3. Open css/products-page-styles.css and copy its full content to the end of your existing css/style.css file.
4. Keep this script order inside products.html:
   - js/products.js
   - js/script.js
   - js/products-page.js
5. Make sure your product images use the paths written in products.js.

Expected project structure:

web_dev/
├── products.html
├── css/
│   └── style.css
├── js/
│   ├── products.js
│   ├── script.js
│   └── products-page.js
└── media/
    └── images/
        └── products/
