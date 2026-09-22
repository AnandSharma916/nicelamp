import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ArrowRight, Sparkles, Heart, Sun, Moon, Sliders, ShieldCheck } from 'lucide-react';

export const AboutSection = ({ section }) => {
  const [splitPos, setSplitPos] = useState(50); // 0% - 100% Day vs Night slider
  const [isDragging, setIsDragging] = useState(false);

  const title = section?.title || 'Crafted to Bring Warmth & Beauty to Every Home';
  const subtitle = section?.subtitle || 'ABOUT NICELAMP';
  const description =
    section?.description ||
    'At NiceLamp, we believe lighting transforms the soul of a home. We bring together thoughtful design, hand-finished metals, and luminous crystal glass to create lamps that elevate your everyday living with warmth and elegance.';
  const btnText = section?.buttonText || 'Discover Our Story';
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
    <section className="py-20 sm:py-24 bg-[#0b0f17] relative overflow-hidden select-none border-t border-white/5">
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
              className="relative rounded-2xl overflow-hidden border border-white/12 shadow-2xl aspect-[4/3] sm:aspect-[16/11] cursor-ew-resize group"
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
                className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] shadow-[0_0_12px_#D4AF37] pointer-events-none z-20"
                style={{ left: `${splitPos}%` }}
              >
                {/* Center Handle Pill */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#161e2c] border-2 border-[#D4AF37] shadow-xl flex items-center justify-center text-[10px] font-bold text-white">
                  <Sliders className="w-3.5 h-3.5 text-[#D4AF37] rotate-90" />
                </div>
              </div>

              {/* Day / Night Tags on Corner */}
              <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0f17]/85 backdrop-blur-md border border-white/12 text-[10px] font-semibold text-[#FDE68A]">
                <Moon className="w-3 h-3 text-[#F59E0B]" />
                <span>Night Glow</span>
              </div>
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0f17]/85 backdrop-blur-md border border-white/12 text-[10px] font-semibold text-neutral-200">
                <Sun className="w-3 h-3 text-amber-300" />
                <span>Day Ambient</span>
              </div>

              {/* Drag instruction notice */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-[#0b0f17]/80 backdrop-blur-md border border-white/10 text-[10px] text-neutral-300">
                Slide across image to see night glow
              </div>
            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-5 -right-3 sm:bottom-4 sm:right-4 bg-[#161e2c]/95 border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl max-w-[240px] z-30">
              <div className="flex items-center gap-2.5 mb-1.5">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-serif-luxury text-xl sm:text-2xl text-white font-bold">10,000+</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed">
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
              <span className="text-xs uppercase tracking-luxury text-[#D4AF37] font-bold block mb-2">
                {subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight leading-snug">
                {title}
              </h2>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {description}
            </p>

            {/* Simple Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 rounded-xl bg-[#161e2c]/60 border border-white/8 hover:border-[#D4AF37]/40 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Handcrafted Quality</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Carefully crafted with high-grade brass, frosted glass, and premium finishes built to last.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#161e2c]/60 border border-white/8 hover:border-[#D4AF37]/40 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider mb-1.5">
                  <Heart className="w-4 h-4 text-[#D4AF37]" />
                  <span>Eye-Friendly Warmth</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Soothing, flicker-free warm light designed to create a calm, welcoming mood in your living spaces.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#161e2c]/60 border border-white/8 hover:border-[#D4AF37]/40 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider mb-1.5">
                  <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
                  <span>500+ Unique Designs</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  From statement chandeliers to minimalist wall sconces, find the ideal lamp for every corner.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#161e2c]/60 border border-white/8 hover:border-[#D4AF37]/40 transition-colors">
                <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Safe Pan-India Delivery</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Multilayer shockproof packaging ensuring each lamp reaches your doorstep in pristine condition.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={btnLink}
                className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs uppercase tracking-luxury shadow-lg transition-all transform hover:-translate-y-0.5"
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
