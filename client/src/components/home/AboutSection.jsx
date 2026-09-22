import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ArrowRight, Shield, Zap, Sparkles, Sun, Moon, Sliders } from 'lucide-react';
import { useAmbiance } from '../common/AmbientLightExperience';

export const AboutSection = ({ section }) => {
  const { activeKelvin } = useAmbiance();
  const [splitPos, setSplitPos] = useState(50); // 0% - 100% Day vs Night slider
  const [isDragging, setIsDragging] = useState(false);

  const title = section?.title || 'Precision Craftsmanship Meets Optical Mastery';
  const subtitle = section?.subtitle || 'About LightHut Decorative Solutions';
  const description =
    section?.description ||
    'With decades of dedicated expertise in architectural illumination, LightHut manufactures and supplies premier lighting fixtures engineered for high-performance residential estates, boutique hotels, and landmark commercial pavilions.';
  const btnText = section?.buttonText || 'Read Full Company Profile';
  const btnLink = section?.buttonLink || '/about';

  const dayImage =
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
  const nightImage =
    'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80';

  const handleSliderMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSplitPos((x / rect.width) * 100);
  };

  return (
    <section className="py-24 bg-[#090a0d] relative overflow-hidden select-none border-t border-white/5">
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-1000"
        style={{
          backgroundColor: activeKelvin.hex,
          opacity: 0.12,
          transform: 'translateY(-50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Interactive Day/Night Architectural Lighting Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
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
              className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl aspect-[4/3] sm:aspect-[16/11] cursor-ew-resize group"
            >
              {/* Day Ambient Layer (Base) */}
              <img
                src={dayImage}
                alt="Architectural Lighting Day Elevation"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/25" />

              {/* Night Illuminated Layer (Clipped) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - splitPos}% 0 0)` }}
              >
                <img
                  src={nightImage}
                  alt="Architectural Lighting Night Elevation"
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-110 contrast-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 40% 50%, rgba(${activeKelvin.rgb}, 0.25) 0%, rgba(0,0,0,0.4) 100%)`,
                  }}
                />
              </div>

              {/* Draggable Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_#ffffff] pointer-events-none z-20"
                style={{ left: `${splitPos}%` }}
              >
                {/* Center Handle Pill */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#11141c] border-2 border-white shadow-xl flex items-center justify-center text-[10px] font-mono font-bold text-white">
                  <Sliders className="w-3.5 h-3.5 text-amber-400 rotate-90" />
                </div>
              </div>

              {/* Day / Night Tags on Corner */}
              <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                <Moon className="w-3 h-3 text-amber-400" />
                <span>Night Luminaire</span>
              </div>
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
                <Sun className="w-3 h-3 text-sky-300" />
                <span>Day Ambient</span>
              </div>

              {/* Drag instruction notice */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9.5px] font-mono text-neutral-400 opacity-80 group-hover:opacity-100 transition-opacity">
                Slide across image to compare illumination
              </div>
            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-4 sm:right-4 bg-[#141720]/95 border border-[#CC1F1F]/40 rounded-2xl p-5 shadow-2xl backdrop-blur-xl max-w-[260px] z-30">
              <div className="flex items-center gap-3 mb-1.5">
                <Award className="w-6 h-6 text-[#CC1F1F]" />
                <span className="font-serif-luxury text-2xl text-white font-bold">25+ Years</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed font-light">
                Engineering precision architectural luminaires for landmark residences and hotels.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Holographic Engineering Specs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-luxury text-[#CC1F1F] font-bold block mb-2">
                {subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight leading-tight">
                {title}
              </h2>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed font-light">
              {description}
            </p>

            {/* Photometric Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-colors group">
                <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider mb-1.5">
                  <Shield className="w-4 h-4 text-[#CC1F1F] group-hover:text-amber-400 transition-colors" />
                  <span>Optical Purity (CRI &gt; 98)</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Single-bin LED diodes deliver museum-grade spectral reproduction with no chromatic distortion.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-colors group">
                <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider mb-1.5">
                  <Zap className="w-4 h-4 text-[#CC1F1F] group-hover:text-amber-400 transition-colors" />
                  <span>Flicker-Free Drivers</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Deep Triac and 0-10V dimming algorithms engineered for seamless 0.1% to 100% control.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-colors group">
                <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#CC1F1F] group-hover:text-amber-400 transition-colors" />
                  <span>K9 Prismatic Crystal</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Precision multi-faceted geometric crystals with internal optical dispersion.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-amber-400/40 transition-colors group">
                <div className="flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-wider mb-1.5">
                  <CheckCircle className="w-4 h-4 text-[#CC1F1F] group-hover:text-amber-400 transition-colors" />
                  <span>IP65 Weather Seal</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Marine-grade die-cast housings resistant to high UV index, heavy monsoon, and saline air.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={btnLink}
                className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-luxury text-[#CC1F1F] hover:text-white transition-colors group"
              >
                <span>{btnText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
