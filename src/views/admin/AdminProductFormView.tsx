import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Eye,
  EyeOff,
  RefreshCw,
} from 'lucide-react';
import { Product, CategoryId, ProductPackagingSpec } from '../../types';
import { productService } from '../../services/productService';
import { isSupabaseConfigured, STORAGE_BUCKET_PRODUCT_IMAGES } from '../../services/supabase';

interface AdminProductFormViewProps {
  productId?: string;
  existingProduct?: Product | null;
  onBack: () => void;
  onSaved: (product: Product) => void;
}

const CATEGORY_OPTIONS: { id: CategoryId; label: string }[] = [
  { id: 'water', label: 'Thermal Mineral Water' },
  { id: 'juices', label: 'Cold-Pressed Juices' },
  { id: 'nuts', label: 'Gently Roasted Nuts' },
  { id: 'olive-oil', label: 'Extra Virgin Olive Oil' },
  { id: 'sunflower-oil', label: 'High-Oleic Sunflower Oil' },
  { id: 'seaweed', label: 'Crispy Seaweed Crunch' },
  { id: 'wellness-shots', label: 'Wellness Shots' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'fruits', label: 'Dried Fruits' },
  { id: 'dairy', label: 'Dairy & Cheeses' },
  { id: 'seafood', label: 'Seafood' },
  { id: 'specialty', label: 'Specialty Harvests' },
];

