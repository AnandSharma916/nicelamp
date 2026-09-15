import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Compass,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sun,
  Zap,
  Sliders,
  CheckCircle2,
  Award,
} from 'lucide-react';

export const HeroSection = ({ section }) => {
  // Base Section Config from Admin CMS
  const cmsTitle = section?.title || 'Illuminating Architectural Masterpieces';
  const cmsSubtitle = section?.subtitle || 'Decorative Solutions & Technical Precision';
  const cmsDesc =
    section?.description ||
    'Pioneering contemporary architectural lighting fixtures, precision engineered wall luminaires, and bespoke statement chandeliers designed for world-class spaces.';
  const cmsBg = section?.image || section?.images?.[0];
  const primaryBtnText = section?.buttonText || 'Explore Catalog';
  const primaryBtnLink = section?.buttonLink || '/catalog';
  const secondaryBtnText = section?.secondaryButtonText || 'Architectural Inquiry';
  const secondaryBtnLink = section?.secondaryButtonLink || '/contact';

  // Architectural Lighting Slides Collection
  const slides = [
    {
      id: 'architectural-facade',
      badge: cmsSubtitle,
      title: cmsTitle,
      description: cmsDesc,
      image:
        cmsBg ||
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=2000&q=85',
      category: 'Exterior & Facade',
      accentColor: '#c5a880',
      fixture: {
        sku: 'LH-OD501',
        name: 'Bi-Directional IP65 Facade Grazer',
        spec: '3000K Warm Dim • 24W • 2,400 lm',
        rating: 'IP65 Weatherproof',
        img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
        slug: 'lh-od501-bi-directional-ip65-facade-grazer',
      },
    },
    {
      id: 'italian-murano',
      badge: 'Artisanal European Heritage • Murano Series',
      title: 'Sculpted Murano Glass & Suspended Brilliance',
      description:
        'Hand-blown mouth-crafted Italian glass chandeliers and suspended statement pendants combining centuries-old Venetian craftsmanship with precision-controlled optical LED engines.',
      image:
        section?.images?.[1] ||
        'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=2000&q=85',
      category: 'Italian Pendant Luminaires',
      accentColor: '#e0b178',
      fixture: {
        sku: 'LH-2036',
        name: 'Italian Hand-Blown Murano Pendant',
        spec: '2700K Amber Ambient • CRI > 97',
        rating: 'Hand-Blown Glass',
        img: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80',
        slug: 'lh-2036-italian-hand-blown-murano-pendant',
      },
    },
    {
      id: 'magnetic-track',
      badge: '48V Low-Voltage Precision • Track Systems',
      title: 'Ultra-Slim Magnetic Architectural Systems',
      description:
        'Seamless recessed, surface, and pendant magnetic track channels with click-in micro-spots, wall-wash diffusers, and smart architectural dimming compatibility.',
      image:
        section?.images?.[2] ||
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
      category: 'Linear Track Lighting',
      accentColor: '#a8c5db',
      fixture: {
        sku: 'LH-TRK48',
        name: '48V Ultra-Slim Magnetic Flood Module',
        spec: '4000K Pure White • 48V Safe Touch',
        rating: 'Magnetic Click-In',
        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
        slug: 'lh-6031w-acrylic-architectural-wall-lamp',
      },
    },
    {
      id: 'luxury-table',
      badge: 'Solid Brass & Natural Walnut • Task Luminaires',
      title: 'Bespoke Tactile Ambiance for Luxury Spaces',
      description:
        'Sculptural task luminaires, machined solid brass desk pieces, and cordless dimmable lamps crafted with organic materials for high-end hospitality and villas.',
      image:
        section?.images?.[3] ||
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=2000&q=85',
      category: 'Sculptural Table Lamps',
      accentColor: '#d6a066',
      fixture: {
        sku: 'LH-T2309',
        name: 'Solid American Walnut Desk Luminaire',
        spec: '2400K Candle Warmth • Stepless Touch Dim',
        rating: 'Hand-Turned Timber',
        img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
        slug: 'lh-t2309-solid-walnut-table-lamp',
      },
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightMode, setLightMode] = useState('warm'); // 'warm' | 'white' | 'off'
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 6500; // 6.5 seconds per slide
  const progressInterval = useRef(null);

  // Auto-play timer with progress update
  useEffect(() => {
    if (isHovered) {
      if (progressInterval.current) clearInterval(progressInterval.current);
      return;
    }

    const stepTime = 50;
    const stepIncrement = (stepTime / SLIDE_DURATION) * 100;

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((cur) => (cur + 1) % slides.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, stepTime);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isHovered, slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const slide = slides[currentSlide];

  // Dynamic light beam gradient color based on interactive toggle
  const glowColor =
    lightMode === 'warm'
      ? 'rgba(197, 168, 128, 0.22)'
      : lightMode === 'white'
      ? 'rgba(180, 220, 255, 0.2)'
      : 'rgba(0, 0, 0, 0)';

  return (
    <section
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 select-none"
    >
      {/* Dynamic Animated Background Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.75]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Ambient Warm Architectural Lighting Glow Orbs */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000"
          style={{ background: glowColor }}
        />
        <div
          className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none transition-all duration-1000"
          style={{ background: glowColor }}
        />

        {/* Multi-layered Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07080b] via-[#090a0d]/85 to-[#090a0d]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-[#07080b]/60" />

        {/* Subtle Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-70" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${slide.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.65, ease: 'easeOut' }}
                className="space-y-6"
              >
                {/* Luxury Category Badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#151820]/90 border border-[#c5a880]/40 backdrop-blur-md shadow-2xl">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a880]" />
                  </span>
                  <span className="text-[11px] uppercase tracking-luxury text-[#c5a880] font-bold">
                    {slide.badge}
                  </span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-white tracking-tight leading-[1.12]">
                  {slide.title}
                </h1>

                {/* Editorial Description */}
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light max-w-2xl">
                  {slide.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link
                to={primaryBtnLink}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b39366] text-black font-semibold text-xs uppercase tracking-luxury shadow-2xl hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{primaryBtnText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {secondaryBtnText && (
                <Link
                  to={secondaryBtnLink}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/20 hover:border-[#c5a880]/60 bg-white/[0.03] hover:bg-white/[0.08] backdrop-blur-md text-neutral-200 hover:text-white text-xs font-semibold uppercase tracking-luxury transition-all duration-300"
                >
                  <span>{secondaryBtnText}</span>
                </Link>
              )}
            </motion.div>

            {/* Quick Architectural Trust Metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-neutral-300">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Compass className="w-4 h-4 text-[#c5a880]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">CRI &gt; 97</span>
                  <span className="text-[10px] text-neutral-400 uppercase font-mono">True Color</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-[#c5a880]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">5-Year</span>
                  <span className="text-[10px] text-neutral-400 uppercase font-mono">Warranty</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">IP65 / CE</span>
                  <span className="text-[10px] text-neutral-400 uppercase font-mono">Certified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Featured Luminaire Showcase Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${slide.id}`}
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                className="w-full max-w-sm"
              >
                <div className="relative rounded-3xl bg-gradient-to-b from-[#181c25]/90 to-[#0e1117]/90 border border-white/15 backdrop-blur-2xl p-5 shadow-2xl hover:border-[#c5a880]/50 transition-all duration-500 group">
                  {/* Glowing Rim Effect */}
                  <div
                    className="absolute -inset-0.5 rounded-3xl opacity-30 blur-xl transition-all duration-700 pointer-events-none"
                    style={{ background: slide.accentColor }}
                  />

                  {/* Card Header */}
                  <div className="relative flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 font-bold">
                        {slide.fixture.sku}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase">
                        {slide.fixture.rating}
                      </span>
                    </div>

                    {/* Interactive Photometric Light Switch */}
                    <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10">
                      <button
                        type="button"
                        onClick={() => setLightMode('warm')}
                        title="3000K Architectural Warm Light"
                        className={`p-1.5 rounded-lg text-xs transition-all ${
                          lightMode === 'warm'
                            ? 'bg-[#c5a880] text-black shadow-md scale-105'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Sun className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setLightMode('white')}
                        title="4000K Pure White Optical Light"
                        className={`p-1.5 rounded-lg text-xs transition-all ${
                          lightMode === 'white'
                            ? 'bg-blue-400 text-black shadow-md scale-105'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Image Showcase Container */}
                  <div className="relative h-56 rounded-2xl bg-[#090b10] border border-white/10 overflow-hidden flex items-center justify-center p-3 mb-4">
                    {/* Simulated Glow when active */}
                    <div
                      className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                      style={{
                        opacity: lightMode === 'off' ? 0 : 0.45,
                        background:
                          lightMode === 'warm'
                            ? 'radial-gradient(circle at center, rgba(197,168,128,0.5) 0%, transparent 70%)'
                            : 'radial-gradient(circle at center, rgba(147,197,253,0.5) 0%, transparent 70%)',
                      }}
                    />

                    <img
                      src={slide.fixture.img}
                      alt={slide.fixture.name}
                      className="w-full h-full object-contain filter group-hover:scale-105 transition-transform duration-700"
                    />

                    <span className="absolute bottom-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-[#c5a880] border border-white/10">
                      Photometrics Active
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">
                      {slide.category}
                    </span>
                    <h3 className="text-base font-serif-luxury font-bold text-white tracking-wide leading-snug">
                      {slide.fixture.name}
                    </h3>
                    <p className="text-[11px] text-neutral-400 font-mono">
                      {slide.fixture.spec}
                    </p>
                  </div>

                  {/* Card Action */}
                  <Link
                    to={`/product/${slide.fixture.slug}`}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#c5a880]/50 text-white text-xs font-semibold uppercase tracking-luxury flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <span>Inspect Luminaire Specs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#c5a880]" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Carousel Controls & Slide Indicator Tabs */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Slide Navigation Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto pb-1">
            {slides.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`relative py-2 px-3 sm:px-4 rounded-xl text-left transition-all duration-300 shrink-0 ${
                  currentSlide === idx
                    ? 'bg-white/10 border border-[#c5a880]/40 text-white'
                    : 'bg-white/[0.02] border border-white/5 text-neutral-400 hover:text-neutral-200 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#c5a880]">
                    0{idx + 1}
                  </span>
                  <span className="text-[11px] font-medium tracking-wide">
                    {s.category}
                  </span>
                </div>

                {/* Progress bar under active slide tab */}
                {currentSlide === idx && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#c5a880] to-[#e0b178]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Left / Right Carousel Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-[#12151b]/80 hover:bg-[#c5a880]/20 border border-white/10 hover:border-[#c5a880]/40 text-neutral-300 hover:text-[#c5a880] transition-all backdrop-blur-md"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-neutral-400 px-1">
              0{currentSlide + 1} <span className="text-neutral-600">/</span> 0{slides.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-[#12151b]/80 hover:bg-[#c5a880]/20 border border-white/10 hover:border-[#c5a880]/40 text-neutral-300 hover:text-[#c5a880] transition-all backdrop-blur-md"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
