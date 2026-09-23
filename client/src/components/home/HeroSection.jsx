import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Truck,
  MessageSquare,
  Phone,
  Building2,
  Compass,
  Layers,
  ArrowDown,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const DEFAULT_SLIDES = [
  {
    id: 'chandeliers',
    category: 'Chandeliers',
    badge: 'Grand Statement Fixtures',
    eyebrow: 'Architectural Grandeur & Living Atriums',
    title: 'Experience Grand Architectural',
    highlight: 'Sculptural Chandeliers',
    description:
      'Multi-tier cascading crystal rings, solid virgin brass armatures, and dim-to-warm illumination engineered for high-ceiling living halls, luxury duplex voids, and grand villas.',
    bgImage: '/categories/chandelier.jpg',
    productImage: '/categories/chandelier.jpg',
    productName: 'Imperial Multi-Tier Ring Chandelier',
    specs: 'K9 Crystal • Dim-to-Warm • Up to 4m Drops',
    material: 'Solid Brushed Brass & Optical Crystal',
    idealFor: 'Grand Living & Double-Height Atriums',
    primaryLink: '/catalog?category=chandelier',
    primaryText: 'Explore Chandeliers',
  },
  {
    id: 'pendants',
    category: 'Pendant Lamps',
    badge: 'Sculptural Suspensions',
    eyebrow: 'Dining Islands & Executive Suites',
    title: 'Precision Handcrafted',
    highlight: 'Designer Pendants',
    description:
      'Mouth-blown fluted glass, brushed antique gold accents, and circadian Ra > 95 illumination crafted for intimate dining tables, breakfast bars, and modern kitchen islands.',
    bgImage: '/categories/pendant-lamp.jpg',
    productImage: '/categories/pendant-lamp.jpg',
    productName: 'Halo Minimalist Glass Pendant',
    specs: 'Ra > 95 • 3000K Warm • Dim-to-Warm',
    material: 'Fluted Borosilicate & Spun Brass',
    idealFor: 'Kitchen Islands & Dining Suites',
    primaryLink: '/catalog?category=pendant-lamp',
    primaryText: 'Explore Pendants',
  },
  {
    id: 'double-height',
    category: 'Double Height',
    badge: 'Vertical Grandeur',
    eyebrow: 'Duplex Foyers & Helical Staircases',
    title: 'Dramatic Suspensions for',
    highlight: 'Double-Height Voids',
    description:
      'Custom-engineered vertical luminaire installations dropping up to 5 meters, delivering breathtaking architectural presence with precision optical dispersion.',
    bgImage: '/categories/double-height.jpg',
    productImage: '/categories/double-height.jpg',
    productName: 'Cascading Starlight Void Chandelier',
    specs: 'Custom 2m–5m Drops • 100% Insured',
    material: 'Virgin Brass, Chrome & Crystal Drops',
    idealFor: 'Duplex Stairwells & Grand Foyers',
    primaryLink: '/catalog?category=double-height',
    primaryText: 'Explore Double-Height',
  },
  {
    id: 'wall-lamps',
    category: 'Wall Lamps',
    badge: 'Architectural Sconces',
    eyebrow: 'Corridors, Bedside & Ambient Walls',
    title: 'Subtle Warmth & Artisanal',
    highlight: 'Bi-Directional Sconces',
    description:
      'Indirect perimeter grazing and fluted glass sconces designed with flicker-free warm circadian eye comfort for luxury bedrooms, lounges, and hospitality corridors.',
    bgImage: '/categories/wall-lamp.jpg',
    productImage: '/categories/wall-lamp.jpg',
    productName: 'Linear Fluted Brass Wall Grazer',
    specs: 'Ra > 95 • Circadian Glow • IP44 Rated',
    material: 'Machined Brass & Frosted Acrylic',
    idealFor: 'Bedside Alcoves & Gallery Corridors',
    primaryLink: '/catalog?category=wall-lamp',
    primaryText: 'Explore Wall Lamps',
  },
  {
    id: 'showroom',
    category: 'Experience Studio',
    badge: 'Flagship Showroom',
    eyebrow: 'In-Person Architectural Consultation',
    title: 'Experience Architectural',
    highlight: 'Illumination in Person',
    description:
      'Step inside our dedicated lighting experience center to inspect physical luminaires, evaluate chromatic precision (Ra > 95), or collaborate on bespoke fixtures tailored to your space.',
    bgImage: '/contact-banner-new.jpg',
    fallbackBg: '/contact-banner.jpg',
    productImage: '/contact-banner-new.jpg',
    productName: 'Flagship Lighting Experience Center',
    specs: 'Physical Luminaires • Live CCT Displays',
    material: 'Mon – Sat 10:00 AM – 7:30 PM',
    idealFor: 'Architects, Interior Designers & Homeowners',
    primaryLink: '/contact',
    primaryText: 'Visit Showroom',
  },
];

