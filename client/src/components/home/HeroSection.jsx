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
  MessageCircle,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const HeroSection = ({ section }) => {
  const { settings } = useSettings();

  const cmsTitle = section?.title || 'Bring Warmth & Elegance to Your Home';
  const cmsSubtitle = section?.subtitle || 'Designer Chandeliers, Pendants & Wall Lamps';
  const cmsDesc =
    section?.description ||
    'Transform your living spaces with handcrafted lighting. From modern living room chandeliers to warm bedside pendants, discover lamps designed for everyday luxury.';
  const primaryBtnText = section?.buttonText || 'Explore Collection';
  const primaryBtnLink = section?.buttonLink || '/catalog';
  const secondaryBtnText = section?.secondaryButtonText || 'WhatsApp Inquiry';

  // Curated slides with clear, bright, high-resolution imagery
  const slides = [
    {
      id: 'chandelier',
      name: 'Aura Modern Ring Chandelier',
      category: 'Chandelier',
      badge: 'Bestseller',
      description: 'Stunning warm golden glow with crystal accents, perfect for living and dining spaces.',
      image: '/categories/chandelier.jpg',
      bgImage: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=2000&q=90',
      material: 'Brushed Brass & Crystal Glass',
      idealFor: 'Living Room & Dining',
      link: '/category/chandelier',
    },
    {
      id: 'pendant-lamp',
      name: 'Solstice Fluted Pendant Light',
      category: 'Pendant Lamp',
      badge: 'Modern Dining',
      description: 'Artisan fluted glass diffusing a warm, inviting glow over kitchen islands and dining tables.',
      image: '/categories/pendant-lamp.jpg',
      bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=90',
      material: 'Champagne Gold & Fluted Glass',
      idealFor: 'Kitchen Island & Dining Table',
      link: '/category/pendant-lamp',
    },
    {
      id: 'wall-lamp',
      name: 'Eclipse Halo Wall Lamp',
      category: 'Wall Lamp',
      badge: 'Bedside & Hallway',
      description: 'Subtle ambient halo light designed for cozy bedroom corners, hallways, and living room accent walls.',
      image: '/categories/wall-lamp.jpg',
      bgImage: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=2000&q=90',
      material: 'Matte Gold Finish',
      idealFor: 'Bedside & Living Room Wall',
      link: '/category/wall-lamp',
    },
    {
      id: 'double-height',
      name: 'Cascade Grand Chandelier',
      category: 'Double Height',
      badge: 'Grand Statement',
      description: 'Dramatic multi-tier cascading crystal lights crafted to illuminate grand staircases and high ceilings.',
      image: '/categories/double-height.jpg',
      bgImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=90',
      material: 'Multi-Tier K9 Crystal & Brass',
      idealFor: 'High Ceiling Foyers & Staircases',
      link: '/category/double-height',
    },
    {
      id: 'outdoor-light',
      name: 'Vanguard Weatherproof Gate Lamp',
      category: 'Outdoor Light',
      badge: 'Outdoor & Gate',
      description: 'Durable, waterproof exterior light that adds welcoming elegance and security to porches and boundary gates.',
      image: '/categories/outdoor-light.jpg',
      bgImage: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=2000&q=90',
      material: 'Weatherproof Aluminum & Glass',
      idealFor: 'Main Gate, Balcony & Garden',
      link: '/category/outdoor-light',
    },
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentIdx];

  const handleNext = () => setCurrentIdx((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setCurrentIdx((prev) => (prev - 1 + slides.length) % slides.length);

  const whatsappNumber = (settings?.whatsapp || '+919999000000').replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello NiceLamp! I am interested in ${currentSlide.name} and would like to know the price and availability.`
  )}`;

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden pt-24 sm:pt-28 pb-12 bg-[#0b0f17]"
    >
      {/* ════════════════════════════════════════════════════════
          BACKGROUND HERO IMAGE - CLEAR, BRIGHT & UNOBSTRUCTED
      ════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.bgImage}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <img
              src={currentSlide.bgImage}
              alt={currentSlide.name}
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft, subtle side gradient - ONLY on the left for text readability. Right side is OPEN and clear! */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f17]/95 via-[#0b0f17]/70 to-[#0b0f17]/25 pointer-events-none" />

        {/* Delicate top and bottom fade for seamless section transition */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0b0f17]/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0b0f17] to-transparent pointer-events-none" />
      </div>

      {/* ════════════════════════════════════════════════════════
          HERO CONTENT CONTAINER
      ════════════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* ── Left Column: Clean & Simple Messaging ── */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Simple Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161e2c]/90 border border-[#D4AF37]/40 shadow-md">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#FDE68A] font-bold">
                  {cmsSubtitle}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
                {cmsTitle}
              </h1>

              {/* Simple Description */}
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal max-w-xl drop-shadow-sm">
                {cmsDesc}
              </p>
            </motion.div>

            {/* Simple Direct Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <Link
                to={primaryBtnLink}
                className="btn-gold inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl text-xs uppercase tracking-luxury shadow-xl hover:brightness-110 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{primaryBtnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-white/20 hover:border-[#D4AF37]/60 bg-[#161e2c]/80 hover:bg-[#161e2c] text-neutral-100 hover:text-white text-xs font-semibold uppercase tracking-luxury transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4 text-[#F59E0B]" />
                <span>{secondaryBtnText}</span>
              </a>
            </motion.div>

            {/* Simple Customer Trust Points */}
            <div className="pt-5 border-t border-white/10 grid grid-cols-3 gap-3 text-neutral-200 max-w-lg">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#161e2c]/80 border border-white/10 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Handcrafted</span>
                  <span className="text-[10px] text-neutral-300">Premium Finish</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#161e2c]/80 border border-white/10 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Safe Delivery</span>
                  <span className="text-[10px] text-neutral-300">All Over India</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#161e2c]/80 border border-white/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Quality Assured</span>
                  <span className="text-[10px] text-neutral-300">Tested & Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Featured Lamp Showcase Card with 100% CLEAR IMAGE ── */}
          <div className="lg:col-span-5 flex flex-col items-end w-full max-w-md ml-auto">
            <div className="w-full bg-[#161e2c]/90 border border-white/12 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 group">

              {/* Card Header: Category & Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#FDE68A] border border-[#D4AF37]/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] inline-block animate-pulse" />
                  {currentSlide.badge}
                </span>
                <span className="text-xs text-neutral-300 font-medium">
                  {currentSlide.category}
                </span>
              </div>

              {/* ── CLEAR, CRISP PRODUCT IMAGE SHOWCASE ── */}
              <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-black/40 border border-white/10 mb-4 group/img">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide.image}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.name}
                      className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-500"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Clear room tag */}
                <div className="absolute bottom-2.5 left-2.5 z-10">
                  <span className="text-[10px] font-medium px-2.5 py-1 rounded-md bg-[#0b0f17]/85 border border-white/15 text-neutral-200 backdrop-blur-md">
                    📍 {currentSlide.idealFor}
                  </span>
                </div>
              </div>

              {/* Lamp Title & Friendly Details */}
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-serif-luxury font-bold text-white">
                  {currentSlide.name}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                  {currentSlide.description}
                </p>

                <div className="pt-3 border-t border-white/8 flex items-center justify-between">
                  <span className="text-[11px] text-[#FDE68A] font-semibold">
                    {currentSlide.material}
                  </span>
                  <Link
                    to={currentSlide.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] hover:text-[#F59E0B] transition-colors"
                  >
                    <span>View Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>

            {/* Clean Slide Category Switcher Bar with Thumbnail Dots */}
            <div className="w-full mt-3 flex items-center justify-between bg-[#161e2c]/80 px-3 py-2 rounded-xl border border-white/10">
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold transition-all shrink-0 ${
                      idx === currentIdx
                        ? 'bg-[#D4AF37] text-[#0b0f17] font-bold shadow-md'
                        : 'text-neutral-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {s.category}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
