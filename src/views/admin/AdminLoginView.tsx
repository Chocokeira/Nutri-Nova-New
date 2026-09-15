import React, { useState } from 'react';
import { Shield, Lock, Mail, AlertCircle, ArrowLeft, Loader2, Database } from 'lucide-react';
import { authService } from '../../services/authService';
import { isSupabaseConfigured } from '../../services/supabase';
import { AdminUser } from '../../types';

interface AdminLoginViewProps {
  onLoginSuccess: (admin: AdminUser) => void;
  onViewPublicSite: () => void;
  accessDeniedError?: string | null;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({
  onLoginSuccess,
  onViewPublicSite,
  accessDeniedError,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(accessDeniedError || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await authService.signIn(email, password);

      if (!result.isAdmin || !result.adminRecord) {
        setError(
          result.error ||
            'Access Denied: Your account is authenticated, but your user ID was not found in the admin_users table.'
        );
        setLoading(false);
        return;
      }

      onLoginSuccess(result.adminRecord);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EDE6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-6">
        {/* Back Link */}
        <div>
          <button
            onClick={onViewPublicSite}
            className="inline-flex items-center gap-2 text-xs font-medium text-[#57685D] hover:text-[#18261E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Website</span>
          </button>
        </div>

        {/* Card Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#14221A] text-[#FAF8F5] border border-[#2E4536] shadow-sm">
            <Shield className="w-6 h-6 text-[#72C895]" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#14221A] tracking-tight">
            Nutri Nova Admin Portal
          </h1>
          <p className="text-xs text-[#607165]">
            Restricted access for authorized catalog administrators
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl shadow-sm border border-[#E0D9C8] space-y-6">
          {/* Supabase Status Notice if unconfigured */}
          {!isSupabaseConfigured && (
            <div className="p-3.5 rounded-xl bg-[#FFF9ED] border border-[#F0D59D] text-[#825316] text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-semibold">
                <Database className="w-4 h-4 text-[#C87E23]" />
                <span>Supabase Configuration Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Supabase environment variables (<code className="bg-[#FAF0DB] px-1 py-0.5 rounded font-mono">VITE_SUPABASE_URL</code> and <code className="bg-[#FAF0DB] px-1 py-0.5 rounded font-mono">VITE_SUPABASE_ANON_KEY</code>) must be configured in your environment to authenticate live admins.
              </p>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="p-3.5 rounded-xl bg-[#FDF2F0] border border-[#F5C2BA] text-[#A62C1E] text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#35453A] mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7D8F83]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nutri-nova.org"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#14221A] placeholder-[#9EAA9F] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#35453A] mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#7D8F83]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#14221A] placeholder-[#9EAA9F] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#14221A] hover:bg-[#1E3628] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Authorization...</span>
                  </>
                ) : (
                  <span>Sign In to Dashboard</span>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="pt-3 border-t border-[#EDE7D9] text-center text-[11px] text-[#788A7D]">
            Protected with Supabase Authentication and RLS policy verification on the <code className="font-mono text-[#18261E]">admin_users</code> table.
          </div>
        </div>
      </div>
    </div>
  );
};
