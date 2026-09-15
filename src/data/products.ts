import { Product, CategoryId, ProductPackagingSpec } from '../types';

export const PRODUCTS: Product[] = [
  // ==========================================
  // 1. CHORTOQ PREMIUM THERMAL MINERAL WATER
  // ==========================================
  {
    id: 'chortoq-mineral-water',
    name: 'Chortoq Premium Thermal Mineral Water',
    category: 'water',
    categoryLabel: 'Mineral Water',
    positioning: 'Legendary Medicinal Table Water Bridging Pristine Purity with Therapeutic Power',
    tagline: 'Deep Artesian Mountain Springs of Chartak, Uzbekistan',
    origin: 'Chartak Region, Uzbekistan (Deep artesian mountain springs)',
    description:
      'Sourced from deep artesian mountain springs in the historic Chartak region of Uzbekistan, Chortoq Mineral Water is a legendary medicinal table water that bridges pristine purity with therapeutic power. Naturally filtered through protected rock layers, this crisp, refreshing water is packed with 22 vital minerals, including calcium, magnesium, and natural iodine.',
    shortDescription:
      'Legendary medicinal thermal mineral water from deep artesian mountain springs in Chartak, Uzbekistan.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1559839914-17aae19cec71?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['0.33cl Glass/PET', '0.75cl Glass/PET', '1 Litre PET'],
    ingredients: ['100% Natural Thermal Artesian Mineral Water'],
    nutrition: {
      servingSize: '250 ml',
      calories: 0,
      protein: '0g',
      carbs: '0g',
      fat: '0g',
      sodium: '12mg',
    },
    featured: true,
    curatedPortfolio: true,
    rating: 5.0,
    reviewCount: 42,
    volumeOrWeight: '0.33cl / 0.75cl / 1L',
    badges: ['Thermal Artesian', '22 Vital Minerals', 'Uzbekistan Heritage'],
    inStock: true,
    dateAdded: '2026-08-01',
    harvestOrigin: 'Chartak, Namangan Region, Uzbekistan',
    highlights: [
      'Naturally filtered through ancient protected geological rock strata',
      'Enriched with 22 vital dissolved minerals and trace electrolytes',
      'Natural iodine, bioavailable calcium, and balancing magnesium',
      'Bottled in premium emerald green glass to preserve therapeutic structure',
      'Confident market leader with national consumption heritage in Uzbekistan',
    ],
    characteristics: [
      'Accelerates metabolic balance and optimizes cellular hydration',
      'Aids digestion and gently restores mineral-salt equilibrium',
      'Available in both Naturally Sparkling and Refreshingly Still variants',
      'Bottled in premium green glass to safeguard purity against light degradation',
    ],
    specifications: {
      Origin: 'Chartak artesian mountain basin, Uzbekistan',
      'Mineral Count': '22 Vital macro & micro elements',
      'Key Elements': 'Calcium, Magnesium, Natural Iodine, Bicarbonates',
      Varieties: 'Sparkling & Still',
      Packaging: 'Premium Emerald Green Glass & Recyclable PET',
      Certification: 'Medicinal Table Water Standard of Uzbekistan',
    },
    packagingSpecs: [
      {
        variety: 'Sparkling',
        format: '0.33cl',
        packagingType: 'Glass / PET',
        cartonCount: '12 bottles / carton',
      },
      {
        variety: 'Sparkling',
        format: '0.75cl',
        packagingType: 'Glass / PET',
        cartonCount: '12 bottles / carton',
      },
      {
        variety: 'Sparkling',
        format: '1 Litre',
        packagingType: 'PET',
        cartonCount: '8 bottles / carton',
      },
      {
        variety: 'Still',
        format: '0.33cl',
        packagingType: 'Glass / PET',
        cartonCount: '12 bottles / carton',
      },
      {
        variety: 'Still',
        format: '0.75cl',
        packagingType: 'Glass / PET',
        cartonCount: '12 bottles / carton',
      },
      {
        variety: 'Still',
        format: '1 Litre',
        packagingType: 'PET',
        cartonCount: '8 bottles / carton',
      },
    ],
    details: [
      "Handpicked by our founders for its unmatched healing properties, Chortoq is celebrated for accelerating metabolism, optimizing digestion, and rapidly restoring optimal mineral-salt balance.",
      "Chortoq mineral water confidently holds a leading market share in Uzbekistan, recognised for its high quality and valuable health properties. It has successfully introduced the culture of natural mineral water consumption, ensuring its recognition and popularity among discerning consumers.",
    ],
    servingSuggestions: [
      'Serve lightly chilled at 10–12°C in stemmed crystal glassware.',
      'Pairs elegantly with fine dining, grilled Mediterranean seafood, and rich cheeses.',
      'Drink 250ml in the morning to awaken digestion and rehydrate cellular channels.',
    ],
    storageInfo:
      'Store in a cool, clean, dry place away from direct sunlight and strong aromas. Consume within 48 hours of opening.',
    faq: [
      {
        question: 'What makes Chortoq different from ordinary spring water?',
        answer:
          'Chortoq is a thermal artesian mineral water naturally enriched through protected rock layers with 22 vital minerals including natural iodine, calcium, and magnesium.',
      },
      {
        question: 'Why is it bottled in green glass?',
        answer:
          'The premium green glass shields the water from UV light degradation, preserving its living mineral structure and pristine crisp taste.',
      },
    ],
  },

  // ==========================================
  // 2. ERMAK COLD-PRESSED NECTARS & JUICES
  // ==========================================
  {
    id: 'ermak-juices',
    name: 'Ermak Cold-Pressed Nectars & Juices',
    category: 'juices',
    categoryLabel: 'Nectars & Juices',
    positioning: 'Sun-Ripened Pure Vitality from Central Asia',
    tagline: '100% Cold-Pressed from the Sun-Drenched Orchards of Uzbekistan',
    origin: 'Sun-Drenched Orchards of Uzbekistan',
    description:
      'Sourced from the fertile, sun-drenched orchards of Uzbekistan, Ermak Pure Juices capture the true, unadulterated essence of nature. Cold-pressed gently without added sugars or artificial flavors, each bottle delivers the crisp, vibrant taste of sun-ripened fruit harvested at peak maturity.',
    shortDescription:
      'Pure cold-pressed vitality from Central Asian orchards, capturing nature’s unadulterated sweetness.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['250 ml Glass', '500 ml Glass', '1 Litre Family'],
    ingredients: ['100% Pure Cold-Pressed Orchard Fruits'],
    nutrition: {
      servingSize: '250 ml',
      calories: 110,
      protein: '1.5g',
      carbs: '26g',
      fat: '0g',
      sugar: '22g (natural fruit sugars)',
      sodium: '0mg',
    },
    featured: true,
    rating: 4.9,
    reviewCount: 56,
    volumeOrWeight: '250 ml / 500 ml / 1L',
    badges: ['Central Asian Harvest', 'Cold-Pressed', 'No Added Sugar'],
    inStock: true,
    dateAdded: '2026-08-10',
    harvestOrigin: 'Uzbekistan Orchards, Central Asia',
    highlights: [
      'Grown in high-sunlight continental microclimates generating intense natural fruit sugars',
      'Extracted using slow cold-press technology to prevent heat oxidation',
      'Zero concentrates, artificial flavorings, or chemical preservatives',
      'Rich in natural vitamins, bioflavonoids, and live botanical enzymes',
    ],
    characteristics: [
      'Naturally aromatic with genuine orchard-fresh fruit profile',
      'Silky mouthfeel retaining micro-fiber and natural fruit pectins',
      'Non-homogenized natural separation indicates pure cold extraction',
    ],
    specifications: {
      Origin: 'Fertile valleys of Uzbekistan',
      Method: 'Gentle hydraulic cold extraction',
      Ingredients: '100% single-origin fruit',
      Sweetener: 'Zero added sugar or syrups',
      Preservation: 'Flash-sealed under inert atmosphere',
    },
    servingSuggestions: [
      'Gently invert the bottle before opening to distribute natural fruit cloudiness.',
      'Serve chilled at breakfast or over artisanal ice with fresh mint.',
    ],
    storageInfo: 'Keep refrigerated at 2–4°C. Consume within 4 days after opening.',
  },

  // ==========================================
  // 3. ERMAK PREMIUM SELECTION DRIED NUTS
  // ==========================================
  {
    id: 'ermak-nuts',
    name: 'Ermak Premium Selection Dried Nuts',
    category: 'nuts',
    categoryLabel: 'Dried Nuts',
    positioning: 'Primal Energy & Crunch from Fertile Terraces',
    tagline: 'Harvested from Historical Mountain Foothills and Valleys of Central Asia',
    origin: 'Historical Mountain Foothills and Valleys of Central Asia',
    description:
      'From the historical mountain foothills and valleys of Central Asia, Ermak Premium Dried Nuts are the ultimate nutrient-dense superfood for a high-performance life. Slowly roasted on artisan terraces to preserve essential plant fats and deliver a crisp, satisfying crunch.',
    shortDescription:
      'Nutrient-dense dried nuts sourced from Central Asian mountain foothills, delivering primal vitality.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1536591375315-1b83842c5545?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1536591375315-1b83842c5545?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['150g Resealable Pouch', '300g Pantry Tub'],
    ingredients: ['Selected Central Asian Almonds, Walnuts, Hazelnuts & Cashews'],
    nutrition: {
      servingSize: '30g',
      calories: 175,
      protein: '6g',
      carbs: '5g',
      fat: '15g',
      fiber: '3g',
      sodium: '2mg',
    },
    featured: true,
    rating: 4.9,
    reviewCount: 38,
    volumeOrWeight: '150g / 300g',
    badges: ['High-Performance Superfood', 'Dry-Roasted', 'Unsalted Options'],
    inStock: true,
    dateAdded: '2026-08-12',
    harvestOrigin: 'Central Asian Foothills',
    highlights: [
      'Grown on terraced slopes with mineral-abundant glacial meltwater',
      'High in plant-based protein, magnesium, and heart-healthy unsaturated fats',
      'Dry-roasted slowly without industrial seed oils or palm additives',
      'Sealed in nitrogen-flushed foil pouches to preserve fresh kernel crispness',
    ],
    characteristics: [
      'Primal crunch with deep, naturally sweet nutty finish',
      'Zero burnt notes or greasy residue',
      'Selected for uniform kernel size and zero chemical bleaching',
    ],
    specifications: {
      Origin: 'Central Asian mountain foothills',
      Roasting: 'Traditional low-heat dry air roasting',
      Packaging: 'Airtight resealable foil barrier pouch',
      Certification: 'Clean label, non-GMO',
    },
    servingSuggestions: [
      'Enjoy straight from the pouch as sustained workout fuel.',
      'Chop into morning porridge, acai bowls, or artisanal salads.',
    ],
    storageInfo:
      'Store in a cool, dry place. Reseal tightly after each use to keep kernel crispness.',
  },

  // ==========================================
  // 4. FEEJU PREMIUM FUNCTIONAL WELLNESS SHOTS
  // ==========================================
  {
    id: 'feeju-wellness-shots',
    name: 'Feeju Premium Functional Wellness Shots',
    category: 'wellness-shots',
    categoryLabel: 'Functional Wellness',
    positioning: 'Every Shot Counts: High-Absorption Concentrated Vitality',
    tagline: 'Born Along the Pristine Coastlines of Greece',
    origin: 'Pristine Coastlines of Greece',
    description:
      'Born along the pristine coastlines of Greece, Feeju Functional Shots deliver an intense, pocket-sized dose of daily defense, energy, and rapid physical recovery. Meticulously formulated from Mediterranean bio-actives, every shot is engineered for fast cellular absorption and potent everyday protection.',
    shortDescription:
      'High-absorption concentrated wellness shots born on the Greek coast for daily defense and recovery.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['60 ml Pocket Glass Shot', 'Pack of 7 (Daily Routine)'],
    ingredients: ['Greek Citrus Extract, Raw Mountain Honey, Ginger Root, Mediterranean Bio-Actives'],
    nutrition: {
      servingSize: '60 ml',
      calories: 35,
      protein: '0.5g',
      carbs: '8g',
      fat: '0g',
      sodium: '5mg',
    },
    featured: true,
    curatedPortfolio: true,
    rating: 4.8,
    reviewCount: 31,
    volumeOrWeight: '60 ml / 7-Day Box',
    badges: ['Greek Coastline Origin', 'High Bioavailability', 'Cold-Formulated'],
    inStock: true,
    dateAdded: '2026-08-15',
    harvestOrigin: 'Coastal Greece',
    highlights: [
      'Pocket-sized high-potency liquid delivery for accelerated cellular uptake',
      'Formulated with cold-extracted Greek botanicals and citrus bio-actives',
      'Designed to reinforce daily immunity, natural stamina, and metabolic resilience',
      'Amber medical-grade glass vial protects delicate polyphenols from light decay',
    ],
    characteristics: [
      'Crisp, invigorating bite with warming natural ginger finish',
      'Concentrated nutrient density without fillers or artificial emulsifiers',
    ],
    specifications: {
      Origin: 'Greece coastal bio-labs',
      Volume: '60 ml per single shot',
      Packaging: 'Amber glass vial with tamper-evident seal',
    },
    servingSuggestions: [
      'Shake vigorously and take in one crisp morning draught.',
      'Ideal before high-intensity workouts or during travel.',
    ],
    storageInfo: 'Store in refrigerator or cool dry spot. Best consumed chilled.',
  },

  // ==========================================
  // 5. KJ-1 AUTHENTIC INDONESIAN TEMPEH CHIPS
  // ==========================================
  {
    id: 'kj1-tempeh-chips',
    name: 'KJ-1 Authentic Indonesian Tempeh Chips',
    category: 'snacks',
    categoryLabel: 'Artisan Snacks',
    positioning: 'Ancient Superfood Magic, Perfected for Modern Snacking',
    tagline: 'Fermented Heritage Protein with Unmatched Artisanal Crunch',
    origin: 'Java, Indonesia',
    description:
      'KJ-1 Authentic Indonesian Tempeh Chips transform centuries-old Indonesian fermentation craftsmanship into the ultimate modern superfood snack. Thinly sliced from naturally cultured non-GMO soybeans and lightly crisped in pure coconut oil, each bite delivers complete plant protein, prebiotic fiber, and an addictive savory crunch.',
    shortDescription:
      'Ancient fermented superfood tempeh perfected into light, crispy, high-protein artisan snack chips.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['100g Foil Pouch', '200g Sharing Pack'],
    ingredients: ['Non-GMO Soybeans, Rhizopus Oligosporus Culture, Pure Coconut Oil, Sea Salt, Garlic'],
    nutrition: {
      servingSize: '30g',
      calories: 140,
      protein: '7g',
      carbs: '10g',
      fat: '8g',
      fiber: '4g',
      sodium: '85mg',
    },
    featured: false,
    curatedPortfolio: true,
    rating: 4.8,
    reviewCount: 29,
    volumeOrWeight: '100g / 200g',
    badges: ['Fermented Superfood', '7g Plant Protein', 'Gluten-Free'],
    inStock: true,
    dateAdded: '2026-08-16',
    harvestOrigin: 'Java, Indonesia',
    highlights: [
      'Naturally fermented with traditional Rhizopus cultures for optimal gut bioavailability',
      'Contains complete plant protein with all 9 essential amino acids',
      'Cooked in clean coconut oil — never palm or industrial seed oils',
      'Naturally free from preservatives, MSG, and artificial coloring',
    ],
    characteristics: [
      'Paper-thin cut producing an airy, resonant snap with zero greasy feel',
      'Earthy, nutty umami flavor unique to authentic fermented tempeh',
    ],
    specifications: {
      Origin: 'Java, Indonesia',
      Fermentation: 'Traditional 36-hour controlled fermentation',
      Packaging: 'High-barrier nitrogen-flushed pouch',
    },
    servingSuggestions: [
      'Enjoy as a protein-rich midday desk snack or mindful evening bite.',
      'Pair with fresh guacamole, spicy salsa, or warm broth.',
    ],
    storageInfo: 'Store in a cool dry pantry. Seal tightly after opening.',
  },

  // ==========================================
  // 6. MEGHRI PREMIUM SELECTION SUN-DRIED FRUITS
  // ==========================================
  {
    id: 'meghri-dried-fruits',
    name: 'Meghri Premium Selection Sun-Dried Fruits',
    category: 'fruits',
    categoryLabel: 'Sun-Dried Fruits',
    positioning: 'The Royal Orchard Harvest of the Caucasus Mountains',
    tagline: 'The Absolute Peak of Artisan Natural Sweetness',
    origin: 'Caucasus Mountain Terraces & Orchards',
    description:
      'Representing the absolute peak of artisan natural sweetness, Meghri Premium Sun-Dried Fruits are harvested by hand from the storied royal orchards nestled in the Caucasus Mountains. Dried under intense high-altitude sunlight and cool alpine breezes, the fruit retains its succulent texture, vivid color, and concentrated botanical nutrients.',
    shortDescription:
      'Royal orchard harvest from the Caucasus Mountains, capturing the peak of artisan natural sweetness.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['200g Pouch', '400g Heritage Box'],
    ingredients: ['100% Sun-Dried Apricots, Mountain Figs & Plums'],
    nutrition: {
      servingSize: '40g',
      calories: 105,
      protein: '1.5g',
      carbs: '25g',
      fat: '0g',
      fiber: '4g',
      sodium: '5mg',
    },
    featured: false,
    curatedPortfolio: true,
    rating: 4.9,
    reviewCount: 22,
    volumeOrWeight: '200g / 400g',
    badges: ['Caucasus Heritage', 'Sun-Cured', 'Zero Added Sugars'],
    inStock: true,
    dateAdded: '2026-08-18',
    harvestOrigin: 'Caucasus Mountains',
    highlights: [
      'Grown at altitudes exceeding 1,200m in mineral-rich volcanic soils',
      'Sun-cured slowly on wooden racks without sulfur dioxide treatments',
      'High natural source of potassium, dietary fiber, and protective carotenoids',
      'Chewy, tender texture with a deep honeyed finish',
    ],
    characteristics: [
      'Natural deep amber hue indicative of non-sulfured sun curing',
      'Intense orchard aroma with delicate floral notes',
    ],
    specifications: {
      Origin: 'Caucasus mountain valleys',
      Curing: 'Natural ambient solar dehydration',
      Packaging: 'Resealable airtight kraft/foil pouch',
    },
    servingSuggestions: [
      'Pair alongside aged sheep cheeses, raw walnuts, and dark chocolate.',
      'Soak overnight in warm water for breakfast compotes or grain salads.',
    ],
    storageInfo: 'Store in a cool, dark pantry. Reseal tightly.',
  },

  // ==========================================
  // 7. SEAWAA PREMIUM SEACRUNCH SEAWEED SNACKS
  // ==========================================
  {
    id: 'seawaa-seaweed-snacks',
    name: 'SEAWAA Premium SeaCrunch Seaweed Snacks',
    category: 'seaweed',
    categoryLabel: 'Seaweed Snacks',
    positioning: 'The Double-Roasted Ocean Crunch of South Korea',
    tagline: 'Sourced from the Cold, Nutrient-Rich Coastal Waters of South Korea',
    origin: 'Cold, Nutrient-Rich Coastal Waters of South Korea',
    description:
      'Sourced from the cold, nutrient-rich coastal waters of South Korea, SEAWAA SeaCrunch Snacks represent the absolute global pinnacle of pristine marine nutrition. Double-roasted with premium sesame oil and pure sea salt, these feather-light sheets deliver an irresistible ocean crunch rich in natural iodine, iron, and trace sea minerals.',
    shortDescription:
      'Double-roasted ocean crunch from South Korean coastal waters, packed with marine minerals.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['Pack of 6 (5g each)', 'Box of 24'],
    ingredients: ['Korean Laver Seaweed, Sesame Oil, Perilla Oil, Sea Salt'],
    nutrition: {
      servingSize: '5g',
      calories: 25,
      protein: '1g',
      carbs: '1g',
      fat: '2g',
      sodium: '55mg',
    },
    featured: true,
    rating: 4.8,
    reviewCount: 45,
    volumeOrWeight: '6 x 5g Packs',
    badges: ['South Korean Marine Harvest', 'Double-Roasted', 'Rich in Iodine'],
    inStock: true,
    dateAdded: '2026-08-11',
    harvestOrigin: 'South Korean Coastal Waters',
    highlights: [
      'Harvested only during peak winter months when water purity and mineral density are highest',
      'Exclusive double-roasting technique yields an ultra-crisp, non-greasy texture',
      'Natural source of thyroid-supporting iodine, calcium, and vitamin A',
      'Packaged with oxygen-absorbing seals to preserve ocean freshness',
    ],
    characteristics: [
      'Paper-thin, shatteringly crisp bite with toasted sesame aroma',
      'Clean marine flavor without any fishy aftertaste',
    ],
    specifications: {
      Origin: 'Protected marine reserves of South Korea',
      Roasting: 'Two-stage precision flame roasting',
      Packaging: 'BPA-free recyclable tray & moisture-barrier film',
    },
    servingSuggestions: [
      'Enjoy as a mindful light snack straight from the pack.',
      'Wrap around steaming jasmine rice, avocado slices, or grilled fish.',
    ],
    storageInfo: 'Store in a dry, cool cabinet. Consume immediately upon opening.',
  },

  // ==========================================
  // 8. NUTRIA PREMIUM GREEK EXTRA VIRGIN OLIVE OIL
  // ==========================================
  {
    id: 'nutria-olive-oil',
    name: 'Nutria Premium Greek Extra Virgin Olive Oil',
    category: 'olive-oil',
    categoryLabel: 'Extra Virgin Olive Oil',
    positioning: 'Liquid Gold of the Gods: Handpicked and Cold-Pressed',
    tagline: 'The Absolute Pinnacle of Traditional Mediterranean Wellness',
    origin: 'Generational Greek Groves, Mediterranean',
    description:
      'Nutria Premium Greek Extra Virgin Olive Oil represents the absolute pinnacle of traditional Mediterranean wellness. Handpicked from generational groves and cold-pressed within hours of harvest, this liquid gold delivers robust polyphenols, delicate peppery complexity, and pure culinary elegance.',
    shortDescription:
      'Liquid gold of the gods, handpicked and first cold-pressed from historic Greek olive groves.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1541256942802-7b2996802bf1?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541256942802-7b2996802bf1?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['500 ml Dark Glass', '750 ml Dark Glass', '3 Litre Tin'],
    ingredients: ['100% Extra Virgin Olive Oil (Single Origin Greece)'],
    nutrition: {
      servingSize: '15 ml (1 tbsp)',
      calories: 120,
      protein: '0g',
      carbs: '0g',
      fat: '14g (10g Monounsaturated)',
      sodium: '0mg',
    },
    featured: true,
    rating: 5.0,
    reviewCount: 68,
    volumeOrWeight: '500 ml / 750 ml / 3L',
    badges: ['Greek Single Grove', 'First Cold-Pressed', 'High Polyphenols'],
    inStock: true,
    dateAdded: '2026-08-05',
    harvestOrigin: 'Greece, Mediterranean',
    highlights: [
      'First cold extraction under strict 24°C temperature controls',
      'Acidity consistently tested below 0.3% at bottling',
      'Rich in oleocanthal, squalene, and natural vitamin E',
      'Bottled in UV-coated dark glass to prevent photo-oxidation of antioxidants',
    ],
    characteristics: [
      'Vivid emerald gold tint with herbaceous green tomato aroma',
      'Buttery initial palate finishing with a signature peppery throat tickle',
    ],
    specifications: {
      Origin: 'Peloponnese & Crete groves, Greece',
      Extraction: 'Mechanical cold press within 6 hours of picking',
      Acidity: '< 0.3% free fatty acids',
      PolyphenolContent: '> 350 mg/kg at bottling',
      Container: 'UV-protective dark glass bottle with pour regulator',
    },
    servingSuggestions: [
      'Drizzle liberally over crisp Greek salads, burrata, and vine-ripened tomatoes.',
      'Finish roasted vegetables, warm sourdough, or freshly grilled fish.',
    ],
    storageInfo:
      'Keep in a cool, dark cabinet away from the stove and heat sources. Do not refrigerate.',
  },

  // ==========================================
  // 9. BAFAS ARTISAN GREEK P.D.O. CHEESES
  // ==========================================
  {
    id: 'bafas-greek-cheeses',
    name: 'Bafas Artisan Greek P.D.O. Cheeses',
    category: 'dairy',
    categoryLabel: 'Artisan Cheeses',
    positioning: 'The Pure Taste of Epirus Heritage',
    tagline: '100% Locally Sourced Sheep & Goat Milk from Pristine Greek Pastures',
    origin: 'Epirus Region, Greece (Protected Designation of Origin)',
    description:
      'Made from 100% locally sourced sheep and goat milk grazing freely across the rugged alpine hills of Epirus, Bafas Artisan Greek P.D.O. Cheeses are packed with highly bioavailable proteins, essential minerals, and gut-healthy active cultures. Aged traditionally in wooden barrels for authentic depth of flavor.',
    shortDescription:
      'Artisan Greek P.D.O. cheeses crafted from 100% local sheep and goat milk in Epirus, Greece.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['200g Vacuum Block', '400g Tub in Brine'],
    ingredients: ['Pasteurized Sheep Milk (min 70%), Goat Milk (max 30%), Sea Salt, Lactic Cultures, Rennet'],
    nutrition: {
      servingSize: '30g',
      calories: 80,
      protein: '5.5g',
      carbs: '0.5g',
      fat: '6.5g',
      sodium: '320mg',
    },
    featured: false,
    curatedPortfolio: true,
    rating: 4.9,
    reviewCount: 34,
    volumeOrWeight: '200g / 400g',
    badges: ['P.D.O. Certified', '100% Sheep & Goat Milk', 'Epirus Heritage'],
    inStock: true,
    dateAdded: '2026-08-14',
    harvestOrigin: 'Epirus, Greece',
    highlights: [
      'Authentic European Union Protected Designation of Origin (P.D.O.) certified',
      'Crafted strictly from free-grazing indigenous Greek sheep and goat herds',
      'Aged in natural wooden barrels with traditional brine curing',
      'Naturally lower in lactose than bovine dairy; rich in bioavailable calcium',
    ],
    characteristics: [
      'Crumbly yet creamy texture with tangy, savory, and herb-tinged undertones',
      'Authentic white color without chemical bleaches or artificial thickeners',
    ],
    specifications: {
      Origin: 'Epirus mountainous province, Greece',
      Certification: 'P.D.O. (Protected Designation of Origin)',
      MilkType: 'Free-range sheep (min 70%) and goat (max 30%) milk',
      Aging: 'Minimum 60 days in natural brine curing',
    },
    servingSuggestions: [
      'Crumble over rustic village salads with oregano and extra virgin olive oil.',
      'Bake inside traditional filo pastries or melt over slow-simmered skillet dishes.',
    ],
    storageInfo:
      'Keep refrigerated at 2–4°C. Keep submerged in natural brine to maintain optimal moisture.',
  },

  // ==========================================
  // 10. KILIÇ DENIZ PREM. MEDITERRANEAN SEABASS & SEABREAM
  // ==========================================
  {
    id: 'kilic-deniz-seafood',
    name: 'Kılıç Deniz Premium Mediterranean Seabass & Seabream',
    category: 'seafood',
    categoryLabel: 'Mediterranean Seafood',
    positioning: 'The Pristine Deep-Water Harvest of the Aegean Sea',
    tagline: 'Sustainably Raised in the Open, Deep Waters of the Aegean Sea',
    origin: 'Aegean Sea Deep Waters, Mediterranean',
    description:
      'Harvested from the crystalline, deep-water currents of the Aegean Sea, Kılıç Deniz Seabass and Seabream provide clean, sustainably harvested marine protein celebrated across fine Mediterranean gastronomy. Rich in omega-3 fatty acids, delicate in texture, and prized by global culinary masters.',
    shortDescription:
      'Pristine deep-water Aegean Sea harvest of premium Mediterranean seabass and seabream.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['Whole Cleaned (400-600g)', 'Portioned Fillets (2 x 180g)'],
    ingredients: ['100% Fresh Mediterranean Seabass / Seabream (Sparus aurata & Dicentrarchus labrax)'],
    nutrition: {
      servingSize: '100g',
      calories: 125,
      protein: '20g',
      carbs: '0g',
      fat: '4.8g (1.2g Omega-3)',
      sodium: '65mg',
    },
    featured: false,
    curatedPortfolio: true,
    rating: 5.0,
    reviewCount: 27,
    volumeOrWeight: 'Fresh Chilled Packs',
    badges: ['Aegean Sea Harvest', 'High Omega-3', 'Sustainable Aquaculture'],
    inStock: true,
    dateAdded: '2026-08-17',
    harvestOrigin: 'Aegean Sea, Mediterranean',
    highlights: [
      'Raised in high-energy open-sea currents ensuring clean muscle tone and sweet flesh',
      'Harvested on order and blast-chilled immediately to maintain ocean-fresh quality',
      'Certified sustainable farming adhering to strict European environmental standards',
      'Excellent natural source of lean protein, vitamin D, selenium, and DHA/EPA',
    ],
    characteristics: [
      'Tender, large-flake white flesh with mild, sweet Mediterranean flavor',
      'Firm skin that crisps beautifully when pan-seared or grilled',
    ],
    specifications: {
      Origin: 'Aegean Sea deep coastal zones',
      CatchMethod: 'Sustainably monitored open-sea enclosure',
      Packaging: 'Climate-controlled vacuum skin packaging',
    },
    servingSuggestions: [
      'Pan-sear with skin side down in extra virgin olive oil, finishing with sea salt and lemon.',
      'Bake whole in a sea salt crust with fresh rosemary and capers.',
    ],
    storageInfo: 'Store refrigerated at 0–2°C and cook within 48 hours, or freeze immediately.',
  },

  // ==========================================
  // 11. MEVGAL AUTHENTIC STRAINED GREEK YOGURT
  // ==========================================
  {
    id: 'mevgal-greek-yogurt',
    name: 'MEVGAL Authentic Strained Greek Yogurt',
    category: 'dairy',
    categoryLabel: 'Greek Yogurt',
    positioning: 'The Silky-Smooth Mastery of Traditional Greek Dairy',
    tagline: 'The Golden Standard of Pure Mediterranean Breakfast Culture',
    origin: 'Macedonia & Northern Greece',
    description:
      'The golden standard of pure Mediterranean breakfast culture. MEVGAL Authentic Strained Greek Yogurt is made through genuine multi-stage whey straining, resulting in a naturally dense, velvety texture packed with live probiotic cultures and more than double the protein of ordinary yogurt.',
    shortDescription:
      'Traditional strained Greek yogurt, representing the golden standard of Mediterranean breakfast.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571212515416-fef01fc43637?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['200g Individual Pot', '500g Ceramic Style Tub'],
    ingredients: ['Pasteurized Fresh Cow Milk & Cream, Live Yogurt Cultures (L. bulgaricus, S. thermophilus)'],
    nutrition: {
      servingSize: '150g',
      calories: 130,
      protein: '10g',
      carbs: '4.5g',
      fat: '7.5g',
      sodium: '45mg',
    },
    featured: false,
    curatedPortfolio: true,
    rating: 4.9,
    reviewCount: 46,
    volumeOrWeight: '200g / 500g',
    badges: ['Authentic Strained', '10g Bio-Protein', 'Live Active Probiotics'],
    inStock: true,
    dateAdded: '2026-08-08',
    harvestOrigin: 'Northern Greece',
    highlights: [
      'Authentic traditional straining process removing excess liquid whey naturally',
      'Thick, spoon-standing consistency without gelatin, starches, or thickeners',
      'High in live active cultures supporting healthy gut microbiome diversity',
      'Subtle natural tartness balanced with rich dairy sweetness',
    ],
    characteristics: [
      'Luxuriously creamy mouthfeel with a silky sheen and velvety density',
      'Clean finish with gentle, refreshing lactic tang',
    ],
    specifications: {
      Origin: 'Thessaloniki & Macedonia pastures, Greece',
      Method: 'Centrifugal whey straining',
      Additives: 'Zero starches, pectin, or artificial stabilizers',
    },
    servingSuggestions: [
      'Layer with raw Greek farm honey, toasted walnuts, and fresh berries.',
      'Use as the authentic base for traditional garlic cucumber tzatziki.',
    ],
    storageInfo: 'Keep refrigerated between 2°C and 4°C. Do not freeze.',
  },

  // ==========================================
  // 12. ACETAIA BORGO CASTELLO BALSAMIC OF MODENA PGI
  // ==========================================
  {
    id: 'borgo-castello-balsamic',
    name: 'Acetaia Borgo Castello Premium Balsamic Vinegar of Modena PGI',
    category: 'specialty',
    categoryLabel: 'Aged Balsamic Vinegar',
    positioning: 'The Black Gold of Italian Gastronomy: Aged in Fine Wood',
    tagline: 'Slowly Matured in Heritage Oak and Juniper Casks of Modena',
    origin: 'Modena, Emilia-Romagna, Italy (PGI Protected)',
    description:
      'The black gold of Italian gastronomy. Acetaia Borgo Castello Balsamic Vinegar of Modena PGI is crafted through the slow, patient cooked-grape-must fermentation tradition of Emilia-Romagna. Aged across decades in vintage oak, chestnut, and juniper barrels, it develops an exquisite balance of rich syrup viscosity, sweet woodiness, and aromatic acidity.',
    shortDescription:
      'The black gold of Italian gastronomy, aged in heritage wood casks of Modena with protected PGI status.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['250 ml Wax-Sealed Bottle'],
    ingredients: ['Cooked Grape Must, Aged Wine Vinegar (Contains naturally occurring sulfites)'],
    nutrition: {
      servingSize: '15 ml (1 tbsp)',
      calories: 35,
      protein: '0g',
      carbs: '7g',
      fat: '0g',
      sodium: '3mg',
    },
    featured: false,
    curatedPortfolio: true,
    rating: 5.0,
    reviewCount: 39,
    volumeOrWeight: '250 ml',
    badges: ['Modena PGI Certified', 'Aged in Heritage Wood', 'Italian Gastronomy'],
    inStock: true,
    dateAdded: '2026-08-04',
    harvestOrigin: 'Modena, Italy',
    highlights: [
      'Protected Geographical Indication (PGI) guaranteed by Italian consortium standards',
      'Aged in succession through five different heritage wood casks (oak, chestnut, cherry, ash, mulberry)',
      'Rich natural density (> 1.32 g/ml) without caramel colorings or corn syrup',
      'Complex bouquet of dark plums, vanilla bean, and toasted cedar',
    ],
    characteristics: [
      'Deep, glossy ink-black color coating the back of a spoon',
      'Harmonious balance of sweet grape must and rounded barrel acidity',
    ],
    specifications: {
      Origin: 'Modena, Emilia-Romagna, Italy',
      Certification: 'Aceto Balsamico di Modena I.G.P.',
      Aging: 'Multi-barrel battery aging process',
      Packaging: 'Heavy antique glass with pour cork',
    },
    servingSuggestions: [
      'Drizzle drops over Parmigiano-Reggiano, fresh strawberries, or vanilla bean gelato.',
      'Gloss over seared wagyu steaks or roasted duck breast before serving.',
    ],
    storageInfo: 'Store at room temperature away from direct sunlight. Does not expire.',
  },

  // ==========================================
  // 13. WISCONSIN PREMIUM AMERICAN GINSENG
  // ==========================================
  {
    id: 'wisconsin-american-ginseng',
    name: 'Wisconsin Premium American Ginseng',
    category: 'specialty',
    categoryLabel: 'Adaptogenic Roots',
    positioning: 'The Gold Standard of Adaptogenic Vitality & Focus',
    tagline: 'Grown in the Mineral-Dense, Glacial Soils of Central Wisconsin, USA',
    origin: 'Central Wisconsin, USA (Glacial Soil Basin)',
    description:
      'Sourced from the mineral-dense, glacial soils of Central Wisconsin, USA, Wisconsin American Ginseng is globally revered as the premier benchmark for herbal purity and adaptogenic vitality. Famous for its high concentration of balancing ginsenosides (Rb1), this rare root delivers cool, focused mental clarity and sustained resilience.',
    shortDescription:
      'The global benchmark of adaptogenic vitality, sourced from the glacial soils of Central Wisconsin.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['100g Whole Roots', '75g Sliced Tea Cut'],
    ingredients: ['100% Pure Wisconsin American Ginseng Roots (Panax quinquefolius)'],
    nutrition: {
      servingSize: '2g',
      calories: 5,
      protein: '0g',
      carbs: '1g',
      fat: '0g',
      sodium: '0mg',
    },
    featured: false,
    curatedPortfolio: true,
    rating: 4.9,
    reviewCount: 35,
    volumeOrWeight: '100g Whole / 75g Slices',
    badges: ['Central Wisconsin Soils', 'High Ginsenosides', 'Premier Adaptogen'],
    inStock: true,
    dateAdded: '2026-08-09',
    harvestOrigin: 'Marathon County, Central Wisconsin, USA',
    highlights: [
      'Cultivated in virgin glacial soils enriched with ancient mineral deposits',
      'Higher active ginsenoside profile (Rb1/Rg1 ratio) prized for calming mental clarity',
      'Aged a full 4–5 seasons underground before autumn harvest',
      'Individually inspected and vacuum-sealed for maximum botanical potency',
    ],
    characteristics: [
      'Distinctive wrinkled root surface with deep earthy and bittersweet herbal notes',
      'Clean, lingering floral aftertaste on the palate',
    ],
    specifications: {
      Origin: 'Central Wisconsin glacial belt, USA',
      HarvestAge: '4 to 5 full years',
      Species: 'Panax quinquefolius',
      Testing: 'Strict purity tests for zero heavy metals and zero pesticide residues',
    },
    servingSuggestions: [
      'Simmer 3–4 slices in hot water for 15 minutes as an adaptogenic afternoon tonic.',
      'Infuse into slow-cooked botanical chicken broths or herbal soups.',
    ],
    storageInfo: 'Keep sealed in a cool, dark, moisture-free cabinet.',
  },

  // ==========================================
  // 14. ACQUALAGNA PREM. SELECTED TRUFFLES & SPECIALTIES
  // ==========================================
  {
    id: 'acqualagna-truffles',
    name: 'Acqualagna Premium Selected Truffles & Specialties',
    category: 'specialty',
    categoryLabel: 'Truffles & Fine Gastronomy',
    positioning: "The Diamond of the Kitchen: Earth's Most Luxurious Superfood",
    tagline: 'Hand-Foraged from the Capital of Truffles in Acqualagna, Marche, Italy',
    origin: 'Acqualagna, Marche Region, Italy',
    description:
      "Revered as the diamond of the kitchen and earth's most luxurious superfood, Acqualagna Premium Selected Truffles are hand-foraged using trained lagotto dogs across the damp, limestone-rich oak forests of central Italy. Each truffle is carefully selected for intense aroma, firm texture, and unparalleled culinary majesty.",
    shortDescription:
      'The diamond of the kitchen: artisan Italian truffles hand-foraged in the woods of Acqualagna.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['50g Carpaccio Slices in EVOO', '80g Truffle Cream Paste'],
    ingredients: ['Italian Black Summer Truffles (Tuber aestivum Vitt.), Extra Virgin Olive Oil, Sea Salt'],
    nutrition: {
      servingSize: '10g',
      calories: 45,
      protein: '0.4g',
      carbs: '0.3g',
      fat: '4.5g',
      sodium: '25mg',
    },
    featured: false,
    curatedPortfolio: true,
    rating: 5.0,
    reviewCount: 28,
    volumeOrWeight: '50g / 80g Glass Jar',
    badges: ['Acqualagna Italy', 'Wild Hand-Foraged', 'Gourmet Luxury'],
    inStock: true,
    dateAdded: '2026-08-07',
    harvestOrigin: 'Acqualagna, Italy',
    highlights: [
      'Sourced directly from the historic truffle epicenter of Acqualagna, Marche',
      'Preserved gently in cold-pressed extra virgin olive oil without chemical fragrances',
      'Intense woodland aroma with complex notes of wet stone, forest floor, and roasted nuts',
      'Adds instant Michelin-star distinction to pastas, risottos, and organic eggs',
    ],
    characteristics: [
      'Delicate black-veined carpaccio shavings suspended in golden olive oil',
      'Penetrating, seductive aroma that elevates simple culinary ingredients',
    ],
    specifications: {
      Origin: 'Acqualagna, Marche, Italy',
      Foraging: 'Wild forest foraging with certified canine handlers',
      Packaging: 'Airtight gourmet glass jar with security vacuum button',
    },
    servingSuggestions: [
      'Shave or spoon over freshly churned tagliolini with warm butter and sea salt.',
      'Spoon over soft scrambled farm eggs, creamy polenta, or tender fillet mignon.',
    ],
    storageInfo: 'Keep refrigerated once opened and consume within 10 days.',
  },

  // ==========================================
  // 15. NUTRI NOVA PREMIUM COLD-PRESSED SUNFLOWER OIL
  // ==========================================
  {
    id: 'nutri-nova-sunflower-oil',
    name: 'Nutri Nova Premium Cold-Pressed Sunflower Oil',
    category: 'sunflower-oil',
    categoryLabel: 'Sunflower Oil',
    positioning: 'Light, Pure & Golden Kitchen Essential',
    tagline: 'Gently Cold-Pressed from Selected Non-GMO Sunflower Seeds',
    origin: 'Selected European Sunflower Fields',
    description:
      'Nutri Nova Premium Cold-Pressed Sunflower Oil is crafted from selected non-GMO sunflower seeds, cold-pressed without chemical solvents or aggressive refining. With a naturally high smoke point, delicate golden clarity, and mild neutral flavor, it is the quintessential wholesome cooking companion for modern kitchens.',
    shortDescription:
      'Clean, cold-pressed sunflower oil for light gourmet cooking, delicate sautéing, and dressings.',
    price: 0,
    image:
      'https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=1200&q=80',
    secondaryImage:
      'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=1200&q=80',
    ],
    sizes: ['500 ml Glass', '1 Litre Bottle'],
    ingredients: ['100% Pure Cold-Pressed Sunflower Seed Oil'],
    nutrition: {
      servingSize: '15 ml (1 tbsp)',
      calories: 120,
      protein: '0g',
      carbs: '0g',
      fat: '14g (High Vitamin E)',
      sodium: '0mg',
    },
    featured: true,
    rating: 4.8,
    reviewCount: 30,
    volumeOrWeight: '500 ml / 1L',
    badges: ['First Cold-Pressed', 'Non-GMO', 'Naturally High Smoke Point'],
    inStock: true,
    dateAdded: '2026-08-06',
    harvestOrigin: 'European Sunflower Fields',
    highlights: [
      'Naturally high in plant-based vitamin E (alpha-tocopherol)',
      'Cold-pressed under 35°C to protect fatty acid structures',
      'Clean light golden hue with subtle seed sweetness',
      'Ideal for everyday cooking where olive oil flavor is too dominant',
    ],
    characteristics: [
      'Light, non-greasy palate feel that allows raw ingredients to shine',
      'Zero synthetic anti-foaming agents or chemical bleaching additives',
    ],
    specifications: {
      Origin: 'European agricultural belts',
      Pressing: 'Mechanical expeller cold pressed',
      Packaging: 'UV-shielded recyclable bottle',
    },
    servingSuggestions: [
      'Ideal for delicate sautéing, wok searing, and baking gourmet pastries.',
      'Whisk with Dijon mustard and cider vinegar for light, silky vinaigrettes.',
    ],
    storageInfo: 'Store in a cool, dry pantry away from sunlight and heat.',
  },
];

