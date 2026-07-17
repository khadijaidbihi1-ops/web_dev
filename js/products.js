/* =========================================================
   MEHEK PRODUCT DATABASE
   Contains all 21 products used across the website.
========================================================= */

const products = [
    {
        id: 1,
        slug: "oud-legacy",
        name: "Oud Legacy",
        collection: "heritage",
        productType: "perfume",
        gender: "unisex",
        price: 145,
        volume: "100ml",
        concentration: "Extrait de Parfum",
        image1: "media/images/products/oud-legacy/oud-legacy-1.webp",
        image2: "media/images/products/oud-legacy/oud-legacy-notes.webp",
        shortDescription: "A rich and timeless fragrance blending saffron, oud, warm amber and precious woods.",
        description: "Oud Legacy celebrates the depth of Moroccan and Pakistani heritage through an opulent composition of spices, oud and resinous woods. Warm amber, musk and sandalwood create a refined and long-lasting finish.",
        topNotes: ["Saffron", "Black Pepper", "Cardamom"],
        heartNotes: ["Oud", "Patchouli", "Rosewood"],
        baseNotes: ["Amber", "Musk", "Vanilla", "Sandalwood"],
        fragranceFamily: "Woody Oriental",
        badge: "Best Seller",
        featured: true
    },
    {
        id: 2,
        slug: "royal-cedar",
        name: "Royal Cedar",
        collection: "heritage",
        productType: "perfume",
        gender: "unisex",
        price: 135,
        volume: "100ml",
        concentration: "Extrait de Parfum",
        image1: "media/images/products/royal-cedar/royal-cedar-1.webp",
        image2: "media/images/products/royal-cedar/royal-cedar-notes.webp",
        shortDescription: "A noble woody fragrance with bergamot, aromatic spices, cedarwood and amber.",
        description: "Royal Cedar combines bright bergamot and aromatic spices with an elegant cedarwood heart. Sandalwood, amber and soft musk give the fragrance a smooth and sophisticated character.",
        topNotes: ["Bergamot", "Cardamom", "Black Pepper"],
        heartNotes: ["Cedarwood", "Lavender", "Iris"],
        baseNotes: ["Amber", "Sandalwood", "Musk"],
        fragranceFamily: "Woody Aromatic",
        badge: "",
        featured: false
    },
    {
        id: 3,
        slug: "desert-smoke",
        name: "Desert Smoke",
        collection: "heritage",
        productType: "perfume",
        gender: "unisex",
        price: 150,
        volume: "100ml",
        concentration: "Extrait de Parfum",
        image1: "media/images/products/desert-smoke/desert-smoke-1.webp",
        image2: "media/images/products/desert-smoke/desert-smoke-notes.webp",
        shortDescription: "A mysterious smoky fragrance with incense, oud, leather and warm amber.",
        description: "Desert Smoke evokes the atmosphere of burning incense and precious woods at dusk. A smoky heart of oud and leather settles into amber, vanilla and dark musk.",
        topNotes: ["Incense", "Pink Pepper", "Saffron"],
        heartNotes: ["Oud", "Leather", "Patchouli"],
        baseNotes: ["Amber", "Vanilla", "Dark Musk"],
        fragranceFamily: "Smoky Woody",
        badge: "",
        featured: false
    },
    {
        id: 4,
        slug: "heritage-hair-mist",
        name: "Heritage Hair Mist",
        collection: "heritage",
        productType: "hair-mist",
        gender: "unisex",
        price: 48,
        volume: "75ml",
        concentration: "Hair Mist",
        image1: "media/images/products/heritage-hair-mist/heritage-hair-mist-1.webp",
        image2: "media/images/products/heritage-hair-mist/heritage-hair-mist-notes.webp",
        shortDescription: "A lightweight woody and ambery mist that leaves hair softly scented.",
        description: "A refined hair mist inspired by the Heritage Collection. The lightweight formula delicately perfumes the hair while adding softness, shine and a long-lasting woody trail.",
        topNotes: ["Bergamot", "Freesia", "Pink Pepper"],
        heartNotes: ["Damask Rose", "Jasmine", "Lavender"],
        baseNotes: ["Amber", "Cedarwood", "Musk"],
        fragranceFamily: "Woody Ambery",
        badge: "",
        featured: false
    },
    {
        id: 5,
        slug: "heritage-room-spray",
        name: "Heritage Room Spray",
        collection: "heritage",
        productType: "room-spray",
        gender: "not-applicable",
        price: 42,
        volume: "100ml",
        concentration: "Room Spray",
        image1: "media/images/products/heritage-room-spray/heritage-room-spray-1.webp",
        image2: "media/images/products/heritage-room-spray/heritage-room-spray-2.webp",
        shortDescription: "A rich home fragrance spray with oud, amber and aromatic woods.",
        description: "Instantly refresh your interior with the warm and characterful scent of oud, amber and woods. Designed to create a refined and welcoming atmosphere.",
        topNotes: ["Saffron", "Cardamom"],
        heartNotes: ["Oud", "Cedarwood"],
        baseNotes: ["Amber", "Musk"],
        fragranceFamily: "Woody Ambery",
        badge: "",
        featured: false
    },
    {
        id: 6,
        slug: "heritage-reed-diffuser",
        name: "Heritage Reed Diffuser",
        collection: "heritage",
        productType: "reed-diffuser",
        gender: "not-applicable",
        price: 60,
        volume: "200ml",
        concentration: "Reed Diffuser",
        image1: "media/images/products/heritage-reed-diffuser/heritage-reed-diffuser-1.webp",
        image2: "media/images/products/heritage-reed-diffuser/heritage-reed-diffuser-2.webp",
        shortDescription: "A long-lasting diffuser with rich oud, resinous amber and cedarwood.",
        description: "The Heritage Reed Diffuser slowly releases a deep, warm fragrance throughout the room. Black reeds and premium oils provide an elegant and long-lasting scent experience.",
        topNotes: ["Spices", "Saffron"],
        heartNotes: ["Oud", "Cedarwood"],
        baseNotes: ["Amber", "Musk"],
        fragranceFamily: "Woody Oriental",
        badge: "",
        featured: false
    },
    {
        id: 7,
        slug: "heritage-scented-candle",
        name: "Heritage Scented Candle",
        collection: "heritage",
        productType: "scented-candle",
        gender: "not-applicable",
        price: 55,
        volume: "200g",
        concentration: "Scented Candle",
        image1: "media/images/products/heritage-scented-candle/heritage-scented-candle-1.webp",
        image2: "media/images/products/heritage-scented-candle/heritage-scented-candle-2.webp",
        shortDescription: "A black luxury candle with oud, incense, amber and smoky woods.",
        description: "Presented in matte black glass, the Heritage Scented Candle fills the home with a warm blend of incense, oud, amber and smoky woods.",
        topNotes: ["Incense", "Saffron"],
        heartNotes: ["Oud", "Cedarwood"],
        baseNotes: ["Amber", "Musk"],
        fragranceFamily: "Smoky Woody",
        badge: "",
        featured: false
    },
    {
        id: 8,
        slug: "milano-noir",
        name: "Milano Noir",
        collection: "milano",
        productType: "perfume",
        gender: "unisex",
        price: 135,
        volume: "100ml",
        concentration: "Extrait de Parfum",
        image1: "media/images/products/milano-noir/milano-noir-1.webp",
        image2: "media/images/products/milano-noir/milano-noir-notes.webp",
        shortDescription: "A sophisticated Italian composition of citrus, iris, cashmere woods and musk.",
        description: "Milano Noir balances polished citrus notes with elegant iris and smooth cashmere woods. White musk and amber create a modern, refined and effortlessly wearable finish.",
        topNotes: ["Bergamot", "Mandarin", "Pink Pepper"],
        heartNotes: ["Iris", "Violet", "Cashmere Wood"],
        baseNotes: ["White Musk", "Amber", "Sandalwood"],
        fragranceFamily: "Woody Floral Musk",
        badge: "New",
        featured: true
    },
    {
        id: 9,
        slug: "italian-bergamot",
        name: "Italian Bergamot",
        collection: "milano",
        productType: "perfume",
        gender: "unisex",
        price: 140,
        volume: "100ml",
        concentration: "Extrait de Parfum",
        image1: "media/images/products/italian-bergamot/italian-bergamot-1.webp",
        image2: "media/images/products/italian-bergamot/italian-bergamot-notes.webp",
        shortDescription: "A fresh and vibrant fragrance built around sparkling Italian bergamot.",
        description: "Italian Bergamot opens with sparkling citrus and aromatic green notes. A refined floral heart rests on soft woods, amber and clean musk.",
        topNotes: ["Italian Bergamot", "Lemon", "Petitgrain"],
        heartNotes: ["Neroli", "Jasmine", "Lavender"],
        baseNotes: ["Cedarwood", "Amber", "White Musk"],
        fragranceFamily: "Citrus Aromatic",
        badge: "",
        featured: false
    },
    {
        id: 10,
        slug: "cashmere-woods",
        name: "Cashmere Woods",
        collection: "milano",
        productType: "perfume",
        gender: "unisex",
        price: 145,
        volume: "100ml",
        concentration: "Extrait de Parfum",
        image1: "media/images/products/cashmere-woods/cashmere-woods-1.webp",
        image2: "media/images/products/cashmere-woods/cashmere-woods-notes.webp",
        shortDescription: "A soft woody fragrance with warm spices, cashmere wood and smooth musk.",
        description: "Cashmere Woods wraps the skin in a soft blend of warm spice, creamy woods and musk. Its smooth and intimate character reflects understated Italian elegance.",
        topNotes: ["Bergamot", "Cardamom", "Pink Pepper"],
        heartNotes: ["Cashmere Wood", "Iris", "Cedarwood"],
        baseNotes: ["Sandalwood", "Amber", "Musk"],
        fragranceFamily: "Woody Musky",
        badge: "",
        featured: false
    },
    {
        id: 11,
        slug: "milano-hair-mist",
        name: "Milano Hair Mist",
        collection: "milano",
        productType: "hair-mist",
        gender: "unisex",
        price: 45,
        volume: "75ml",
        concentration: "Hair Mist",
        image1: "media/images/products/milano-hair-mist/milano-hair-mist-1.webp",
        image2: "media/images/products/milano-hair-mist/milano-hair-mist-notes.webp",
        shortDescription: "A delicate citrus-floral mist inspired by effortless Italian elegance.",
        description: "Milano Hair Mist combines sparkling citrus, airy florals and soft musk in a lightweight formula that leaves the hair fresh, soft and elegantly scented.",
        topNotes: ["Bergamot", "Freesia", "Lychee"],
        heartNotes: ["Peony", "Magnolia", "Jasmine"],
        baseNotes: ["Amber", "Sandalwood", "Musk"],
        fragranceFamily: "Floral Fruity Musk",
        badge: "",
        featured: false
    },
    {
        id: 12,
        slug: "milano-room-spray",
        name: "Milano Room Spray",
        collection: "milano",
        productType: "room-spray",
        gender: "not-applicable",
        price: 40,
        volume: "200ml",
        concentration: "Room Spray",
        image1: "media/images/products/milano-room-spray/milano-room-spray-1.webp",
        image2: "media/images/products/milano-room-spray/milano-room-spray-2.webp",
        shortDescription: "A fresh room spray with bergamot, white florals and clean musk.",
        description: "A bright and graceful home fragrance that refreshes the room with bergamot, white flowers, soft woods and clean musk.",
        topNotes: ["Bergamot", "Lemon"],
        heartNotes: ["Freesia", "Magnolia"],
        baseNotes: ["White Musk", "Sandalwood"],
        fragranceFamily: "Fresh Floral",
        badge: "",
        featured: false
    },
    {
        id: 13,
        slug: "milano-reed-diffuser",
        name: "Milano Reed Diffuser",
        collection: "milano",
        productType: "reed-diffuser",
        gender: "not-applicable",
        price: 58,
        volume: "200ml",
        concentration: "Reed Diffuser",
        image1: "media/images/products/milano-reed-diffuser/milano-reed-diffuser-1.webp",
        image2: "media/images/products/milano-reed-diffuser/milano-reed-diffuser-2.webp",
        shortDescription: "An elegant diffuser with citrus, magnolia, white tea and musk.",
        description: "The Milano Reed Diffuser creates a light and harmonious atmosphere with sparkling citrus, magnolia, white tea and soft musk.",
        topNotes: ["Bergamot", "White Tea"],
        heartNotes: ["Magnolia", "Freesia"],
        baseNotes: ["Musk", "Sandalwood"],
        fragranceFamily: "Citrus Floral",
        badge: "",
        featured: false
    },
    {
        id: 14,
        slug: "milano-scented-candle",
        name: "Milano Scented Candle",
        collection: "milano",
        productType: "scented-candle",
        gender: "not-applicable",
        price: 50,
        volume: "200g",
        concentration: "Scented Candle",
        image1: "media/images/products/milano-scented-candle/milano-scented-candle-1.webp",
        image2: "media/images/products/milano-scented-candle/milano-scented-candle-2.webp",
        shortDescription: "A clean ivory candle with bergamot, magnolia and smooth white musk.",
        description: "The Milano Scented Candle brings soft Italian elegance into the home through a polished blend of bergamot, magnolia and white musk.",
        topNotes: ["Bergamot", "Lemon"],
        heartNotes: ["Magnolia", "Jasmine"],
        baseNotes: ["White Musk", "Sandalwood"],
        fragranceFamily: "Fresh Floral",
        badge: "",
        featured: false
    },
    {
        id: 15,
        slug: "midnight-london",
        name: "Midnight London",
        collection: "london",
        productType: "perfume",
        gender: "men",
        price: 155,
        volume: "100ml",
        concentration: "Extrait de Parfum",
        image1: "media/images/products/midnight-london/midnight-london-1.webp",
        image2: "media/images/products/midnight-london/midnight-london-notes.webp",
        shortDescription: "A masculine evening fragrance with dark berries, spices, woods and amber.",
        description: "Midnight London captures the energy of the city after dark. Blackcurrant and spice lead into an aromatic woody heart, while amber, leather and dark musk create a bold masculine finish.",
        topNotes: ["Blackcurrant", "Bergamot", "Black Pepper"],
        heartNotes: ["Lavender", "Cedarwood", "Patchouli"],
        baseNotes: ["Amber", "Leather", "Dark Musk"],
        fragranceFamily: "Woody Spicy",
        badge: "",
        featured: false
    },
    {
        id: 16,
        slug: "black-tobacco",
        name: "Black Tobacco",
        collection: "london",
        productType: "perfume",
        gender: "unisex",
        price: 150,
        volume: "100ml",
        concentration: "Extrait de Parfum",
        image1: "media/images/products/black-tobacco/black-tobacco-1.webp",
        image2: "media/images/products/black-tobacco/black-tobacco-notes.webp",
        shortDescription: "A bold tobacco fragrance with spice, dark woods, vanilla and amber.",
        description: "Black Tobacco blends aromatic tobacco leaf with warm spices and dark woods. Vanilla, amber and musk soften the composition and create a rich, luxurious trail.",
        topNotes: ["Black Pepper", "Cinnamon", "Bergamot"],
        heartNotes: ["Tobacco Leaf", "Cedarwood", "Patchouli"],
        baseNotes: ["Vanilla", "Amber", "Musk"],
        fragranceFamily: "Tobacco Ambery",
        badge: "",
        featured: false
    },
    {
        id: 17,
        slug: "london-bloom",
        name: "London Bloom",
        collection: "london",
        productType: "perfume",
        gender: "women",
        price: 150,
        volume: "100ml",
        concentration: "Extrait de Parfum",
        image1: "media/images/products/london-bloom/london-bloom-1.webp",
        image2: "media/images/products/london-bloom/london-bloom-notes.webp",
        shortDescription: "A feminine floral fragrance with peony, magnolia, gardenia and musk.",
        description: "London Bloom is an elegant feminine fragrance inspired by London's gardens and modern sophistication. Luminous florals rest on amber, cedarwood and soft musk.",
        topNotes: ["Bergamot", "Neroli", "Blackcurrant"],
        heartNotes: ["Peony", "Magnolia", "Gardenia"],
        baseNotes: ["Amber", "Cedarwood", "Musk"],
        fragranceFamily: "Floral Fruity Musk",
        badge: "",
        featured: true
    },
    {
        id: 18,
        slug: "london-hair-mist",
        name: "London Hair Mist",
        collection: "london",
        productType: "hair-mist",
        gender: "unisex",
        price: 50,
        volume: "75ml",
        concentration: "Hair Mist",
        image1: "media/images/products/london-hair-mist/london-hair-mist-1.webp",
        image2: "media/images/products/london-hair-mist/london-hair-mist-notes.webp",
        shortDescription: "A modern floral and musky mist with bergamot, peony and soft woods.",
        description: "London Hair Mist leaves the hair lightly scented with a fresh blend of bergamot, blackcurrant, peony, magnolia and clean musk.",
        topNotes: ["Bergamot", "Neroli", "Blackcurrant"],
        heartNotes: ["Peony", "Magnolia", "Gardenia"],
        baseNotes: ["Amber", "Cedarwood", "Musk"],
        fragranceFamily: "Floral Musky",
        badge: "",
        featured: false
    },
    {
        id: 19,
        slug: "london-room-spray",
        name: "London Room Spray",
        collection: "london",
        productType: "room-spray",
        gender: "not-applicable",
        price: 45,
        volume: "200ml",
        concentration: "Room Spray",
        image1: "media/images/products/london-room-spray/london-room-spray-1.webp",
        image2: "media/images/products/london-room-spray/london-room-spray-2.webp",
        shortDescription: "A contemporary room spray with floral notes, woods and clean musk.",
        description: "London Room Spray refreshes the interior with a polished blend of bergamot, modern florals, cedarwood and soft musk.",
        topNotes: ["Bergamot", "Blackcurrant"],
        heartNotes: ["Peony", "Magnolia"],
        baseNotes: ["Cedarwood", "Musk"],
        fragranceFamily: "Modern Floral",
        badge: "",
        featured: false
    },
    {
        id: 20,
        slug: "london-reed-diffuser",
        name: "London Reed Diffuser",
        collection: "london",
        productType: "reed-diffuser",
        gender: "not-applicable",
        price: 65,
        volume: "200ml",
        concentration: "Reed Diffuser",
        image1: "media/images/products/london-reed-diffuser/london-reed-diffuser-1.webp",
        image2: "media/images/products/london-reed-diffuser/london-reed-diffuser-2.webp",
        shortDescription: "A modern diffuser combining blackcurrant, flowers, cedarwood and musk.",
        description: "The London Reed Diffuser brings contemporary elegance to the home through bright fruits, refined flowers, cedarwood and long-lasting musk.",
        topNotes: ["Bergamot", "Blackcurrant"],
        heartNotes: ["Peony", "Neroli"],
        baseNotes: ["Cedarwood", "Musk"],
        fragranceFamily: "Floral Woody Musk",
        badge: "",
        featured: false
    },
    {
        id: 21,
        slug: "london-scented-candle",
        name: "London Scented Candle",
        collection: "london",
        productType: "scented-candle",
        gender: "not-applicable",
        price: 58,
        volume: "200g",
        concentration: "Scented Candle",
        image1: "media/images/products/london-scented-candle/london-scented-candle-1.webp",
        image2: "media/images/products/london-scented-candle/london-scented-candle-2.webp",
        shortDescription: "A sophisticated candle with blackcurrant, flowers, woods and musk.",
        description: "The London Scented Candle fills the room with a refined blend of blackcurrant, peony, cedarwood and soft musk.",
        topNotes: ["Blackcurrant", "Bergamot"],
        heartNotes: ["Peony", "Magnolia"],
        baseNotes: ["Cedarwood", "Amber", "Musk"],
        fragranceFamily: "Floral Woody",
        badge: "",
        featured: false
    }
];

