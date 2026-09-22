import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Eye, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';

const SPACES_DATA = [
  {
    id: 'double-height-villa',
    title: 'Double-Height Grand Villa',
    subtitle: 'High-Ceiling Monumental Illumination',
    location: 'Gurugram, NCR',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'hs-chandelier',
        x: 48, // percentage
        y: 28,
        name: 'NL-DH101 Grand Crystal Cascade',
        category: 'Double Height',
        categorySlug: 'double-height',
        price: '₹48,999',
        specs: 'K9 Precision Crystal • 3000K Warm • DALI-2 Driver',
        image: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=600&q=80',
        badge: 'Iconic Masterpiece',
      },
      {
        id: 'hs-wall-sconce',
        x: 18,
        y: 52,
        name: 'NL-WL101 Slim Linear LED Sconce',
        category: 'Wall Lamp',
        categorySlug: 'wall-lamp',
        price: '₹3,499',
        specs: 'Bi-Directional Grazer • Brushed Champagne Gold',
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80',
        badge: 'Architectural Grazer',
      },
      {
        id: 'hs-task-lamp',
        x: 76,
        y: 72,
        name: 'NL-TL101 Marble Base Task Lamp',
        category: 'Table Lamp',
        categorySlug: 'table-lamp',
        price: '₹4,299',
        specs: 'Solid Italian Marble • Touch Dimming Control',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
        badge: 'Sculptural Accent',
      },
    ],
  },
  {
    id: 'penthouse-dining',
    title: 'Bespoke Penthouse Dining',
    subtitle: 'Intimate Hospitality & Floating Suspensions',
    location: 'Worli, Mumbai',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'hs-pendant',
        x: 50,
        y: 35,
        name: 'NL-PL101 Fluted Glass Pendant',
        category: 'Pendant Lamp',
        categorySlug: 'pendant-lamp',
        price: '₹5,899',
        specs: 'Mouth-Blown Fluted Glass • Spun Brass Canopy',
        image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=600&q=80',
        badge: 'Bespoke Drop',
      },
      {
        id: 'hs-dining-table',
        x: 42,
        y: 68,
        name: 'NL-DT101 Cordless Table Accent',
        category: 'Dining Table Lamp',
        categorySlug: 'dining-table-lamp',
        price: '₹2,799',
        specs: 'Cordless Rechargeable • 2700K Warm Glare-Free',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
        badge: 'Cordless Luxury',
      },
    ],
  },
  {
    id: 'facade-terrace',
    title: 'Architectural Facade & Terrace',
    subtitle: 'IP65 Weatherproof Exterior Illumination',
    location: 'Goa Coastal Villa',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'hs-gate-lamp',
        x: 28,
        y: 58,
        name: 'NL-OD101 Heritage Gate Pillar Lantern',
        category: 'Outdoor Light',
        categorySlug: 'outdoor-light',
        price: '₹6,499',
        specs: 'Die-Cast Marine Aluminum • IP65 Weatherproof',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
        badge: 'IP65 Certified',
      },
      {
        id: 'hs-outdoor-wall',
        x: 74,
        y: 44,
        name: 'NL-OD102 Up-Down Facade Grazer',
        category: 'Outdoor Light',
        categorySlug: 'outdoor-light',
        price: '₹3,899',
        specs: 'Dual-Beam Wall Wash • Sealed Silicone Gasket',
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=600&q=80',
        badge: 'Facade Wash',
      },
    ],
  },
  {
    id: 'executive-lounge',
    title: 'Executive Suite & Reading Salon',
    subtitle: 'Freestanding Arcs & Mid-Century Modernism',
    location: 'Bengaluru Residence',
    image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=1800&q=85',
    hotspots: [
      {
        id: 'hs-floor-lamp',
        x: 32,
        y: 45,
        name: 'NL-FL101 Arched Brass Arc Floor Lamp',
        category: 'Floor Lamp',
        categorySlug: 'floor-lamp',
        price: '₹12,499',
        specs: 'Heavy Black Marble Counterweight • Telescopic Arc',
        image: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?auto=format&fit=crop&w=600&q=80',
        badge: 'Statuesque Arc',
      },
      {
        id: 'hs-filament',
        x: 65,
        y: 55,
        name: 'NL-FB101 Amber Spiral Filament Bulb',
        category: 'LED Filament Bulb',
        categorySlug: 'led-filament-bulb',
        price: '₹899',
        specs: '2200K Vintage Glow • E27 Base • 90% Energy Save',
        image: 'https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=600&q=80',
        badge: 'Amber Glow',
      },
    ],
  },
];