// Helper aliases so any legacy product IDs seamlessly resolve
export const getProductById = (id: string): Product => {
  const directMatch = PRODUCTS.find((p) => p.id === id);
  if (directMatch) return directMatch;

  // Legacy mappings
  if (id.includes('juice')) {
    return PRODUCTS.find((p) => p.id === 'ermak-juices') || PRODUCTS[0];
  }
  if (id.includes('nut')) {
    return PRODUCTS.find((p) => p.id === 'ermak-nuts') || PRODUCTS[0];
  }
  if (id === 'oil-olive' || id.includes('olive')) {
    return PRODUCTS.find((p) => p.id === 'nutria-olive-oil') || PRODUCTS[0];
  }
  if (id === 'oil-sunflower' || id.includes('sunflower')) {
    return PRODUCTS.find((p) => p.id === 'nutri-nova-sunflower-oil' || p.id === 'nutrinova-sunflower-oil') || PRODUCTS[0];
  }
  if (id.includes('seaweed')) {
    return PRODUCTS.find((p) => p.id === 'seawaa-seaweed-snacks') || PRODUCTS[0];
  }

  return PRODUCTS[0];
};

export interface CategoryInfo {
  id: CategoryId;
  label: string;
}

export const CATEGORIES_LIST: CategoryInfo[] = [
  { id: 'all', label: 'All Products' },
  { id: 'juices', label: 'Juices' },
  { id: 'nuts', label: 'Nuts' },
  { id: 'olive-oil', label: 'Olive Oil' },
  { id: 'sunflower-oil', label: 'Sunflower Oil' },
  { id: 'seaweed', label: 'Seaweed Crunch' },
  { id: 'water', label: 'Thermal Mineral Water' },
  { id: 'wellness-shots', label: 'Wellness Shots' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'fruits', label: 'Dried Fruits' },
  { id: 'dairy', label: 'Dairy & Cheeses' },
  { id: 'seafood', label: 'Seafood' },
  { id: 'specialty', label: 'Specialty Foods' },
];

