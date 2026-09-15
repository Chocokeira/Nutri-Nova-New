import { supabase, isSupabaseConfigured } from './supabase';
import { AdminUser } from '../types';
import { User, Session } from '@supabase/supabase-js';

export interface AuthAdminResult {
  user: User | null;
  adminRecord: AdminUser | null;
  isAdmin: boolean;
  error?: string;
}

export const authService = {
  /**
   * Check if Supabase environment variables are present.
   */
  isConfigured(): boolean {
    return isSupabaseConfigured && supabase !== null;
  },

  /**
   * Get the current active session.
   */
  async getSession(): Promise<Session | null> {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) return null;
      return data.session;
    } catch {
      return null;
    }
  },

  /**
   * Get the current authenticated Supabase user.
   */
  async getCurrentUser(): Promise<User | null> {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return null;
      return data.user;
    } catch {
      return null;
    }
  },

  /**
   * Verifies if a user ID is authorized in the `admin_users` table.
   * Compares `admin_users.user_id` with authenticated user's ID.
   */
  async verifyAdminStatus(
    userId: string,
    userEmail?: string
  ): Promise<{ isAdmin: boolean; adminRecord: AdminUser | null; error?: string }> {
    if (!supabase) {
      return { isAdmin: false, adminRecord: null, error: 'Supabase client is not configured' };
    }

    // Safe diagnostic logging (user ID and email only, no secrets/tokens)
    console.log('[Admin Auth Diagnostic] Authenticated user ID:', userId);
    console.log('[Admin Auth Diagnostic] Authenticated user email:', userEmail || '(not provided)');

    try {
      // Query admin_users comparing user_id with authenticated user's ID
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, user_id, email, role, created_at')
        .eq('user_id', userId)
        .maybeSingle();

      console.log('[Admin Auth Diagnostic] admin_users query result:', data);
      console.log('[Admin Auth Diagnostic] admin_users query error:', error);
      console.log('[Admin Auth Diagnostic] Admin record found:', Boolean(data));

      if (error) {
        console.error('[Admin Auth Diagnostic] Database error during admin query:', error);
        return {
          isAdmin: false,
          adminRecord: null,
          error: `Database/RLS Error (${error.code || 'QueryFailed'}): ${error.message}`,
        };
      }

      if (!data) {
        return {
          isAdmin: false,
          adminRecord: null,
          error: `User ID (${userId}) was not found in the public.admin_users table (checked user_id column).`,
        };
      }

      return {
        isAdmin: true,
        adminRecord: data as AdminUser,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown authorization error';
      console.error('[Admin Auth Diagnostic] Unexpected exception during authorization:', err);
      return { isAdmin: false, adminRecord: null, error: message };
    }
  },

  /**
   * Sign in with Email and Password, then verify authorization against admin_users.
   */
  async signIn(email: string, password: string): Promise<AuthAdminResult> {
    if (!supabase) {
      return {
        user: null,
        adminRecord: null,
        isAdmin: false,
        error: 'Supabase credentials are not configured in environment variables (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).',
      };
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError || !authData.user) {
        return {
          user: null,
          adminRecord: null,
          isAdmin: false,
          error: authError?.message || 'Invalid email or password.',
        };
      }

      // Query admin_users table
      const { isAdmin, adminRecord, error: adminError } = await this.verifyAdminStatus(
        authData.user.id,
        authData.user.email
      );

      if (!isAdmin) {
        return {
          user: authData.user,
          adminRecord: null,
          isAdmin: false,
          error: adminError || 'Access Denied: This account is authenticated but not authorized in the admin_users table.',
        };
      }

      return {
        user: authData.user,
        adminRecord,
        isAdmin: true,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed unexpectedly';
      return {
        user: null,
        adminRecord: null,
        isAdmin: false,
        error: message,
      };
    }
  },

  /**
   * Sign out the current user.
   */
  async signOut(): Promise<{ error?: string }> {
    if (!supabase) return {};
    try {
      const { error } = await supabase.auth.signOut();
      if (error) return { error: error.message };
      return {};
    } catch (err: unknown) {
      return { error: err instanceof Error ? err.message : 'Logout failed' };
    }
  },

  /**
   * Listen to Supabase auth state changes.
   */
  onAuthStateChange(callback: (session: Session | null) => void) {
    if (!supabase) return { unsubscribe: () => {} };
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
    return subscription;
  },
};