const productTypeOptions = [
    { value: "all", label: "All Products" },
    { value: "perfume", label: "Perfumes" },
    { value: "hair-mist", label: "Hair Mist" },
    { value: "room-spray", label: "Room Spray" },
    { value: "reed-diffuser", label: "Reed Diffusers" },
    { value: "scented-candle", label: "Scented Candles" }
];

const perfumeGenderOptions = [
    { value: "all", label: "All Genders" },
    { value: "unisex", label: "Unisex" },
    { value: "men", label: "Men" },
    { value: "women", label: "Women" }
];

function getProductById(productId) {
    return products.find(function (product) {
        return product.id === Number(productId);
    });
}

function getProductBySlug(productSlug) {
    return products.find(function (product) {
        return product.slug === productSlug;
    });
}

function getFeaturedProducts() {
    return products.filter(function (product) {
        return product.featured;
    });
}

function filterProducts(productType = "all", gender = "all") {
    return products.filter(function (product) {
        const matchesProductType =
            productType === "all" ||
            product.productType === productType;

        let matchesGender = true;

        if (productType === "perfume" && gender !== "all") {
            matchesGender = product.gender === gender;
        }

        return matchesProductType && matchesGender;
    });
}

function sortProducts(productList, sortValue = "featured") {
    const sortedProducts = [...productList];

    switch (sortValue) {
        case "price-low-high":
            return sortedProducts.sort(function (a, b) {
                return a.price - b.price;
            });

        case "price-high-low":
            return sortedProducts.sort(function (a, b) {
                return b.price - a.price;
            });

        case "name-a-z":
            return sortedProducts.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });

        case "name-z-a":
            return sortedProducts.sort(function (a, b) {
                return b.name.localeCompare(a.name);
            });

        case "featured":
        default:
            return sortedProducts.sort(function (a, b) {
                return Number(b.featured) - Number(a.featured);
            });
    }
}

window.products = products;
window.productTypeOptions = productTypeOptions;
window.perfumeGenderOptions = perfumeGenderOptions;
window.getProductById = getProductById;
window.getProductBySlug = getProductBySlug;
window.getFeaturedProducts = getFeaturedProducts;
window.filterProducts = filterProducts;
window.sortProducts = sortProducts;