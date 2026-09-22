import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Zap, Layers, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const About = () => {
  const { settings } = useSettings();

  useEffect(() => {
    document.title = `About Us & Craftsmanship | ${settings.companyName || 'NiceLamp'}`;
  }, [settings.companyName]);

  return (
    <div className="pt-24 pb-20 bg-[#0b0f17] min-h-screen">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10 mb-16">
        <div className="max-w-3xl">
          <span className="text-xs uppercase tracking-luxury text-[#D4AF37] font-semibold block mb-2">
            About NiceLamp
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif-luxury font-bold text-white tracking-tight">
            Illuminating Beautiful Homes Across India
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 mt-4 leading-relaxed font-light">
            At {settings.companyName || 'NiceLamp'}, we design and craft timeless lamps and lighting fixtures that bring warmth, character, and elegance to every living space.
          </p>
        </div>
      </div>

      {/* Main Story & Imagery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80"
                alt="NiceLamp Handcrafted Lighting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-luxury text-[#D4AF37] font-semibold block">
              Our Passion
            </span>
            <h2 className="text-3xl font-serif-luxury font-bold text-white">
              Light That Makes Every Room Feel Like Home
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              We believe great lighting transforms everyday moments. From a warm golden glow beside your bedside to a statement chandelier above your dining table, our lamps are made to inspire comfort and beauty.
            </p>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Based in Delhi, India, our team combines handcrafted metalwork, hand-blown fluted glass, and durable finishes. Every lamp is carefully tested before dispatch to guarantee lasting quality and reliable performance in your home.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 border-t border-white/10">
              <div>
                <span className="font-serif-luxury text-3xl font-bold text-[#D4AF37] block">10,000+</span>
                <span className="text-xs text-neutral-400 mt-1 block">Happy Homes Illuminated</span>
              </div>
              <div>
                <span className="font-serif-luxury text-3xl font-bold text-[#D4AF37] block">100%</span>
                <span className="text-xs text-neutral-400 mt-1 block">Quality Guaranteed & Safe Transit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Highlights */}
        <div className="pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-luxury text-[#D4AF37] font-semibold block mb-2">
              Why NiceLamp
            </span>
            <h2 className="text-3xl font-serif-luxury font-bold text-white">
              Crafted With Care, Built For Living
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#141b27] border border-white/10 shadow-xl space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif-luxury text-base text-white font-bold">Premium Quality</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Hand-inspected solid brass, matte powder-coated metals, and crystal-clear tempered glass built to last.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141b27] border border-white/10 shadow-xl space-y-3">
              <Zap className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif-luxury text-base text-white font-bold">Energy Efficient</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Warm and gentle illumination engineered with low-power LEDs that save energy while giving off a cozy glow.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141b27] border border-white/10 shadow-xl space-y-3">
              <Layers className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif-luxury text-base text-white font-bold">Artisanal Finishes</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Warm champagne gold, brushed brass, and sleek matte black that complement modern interior aesthetics.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#141b27] border border-white/10 shadow-xl space-y-3">
              <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              <h3 className="font-serif-luxury text-base text-white font-bold">Pan-India Support</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Safe doorstep wooden crate packaging, quick delivery across India, and dedicated customer assistance.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-[#161e2c] to-[#0f141f] border border-[#D4AF37]/30 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left">
            <h3 className="text-2xl font-serif-luxury text-white font-bold">Need Help Choosing the Right Lamp?</h3>
            <p className="text-xs text-neutral-400 mt-1">Chat directly with our lighting experts on WhatsApp.</p>
          </div>
          <a
            href={`https://wa.me/${(settings.whatsapp || '919811000000').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi NiceLamp team, I need help selecting lamps for my home.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-luxury shrink-0 inline-flex items-center gap-2"
          >
            Chat on WhatsApp <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
