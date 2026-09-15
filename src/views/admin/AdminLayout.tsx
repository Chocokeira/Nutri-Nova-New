import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  HelpCircle,
  Info,
  LogOut,
  Globe,
  Menu,
  X,
  Shield,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { AdminRoute, AdminUser } from '../../types';
import { isSupabaseConfigured } from '../../services/supabase';

interface AdminLayoutProps {
  currentRoute: AdminRoute;
  onNavigate: (route: AdminRoute, productId?: string) => void;
  onLogout: () => void;
  adminUser: AdminUser | null;
  onViewPublicSite: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentRoute,
  onNavigate,
  onLogout,
  adminUser,
  onViewPublicSite,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { route: AdminRoute; label: string; icon: React.ReactNode }[] = [
    { route: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { route: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
    { route: 'product-new', label: 'Add Product', icon: <PlusCircle className="w-4 h-4" /> },
    { route: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
    { route: 'about', label: 'About Us', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#1E2922] flex flex-col md:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#18261E] text-[#FAF8F5] border-b border-[#293B30] sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#2E543F] flex items-center justify-center font-serif font-bold text-xs text-[#FAF8F5] border border-[#43755A]">
            NN
          </div>
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-[#FAF8F5]">Nutri Nova</div>
            <div className="text-[10px] text-[#A2B8AA] font-mono">Admin CMS</div>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg text-[#FAF8F5] hover:bg-[#263D30] transition-colors"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 h-screen w-64 bg-[#14221A] text-[#FAF8F5] flex flex-col justify-between border-r border-[#26392D] transition-transform duration-200 ease-in-out ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-[#24372B]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#234533] border border-[#3A6B53] flex items-center justify-center font-serif font-bold text-sm text-[#FAF8F5] shadow-sm">
              NN
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-serif text-base font-bold text-[#FAF8F5] tracking-tight truncate">
                Nutri Nova
              </h1>
              <p className="text-[11px] text-[#97AE9F] font-mono tracking-wider uppercase">
                Content Management
              </p>
            </div>
          </div>

          {/* Database Status Pill */}
          <div className="mt-4 pt-3 border-t border-[#23352A] flex items-center justify-between text-[11px]">
            <span className="text-[#88A291]">Supabase:</span>
            {isSupabaseConfigured ? (
              <span className="inline-flex items-center gap-1 text-[#5AC282] font-mono">
                <CheckCircle2 className="w-3 h-3" />
                <span>Connected</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-[#E5A93C] font-mono">
                <AlertTriangle className="w-3 h-3" />
                <span>Local Seed</span>
              </span>
            )}
          </div>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#7D9A86]">
            Catalog &amp; Content
          </div>
          {navItems.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => {
                  onNavigate(item.route);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#2E543F] text-white font-semibold shadow-sm border border-[#43755A]'
                    : 'text-[#D0DFD6] hover:bg-[#1E3326] hover:text-white'
                }`}
              >
                <span className={isActive ? 'text-[#FAF8F5]' : 'text-[#8EA897]'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-[#7D9A86]">
            Public Portal
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onViewPublicSite();
            }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#B8CCC0] hover:bg-[#1E3326] hover:text-white transition-all text-left cursor-pointer"
          >
            <span className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#8EA897]" />
              <span>View Public Site</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-[#6E8877]" />
          </button>
        </nav>

        {/* User Account & Logout */}
        <div className="p-3 border-t border-[#24372B] bg-[#101C15]">
          <div className="flex items-center gap-3 px-2 py-2 mb-2 rounded-lg bg-[#182A1F] border border-[#263E2F]">
            <div className="w-7 h-7 rounded-full bg-[#274A37] flex items-center justify-center text-xs font-bold text-[#FAF8F5]">
              <Shield className="w-3.5 h-3.5 text-[#68BA89]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-[#FAF8F5] truncate">
                {adminUser?.email || 'Authorized Admin'}
              </div>
              <div className="text-[10px] text-[#7A9884] font-mono uppercase">
                {adminUser?.role || 'admin_users'}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-[#E8927C] hover:bg-[#2C1814] hover:text-[#FFAAA0] transition-colors border border-transparent hover:border-[#6B3226] cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-[#E5DEC9] sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-2 text-xs text-[#6F7D73]">
            <span className="font-medium text-[#18261E]">Admin CMS</span>
            <span>/</span>
            <span className="capitalize font-semibold text-[#1A382B]">
              {currentRoute.replace('-', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onViewPublicSite}
              className="inline-flex items-center gap-1.5 text-xs text-[#526457] hover:text-[#18261E] font-medium transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </button>
            <div className="h-4 w-px bg-[#E5DEC9]" />
            <div className="flex items-center gap-2 text-xs font-mono text-[#4A5D50]">
              <span className="w-2 h-2 rounded-full bg-[#3FB950]" />
              <span className="max-w-[200px] truncate">{adminUser?.email}</span>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
          {children}
        </div>
      </main>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
        />
      )}
    </div>
  );
};
