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

export const ProductDetail = () => {
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
          document.title = `${data.product.name} (${data.product.sku}) | LightHut`;
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
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[#090a0d]">
        <div className="w-10 h-10 rounded-full border-2 border-[#c5a880] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-[#090a0d] flex items-center justify-center text-center px-4">
        <div className="max-w-md">
          <h2 className="text-2xl font-serif-luxury text-white font-bold mb-2">Luminaire Not Found</h2>
          <p className="text-sm text-neutral-400 mb-6">
            The requested luminaire does not exist or may have been unlisted.
          </p>
          <Link
            to="/catalog"
            className="btn-gold px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-luxury inline-flex items-center gap-2"
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
    { label: 'SKU / Model Code', value: product.sku },
    { label: 'Category', value: product.category?.name },
    { label: 'Dimensions', value: product.specifications?.dimensions },
    { label: 'Material', value: product.specifications?.material },
    { label: 'Finish / Plating', value: product.specifications?.finish },
    { label: 'Wattage & Light Source', value: product.specifications?.wattage },
    { label: 'Input Voltage', value: product.specifications?.voltage },
    { label: 'Color Temperature (CCT)', value: product.specifications?.colorTemperature },
    { label: 'Ingress Protection (IP)', value: product.specifications?.ipRating },
    { label: 'Installation Type', value: product.specifications?.installationType },
    { label: 'Beam Angle', value: product.specifications?.beamAngle },
    { label: 'Color Rendering (CRI)', value: product.specifications?.cri },
    { label: 'Luminous Flux', value: product.specifications?.luminousFlux },
  ].filter((item) => item.value && String(item.value).trim() !== '');

  return (
    <div className="pt-24 pb-20 bg-[#090a0d] min-h-screen">
      {/* Draft Notification Banner */}
      {!product.isPublished && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-300 py-2.5 px-4 text-center text-xs font-medium flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Admin Preview: This luminaire is currently saved as a <strong>Draft</strong> and is hidden from public catalog visitors.</span>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-white/5">
        <nav className="flex items-center gap-2 text-xs text-neutral-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <Link to="/catalog" className="hover:text-white transition-colors">Catalog</Link>
          {product.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              <Link to={`/category/${product.category.slug}`} className="hover:text-white transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-[#c5a880] truncate font-medium">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Image Gallery Stage */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#14171d] border border-white/10 shadow-2xl group">
              <img
                src={currentImage.url}
                alt={currentImage.alt || product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[#c5a880] border border-white/10 shadow-lg">
                  {product.sku}
                </span>
                {product.isFeatured && (
                  <span className="text-xs font-semibold uppercase tracking-luxury px-2.5 py-1 rounded-lg bg-[#c5a880] text-black shadow flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2.5 rounded-xl bg-black/70 backdrop-blur-md text-white hover:text-[#c5a880] border border-white/10 transition-colors shadow-lg"
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
                        ? 'border-[#c5a880] shadow-lg scale-105'
                        : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
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
                <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-semibold block mb-2">
                  {product.category.name}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white tracking-tight leading-tight">
                {product.name}
              </h1>
              <div className="mt-3 flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-400 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                  SKU: <strong className="text-white font-semibold">{product.sku}</strong>
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Specifier Certified
                </span>
              </div>
            </div>

            {product.shortDescription && (
              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {product.shortDescription}
              </p>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setInquiryOpen(true)}
                className="btn-gold flex-1 py-3.5 px-6 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center justify-center gap-2 shadow-xl"
              >
                <Send className="w-4 h-4" />
                <span>Enquire About This Product</span>
              </button>

              {product.pdfUrl && (
                <a
                  href={product.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline-gold py-3.5 px-5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Spec Sheet</span>
                </a>
              )}
            </div>

            {/* Technical Specifications Table */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="font-serif-luxury text-sm uppercase tracking-luxury text-white font-semibold mb-4">
                Technical Specifications
              </h3>
              <div className="rounded-xl bg-[#14171d] border border-white/10 overflow-hidden divide-y divide-white/5">
                {specsList.map((spec, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 text-xs">
                    <span className="text-neutral-400 font-medium">{spec.label}</span>
                    <span className="text-white font-medium text-right ml-4">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Architectural Description */}
            {product.description && (
              <div className="pt-6 border-t border-white/10 space-y-3">
                <h3 className="font-serif-luxury text-sm uppercase tracking-luxury text-white font-semibold">
                  Architectural Description
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-line">
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-semibold block mb-1">
                  Coordinated Fixtures
                </span>
                <h2 className="text-2xl font-serif-luxury text-white font-bold">
                  Related Luminaires in {product.category?.name}
                </h2>
              </div>
              <Link
                to={`/category/${product.category?.slug}`}
                className="text-xs uppercase tracking-luxury text-[#c5a880] hover:text-white font-semibold transition-colors hidden sm:block"
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
