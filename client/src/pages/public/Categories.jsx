import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';
import { categoryService } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';
import { MASTER_CATEGORIES } from '../../data/catalogData';

export const Categories = () => {
  const { settings } = useSettings();
  const [categories, setCategories] = useState(MASTER_CATEGORIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `Lighting Categories | ${settings.companyName || 'NiceLamp'}`;
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

  return (
    <div className="pt-24 pb-20 bg-[#090a0d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-white/10 mb-12">
        <span className="text-xs uppercase tracking-luxury text-[#D4AF37] font-semibold block mb-2">
          Architecture & Ambience
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
          Product Categories
        </h1>
        <p className="text-sm text-neutral-400 mt-2 max-w-xl">
          Browse our architectural and decorative luminaires grouped by application and spatial elevation.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={category._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group relative block h-80 rounded-2xl overflow-hidden border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 shadow-xl"
                >
                  <img
                    src={category.image || 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/60 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#D4AF37] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {category.productsCount !== undefined && (
                        <span className="text-xs text-neutral-300 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md">
                          {category.productsCount} {category.productsCount === 1 ? 'Fixture' : 'Fixtures'}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-serif-luxury text-white font-bold group-hover:text-[#D4AF37] transition-colors">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed opacity-90">
                          {category.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-luxury text-[#D4AF37] group-hover:translate-x-1 transition-transform">
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
    </div>
  );
};
