import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Clean and normalize Supabase URL to ensure no accidental subpaths (e.g., /rest/v1 or trailing slashes)
// which cause "Invalid path specified in request URL" errors.
function normalizeSupabaseUrl(rawUrl?: string): string {
  if (!rawUrl) return '';
  let url = rawUrl.trim().replace(/^['"]|['"]$/g, '');
  // Remove any trailing slashes
  url = url.replace(/\/+$/, '');
  // Remove accidental subpaths like /rest/v1, /auth/v1, etc.
  url = url.replace(/\/(rest|auth|storage)\/v\d+.*$/i, '');
  // Remove any remaining trailing slash
  return url.replace(/\/+$/, '');
}

function normalizeSupabaseKey(rawKey?: string): string {
  if (!rawKey) return '';
  return rawKey.trim().replace(/^['"]|['"]$/g, '');
}

export const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
export const rawSupabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);
export const supabaseAnonKey = normalizeSupabaseKey(rawSupabaseAnonKey);

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project-id') &&
  supabaseUrl.startsWith('http')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const STORAGE_BUCKET_PRODUCT_IMAGES = 'product-images';

