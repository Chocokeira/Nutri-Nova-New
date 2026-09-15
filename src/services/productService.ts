import { supabase, isSupabaseConfigured, STORAGE_BUCKET_PRODUCT_IMAGES } from './supabase';
import { Product, CategoryId } from '../types';
import { PRODUCTS } from '../data/products';

export interface DbProductRow {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description?: string | null;
  description: string;
  positioning?: string | null;
  story?: string | null;
  origin?: string | null;
  sourcing?: string | null;
  characteristics?: string[] | null;
  specifications?: Record<string, string> | null;
  packaging?: any | null;
  main_image: string;
  additional_images?: string[] | null;
  published?: boolean;
  created_at?: string;
  updated_at?: string;
}

/**
 * Validates if a string is a valid UUID
 */
export function isValidUuid(val?: string | null): boolean {
  if (!val) return false;
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val);
}

/**
 * Maps a Supabase DB row to the frontend Product model
 */
export function mapRowToProduct(row: DbProductRow): Product {
  const mainImg = row.main_image || '';
  const additionalImgs = Array.isArray(row.additional_images) ? row.additional_images : [];
  const secondaryImg = additionalImgs[0] || undefined;
  const packagingSpecs = Array.isArray(row.packaging) ? row.packaging : [];

  return {
    id: row.id,
    name: row.name,
    slug: row.slug || undefined,
    category: (row.category || 'specialty') as CategoryId,
    shortDescription: row.short_description || undefined,
    short_description: row.short_description || undefined,
    description: row.description || '',
    positioning: row.positioning || undefined,
    story: row.story || undefined,
    origin: row.origin || undefined,
    sourcing: row.sourcing || undefined,
    characteristics: Array.isArray(row.characteristics) ? row.characteristics : [],
    specifications: row.specifications || {},
    packaging: row.packaging || undefined,
    packagingSpecs,
    image: mainImg,
    mainImage: mainImg,
    main_image: mainImg,
    secondaryImage: secondaryImg,
    galleryImages: additionalImgs,
    additionalImages: additionalImgs,
    additional_images: additionalImgs,
    price: 0, // Profile catalogue: price field is omitted
    sizes: packagingSpecs.map((p: any) => p.format || '').filter(Boolean),
    ingredients: [],
    nutrition: {
      servingSize: '1 serving',
      calories: 0,
      protein: '0g',
      carbs: '0g',
      fat: '0g',
    },
    featured: false,
    curatedPortfolio: true,
    inStock: true,
    published: row.published !== false,
    rating: 5.0,
    reviewCount: 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    dateAdded: row.created_at ? row.created_at.split('T')[0] : '2026-08-01',
  };
}

/**
 * Maps a frontend Product to a Supabase DB row
 * Uses strictly the columns that exist in public.products
 */
export function mapProductToRow(product: Partial<Product>): Partial<DbProductRow> {
  const slug =
    product.slug ||
    product.name
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') ||
    'product';

  const mainImage = product.main_image || product.mainImage || product.image || '';
  const additionalImages =
    product.additional_images ||
    product.additionalImages ||
    product.galleryImages ||
    (product.secondaryImage ? [product.secondaryImage] : []);

  const row: Partial<DbProductRow> = {
    name: product.name || '',
    slug,
    category: product.category || 'specialty',
    short_description: product.short_description || product.shortDescription || null,
    description: product.description || '',
    positioning: product.positioning || null,
    story: product.story || null,
    origin: product.origin || null,
    sourcing: product.sourcing || null,
    characteristics: Array.isArray(product.characteristics) ? product.characteristics : [],
    specifications: product.specifications || {},
    packaging:
      product.packaging ||
      (product.packagingSpecs && product.packagingSpecs.length > 0 ? product.packagingSpecs : null),
    main_image: mainImage,
    additional_images: additionalImages,
    published: product.published !== false,
    updated_at: new Date().toISOString(),
  };

  if (product.id && isValidUuid(product.id)) {
    row.id = product.id;
  }

  return row;
}

