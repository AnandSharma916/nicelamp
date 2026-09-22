import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Loader2,
  Package,
  Layers,
  Sparkles,
  Sliders,
  Image as ImageIcon,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  AlertTriangle,
} from 'lucide-react';
import { productService, categoryService, uploadService } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { ProductPreviewModal } from '../../components/admin/ProductPreviewModal';

export const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [mainImgError, setMainImgError] = useState(false);

  const isLocalPath = (str) => {
    if (!str || typeof str !== 'string') return false;
    const trimmed = str.trim();
    return /^[a-zA-Z]:\\/i.test(trimmed) || trimmed.startsWith('file://') || (trimmed.includes('\\') && !trimmed.startsWith('http'));
  };

  // Preview Modal States
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [isJustUpdated, setIsJustUpdated] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    slug: '',
    sku: '',
    category: '',
    shortDescription: '',
    description: '',
    price: 0,
    mainImage: '',
    images: [],
    pdfUrl: '',
    // Specifications
    specifications: {
      wattage: '',
      voltage: '220-240V AC',
      colorTemperature: '3000K Warm White',
      lumens: '',
      beamAngle: '120°',
      ipRating: 'IP20',
      material: 'Aluminum & Acrylic',
      finish: 'Brushed Brass',
      dimensions: '',
      installationType: '',
      cri: '',
      warranty: '2 Years Manufacturer',
    },
    tags: '',
    isFeatured: false,
    isNewArrival: false,
    isPublished: true,
  });

  // Fetch Categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await categoryService.getCategories({ admin: 'true' });
        if (res.success) {
          setCategories(res.categories || []);
          // Default to first category if creating
          if (!isEditMode && res.categories?.length > 0) {
            setFormData((prev) => ({ ...prev, category: res.categories[0]._id }));
          }
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    loadCategories();
  }, [isEditMode]);

  // If Edit Mode, fetch product data
  useEffect(() => {
    if (!id) return;
    const loadProduct = async () => {
      try {
        setLoading(true);
        const res = await productService.getProductById(id);
        if (res.success && res.product) {
          const p = res.product;
          const prodName = p.name || p.title || '';
          const coverImg =
            p.mainImage ||
            p.images?.find((img) => img.isCover)?.url ||
            p.images?.[0]?.url ||
            '';
          const galleryImgs = Array.isArray(p.images)
            ? p.images
                .map((img) => (typeof img === 'string' ? img : img.url))
                .filter((url) => Boolean(url) && url !== coverImg)
            : [];

          setFormData({
            name: prodName,
            title: prodName,
            slug: p.slug || '',
            sku: p.sku || '',
            category: p.category?._id || p.category || '',
            shortDescription: p.shortDescription || '',
            description: p.description || '',
            price: p.price || 0,
            mainImage: coverImg,
            images: galleryImgs,
            pdfUrl: p.pdfUrl || '',
            specifications: {
              wattage: p.specifications?.wattage || '',
              voltage: p.specifications?.voltage || '220-240V AC',
              colorTemperature: p.specifications?.colorTemperature || '3000K Warm White',
              lumens: p.specifications?.luminousFlux || p.specifications?.lumens || '',
              beamAngle: p.specifications?.beamAngle || '120°',
              ipRating: p.specifications?.ipRating || 'IP20',
              material: p.specifications?.material || 'Aluminum & Acrylic',
              finish: p.specifications?.finish || 'Brushed Brass',
              dimensions: p.specifications?.dimensions || '',
              installationType: p.specifications?.installationType || '',
              cri: p.specifications?.cri || '',
              warranty: p.specifications?.warranty || '2 Years Manufacturer',
            },
            tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''),
            isFeatured: Boolean(p.isFeatured),
            isNewArrival: Boolean(p.isNewArrival),
            isPublished: p.isPublished !== undefined ? p.isPublished : true,
          });
        }
      } catch (err) {
        addToast('Failed to load product details.', 'error');
        navigate('/admin/products');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, navigate, addToast]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle Spec Changes
  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value,
      },
    }));
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setFormData((prev) => {
      const generatedSlug = !isEditMode || !prev.slug
        ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : prev.slug;
      return {
        ...prev,
        title: val,
        name: val,
        slug: generatedSlug,
      };
    });
  };

  // Add Gallery Image
  const handleAddGalleryImage = (url) => {
    if (!url) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  // Remove Gallery Image
  const handleRemoveGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const productName = (formData.name || formData.title || '').trim();
    if (!productName || !formData.category) {
      addToast('Please provide both product title and category.', 'error');
      return;
    }

    if (!formData.sku || !formData.sku.trim()) {
      addToast('Product SKU / Model Number is required.', 'error');
      return;
    }

    if (isLocalPath(formData.mainImage) || isLocalPath(formData.pdfUrl)) {
      addToast('Local file paths (C:\\...) cannot be saved directly. Please upload your file via the upload box.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      const formattedImages = [];
      if (formData.mainImage) {
        formattedImages.push({
          url: formData.mainImage,
          alt: productName,
          isCover: true,
        });
      }
      formData.images.forEach((img) => {
        const url = typeof img === 'string' ? img : img.url;
        if (url && url !== formData.mainImage) {
          formattedImages.push({
            url,
            alt: productName,
            isCover: false,
          });
        }
      });

      const payload = {
        name: productName,
        title: productName,
        slug: formData.slug,
        sku: formData.sku.trim().toUpperCase(),
        category: formData.category,
        shortDescription: formData.shortDescription,
        description: formData.description,
        price: Math.max(0, Number(formData.price) || 0),
        mainImage: formData.mainImage,
        images: formattedImages,
        pdfUrl: formData.pdfUrl || '',
        specifications: {
          ...formData.specifications,
          luminousFlux: formData.specifications.lumens || '',
        },
        tags: typeof formData.tags === 'string'
          ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : formData.tags,
        isFeatured: Boolean(formData.isFeatured),
        isNewArrival: Boolean(formData.isNewArrival),
        isPublished: Boolean(formData.isPublished),
      };

      if (isEditMode) {
        const res = await productService.updateProduct(id, payload);
        if (res.success) {
          addToast('Luminaire specifications successfully updated.', 'success');
          const savedProd = res.product || { ...payload, _id: id };
          setPreviewProduct(savedProd);
          setIsJustUpdated(true);
          setPreviewOpen(true);
        }
      } else {
        const res = await productService.createProduct(payload);
        if (res.success) {
          addToast('New luminaire successfully registered in catalog.', 'success');
          const savedProd = res.product || payload;
          setPreviewProduct(savedProd);
          setIsJustUpdated(true);
          setPreviewOpen(true);
          if (res.product?._id) {
            window.history.replaceState(null, '', `/admin/products/edit/${res.product._id}`);
          }
        }
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Error saving luminaire.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-4 text-center">
        <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
        <span className="text-xs uppercase tracking-luxury text-[#D4AF37] font-semibold">
          Loading Luminaire Architecture...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[10px] uppercase tracking-luxury text-[#D4AF37] font-semibold block">
              {isEditMode ? 'Modify Specifications' : 'New Catalog Entry'}
            </span>
            <h1 className="text-2xl font-serif-luxury font-bold text-white tracking-wide">
              {isEditMode ? formData.title || 'Edit Luminaire' : 'Add Architectural Luminaire'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          {/* Quick Preview Button */}
          <button
            type="button"
            onClick={() => {
              setPreviewProduct({
                ...formData,
                _id: id,
                title: formData.title || formData.name,
              });
              setIsJustUpdated(false);
              setPreviewOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 transition-all shadow-md"
            title="Preview how this luminaire looks on the storefront"
          >
            <Eye className="w-4 h-4 text-[#D4AF37]" />
            <span>Quick Preview</span>
          </button>

          {/* Direct Storefront Link (if has slug) */}
          {formData.slug && (
            <a
              href={`/product/${formData.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl border border-white/10 hover:border-[#D4AF37]/50 bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-semibold uppercase tracking-luxury flex items-center gap-1.5 transition-all shadow-md"
              title="Open public product page in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden md:inline">Open Live</span>
            </a>
          )}

          {/* Save / Update Button */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="btn-gold px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 shadow-xl disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditMode ? 'Update Luminaire' : 'Publish Luminaire'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
        {[
          { id: 'general', label: '1. General Information', icon: Package },
          { id: 'media', label: '2. Media Gallery', icon: ImageIcon },
          { id: 'specs', label: '3. Technical Specs', icon: Sliders },
          { id: 'visibility', label: '4. Visibility & Pricing', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-luxury transition-all shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#D4AF37] text-black font-bold shadow-lg shadow-[#D4AF37]/10'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form noValidate onSubmit={handleSubmit} className="space-y-6">
        {/* Tab 1: General Information */}
        {activeTab === 'general' && (
          <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
            <h2 className="text-base font-serif-luxury font-bold text-white mb-2">
              Luminaire Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Luminaire Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="e.g. Aurelia Brass Pendant Chandelier"
                  className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={handleChange}
                  name="slug"
                  placeholder="aurelia-brass-pendant-chandelier"
                  className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] text-sm font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 text-white text-sm focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  SKU / Model Number
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g. LH-WL-402-BR"
                  className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] text-sm font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                Short Tagline / Brief Description
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                placeholder="Sculptural minimalist brass pendant with warm indirect ambient illumination."
                className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] text-sm"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                Complete Architectural Description
              </label>
              <textarea
                rows={5}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detailed information regarding design pedigree, optical diffuser, installation methods, and finish characteristics..."
                className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] text-sm leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                Search Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="modern, gold, brass, dining, chandelier, minimal"
                className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#D4AF37] text-sm"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Media Gallery */}
        {activeTab === 'media' && (
          <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-base font-serif-luxury font-bold text-white mb-2">
              Visual Presentation & Gallery
            </h2>

            {/* Main Primary Image */}
            <div className="space-y-3 pb-6 border-b border-white/10">
              <label className="block text-xs uppercase tracking-luxury text-neutral-400 font-medium">
                Main Hero Image
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <ImageUploader
                    label="Upload Primary Luminaire Photo"
                    onUploadSuccess={(url) => {
                      setFormData((prev) => ({ ...prev, mainImage: url }));
                      setMainImgError(false);
                    }}
                  />

                  {/* Local Path Warning */}
                  {isLocalPath(formData.mainImage) && (
                    <div className="mt-2 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold">
                        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>Local Computer Path Detected</span>
                      </div>
                      <p className="text-[11px] text-amber-200/90 leading-relaxed">
                        Web browsers cannot load files directly from your computer drive (<code className="bg-black/40 px-1 py-0.5 rounded font-mono">{formData.mainImage}</code>).
                      </p>
                      <p className="text-[11px] text-white font-medium">
                        👉 Click <strong>Browse File from PC</strong> in the box above to upload the file to the server.
                      </p>
                    </div>
                  )}

                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      name="mainImage"
                      value={formData.mainImage}
                      onChange={(e) => {
                        handleChange(e);
                        setMainImgError(false);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={async (e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                          try {
                            const data = new FormData();
                            data.append('file', e.dataTransfer.files[0]);
                            const res = await uploadService.uploadSingle(data);
                            if (res.success && res.file) {
                              setFormData((p) => ({ ...p, mainImage: res.file.url }));
                              setMainImgError(false);
                              addToast('File uploaded successfully from drop.', 'success');
                            }
                          } catch (err) {
                            addToast('Failed to upload dropped file.', 'error');
                          }
                        }
                      }}
                      placeholder="Or paste direct image URL (Unsplash, CDN, /uploads, etc.)..."
                      className="flex-1 px-3 py-2 rounded-xl bg-[#090a0d] border border-white/10 text-xs text-white placeholder-neutral-600 font-mono"
                    />
                    {formData.mainImage && (
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, mainImage: '' }));
                          setMainImgError(false);
                        }}
                        className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="h-44 rounded-xl bg-[#090a0d] border border-white/10 overflow-hidden flex items-center justify-center p-2 relative">
                  {formData.mainImage ? (
                    isLocalPath(formData.mainImage) ? (
                      <div className="text-center p-3 text-amber-400 text-xs">
                        <AlertTriangle className="w-6 h-6 mx-auto mb-1 text-amber-400" />
                        <span className="font-semibold block">Local PC path</span>
                        <span className="text-[10px] text-neutral-400 mt-0.5 block">
                          Please click the upload box above
                        </span>
                      </div>
                    ) : mainImgError ? (
                      <div className="text-center p-3 text-neutral-500 text-xs">
                        <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
                        <span>Unable to load image from URL</span>
                      </div>
                    ) : (
                      <>
                        <img
                          src={formData.mainImage}
                          alt="Primary Luminaire"
                          onError={() => setMainImgError(true)}
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, mainImage: '' }));
                            setMainImgError(false);
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/90 hover:bg-red-600 text-white transition-colors"
                          title="Remove primary image"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )
                  ) : (
                    <div className="text-center text-neutral-600">
                      <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                      <span className="text-[11px]">No primary image configured</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 font-medium">
                  Additional Angles & Detail Shots ({formData.images.length})
                </label>
              </div>

              <ImageUploader
                label="Add Gallery Photo"
                onUploadSuccess={(url) => handleAddGalleryImage(url)}
              />

              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  id="gallery-url-input"
                  placeholder="Or paste direct image URL and press Enter or Add..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#090a0d] border border-white/10 text-xs text-white placeholder-neutral-600 font-mono"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      if (e.target.value.trim()) {
                        handleAddGalleryImage(e.target.value.trim());
                        e.target.value = '';
                      }
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('gallery-url-input');
                    if (el && el.value.trim()) {
                      handleAddGalleryImage(el.value.trim());
                      el.value = '';
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors shrink-0"
                >
                  Add URL
                </button>
              </div>

              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                  {formData.images.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative h-28 rounded-xl bg-[#090a0d] border border-white/10 overflow-hidden group p-1"
                    >
                      <img
                        src={imgUrl}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(idx)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Technical Specifications */}
        {activeTab === 'specs' && (
          <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-base font-serif-luxury font-bold text-white mb-2">
              Engineering & Photometrics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Wattage / Power
                </label>
                <input
                  type="text"
                  name="wattage"
                  value={formData.specifications.wattage}
                  onChange={handleSpecChange}
                  placeholder="e.g. 18W LED"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Input Voltage
                </label>
                <input
                  type="text"
                  name="voltage"
                  value={formData.specifications.voltage}
                  onChange={handleSpecChange}
                  placeholder="e.g. 220-240V AC 50/60Hz"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Color Temperature (CCT)
                </label>
                <input
                  type="text"
                  name="colorTemperature"
                  value={formData.specifications.colorTemperature}
                  onChange={handleSpecChange}
                  placeholder="e.g. 3000K / 4000K / Tunable"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Luminous Flux (Lumens)
                </label>
                <input
                  type="text"
                  name="lumens"
                  value={formData.specifications.lumens}
                  onChange={handleSpecChange}
                  placeholder="e.g. 1,650 lm"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Beam Angle
                </label>
                <input
                  type="text"
                  name="beamAngle"
                  value={formData.specifications.beamAngle}
                  onChange={handleSpecChange}
                  placeholder="e.g. 24° Spot / 120° Diffuse"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  IP Ingress Protection
                </label>
                <input
                  type="text"
                  name="ipRating"
                  value={formData.specifications.ipRating}
                  onChange={handleSpecChange}
                  placeholder="e.g. IP20 (Indoor) / IP65 (Outdoor)"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Finish / Colorway
                </label>
                <input
                  type="text"
                  name="finish"
                  value={formData.specifications.finish}
                  onChange={handleSpecChange}
                  placeholder="e.g. Brushed Brass / Matte Black"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Structural Material
                </label>
                <input
                  type="text"
                  name="material"
                  value={formData.specifications.material}
                  onChange={handleSpecChange}
                  placeholder="e.g. Cast Brass & Frosted Acrylic"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Dimensions (L x W x H)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.specifications.dimensions}
                  onChange={handleSpecChange}
                  placeholder="e.g. Ø350mm x H450mm"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Installation Mounting Type
                </label>
                <input
                  type="text"
                  name="installationType"
                  value={formData.specifications.installationType}
                  onChange={handleSpecChange}
                  placeholder="e.g. Surface Wall Mount / Flush Recessed"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                  Color Rendering Index (CRI)
                </label>
                <input
                  type="text"
                  name="cri"
                  value={formData.specifications.cri}
                  onChange={handleSpecChange}
                  placeholder="e.g. Ra > 92 / Ra > 95"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white text-xs font-mono"
                />
              </div>
            </div>

            {/* Spec Sheet PDF Document */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <label className="block text-xs uppercase tracking-luxury text-neutral-400 font-medium">
                Architectural Technical Data Sheet (PDF Document)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <ImageUploader
                    label="Upload Specification PDF Sheet"
                    onUploadSuccess={(url) => setFormData((prev) => ({ ...prev, pdfUrl: url }))}
                  />
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      name="pdfUrl"
                      value={formData.pdfUrl}
                      onChange={handleChange}
                      placeholder="Or paste direct PDF URL..."
                      className="flex-1 px-3 py-2 rounded-xl bg-[#090a0d] border border-white/10 text-xs text-white placeholder-neutral-600 font-mono"
                    />
                    {formData.pdfUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, pdfUrl: '' }))}
                        className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#090a0d] border border-white/10 flex flex-col justify-center">
                  <span className="text-xs text-neutral-400 font-medium mb-1 block">Current Attached Spec Sheet:</span>
                  {formData.pdfUrl ? (
                    <div className="flex items-center gap-2">
                      <a
                        href={formData.pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#D4AF37] hover:underline font-mono truncate max-w-[280px] flex items-center gap-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{formData.pdfUrl}</span>
                      </a>
                    </div>
                  ) : (
                    <span className="text-xs text-neutral-500">No PDF document attached</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Visibility & Pricing */}
        {activeTab === 'visibility' && (
          <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-base font-serif-luxury font-bold text-white mb-2">
              Commercial Pricing & Placement
            </h2>

            <div className="max-w-xs">
              <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1.5 font-medium">
                Catalog List Price (₹ INR)
              </label>
              <input
                type="number"
                name="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="0 for custom quote"
                className="w-full px-4 py-3 rounded-xl bg-[#090a0d] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37]"
              />
              <span className="text-[11px] text-neutral-500 mt-1 block">
                Leave at 0 if prices are available only via custom trade quote.
              </span>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37] bg-[#090a0d] border-white/20"
                />
                <div>
                  <span className="text-xs font-semibold text-white uppercase tracking-luxury block">
                    Published on Live Storefront
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    When enabled, this luminaire will appear on catalog and search pages.
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37] bg-[#090a0d] border-white/20"
                />
                <div>
                  <span className="text-xs font-semibold text-white uppercase tracking-luxury block">
                    Featured in Homepage Showcase
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Highlights this fixture on the landing page featured carousel.
                  </span>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isNewArrival"
                  checked={formData.isNewArrival}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37] bg-[#090a0d] border-white/20"
                />
                <div>
                  <span className="text-xs font-semibold text-white uppercase tracking-luxury block">
                    New Arrival Tag
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Displays a distinctive "New" badge on catalog cards.
                  </span>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Bottom Bar Actions */}
        <div className="flex items-center justify-between pt-4">
          <Link
            to="/admin/products"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-neutral-300 font-semibold uppercase tracking-luxury transition-colors"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 shadow-2xl disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Submitting to Database...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditMode ? 'Update Luminaire' : 'Publish Luminaire'}</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Live Storefront Preview Modal */}
      <ProductPreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        product={previewProduct || { ...formData, _id: id }}
        categoryName={categories.find((c) => c._id === formData.category)?.name}
        isJustUpdated={isJustUpdated}
        onBackToList={() => navigate('/admin/products')}
      />
    </div>
  );
};
