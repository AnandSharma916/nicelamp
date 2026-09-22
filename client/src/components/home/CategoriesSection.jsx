import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Lightbulb,
  Sun,
  Layers,
  ChevronRight,
  Eye,
  SlidersHorizontal,
  Flame,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { categoryService } from '../../services/api';
import { MASTER_CATEGORIES } from '../../data/catalogData';
import { useAmbiance } from '../common/AmbientLightExperience';

/* ─────────────────────────────────────────────────────────────
   3D Tilt Card with Moving Specular Glare & Subcategory Pills
───────────────────────────────────────────────────────────── */
const CategoryTiltCard = ({ category, index, isHovered, onHoverStart, onHoverEnd, activeKelvin }) => {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate rotation (-10 to +10 degrees)
    const rotateX = (y - 0.5) * -14;
    const rotateY = (x - 0.5) * 14;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`);
    setGlarePos({
      x: x * 100,
      y: y * 100,
      opacity: 0.22,
    });
  };

  const handlePointerLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
    setGlarePos({ x: 50, y: 50, opacity: 0 });
    onHoverEnd();
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={handlePointerLeave}
      className="relative group perspective-container"
    >
      {/* ── Volumetric Architectural Downlight Cone above hovered card ── */}
      <div
        className={`absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-32 pointer-events-none transition-all duration-700 ${
          isHovered ? 'opacity-95 scale-105' : 'opacity-25 scale-95'
        }`}
        style={{
          background: activeKelvin.spotlightBeam,
          clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)',
          filter: isHovered ? 'blur(1px)' : 'blur(2px)',
        }}
      />

      {/* ── Glowing Halo Bloom behind the Card ── */}
      <div
        className="absolute -inset-1.5 rounded-3xl transition-opacity duration-700 pointer-events-none blur-2xl"
        style={{
          backgroundColor: activeKelvin.hex,
          opacity: isHovered ? 0.32 : 0,
        }}
      />

      {/* ── Main 3D Card ── */}
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        style={{
          transform: transformStyle,
          transition: 'transform 0.16s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease',
        }}
        className="relative block h-[450px] rounded-2xl overflow-hidden bg-[#10131a] border border-white/10 hover:border-white/30 transition-colors shadow-2xl flex flex-col justify-between"
      >
        {/* Specular Moving Glare Overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-20 rounded-2xl transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.06) 45%, transparent 70%)`,
            opacity: glarePos.opacity,
          }}
        />

        {/* Top Miniature LED Diode */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
          <div
            className="w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] transition-colors duration-500"
            style={{ backgroundColor: activeKelvin.hex, color: activeKelvin.hex }}
          />
        </div>

        {/* Shimmer line across top border on hover */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-30" />

        {/* Background Luminaire Photography */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-[0.80] group-hover:brightness-[1.06] contrast-105"
          />

          {/* Obsidian Gradients for Superior Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/75 to-[#090a0d]/25 opacity-95 group-hover:opacity-85 transition-opacity" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        </div>

        {/* ── CARD TOP BAR (Number & Elevation Tag) ── */}
        <div className="relative z-10 p-6 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-[#CC1F1F] bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-white font-medium flex items-center gap-1.5">
              <span>{category.icon || '💡'}</span>
              <span className="text-[11px] tracking-wide">{category.tag}</span>
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-amber-300 bg-black/60 border border-amber-400/30 backdrop-blur-md px-2.5 py-1 rounded-md">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>{category.productsCount || 4} Fixtures</span>
          </span>
        </div>

        {/* ── CARD BOTTOM CONTENT ── */}
        <div className="relative z-10 p-6 pt-0">
          {/* Featured Fixture Tag */}
          {category.featuredFixture && (
            <span className="text-[10px] uppercase font-mono tracking-luxury text-[#CC1F1F] font-bold block mb-1">
              {category.featuredFixture}
            </span>
          )}

          <Link to={`/category/${category.slug}`} className="block group-hover:underline">
            <h3 className="text-2xl font-serif-luxury text-white font-bold tracking-tight">
              {category.name}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-neutral-300 mt-2 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
            {category.description}
          </p>

          {/* Subcategory Interactive Exploration Chips */}
          {category.subcategories && category.subcategories.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5 z-20">
              {category.subcategories.slice(0, 3).map((sub) => (
                <Link
                  key={sub.slug}
                  to={`/category/${sub.slug}`}
                  className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 hover:bg-[#CC1F1F] hover:text-white text-neutral-300 border border-white/10 transition-all hover:scale-105"
                  title={`Browse ${sub.name}`}
                >
                  {sub.name}
                </Link>
              ))}
              {category.subcategories.length > 3 && (
                <Link
                  to={`/category/${category.slug}`}
                  className="text-[10px] text-neutral-400 hover:text-white font-mono underline"
                >
                  +{category.subcategories.length - 3} more
                </Link>
              )}
            </div>
          )}

          {/* Specs Bar */}
          {category.specs && (
            <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[10.5px] text-neutral-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span className="truncate max-w-[280px]">{category.specs}</span>
            </div>
          )}

          {/* Explore Button */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <Link
              to={`/category/${category.slug}`}
              className="text-xs font-semibold uppercase tracking-luxury text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#CC1F1F] group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <span className="text-[10px] uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300 font-mono">
              Photometrics
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────────
   CategoriesSection Master Component
───────────────────────────────────────────────────────────── */
export const CategoriesSection = ({ section }) => {
  const { activeKelvin, luxIntensity } = useAmbiance();
  const [categories, setCategories] = useState(MASTER_CATEGORIES);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [hoveredCardId, setHoveredCardId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getCategories();
        if (data.success && data.categories && data.categories.length > 0) {
          const enriched = data.categories.map((cat, idx) => {
            const fallback = MASTER_CATEGORIES.find((d) => d.slug === cat.slug) || MASTER_CATEGORIES[idx % MASTER_CATEGORIES.length];
            return {
              ...fallback,
              ...cat,
              image: cat.image || fallback.image,
              description: cat.description || fallback.description,
              specs: cat.specs || fallback.specs,
              tag: cat.tag || fallback.tag,
              icon: cat.icon || fallback.icon,
              subcategories: fallback.subcategories || [],
            };
          });
          setCategories(enriched);
        } else {
          setCategories(MASTER_CATEGORIES);
        }
      } catch (err) {
        setCategories(MASTER_CATEGORIES);
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
    'Precision-engineered interior sconces, suspended pendants, monumental chandeliers, exterior luminaires, and spare drivers for luxury architecture.';

  const filterTabs = [
    { id: 'all', label: 'All Collections' },
    { id: 'wall', label: 'Wall Lamp' },
    { id: 'pendant', label: 'Pendant Lamp' },
    { id: 'chandelier', label: 'Chandelier' },
    { id: 'double-height', label: 'Double Height' },
    { id: 'dining', label: 'Dining Table' },
    { id: 'outdoor', label: 'Outdoor Light' },
    { id: 'table', label: 'Table Lamp' },
    { id: 'floor', label: 'Floor Lamp' },
    { id: 'filament', label: 'Filament Bulb' },
    { id: 'spares', label: 'Spare Part' },
  ];

  // Filter categories
  const filteredCategories =
    selectedFilter === 'all'
      ? categories
      : categories.filter((c) => c.categoryKey === selectedFilter || c.slug === selectedFilter);

  return (
    <section className="py-24 bg-[#090b10] relative overflow-hidden select-none border-y border-white/5">
      {/* ════════════════════════════════════════════════════════
          ARCHITECTURAL LIGHTING CEILING SPOTLIGHT RAIL
      ════════════════════════════════════════════════════════ */}
      <div className="absolute top-0 left-0 right-0 h-2.5 bg-[#12151d] border-b border-white/10 z-20">
        <div className="absolute inset-x-0 top-1 h-0.5 bg-black" />
      </div>

      {/* Discrete Downlight Emitters casting volumetric lighting cones downwards */}
      <div className="absolute top-0 left-0 right-0 z-20 pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-around">
        {[0, 1, 2, 3, 4, 5].map((emitter) => (
          <div key={emitter} className="relative flex flex-col items-center">
            {/* Luminous LED Diode Point */}
            <div
              className="w-2.5 h-2.5 rounded-full mt-1 transition-all duration-700 shadow-lg"
              style={{
                backgroundColor: activeKelvin.hex,
                boxShadow: `0 0 14px ${activeKelvin.hex}`,
              }}
            />
            {/* Volumetric downward light beam */}
            <div
              className="w-48 sm:w-64 h-96 pointer-events-none opacity-25 mix-blend-screen transition-all duration-1000 origin-top"
              style={{
                background: activeKelvin.spotlightBeam,
                clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)',
                opacity: 0.28 * luxIntensity,
              }}
            />
          </div>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════
          DYNAMIC AMBIENT GLOW & BLUEPRINT TEXTURE
      ════════════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 animate-light-breathe"
        style={{
          background: `radial-gradient(ellipse at 50% 15%, rgba(${activeKelvin.rgb}, ${0.18 * luxIntensity}) 0%, transparent 65%)`,
        }}
      />

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#CC1F1F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Blueprint Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* ════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER
      ════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#CC1F1F] animate-pulse" />
              <span className="text-[11px] uppercase tracking-luxury font-bold text-neutral-300">
                Architectural Photometrics & Collections
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#CC1F1F] animate-ping ml-1" />
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-3.5 leading-relaxed font-light">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            {/* Active Kelvin indicator badge */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#14171f] border border-white/10 shadow-lg text-xs font-mono">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeKelvin.hex, boxShadow: `0 0 10px ${activeKelvin.hex}` }}
              />
              <span className="text-neutral-300">{activeKelvin.kelvin} Mode</span>
            </div>

            <Link
              to="/catalog"
              className="btn-gold px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 shadow-xl hover:shadow-[#CC1F1F]/30 transition-all shrink-0"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-luxury whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-white bg-[#1a1d26] border border-white/25 shadow-[0_0_15px_rgba(204,31,31,0.25)]'
                    : 'text-neutral-400 hover:text-white bg-white/[0.02] border border-white/5 hover:border-white/15'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="category-active-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#CC1F1F]/25 to-transparent pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab.label}
                  {tab.id === 'all' && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-neutral-300 font-mono">
                      {categories.length}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category Cards Grid with 3D Tilt & Specular Glare */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-96 rounded-2xl bg-white/[0.04] border border-white/10 animate-pulse relative overflow-hidden"
              />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredCategories.map((category, index) => (
                <CategoryTiltCard
                  key={category._id || category.slug}
                  category={category}
                  index={index}
                  isHovered={hoveredCardId === category._id}
                  onHoverStart={() => setHoveredCardId(category._id)}
                  onHoverEnd={() => setHoveredCardId(null)}
                  activeKelvin={activeKelvin}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ════════════════════════════════════════════════════════
            BOTTOM ARCHITECTURAL LIGHTING STATS BANNER
        ════════════════════════════════════════════════════════ */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <span className="text-2xl font-serif-luxury font-bold text-[#CC1F1F] block">
              Ra &gt; 95+
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-luxury mt-1 block">
              Color Rendering Index (CRI)
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <span className="text-2xl font-serif-luxury font-bold text-[#CC1F1F] block">
              10 Core
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-luxury mt-1 block">
              Architectural Categories
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <span className="text-2xl font-serif-luxury font-bold text-[#CC1F1F] block">
              IP65 Rated
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-luxury mt-1 block">
              Weatherproof Exterior
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
            <span className="text-2xl font-serif-luxury font-bold text-[#CC1F1F] block">
              Triac &amp; DALI
            </span>
            <span className="text-xs text-neutral-400 uppercase tracking-luxury mt-1 block">
              Precision Architectural Dimming
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
