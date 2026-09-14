import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export const HeroSection = ({ section }) => {
  const title = section?.title || 'Illuminating Architectural Masterpieces';
  const subtitle = section?.subtitle || 'Decorative Solutions & Technical Precision';
  const description =
    section?.description ||
    'Pioneering contemporary architectural lighting fixtures, precision engineered wall luminaires, and bespoke statement chandeliers designed for world-class spaces.';
  const bgImage =
    section?.images?.[0] ||
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1920&q=85';
  const primaryBtnText = section?.buttonText || 'Explore Catalog';
  const primaryBtnLink = section?.buttonLink || '/catalog';
  const secondaryBtnText = section?.secondaryButtonText || 'Company Profile';
  const secondaryBtnLink = section?.secondaryButtonLink || '/about';

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgImage}
          alt="Architectural Lighting Ambience"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0d] via-[#090a0d]/85 to-[#090a0d]/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-transparent to-transparent" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181b22]/90 border border-[#c5a880]/30 backdrop-blur-md mb-6 shadow-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-semibold">
              {subtitle}
            </span>
          </motion.div>

          {/* Heading with animated text reveal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-white tracking-tight leading-[1.15] mb-6"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light mb-8 max-w-2xl"
          >
            {description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              to={primaryBtnLink}
              className="btn-gold px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 shadow-2xl"
            >
              <span>{primaryBtnText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {secondaryBtnText && (
              <Link
                to={secondaryBtnLink}
                className="btn-outline-gold px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2"
              >
                <span>{secondaryBtnText}</span>
              </Link>
            )}
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-neutral-300"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-[#c5a880]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Die-Cast Precision</span>
                <span className="text-[11px] text-neutral-400">Architectural Grade</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#c5a880]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">CRI &gt; 95 Optics</span>
                <span className="text-[11px] text-neutral-400">Flicker-Free LED</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">Specifier Ready</span>
                <span className="text-[11px] text-neutral-400">Full IES & Spec Sheets</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
