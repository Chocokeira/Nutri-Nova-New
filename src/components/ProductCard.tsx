import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onInquire?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  return (
    <article
      id={`product-card-${product.id}`}
      role="button"
      tabIndex={0}
      onClick={() => onSelect(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(product);
        }
      }}
      className="group bg-white rounded-2xl border border-[#EBE4D8] overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:border-[#1A382B]/35 hover:shadow-md cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#1A382B]/20"
      aria-label={`View details for ${product.name}`}
    >
      {/* Product Image Frame (Uncluttered, natural photography display) */}
      <div className="relative aspect-4/3 bg-[#FAF8F5] overflow-hidden border-b border-[#F2EDE4] shrink-0">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Card Body with Refined Micro-Typography & Equal Height Spacing */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Clean Category Eyebrow */}
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6C7E72] block">
            {product.categoryLabel || product.category}
          </span>

          {/* Product Title: Allows natural 2-line wrap with line-clamp-2 and balanced min-height */}
          <h3 className="font-serif text-lg sm:text-[19px] font-bold text-[#18261E] group-hover:text-[#1A382B] transition-colors leading-snug line-clamp-2 min-h-[2.8rem] sm:min-h-[3rem]">
            {product.name}
          </h3>

          {/* Short Narrative Description: Clean 2-line clamp */}
          <p className="text-xs text-[#526458] line-clamp-2 leading-relaxed font-normal">
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Clean, Human-Designed Bottom Action */}
        <div className="pt-4 mt-4 border-t border-[#F2ECE3] flex items-center justify-between text-xs">
          <span className="font-semibold text-[#1A382B] group-hover:text-[#C86A3E] transition-colors flex items-center gap-1.5">
            <span>View Product</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 text-[#E59E2B]">
              →
            </span>
          </span>
        </div>
      </div>
    </article>
  );
};
