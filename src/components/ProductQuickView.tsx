import React, { useState } from 'react';
import { X, Mail, Check } from 'lucide-react';
import { Product } from '../types';
import { CATEGORY_THEMES } from '../data/products';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onInquire?: (product: Product) => void;
  onViewFullDetails?: (product: Product) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onInquire,
  onViewFullDetails,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) return null;

  const theme = CATEGORY_THEMES[product.category] || CATEGORY_THEMES.all;
  const images = [product.image, product.secondaryImage].filter(Boolean) as string[];

  return (
    <div
      id="product-quickview-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="product-quickview-card"
        className="relative bg-[#FAF7F2] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#E8E0D2] overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#46534B] hover:text-[#1E2721] bg-white/90 hover:bg-white rounded-full transition-colors shadow-xs cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Images Gallery */}
          <div className="bg-[#F5EFE6] p-6 sm:p-8 flex flex-col justify-between">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-xs border border-[#E8E0D2]">
              <img
                src={images[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 mt-4 justify-center">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? 'border-[#233B2B] ring-2 ring-[#233B2B]/20'
                        : 'border-[#DDD6CA] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Product view" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {product.badges && product.badges.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {product.badges.map((badge, i) => (
                  <span
                    key={i}
                    className={`px-3 py-1 bg-white/90 border border-[#DDD6CA] ${theme.badgeText} text-xs font-semibold rounded-full shadow-2xs`}
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Details & Nutrition */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 max-h-[80vh] overflow-y-auto bg-white">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#6B7970] mb-1">
                <span className={`px-2.5 py-0.5 rounded-full ${theme.badgeBg} ${theme.badgeText} font-bold`}>
                  {product.categoryLabel}
                </span>
                <span>•</span>
                <span>{product.volumeOrWeight}</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#1E2721] leading-tight mt-1">
                {product.name}
              </h2>

              <p className="text-xs text-[#5D6B62] italic mt-1">{product.tagline}</p>

              <div className="mt-4 pb-4 border-b border-[#F2ECE3] flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#55705E] block">
                    Product Specification
                  </span>
                  <span className="text-lg font-bold text-[#1E2721] font-heading">
                    {product.volumeOrWeight || (product.sizes && product.sizes[0]) || 'Curated Harvest'}
                  </span>
                </div>
                {product.origin && (
                  <span className="text-xs font-medium text-[#6B7970] bg-[#FAF7F2] px-3 py-1 rounded-full border border-[#E8E0D2]">
                    {product.origin}
                  </span>
                )}
              </div>

              <p className="text-sm text-[#46534B] leading-relaxed mt-4">
                {product.description}
              </p>

              {/* Harvest Origin & Culinary Pairing */}
              {product.harvestOrigin && (
                <div className="mt-4 p-3.5 rounded-2xl bg-[#F5EFE6] border border-[#E8E0D2]">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#55695D]">
                    Harvest Origin &amp; Terroir
                  </span>
                  <p className="text-xs font-medium text-[#1E2721] mt-0.5">
                    {product.harvestOrigin}
                  </p>
                </div>
              )}

              {product.culinaryPairing && (
                <div className="mt-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D6]">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#C86A3D]">
                    Culinary Pairing
                  </span>
                  <p className="text-xs text-[#4F5C53] leading-relaxed mt-0.5">
                    {product.culinaryPairing}
                  </p>
                </div>
              )}

              {/* Highlights */}
              {product.details && product.details.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2721]">
                    Wholesome Highlights
                  </h4>
                  <ul className="space-y-2 text-xs text-[#47574D]">
                    {product.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-[#1A382B] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ingredients */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D6]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2721] mb-1">
                  Pure Ingredients
                </h4>
                <p className="text-xs text-[#4F5C53] leading-relaxed">
                  {product.ingredients.join(', ')}
                </p>
              </div>

              {/* Nutrition Facts mini table */}
              <div className="mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E2721] mb-2">
                  Nutrition Profile ({product.nutrition.servingSize})
                </h4>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EAE3D6]">
                    <span className="block text-[10px] text-[#718076] uppercase">Calories</span>
                    <span className="font-bold text-[#1E2721] text-sm">{product.nutrition.calories}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EAE3D6]">
                    <span className="block text-[10px] text-[#718076] uppercase">Protein</span>
                    <span className="font-bold text-[#1E2721] text-sm">{product.nutrition.protein}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EAE3D6]">
                    <span className="block text-[10px] text-[#718076] uppercase">Carbs</span>
                    <span className="font-bold text-[#1E2721] text-sm">{product.nutrition.carbs}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#EAE3D6]">
                    <span className="block text-[10px] text-[#718076] uppercase">Healthy Fat</span>
                    <span className="font-bold text-[#1E2721] text-sm">{product.nutrition.fat}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: Inquire & View Full Details */}
            <div className="pt-4 border-t border-[#F2ECE3] space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  if (onInquire) {
                    onInquire(product);
                  }
                }}
                className="w-full py-3.5 px-6 rounded-full bg-[#233B2B] hover:bg-[#182C20] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#FAF7F2]" />
                <span>Inquire About This Product</span>
              </button>
              <p className="text-center text-[11px] text-[#7A8A80]">
                Direct message to custsvc@nutri-nova.org
              </p>
            </div>

            {onViewFullDetails && (
              <div className="pt-2 text-center">
                <button
                  onClick={() => onViewFullDetails(product)}
                  className="text-xs font-bold text-[#233B2B] hover:underline cursor-pointer"
                >
                  View Complete Product Details &amp; Nutrition Facts →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
