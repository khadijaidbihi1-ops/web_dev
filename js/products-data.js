const PRODUCTS = [
  {
    "id": 1,
    "slug": "oud-legacy",
    "name": "Oud Legacy",
    "collection": "heritage",
    "type": "perfume",
    "gender": "unisex",
    "price": 145,
    "size": "100 ml",
    "images": [
      "images/products/oud-legacy-bottle.jpg",
      "images/products/oud-legacy-notes.jpg"
    ],
    "description": "A refined luxury fragrance created with elegant notes and a long-lasting signature.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 2,
    "slug": "royal-cedar",
    "name": "Royal Cedar",
    "collection": "heritage",
    "type": "perfume",
    "gender": "unisex",
    "price": 135,
    "size": "100 ml",
    "images": [
      "images/products/royal-cedar-bottle.jpg",
      "images/products/royal-cedar-notes.jpg"
    ],
    "description": "A refined luxury fragrance created with elegant notes and a long-lasting signature.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 3,
    "slug": "desert-smoke",
    "name": "Desert Smoke",
    "collection": "heritage",
    "type": "perfume",
    "gender": "unisex",
    "price": 150,
    "size": "100 ml",
    "images": [
      "images/products/desert-smoke-bottle.jpg",
      "images/products/desert-smoke-notes.jpg"
    ],
    "description": "A refined luxury fragrance created with elegant notes and a long-lasting signature.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 4,
    "slug": "heritage-hair-mist",
    "name": "Heritage Hair Mist",
    "collection": "heritage",
    "type": "hair-mist",
    "gender": "unisex",
    "price": 48,
    "size": "100 ml",
    "images": [
      "images/products/heritage-hair-mist-bottle.jpg",
      "images/products/heritage-hair-mist-notes.jpg"
    ],
    "description": "A lightweight scented mist designed to leave the hair softly perfumed.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 5,
    "slug": "heritage-room-spray",
    "name": "Heritage Room Spray",
    "collection": "heritage",
    "type": "room-spray",
    "gender": "na",
    "price": 42,
    "size": "200 ml",
    "images": [
      "images/products/heritage-room-spray.jpg"
    ],
    "description": "An elegant room spray created to refresh the home instantly.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 6,
    "slug": "heritage-reed-diffuser",
    "name": "Heritage Reed Diffuser",
    "collection": "heritage",
    "type": "reed-diffuser",
    "gender": "na",
    "price": 60,
    "size": "From 200 ml",
    "images": [
      "images/products/heritage-reed-diffuser.jpg"
    ],
    "description": "A long-lasting reed diffuser that gently scents the room.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ],
    "variants": [
      {
        "label": "200 ml",
        "price": 60
      },
      {
        "label": "500 ml",
        "price": 110
      }
    ]
  },
  {
    "id": 7,
    "slug": "heritage-scented-candle",
    "name": "Heritage Scented Candle",
    "collection": "heritage",
    "type": "scented-candle",
    "gender": "na",
    "price": 55,
    "size": "From 200 g",
    "images": [
      "images/products/heritage-scented-candle.jpg"
    ],
    "description": "A luxury scented candle designed to create a warm atmosphere.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ],
    "variants": [
      {
        "label": "200 g",
        "price": 55
      },
      {
        "label": "500 g",
        "price": 95
      }
    ]
  },
  {
    "id": 8,
    "slug": "milano-noir",
    "name": "Milano Noir",
    "collection": "milano",
    "type": "perfume",
    "gender": "unisex",
    "price": 135,
    "size": "100 ml",
    "images": [
      "images/products/milano-noir-bottle.jpg",
      "images/products/milano-noir-notes.jpg"
    ],
    "description": "A refined luxury fragrance created with elegant notes and a long-lasting signature.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 9,
    "slug": "italian-bergamot",
    "name": "Italian Bergamot",
    "collection": "milano",
    "type": "perfume",
    "gender": "unisex",
    "price": 140,
    "size": "100 ml",
    "images": [
      "images/products/italian-bergamot-bottle.jpg",
      "images/products/italian-bergamot-notes.jpg"
    ],
    "description": "A refined luxury fragrance created with elegant notes and a long-lasting signature.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 10,
    "slug": "cashmere-woods",
    "name": "Cashmere Woods",
    "collection": "milano",
    "type": "perfume",
    "gender": "unisex",
    "price": 145,
    "size": "100 ml",
    "images": [
      "images/products/cashmere-woods-bottle.jpg",
      "images/products/cashmere-woods-notes.jpg"
    ],
    "description": "A refined luxury fragrance created with elegant notes and a long-lasting signature.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 11,
    "slug": "milano-hair-mist",
    "name": "Milano Hair Mist",
    "collection": "milano",
    "type": "hair-mist",
    "gender": "unisex",
    "price": 45,
    "size": "100 ml",
    "images": [
      "images/products/milano-hair-mist-bottle.jpg",
      "images/products/milano-hair-mist-notes.jpg"
    ],
    "description": "A lightweight scented mist designed to leave the hair softly perfumed.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 12,
    "slug": "milano-room-spray",
    "name": "Milano Room Spray",
    "collection": "milano",
    "type": "room-spray",
    "gender": "na",
    "price": 40,
    "size": "200 ml",
    "images": [
      "images/products/milano-room-spray.jpg"
    ],
    "description": "An elegant room spray created to refresh the home instantly.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 13,
    "slug": "milano-reed-diffuser",
    "name": "Milano Reed Diffuser",
    "collection": "milano",
    "type": "reed-diffuser",
    "gender": "na",
    "price": 58,
    "size": "From 200 ml",
    "images": [
      "images/products/milano-reed-diffuser.jpg"
    ],
    "description": "A long-lasting reed diffuser that gently scents the room.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ],
    "variants": [
      {
        "label": "200 ml",
        "price": 58
      },
      {
        "label": "500 ml",
        "price": 108
      }
    ]
  },
  {
    "id": 14,
    "slug": "milano-scented-candle",
    "name": "Milano Scented Candle",
    "collection": "milano",
    "type": "scented-candle",
    "gender": "na",
    "price": 50,
    "size": "From 200 g",
    "images": [
      "images/products/milano-scented-candle.jpg"
    ],
    "description": "A luxury scented candle designed to create a warm atmosphere.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ],
    "variants": [
      {
        "label": "200 g",
        "price": 50
      },
      {
        "label": "500 g",
        "price": 90
      }
    ]
  },
  {
    "id": 15,
    "slug": "midnight-london",
    "name": "Midnight London",
    "collection": "london",
    "type": "perfume",
    "gender": "men",
    "price": 155,
    "size": "100 ml",
    "images": [
      "images/products/midnight-london-bottle.jpg",
      "images/products/midnight-london-notes.jpg"
    ],
    "description": "A refined luxury fragrance created with elegant notes and a long-lasting signature.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 16,
    "slug": "black-tobacco",
    "name": "Black Tobacco",
    "collection": "london",
    "type": "perfume",
    "gender": "unisex",
    "price": 150,
    "size": "100 ml",
    "images": [
      "images/products/black-tobacco-bottle.jpg",
      "images/products/black-tobacco-notes.jpg"
    ],
    "description": "A refined luxury fragrance created with elegant notes and a long-lasting signature.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 17,
    "slug": "london-bloom",
    "name": "London Bloom",
    "collection": "london",
    "type": "perfume",
    "gender": "women",
    "price": 150,
    "size": "100 ml",
    "images": [
      "images/products/london-bloom-bottle.jpg",
      "images/products/london-bloom-notes.jpg"
    ],
    "description": "A refined luxury fragrance created with elegant notes and a long-lasting signature.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 18,
    "slug": "london-hair-mist",
    "name": "London Hair Mist",
    "collection": "london",
    "type": "hair-mist",
    "gender": "unisex",
    "price": 50,
    "size": "100 ml",
    "images": [
      "images/products/london-hair-mist-bottle.jpg",
      "images/products/london-hair-mist-notes.jpg"
    ],
    "description": "A lightweight scented mist designed to leave the hair softly perfumed.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 19,
    "slug": "london-room-spray",
    "name": "London Room Spray",
    "collection": "london",
    "type": "room-spray",
    "gender": "na",
    "price": 45,
    "size": "200 ml",
    "images": [
      "images/products/london-room-spray.jpg"
    ],
    "description": "An elegant room spray created to refresh the home instantly.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ]
  },
  {
    "id": 20,
    "slug": "london-reed-diffuser",
    "name": "London Reed Diffuser",
    "collection": "london",
    "type": "reed-diffuser",
    "gender": "na",
    "price": 65,
    "size": "From 200 ml",
    "images": [
      "images/products/london-reed-diffuser.jpg"
    ],
    "description": "A long-lasting reed diffuser that gently scents the room.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ],
    "variants": [
      {
        "label": "200 ml",
        "price": 65
      },
      {
        "label": "500 ml",
        "price": 115
      }
    ]
  },
  {
    "id": 21,
    "slug": "london-scented-candle",
    "name": "London Scented Candle",
    "collection": "london",
    "type": "scented-candle",
    "gender": "na",
    "price": 58,
    "size": "From 200 g",
    "images": [
      "images/products/london-scented-candle.jpg"
    ],
    "description": "A luxury scented candle designed to create a warm atmosphere.",
    "top": [
      "Bergamot",
      "Spices"
    ],
    "heart": [
      "Floral Notes",
      "Precious Woods"
    ],
    "base": [
      "Amber",
      "Musk"
    ],
    "variants": [
      {
        "label": "200 g",
        "price": 58
      },
      {
        "label": "500 g",
        "price": 98
      }
    ]
  }
];
window.PRODUCTS = PRODUCTS;