export interface CategoryCardData {
  id: CategoryId;
  title: string;
  description: string;
  itemCount: string;
  image: string;
}

export const CATEGORY_CARDS: CategoryCardData[] = [
  {
    id: 'juices',
    title: 'Cold-Pressed Juices',
    description: 'Sun-ripened pure vitality sourced from Central Asian orchards.',
    itemCount: 'Curated Harvest',
    image:
      'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'nuts',
    title: 'Selection Dried Nuts',
    description: 'Primal energy and slow-roasted crunch from fertile mountain terraces.',
    itemCount: 'Artisan Terraces',
    image:
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'olive-oil',
    title: 'Extra Virgin Olive Oil',
    description: 'Liquid gold handpicked and cold-pressed from generational Greek groves.',
    itemCount: 'Mediterranean Gold',
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sunflower-oil',
    title: 'Cold-Pressed Sunflower Oil',
    description: 'Clean, versatile light cooking oil with a high natural smoke point.',
    itemCount: 'Pure Golden',
    image:
      'https://images.unsplash.com/photo-1607672632458-9eb56696346b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'seaweed',
    title: 'SeaCrunch Seaweed Snacks',
    description: 'Double-roasted ocean crunch from cold South Korean coastal waters.',
    itemCount: 'Marine Minerals',
    image:
      'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'water',
    title: 'Thermal Mineral Water',
    description: '22 vital minerals and natural iodine from Chartak artesian springs.',
    itemCount: 'Legendary Medicinal',
    image:
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=900&q=80',
  },
];

