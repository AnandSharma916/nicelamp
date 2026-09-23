import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Layers,
  Sparkles,
  Sun,
  Flame,
  Compass,
  MessageCircle,
  CheckCircle2,
  Maximize2,
  Lightbulb,
} from 'lucide-react';
import { categoryService } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';
import { MASTER_CATEGORIES } from '../../data/catalogData';

export const Categories = () => {
  const { settings } = useSettings();
  const [categories, setCategories] = useState(MASTER_CATEGORIES);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = `Lighting Categories & Architectural Guide | ${settings.companyName || 'Luxury Lighting'}`;
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryService.getCategories();
        if (data.success && data.categories?.length > 0) {
          setCategories(data.categories);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [settings.companyName]);

  const whatsappNumber = (settings.whatsapp || '+919811000000').replace(/[^0-9]/g, '');

  const lightingLayers = [
    {
      layer: 'Layer 01',
      title: 'Ambient Lighting (The Foundation)',
      description:
        'General, overarching illumination that sets the warm baseline of a room. Chandeliers, monumental double-height cascades, and ceiling flush-mounts diffuse comfortable glow across living rooms and foyers.',
      fixtures: 'Chandeliers • Double-Height Pendants • Flush Mounts',
      colorTemp: '2700K – 3000K Golden Warm',
    },
    {
      layer: 'Layer 02',
      title: 'Task Lighting (Function & Precision)',
      description:
        'Focused, glare-free light directed toward activities like dining, cooking, reading, and grooming. Engineered with anti-glare louvers and mouth-blown fluted glass to eliminate optical strain.',
      fixtures: 'Dining Table Lamps • Island Pendants • Desk & Bedside Lamps',
      colorTemp: '3000K – 4000K Warm Neutral',
    },
    {
      layer: 'Layer 03',
      title: 'Accent Lighting (Drama & Depth)',
      description:
        'Draws attention to architectural features, artwork, fluted wall panels, and textured masonry. Bi-directional sconces and magnetic track lights create rich dimensional shadows.',
      fixtures: 'Wall Sconces • 48V Magnetic Track • Outdoor Facade Grazers',
      colorTemp: '2700K Warm White • Ra > 95',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#f8fafc] min-h-screen text-neutral-900">
      {/* ── HEADER BANNER ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-neutral-200 mb-12">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-[#DC2626] text-xs font-bold uppercase tracking-luxury">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architecture & Spatial Elevation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-neutral-900 tracking-tight">
            Lighting Collections by Application
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Explore our curated catalog of handcrafted chandeliers, sculptural pendants, bi-directional wall sconces, and weatherproof outdoor luminaires designed for luxury living.
          </p>
        </div>
      </div>

      {/* ── CATEGORIES GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-80 rounded-2xl bg-neutral-200 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={category._id || category.slug || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Link
                  to={`/category/${category.slug}`}
                  className="group relative block h-80 rounded-2xl overflow-hidden border border-neutral-200 hover:border-[#DC2626] transition-all duration-300 shadow-sm hover:shadow-xl"
                >
                  <img
                    src={category.image || 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80'}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-red-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {category.productsCount !== undefined && (
                        <span className="text-xs text-white font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                          {category.productsCount} {category.productsCount === 1 ? 'Fixture' : 'Fixtures'}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl font-serif-luxury text-white font-bold group-hover:text-red-400 transition-colors">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-xs text-neutral-200 mt-2 line-clamp-2 leading-relaxed">
                          {category.description}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-luxury text-red-400 group-hover:translate-x-1 transition-transform">
                        <span>Explore Collection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── SECTION 2: ARCHITECTURAL LIGHTING DESIGN GUIDE ── */}
      <section className="mt-24 pt-20 border-t border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block">
              Design Science
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-neutral-900">
              The 3 Essential Layers of Architectural Lighting
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              A beautifully lit home is rarely illuminated by a single fixture. By layering Ambient, Task, and Accent lighting, you achieve balanced depth and visual comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {lightingLayers.map((layer, idx) => (
              <div
                key={idx}
                className="bg-[#f8fafc] p-8 rounded-2xl border border-neutral-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#DC2626]/50 transition-colors"
              >
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#DC2626] block mb-2">
                    {layer.layer}
                  </span>
                  <h3 className="font-serif-luxury text-lg font-bold text-neutral-900 mb-2">
                    {layer.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {layer.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/80 space-y-2 text-[11px] font-mono text-neutral-600">
                  <div className="flex items-center gap-1.5 text-neutral-800 font-semibold">
                    <Lightbulb className="w-3.5 h-3.5 text-[#DC2626]" />
                    <span>{layer.fixtures}</span>
                  </div>
                  <div className="text-[#DC2626] font-medium">
                    Recommended: {layer.colorTemp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Rules of Thumb Card */}
          <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 mb-16">
            <div className="max-w-3xl space-y-4">
              <span className="text-xs uppercase tracking-luxury text-red-400 font-bold block">
                Architectural Cheat Sheet
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-white">
                Key Sizing Rules For Ceilings & Tables
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-xs text-neutral-300">
                <div className="space-y-1.5 p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-bold text-white block text-sm">Dining Table Drop</span>
                  <p className="leading-relaxed">Hang the bottom of pendant lamps 30 to 36 inches above the dining tabletop for unobstructed eye contact.</p>
                </div>
                <div className="space-y-1.5 p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-bold text-white block text-sm">Double-Height Foyers</span>
                  <p className="leading-relaxed">Allow at least 8 to 9 feet of clearance beneath the lowest crystal drop, centering the fixture in the volume.</p>
                </div>
                <div className="space-y-1.5 p-4 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-bold text-white block text-sm">Wall Sconce Height</span>
                  <p className="leading-relaxed">Mount hallway sconces at 60 to 66 inches from the floor to eye level to prevent direct bulb glare.</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Scale Consultation Banner */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#f8fafc] border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <h4 className="font-serif-luxury text-xl font-bold text-neutral-900">
                Need Help Calculating Dimensions For Your Space?
              </h4>
              <p className="text-xs text-neutral-600 mt-1">
                Send your room dimensions to our architectural team for a free luminaire scale match.
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'Hi team, I would like assistance choosing the right luminaire size and category for my home.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-luxury inline-flex items-center gap-2 shrink-0 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask a Specialist</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
