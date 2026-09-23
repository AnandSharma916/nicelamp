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
    <section className="py-24 sm:py-32 bg-white text-neutral-900 relative overflow-hidden border-t border-neutral-200 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 mb-3">
              <Layers className="w-3.5 h-3.5 text-[#DC2626]" />
              <span className="text-[11px] uppercase font-mono tracking-widest text-[#DC2626] font-bold">
                Interactive Lookbook
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-serif-luxury tracking-tight text-neutral-900 leading-tight">
              Spaces Brought to <span className="italic font-normal text-[#DC2626]">Warmth</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-neutral-600 font-light">
              Explore beautifully illuminated real spaces. Tap the glowing markers to view lamp details and pricing.
            </p>
          </div>

          {/* Spaces Navigation Tabs */}
          <div className="flex flex-wrap gap-2 bg-neutral-100 p-1.5 rounded-xl border border-neutral-200">
            {SPACES_DATA.map((space, idx) => (
              <button
                key={space.id}
                onClick={() => {
                  setActiveSpaceIndex(idx);
                  setActiveHotspot(null);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                  activeSpaceIndex === idx
                    ? 'bg-[#DC2626] text-white shadow-md font-bold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/70'
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
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] border border-neutral-200 shadow-2xl bg-neutral-100">
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

          {/* Space Details Tag */}
          <div className="absolute top-4 left-4 z-20 pointer-events-none">
            <div className="bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-neutral-200 shadow-md">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#DC2626] font-bold block">
                {currentSpace.subtitle}
              </span>
              <span className="text-sm font-serif-luxury font-bold text-neutral-900 block">
                {currentSpace.title} — {currentSpace.location}
              </span>
            </div>
          </div>

          {/* Interactive Pulsing Hotspots */}
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
                  <span className="absolute inset-0 rounded-full bg-[#DC2626]/30 animate-ping" />
                  
                  {/* Middle glow ring */}
                  <span className="absolute inset-1.5 rounded-full bg-[#DC2626]/40 group-hover:scale-125 transition-transform" />

                  {/* Inner luminous core pin */}
                  <span className={`relative flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all shadow-[0_0_16px_rgba(220,38,38,0.8)] ${
                    isActive 
                      ? 'bg-[#DC2626] border-white scale-110' 
                      : 'bg-white border-[#DC2626] text-neutral-900 group-hover:scale-110'
                  }`}>
                    <Sparkles className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#DC2626]'}`} />
                  </span>
                </button>

                {/* Floating Tooltip Card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute z-40 w-72 sm:w-80 p-4 rounded-2xl bg-white/98 backdrop-blur-xl border border-neutral-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-left ${
                        hs.x > 50 ? 'right-0 sm:right-auto sm:-translate-x-3/4' : 'left-0 sm:left-auto sm:-translate-x-1/4'
                      } ${hs.y > 60 ? 'bottom-full mb-3' : 'top-full mt-3'}`}
                    >
                      {/* Card Header & Thumbnail */}
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={hs.image}
                          alt={hs.name}
                          className="w-16 h-16 rounded-xl object-cover border border-neutral-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-red-50 text-[#DC2626] border border-red-200 text-[10px] font-semibold mb-1">
                            {hs.badge}
                          </span>
                          <h4 className="text-sm font-bold text-neutral-900 truncate leading-tight">
                            {hs.name}
                          </h4>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {hs.category}
                          </p>
                        </div>
                      </div>

                      {/* Specs bullet */}
                      <div className="text-[11px] text-neutral-600 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 mb-3 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#DC2626] shrink-0 mt-0.5" />
                        <span>{hs.specs}</span>
                      </div>

                      {/* Price & Action Button */}
                      <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
                        <div>
                          <span className="text-[10px] text-neutral-500 block">Catalog Price:</span>
                          <span className="text-sm font-bold text-neutral-900">{hs.price}</span>
                        </div>

                        <Link
                          to={`/category/${hs.categorySlug}`}
                          className="btn-gold inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all shadow-sm"
                        >
                          <span>View Category</span>
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
          <span className="text-neutral-500 font-mono text-[11px] uppercase tracking-wider flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-[#DC2626]" /> Featured Lights in Scene:
          </span>
          {currentSpace.hotspots.map((hs) => (
            <button
              key={hs.id}
              onClick={() => setActiveHotspot(activeHotspot?.id === hs.id ? null : hs)}
              className={`px-3 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-2 ${
                activeHotspot?.id === hs.id
                  ? 'bg-red-50 border-[#DC2626] text-[#DC2626] shadow-sm font-semibold'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
              <span>{hs.name}</span>
              <span className="text-neutral-500 font-mono">({hs.price})</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
