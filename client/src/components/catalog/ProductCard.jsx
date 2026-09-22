import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Send, Sparkles, Lightbulb, Zap, Check } from 'lucide-react';
import { InquiryModal } from '../common/InquiryModal';
import { useAmbiance } from '../common/AmbientLightExperience';

export const ProductCard = ({ product }) => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [isIlluminated, setIsIlluminated] = useState(false);
  const { activeKelvin } = useAmbiance();

  const coverImage =
    product.images?.find((img) => img.isCover)?.url ||
    product.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80';

  const categoryTitle =
    product.categoryName ||
    product.category?.name ||
    (typeof product.category === 'string'
      ? product.category.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : 'Architectural Luminaire');

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4 }}
        className="group relative flex flex-col bg-[#14171d] border border-white/10 hover:border-white/25 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)]"
      >
        {/* Dynamic Illumination Glow Bloom behind card when turned ON */}
        <div
          className="absolute -inset-0.5 rounded-2xl pointer-events-none transition-opacity duration-700 blur-xl"
          style={{
            backgroundColor: activeKelvin.hex,
            opacity: isIlluminated ? 0.35 : 0,
          }}
        />

        {/* Top Badges (SKU & Featured Status) */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[#CC1F1F] border border-white/10 shadow">
            {product.sku || 'NL-FX'}
          </span>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {product.isFeatured && (
              <span className="text-[9.5px] font-semibold uppercase tracking-luxury px-2 py-0.5 rounded-md bg-[#CC1F1F] text-black shadow flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" /> Featured
              </span>
            )}

            {/* Interactive "Illuminate Fixture" Mode Button */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsIlluminated(!isIlluminated);
              }}
              title={isIlluminated ? 'Turn light off' : 'Illuminate fixture'}
              className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold flex items-center gap-1 transition-all backdrop-blur-md border ${
                isIlluminated
                  ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.6)]'
                  : 'bg-black/70 hover:bg-black text-neutral-300 border-white/15'
              }`}
            >
              <Lightbulb className={`w-3 h-3 ${isIlluminated ? 'fill-black' : ''}`} />
              <span>{isIlluminated ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        {/* Product Image Stage */}
        <Link
          to={`/product/${product.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-[#0c0e12] group/stage"
        >
          {/* Active Radial Bloom Halo when Illuminated */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-10"
            style={{
              background: `radial-gradient(circle at 50% 45%, rgba(${activeKelvin.rgb}, ${isIlluminated ? 0.45 : 0}) 0%, transparent 65%)`,
            }}
          />

          <img
            src={coverImage}
            alt={product.name}
            className={`w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover/stage:scale-108 ${
              isIlluminated
                ? 'brightness-110 contrast-105 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'brightness-[0.88] group-hover/stage:brightness-100'
            }`}
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14171d] via-[#14171d]/30 to-transparent opacity-80" />

          {/* Color Temp Indicator Pill on bottom right of image */}
          {product.specifications?.colorTemperature && (
            <span className="absolute bottom-2 right-2 z-10 text-[9.5px] font-mono px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-white/10 text-neutral-300">
              {product.specifications.colorTemperature.split(' ')[0]}
            </span>
          )}
        </Link>

        {/* Card Content */}
        <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-luxury text-[#CC1F1F] font-bold block mb-1">
              {categoryTitle}
            </span>

            <Link to={`/product/${product.slug}`}>
              <h3 className="font-serif-luxury text-base text-white group-hover:text-[#CC1F1F] transition-colors line-clamp-1 font-bold">
                {product.name}
              </h3>
            </Link>

            {product.shortDescription && (
              <p className="text-xs text-neutral-400 line-clamp-2 mt-2 leading-relaxed font-light">
                {product.shortDescription}
              </p>
            )}

            {/* Micro Specs Pills */}
            <div className="flex flex-wrap gap-1.5 mt-3.5">
              {product.specifications?.wattage && (
                <span className="text-[10px] text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">
                  {product.specifications.wattage.split(' ')[0]}
                </span>
              )}
              {product.specifications?.finish && (
                <span className="text-[10px] text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">
                  {product.specifications.finish.split('/')[0].trim()}
                </span>
              )}
              {product.specifications?.ipRating && (
                <span className="text-[10px] text-neutral-300 bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">
                  {product.specifications.ipRating.split(' ')[0]}
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
            <Link
              to={`/product/${product.slug}`}
              className="text-xs uppercase tracking-luxury text-neutral-300 hover:text-white font-semibold flex items-center gap-1.5 transition-colors group-hover:text-[#CC1F1F]"
            >
              <span>Explore Fixture</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              type="button"
              onClick={() => setInquiryOpen(true)}
              className="p-2 rounded-lg bg-white/5 hover:bg-[#CC1F1F] hover:text-black text-neutral-300 transition-colors border border-white/5"
              title="Request Architectural Quote"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Inquiry Modal pre-configured for this fixture */}
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
