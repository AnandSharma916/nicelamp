import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    document.title = 'Architectural Lighting Projects & Installations | LightHut';
  }, []);

  const projects = [
    {
      id: 1,
      title: 'The Amanora Residence',
      location: 'New Delhi, India',
      category: 'residential',
      categoryLabel: 'Luxury Villa',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: 'A 14,000 sq ft private estate illuminated by recessed 48V magnetic tracks, brushed gold acrylic wall sconces (LH-6031W), and seamless perimeter coves creating tranquil warmth.',
      fixtures: ['LH-6031W', 'LH-TR48', 'LH-3303-1W'],
    },
    {
      id: 2,
      title: 'Meridian Grand Hotel & Atrium',
      location: 'Mumbai, India',
      category: 'hospitality',
      categoryLabel: 'Hospitality',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=80',
      description: 'Theatrical 7-meter cascading Murano-inspired art glass pendants commanding the central atrium with dim-to-warm lighting controls across five levels.',
      fixtures: ['LH-2036', 'LH-6036', 'LH-G062-1L'],
    },
    {
      id: 3,
      title: 'Horizon Business Pavilion',
      location: 'Bengaluru, India',
      category: 'commercial',
      categoryLabel: 'Corporate Headquarters',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      description: 'IP65 dark-sky compliant bi-directional facade grazers (LH-OD501) grazing concrete geometric louvers with zero upward light pollution.',
      fixtures: ['LH-OD501', 'LH-TR48'],
    },
    {
      id: 4,
      title: 'Solitaire Penthouse Suite',
      location: 'Gurugram, India',
      category: 'residential',
      categoryLabel: 'Penthouse',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      description: 'Sculptural solid walnut task lamps and fluted satin brass bedside luminaires installed throughout master dressing suites and private libraries.',
      fixtures: ['LH-T2309', 'LH-B6002W'],
    },
    {
      id: 5,
      title: 'Viceroy Waterfront Resort',
      location: 'Goa, India',
      category: 'hospitality',
      categoryLabel: 'Luxury Resort',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
      description: 'Marine-grade anti-corrosion luminaires illuminating coastal pool decks, private beachfront pavilions, and open-air dining cabanas.',
      fixtures: ['LH-OD501', 'LH-3303-1W'],
    },
    {
      id: 6,
      title: 'Artisan Culinary Pavilion',
      location: 'Jaipur, India',
      category: 'commercial',
      categoryLabel: 'Fine Dining Restaurant',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1200&q=80',
      description: 'Intimate dining illumination utilizing smoked glass pendant clusters (LH-G074A) providing glare-free warmth on artisanal dining tables.',
      fixtures: ['LH-G074A', 'LH-SD102W'],
    },
  ];

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-24 pb-20 bg-[#090a0d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-semibold block mb-2">
              Installed Excellence
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
              Architectural Projects
            </h1>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Inspect real-world luminaire installations across premier hospitality, luxury residential, and landmark commercial spaces.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#14171d] p-1.5 rounded-xl border border-white/10 shrink-0">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'residential', label: 'Residential' },
              { id: 'hospitality', label: 'Hospitality' },
              { id: 'commercial', label: 'Commercial' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-luxury transition-all ${
                  activeFilter === tab.id
                    ? 'bg-[#c5a880] text-black shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group rounded-2xl overflow-hidden bg-[#14171d] border border-white/10 hover:border-[#c5a880]/50 transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#14171d] via-[#14171d]/20 to-transparent" />
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-semibold">
                        {project.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-300 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                      <span>{project.location}</span>
                    </div>

                    <h3 className="font-serif-luxury text-xl text-white font-bold group-hover:text-[#c5a880] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] uppercase tracking-luxury text-neutral-500 font-semibold">
                      Specified:
                    </span>
                    {project.fixtures.map((sku) => (
                      <span
                        key={sku}
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 text-[#c5a880] border border-white/5"
                      >
                        {sku}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/catalog"
                    className="text-xs font-semibold uppercase tracking-luxury text-[#c5a880] hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <span>View Fixtures</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
