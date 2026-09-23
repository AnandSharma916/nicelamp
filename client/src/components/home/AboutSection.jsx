import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ArrowRight, Sparkles, Heart, Sun, Moon, Sliders, ShieldCheck } from 'lucide-react';

export const AboutSection = ({ section }) => {
  const [splitPos, setSplitPos] = useState(50); // 0% - 100% Day vs Night slider
  const [isDragging, setIsDragging] = useState(false);

  const title = section?.title || 'Sculpted Metallurgy & Luminous Warmth for Every Interior';
  const subtitle = section?.subtitle || 'OUR PASSION & PHILOSOPHY';
  const description =
    section?.description ||
    'True luxury lies in the subtle dialogue between architecture, shadow, and warm illumination. We bring together hand-buffed solid brass, precision-cut K9 optical crystal prisms, and flicker-free circadian LEDs to craft luminaires that transform everyday living spaces into warm, welcoming sanctuaries.';
  const btnText = section?.buttonText || 'Discover Our Story & Craft';
  const btnLink = section?.buttonLink || '/about';

  const dayImage =
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';
  const nightImage =
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85';

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSplitPos((x / rect.width) * 100);
  };

  return (
    <section className="py-20 sm:py-24 bg-white relative overflow-hidden select-none border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Interactive Day/Night Lighting Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            {/* Interactive Split-Screen Elevation Stage */}
            <div
              onMouseMove={(e) => {
                if (isDragging || e.buttons === 1) handleSliderMove(e);
              }}
              onClick={handleSliderMove}
              className="relative rounded-2xl overflow-hidden border border-neutral-200 shadow-xl aspect-[4/3] sm:aspect-[16/11] cursor-ew-resize group"
            >
              {/* Day Ambient Layer (Base) - CLEAR & CRISP */}
              <img
                src={dayImage}
                alt="Living Room in Daylight"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Night Illuminated Layer (Clipped) - BRIGHT & WARM */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
              >
                <img
                  src={nightImage}
                  alt="Living Room with Warm Night Lighting"
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-105"
                />
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#DC2626] shadow-[0_0_12px_#DC2626] pointer-events-none z-20"
                style={{ left: `${splitPos}%` }}
              >
                {/* Center Handle Pill */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-[#DC2626] shadow-xl flex items-center justify-center text-[10px] font-bold text-neutral-800">
                  <Sliders className="w-3.5 h-3.5 text-[#DC2626] rotate-90" />
                </div>
              </div>

              {/* Day / Night Tags on Corner */}
              <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-[10px] font-semibold text-[#DC2626] shadow-sm">
                <Moon className="w-3 h-3 text-[#DC2626]" />
                <span>Night Glow</span>
              </div>
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-[10px] font-semibold text-neutral-700 shadow-sm">
                <Sun className="w-3 h-3 text-red-500" />
                <span>Day Ambient</span>
              </div>

              {/* Drag instruction notice */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-[10px] text-neutral-600 shadow-sm">
                Slide across image to see night glow
              </div>
            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-5 -right-3 sm:bottom-4 sm:right-4 bg-white/95 border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-xl max-w-[240px] z-30">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Award className="w-5 h-5 text-[#DC2626]" />
                <span className="font-serif-luxury text-xl sm:text-2xl text-neutral-900 font-bold">10,000+</span>
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">
                Homes, apartments & villas lit with warmth across India.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Clean & Simple Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block mb-2">
                {subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-neutral-900 tracking-tight leading-snug">
                {title}
              </h2>
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed">
              {description}
            </p>

              {/* Highlights Grid with Specific Metallurgy & Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-[#DC2626]/50 transition-colors">
                <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4 text-[#DC2626]" />
                  <span>PVD Solid Metallurgy</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Solid brass & marine-grade aluminum hand-buffed in champagne gold with anti-tarnish seals.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-[#DC2626]/50 transition-colors">
                <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs uppercase tracking-wider mb-1">
                  <Heart className="w-4 h-4 text-[#DC2626]" />
                  <span>Circadian Eye Comfort</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  High CRI &gt; 95, 2700K warm glow with flicker-free constant-current drivers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-[#DC2626]/50 transition-colors">
                <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs uppercase tracking-wider mb-1">
                  <CheckCircle className="w-4 h-4 text-[#DC2626]" />
                  <span>Custom Drop Scaling</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Suspension cables customized up to 10m for high stairwells and double-height duplexes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-[#DC2626]/50 transition-colors">
                <div className="flex items-center gap-2 text-neutral-900 font-semibold text-xs uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                  <span>100% Insured Crating</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Shockproof triple-wall wooden crates with free immediate replacement if damaged in transit.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={btnLink}
                className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs uppercase tracking-luxury shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>{btnText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