export const CuratedSpacesLookbook = ({ section }) => {
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const currentSpace = SPACES_DATA[activeSpaceIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#090a0d] text-white relative overflow-hidden border-t border-neutral-800 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-3">
              <Layers className="w-3.5 h-3.5 text-[#CC1F1F]" />
              <span className="text-[11px] uppercase font-mono tracking-widest text-neutral-300">
                Interactive Architectural Lookbook
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif-luxury tracking-tight text-white leading-tight">
              Spaces Brought to <span className="italic font-normal text-amber-200">Life</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-neutral-400 font-light">
              Explore real architectural spaces designed with NiceLamp fixtures.
              Tap the illuminated pulsing markers to reveal product specifications.
            </p>
          </div>

          {/* Spaces Navigation Tabs */}
          <div className="flex flex-wrap gap-2 bg-neutral-900/90 p-1.5 rounded-xl border border-neutral-800">
            {SPACES_DATA.map((space, idx) => (
              <button
                key={space.id}
                onClick={() => {
                  setActiveSpaceIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeSpaceIndex === idx
                    ? 'bg-[#CC1F1F] text-white shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{space.title.split(' ')[0]} {space.title.split(' ')[1]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════
            INTERACTIVE CANVAS WITH PULSING HOTSPOTS
        ════════════════════════════════════════════════════════ */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] border border-white/10 shadow-2xl bg-neutral-950">
          {/* Space Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSpace.id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              src={currentSpace.image}
              alt={currentSpace.title}
              className="w-full h-full object-cover object-center"
            />
          </AnimatePresence>

          {/* Vignette Overlay for Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

          {/* Space Title HUD overlay at bottom left */}
          <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300/90 block mb-1">
              Location: {currentSpace.location}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-luxury text-white font-medium">
              {currentSpace.title}
            </h3>
            <p className="text-xs text-neutral-300 font-light mt-0.5">
              {currentSpace.subtitle}
            </p>
          </div>

          {/* ── INTERACTIVE HOTSPOT PINS ── */}
          {currentSpace.hotspots.map((hs) => {
            const isActive = activeHotspot?.id === hs.id;
            return (
              <div
                key={hs.id}
                className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              >
                {/* Pulsing Beacon Trigger */}
                <button
                  type="button"
                  onClick={() => setActiveHotspot(isActive ? null : hs)}
                  onMouseEnter={() => setActiveHotspot(hs)}
                  className="relative group focus:outline-none p-3"
                  aria-label={`Inspect ${hs.name}`}
                >
                  {/* Outer animated ripple */}
                  <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping" />
                  
                  {/* Middle glow ring */}
                  <span className="absolute inset-1.5 rounded-full bg-[#CC1F1F]/40 group-hover:scale-125 transition-transform" />

                  {/* Inner luminous core pin */}
                  <span className={`relative flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all shadow-[0_0_20px_rgba(255,200,80,0.8)] ${
                    isActive 
                      ? 'bg-[#CC1F1F] border-white scale-110' 
                      : 'bg-white/95 border-[#CC1F1F] text-[#CC1F1F] group-hover:scale-110'
                  }`}>
                    <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#CC1F1F]'}`} />
                  </span>
                </button>

                {/* Floating Glassmorphic Tooltip Card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute z-40 w-72 sm:w-80 p-4 rounded-xl bg-neutral-900/95 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-left ${
                        hs.x > 50 ? 'right-0 sm:right-auto sm:-translate-x-3/4' : 'left-0 sm:left-auto sm:-translate-x-1/4'
                      } ${hs.y > 60 ? 'bottom-full mb-3' : 'top-full mt-3'}`}
                    >
                      {/* Card Header & Thumbnail */}
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={hs.image}
                          alt={hs.name}
                          className="w-16 h-16 rounded-lg object-cover border border-white/10 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="inline-block px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 text-[10px] font-mono mb-1">
                            {hs.badge}
                          </span>
                          <h4 className="text-sm font-semibold text-white truncate leading-tight">
                            {hs.name}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-0.5 font-mono">
                            {hs.category}
                          </p>
                        </div>
                      </div>

                      {/* Technical Specs bullet */}
                      <div className="text-[11px] text-neutral-300 bg-black/40 p-2.5 rounded-lg border border-white/5 mb-3 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hs.specs}</span>
                      </div>

                      {/* Price & Action Button */}
                      <div className="flex items-center justify-between pt-1 border-t border-white/10">
                        <div>
                          <span className="text-[10px] text-neutral-400 block font-mono">Catalog Price:</span>
                          <span className="text-sm font-bold text-white font-mono">{hs.price}</span>
                        </div>

                        <Link
                          to={`/category/${hs.categorySlug}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#CC1F1F] hover:bg-[#a31818] text-white text-xs font-medium tracking-wide transition-all shadow-md"
                        >
                          <span>Explore Category</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Quick Hotspot Selection Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="text-neutral-400 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#CC1F1F]" /> Featured Luminaires in Scene:
          </span>
          {currentSpace.hotspots.map((hs) => (
            <button
              key={hs.id}
              onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
              className={`px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-2 ${
                activeHotspot?.id === hs.id
                  ? 'bg-amber-400/20 border-amber-400 text-amber-200 shadow-sm'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#CC1F1F]" />
              <span>{hs.name}</span>
              <span className="text-neutral-400 font-mono">({hs.price})</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
