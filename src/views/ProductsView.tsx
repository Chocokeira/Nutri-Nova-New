import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Product, CategoryId } from '../types';
import { PRODUCTS, CATEGORIES_LIST } from '../data/products';
import { ProductCard } from '../components/ProductCard';

interface ProductsViewProps {
  initialCategory?: CategoryId;
  onSelectProduct: (product: Product) => void;
  onInquireProduct?: (product: Product) => void;
  products?: Product[];
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  initialCategory = 'all',
  onSelectProduct,
  onInquireProduct,
  products = PRODUCTS,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'name-asc' | 'newest'>('featured');

  const filteredProducts = useMemo(() => {
    let list = products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.positioning && p.positioning.toLowerCase().includes(q)) ||
        (p.origin && p.origin.toLowerCase().includes(q)) ||
        (p.categoryLabel && p.categoryLabel.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });

    if (sortBy === 'featured') {
      list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'name-asc') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'newest') {
      list = [...list].sort((a, b) => {
        const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
        const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
        return dateB - dateA;
      });
    }

    return list;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div id="products-catalog-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#66786C] block">
          CURATED HARVESTS &amp; NATURAL PROVISIONS
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[#18261E] tracking-tight">
          Explore Our Products
        </h1>
        <p className="text-base sm:text-lg text-[#47574D] leading-relaxed font-normal">
          A thoughtful portfolio of single-estate finishing oils, deep artesian table waters, raw mountain nectars, and slow-roasted harvests sourced with uncompromising standards.
        </p>
      </div>

      {/* Controls: Category Filter Tabs, Search Bar, and Sorting */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#EBE4D8] shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Filter Pills (Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
            {CATEGORIES_LIST.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-[#1A382B] text-[#FAF8F5] shadow-xs'
                      : 'bg-[#FAF8F5] text-[#425046] hover:bg-[#EFE8DC] border border-[#EBE4D8]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search bar & Sorting */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#718477] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, provenance..."
                className="w-full bg-[#FAF8F5] border border-[#E0D7C8] rounded-full pl-9 pr-4 py-2 text-xs text-[#18261E] placeholder-[#7E8E82] focus:outline-hidden focus:border-[#1A382B] transition-colors"
              />
            </div>

            {/* Sorting Select */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-[#718477] shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="w-full sm:w-auto bg-[#FAF8F5] border border-[#E0D7C8] rounded-full px-4 py-2 text-xs font-bold text-[#1A382B] focus:outline-hidden focus:border-[#1A382B] cursor-pointer"
              >
                <option value="featured">Featured Selections</option>
                <option value="name-asc">Alphabetical (A-Z)</option>
                <option value="newest">Recent Harvests</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Count */}
        <div className="flex items-center justify-between text-xs text-[#6C7E72] pt-3 border-t border-[#F2EDE4]">
          <span>
            Showing {filteredProducts.length} curated product{filteredProducts.length === 1 ? '' : 's'}
          </span>
          <span className="text-[#1A382B] font-medium hidden sm:inline">
            Direct Provenance • Traceable Harvests
          </span>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-[#EBE4D8] p-8 space-y-4 shadow-xs">
          <h3 className="font-heading text-xl font-bold text-[#18261E]">No matching harvests found</h3>
          <p className="text-xs sm:text-sm text-[#6C7E72] max-w-sm mx-auto">
            Try adjusting your search terms or selecting another category filter above.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-full bg-[#1A382B] text-[#FAF8F5] text-xs font-bold hover:bg-[#12261D] transition-colors shadow-xs cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onInquire={onInquireProduct}
            />
          ))}
        </div>
      )}
    </div>
  );
};
