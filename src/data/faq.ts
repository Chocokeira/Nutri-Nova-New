import { FaqItem, FaqCategory } from '../types';

export const FAQ_CATEGORIES: { id: 'All' | FaqCategory; label: string }[] = [
  { id: 'All', label: 'All Questions' },
  { id: 'Products', label: 'Products' },
  { id: 'Ingredients', label: 'Ingredients' },
  { id: 'Nutrition', label: 'Nutrition' },
  { id: 'Ordering', label: 'Ordering' },
  { id: 'Shipping', label: 'Shipping' },
  { id: 'Storage', label: 'Storage' },
  { id: 'General', label: 'General' },
];

export const FAQS: FaqItem[] = [
  // ==========================================
  // PRODUCTS
  // ==========================================
  {
    id: 'faq-prod-1',
    category: 'Products',
    question: 'What products does Nutri Nova offer?',
    answer:
      'Nutri Nova currently offers five wholesome product lines: Cold-Pressed Juices (Orange, Berry, and Green Juice), Gently Dry-Roasted Nuts (Premium Almonds, Mixed Nuts, and Roasted Cashews), First Cold-Pressed Extra Virgin Olive Oil, Premium Cold-Pressed Sunflower Oil, and Crispy Roasted Seaweed Crunch (Original and Sesame). Each is crafted to make everyday wholesome eating easy and enjoyable.',
  },
  {
    id: 'faq-prod-2',
    category: 'Products',
    question: 'Are Nutri Nova products ready to consume right away?',
    answer:
      'Yes! All Nutri Nova snacks, juices, and culinary oils are ready to enjoy immediately. Whether pouring a chilled morning juice, snacking on roasted almonds at your desk, or drizzling extra virgin olive oil over dinner, they fit naturally into your daily routine.',
  },

  // ==========================================
  // INGREDIENTS
  // ==========================================
  {
    id: 'faq-ing-1',
    category: 'Ingredients',
    question: 'Are product ingredients listed on the packaging?',
    answer:
      'Yes, absolutely. We believe in complete transparency. Every single ingredient is clearly printed on our product labels and packaging in plain language, with zero hidden chemical additives, synthetic colors, or artificial preservatives.',
  },
  {
    id: 'faq-ing-2',
    category: 'Ingredients',
    question: 'Do Nutri Nova products contain artificial sweeteners or refined seed oils?',
    answer:
      'No. Our products are formulated with simple, recognizable ingredients. Our juices contain no added refined sugar or artificial sweeteners, and our cooking oils are purely mechanical cold-pressed without chemical solvents.',
  },

  // ==========================================
  // NUTRITION
  // ==========================================
  {
    id: 'faq-nut-1',
    category: 'Nutrition',
    question: 'Where can I find nutritional values for each product?',
    answer:
      'Nutritional facts are available on each individual product page under the "Nutrition Information" tab and printed on all commercial packages once released. Please note that values on the website during pre-launch are realistic placeholders designed to illustrate layout structure before final lab testing verification.',
  },
  {
    id: 'faq-nut-2',
    category: 'Nutrition',
    question: 'Does Nutri Nova make medicinal or health treatment claims?',
    answer:
      'No. Nutri Nova focuses strictly on providing clean, wholesome foods made with quality ingredients. We do not make medicinal claims or promise health cures; our goal is simply to make balanced everyday eating more accessible and enjoyable.',
  },

  // ==========================================
  // ORDERING & SOURCING
  // ==========================================
  {
    id: 'faq-ord-1',
    category: 'Ordering',
    question: 'How can partners and customers inquire about purchasing Nutri Nova products?',
    answer:
      'Nutri Nova operates as a premier wholesale and distribution food company. You can submit an inquiry directly through any product page or contact our customer support and distribution team at custsvc@nutri-nova.org or via WhatsApp (+65 9689 4176). We handle allocations, sample requests, and supply arrangements directly.',
  },
  {
    id: 'faq-ord-2',
    category: 'Ordering',
    question: 'Where are Nutri Nova products distributed and available?',
    answer:
      'Nutri Nova products are supplied to curated independent health grocers, specialty wellness retailers, hospitality partners, and direct bulk buyers. Contact our commercial team for regional stockist lists and supply partnership inquiries.',
  },

  // ==========================================
  // SHIPPING
  // ==========================================
  {
    id: 'faq-ship-1',
    category: 'Shipping',
    question: 'How will fresh juices and delicate oils be shipped?',
    answer:
      'Our fresh cold-pressed juices will be shipped in temperature-controlled, eco-friendly insulated packaging with reusable cold packs to ensure optimal temperature from our facility to your door. Oils and snacks are securely packed in recyclable protective materials.',
  },
  {
    id: 'faq-ship-2',
    category: 'Shipping',
    question: 'What regions will Nutri Nova ship to upon launch?',
    answer:
      'During our initial launch rollout, we will ship across the continental United States and selected metropolitan areas with expedited delivery. We plan to expand shipping zones as our logistics network grows.',
  },

  // ==========================================
  // STORAGE
  // ==========================================
  {
    id: 'faq-stor-1',
    category: 'Storage',
    question: 'How should Nutri Nova products be stored?',
    answer:
      'Storage recommendations vary by product category:\n• Juices: Keep refrigerated between 2°C and 4°C at all times and consume within 3 days after opening.\n• Olive Oil & Sunflower Oil: Store in a cool, dark cupboard away from direct sunlight and stovetop heat. Keep bottle tightly capped.\n• Nuts & Seaweed: Store in a cool, dry pantry in their resealable pouches.',
  },
  {
    id: 'faq-stor-2',
    category: 'Storage',
    question: 'How long do the culinary oils last once opened?',
    answer:
      'For the freshest culinary aroma and highest flavor profile, we recommend enjoying our Extra Virgin Olive Oil and Sunflower Oil within 3 to 6 months after opening, stored in a dark pantry cupboard.',
  },

  // ==========================================
  // GENERAL
  // ==========================================
  {
    id: 'faq-gen-1',
    category: 'General',
    question: 'How can I contact Nutri Nova?',
    answer:
      'You can reach our team any time via our Contact page form, by emailing custsvc@nutri-nova.org, or via WhatsApp at +65 96894176. For partnership, press, or wholesale distribution inquiries, please select the appropriate subject on the contact form, and our team will reply within 1–2 business days.',
  },
  {
    id: 'faq-gen-2',
    category: 'General',
    question: 'How can I stay updated on product launches and special offers?',
    answer:
      'You can reach out to our team at custsvc@nutri-nova.org or connect with us on WhatsApp at +65 96894176. We share harvest updates, batch availability, and seasonal offerings directly with our clients and partners.',
  },
];