export interface CategoryTheme {
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  borderAccent: string;
  accentBtn: string;
}

export const CATEGORY_THEMES: Record<CategoryId, CategoryTheme> = {
  all: {
    accentColor: '#243B2E',
    badgeBg: 'bg-[#243B2E]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#243B2E]',
    borderAccent: 'hover:border-[#243B2E]',
    accentBtn: 'bg-[#243B2E] text-white hover:bg-[#182C20]',
  },
  juices: {
    accentColor: '#C8572D',
    badgeBg: 'bg-[#C8572D]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#C8572D]',
    borderAccent: 'hover:border-[#C8572D]',
    accentBtn: 'bg-[#C8572D] text-white hover:bg-[#AF4720]',
  },
  nuts: {
    accentColor: '#D99227',
    badgeBg: 'bg-[#D99227]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#D99227]',
    borderAccent: 'hover:border-[#D99227]',
    accentBtn: 'bg-[#D99227] text-white hover:bg-[#BF7E1C]',
  },
  'olive-oil': {
    accentColor: '#55705E',
    badgeBg: 'bg-[#55705E]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#55705E]',
    borderAccent: 'hover:border-[#55705E]',
    accentBtn: 'bg-[#243B2E] text-white hover:bg-[#1A2D22]',
  },
  'sunflower-oil': {
    accentColor: '#EAA532',
    badgeBg: 'bg-[#EAA532]',
    badgeText: 'text-[#1E2721]',
    badgeBorder: 'border-[#EAA532]',
    borderAccent: 'hover:border-[#EAA532]',
    accentBtn: 'bg-[#EAA532] text-[#1E2721] hover:bg-[#D49326]',
  },
  seaweed: {
    accentColor: '#1F4736',
    badgeBg: 'bg-[#1F4736]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#1F4736]',
    borderAccent: 'hover:border-[#1F4736]',
    accentBtn: 'bg-[#1F4736] text-white hover:bg-[#153426]',
  },
  water: {
    accentColor: '#1A6485',
    badgeBg: 'bg-[#1A6485]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#1A6485]',
    borderAccent: 'hover:border-[#1A6485]',
    accentBtn: 'bg-[#1A6485] text-white hover:bg-[#134D66]',
  },
  'wellness-shots': {
    accentColor: '#964415',
    badgeBg: 'bg-[#964415]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#964415]',
    borderAccent: 'hover:border-[#964415]',
    accentBtn: 'bg-[#964415] text-white hover:bg-[#783610]',
  },
  snacks: {
    accentColor: '#A0522D',
    badgeBg: 'bg-[#A0522D]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#A0522D]',
    borderAccent: 'hover:border-[#A0522D]',
    accentBtn: 'bg-[#A0522D] text-white hover:bg-[#804224]',
  },
  fruits: {
    accentColor: '#B85E1A',
    badgeBg: 'bg-[#B85E1A]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#B85E1A]',
    borderAccent: 'hover:border-[#B85E1A]',
    accentBtn: 'bg-[#B85E1A] text-white hover:bg-[#944A14]',
  },
  dairy: {
    accentColor: '#2B5B44',
    badgeBg: 'bg-[#2B5B44]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#2B5B44]',
    borderAccent: 'hover:border-[#2B5B44]',
    accentBtn: 'bg-[#2B5B44] text-white hover:bg-[#1F4232]',
  },
  seafood: {
    accentColor: '#1E6075',
    badgeBg: 'bg-[#1E6075]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#1E6075]',
    borderAccent: 'hover:border-[#1E6075]',
    accentBtn: 'bg-[#1E6075] text-white hover:bg-[#154656]',
  },
  specialty: {
    accentColor: '#4A3B32',
    badgeBg: 'bg-[#4A3B32]',
    badgeText: 'text-white',
    badgeBorder: 'border-[#4A3B32]',
    borderAccent: 'hover:border-[#4A3B32]',
    accentBtn: 'bg-[#4A3B32] text-white hover:bg-[#382C25]',
  },
};
