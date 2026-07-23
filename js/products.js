'use strict';

/*
 * MEHEK product catalogue.
 * This single array is used by the Shop page and the dynamic Product page.
 */
window.products = [

  // -----------------------------------------------------------------------
  // Perfumes
  // -----------------------------------------------------------------------
  {
    id: 1,
    slug: 'oud-legacy',
    name: 'Oud Legacy',
    collection: 'heritage',
    category: 'perfume',
    type: 'Eau de Parfum',
    gender: 'unisex',
    price: 145,
    description: 'A deep and enveloping fragrance where precious oud meets saffron, warm amber and polished woods.',
    notes: { top: 'Saffron, bergamot', heart: 'Rose, incense', base: 'Oud, amber, sandalwood' },
    occasion: 'Evening · Formal · Special occasions · Autumn/Winter',
    variants: [{ label: '100 ml', price: 145 }]
  },
  {
    id: 2,
    slug: 'velvet-rose',
    name: 'Velvet Rose',
    collection: 'heritage',
    category: 'perfume',
    type: 'Eau de Parfum',
    gender: 'women',
    price: 140,
    description: 'A soft yet expressive rose fragrance layered with pink pepper, amber and a smooth veil of musk.',
    notes: { top: 'Pink pepper, bergamot', heart: 'Damask rose, jasmine', base: 'Amber, musk, cedarwood' },
    occasion: 'Day or evening · Date night · Elegant occasions · Spring/Autumn',
    variants: [{ label: '100 ml', price: 140 }]
  },
  {
    id: 3,
    slug: 'milano-noir',
    name: 'Milano Noir',
    collection: 'milano',
    category: 'perfume',
    type: 'Eau de Parfum',
    gender: 'men',
    price: 135,
    description: 'A refined evening scent combining aromatic citrus, iris and dark woods with a modern Italian character.',
    notes: { top: 'Bergamot, black pepper', heart: 'Iris, lavender', base: 'Vetiver, cedarwood, musk' },
    occasion: 'Evening · Formal · City nights · Autumn/Winter',
    variants: [{ label: '100 ml', price: 135 }]
  },
  {
    id: 4,
    slug: 'london-bloom',
    name: 'London Bloom',
    collection: 'london',
    category: 'perfume',
    type: 'Eau de Parfum',
    gender: 'women',
    price: 150,
    description: 'A luminous floral fragrance inspired by London gardens after rain, with airy petals and clean woods.',
    notes: { top: 'Pear, bergamot', heart: 'Peony, jasmine', base: 'White musk, cedarwood' },
    occasion: 'Daytime · Everyday elegance · Spring/Summer',
    variants: [{ label: '100 ml', price: 150 }]
  },
  {
    id: 5,
    slug: 'black-tobacco',
    name: 'Black Tobacco',
    collection: 'heritage',
    category: 'perfume',
    type: 'Eau de Parfum',
    gender: 'men',
    price: 148,
    description: 'A rich composition of tobacco leaf, warm spice and smoky woods with a smooth amber finish.',
    notes: { top: 'Cardamom, cinnamon', heart: 'Tobacco leaf, leather', base: 'Amber, patchouli, oud' },
    occasion: 'Evening · Formal · Special events · Autumn/Winter',
    variants: [{ label: '100 ml', price: 148 }]
  },
  {
    id: 6,
    slug: 'italian-bergamot',
    name: 'Italian Bergamot',
    collection: 'milano',
    category: 'perfume',
    type: 'Eau de Parfum',
    gender: 'unisex',
    price: 132,
    description: 'A bright and elegant citrus fragrance softened by neroli, white tea and clean musk.',
    notes: { top: 'Italian bergamot, lemon', heart: 'Neroli, white tea', base: 'Musk, sandalwood' },
    occasion: 'Daytime · Office · Smart casual · Spring/Summer',
    variants: [{ label: '100 ml', price: 132 }]
  },
  {
    id: 7,
    slug: 'velvet-peony',
    name: 'Velvet Peony',
    collection: 'milano',
    category: 'perfume',
    type: 'Eau de Parfum',
    gender: 'women',
    price: 138,
    description: 'A polished floral blend of peony, iris and jasmine resting on creamy sandalwood and white musk.',
    notes: { top: 'Mandarin, pear', heart: 'Peony, iris, jasmine', base: 'White musk, sandalwood' },
    occasion: 'Day or evening · Celebrations · Elegant occasions · Spring/Summer',
    variants: [{ label: '100 ml', price: 138 }]
  },
  {
    id: 8,
    slug: 'cashmere-woods',
    name: 'Cashmere Woods',
    collection: 'london',
    category: 'perfume',
    type: 'Eau de Parfum',
    gender: 'unisex',
    price: 145,
    description: 'A soft woody fragrance with fig, cashmere accords and warm cedar, designed for quiet everyday luxury.',
    notes: { top: 'Fig leaf, bergamot', heart: 'Cashmere wood, violet', base: 'Cedarwood, musk, amber' },
    occasion: 'Daytime · Quiet luxury · Smart casual · All seasons',
    variants: [{ label: '100 ml', price: 145 }]
  },
  {
    id: 9,
    slug: 'midnight-london',
    name: 'Midnight London',
    collection: 'london',
    category: 'perfume',
    type: 'Eau de Parfum',
    gender: 'men',
    price: 152,
    description: 'A dark urban fragrance blending black tea, aromatic spice and vetiver over a smooth woody base.',
    notes: { top: 'Black pepper, bergamot', heart: 'Black tea, lavender', base: 'Vetiver, patchouli, cedarwood' },
    occasion: 'Night · Formal events · Special occasions · Autumn/Winter',
    variants: [{ label: '100 ml', price: 152 }]
  },

  // -----------------------------------------------------------------------
  // Hair mists
  // -----------------------------------------------------------------------
  {
    id: 10,
    slug: 'heritage-hair-mist',
    name: 'Heritage Hair Mist',
    collection: 'heritage',
    category: 'hair-mist',
    type: 'Hair Mist',
    gender: 'unisex',
    price: 55,
    description: 'A lightweight scented mist that leaves the hair softly fragranced with rose, amber and cedarwood.',
    notes: { top: 'Bergamot, freesia, pink pepper', heart: 'Damask rose, jasmine, lavender', base: 'Amber, cedarwood, musk' },
    occasion: 'Everyday refresh · Hair layering · Day or evening',
    variants: [{ label: '100 ml', price: 55 }]
  },
  {
    id: 11,
    slug: 'milano-hair-mist',
    name: 'Milano Hair Mist',
    collection: 'milano',
    category: 'hair-mist',
    type: 'Hair Mist',
    gender: 'unisex',
    price: 55,
    description: 'A fresh hair mist with bergamot, iris and white musk for a clean and refined scented finish.',
    notes: { top: 'Bergamot, mandarin', heart: 'Iris, jasmine', base: 'White musk, sandalwood' },
    occasion: 'Everyday refresh · Office · Spring/Summer',
    variants: [{ label: '100 ml', price: 55 }]
  },
  {
    id: 12,
    slug: 'london-hair-mist',
    name: 'London Hair Mist',
    collection: 'london',
    category: 'hair-mist',
    type: 'Hair Mist',
    gender: 'unisex',
    price: 55,
    description: 'A contemporary hair mist combining airy florals, black tea and clean woods.',
    notes: { top: 'Pear, bergamot', heart: 'Black tea, violet', base: 'Cedarwood, musk' },
    occasion: 'Everyday refresh · City days · All seasons',
    variants: [{ label: '100 ml', price: 55 }]
  },

  // -----------------------------------------------------------------------
  // Scented candles
  // -----------------------------------------------------------------------
  {
    id: 13,
    slug: 'heritage-candle',
    name: 'Heritage Candle',
    collection: 'heritage',
    category: 'scented-candle',
    type: 'Scented Candle',
    gender: '',
    price: 48,
    description: 'A warm home fragrance built around amber, rose, spice and dark woods.',
    notes: { top: 'Saffron, spice', heart: 'Rose, incense', base: 'Amber, oud, cedarwood' },
    occasion: 'Living room · Evening relaxation · Autumn/Winter',
    variants: [{ label: '200 g', price: 48 }, { label: '500 g', price: 78 }]
  },
  {
    id: 14,
    slug: 'milano-candle',
    name: 'Milano Candle',
    collection: 'milano',
    category: 'scented-candle',
    type: 'Scented Candle',
    gender: '',
    price: 48,
    description: 'A luminous candle with bergamot, iris and creamy sandalwood.',
    notes: { top: 'Bergamot, lemon', heart: 'Iris, jasmine', base: 'Sandalwood, white musk' },
    occasion: 'Living room · Dining area · Spring/Summer',
    variants: [{ label: '200 g', price: 48 }, { label: '500 g', price: 78 }]
  },
  {
    id: 15,
    slug: 'london-candle',
    name: 'London Candle',
    collection: 'london',
    category: 'scented-candle',
    type: 'Scented Candle',
    gender: '',
    price: 48,
    description: 'A modern candle blending black tea, fig and refined woods.',
    notes: { top: 'Bergamot, fig', heart: 'Black tea, violet', base: 'Cedarwood, vetiver' },
    occasion: 'Bedroom · Evening relaxation · Autumn/Winter',
    variants: [{ label: '200 g', price: 48 }, { label: '500 g', price: 78 }]
  },

  // -----------------------------------------------------------------------
  // Reed diffusers
  // -----------------------------------------------------------------------
  {
    id: 16,
    slug: 'heritage-diffuser',
    name: 'Heritage Reed Diffuser',
    collection: 'heritage',
    category: 'reed-diffuser',
    type: 'Reed Diffuser',
    gender: '',
    price: 58,
    description: 'A long-lasting diffuser that fills the room with warm amber, rose and oud.',
    notes: { top: 'Saffron, spice', heart: 'Rose, incense', base: 'Amber, oud, cedarwood' },
    occasion: 'Entrance · Living room · Warm ambience',
    variants: [{ label: '200 ml', price: 58 }, { label: '500 ml', price: 92 }]
  },
  {
    id: 17,
    slug: 'milano-diffuser',
    name: 'Milano Reed Diffuser',
    collection: 'milano',
    category: 'reed-diffuser',
    type: 'Reed Diffuser',
    gender: '',
    price: 58,
    description: 'A bright diffuser with citrus, iris and soft white musk.',
    notes: { top: 'Bergamot, lemon', heart: 'Iris, jasmine', base: 'Sandalwood, white musk' },
    occasion: 'Office · Entrance · Bright ambience',
    variants: [{ label: '200 ml', price: 58 }, { label: '500 ml', price: 92 }]
  },
  {
    id: 18,
    slug: 'london-diffuser',
    name: 'London Reed Diffuser',
    collection: 'london',
    category: 'reed-diffuser',
    type: 'Reed Diffuser',
    gender: '',
    price: 58,
    description: 'A contemporary diffuser scented with black tea, fig and clean woods.',
    notes: { top: 'Bergamot, fig', heart: 'Black tea, violet', base: 'Cedarwood, vetiver' },
    occasion: 'Bedroom · Living room · Contemporary ambience',
    variants: [{ label: '200 ml', price: 58 }, { label: '500 ml', price: 92 }]
  },

  // -----------------------------------------------------------------------
  // Room sprays
  // -----------------------------------------------------------------------
  {
    id: 19,
    slug: 'heritage-room-spray',
    name: 'Heritage Room Spray',
    collection: 'heritage',
    category: 'room-spray',
    type: 'Room Spray',
    gender: '',
    price: 42,
    description: 'An immediate veil of rose, spice, amber and oud for the home.',
    notes: { top: 'Saffron, spice', heart: 'Rose, incense', base: 'Amber, oud' },
    occasion: 'Living room · Instant refresh · Evening',
    variants: [{ label: '150 ml', price: 42 }]
  },
  {
    id: 20,
    slug: 'milano-room-spray',
    name: 'Milano Room Spray',
    collection: 'milano',
    category: 'room-spray',
    type: 'Room Spray',
    gender: '',
    price: 42,
    description: 'A crisp room spray with bergamot, iris and white musk.',
    notes: { top: 'Bergamot, lemon', heart: 'Iris, jasmine', base: 'White musk' },
    occasion: 'Kitchen · Entrance · Daytime refresh',
    variants: [{ label: '150 ml', price: 42 }]
  },
  {
    id: 21,
    slug: 'london-room-spray',
    name: 'London Room Spray',
    collection: 'london',
    category: 'room-spray',
    type: 'Room Spray',
    gender: '',
    price: 42,
    description: 'A modern room spray combining black tea, fig and cedarwood.',
    notes: { top: 'Bergamot, fig', heart: 'Black tea, violet', base: 'Cedarwood, vetiver' },
    occasion: 'Bedroom · Living room · Evening refresh',
    variants: [{ label: '150 ml', price: 42 }]
  }
];

/*
 * Automatic product image paths
 * --------------------------------
 * Images are generated from each product slug, so new products are easier
 * to maintain and image links do not need to be written manually.
 *
 * Naming rules:
 *   Perfume / Hair Mist:
 *     <slug>.webp
 *     <slug>-notes.webp
 *
 *   Scented Candle:
 *     <slug>.webp
 *     <slug>-2.webp
 *     <slug>-3.webp
 *
 *   Reed Diffuser / Room Spray:
 *     <slug>.webp
 */
const PRODUCT_IMAGE_FOLDER = 'media/images/products';

function buildProductImages(product) {
  const basePath = `${PRODUCT_IMAGE_FOLDER}/${product.slug}`;

  if (product.category === 'scented-candle') {
    return [
      `${basePath}.webp`,
      `${basePath}-2.webp`,
      `${basePath}-3.webp`
    ];
  }

  if (product.category === 'perfume' || product.category === 'hair-mist') {
    return [
      `${basePath}.webp`,
      `${basePath}-notes.webp`
    ];
  }

  return [`${basePath}.webp`];
}

window.products.forEach((product) => {
  product.images = buildProductImages(product);
});