export const HeroSection = ({ section }) => {
  const { settings } = useSettings();

  // Allow optional CMS override for initial slide headline/copy if configured
  const slides = React.useMemo(() => {
    if (!section?.title && !section?.subtitle) return DEFAULT_SLIDES;
    const customized = [...DEFAULT_SLIDES];
    customized[0] = {
      ...customized[0],
      title: section?.title ? section.title.split('&')[0] : customized[0].title,
      highlight: section?.title && section.title.includes('&') ? section.title.split('&')[1] : customized[0].highlight,
      eyebrow: section?.subtitle || customized[0].eyebrow,
      description: section?.description || customized[0].description,
      primaryText: section?.buttonText || customized[0].primaryText,
      primaryLink: section?.buttonLink || customized[0].primaryLink,
    };
    return customized;
  }, [section]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slider every 6 seconds with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentIdx];

  const handleNext = () => setCurrentIdx((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);

  const cleanPhone = (settings?.phone || '+91 8045811438').replace(/[^\d+]/g, '');
  const cleanWhatsapp = (settings?.whatsapp || '+91 9811000000').replace(/[^\d]/g, '');
  const whatsappGreeting = encodeURIComponent(
    `Hello ${settings?.companyName || 'NiceLamp'}, I am interested in ${currentSlide.productName} (${currentSlide.category}) and would like pricing, photometric specs, and availability details.`
  );

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center overflow-hidden pt-28 pb-14 lg:pt-36 lg:pb-18 bg-neutral-950 border-b border-neutral-900"
    >
      {/* ════════════════════════════════════════════════════════
          CINEMATIC DARK LUXURY BACKGROUND SLIDER
      ════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1.01 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={currentSlide.bgImage}
              onError={(e) => {
                if (currentSlide.fallbackBg && e.target.src !== currentSlide.fallbackBg) {
                  e.target.src = currentSlide.fallbackBg;
                } else if (!e.target.src.includes('contact-banner.jpg')) {
                  e.target.src = '/contact-banner.jpg';
                }
              }}
              alt={currentSlide.productName}
              className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] transform transition-transform duration-1000"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Multi-layer Cinematic Gradient Overlays (Identical to Contact Page Banner) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/50 pointer-events-none" />

        {/* Warm Golden & Amber Ambient Orbs */}
        <div className="absolute -top-28 -right-28 w-[34rem] h-[34rem] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════════
          MAIN CONTENT CONTAINER
      ════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4">

        {/* Top Bar: Category Navigator Pills & Live Experience Center Status */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10"
        >
          {/* Category Tabs to Switch Slider Directly */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none max-w-full">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIdx(idx)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  idx === currentIdx
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-neutral-950 font-bold shadow-lg shadow-[#D4AF37]/25 scale-105'
                    : 'bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white border border-white/10 backdrop-blur-md'
                }`}
              >
                {s.category}
              </button>
            ))}
          </div>

          {/* Live Showroom Status Indicator */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-lg backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Experience Center Open • Mon – Sat 10:00 AM – 7:30 PM</span>
          </div>
        </motion.div>

        {/* ── Main 2-Column Hero Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── Left Column: Headline, Copy, Action Buttons & Slide Controls ── */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="space-y-5"
              >
                {/* Eyebrow Pill Badge with Sparkles */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#D4AF37] text-xs font-bold uppercase tracking-luxury backdrop-blur-sm shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{currentSlide.eyebrow}</span>
                </div>

                {/* Main Headline with Contact Page Gold Gradient */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-white tracking-tight leading-[1.12]">
                  {currentSlide.title}{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#D4AF37] to-[#FDE68A]">
                    {currentSlide.highlight}
                  </span>
                </h1>

                {/* Rich Description */}
                <p className="text-sm sm:text-base text-neutral-200 mt-4 leading-relaxed font-normal max-w-2xl">
                  {currentSlide.description}
                </p>

                {/* Touchpoint Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center gap-3.5">
                  <Link
                    to={currentSlide.primaryLink}
                    className="btn-gold px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center gap-2 shadow-xl hover:shadow-2xl cursor-pointer transition-all transform hover:-translate-y-0.5"
                  >
                    <span>{currentSlide.primaryText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {cleanWhatsapp && (
                    <a
                      href={`https://wa.me/${cleanWhatsapp}?text=${whatsappGreeting}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm shadow-md hover:shadow-emerald-950/40"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp Concierge</span>
                    </a>
                  )}

                  {cleanPhone && (
                    <a
                      href={`tel:${cleanPhone}`}
                      className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm shadow-md"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Direct Line</span>
                    </a>
                  )}

                  <Link
                    to="/contact"
                    className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm"
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Showroom Visit</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Navigation Bar: Counter, Progress Bar & Prev/Next Arrows */}
            <div className="mt-8 pt-5 border-t border-white/15 flex items-center justify-between">
              {/* Slide Counter & Progress Bar */}
              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                <span className="text-[#D4AF37] font-bold text-sm">
                  {String(currentIdx + 1).padStart(2, '0')}
                </span>
                <div className="w-24 h-1 bg-white/15 rounded-full overflow-hidden">
                  <motion.div
                    key={currentIdx}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: isPaused ? 0 : 6, ease: 'linear' }}
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F59E0B]"
                  />
                </div>
                <span>{String(slides.length).padStart(2, '0')}</span>
                <span className="text-[11px] text-neutral-500 font-sans ml-2 hidden sm:inline">
                  {isPaused ? '• Paused on hover' : '• Auto-advancing'}
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-neutral-950 text-white border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-white/10 hover:bg-[#D4AF37] hover:text-neutral-950 text-white border border-white/20 backdrop-blur-md transition-all shadow-md active:scale-95"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ── Right Column: Featured Luminaire Showcase Glass Card ── */}
          <div className="lg:col-span-5 flex flex-col items-end w-full max-w-md ml-auto">
            <div className="w-full bg-black/60 border border-white/15 rounded-2xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl hover:border-[#D4AF37]/50 transition-all duration-300">

              {/* Card Header: Category & Live Indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-white/10 text-[#D4AF37] border border-white/15 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] inline-block animate-pulse" />
                  {currentSlide.badge}
                </span>
                <span className="text-xs text-neutral-400 font-medium">
                  {currentSlide.category}
                </span>
              </div>

              {/* Product Image Frame */}
              <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-neutral-900 border border-white/10 mb-4 group/img">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <img
                      src={currentSlide.productImage}
                      alt={currentSlide.productName}
                      className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Room / Space Tag */}
                <div className="absolute bottom-2.5 left-2.5 z-10">
                  <span className="text-[10.5px] font-medium px-2.5 py-1 rounded-md bg-black/75 border border-white/20 text-neutral-200 shadow-md backdrop-blur-md">
                    📍 {currentSlide.idealFor}
                  </span>
                </div>
              </div>

              {/* Luminaire Details & Specs */}
              <div className="space-y-2.5">
                <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-white">
                  {currentSlide.productName}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  {currentSlide.description}
                </p>

                {currentSlide.specs && (
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#D4AF37] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>{currentSlide.specs}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-medium">
                    {currentSlide.material}
                  </span>
                  <Link
                    to={currentSlide.primaryLink}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] hover:text-[#F59E0B] transition-colors"
                  >
                    <span>View Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════
            4 ARCHITECTURAL FEATURE BADGES (From Contact Page Banner)
        ════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-white/15"
        >
          <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors group">
            <div className="flex items-center gap-2.5 mb-1.5 text-white">
              <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-serif-luxury font-bold text-xs sm:text-sm">Flagship Showroom</span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
              Physical luminaires, material finishes & live 2700K–4000K CCT tuning displays.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors group">
            <div className="flex items-center gap-2.5 mb-1.5 text-white">
              <Compass className="w-4 h-4 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-serif-luxury font-bold text-xs sm:text-sm">Architectural Liaison</span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
              Dedicated project review, photometric calculations & trade quotations in 1 business day.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors group">
            <div className="flex items-center gap-2.5 mb-1.5 text-white">
              <Layers className="w-4 h-4 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-serif-luxury font-bold text-xs sm:text-sm">Custom Engineering</span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
              Solid brass, precision K9 optical glass & bespoke drop adjustments for double-height spaces.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors group">
            <div className="flex items-center gap-2.5 mb-1.5 text-white">
              <Truck className="w-4 h-4 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform" />
              <span className="font-serif-luxury font-bold text-xs sm:text-sm">Insured White-Glove Transit</span>
            </div>
            <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
              100% transit insurance with immediate free glass replacement guarantee & 5-year warranty.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
