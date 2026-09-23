import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Layers } from 'lucide-react';

export const PRODUCT_CATEGORIES_DATA = [
  {
    name: 'Wall Lamp',
    slug: 'wall-lamp',
    icon: '💡',
    sub: [
      { name: 'LED Wall Lamp', slug: 'led-wall-lamp' },
      { name: 'E27 Wall Lamp', slug: 'e27-wall-lamp' },
      { name: 'Bedside Sconce', slug: 'vintage-brass-bedside-sconce' },
    ],
  },
  {
    name: 'Pendant Lamp',
    slug: 'pendant-lamp',
    icon: '✨',
    sub: [
      { name: 'LED Hanging Lamp', slug: 'led-hanging-lamp' },
      { name: 'E27 Hanging Lamp', slug: 'e27-hanging-lamp' },
      { name: 'Kitchen Island Pendant', slug: 'linear-dining-island-pendant' },
    ],
  },
  {
    name: 'Chandelier',
    slug: 'chandelier',
    icon: '🌟',
    sub: [
      { name: 'Modern Crystal', slug: 'crystal-chandelier' },
      { name: 'LED Ring Chandelier', slug: 'led-chandelier' },
      { name: 'E27 Classical Chandelier', slug: 'e27-chandelier' },
    ],
  },
  {
    name: 'Double Height',
    slug: 'double-height',
    icon: '🏛️',
    sub: [
      { name: 'Crystal Cascade Chandelier', slug: 'crystal-chandelier' },
      { name: 'Modern Double Height Chandelier', slug: 'modern-chandelier-dh' },
    ],
  },
  {
    name: 'Dining Table Lamp',
    slug: 'dining-table-lamp',
    icon: '🍽️',
    sub: [
      { name: 'Linear Dining Pendants', slug: 'linear-dining-island-pendant' },
      { name: 'Warm Ambiance Cluster', slug: 'amber-ribbed-dome-pendant' },
    ],
  },
  {
    name: 'Outdoor Light',
    slug: 'outdoor-light',
    icon: '🌿',
    sub: [
      { name: 'Gate Pillar Lamp', slug: 'gate-lamp' },
      { name: 'Waterproof Wall Light', slug: 'outdoor-wall-lamp' },
    ],
  },
  {
    name: 'Table Lamp',
    slug: 'table-lamp',
    icon: '🪔',
    sub: [
      { name: 'Bedside Table Lamp', slug: 'bedside-table-lamp' },
      { name: 'Study & Desk Lamp', slug: 'desk-study-lamp' },
    ],
  },
  {
    name: 'Floor Lamp',
    slug: 'floor-lamp',
    icon: '🕯️',
    sub: [
      { name: 'Arc Floor Lamp', slug: 'arc-floor-lamp' },
      { name: 'Minimalist Standing Lamp', slug: 'minimalist-column' },
    ],
  },
  {
    name: 'LED Filament Bulb',
    slug: 'led-filament-bulb',
    icon: '💫',
    sub: [
      { name: 'Vintage Warm Edison E27', slug: 'vintage-edison-e27' },
      { name: 'Golden Spiral Tube', slug: 'golden-spiral-tube' },
    ],
  },
  {
    name: 'Spare Part',
    slug: 'spare-part',
    icon: '🔧',
    sub: [
      { name: 'Ceiling Canopy & Base', slug: 'hanging-base' },
      { name: 'LED Constant Current Driver', slug: 'spare-driver' },
    ],
  },
];

export const CascadingCategoryDropdown = ({ onClose, className = '' }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.18 }}
      className={`relative bg-white text-neutral-800 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-neutral-200/90 p-2 w-64 select-none ${className}`}
      onMouseLeave={() => {
        setActiveCategory(null);
      }}
    >
      {/* Category List */}
      <div className="space-y-0.5">
        {PRODUCT_CATEGORIES_DATA.map((cat) => {
          const hasSub = cat.sub && cat.sub.length > 0;
          const isHovered = activeCategory?.slug === cat.slug;

          return (
            <div
              key={cat.slug}
              className="relative"
              onMouseEnter={() => setActiveCategory(cat)}
            >
              <Link
                to={`/category/${cat.slug}`}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isHovered
                    ? 'bg-red-50/80 text-[#DC2626]'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm leading-none">{cat.icon}</span>
                  <span>{cat.name}</span>
                </div>
                {hasSub && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 transition-transform ${
                      isHovered ? 'translate-x-0.5 text-[#DC2626]' : 'text-neutral-400'
                    }`}
                  />
                )}
              </Link>

              {/* Sub Dropdown Flyout to the Right */}
              <AnimatePresence>
                {isHovered && hasSub && (
                  <motion.div
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-[calc(100%+6px)] top-0 w-60 bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.14)] border border-neutral-200/90 p-2 z-50"
                  >
                    <div className="px-3 py-1.5 mb-1 border-b border-neutral-100 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#DC2626]">
                        {cat.name} Types
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {cat.sub.length} options
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {cat.sub.map((subItem) => (
                        <Link
                          key={subItem.slug}
                          to={`/category/${cat.slug}/${subItem.slug}`}
                          onClick={onClose}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-neutral-600 hover:text-[#DC2626] hover:bg-red-50/60 transition-colors"
                        >
                          <span>{subItem.name}</span>
                          <ChevronRight className="w-3 h-3 text-neutral-300" />
                        </Link>
                      ))}
                    </div>
                    <div className="mt-1.5 pt-1.5 border-t border-neutral-100 px-3">
                      <Link
                        to={`/category/${cat.slug}`}
                        onClick={onClose}
                        className="text-[11px] font-semibold text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1"
                      >
                        All {cat.name}s <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom link: View All Categories */}
      <div className="mt-2 pt-2 border-t border-neutral-100 px-2 flex items-center justify-between">
        <Link
          to="/categories"
          onClick={onClose}
          className="w-full text-center py-1.5 rounded-lg text-xs font-bold text-[#DC2626] hover:bg-red-50/70 transition-colors flex items-center justify-center gap-1.5"
        >
          <Layers className="w-3.5 h-3.5" /> View All Categories
        </Link>
      </div>
    </motion.div>
  );
};
