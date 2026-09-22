import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Building2,
  Trees,
  Wrench,
  Sun,
  Flame,
  ArrowUpRight,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Architectural Lighting Catalog Tree Data
───────────────────────────────────────────────────────────── */
export const LIGHTING_CATEGORY_TREE = [
  {
    id: 'wall-lamp',
    name: 'Wall Lamp',
    slug: 'wall-lamp',
    icon: Lightbulb,
    tag: 'Interior Sconces',
    subcategories: [
      {
        id: 'led-wall-lamp',
        name: 'LED Wall Lamp',
        slug: 'led-wall-lamp',
        count: 4,
        items: [
          { name: 'NL-WL101 Slim Linear LED', slug: 'nl-wl101-slim-led-wall-lamp' },
          { name: 'NL-WL102 360° Halo Sconce', slug: 'nl-wl102-round-led-halo-wall-light' },
          { name: 'Up & Down Grazer Beam', slug: 'architectural-up-down-sconce' },
          { name: 'Brushed Gold Bar Light', slug: 'minimalist-brushed-gold-bar' },
        ],
      },
      {
        id: 'e27-wall-lamp',
        name: 'E27 Wall Lamp',
        slug: 'e27-wall-lamp',
        count: 3,
        items: [
          { name: 'Vintage Brass Bedside Sconce', slug: 'vintage-brass-bedside-sconce' },
          { name: 'Industrial Swing Arm Lamp', slug: 'industrial-swing-arm-lamp' },
          { name: 'Frosted Opal Globe Sconce', slug: 'frosted-opal-globe-sconce' },
        ],
      },
    ],
  },
  {
    id: 'pendant-lamp',
    name: 'Pendant Lamp',
    slug: 'pendant-lamp',
    icon: Sun,
    tag: 'Suspended Islands',
    subcategories: [
      {
        id: 'led-hanging-lamp',
        name: 'LED Hanging Lamp',
        slug: 'led-hanging-lamp',
        count: 4,
        items: [
          { name: 'Linear Dining Island Pendant', slug: 'linear-dining-island-pendant' },
          { name: 'Nordic Conical Bell Suspension', slug: 'nordic-conical-bell-suspension' },
          { name: 'Halo Floating Ring Fixture', slug: 'halo-floating-ring-suspension' },
          { name: 'Slim Architectural Cylinder', slug: 'architectural-slim-cylinder-tube' },
        ],
      },
      {
        id: 'e27-hanging-lamp',
        name: 'E27 Hanging Lamp',
        slug: 'e27-hanging-lamp',
        count: 3,
        items: [
          { name: 'Smoked Fluted Teardrop Glass', slug: 'smoked-glass-teardrop-pendant' },
          { name: 'Amber Ribbed Dome Pendant', slug: 'amber-ribbed-dome-pendant' },
          { name: 'Matte Black Geometric Cage', slug: 'matte-black-cage-fixture' },
        ],
      },
    ],
  },
  {
    id: 'chandelier',
    name: 'Chandelier',
    slug: 'chandelier',
    icon: Sparkles,
    tag: 'Grand Statements',
    subcategories: [
      {
        id: 'led-chandelier',
        name: 'LED Chandelier',
        slug: 'led-chandelier',
        count: 4,
        items: [
          { name: 'NL-CH101 Multi-Tier Ring Chandelier', slug: 'nl-ch101-multi-tier-ring-led-chandelier' },
          { name: 'Branching Starlight Suspension', slug: 'branching-starlight-suspension' },
        ],
      },
      {
        id: 'e14-chandelier',
        name: 'E14 Chandelier',
        slug: 'e14-chandelier',
        count: 2,
        items: [
          { name: 'NL-CH201 8-Arm French Candelabra', slug: 'nl-ch201-8-arm-e14-candelabra-chandelier' },
        ],
      },
      {
        id: 'profile-chandelier',
        name: 'Profile Chandelier',
        slug: 'profile-chandelier',
        count: 2,
        items: [
          { name: 'NL-CH301 Linear Architectural Profile', slug: 'nl-ch301-linear-profile-chandelier' },
        ],
      },
      {
        id: 'glass-chandelier',
        name: 'Glass Chandelier',
        slug: 'glass-chandelier',
        count: 3,
        items: [
          { name: 'NL-CH401 Murano Cloud Glass', slug: 'nl-ch401-murano-cloud-glass-chandelier' },
          { name: 'Frosted White Bubble Cloud', slug: 'frosted-bubble-cloud' },
        ],
      },
      {
        id: 'italian-chandelier',
        name: 'Italian Chandelier',
        slug: 'italian-chandelier',
        count: 2,
        items: [
          { name: 'NL-CH501 Venetian Filigree Chandelier', slug: 'nl-ch501-venetian-filigree-italian-chandelier' },
        ],
      },
      {
        id: 'modern-chandelier',
        name: 'Modern Chandelier',
        slug: 'modern-chandelier',
        count: 3,
        items: [
          { name: 'NL-CH601 Sputnik Brass Geometric', slug: 'nl-ch601-sputnik-brass-modern-chandelier' },
        ],
      },
      {
        id: 'antic-chandelier',
        name: 'Antic Chandelier',
        slug: 'antic-chandelier',
        count: 2,
        items: [
          { name: 'NL-CH701 Heritage Wrought Iron Antic', slug: 'nl-ch701-heritage-wrought-iron-antic-chandelier' },
        ],
      },
      {
        id: 'fan-chandelier',
        name: 'Fan Chandelier',
        slug: 'fan-chandelier',
        count: 2,
        items: [
          { name: 'NL-CH801 Retractable Blade Fandelier', slug: 'nl-ch801-retractable-blade-fan-chandelier' },
        ],
      },
      {
        id: 'ceiling-chandelier',
        name: 'Ceiling Chandelier',
        slug: 'ceiling-chandelier',
        count: 2,
        items: [
          { name: 'NL-CH901 Flush Mount Crystal Ceiling', slug: 'nl-ch901-flush-mount-crystal-ceiling-chandelier' },
        ],
      },
    ],
  },
  {
    id: 'double-height',
    name: 'Double Height',
    slug: 'double-height',
    icon: Building2,
    tag: 'High-Ceiling Scale',
    subcategories: [
      {
        id: 'crystal-chandelier-dh',
        name: 'Crystal Chandelier',
        slug: 'crystal-chandelier',
        count: 2,
        items: [
          { name: 'NL-DH101 Grand Crystal Cascade (10ft)', slug: 'nl-dh101-grand-crystal-cascade-double-height-chandelier' },
        ],
      },
      {
        id: 'modern-chandelier-dh',
        name: 'Modern Chandelier',
        slug: 'modern-chandelier-dh',
        count: 2,
        items: [
          { name: 'NL-DH201 Staggered Geometric Rings', slug: 'nl-dh201-modern-staggered-rings-double-height' },
        ],
      },
    ],
  },
  {
    id: 'dining-table-lamp',
    name: 'Dining Table Lamp',
    slug: 'dining-table-lamp',
    icon: Flame,
    tag: 'Epicurean Warmth',
    subcategories: [
      {
        id: 'dining-cordless',
        name: 'Cordless Dining Table Lamp',
        slug: 'dining-table-lamp',
        count: 2,
        items: [
          { name: 'NL-DT101 Brushed Gold Rechargeable', slug: 'nl-dt101-brushed-gold-dining-table-lamp' },
        ],
      },
    ],
  },
  {
    id: 'outdoor-light',
    name: 'Outdoor Light',
    slug: 'outdoor-light',
    icon: Trees,
    tag: 'Weatherproof IP65',
    subcategories: [
      {
        id: 'gate-lamp',
        name: 'Gate Lamp',
        slug: 'gate-lamp',
        count: 2,
        items: [
          { name: 'NL-OD101 Heritage Pillar Gate Lamp', slug: 'nl-od101-heritage-pillar-gate-lamp' },
        ],
      },
      {
        id: 'outdoor-wall-lamp',
        name: 'Wall Lamp',
        slug: 'outdoor-wall-lamp',
        count: 2,
        items: [
          { name: 'NL-OD201 Bi-Directional IP65 Wall Lamp', slug: 'nl-od201-bi-directional-outdoor-wall-lamp' },
        ],
      },
    ],
  },
  {
    id: 'table-lamp',
    name: 'Table Lamp',
    slug: 'table-lamp',
    icon: Lightbulb,
    tag: 'Bedside & Console',
    subcategories: [
      {
        id: 'sculptural-table',
        name: 'Designer Table Lamp',
        slug: 'table-lamp',
        count: 2,
        items: [
          { name: 'NL-TL101 Marble Base Mushroom Lamp', slug: 'nl-tl101-marble-base-mushroom-table-lamp' },
        ],
      },
    ],
  },
  {
    id: 'floor-lamp',
    name: 'Floor Lamp',
    slug: 'floor-lamp',
    icon: Sun,
    tag: 'Living Lounge Columns',
    subcategories: [
      {
        id: 'arch-floor-lamp',
        name: 'Arch & Column Floor Lamp',
        slug: 'floor-lamp',
        count: 2,
        items: [
          { name: 'NL-FL101 Arched Brass Arc Floor Lamp', slug: 'nl-fl101-arched-brass-floor-lamp' },
        ],
      },
    ],
  },
  {
    id: 'led-filament-bulb',
    name: 'LED Filament Bulb',
    slug: 'led-filament-bulb',
    icon: Sparkles,
    tag: 'Vintage Edison Warmth',
    subcategories: [
      {
        id: 'edison-filament',
        name: 'Filament Bulb E27/E14',
        slug: 'led-filament-bulb',
        count: 2,
        items: [
          { name: 'NL-FB101 ST64 Amber Spiral Bulb', slug: 'nl-fb101-st64-amber-spiral-filament-bulb' },
        ],
      },
    ],
  },
  {
    id: 'spare-part',
    name: 'Spare Part',
    slug: 'spare-part',
    icon: Wrench,
    tag: 'Accessories & Drivers',
    subcategories: [
      {
        id: 'hanging-base',
        name: 'Hanging Base',
        slug: 'hanging-base',
        count: 2,
        items: [
          { name: 'NL-SP101 Multi-Port Ceiling Canopy', slug: 'nl-sp101-multi-port-ceiling-canopy-hanging-base' },
        ],
      },
      {
        id: 'spare-driver',
        name: 'Spare Driver',
        slug: 'spare-driver',
        count: 2,
        items: [
          { name: 'NL-SP201 Triac Dimmable LED Driver 50W', slug: 'nl-sp201-triac-dimmable-led-driver-50w' },
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   CascadingCategoryDropdown Component
   Sleek, Compact, Proper Proportions (~700px Width)
───────────────────────────────────────────────────────────── */
export const CascadingCategoryDropdown = ({ onClose, className = '' }) => {
  const [selectedCatId, setSelectedCatId] = useState(LIGHTING_CATEGORY_TREE[0].id);
  const [selectedSubId, setSelectedSubId] = useState(LIGHTING_CATEGORY_TREE[0].subcategories[0]?.id);

  const activeCategory =
    LIGHTING_CATEGORY_TREE.find((c) => c.id === selectedCatId) || LIGHTING_CATEGORY_TREE[0];
  const activeSubcategory =
    activeCategory?.subcategories?.find((s) => s.id === selectedSubId) ||
    activeCategory?.subcategories?.[0];

  const handleCategoryHover = (cat) => {
    setSelectedCatId(cat.id);
    if (cat.subcategories?.length > 0) {
      setSelectedSubId(cat.subcategories[0].id);
    } else {
      setSelectedSubId(null);
    }
  };

  const handleSubcategoryHover = (sub) => {
    setSelectedSubId(sub.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.98 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      className={`relative z-50 select-none ${className}`}
      onMouseLeave={onClose}
    >
      {/* ── Outer Compact Solid Dark Container (Sleek 700px) ── */}
      <div
        className="w-[700px] max-w-[94vw] rounded-xl overflow-hidden
                   bg-[#090b10] border border-white/15
                   shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(0,0,0,0.85)]
                   text-white"
      >
        {/* ── Top Header Strip (Slim 36px) ── */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#0d1017]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CC1F1F] shadow-[0_0_6px_#CC1F1F]" />
            <span className="text-[10px] uppercase tracking-wider text-[#ff6b6b] font-bold">
              Lighting Categories
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-medium">
            <Link
              to="/categories"
              onClick={onClose}
              className="text-neutral-300 hover:text-white transition-colors"
            >
              All Categories
            </Link>
            <span className="text-white/20">·</span>
            <Link
              to="/catalog"
              onClick={onClose}
              className="text-[#ff6b6b] hover:text-white transition-colors font-semibold flex items-center gap-1"
            >
              <span>Full Catalog</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* ── 3-Tier Cascading Body (Compact Height ~280px) ── */}
        <div className="flex flex-col md:flex-row items-stretch h-[280px]">
          {/* ════════════════════════════════════════════════════════
              PANEL 1: Categories (Left Column, 210px)
          ════════════════════════════════════════════════════════ */}
          <div className="w-full md:w-[210px] p-2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 bg-[#0a0c12] shrink-0">
            <div className="space-y-0.5 overflow-y-auto modal-scrollbar pr-0.5 max-h-[235px]">
              {LIGHTING_CATEGORY_TREE.map((cat) => {
                const IconComponent = cat.icon || Lightbulb;
                const isSelected = cat.id === selectedCatId;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onMouseEnter={() => handleCategoryHover(cat)}
                    onClick={() => handleCategoryHover(cat)}
                    className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all duration-120 group ${
                      isSelected
                        ? 'bg-[#181d28] text-white font-semibold border-l-2 border-[#CC1F1F]'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#CC1F1F] text-white shadow-sm'
                            : 'bg-white/5 text-neutral-400 group-hover:text-white'
                        }`}
                      >
                        <IconComponent className="w-3 h-3" />
                      </span>
                      <span className="truncate text-xs font-medium">{cat.name}</span>
                    </div>

                    <ChevronRight
                      className={`w-3 h-3 shrink-0 transition-transform ${
                        isSelected
                          ? 'text-[#ff6b6b] translate-x-0.5'
                          : 'text-neutral-500 group-hover:text-neutral-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Quick Explore Link */}
            <div className="pt-1.5 border-t border-white/10 px-1">
              <Link
                to={`/category/${activeCategory.slug}`}
                onClick={onClose}
                className="text-[10.5px] font-semibold text-[#ff6b6b] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Explore {activeCategory.name}</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════
              PANEL 2: Sub-categories (Center Column, 220px)
          ════════════════════════════════════════════════════════ */}
          <div className="w-full md:w-[220px] p-2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 bg-[#0d1017] shrink-0">
            <div>
              <div className="px-1.5 pb-1 mb-1 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
                  {activeCategory?.name} Sub-types
                </span>
                <span className="text-[10px] text-neutral-400 font-mono">
                  {activeCategory?.subcategories?.length || 0}
                </span>
              </div>

              <div className="space-y-0.5 overflow-y-auto modal-scrollbar max-h-[200px] pr-0.5">
                {activeCategory?.subcategories?.map((sub) => {
                  const isSelected = sub.id === selectedSubId;

                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onMouseEnter={() => handleSubcategoryHover(sub)}
                      onClick={() => handleSubcategoryHover(sub)}
                      className={`w-full text-left flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all duration-120 group ${
                        isSelected
                          ? 'bg-[#181d28] text-white font-semibold border border-[#CC1F1F]/40'
                          : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="truncate text-xs font-medium pr-1">{sub.name}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                          isSelected
                            ? 'bg-[#CC1F1F]/25 text-[#ff8080]'
                            : 'bg-white/5 text-neutral-400'
                        }`}
                      >
                        {sub.count || sub.items?.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subcategory Link */}
            {activeSubcategory && (
              <div className="pt-1.5 border-t border-white/10 px-1">
                <Link
                  to={`/catalog?category=${activeSubcategory.slug}`}
                  onClick={onClose}
                  className="text-[10.5px] font-medium text-neutral-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Filter by {activeSubcategory.name}</span>
                  <ArrowRight className="w-2.5 h-2.5 text-[#ff6b6b]" />
                </Link>
              </div>
            )}
          </div>

          {/* ════════════════════════════════════════════════════════
              PANEL 3: Curated Models (Right Column, ~270px)
          ════════════════════════════════════════════════════════ */}
          <div className="w-full md:flex-1 p-3 flex flex-col justify-between bg-[#10141e]">
            <div>
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
                <span className="text-[10.5px] uppercase tracking-wider text-[#ff6b6b] font-bold">
                  {activeSubcategory?.name || 'Featured Fixtures'}
                </span>
                {activeSubcategory?.items && (
                  <span className="text-[10px] text-emerald-400 font-medium">
                    {activeSubcategory.items.length} Models
                  </span>
                )}
              </div>

              {/* High-Contrast Fixture Rows (Compact, Clean, Bold) */}
              <div className="space-y-1 overflow-y-auto modal-scrollbar max-h-[175px] pr-0.5">
                {activeSubcategory?.items?.length > 0 ? (
                  activeSubcategory.items.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/catalog?search=${encodeURIComponent(item.name)}`}
                      onClick={onClose}
                      className="group flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#0a0d14] hover:bg-[#181d2a] border border-white/8 hover:border-[#CC1F1F]/50 transition-all text-xs"
                    >
                      <div className="flex items-center gap-2 truncate pr-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#CC1F1F] shadow-[0_0_6px_#CC1F1F] shrink-0" />
                        <span className="truncate text-[11.5px] font-semibold text-white group-hover:text-white">
                          {item.name}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-[#ff6b6b] shrink-0" />
                    </Link>
                  ))
                ) : (
                  <div className="py-6 text-center text-xs text-neutral-400">
                    Select a subcategory to preview.
                  </div>
                )}
              </div>
            </div>

            {/* Compact Bottom Link */}
            <div className="pt-1.5 border-t border-white/10 flex items-center justify-between text-[10.5px]">
              <span className="text-neutral-400">Custom photometrics available</span>
              <Link
                to="/contact"
                onClick={onClose}
                className="text-[#ff6b6b] hover:text-white font-semibold transition-colors flex items-center gap-1"
              >
                <span>Trade Inquiry</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Compact Footer Strip (Slim 28px) ── */}
        <div className="px-4 py-1.5 border-t border-white/10 bg-[#06080d] flex items-center justify-between text-[10.5px] text-neutral-300">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>CRI Ra &gt; 95</span>
            </span>
            <span className="text-neutral-600">·</span>
            <span>2700K–6000K CCT</span>
          </div>

          <Link
            to="/catalog"
            onClick={onClose}
            className="text-white hover:text-[#ff6b6b] font-semibold transition-colors flex items-center gap-1"
          >
            <span>Browse 100+ Fixtures</span>
            <ArrowRight className="w-3 h-3 text-[#ff6b6b]" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
