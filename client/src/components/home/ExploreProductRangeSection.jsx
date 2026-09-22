import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MASTER_CATEGORIES } from '../../data/catalogData';

// Tailored photography for each of the 10 lighting categories
const CATEGORY_IMAGE_MAP = {
  'wall-lamp': 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80',
  'pendant-lamp': 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=80',
  'chandelier': 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=900&q=80',
  'double-height': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  'dining-table-lamp': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
  'outdoor-light': 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80',
  'table-lamp': 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=900&q=80',
  'floor-lamp': 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=900&q=80',
  'led-filament-bulb': 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=900&q=80',
  'spare-part': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80',
};

export const ExploreProductRangeSection = ({ section }) => {
  // Start with Chandelier (index 2) as default center card
  const [activeIndex, setActiveIndex] = useState(2);
  const categories = MASTER_CATEGORIES;
  const count = categories.length;

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Visible slots matching the 7 cards shown in the user's reference screenshot:
  // -3 (Far Left), -2 (Left Outer), -1 (Left Inner), 0 (Center Active), +1 (Right Inner), +2 (Right Outer), +3 (Far Right)
  const visibleRange = [-3, -2, -1, 0, 1, 2, 3];

  return (
    <section className="py-20 sm:py-28 bg-[#ffffff] text-[#111111] overflow-hidden select-none border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
        {/* Title matching exact screenshot */}
        <h2 className="text-2xl sm:text-3xl lg:text-[2.2rem] font-medium tracking-[0.16em] uppercase text-[#111111] font-sans">
          EXPLORE OUR PRODUCT RANGE
        </h2>

        {/* Subtitle matching exact screenshot copy */}
        <p className="text-xs sm:text-[13px] text-[#6b6b6b] mt-3 max-w-2xl mx-auto font-normal tracking-wide leading-relaxed">
          Discover diverse world of our products, each category offering a unique solution for the lifestyle.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════
          EXACT CAROUSEL STAGE WITH CENTER HIGHLIGHTED CARD
          & IN-LINE NAVIGATION ARROWS MATCHING SCREENSHOT
      ════════════════════════════════════════════════════════ */}
      <div className="relative w-full flex items-center justify-center min-h-[500px] sm:min-h-[550px] overflow-hidden">
        
        {/* Cards Row Container */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full max-w-full px-2 sm:px-4">
          {visibleRange.map((offset) => {
            const index = (activeIndex + offset + count) % count;
            const category = categories[index];
            const isCenter = offset === 0;
            const isImmediateNeighbor = Math.abs(offset) === 1;
            const isSecondNeighbor = Math.abs(offset) === 2;
            const imageSrc = CATEGORY_IMAGE_MAP[category.slug] || category.image;

            return (
              <React.Fragment key={`${category.slug}-${offset}`}>
                {/* ── LEFT ARROW (←) positioned right between card -2 and card -1 ── */}
                {offset === -1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    aria-label="Previous product category"
                    className="z-30 text-[#222222] hover:text-black hover:scale-125 transition-transform duration-200 p-1 sm:p-2 cursor-pointer hidden md:flex items-center justify-center"
                  >
                    <span className="text-xl sm:text-2xl font-light">←</span>
                  </button>
                )}

                {/* ── CAROUSEL CARD ── */}
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isCenter ? 1 : isImmediateNeighbor ? 0.9 : isSecondNeighbor ? 0.75 : 0.45,
                    scale: isCenter ? 1 : isImmediateNeighbor ? 0.94 : isSecondNeighbor ? 0.88 : 0.82,
                    y: isCenter ? 0 : 6,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => {
                    if (!isCenter) {
                      setActiveIndex(index);
                    }
                  }}
                  className={`relative shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                    isCenter
                      ? 'w-[230px] sm:w-[280px] lg:w-[310px] h-[440px] sm:h-[490px] lg:h-[520px] shadow-[0_20px_45px_rgba(0,0,0,0.18)] z-20 ring-1 ring-black/5'
                      : isImmediateNeighbor
                      ? 'w-[160px] sm:w-[200px] lg:w-[225px] h-[370px] sm:h-[415px] lg:h-[440px] shadow-sm z-10 hover:opacity-100'
                      : isSecondNeighbor
                      ? 'w-[140px] sm:w-[175px] lg:w-[195px] h-[330px] sm:h-[370px] lg:h-[390px] shadow-sm z-5 hover:opacity-95'
                      : 'w-[110px] sm:w-[140px] lg:w-[160px] h-[290px] sm:h-[320px] lg:h-[340px] opacity-40 z-0 hidden lg:block'
                  }`}
                >
                  {/* Category Photography */}
                  <img
                    src={imageSrc}
                    alt={category.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out hover:scale-105"
                    loading="lazy"
                  />

                  {/* Gradient Shadow Overlay for Text Readability */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity ${
                      isCenter ? 'opacity-85' : 'opacity-70'
                    }`}
                  />

                  {/* ── CARD BOTTOM CONTENT ── */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col items-center justify-end text-center z-10">
                    {/* Category Title */}
                    <h3
                      className={`text-white transition-all text-center tracking-normal ${
                        isCenter
                          ? 'text-base sm:text-lg font-medium mb-3 drop-shadow'
                          : 'text-xs sm:text-sm font-normal mb-0.5 text-white/95 drop-shadow-sm line-clamp-1'
                      }`}
                    >
                      {category.name}
                    </h3>

                    {/* Center Card Action Button: "Find Out More" matching exact screenshot */}
                    {isCenter && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-full flex justify-center mt-1"
                      >
                        <Link
                          to={`/category/${category.slug}`}
                          className="inline-block px-6 py-2 rounded-[3px] bg-[#3f3630] hover:bg-[#25201c] text-white text-[11px] sm:text-xs font-sans tracking-wide font-medium shadow-md hover:shadow-lg transition-all duration-200"
                        >
                          Find Out More
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* ── RIGHT ARROW (→) positioned right between card +1 and card +2 ── */}
                {offset === 1 && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    aria-label="Next product category"
                    className="z-30 text-[#222222] hover:text-black hover:scale-125 transition-transform duration-200 p-1 sm:p-2 cursor-pointer hidden md:flex items-center justify-center"
                  >
                    <span className="text-xl sm:text-2xl font-light">→</span>
                  </button>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile Edge Navigation Arrows (for small screens where in-line arrows are hidden) */}
        <div className="md:hidden absolute inset-x-2 top-1/2 -translate-y-1/2 z-30 flex items-center justify-between pointer-events-none">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous"
            className="pointer-events-auto p-2 bg-white/90 rounded-full shadow-md text-neutral-800 text-lg"
          >
            ←
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next"
            className="pointer-events-auto p-2 bg-white/90 rounded-full shadow-md text-neutral-800 text-lg"
          >
            →
          </button>
        </div>
      </div>

      {/* Navigation Indicators / Dots */}
      <div className="mt-8 sm:mt-10 flex items-center justify-center gap-1.5">
        {categories.map((cat, idx) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to ${cat.name}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === idx
                ? 'w-7 bg-[#3f3630]'
                : 'w-1.5 bg-neutral-200 hover:bg-neutral-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
