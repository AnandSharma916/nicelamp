import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Layers, Lightbulb } from 'lucide-react';
import { categoryService, productService } from '../../services/api';
import { ProductCard } from '../../components/catalog/ProductCard';
import { useSettings } from '../../context/SettingsContext';

export const CategoryPage = () => {
  const { settings } = useSettings();
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        const [catData, prodData] = await Promise.all([
          categoryService.getCategoryBySlug(slug),
          productService.getProducts({ category: slug, limit: 30 }),
        ]);

        if (catData.success && catData.category) {
          setCategory(catData.category);
          document.title = `${catData.category.name} | ${settings.companyName || 'Lighting Studio'}`;
        }
        if (prodData.success) {
          setProducts(prodData.products || []);
        }
      } catch (err) {
        console.error('Error loading category page:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-white">
        <div className="w-10 h-10 rounded-full border-2 border-[#DC2626] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-white flex items-center justify-center text-center px-4">
        <div className="max-w-md">
          <Layers className="w-12 h-12 text-[#DC2626] mx-auto mb-4" />
          <h2 className="text-2xl font-serif-luxury text-neutral-900 font-bold mb-2">Category Not Found</h2>
          <p className="text-sm text-neutral-500 mb-6">
            The lighting category you requested does not exist or has been modified.
          </p>
          <Link
            to="/catalog"
            className="btn-gold px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-luxury inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-[#f8fafc] min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative border-b border-neutral-200 overflow-hidden bg-white">
        {category.image && (
          <div className="absolute inset-0 z-0">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover object-center opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury text-[#DC2626] hover:text-neutral-900 font-bold transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Categories
          </Link>

          <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block mb-2">
            Collection Overview
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-neutral-900 tracking-tight">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-sm sm:text-base text-neutral-600 mt-3 max-w-2xl leading-relaxed font-normal">
              {category.description}
            </p>
          )}

          <div className="mt-6 flex items-center gap-3">
            <span className="text-xs font-mono text-[#DC2626] bg-[#DC2626]/10 border border-[#DC2626]/30 px-3 py-1 rounded-md font-bold">
              {products.length} {products.length === 1 ? 'Design' : 'Designs Available'}
            </span>
          </div>
        </div>
      </div>

      {/* Category Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-2xl bg-white border border-neutral-200 p-8 max-w-xl mx-auto shadow-sm">
            <Lightbulb className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-serif-luxury text-neutral-900 font-bold">No Fixtures in this Category</h3>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              New architectural designs for this collection are currently undergoing optical testing and will be published shortly.
            </p>
            <Link
              to="/catalog"
              className="btn-gold inline-block px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-luxury mt-6"
            >
              Browse Full Catalog
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
