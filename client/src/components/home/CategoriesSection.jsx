import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { categoryService } from '../../services/api';

export const CategoriesSection = ({ section }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getCategories();
        if (data.success) {
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const title = section?.title || 'Explore By Architectural Category';
  const subtitle = section?.subtitle || 'Engineered For Every Space & Elevation';
  const description =
    section?.description ||
    'Navigate our comprehensive range of interior sconces, suspended pendants, sculptural task lamps, and exterior facade luminaires.';

  return (
    <section className="py-24 bg-[#0d0f14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
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
            to="/catalog"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-[#c5a880] hover:text-white font-semibold group shrink-0 transition-colors"
          >
            <span>View Complete Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Category Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group relative block h-80 rounded-2xl overflow-hidden border border-white/10 hover:border-[#c5a880]/50 transition-all duration-500 shadow-xl"
                >
                  {/* Category Image */}
                  <img
                    src={category.image || 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                  {/* Category Info Overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#c5a880] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {category.productsCount !== undefined && (
                        <span className="text-[11px] text-neutral-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md">
                          {category.productsCount} {category.productsCount === 1 ? 'Fixture' : 'Fixtures'}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-serif-luxury text-white font-bold group-hover:text-[#c5a880] transition-colors">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed opacity-90">
                          {category.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-luxury text-[#c5a880] group-hover:translate-x-1 transition-transform">
                        <span>Explore Collection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
