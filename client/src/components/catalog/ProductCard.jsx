import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Send, Sparkles } from 'lucide-react';
import { InquiryModal } from '../common/InquiryModal';

export const ProductCard = ({ product }) => {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const coverImage =
    product.images?.find((img) => img.isCover)?.url ||
    product.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=85';

  const categoryTitle =
    product.categoryName ||
    product.category?.name ||
    (typeof product.category === 'string'
      ? product.category.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : 'Decorative Lamp');

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="group relative flex flex-col bg-white border border-neutral-200/90 hover:border-[#DC2626] rounded-2xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl"
      >
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#DC2626] border border-neutral-200 shadow-sm">
            {categoryTitle}
          </span>

          {product.isFeatured && (
            <span className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#DC2626] text-white shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
        </div>

        {/* ── PRODUCT IMAGE: 100% CLEAR, BRIGHT & SHARP ── */}
        <Link
          to={`/product/${product.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-neutral-50"
        >
          <img
            src={coverImage}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Card Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
          <div>
            <Link to={`/product/${product.slug}`}>
              <h3 className="font-serif-luxury text-base text-neutral-900 group-hover:text-[#DC2626] transition-colors line-clamp-1 font-bold">
                {product.name}
              </h3>
            </Link>

            {product.shortDescription && (
              <p className="text-xs text-neutral-600 line-clamp-2 mt-1.5 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Simple Features (Finish / Material / Suitable Area) */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.specifications?.finish && (
                <span className="text-[10px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200">
                  {product.specifications.finish.split('/')[0].trim()}
                </span>
              )}
              {product.specifications?.material && (
                <span className="text-[10px] text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-200">
                  {product.specifications.material.split(',')[0].trim()}
                </span>
              )}
              {product.specifications?.colorTemperature && (
                <span className="text-[10px] text-[#DC2626] bg-red-50 px-2 py-0.5 rounded-md border border-red-200 font-semibold">
                  {product.specifications.colorTemperature.includes('Warm') ? 'Warm Glow' : 'Warm / White'}
                </span>
              )}
            </div>
          </div>

          {/* Simple Action Row */}
          <div className="mt-4 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2">
            <Link
              to={`/product/${product.slug}`}
              className="text-xs uppercase tracking-luxury text-[#DC2626] hover:text-[#B91C1C] font-bold flex items-center gap-1.5 transition-colors"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="btn-gold px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm"
              title="Get Price Quote"
            >
              <Send className="w-3 h-3" />
              <span>Get Price</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Inquiry Modal */}
      {inquiryOpen && (
        <InquiryModal
          isOpen={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
          product={product}
        />
      )}
    </>
  );
};
