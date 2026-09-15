import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  SlidersHorizontal,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import { Product, AdminRoute, CategoryId } from '../../types';
import { productService } from '../../services/productService';

interface AdminProductsListViewProps {
  products: Product[];
  onNavigate: (route: AdminRoute, productId?: string) => void;
  onRefreshProducts: () => void;
}

export const AdminProductsListView: React.FC<AdminProductsListViewProps> = ({
  products,
  onNavigate,
  onRefreshProducts,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [deleteModalProduct, setDeleteModalProduct] = useState<Product | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Status filter
      if (statusFilter === 'published' && p.published === false) return false;
      if (statusFilter === 'draft' && p.published !== false) return false;

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCat = p.category.toLowerCase().includes(q);
        const matchOrigin = (p.origin || '').toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchOrigin) return false;
      }

      return true;
    });
  }, [products, statusFilter, selectedCategory, searchQuery]);

  const handleTogglePublish = async (product: Product) => {
    setActionLoadingId(product.id);
    setFeedbackMessage(null);
    try {
      const res = await productService.togglePublishStatus(product.id, product.published !== false);
      if (res.error) {
        setFeedbackMessage({ text: res.error, isError: true });
      } else {
        const statusStr = res.newStatus ? 'published' : 'saved as draft';
        setFeedbackMessage({ text: `Product "${product.name}" is now ${statusStr}.` });
        onRefreshProducts();
      }
    } catch (err) {
      setFeedbackMessage({
        text: err instanceof Error ? err.message : 'Action failed',
        isError: true,
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalProduct) return;
    const prodId = deleteModalProduct.id;
    setActionLoadingId(prodId);
    try {
      const res = await productService.deleteProduct(prodId);
      if (res.error) {
        setFeedbackMessage({ text: res.error, isError: true });
      } else {
        setFeedbackMessage({ text: `Product "${deleteModalProduct.name}" was deleted successfully.` });
        setDeleteModalProduct(null);
        onRefreshProducts();
      }
    } catch (err) {
      setFeedbackMessage({
        text: err instanceof Error ? err.message : 'Delete failed',
        isError: true,
      });
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#18261E]">
            Products Management
          </h1>
          <p className="text-xs sm:text-sm text-[#67776B]">
            Manage catalogue provisions, editorial positioning, and publication states.
          </p>
        </div>

        <button
          onClick={() => onNavigate('product-new')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#14221A] hover:bg-[#20382B] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Feedback Banner */}
      {feedbackMessage && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center justify-between gap-3 ${
            feedbackMessage.isError
              ? 'bg-[#FDF2F0] border border-[#F5C2BA] text-[#A62C1E]'
              : 'bg-[#EDF8F1] border border-[#C6EBD3] text-[#1E6838]'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMessage.isError ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{feedbackMessage.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Controls / Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#809184]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product name, category, or origin..."
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] placeholder-[#9CA99E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C] transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Status Pills */}
            <div className="flex items-center bg-[#FAF8F5] border border-[#D5CDBF] p-1 rounded-xl text-xs">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  statusFilter === 'all'
                    ? 'bg-[#18261E] text-white'
                    : 'text-[#586A5E] hover:text-[#18261E]'
                }`}
              >
                All ({products.length})
              </button>
              <button
                onClick={() => setStatusFilter('published')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  statusFilter === 'published'
                    ? 'bg-[#18261E] text-white'
                    : 'text-[#586A5E] hover:text-[#18261E]'
                }`}
              >
                Published ({products.filter((p) => p.published !== false).length})
              </button>
              <button
                onClick={() => setStatusFilter('draft')}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  statusFilter === 'draft'
                    ? 'bg-[#18261E] text-white'
                    : 'text-[#586A5E] hover:text-[#18261E]'
                }`}
              >
                Drafts ({products.filter((p) => p.published === false).length})
              </button>
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] font-medium focus:outline-none focus:ring-2 focus:ring-[#1E3B2C] cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.replace('-', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table (Desktop) / Cards (Mobile) */}
      <div className="bg-white rounded-2xl border border-[#E0D9C8] shadow-2xs overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="text-sm font-medium text-[#18261E]">No products match your filter criteria</div>
            <p className="text-xs text-[#738377]">
              Try adjusting your search query, status, or category selection.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#2A3B30]">
              <thead className="bg-[#F8F6F1] border-b border-[#EAE3D6] text-[11px] font-semibold text-[#5A6D60] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Product</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Origin / Harvest</th>
                  <th className="py-3.5 px-4">Last Updated</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D6]">
                {filteredProducts.map((p) => {
                  const isPublished = p.published !== false;
                  const isLoading = actionLoadingId === p.id;
                  return (
                    <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                      {/* Product Image & Name */}
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-xl object-cover border border-[#E0D9C8] shrink-0 bg-[#F4EFE6]"
                          />
                          <div className="min-w-0">
                            <div className="font-semibold text-xs sm:text-sm text-[#18261E] truncate max-w-[220px]">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-[#718275] truncate max-w-[220px]">
                              {p.tagline || p.positioning || 'Nutri Nova Curated Portfolio'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="inline-block px-2.5 py-0.5 rounded-lg bg-[#F0ECE1] text-[#34463A] text-[11px] font-medium capitalize">
                          {p.category.replace('-', ' ')}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleTogglePublish(p)}
                          disabled={isLoading}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                            isPublished
                              ? 'bg-[#E7F6EC] text-[#246A3D] hover:bg-[#D4EEDC]'
                              : 'bg-[#FFF3DF] text-[#A66312] hover:bg-[#FEE5C2]'
                          }`}
                          title="Click to toggle status"
                        >
                          {isLoading ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                          ) : isPublished ? (
                            <Eye className="w-3 h-3" />
                          ) : (
                            <EyeOff className="w-3 h-3" />
                          )}
                          <span>{isPublished ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>

                      {/* Origin */}
                      <td className="py-3.5 px-4 text-[#526458] truncate max-w-[180px]">
                        {p.origin || p.harvestOrigin || '—'}
                      </td>

                      {/* Last Updated */}
                      <td className="py-3.5 px-4 font-mono text-[11px] text-[#6E7F73]">
                        {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : p.dateAdded || '—'}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => onNavigate('product-edit', p.id)}
                            className="p-1.5 rounded-lg text-[#234A38] hover:bg-[#EAE3D5] transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteModalProduct(p)}
                            className="p-1.5 rounded-lg text-[#B83E31] hover:bg-[#FBEBE8] transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-xl border border-[#E0D9C8]">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF0EE] text-[#C0392B] border border-[#F5C2BA] flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#18261E]">
                Delete Product?
              </h3>
              <p className="text-xs text-[#637367]">
                Are you sure you want to delete <strong className="text-[#18261E]">{deleteModalProduct.name}</strong>? This will remove it from the Supabase catalogue.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteModalProduct(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-[#4D6053] hover:bg-[#FAF8F5] border border-[#D5CDBF] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={Boolean(actionLoadingId)}
                className="px-4 py-2 rounded-xl bg-[#C0392B] hover:bg-[#A93226] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                {actionLoadingId ? 'Deleting...' : 'Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
