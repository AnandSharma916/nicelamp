import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  MapPin,
  Sparkles,
  Lightbulb,
  Sun,
  Trees,
  Building2,
  Zap,
  Flame,
  Utensils,
  Layers,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Comprehensive Architectural Projects Representing ALL Lamp Types
───────────────────────────────────────────────────────────── */
const ALL_LAMP_PROJECTS = [
  {
    id: 'proj-chandelier',
    title: 'Meridian Grand Atrium & Lobby',
    location: 'Mumbai, India',
    category: 'hospitality',
    categoryLabel: '5-Star Hospitality',
    lampType: 'chandelier',
    lampTypeLabel: 'Chandelier',
    lampIcon: '✨',
    image: '/categories/chandelier.jpg',
    fixtureCode: 'LH-CH880 Royal Waterfall',
    description: 'Cascading Murano-inspired crystal prisms commanding a 28ft double-height central atrium, engineered with motorized winch suspension and circadian 3000K warm illumination.',
    specs: '28ft Ceiling Drop • Up to 6m Suspension • K9 Murano Prisms',
  },
  {
    id: 'proj-wall-lamp',
    title: 'The Oberoi Presidential Suites',
    location: 'New Delhi, India',
    category: 'residential',
    categoryLabel: 'Ultra-Luxury Suite',
    lampType: 'wall-lamp',
    lampTypeLabel: 'Wall Lamp & Sconces',
    lampIcon: '💡',
    image: '/categories/wall-lamp.jpg',
    fixtureCode: 'LH-6031W Brushed Gold Sconce',
    description: 'Bi-directional wall grazers & fluted opal glass sconces delivering soft, anti-glare ambient warmth along master bedroom alcoves and private corridors.',
    specs: 'Ra > 95 CRI • 2700K Warm Twilight • Dual-Emission Beam',
  },
  {
    id: 'proj-pendant-lamp',
    title: 'Artisan Culinary & Dining Pavilion',
    location: 'Jaipur, India',
    category: 'hospitality',
    categoryLabel: 'Fine Dining Restaurant',
    lampType: 'pendant-lamp',
    lampTypeLabel: 'Pendant Lamp',
    lampIcon: '🔆',
    image: '/categories/pendant-lamp.jpg',
    fixtureCode: 'LH-P124 Smoked Fluted Glass',
    description: 'Mouth-blown fluted glass cluster pendants providing warm, intimate focal pools of light over solid walnut dining tables with anti-flicker dimming.',
    specs: 'Dim-to-Warm 2200K-3000K • Mouth-Blown Borosilicate',
  },
  {
    id: 'proj-outdoor-light',
    title: 'Horizon Corporate Campus & Facade',
    location: 'Bengaluru, India',
    category: 'commercial',
    categoryLabel: 'Corporate Headquarters',
    lampType: 'outdoor-light',
    lampTypeLabel: 'Outdoor & Facade',
    lampIcon: '🌿',
    image: '/categories/outdoor-light.jpg',
    fixtureCode: 'LH-OD501 Dark-Sky Facade Grazer',
    description: 'IP65 marine-grade architectural facade grazers highlighting textured fluted stone panels without upward light pollution, tested against severe monsoon downpours.',
    specs: 'IP65 / IK08 • Marine Aluminum • Dark-Sky Compliant Optics',
  },
  {
    id: 'proj-double-height',
    title: 'Solitaire Sky-Villa Grand Atrium',
    location: 'Gurugram, India',
    category: 'residential',
    categoryLabel: 'Duplex Penthouse',
    lampType: 'double-height',
    lampTypeLabel: 'Double Height Luminaire',
    lampIcon: '🏛️',
    image: '/categories/double-height.jpg',
    fixtureCode: 'LH-DH901 Grand Helical Cascade',
    description: 'Monumental cascading spiral drop installation engineered with reinforced aircraft-grade steel cables for a 24ft double-height living foyer and floating staircase.',
    specs: '24ft Duplex Volume • Multi-Zone DALI-2 • 12,000 lm',
  },
  {
    id: 'proj-magnetic-track',
    title: 'The Amanora Architectural Villa',
    location: 'New Delhi, India',
    category: 'residential',
    categoryLabel: 'Private Estate',
    lampType: 'magnetic-track',
    lampTypeLabel: '48V Magnetic Track',
    lampIcon: '⚡',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    fixtureCode: 'LH-TR48 Recessed Low-Voltage System',
    description: 'Recessed low-voltage magnetic rails with tool-free modular spotlights and wall wash optics casting clean accent lighting across contemporary art galleries.',
    specs: 'Ultra Low Glare UGR < 13 • 48V Safe • Modular Snap-in',
  },
  {
    id: 'proj-table-floor',
    title: 'Penthouse Library & Private Salon',
    location: 'Kolkata, India',
    category: 'residential',
    categoryLabel: 'Executive Residence',
    lampType: 'table-floor',
    lampTypeLabel: 'Table & Floor Lamp',
    lampIcon: '🪔',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    fixtureCode: 'LH-T2309 Marble & Brass Arc',
    description: 'Sculptural solid Italian Carrara marble base task lamps and arched brushed brass floor luminaires delivering gentle reading light for executive study suites.',
    specs: 'Carrara Marble Base • 3-Stage Touch Dimming • High CRI',
  },
  {
    id: 'proj-dining-lamp',
    title: 'Viceroy Waterfront Executive Lounge',
    location: 'Goa, India',
    category: 'hospitality',
    categoryLabel: 'Luxury Resort',
    lampType: 'dining-lamp',
    lampTypeLabel: 'Dining Table Luminaire',
    lampIcon: '🍽️',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
    fixtureCode: 'LH-DL204 Linear Suspended Bar',
    description: 'Minimalist brushed bronze linear suspension fixture with precision honeycomb anti-glare louvers illuminating waterfront executive dining tables.',
    specs: 'Honeycomb Anti-Glare • Dim-to-Warm • Brushed Bronze',
  },
];

