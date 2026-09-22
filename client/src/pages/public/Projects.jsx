import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';

export const Projects = () => {
  const { settings } = useSettings();
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    document.title = `Lighting Projects & Installations | ${settings.companyName || 'NiceLamp'}`;
  }, [settings.companyName]);

  const projects = [
    {
      id: 1,
      title: 'Meridian Grand Hotel & Atrium',
      location: 'Mumbai, India',
      category: 'hospitality',
      categoryLabel: 'Hospitality',
      lampType: 'Chandelier',
      lampIcon: '✨',
      year: '2025',
      image: '/categories/chandelier.jpg',
      description: 'Theatrical 7-meter cascading Murano-inspired art glass pendants commanding the central atrium with dim-to-warm lighting controls across five levels.',
      fixtures: ['LH-CH880', 'LH-2036', 'LH-6036'],
    },
    {
      id: 2,
      title: 'The Oberoi Presidential Suites',
      location: 'New Delhi, India',
      category: 'residential',
      categoryLabel: 'Ultra-Luxury Villa',
      lampType: 'Wall Lamp',
      lampIcon: '💡',
      year: '2025',
      image: '/categories/wall-lamp.jpg',
      description: 'Bi-directional wall grazers & fluted opal glass bedside sconces delivering soft glare-free indirect warmth throughout master suites and corridors.',
      fixtures: ['LH-6031W', 'LH-3303-1W'],
    },
    {
      id: 3,
      title: 'Artisan Culinary Pavilion',
      location: 'Jaipur, India',
      category: 'commercial',
      categoryLabel: 'Fine Dining Restaurant',
      lampType: 'Pendant Lamp',
      lampIcon: '🔆',
      year: '2024',
      image: '/categories/pendant-lamp.jpg',
      description: 'Intimate dining illumination utilizing smoked glass pendant clusters providing glare-free warmth on artisanal solid walnut tables.',
      fixtures: ['LH-P124', 'LH-G074A', 'LH-SD102W'],
    },
    {
      id: 4,
      title: 'Horizon Business Pavilion & Facade',
      location: 'Bengaluru, India',
      category: 'commercial',
      categoryLabel: 'Corporate Headquarters',
      lampType: 'Outdoor & Facade',
      lampIcon: '🌿',
      year: '2025',
      image: '/categories/outdoor-light.jpg',
      description: 'IP65 dark-sky compliant bi-directional facade grazers grazing concrete geometric louvers with zero upward light pollution.',
      fixtures: ['LH-OD501', 'LH-TR48'],
    },
    {
      id: 5,
      title: 'Solitaire Sky-Villa Grand Atrium',
      location: 'Gurugram, India',
      category: 'residential',
      categoryLabel: 'Duplex Penthouse',
      lampType: 'Double Height',
      lampIcon: '🏛️',
      year: '2025',
      image: '/categories/double-height.jpg',
      description: 'Monumental multi-tier cascading drop installation engineered specifically for a 24ft double-height living foyer and floating spiral staircase.',
      fixtures: ['LH-DH901', 'LH-2036'],
    },
    {
      id: 6,
      title: 'The Amanora Architectural Residence',
      location: 'New Delhi, India',
      category: 'residential',
      categoryLabel: 'Private Estate',
      lampType: 'Magnetic Track',
      lampIcon: '⚡',
      year: '2025',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      description: 'A 14,000 sq ft private estate illuminated by recessed 48V magnetic tracks, brushed gold acrylic wall sconces, and seamless perimeter coves.',
      fixtures: ['LH-TR48', 'LH-6031W'],
    },
    {
      id: 7,
      title: 'Solitaire Private Library & Salon',
      location: 'Kolkata, India',
      category: 'residential',
      categoryLabel: 'Executive Residence',
      lampType: 'Table & Floor',
      lampIcon: '🪔',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80',
      description: 'Sculptural solid Italian marble base task lamps and arched brass floor luminaires installed throughout master dressing suites and private study.',
      fixtures: ['LH-T2309', 'LH-B6002W'],
    },
    {
      id: 8,
      title: 'Viceroy Waterfront Executive Lounge',
      location: 'Goa, India',
      category: 'hospitality',
      categoryLabel: 'Luxury Resort',
      lampType: 'Dining Luminaire',
      lampIcon: '🍽️',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
      description: 'Minimalist brushed bronze linear dining fixture with precision optical louvers and touch-dimmable warm CCT overlooking coastal waters.',
      fixtures: ['LH-DL204', 'LH-OD501'],
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
            <span className="text-xs uppercase tracking-luxury text-[#D4AF37] font-semibold block mb-2">
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
                    ? 'bg-[#D4AF37] text-black shadow'
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
                className="group rounded-2xl overflow-hidden bg-[#14171d] border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-500 shadow-xl flex flex-col justify-between"
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
                      <span className="text-[10px] uppercase tracking-luxury text-[#D4AF37] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-semibold">
                        {project.categoryLabel}
                      </span>
                      {project.lampType && (
                        <span className="text-[10.5px] text-white bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 font-medium flex items-center gap-1 shadow-md">
                          <span>{project.lampIcon}</span>
                          <span>{project.lampType}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{project.location}</span>
                    </div>

                    <h3 className="font-serif-luxury text-xl text-white font-bold group-hover:text-[#D4AF37] transition-colors">
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
                        className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-white/5 text-[#D4AF37] border border-white/5"
                      >
                        {sku}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/catalog"
                    className="text-xs font-semibold uppercase tracking-luxury text-[#D4AF37] hover:text-white flex items-center gap-1 transition-colors"
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
