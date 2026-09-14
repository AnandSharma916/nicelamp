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
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80';

  const secondaryImage =
    product.images?.[1]?.url || coverImage;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="group relative flex flex-col bg-[#14171d] border border-white/5 rounded-2xl overflow-hidden hover:border-[#c5a880]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#c5a880]/5"
      >
        {/* Top Badges (Featured & Category) */}
        <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[#c5a880] border border-white/10 shadow">
            {product.sku}
          </span>
          {product.isFeatured && (
            <span className="text-[10px] font-semibold uppercase tracking-luxury px-2 py-0.5 rounded-md bg-[#c5a880] text-black shadow flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> Featured
            </span>
          )}
        </div>

        {/* Product Image Stage */}
        <Link
          to={`/product/${product.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-[#0c0e12]"
        >
          <img
            src={coverImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14171d] via-transparent to-transparent opacity-80" />
        </Link>

        {/* Card Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {product.category?.name && (
              <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] font-semibold block mb-1">
                {product.category.name}
              </span>
            )}
            <Link to={`/product/${product.slug}`}>
              <h3 className="font-serif-luxury text-base text-white group-hover:text-[#c5a880] transition-colors line-clamp-1 font-medium">
                {product.name}
              </h3>
            </Link>

            {product.shortDescription && (
              <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Micro spec pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.specifications?.wattage && (
                <span className="text-[10px] text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {product.specifications.wattage.split(' ')[0]}
                </span>
              )}
              {product.specifications?.finish && (
                <span className="text-[10px] text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {product.specifications.finish.split('/')[0].trim()}
                </span>
              )}
              {product.specifications?.ipRating && (
                <span className="text-[10px] text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  {product.specifications.ipRating.split(' ')[0]}
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-2">
            <Link
              to={`/product/${product.slug}`}
              className="text-xs uppercase tracking-luxury text-neutral-300 hover:text-white font-semibold flex items-center gap-1.5 transition-colors group-hover:text-[#c5a880]"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setInquiryOpen(true)}
              className="p-2 rounded-lg bg-white/5 hover:bg-[#c5a880]/20 hover:text-[#c5a880] text-neutral-400 border border-white/5 transition-colors"
              title="Enquire About This Product"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} product={product} />
    </>
  );
};
