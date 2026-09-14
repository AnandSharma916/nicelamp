import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, CheckCircle, ArrowRight, Shield, Zap, Sparkles } from 'lucide-react';

export const AboutSection = ({ section }) => {
  const title = section?.title || 'Precision Craftsmanship Meets Optical Mastery';
  const subtitle = section?.subtitle || 'About LightHut Decorative Solutions';
  const description =
    section?.description ||
    'With decades of dedicated expertise in architectural illumination, LightHut manufactures and supplies premier lighting fixtures engineered for high-performance residential estates, boutique hotels, and landmark commercial pavilions.';
  const image =
    section?.images?.[0] ||
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80';
  const btnText = section?.buttonText || 'Read Full Company Profile';
  const btnLink = section?.buttonLink || '/about';

  return (
    <section className="py-24 bg-[#090a0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Stage with Overlapping Frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={image}
                alt="LightHut Craftsmanship"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>

            {/* Floating Experience Card */}
            <div className="absolute -bottom-6 -right-6 sm:bottom-6 sm:right-6 bg-[#181b22]/95 border border-[#c5a880]/40 rounded-2xl p-6 shadow-2xl backdrop-blur-xl max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <Award className="w-6 h-6 text-[#c5a880]" />
                <span className="font-serif-luxury text-2xl text-white font-bold">25+ Years</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Dedicated to luxury luminaire engineering and bespoke specifier manufacturing.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-semibold block mb-2">
                {subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight leading-tight">
                {title}
              </h2>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                  <Shield className="w-4 h-4 text-[#c5a880]" />
                  <span>Optical Integrity</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Strict binning and high CRI &gt; 95 ensure flawless color rendering in every setting.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex items-center gap-2 text-white font-semibold text-sm mb-1">
                  <Zap className="w-4 h-4 text-[#c5a880]" />
                  <span>Thermal Efficiency</span>
                </div>
                <p className="text-xs text-neutral-400">
                  Precision CNC aluminum heatsinks guarantee 50,000+ hour continuous diode lifespan.
                </p>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-6">
              <Link
                to={btnLink}
                className="btn-gold px-7 py-3 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2"
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
