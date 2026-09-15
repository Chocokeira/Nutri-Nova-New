import React, { useState, useMemo } from 'react';
import { Search, X, Eye, Mail } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CATEGORY_THEMES } from '../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onInquireProduct?: (product: Product) => void;
  products?: Product[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onInquireProduct,
  products = PRODUCTS,
}) => {
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return products;
    const lower = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        (p.tagline && p.tagline.toLowerCase().includes(lower)) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(lower)) ||
        p.description.toLowerCase().includes(lower) ||
        (p.origin && p.origin.toLowerCase().includes(lower)) ||
        (p.ingredients && p.ingredients.some((ing) => ing.toLowerCase().includes(lower)))
    );
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div
      id="search-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
    >
      <div
        id="search-modal-container"
        className="w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-xl border border-[#EBE4D8] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EAE3D6] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#718477] shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search products by harvest, origin, ingredients..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm sm:text-base text-[#18261E] placeholder-[#8A988F] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#718477] hover:text-[#18261E]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-full border border-[#E0D7C8] text-xs font-semibold text-[#18261E] hover:bg-[#FAF8F5] cursor-pointer"
          >
            Esc
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="flex items-center justify-between text-xs text-[#718477] px-1 pb-1">
            <span>
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </span>
            <span>Direct inquiries addressed to custsvc@nutri-nova.org</span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="font-serif text-lg font-bold text-[#18261E]">
                No matching products found
              </p>
              <p className="text-xs text-[#718477]">
                Try searching for "Greek Olive Oil", "Cold-Pressed Juice", or "Water".
              </p>
            </div>
          ) : (
            filteredProducts.map((p) => {
              const theme = CATEGORY_THEMES[p.category] || CATEGORY_THEMES.all;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-4 border border-[#EBE4D8] flex items-center justify-between gap-4 hover:border-[#1A382B]/40 transition-all shadow-xs group"
                >
                  <div
                    className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer"
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-14 h-14 rounded-xl object-cover border border-[#EBE4D8] shrink-0"
                    />
                    <div className="min-w-0">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText}`}
                      >
                        {p.categoryLabel}
                      </span>
                      <h4 className="font-serif text-sm font-bold text-[#18261E] group-hover:text-[#1A382B] transition-colors mt-0.5 truncate">
                        {p.name}
                      </h4>
                      <p className="text-xs text-[#718477] truncate">
                        {p.origin || p.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {onInquireProduct && (
                      <button
                        onClick={() => {
                          onClose();
                          onInquireProduct(p);
                        }}
                        className="py-1.5 px-3 rounded-lg bg-[#EDF3EF] hover:bg-[#E2ECE6] text-[#1A382B] text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="Inquire directly"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Inquire</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        onClose();
                        onSelectProduct(p);
                      }}
                      className="p-2 rounded-lg border border-[#E0D7C8] text-[#1A382B] hover:bg-[#FAF8F5] text-xs font-semibold cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
