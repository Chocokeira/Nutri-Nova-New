import React from 'react';
import { ShieldAlert, LogOut, ArrowLeft } from 'lucide-react';

interface AdminAccessDeniedViewProps {
  userEmail?: string;
  userId?: string;
  errorMessage?: string;
  onLogout: () => void;
  onViewPublicSite: () => void;
}

export const AdminAccessDeniedView: React.FC<AdminAccessDeniedViewProps> = ({
  userEmail,
  userId,
  errorMessage,
  onLogout,
  onViewPublicSite,
}) => {
  return (
    <div className="min-h-screen bg-[#F0EDE6] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 sm:px-10 rounded-2xl shadow-sm border border-[#E8D4D0] text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#FDF0EE] text-[#C0392B] border border-[#F5C2BA] flex items-center justify-center mx-auto shadow-xs">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="font-serif text-2xl font-bold text-[#14221A]">
              Access Denied
            </h1>
            <p className="text-xs text-[#6B7C70] leading-relaxed">
              Your account <strong className="text-[#14221A]">{userEmail || 'user'}</strong> is authenticated, but could not be authorized against the <code className="font-mono bg-[#F2EDE2] px-1 py-0.5 rounded text-[#14221A]">admin_users</code> table.
            </p>
            {userId && (
              <p className="text-[11px] text-[#8C9B90] font-mono">
                Auth User ID: {userId}
              </p>
            )}
            {errorMessage && (
              <div className="mt-2 p-3 rounded-xl bg-[#FDF2F0] border border-[#F5C2BA] text-xs text-[#A93226] text-left leading-relaxed">
                <span className="font-semibold block mb-0.5">Details:</span>
                <span className="font-mono text-[11px] break-all">{errorMessage}</span>
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5DEC9] text-left text-xs text-[#526457] space-y-2">
            <div className="font-semibold text-[#18261E]">How to authorize this account:</div>
            <p className="text-[11px] leading-relaxed">
              In your Supabase project, execute an SQL insert or add a row in the <code className="font-mono text-[#18261E]">admin_users</code> table matching this user's Auth UUID.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#C0392B] hover:bg-[#A93226] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out Current Account</span>
            </button>

            <button
              onClick={onViewPublicSite}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#EAE3D5] text-[#18261E] text-xs font-medium border border-[#D5CDBF] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
