export type CategoryId =
  | 'all'
  | 'juices'
  | 'nuts'
  | 'olive-oil'
  | 'sunflower-oil'
  | 'seaweed'
  | 'water'
  | 'wellness-shots'
  | 'snacks'
  | 'fruits'
  | 'dairy'
  | 'seafood'
  | 'specialty';

export interface ProductPackagingSpec {
  variety?: string;
  format?: string;
  packagingType?: string;
  cartonCount?: string;
}

export interface ProductNutrition {
  servingSize: string;
  calories: string | number;
  protein: string;
  carbs: string;
  fat: string;
  sugar?: string;
  sodium?: string;
  fiber?: string;
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  category: CategoryId;
  description: string;
  price: number;
  image: string;
  mainImage?: string;
  main_image?: string;
  sizes: string[];
  ingredients: string[];
  nutrition: ProductNutrition;
  featured: boolean;
  // Detail & presentation fields
  categoryLabel?: string;
  tagline?: string;
  shortDescription?: string;
  short_description?: string;
  positioning?: string;
  story?: string;
  origin?: string;
  sourcing?: string;
  characteristics?: string[];
  highlights?: string[];
  specifications?: Record<string, string>;
  packaging?: any;
  packagingSpecs?: ProductPackagingSpec[];
  mineralProfile?: { mineral: string; benefit: string }[];
  curatedPortfolio?: boolean;
  secondaryImage?: string;
  galleryImages?: string[];
  additionalImages?: string[];
  additional_images?: string[];
  servingSuggestions?: string[];
  storageInfo?: string;
  faq?: ProductFaq[];
  rating?: number;
  reviewCount?: number;
  volumeOrWeight?: string;
  badges?: string[];
  inStock?: boolean;
  dateAdded?: string;
  harvestOrigin?: string;
  culinaryPairing?: string;
  details?: string[];
  published?: boolean;
  updatedAt?: string;
  createdAt?: string;
}

export interface AdminUser {
  id: string;
  user_id?: string;
  email: string;
  role: string;
  created_at?: string;
}

export type AdminRoute =
  | 'dashboard'
  | 'products'
  | 'product-new'
  | 'product-edit'
  | 'faq'
  | 'about';

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  productMention?: string;
}

export type FaqCategory =
  | 'Products'
  | 'Ingredients'
  | 'Nutrition'
  | 'Ordering'
  | 'Shipping'
  | 'Storage'
  | 'General';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
}

export type PageView =
  | 'home'
  | 'products'
  | 'product-detail'
  | 'about'
  | 'faq'
  | 'contact';

export const formatPrice = (price: number): string => {
  return `Rp ${price.toLocaleString('id-ID')}`;
};

