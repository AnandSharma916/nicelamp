import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Maximize2,
  Share2,
} from 'lucide-react';
import { productService } from '../../services/api';
import { ProductCard } from '../../components/catalog/ProductCard';
import { InquiryModal } from '../../components/common/InquiryModal';
import { useToast } from '../../context/ToastContext';
import { useSettings } from '../../context/SettingsContext';

export const ProductDetail = () => {
  const { settings } = useSettings();
  const { slug } = useParams();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductBySlug(slug);
        if (data.success && data.product) {
          setProduct(data.product);
          setRelatedProducts(data.relatedProducts || []);
          setSelectedImageIndex(0);
          document.title = `${data.product.name} (${data.product.sku}) | ${settings.companyName || 'Architectural Lighting'}`;
        }
      } catch (err) {
        console.error('Failed to fetch product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'success');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-white">
        <div className="w-10 h-10 rounded-full border-2 border-[#DC2626] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-white flex items-center justify-center text-center px-4">
        <div className="max-w-md">
          <h2 className="text-2xl font-serif-luxury text-neutral-900 font-bold mb-2">Luminaire Not Found</h2>
          <p className="text-sm text-neutral-500 mb-6">
            The requested luminaire does not exist or may have been unlisted.
          </p>
          <Link
            to="/catalog"
            className="btn-gold px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-luxury inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0
    ? product.images
    : [{ url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80', alt: product.name }];

  const currentImage = images[selectedImageIndex] || images[0];

  const specsList = [
    { label: 'Model Code', value: product.sku },
    { label: 'Category', value: product.category?.name },
    { label: 'Dimensions', value: product.specifications?.dimensions },
    { label: 'Material', value: product.specifications?.material },
    { label: 'Finish & Color', value: product.specifications?.finish },
    { label: 'Light Source / Bulb', value: product.specifications?.wattage },
    { label: 'Input Voltage', value: product.specifications?.voltage },
    { label: 'Light Color (Warm / White)', value: product.specifications?.colorTemperature },
    { label: 'Water & Weather Protection', value: product.specifications?.ipRating },
    { label: 'Mounting / Placement', value: product.specifications?.installationType },
  ].filter((item) => item.value && String(item.value).trim() !== '');

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      {/* Draft Notification Banner */}
      {!product.isPublished && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-800 py-2.5 px-4 text-center text-xs font-medium flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Admin Preview: This luminaire is currently saved as a <strong>Draft</strong> and is hidden from public catalog visitors.</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-neutral-200">
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link to="/" className="hover:text-neutral-900 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link to="/catalog" className="hover:text-neutral-900 transition-colors">Catalog</Link>
          {product.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <Link to={`/category/${product.category.slug}`} className="hover:text-neutral-900 transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-[#DC2626] truncate font-semibold">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Gallery Stage */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md group">
              <img
                src={currentImage.url}
                alt={currentImage.alt || product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-black/75 backdrop-blur-md text-red-400 border border-white/10 shadow-lg">
                  {product.sku}
                </span>
                {product.isFeatured && (
                  <span className="text-xs font-bold uppercase tracking-luxury px-2.5 py-1 rounded-lg bg-[#DC2626] text-white shadow flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md text-white hover:text-red-400 border border-white/20 transition-colors shadow-lg"
                  title="Copy share link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail Selector (if multiple images) */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                      selectedImageIndex === index
                        ? 'border-[#DC2626] shadow-md scale-105'
                        : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specifications & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {product.category?.name && (
                <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block mb-2">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-neutral-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded border border-neutral-200">
                  SKU: <strong className="text-neutral-900 font-bold">{product.sku}</strong>
                </span>
                <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Specifier Certified
                </span>
              </div>
            </div>

            {product.shortDescription && (
              <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                {product.shortDescription}
              </p>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setInquiryOpen(true)}
                className="btn-gold flex-1 py-3.5 px-6 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Enquire About This Product</span>
              </button>

              {product.pdfUrl && (
                <a
                  href={product.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-gold py-3.5 px-5 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Spec Sheet</span>
                </a>
              )}
            </div>

            {/* Technical Specifications Table */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <h3 className="font-serif-luxury text-sm uppercase tracking-luxury text-neutral-900 font-bold mb-4">
                Technical Specifications
              </h3>
              <div className="rounded-xl bg-[#f8fafc] border border-neutral-200 overflow-hidden divide-y divide-neutral-200">
                {specsList.map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 text-xs">
                    <span className="text-neutral-500 font-medium">{spec.label}</span>
                    <span className="text-neutral-900 font-semibold text-right ml-4">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Architectural Description */}
            {product.description && (
              <div className="pt-6 border-t border-neutral-200 space-y-3">
                <h3 className="font-serif-luxury text-sm uppercase tracking-luxury text-neutral-900 font-bold">
                  Architectural Description
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block mb-1">
                  Coordinated Fixtures
                </span>
                <h2 className="text-2xl font-serif-luxury text-neutral-900 font-bold">
                  Related Luminaires in {product.category?.name}
                </h2>
              </div>
              <Link
                to={`/category/${product.category?.slug}`}
                className="text-xs uppercase tracking-luxury text-[#DC2626] hover:text-neutral-900 font-bold transition-colors hidden sm:block"
              >
                View Category →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel._id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} product={product} />
    </div>
  );
};