export const productService = {
  /**
   * Fetch published products for the public website.
   * Falls back to hardcoded PRODUCTS if Supabase is not configured or table has 0 rows.
   */
  async getPublishedProducts(): Promise<{ products: Product[]; isFromSupabase: boolean; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { products: PRODUCTS.map((p) => ({ ...p, published: true })), isFromSupabase: false };
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase getPublishedProducts error, falling back to local data:', error.message);
        return {
          products: PRODUCTS.map((p) => ({ ...p, published: true })),
          isFromSupabase: false,
          error: error.message,
        };
      }

      if (!data || data.length === 0) {
        // Table exists but is empty; fallback so public site displays product catalog
        return { products: PRODUCTS.map((p) => ({ ...p, published: true })), isFromSupabase: false };
      }

      const products = data.map((row: DbProductRow) => mapRowToProduct(row));
      return { products, isFromSupabase: true };
    } catch (err) {
      console.warn('Exception during getPublishedProducts:', err);
      return { products: PRODUCTS.map((p) => ({ ...p, published: true })), isFromSupabase: false };
    }
  },

  /**
   * Fetch all products (including drafts) for the Admin Dashboard.
   */
  async getAllAdminProducts(): Promise<{ products: Product[]; isFromSupabase: boolean; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { products: PRODUCTS.map((p) => ({ ...p, published: true })), isFromSupabase: false };
    }

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        return {
          products: PRODUCTS.map((p) => ({ ...p, published: true })),
          isFromSupabase: false,
          error: error.message,
        };
      }

      if (!data || data.length === 0) {
        return { products: PRODUCTS.map((p) => ({ ...p, published: true })), isFromSupabase: false };
      }

      const products = data.map((row: DbProductRow) => mapRowToProduct(row));
      return { products, isFromSupabase: true };
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch products';
      return { products: PRODUCTS.map((p) => ({ ...p, published: true })), isFromSupabase: false, error: msg };
    }
  },

  /**
   * Fetch a single product by ID (either from Supabase or fallback)
   */
  async getProductById(id: string): Promise<Product | null> {
    if (supabase && isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!error && data) {
          return mapRowToProduct(data as DbProductRow);
        }
      } catch {
        // Fall back to static catalogue
      }
    }

    const fallback = PRODUCTS.find((p) => p.id === id);
    return fallback ? { ...fallback, published: true } : null;
  },

  /**
   * Create or update a product in Supabase.
   */
  async saveProduct(product: Partial<Product>, isNew = false): Promise<{ product?: Product; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { error: 'Supabase is not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.' };
    }

    try {
      const hasValidUuid = Boolean(product.id && isValidUuid(product.id));
      const shouldInsert = isNew || !hasValidUuid;

      const row = mapProductToRow(product);

      if (shouldInsert) {
        if (!hasValidUuid) {
          delete row.id;
        }

        const { data, error } = await supabase
          .from('products')
          .insert([row])
          .select('*')
          .single();

        if (error) return { error: error.message };
        return { product: mapRowToProduct(data as DbProductRow) };
      } else {
        const { data, error } = await supabase
          .from('products')
          .update(row)
          .eq('id', product.id!)
          .select('*')
          .single();

        if (error) return { error: error.message };
        return { product: mapRowToProduct(data as DbProductRow) };
      }
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Save product failed' };
    }
  },

  /**
   * Delete a product by ID from Supabase.
   */
  async deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured.' };
    }

    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) return { success: false, error: error.message };
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Delete failed' };
    }
  },

  /**
   * Toggle published / draft status.
   */
  async togglePublishStatus(id: string, currentPublished: boolean): Promise<{ success: boolean; newStatus?: boolean; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, error: 'Supabase is not configured.' };
    }

    try {
      const nextStatus = !currentPublished;
      const { error } = await supabase
        .from('products')
        .update({ published: nextStatus, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) return { success: false, error: error.message };
      return { success: true, newStatus: nextStatus };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : 'Toggle failed' };
    }
  },

  /**
   * Upload an image to Supabase Storage 'product-images' bucket.
   */
  async uploadProductImage(file: File): Promise<{ publicUrl?: string; storagePath?: string; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { error: 'Supabase is not configured. Unable to upload to Supabase Storage.' };
    }

    try {
      // Clean and sanitize file name
      const fileExt = file.name.split('.').pop() || 'jpg';
      const cleanBase = file.name
        .substring(0, file.name.lastIndexOf('.'))
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-');
      const filePath = `products/${Date.now()}-${cleanBase}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET_PRODUCT_IMAGES)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        return { error: `Storage upload failed: ${error.message}. Ensure the '${STORAGE_BUCKET_PRODUCT_IMAGES}' bucket exists in Supabase and RLS policies allow authenticated inserts.` };
      }

      // Get public URL
      const { data: publicData } = supabase.storage
        .from(STORAGE_BUCKET_PRODUCT_IMAGES)
        .getPublicUrl(data.path);

      return {
        publicUrl: publicData.publicUrl,
        storagePath: data.path,
      };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Image upload failed' };
    }
  },

  /**
   * Helper to seed existing hardcoded PRODUCTS into Supabase table.
   * Admins can trigger this with 1 click from the dashboard if the table is empty!
   */
  async seedExistingProducts(): Promise<{ count: number; error?: string }> {
    if (!supabase || !isSupabaseConfigured) {
      return { count: 0, error: 'Supabase is not configured.' };
    }

    try {
      const rows = PRODUCTS.map((p) => ({
        ...mapProductToRow(p),
        id: p.id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase.from('products').upsert(rows, { onConflict: 'id' });

      if (error) return { count: 0, error: error.message };
      return { count: rows.length };
    } catch (err) {
      return { count: 0, error: err instanceof Error ? err.message : 'Seeding failed' };
    }
  },
};
