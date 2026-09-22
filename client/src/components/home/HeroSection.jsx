import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  Award,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sun,
  Zap,
  Sparkles,
  Eye,
  Pause,
  Play,
  Layers,
  Sliders,
  Maximize2,
  Gauge,
  Activity,
} from 'lucide-react';
import { useAmbiance, KELVIN_PRESETS } from '../common/AmbientLightExperience';

export const HeroSection = ({ section }) => {
  // ── 1. Extract backend content from CMS ────────────────────────────────────
  const cmsTitle = section?.title || 'Illuminating Architectural Masterpieces';
  const cmsSubtitle = section?.subtitle || 'Decorative Solutions & Technical Precision';
  const cmsDesc =
    section?.description ||
    'Pioneering contemporary architectural lighting fixtures, precision engineered wall luminaires, and bespoke statement chandeliers designed for world-class residential and commercial spaces.';
  const primaryBtnText = section?.buttonText || 'Explore Catalog';
  const primaryBtnLink = section?.buttonLink || '/catalog';
  const secondaryBtnText = section?.secondaryButtonText || 'Architectural Inquiry';
  const secondaryBtnLink = section?.secondaryButtonLink || '/contact';

  // ── 2. Curated Architectural Slides with Paired Background & Card Images ──
  const defaultSlides = [
    {
      id: 'luminaire-1',
      name: 'Aura Spun Brass Chandelier',
      badge: 'Flagship Luminaire',
      edition: section?.metadata?.badge || '2026 Architectural Catalog',
      subtitle: cmsSubtitle,
      description: 'Handcrafted spun brass with frosted optical crystal, engineered for luxury foyers and grand double-height statements.',
      cardImage: '/categories/chandelier.jpg',
      bgImage: section?.image || (section?.images && section.images[0]) || 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=2000&q=85',
      specs: {
        finish: 'Spun Brass & Frosted Quartz',
        cct: '3000K Warm',
        cri: 'CRI > 98',
        lumens: '4,200 lm',
        mount: 'Suspended Pendant',
      },
      recommendedTone: 'warm',
      link: '/catalog',
    },
    {
      id: 'luminaire-2',
      name: 'Solstice Fluted Pendant',
      badge: 'Suspended Sculptural',
      edition: 'Artisan Glass Edition',
      subtitle: 'Atmospheric Pendants & Island Illumination',
      description: 'Mouth-blown fluted glass diffusing ambient warmth over executive dining tables, kitchen islands, and private salons.',
      cardImage: '/categories/pendant-lamp.jpg',
      bgImage: (section?.images && section.images[1]) || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
      specs: {
        finish: 'Champagne Gold & Fluted Glass',
        cct: '2700K - 3200K',
        cri: 'CRI > 97',
        lumens: '3,100 lm',
        mount: 'Adjustable Drop Cable',
      },
      recommendedTone: 'warm',
      link: '/catalog',
    },
    {
      id: 'luminaire-3',
      name: 'Stratos Fluted Wall Sconce',
      badge: 'Wall Luminaire & Elevation',
      edition: 'Precision Optics Series',
      subtitle: 'Sculptural Wall Elevation & Façade',
      description: 'Bi-directional optical light emission sculpted for gallery corridors, bedside architectural elevations, and master suites.',
      cardImage: '/categories/wall-lamp.jpg',
      bgImage: (section?.images && section.images[2]) || 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=2000&q=85',
      specs: {
        finish: 'Matte Obsidian & Brushed Bronze',
        cct: '4000K Neutral',
        cri: 'CRI > 95',
        lumens: '2,600 lm',
        mount: 'Architectural Wall Mount',
      },
      recommendedTone: 'white',
      link: '/catalog',
    },
    {
      id: 'luminaire-4',
      name: 'Cascade Monumental Chandelier',
      badge: 'Double-Height Statement',
      edition: 'Monumental Atrium Series',
      subtitle: 'Monumental Foyers & Atrium Voids',
      description: 'Dramatic multi-tier cascading illumination engineered to fill expansive vertical voids with celestial optical brilliance.',
      cardImage: '/categories/double-height.jpg',
      bgImage: (section?.images && section.images[3]) || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
      specs: {
        finish: 'Hand-Polished Brass & Crystal',
        cct: '3000K - 4000K',
        cri: 'CRI > 98',
        lumens: '6,800 lm',
        mount: 'Reinforced Ceiling Canopy',
      },
      recommendedTone: 'warm',
      link: '/catalog',
    },
    {
      id: 'luminaire-5',
      name: 'Vanguard Exterior Facade Luminaire',
      badge: 'Architectural Exterior',
      edition: 'IP65 Weatherproof Edition',
      subtitle: 'Landscape & Architectural Wash',
      description: 'Marine-grade die-cast aluminum with anti-corrosion coating, crafted for striking nighttime elevations and landscape paths.',
      cardImage: '/categories/outdoor-light.jpg',
      bgImage: (section?.images && section.images[4]) || 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=2000&q=85',
      specs: {
        finish: 'Anodized Black & Tempered Glass',
        cct: '4000K White',
        cri: 'CRI > 95',
        lumens: '3,800 lm',
        mount: 'IP65 Facade Fixture',
      },
      recommendedTone: 'white',
      link: '/catalog',
    },
  ];

  const slides = defaultSlides;

  // ── 3. Carousel & Lighting Tone State ─────────────────────────────────────
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoPlayPaused, setIsAutoPlayPaused] = useState(false);
  const { activeKelvin, setActiveKelvin, luxIntensity } = useAmbiance();
  const [dimmerLevel, setDimmerLevel] = useState(90); // 10% - 100%
  const [beamSpread, setBeamSpread] = useState('accent'); // 'spot' (25°) | 'accent' (45°) | 'flood' (120°)

  const SLIDE_DURATION = 6000; // 6 seconds per slide

  // Auto-slide effect with hover and pause handling
  useEffect(() => {
    if (isHovered || isAutoPlayPaused) return;

    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [isHovered, isAutoPlayPaused, slides.length]);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleSelectSlide = (index) => {
    setCurrentIdx(index);
    if (slides[index]?.recommendedTone) {
      const match = KELVIN_PRESETS.find((k) =>
        slides[index].recommendedTone === 'white' ? k.id === '4000k' :
        slides[index].recommendedTone === 'daylight' ? k.id === '6000k' : k.id === '2700k'
      );
      if (match) setActiveKelvin(match);
    }
  };

  // Active slide details
  const currentSlide = slides[currentIdx % slides.length];

  // Calculated Real-Time Photometric Lumens
  const rawLumens = parseInt((currentSlide.specs?.lumens || '4200').replace(/\D/g, ''), 10) || 4200;
  const liveLumens = Math.round(rawLumens * (dimmerLevel / 100) * luxIntensity);

  // Volumetric Beam Spread Clip Paths & Widths
  const beamShapes = {
    spot: {
      clip: 'polygon(46% 0%, 54% 0%, 78% 100%, 22% 100%)',
      width: 'w-[320px] sm:w-[420px]',
      label: '25° Spot',
    },
    accent: {
      clip: 'polygon(40% 0%, 60% 0%, 95% 100%, 5% 100%)',
      width: 'w-[480px] sm:w-[620px]',
      label: '45° Accent',
    },
    flood: {
      clip: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)',
      width: 'w-[680px] sm:w-[860px]',
      label: '120° Flood',
    },
  };

  // ── 4. Dynamic Lighting Tone Configuration & Animations ───────────────────
  const activeLighting = {
    name: activeKelvin.name,
    accentColor: activeKelvin.hex,
    haloGradient: `radial-gradient(circle, rgba(${activeKelvin.rgb}, ${0.55 * (dimmerLevel / 100)}) 0%, rgba(${activeKelvin.rgb}, 0.18) 50%, transparent 75%)`,
    ambientGlow: `radial-gradient(ellipse at 68% 34%, rgba(${activeKelvin.rgb}, ${0.28 * (dimmerLevel / 100)}) 0%, rgba(${activeKelvin.rgb}, 0.08) 45%, transparent 70%)`,
    activeBtnClass: 'bg-white/20 text-white border-white/40 shadow-lg',
  };

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center overflow-hidden pt-24 sm:pt-28 pb-14 select-none bg-[#090a0d]"
    >
      {/* ════════════════════════════════════════════════════════
          FULL-BLEED BACKGROUND BANNER (SYNCHRONIZED WITH CAROUSEL)
      ════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.bgImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {/* The Actual Banner Image - Bright, Vibrant & Clear */}
            <img
              src={currentSlide.bgImage}
              alt={currentSlide.name}
              className="w-full h-full object-cover object-center transform transition-transform duration-1000"
              style={{ filter: activeLighting.filter }}
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Pulsating Architectural Ambient Bloom */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000 animate-light-breathe"
          style={{ background: activeLighting.ambientGlow }}
        />

        {/* Dynamic Volumetric Architectural Light Beam (Responsive to spread and dimmer) */}
        <div
          className={`absolute top-0 right-[10%] sm:right-[18%] ${beamShapes[beamSpread].width} h-[850px] pointer-events-none mix-blend-screen transition-all duration-700 origin-top animate-beam-sweep`}
          style={{
            background: activeKelvin.spotlightBeam,
            clipPath: beamShapes[beamSpread].clip,
            opacity: 0.38 * (dimmerLevel / 100) * luxIntensity,
          }}
        >
          {/* Floating Optical Dust Motes illuminated by the spotlight */}
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full pointer-events-none animate-dust-mote"
              style={{
                width: `${Math.max(1.5, (i % 3) * 1.5)}px`,
                height: `${Math.max(1.5, (i % 3) * 1.5)}px`,
                left: `${20 + (i * 8)}%`,
                top: `${15 + (i * 9)}%`,
                backgroundColor: activeKelvin.hex,
                boxShadow: `0 0 8px ${activeKelvin.hex}`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${6 + (i * 0.8)}s`,
              }}
            />
          ))}
        </div>

        {/* 
          Cinematic Vignette:
          - Left side: Smooth dark gradient so headline and text remain ultra-crisp & readable
          - Center & Right side: Open & clear so background imagery shines through
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0d]/95 via-[#090a0d]/55 to-transparent pointer-events-none" />

        {/* Soft edge blend at top and bottom */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#090a0d]/90 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/60 to-transparent pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════════
          HERO CONTENT CONTAINER
      ════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* ── Left Column: Headline, Description & CTAs ── */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-5"
            >
              {/* Luxury Category Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0e1117]/85 border border-[#CC1F1F]/40 backdrop-blur-md shadow-xl">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC1F1F] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CC1F1F]" />
                </span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#CC1F1F] font-bold">
                  {currentSlide.edition || cmsSubtitle}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
                {cmsTitle}
              </h1>

              {/* Editorial Description */}
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                {cmsDesc}
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to={primaryBtnLink}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#CC1F1F] to-[#b39366] text-black font-semibold text-xs uppercase tracking-luxury shadow-2xl hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {secondaryBtnText && (
                <Link
                  to={secondaryBtnLink}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/25 hover:border-[#CC1F1F]/60 bg-black/40 hover:bg-black/60 backdrop-blur-md text-neutral-100 hover:text-white text-xs font-semibold uppercase tracking-luxury transition-all duration-300"
                >
                  <span>{secondaryBtnText}</span>
                </Link>
              )}
            </motion.div>

            {/* Architectural Trust Metrics */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-neutral-200 max-w-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <Compass className="w-4 h-4 text-[#CC1F1F]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">CRI &gt; 98</span>
                  <span className="text-[10px] text-neutral-300 uppercase font-mono">True Color</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <Award className="w-4 h-4 text-[#CC1F1F]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">5-Year</span>
                  <span className="text-[10px] text-neutral-300 uppercase font-mono">Warranty</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/15 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 text-[#CC1F1F]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">IP65 / CE</span>
                  <span className="text-[10px] text-neutral-300 uppercase font-mono">Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Interactive Featured Luminaire Card & Lighting Tone Controls ── */}
          <div className="lg:col-span-5 flex flex-col items-end justify-end space-y-3 w-full max-w-md ml-auto">

            {/* 1. Interactive Lighting Tone Switcher Bar */}
            <div className="w-full flex items-center justify-between bg-black/70 backdrop-blur-xl px-3.5 py-2 rounded-2xl border border-white/15 shadow-2xl">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CC1F1F] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#CC1F1F]" />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-neutral-300 font-mono font-semibold">
                  Color Temp:
                </span>
              </div>

              <div className="flex items-center gap-1">
                {KELVIN_PRESETS.map((preset) => {
                  const isSelected = activeKelvin.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setActiveKelvin(preset)}
                      title={`${preset.kelvin} - ${preset.name}`}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-mono font-semibold transition-all duration-300 ${
                        isSelected
                          ? 'bg-white/20 text-white border border-white/30 shadow-[0_0_12px_rgba(255,255,255,0.25)]'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: preset.hex, boxShadow: isSelected ? `0 0 8px ${preset.hex}` : 'none' }}
                      />
                      <span>{preset.kelvin}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Flagship Luminaire Showcase Card with Product Image ("banner maye yaha par bhi images laga de") */}
            <div className="w-full bg-[#0e1117]/80 hover:bg-[#0e1117]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 group">

              {/* Card Header: Category Badge & Edition */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9.5px] uppercase font-mono tracking-widest px-2.5 py-0.5 rounded-full bg-[#CC1F1F]/20 text-[#CC1F1F] border border-[#CC1F1F]/30 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CC1F1F] inline-block animate-pulse" />
                  {currentSlide.badge}
                </span>
                <span className="text-[10px] text-neutral-300 font-mono">
                  {currentSlide.edition}
                </span>
              </div>

              {/* ── PRODUCT IMAGE SHOWCASE FRAME WITH LIGHTING HALO ANIMATION ── */}
              <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-black/60 border border-white/15 group/img mb-3.5">
                {/* Dynamic Lighting Spotlight Halo behind the Luminaire Image */}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-700 animate-halo-pulse"
                  style={{ background: activeLighting.haloGradient }}
                />

                {/* The Luminaire Product Image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.cardImage}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                    className="w-full h-full relative z-10 flex items-center justify-center p-2"
                  >
                    <img
                      src={currentSlide.cardImage}
                      alt={currentSlide.name}
                      className="w-full h-full object-cover object-center rounded-lg shadow-2xl transform group-hover/img:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Photometric Specs Pill on Image */}
                <div className="absolute top-2 left-2 z-20">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md border backdrop-blur-md font-semibold transition-colors duration-300 ${activeLighting.badgeClass}`}>
                    ✦ {activeLighting.name}
                  </span>
                </div>

                {/* Quick Inspect Tag */}
                <div className="absolute bottom-2 right-2 z-20">
                  <span className="text-[9.5px] font-mono px-2 py-0.5 rounded-md bg-black/70 border border-white/20 text-neutral-200 backdrop-blur-md flex items-center gap-1">
                    <span>{currentSlide.specs.cri}</span>
                  </span>
                </div>
              </div>

              {/* Luminaire Title & Subtitle */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-1.5"
                >
                  <h4 className="text-base font-serif-luxury font-bold text-white tracking-wide group-hover:text-[#CC1F1F] transition-colors line-clamp-1">
                    {currentSlide.name}
                  </h4>
                  <p className="text-[11px] text-neutral-300 line-clamp-2 leading-relaxed">
                    {currentSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Luminaire Material & Architectural Specs Row */}
              <div className="mt-3 pt-2.5 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] font-mono text-neutral-300">
                <div className="truncate">
                  <span className="text-neutral-400">Finish: </span>
                  <span className="text-neutral-100 font-semibold">{currentSlide.specs.finish}</span>
                </div>
                <div className="truncate text-right">
                  <span className="text-neutral-400">Optics: </span>
                  <span className="text-neutral-100 font-semibold">{liveLumens.toLocaleString()} lm</span>
                </div>
              </div>

              {/* ── Interactive Photometric Stage Controls (Dimmer + Beam Angle) ── */}
              <div className="mt-3 pt-2.5 border-t border-white/10 bg-black/40 rounded-xl p-2.5 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-[#CC1F1F]" />
                    <span>Stage Dimmer:</span>
                  </span>
                  <div className="flex items-center gap-1.5 font-bold">
                    <span className="text-amber-300">{dimmerLevel}%</span>
                    <span className="text-neutral-500 font-normal">|</span>
                    <span className="text-neutral-300">{liveLumens} lm</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="15"
                  max="100"
                  step="5"
                  value={dimmerLevel}
                  onChange={(e) => setDimmerLevel(parseInt(e.target.value, 10))}
                  className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#CC1F1F]"
                />

                <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[9px] font-mono">
                  <span className="text-neutral-400">Beam Spread:</span>
                  <div className="flex items-center gap-1">
                    {['spot', 'accent', 'flood'].map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setBeamSpread(mode)}
                        className={`px-2 py-0.5 rounded transition-all ${
                          beamSpread === mode
                            ? 'bg-[#CC1F1F] text-white font-bold shadow'
                            : 'bg-white/5 hover:bg-white/10 text-neutral-400'
                        }`}
                      >
                        {beamShapes[mode].label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── 3. INTERACTIVE CAROUSEL THUMBNAIL SELECTOR (CHANGES BACKGROUND + CARD ON CLICK) ── */}
              <div className="mt-3.5 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9.5px] uppercase font-mono tracking-widest text-neutral-400 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#CC1F1F]" />
                    <span>Select Luminaire ({slides.length})</span>
                  </span>
                  <span className="text-[9.5px] font-mono text-neutral-400">
                    Click to switch banner
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {slides.map((slide, idx) => {
                    const isActive = currentIdx === idx;
                    return (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => handleSelectSlide(idx)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 group/thumb ${
                          isActive
                            ? 'border-[#CC1F1F] shadow-[0_0_12px_rgba(204,31,31,0.65)] scale-105 ring-1 ring-[#CC1F1F]'
                            : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40 hover:scale-102'
                        }`}
                        title={`${slide.name} - Click to switch scene`}
                      >
                        <img
                          src={slide.cardImage}
                          alt={slide.name}
                          className="w-full h-full object-cover object-center"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-[#CC1F1F]/20 pointer-events-none" />
                        )}
                        <span className="absolute bottom-0.5 right-0.5 text-[8px] font-mono font-bold px-1 rounded bg-black/80 text-white leading-none">
                          0{idx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── 4. SLIDE CONTROLS, PROGRESS BAR & DETAILS LINK ── */}
              <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between">
                {/* Prev / Next Chevrons & Counter */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg bg-black/40 hover:bg-[#CC1F1F]/20 border border-white/15 text-neutral-300 hover:text-white transition-all"
                    aria-label="Previous Luminaire"
                    title="Previous Luminaire"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[10px] font-mono text-neutral-300 px-1 font-semibold">
                    0{currentIdx + 1} / 0{slides.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="p-1.5 rounded-lg bg-black/40 hover:bg-[#CC1F1F]/20 border border-white/15 text-neutral-300 hover:text-white transition-all"
                    aria-label="Next Luminaire"
                    title="Next Luminaire"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>

                  {/* Auto-play pause toggle */}
                  <button
                    type="button"
                    onClick={() => setIsAutoPlayPaused(!isAutoPlayPaused)}
                    className="p-1.5 rounded-lg bg-black/40 hover:bg-white/10 border border-white/15 text-neutral-400 hover:text-white transition-all ml-0.5"
                    title={isAutoPlayPaused ? 'Resume Auto-slide' : 'Pause Auto-slide'}
                    aria-label={isAutoPlayPaused ? 'Resume Auto-slide' : 'Pause Auto-slide'}
                  >
                    {isAutoPlayPaused ? (
                      <Play className="w-3 h-3 text-[#CC1F1F]" />
                    ) : (
                      <Pause className="w-3 h-3" />
                    )}
                  </button>
                </div>

                {/* View Details Link */}
                <Link
                  to={currentSlide.link || '/catalog'}
                  className="text-[11px] text-[#CC1F1F] hover:text-[#ff6b6b] font-semibold flex items-center gap-1 transition-colors group/link"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>

              {/* Auto-Slide Progress Bar */}
              <div className="mt-2.5 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  key={`progress-${currentIdx}-${isHovered || isAutoPlayPaused}`}
                  initial={{ width: '0%' }}
                  animate={{ width: isHovered || isAutoPlayPaused ? undefined : '100%' }}
                  transition={{
                    duration: isHovered || isAutoPlayPaused ? 0 : SLIDE_DURATION / 1000,
                    ease: 'linear',
                  }}
                  className="h-full bg-gradient-to-r from-[#CC1F1F] via-[#e0b178] to-[#CC1F1F] rounded-full"
                />
              </div>

            </div>
          </div>

        </div>

        {/* ════════════════════════════════════════════════════════
            BOTTOM CAROUSEL CONTROLS & SLIDE PILLS
        ════════════════════════════════════════════════════════ */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          {/* Slide Indicator Pills */}
          <div className="flex items-center gap-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => handleSelectSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIdx === idx
                    ? 'w-10 bg-gradient-to-r from-[#CC1F1F] to-[#e0b178]'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}: ${slide.name}`}
              />
            ))}
          </div>

          {/* Quick Info & Slide Counter */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
              ✦ {currentSlide.name} • {activeLighting.name}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 rounded-xl bg-black/50 hover:bg-[#CC1F1F]/20 border border-white/15 text-neutral-300 hover:text-white transition-all backdrop-blur-md"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2 rounded-xl bg-black/50 hover:bg-[#CC1F1F]/20 border border-white/15 text-neutral-300 hover:text-white transition-all backdrop-blur-md"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
