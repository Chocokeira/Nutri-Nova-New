import React, { useState } from 'react';
import {
  Package,
  CheckCircle,
  FileEdit,
  Layers,
  Plus,
  ArrowRight,
  RefreshCw,
  Database,
  ExternalLink,
} from 'lucide-react';
import { Product, AdminRoute } from '../../types';
import { productService } from '../../services/productService';
import { isSupabaseConfigured } from '../../services/supabase';

interface AdminDashboardOverviewProps {
  products: Product[];
  onNavigate: (route: AdminRoute, productId?: string) => void;
  onRefreshProducts: () => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  products,
  onNavigate,
  onRefreshProducts,
}) => {
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);

  const totalProducts = products.length;
  const publishedProducts = products.filter((p) => p.published !== false).length;
  const draftProducts = products.filter((p) => p.published === false).length;
  const categoriesCount = new Set(products.map((p) => p.category)).size;

  const recentProducts = [...products]
    .sort((a, b) => {
      const timeA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const timeB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return timeB - timeA;
    })
    .slice(0, 6);

  const handleSeedProducts = async () => {
    if (!window.confirm('This will insert/update the existing Nutri Nova catalogue into your Supabase products table. Proceed?')) {
      return;
    }
    setSeeding(true);
    setSeedResult(null);
    try {
      const res = await productService.seedExistingProducts();
      if (res.error) {
        setSeedResult(`Seeding failed: ${res.error}`);
      } else {
        setSeedResult(`Successfully synced ${res.count} products to Supabase!`);
        onRefreshProducts();
      }
    } catch (err) {
      setSeedResult(err instanceof Error ? err.message : 'Failed to seed products');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#18261E]">
            Catalogue Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#67776B]">
            Overview of Nutri Nova product inventory, publication status, and catalog content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefreshProducts}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#D5CDBF] text-xs font-medium text-[#4B5E51] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => onNavigate('product-new')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#14221A] hover:bg-[#20382B] text-white text-xs font-semibold tracking-wide transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Supabase Sync Banner */}
      {isSupabaseConfigured && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E0D9C8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#18261E]">
              <Database className="w-4 h-4 text-[#2E543F]" />
              <span>Supabase Database Synchronization</span>
            </div>
            <p className="text-xs text-[#6A7B70]">
              Sync existing hard-coded product catalog records into your Supabase <code className="font-mono bg-[#F2EDE2] px-1 py-0.5 rounded text-[#14221A]">products</code> table.
            </p>
            {seedResult && (
              <div className="text-xs font-medium text-[#2E543F] pt-1">{seedResult}</div>
            )}
          </div>

          <button
            onClick={handleSeedProducts}
            disabled={seeding}
            className="shrink-0 px-4 py-2 rounded-xl bg-[#234A38] hover:bg-[#2E5F49] text-white text-xs font-medium transition-colors disabled:opacity-50 cursor-pointer"
          >
            {seeding ? 'Syncing...' : 'Sync Catalog to Supabase'}
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Products */}
        <div className="p-5 rounded-2xl bg-white border border-[#E0D9C8] shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#68796D]">
            <span className="text-xs font-medium uppercase tracking-wider">Total Products</span>
            <div className="p-2 rounded-xl bg-[#F4EFE6] text-[#18261E]">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#18261E]">{totalProducts}</div>
          <div className="text-[11px] text-[#7A8C80]">
            Complete registered catalog items
          </div>
        </div>

        {/* Published Products */}
        <div className="p-5 rounded-2xl bg-white border border-[#E0D9C8] shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#68796D]">
            <span className="text-xs font-medium uppercase tracking-wider">Published</span>
            <div className="p-2 rounded-xl bg-[#EAF7EE] text-[#2E7D46]">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#2E7D46]">{publishedProducts}</div>
          <div className="text-[11px] text-[#7A8C80]">
            Visible on the live public website
          </div>
        </div>

        {/* Draft Products */}
        <div className="p-5 rounded-2xl bg-white border border-[#E0D9C8] shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#68796D]">
            <span className="text-xs font-medium uppercase tracking-wider">Drafts</span>
            <div className="p-2 rounded-xl bg-[#FFF5E6] text-[#C47D1C]">
              <FileEdit className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#C47D1C]">{draftProducts}</div>
          <div className="text-[11px] text-[#7A8C80]">
            Hidden from public visitors
          </div>
        </div>

        {/* Categories */}
        <div className="p-5 rounded-2xl bg-white border border-[#E0D9C8] shadow-2xs space-y-3">
          <div className="flex items-center justify-between text-[#68796D]">
            <span className="text-xs font-medium uppercase tracking-wider">Categories</span>
            <div className="p-2 rounded-xl bg-[#EBF3FB] text-[#2C6EA8]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-[#18261E]">{categoriesCount}</div>
          <div className="text-[11px] text-[#7A8C80]">
            Active distinct harvest groupings
          </div>
        </div>
      </div>

      {/* Recently Updated Products Section */}
      <div className="bg-white rounded-2xl border border-[#E0D9C8] shadow-2xs overflow-hidden space-y-0">
        <div className="p-5 border-b border-[#EAE3D6] flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-[#18261E]">
              Recently Updated Products
            </h2>
            <p className="text-xs text-[#6A7C6F]">
              Latest modified products in the Nutri Nova catalog.
            </p>
          </div>
          <button
            onClick={() => onNavigate('products')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#244534] hover:text-[#18261E] transition-colors cursor-pointer"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#EAE3D6] overflow-x-auto">
          {recentProducts.map((p) => (
            <div
              key={p.id}
              className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-[#FAF8F5] transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[#E0D9C8] shrink-0 bg-[#F4EFE6]"
                />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-[#18261E] truncate">
                    {p.name}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#6E7F73]">
                    <span className="capitalize">{p.category.replace('-', ' ')}</span>
                    <span>•</span>
                    <span>{p.origin || 'Single-Estate Origin'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                    p.published !== false
                      ? 'bg-[#E7F6EC] text-[#246A3D]'
                      : 'bg-[#FFF3DF] text-[#A66312]'
                  }`}
                >
                  {p.published !== false ? 'Published' : 'Draft'}
                </span>

                <button
                  onClick={() => onNavigate('product-edit', p.id)}
                  className="px-3 py-1.5 rounded-lg border border-[#D5CDBF] text-xs font-medium text-[#2F4437] hover:bg-[#EAE3D5] transition-colors cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