export const AdminProductFormView: React.FC<AdminProductFormViewProps> = ({
  productId,
  existingProduct,
  onBack,
  onSaved,
}) => {
  const isEditing = Boolean(productId && existingProduct);

  // Form State
  const [name, setName] = useState(existingProduct?.name || '');
  const [category, setCategory] = useState<CategoryId>(existingProduct?.category || 'specialty');
  const [categoryLabel, setCategoryLabel] = useState(existingProduct?.categoryLabel || '');
  const [tagline, setTagline] = useState(existingProduct?.tagline || '');
  const [positioning, setPositioning] = useState(existingProduct?.positioning || '');
  const [shortDescription, setShortDescription] = useState(existingProduct?.shortDescription || '');
  const [description, setDescription] = useState(existingProduct?.description || '');
  const [origin, setOrigin] = useState(existingProduct?.origin || '');
  const [harvestOrigin, setHarvestOrigin] = useState(existingProduct?.harvestOrigin || '');

  // Main Image & Media
  const [image, setImage] = useState(
    existingProduct?.image ||
      'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=1200&q=80'
  );
  const [secondaryImage, setSecondaryImage] = useState(existingProduct?.secondaryImage || '');
  const [galleryImages, setGalleryImages] = useState<string[]>(existingProduct?.galleryImages || []);
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  // Status & Flags (NO PRICE FIELD)
  const [published, setPublished] = useState(existingProduct?.published !== false);
  const [featured, setFeatured] = useState(Boolean(existingProduct?.featured));
  const [inStock, setInStock] = useState(existingProduct?.inStock !== false);

  // Characteristics & Highlights
  const [characteristics, setCharacteristics] = useState<string[]>(
    existingProduct?.characteristics || []
  );
  const [newCharacteristic, setNewCharacteristic] = useState('');

  // Specifications
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>(
    existingProduct?.specifications
      ? Object.entries(existingProduct.specifications).map(([key, value]) => ({ key, value }))
      : [
          { key: 'Origin', value: existingProduct?.origin || '' },
          { key: 'Packaging', value: 'Recyclable Glass / PET' },
        ]
  );
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecValue, setNewSpecValue] = useState('');

  // Packaging Specs / Formats
  const [packagingSpecs, setPackagingSpecs] = useState<ProductPackagingSpec[]>(
    existingProduct?.packagingSpecs || [
      { variety: 'Standard', format: '500ml', packagingType: 'Glass Bottle', cartonCount: '12 bottles / carton' },
    ]
  );
  const [newPackVariety, setNewPackVariety] = useState('');
  const [newPackFormat, setNewPackFormat] = useState('');
  const [newPackType, setNewPackType] = useState('');
  const [newPackCount, setNewPackCount] = useState('');

  // Upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submit & Save state
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; isError?: boolean } | null>(null);

  // Image Upload Handler
  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const res = await productService.uploadProductImage(file);
      if (res.error || !res.publicUrl) {
        setUploadError(res.error || 'Failed to upload image');
      } else {
        setImage(res.publicUrl);
        setFeedback({ text: 'Main product image uploaded to Supabase Storage!' });
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Add characteristic
  const handleAddCharacteristic = () => {
    if (!newCharacteristic.trim()) return;
    setCharacteristics([...characteristics, newCharacteristic.trim()]);
    setNewCharacteristic('');
  };

  const handleRemoveCharacteristic = (index: number) => {
    setCharacteristics(characteristics.filter((_, i) => i !== index));
  };

  // Add Specification
  const handleAddSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    setSpecifications([...specifications, { key: newSpecKey.trim(), value: newSpecValue.trim() }]);
    setNewSpecKey('');
    setNewSpecValue('');
  };

  const handleRemoveSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  // Add Packaging Spec
  const handleAddPackagingSpec = () => {
    if (!newPackFormat.trim()) return;
    setPackagingSpecs([
      ...packagingSpecs,
      {
        variety: newPackVariety.trim() || undefined,
        format: newPackFormat.trim(),
        packagingType: newPackType.trim() || undefined,
        cartonCount: newPackCount.trim() || undefined,
      },
    ]);
    setNewPackVariety('');
    setNewPackFormat('');
    setNewPackType('');
    setNewPackCount('');
  };

  const handleRemovePackagingSpec = (index: number) => {
    setPackagingSpecs(packagingSpecs.filter((_, i) => i !== index));
  };

  // Add Gallery Image
  const handleAddGalleryImage = () => {
    if (!newGalleryUrl.trim()) return;
    setGalleryImages([...galleryImages, newGalleryUrl.trim()]);
    setNewGalleryUrl('');
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFeedback({ text: 'Product name is required.', isError: true });
      return;
    }

    setSaving(true);
    setFeedback(null);

    // Convert specs array back to Record
    const specsRecord: Record<string, string> = {};
    specifications.forEach((s) => {
      if (s.key) specsRecord[s.key] = s.value;
    });

    const productData: Partial<Product> = {
      id: existingProduct?.id,
      name: name.trim(),
      slug: existingProduct?.slug,
      category,
      categoryLabel: categoryLabel.trim() || undefined,
      tagline: tagline.trim() || undefined,
      positioning: positioning.trim() || undefined,
      story: existingProduct?.story,
      shortDescription: shortDescription.trim() || undefined,
      description: description.trim() || '',
      origin: origin.trim() || undefined,
      harvestOrigin: harvestOrigin.trim() || undefined,
      sourcing: existingProduct?.sourcing,
      image: image.trim(),
      mainImage: image.trim(),
      secondaryImage: secondaryImage.trim() || undefined,
      galleryImages,
      additionalImages: galleryImages,
      characteristics,
      specifications: specsRecord,
      packaging: packagingSpecs,
      packagingSpecs,
      published,
      featured,
      inStock,
      // Retain existing presentation arrays if present
      sizes: existingProduct?.sizes || packagingSpecs.map((p) => p.format || '').filter(Boolean),
      ingredients: existingProduct?.ingredients || [],
      nutrition: existingProduct?.nutrition,
      highlights: existingProduct?.highlights || characteristics.slice(0, 5),
      servingSuggestions: existingProduct?.servingSuggestions || [],
      storageInfo: existingProduct?.storageInfo,
    };

    try {
      const res = await productService.saveProduct(productData, !isEditing);
      if (res.error || !res.product) {
        setFeedback({ text: res.error || 'Failed to save product to Supabase.', isError: true });
      } else {
        setFeedback({ text: `Product "${res.product.name}" successfully saved!` });
        onSaved(res.product);
      }
    } catch (err) {
      setFeedback({
        text: err instanceof Error ? err.message : 'Unexpected save error',
        isError: true,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5DEC9] pb-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl border border-[#D5CDBF] bg-white text-[#4F6254] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#18261E]">
              {isEditing ? `Edit: ${existingProduct?.name}` : 'Add New Harvest Product'}
            </h1>
            <p className="text-xs text-[#6A7B70]">
              {isEditing
                ? `ID: ${existingProduct?.id} • Updates persist directly to Supabase`
                : 'Create and publish a new item into the Nutri Nova portfolio'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 rounded-xl border border-[#D5CDBF] bg-white text-xs font-medium text-[#4D6053] hover:bg-[#FAF8F5] cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14221A] hover:bg-[#223B2D] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Supabase...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Product</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between gap-3 ${
            feedback.isError
              ? 'bg-[#FDF2F0] border border-[#F5C2BA] text-[#A62C1E]'
              : 'bg-[#EDF8F1] border border-[#C6EBD3] text-[#1E6838]'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.isError ? (
              <AlertCircle className="w-4 h-4 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="text-xs font-bold opacity-60 hover:opacity-100 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Grid Layout: Main Details (Left) + Media & Publishing (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Product Information */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section: Basic Identity */}
          <div className="bg-white p-6 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-4">
            <h2 className="font-serif text-base font-bold text-[#18261E] border-b border-[#F0EBE0] pb-2">
              Product Overview &amp; Story
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Chortoq Premium Thermal Mineral Water"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryId)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C] cursor-pointer"
                  >
                    {CATEGORY_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                    Category Label (Display Badge)
                  </label>
                  <input
                    type="text"
                    value={categoryLabel}
                    onChange={(e) => setCategoryLabel(e.target.value)}
                    placeholder="e.g. Thermal Mineral Water"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                  Tagline / Product Story Sub-heading
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Deep Artesian Mountain Springs of Chartak, Uzbekistan"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                  Product Positioning
                </label>
                <input
                  type="text"
                  value={positioning}
                  onChange={(e) => setPositioning(e.target.value)}
                  placeholder="e.g. Legendary Medicinal Table Water Bridging Pristine Purity with Therapeutic Power"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                  Short Description (Catalog Cards)
                </label>
                <textarea
                  rows={2}
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="A concise 1-2 sentence overview for catalog cards..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                  Full Description (Product Page Narrative)
                </label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed narrative describing harvest origins, traditional craft, and medicinal or culinary notes..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                />
              </div>
            </div>
          </div>

          {/* Section: Origin & Sourcing */}
          <div className="bg-white p-6 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-4">
            <h2 className="font-serif text-base font-bold text-[#18261E] border-b border-[#F0EBE0] pb-2">
              Origin &amp; Sourcing Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                  Origin (Region / Country)
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  placeholder="e.g. Chartak Region, Uzbekistan"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#38483D] mb-1.5">
                  Harvest / Estate Specifics
                </label>
                <input
                  type="text"
                  value={harvestOrigin}
                  onChange={(e) => setHarvestOrigin(e.target.value)}
                  placeholder="e.g. Deep artesian mountain springs"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs sm:text-sm text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                />
              </div>
            </div>
          </div>

          {/* Section: Characteristics */}
          <div className="bg-white p-6 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0EBE0] pb-2">
              <h2 className="font-serif text-base font-bold text-[#18261E]">
                Key Characteristics &amp; Benefits
              </h2>
              <span className="text-xs text-[#7A8B7E] font-mono">
                {characteristics.length} items
              </span>
            </div>

            <div className="space-y-2">
              {characteristics.map((char, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 p-2.5 bg-[#FAF8F5] border border-[#E2DBD0] rounded-xl text-xs text-[#203427]"
                >
                  <span className="flex-1 min-w-0 break-words">{char}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCharacteristic(index)}
                    className="text-[#9A3B2F] hover:text-[#C0392B] p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newCharacteristic}
                onChange={(e) => setNewCharacteristic(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCharacteristic();
                  }
                }}
                placeholder="e.g. Accelerates metabolic balance and optimizes cellular hydration"
                className="flex-1 px-3.5 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
              />
              <button
                type="button"
                onClick={handleAddCharacteristic}
                className="px-3.5 py-2 bg-[#2E543F] hover:bg-[#39694E] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Section: Specifications */}
          <div className="bg-white p-6 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-4">
            <h2 className="font-serif text-base font-bold text-[#18261E] border-b border-[#F0EBE0] pb-2">
              Product Specifications
            </h2>

            <div className="space-y-2">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2.5 bg-[#FAF8F5] border border-[#E2DBD0] rounded-xl text-xs"
                >
                  <span className="w-1/3 font-semibold text-[#18261E] truncate">
                    {spec.key}
                  </span>
                  <span className="flex-1 text-[#4F6255] truncate">
                    {spec.value}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSpecification(index)}
                    className="text-[#9A3B2F] hover:text-[#C0392B] p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
              <input
                type="text"
                value={newSpecKey}
                onChange={(e) => setNewSpecKey(e.target.value)}
                placeholder="Key (e.g. Certification)"
                className="sm:col-span-2 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
              />
              <input
                type="text"
                value={newSpecValue}
                onChange={(e) => setNewSpecValue(e.target.value)}
                placeholder="Value (e.g. Organic Standard)"
                className="sm:col-span-2 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
              />
              <button
                type="button"
                onClick={handleAddSpecification}
                className="px-3 py-2 bg-[#2E543F] hover:bg-[#39694E] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>

          {/* Section: Packaging & Formats */}
          <div className="bg-white p-6 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-4">
            <h2 className="font-serif text-base font-bold text-[#18261E] border-b border-[#F0EBE0] pb-2">
              Packaging &amp; Formats Specification
            </h2>

            <div className="space-y-2">
              {packagingSpecs.map((pack, index) => (
                <div
                  key={index}
                  className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#FAF8F5] border border-[#E2DBD0] rounded-xl text-xs"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    {pack.variety && (
                      <span className="font-semibold text-[#18261E]">
                        {pack.variety}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-[#EAE3D6] text-[#18261E] font-mono">
                      {pack.format}
                    </span>
                    {pack.packagingType && (
                      <span className="text-[#687C70]">{pack.packagingType}</span>
                    )}
                    {pack.cartonCount && (
                      <span className="text-[#7A8C80] text-[11px]">({pack.cartonCount})</span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePackagingSpec(index)}
                    className="text-[#9A3B2F] hover:text-[#C0392B] p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
              <input
                type="text"
                value={newPackVariety}
                onChange={(e) => setNewPackVariety(e.target.value)}
                placeholder="Variety (e.g. Sparkling)"
                className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
              />
              <input
                type="text"
                value={newPackFormat}
                onChange={(e) => setNewPackFormat(e.target.value)}
                placeholder="Format * (e.g. 0.75L)"
                className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
              />
              <input
                type="text"
                value={newPackType}
                onChange={(e) => setNewPackType(e.target.value)}
                placeholder="Type (e.g. Glass Bottle)"
                className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
              />
              <input
                type="text"
                value={newPackCount}
                onChange={(e) => setNewPackCount(e.target.value)}
                placeholder="Count (e.g. 12/ctn)"
                className="px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
              />
              <button
                type="button"
                onClick={handleAddPackagingSpec}
                className="col-span-2 sm:col-span-1 px-3 py-2 bg-[#2E543F] hover:bg-[#39694E] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Add Format
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Media, Supabase Storage Upload & Publication Status */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publication Status Card */}
          <div className="bg-white p-5 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#18261E] border-b border-[#F0EBE0] pb-2">
              Publication Settings
            </h3>

            {/* Published / Draft Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#E5DEC9]">
              <div>
                <div className="text-xs font-semibold text-[#18261E]">Catalog Status</div>
                <div className="text-[11px] text-[#697A6E]">
                  {published ? 'Visible to website visitors' : 'Restricted to draft mode'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPublished(!published)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  published ? 'bg-[#2E7D46]' : 'bg-[#D1C9BA]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    published ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Featured Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#E5DEC9]">
              <div>
                <div className="text-xs font-semibold text-[#18261E]">Featured Showcase</div>
                <div className="text-[11px] text-[#697A6E]">Highlight on homepage grid</div>
              </div>
              <button
                type="button"
                onClick={() => setFeatured(!featured)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  featured ? 'bg-[#1E3B2C]' : 'bg-[#D1C9BA]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    featured ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* In Stock Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#E5DEC9]">
              <div>
                <div className="text-xs font-semibold text-[#18261E]">Harvest Availability</div>
                <div className="text-[11px] text-[#697A6E]">Currently available for order</div>
              </div>
              <button
                type="button"
                onClick={() => setInStock(!inStock)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  inStock ? 'bg-[#1E3B2C]' : 'bg-[#D1C9BA]'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    inStock ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Main Product Image & Supabase Storage */}
          <div className="bg-white p-5 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#F0EBE0] pb-2">
              <h3 className="font-serif text-sm font-bold text-[#18261E]">
                Main Product Image
              </h3>
              <span className="text-[10px] font-mono text-[#6A7B70]">
                {STORAGE_BUCKET_PRODUCT_IMAGES}
              </span>
            </div>

            {/* Preview Box */}
            <div className="relative rounded-2xl overflow-hidden border border-[#E0D9C8] bg-[#F4EFE6] aspect-4/3 flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Product Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-4 text-[#8A9C8E]">
                  <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                  <span className="text-xs">No image selected</span>
                </div>
              )}

              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-xs gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-[#72C895]" />
                  <span>Uploading to Supabase Storage...</span>
                </div>
              )}
            </div>

            {/* Supabase Storage Upload Button */}
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />
              <button
                type="button"
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#234A38] hover:bg-[#2F614B] text-white text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
              >
                <Upload className="w-4 h-4" />
                <span>Upload to Supabase Storage</span>
              </button>
              <div className="text-[11px] text-[#788A7D] text-center mt-1.5">
                Saved directly into the <code className="font-mono">{STORAGE_BUCKET_PRODUCT_IMAGES}</code> bucket.
              </div>
            </div>

            {uploadError && (
              <div className="p-3 rounded-xl bg-[#FDF2F0] border border-[#F5C2BA] text-[#A62C1E] text-xs leading-relaxed">
                {uploadError}
              </div>
            )}

            {/* Direct Image URL input */}
            <div className="pt-2 border-t border-[#F0EBE0] space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4D6053]">
                Or Image URL
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
              />
            </div>
          </div>

          {/* Secondary & Gallery Images */}
          <div className="bg-white p-5 rounded-2xl border border-[#E0D9C8] shadow-2xs space-y-4">
            <h3 className="font-serif text-sm font-bold text-[#18261E] border-b border-[#F0EBE0] pb-2">
              Additional Gallery Images
            </h3>

            {/* Secondary Image */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#4D6053]">
                Secondary Image URL
              </label>
              <input
                type="url"
                value={secondaryImage}
                onChange={(e) => setSecondaryImage(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-xs text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
              />
            </div>

            {/* Gallery Images List */}
            <div className="space-y-2 pt-2 border-t border-[#F0EBE0]">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#4D6053]">
                Gallery Images ({galleryImages.length})
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {galleryImages.map((gUrl, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#FAF8F5] border border-[#E5DEC9] text-xs"
                  >
                    <span className="truncate flex-1 font-mono text-[11px] text-[#55695B]">
                      {gUrl}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="text-[#9A3B2F] hover:text-[#C0392B] p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <input
                  type="url"
                  value={newGalleryUrl}
                  onChange={(e) => setNewGalleryUrl(e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D5CDBF] rounded-xl text-[#18261E] focus:outline-none focus:ring-2 focus:ring-[#1E3B2C]"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryImage}
                  className="px-3 py-1.5 bg-[#2E543F] hover:bg-[#39694E] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
