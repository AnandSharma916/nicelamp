import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Zap, Layers, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const About = () => {
  const { settings } = useSettings();

  useEffect(() => {
    document.title = `Company Profile & Craftsmanship | ${settings.companyName || 'LightHut'}`;
  }, [settings.companyName]);

  return (
    <div className="pt-24 pb-20 bg-[#090a0d] min-h-screen">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-luxury text-[#CC1F1F] font-semibold block mb-2">
            Company Profile & Philosophy
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold text-white tracking-tight">
            Architectural Illumination Engineered for Distinction
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 mt-4 leading-relaxed font-light">
            Founded with a passion for spatial elegance and optical precision, {settings.companyName || 'LightHut'} Decorative Solutions manufactures and supplies premier luminaires for high-profile architects, interior designers, and luxury developers worldwide.
          </p>
        </div>
      </div>

      {/* Main Philosophy & Imagery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80"
                alt="Optical Lighting Design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-luxury text-[#CC1F1F] font-semibold block">
              Pioneering Heritage
            </span>
            <h2 className="text-3xl font-serif-luxury font-bold text-white">
              Harmonizing Architectural Space with Human Emotion
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Lighting is more than mere visibility—it is the fifth dimension of architecture. At LightHut, every fixture is conceived at the intersection of mathematical optical physics and timeless material artistry.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Headquartered in Delhi, India, our manufacturing facility combines multi-axis CNC machining, electrostatic powder coating, hand-blown Murano-style glass blowing, and advanced cleanroom LED assembly. Every batch undergoes rigorous photometric analysis to ensure bin-to-bin chromatic consistency.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-white/10">
              <div>
                <span className="font-serif-luxury text-3xl font-bold text-[#CC1F1F] block">25+</span>
                <span className="text-xs text-neutral-400 mt-1 block">Years of Specialized Manufacturing</span>
              </div>
              <div>
                <span className="font-serif-luxury text-3xl font-bold text-[#CC1F1F] block">1,200+</span>
                <span className="text-xs text-neutral-400 mt-1 block">Luxury Residential & Commercial Installations</span>
              </div>
            </div>
          </div>
        </div>

        {/* Manufacturing Pillars */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-luxury text-[#CC1F1F] font-semibold block mb-2">
              Engineering Standards
            </span>
            <h2 className="text-3xl font-serif-luxury font-bold text-white">
              The Four Pillars of {settings.companyName || 'LightHut'} Luminaires
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#14171d] border border-white/10 shadow-xl space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#CC1F1F]" />
              <h3 className="font-serif-luxury text-base text-white font-bold">Museum-Grade CRI</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Color rendering index of Ra &gt; 95 ensures true vibrancy in marble veins, wood grain, fabrics, and fine artwork.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#14171d] border border-white/10 shadow-xl space-y-3">
              <Zap className="w-8 h-8 text-[#CC1F1F]" />
              <h3 className="font-serif-luxury text-base text-white font-bold">Active Thermal Cooling</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Aerospace 6063-T5 aluminum housings dissipate diode heat efficiently, preserving lumen maintenance beyond 50,000 hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#14171d] border border-white/10 shadow-xl space-y-3">
              <Layers className="w-8 h-8 text-[#CC1F1F]" />
              <h3 className="font-serif-luxury text-base text-white font-bold">Artisanal Finishes</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Electroplated brushed brass, gunmetal titanium, and weather-resistant AkzoNobel powder coats tested for anti-corrosion resilience.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#14171d] border border-white/10 shadow-xl space-y-3">
              <Sparkles className="w-8 h-8 text-[#CC1F1F]" />
              <h3 className="font-serif-luxury text-base text-white font-bold">Architectural Support</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Comprehensive DIALux photometric data, 3D CAD models, and technical spec sheets supplied for every fixture.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#181b22] to-[#111318] border border-[#CC1F1F]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left">
            <h3 className="text-2xl font-serif-luxury text-white font-bold">Ready to Specify for Your Next Project?</h3>
            <p className="text-xs text-neutral-400 mt-1">Speak directly with our technical lighting engineers.</p>
          </div>
          <Link
            to="/contact"
            className="btn-gold px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-luxury shrink-0"
          >
            Contact Engineering Team
          </Link>
        </div>
      </div>
    </div>
  );
};
