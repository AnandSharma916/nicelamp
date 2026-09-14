import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { productService } from '../../services/api';
import { ProductCard } from '../catalog/ProductCard';

export const FeaturedProductsSection = ({ section }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts({ featured: true, limit: 8 });
        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (err) {
        console.error('Failed to load featured products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const title = section?.title || 'Curated Signature Fixtures';
  const subtitle = section?.subtitle || 'Spotlight On Architectural Highlights';
  const description =
    section?.description ||
    'Hand-selected luminaires representing our highest echelon of optical engineering, material purity, and timeless form factor.';
  const btnText = section?.buttonText || 'Browse Full Catalog';
  const btnLink = section?.buttonLink || '/catalog';

  return (
    <section className="py-24 bg-[#0d0f14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-semibold block mb-2">
              {subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
              {description}
            </p>
          </div>
          <Link
            to={btnLink}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-[#c5a880] hover:text-white font-semibold group shrink-0 transition-colors"
          >
            <span>{btnText}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
