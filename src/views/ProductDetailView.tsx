import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Mail,
  Check,
  Award,
  Sparkles,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import { Product, PageView } from '../types';
import { PRODUCTS, CATEGORY_THEMES } from '../data/products';
import { Badge } from '../components/Badge';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onInquire?: (product: Product) => void;
  onNavigate: (page: PageView) => void;
  products?: Product[];
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onSelectProduct,
  onInquire,
  onNavigate,
  products = PRODUCTS,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = [
    product.image,
    product.secondaryImage,
    ...(product.galleryImages || []),
  ].filter(Boolean) as string[];

  // Remove duplicates
  const uniqueImages = Array.from(new Set(images));
  const activeImage = uniqueImages[selectedImageIndex] || product.image;

  const relatedProducts = products.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.featured)
  ).slice(0, 4);

  return (
    <div id="product-detail-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-[#EAE3D6] pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4E5C52] hover:text-[#1A382B] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Catalogue</span>
        </button>

        <div className="text-xs text-[#718477]">
          <span className="cursor-pointer hover:underline" onClick={onBack}>Products</span>
          {' / '}
          <span className="text-[#18261E] font-semibold">{product.name}</span>
        </div>
      </div>

      {/* Main Top Section: Left Gallery, Right Editorial Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Large Product Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[#FAF6F0] border border-[#EBE4D8] shadow-xs">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              <Badge category={product.category} size="md">
                {product.categoryLabel || product.category}
              </Badge>
              {product.origin && (
                <span className="bg-[#18261E]/80 backdrop-blur-xs text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                  <MapPin className="w-3 h-3 text-[#E59E2B]" />
                  <span>{product.origin}</span>
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery Strip */}
          {uniqueImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
              {uniqueImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-white ${
                    selectedImageIndex === idx
                      ? 'border-[#1A382B] ring-2 ring-[#1A382B]/20 shadow-xs'
                      : 'border-[#EBE4D8] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Story & Sourcing Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6C7E72] block">
              {product.categoryLabel || product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#18261E] leading-tight">
              {product.name}
            </h1>

            {product.positioning && (
              <p className="text-sm sm:text-base font-semibold text-[#C86A3E] italic leading-snug">
                "{product.positioning}"
              </p>
            )}

            <p className="text-sm sm:text-base text-[#47574D] leading-relaxed pt-1 font-normal">
              {product.description}
            </p>
          </div>

          {/* Origin Banner */}
          {product.origin && (
            <div className="p-4 rounded-2xl bg-[#F5EFEB] border border-[#E5DDD0] flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#EDF3EF] text-[#1A382B] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C7E72] block">
                  Provenance &amp; Terroir
                </span>
                <span className="text-xs font-bold text-[#18261E]">
                  {product.origin}
                </span>
              </div>
            </div>
          )}

          {/* Available Sizes / Formats */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#18261E] block">
                Available Formats
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={size}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#E0D7C8] text-[#1A382B]"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quick Specifications */}
          {product.specifications && (
            <div className="border-t border-[#EAE3D6] pt-4 space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#18261E] block mb-2">
                Quick Specifications
              </span>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {Object.entries(product.specifications).slice(0, 4).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-[#718477] block text-[11px]">{key}</span>
                    <span className="font-medium text-[#18261E]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact / Inquire Action */}
          <div className="pt-4 border-t border-[#EAE3D6] space-y-3">
            <button
              onClick={() => {
                if (onInquire) {
                  onInquire(product);
                } else {
                  onNavigate('contact');
                }
              }}
              className="w-full py-3.5 rounded-full bg-[#1A382B] text-[#FAF8F5] hover:bg-[#12261D] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs hover:shadow-md cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#E59E2B]" />
              <span>Inquire About Sourcing &amp; Allocation</span>
            </button>
            <p className="text-center text-xs text-[#718477]">
              Inquiries processed directly by custsvc@nutri-nova.org
            </p>
          </div>
        </div>
      </div>

      {/* Structured Product Detail Sections */}
      {(product.highlights || product.characteristics) && (
        <section className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#EAE3D6] space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6C7E72] block">
              PRODUCT HIGHLIGHTS &amp; PROFILE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18261E]">
              Craftsmanship &amp; Key Characteristics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {product.highlights && product.highlights.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE4D8] flex flex-col justify-between h-full space-y-6 shadow-xs">
                <div className="flex items-center gap-3.5 pb-4 border-b border-[#F2ECE3]">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF3EF] text-[#1A382B] flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#18261E]">
                      Quality Highlights
                    </h3>
                    <p className="text-xs text-[#718477]">Verified standards &amp; sourcing integrity</p>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  {product.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#F0EBE1] hover:border-[#E2D8C8] transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#1A382B] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#2E3D34] font-medium leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {product.characteristics && product.characteristics.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE4D8] flex flex-col justify-between h-full space-y-6 shadow-xs">
                <div className="flex items-center gap-3.5 pb-4 border-b border-[#F2ECE3]">
                  <div className="w-10 h-10 rounded-xl bg-[#FDF5EB] text-[#C86A3E] flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#18261E]">
                      Sensory &amp; Functional Profile
                    </h3>
                    <p className="text-xs text-[#718477]">Tasting notes, texture &amp; culinary behavior</p>
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  {product.characteristics.map((char, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#F0EBE1] hover:border-[#E2D8C8] transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#C86A3E] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-xs sm:text-sm text-[#2E3D34] font-medium leading-relaxed">
                        {char}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Specifications Table (if available) */}
      {product.packagingSpecs && product.packagingSpecs.length > 0 && (
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6C7E72] block">
              PACKAGING &amp; CONFIGURATIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18261E]">
              Available Formats &amp; Packing Specifications
            </h2>
            <p className="text-sm text-[#47574D]">
              Official carton and bottling configurations direct from source facilities.
            </p>
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-[#EBE4D8] shadow-xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#FAF8F5] border-b border-[#EBE4D8] text-[#18261E] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-6">Variety</th>
                  <th className="py-3.5 px-6">Bottle Format</th>
                  <th className="py-3.5 px-6">Material</th>
                  <th className="py-3.5 px-6">Carton Configuration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2EDE4] text-[#47574D]">
                {product.packagingSpecs.map((spec, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5]/50 transition-colors">
                    <td className="py-4 px-6 font-semibold text-[#18261E]">{spec.variety || 'Standard'}</td>
                    <td className="py-4 px-6 font-mono text-[#1A382B] font-medium">{spec.format}</td>
                    <td className="py-4 px-6">{spec.packagingType}</td>
                    <td className="py-4 px-6 font-semibold text-[#18261E]">{spec.cartonCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Section: Additional Heritage Details */}
      {product.details && product.details.length > 0 && (
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EBE4D8] space-y-4 shadow-xs">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6C7E72] block">
            HERITAGE &amp; MARKET LEADERSHIP
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18261E]">
            About the Harvest &amp; Tradition
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#47574D] leading-relaxed max-w-4xl font-normal">
            {product.details.map((detail, idx) => (
              <p key={idx}>{detail}</p>
            ))}
          </div>
        </section>
      )}

      {/* Section: Ingredients, Nutrition & Serving Suggestions */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Ingredients */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE4D8] space-y-4 shadow-xs flex flex-col h-full">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#F2ECE3]">
            <div className="w-8 h-8 rounded-lg bg-[#EDF3EF] text-[#1A382B] flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#18261E]">
              Pure Ingredients
            </h3>
          </div>
          <div className="space-y-2.5 flex-1">
            {product.ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#37473E]">
                <Check className="w-3.5 h-3.5 text-[#1A382B] shrink-0 mt-0.5 stroke-[2.5]" />
                <span className="font-medium text-[#18261E]">{ing}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Serving Suggestions */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE4D8] space-y-4 shadow-xs flex flex-col h-full">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#F2ECE3]">
            <div className="w-8 h-8 rounded-lg bg-[#FDF5EB] text-[#C86A3E] flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#18261E]">
              Serving Suggestions
            </h3>
          </div>
          <div className="space-y-2.5 flex-1">
            {(product.servingSuggestions || [
              'Serve at optimal room or cellar temperature.',
              'Enjoy as part of a balanced, wholesome everyday lifestyle.',
            ]).map((sug, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#37473E]">
                <Check className="w-3.5 h-3.5 text-[#C86A3E] shrink-0 mt-0.5 stroke-[2.5]" />
                <span className="leading-relaxed">{sug}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Info */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EBE4D8] space-y-4 shadow-xs flex flex-col h-full">
          <div className="flex items-center gap-2.5 pb-3 border-b border-[#F2ECE3]">
            <div className="w-8 h-8 rounded-lg bg-[#EDF3EF] text-[#1A382B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#18261E]">
              Storage &amp; Care
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#47574D] leading-relaxed flex-1 pt-1">
            {product.storageInfo ||
              'Store in a cool, dry place away from direct sunlight. Seal tightly after opening.'}
          </p>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-8 pt-8 border-t border-[#EAE3D6]">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#6C7E72] block">
                EXPLORE FURTHER
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#18261E] mt-1">
                More from Our Curated Harvests
              </h2>
            </div>
            <button
              onClick={onBack}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1A382B] hover:text-[#12261D]"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