export const ProjectsSection = ({ section }) => {
  const [activeTab, setActiveTab] = useState('all');

  const title = section?.title || 'Architectural Lighting In Practice';
  const subtitle = section?.subtitle || 'Global Portfolios & Installed Excellence';
  const description =
    section?.description ||
    'From luxury seaside villas to prestigious hotel atriums, discover how our luminaires transform spatial aesthetics into immersive environments.';
  const btnText = section?.buttonText || 'View Complete Portfolio';
  const btnLink = section?.buttonLink || '/projects';

  const projects = ALL_LAMP_PROJECTS;

  const filteredProjects =
    activeTab === 'all'
      ? projects
      : projects.filter(
          (p) =>
            p.lampType === activeTab ||
            (p.category || '').toLowerCase() === activeTab
        );

  const filterTabs = [
    { id: 'all', label: 'All Lamp Types', count: projects.length },
    { id: 'chandelier', label: 'Chandeliers' },
    { id: 'wall-lamp', label: 'Wall Lamps' },
    { id: 'pendant-lamp', label: 'Pendants' },
    { id: 'double-height', label: 'Double Height' },
    { id: 'dining-table-lamp', label: 'Dining Lamps' },
    { id: 'outdoor-light', label: 'Outdoor Lights' },
    { id: 'table-floor', label: 'Table & Floor' },
    { id: 'spares', label: 'Bulbs & Spares' },
  ];

  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden border-t border-neutral-200">
      {/* Ambient background lighting glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#DC2626]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block mb-2">
              {subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-neutral-900 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed font-light">
              {description}
            </p>
          </div>

          <Link
            to={btnLink}
            className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-luxury shrink-0 shadow-md hover:shadow-lg transition-all"
          >
            <span>{btnText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── Lamp Types Filter Bar (Scrollable on mobile) ── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-luxury whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-neutral-900 bg-white border border-neutral-300 shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 bg-neutral-100 border border-neutral-200 hover:bg-neutral-200/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-active-tab-pill"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#DC2626]/15 to-transparent pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700">
                      {tab.count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Projects Showcase Cards (Representing ALL Lamp Types) ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, 3).map((project, idx) => (
              <motion.div
                key={project.id || project.title || idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-[#DC2626] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Top-Left: Project Context Badge */}
                  <span className="absolute top-3.5 left-3.5 text-[10px] uppercase tracking-luxury text-red-200 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-semibold">
                    {project.categoryLabel}
                  </span>

                  {/* Top-Right: Lamp Type Badge */}
                  <span className="absolute top-3.5 right-3.5 text-[10.5px] text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15 font-medium flex items-center gap-1.5 shadow-md">
                    <span>{project.lampIcon}</span>
                    <span className="tracking-wide">{project.lampTypeLabel}</span>
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
                      <span>{project.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-luxury text-lg sm:text-xl text-neutral-900 font-bold group-hover:text-[#DC2626] transition-colors mb-2 leading-snug">
                      {project.title}
                    </h3>

                    {/* Installed Fixture Callout */}
                    {project.fixtureCode && (
                      <div className="mb-3 inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-700 bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                        <span>Fixture: {project.fixtureCode}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Footer: Specs & Inspection Link */}
                  <div className="mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[10.5px] font-mono text-neutral-500 truncate max-w-[200px]">
                      {project.specs}
                    </span>

                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-1 text-xs uppercase tracking-luxury text-[#DC2626] group-hover:text-neutral-900 transition-colors font-bold shrink-0"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom Section CTA ── */}
        <div className="mt-14 text-center">
          <Link
            to={btnLink}
            className="btn-outline-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury"
          >
            <span>{btnText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
