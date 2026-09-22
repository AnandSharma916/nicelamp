import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  Sparkles, 
  Sliders, 
  Eye, 
  Compass, 
  ShieldCheck, 
  ArrowRight,
  Maximize2,
  RefreshCw
} from 'lucide-react';

// Preset lighting moods
const LIGHTING_PRESETS = [
  {
    id: 'intimate-lounge',
    name: 'Evening Soirée',
    kelvin: 2200,
    brightness: 45,
    tag: 'Hospitality & Intimacy',
    description: 'Amber warmth simulating candlelight. Calms circadian rhythms and enriches wood and leather textures.',
    color: '#ff9838',
    glowColor: 'rgba(255, 152, 56, 0.45)',
    recommendedCategory: 'chandelier',
    recommendedFixture: 'NL-CH101 Ring Chandelier with Dim-to-Warm E14',
  },
  {
    id: 'luxury-living',
    name: 'Champagne Residence',
    kelvin: 2700,
    brightness: 70,
    tag: 'Residential Living',
    description: 'The golden standard of luxury interior design. Soft, flattering illumination for living rooms and salons.',
    color: '#ffbe6b',
    glowColor: 'rgba(255, 190, 107, 0.55)',
    recommendedCategory: 'wall-lamp',
    recommendedFixture: 'NL-WL101 Slim Linear LED Bi-Directional Sconce',
  },
  {
    id: 'architectural-gallery',
    name: 'Museum & Gallery',
    kelvin: 3000,
    brightness: 85,
    tag: 'True Color Fidelity',
    description: 'Crisp architectural warm-neutral with Ra > 98 fidelity. Perfect for highlighting artwork and marble veining.',
    color: '#ffe5b4',
    glowColor: 'rgba(255, 229, 180, 0.65)',
    recommendedCategory: 'pendant-lamp',
    recommendedFixture: 'NL-PL101 Architectural Glass Suspended Pendant',
  },
  {
    id: 'modern-focus',
    name: 'Modern Precision',
    kelvin: 4000,
    brightness: 100,
    tag: 'High Visual Acuity',
    description: 'Natural neutral white promoting clarity and cognitive focus for executive home offices and kitchen prep.',
    color: '#f0f5ff',
    glowColor: 'rgba(240, 245, 255, 0.75)',
    recommendedCategory: 'double-height',
    recommendedFixture: 'NL-DH101 Grand Cascade High-Output Luminaire',
  },
];

// Room environments to switch between
const ROOM_SCENES = [
  {
    id: 'living-room',
    name: 'Luxury Salon',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    lightOrigin: { x: '50%', y: '32%' },
    fixtures: ['Suspended Ring Chandelier', 'Perimeter LED Grazers', 'Marble Table Lamp'],
  },
  {
    id: 'dining-hall',
    name: 'Private Dining Atrium',
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1400&q=85',
    lightOrigin: { x: '50%', y: '28%' },
    fixtures: ['Double Cascade Pendants', 'Concealed Cove Lighting'],
  },
  {
    id: 'master-bedroom',
    name: 'Executive Suite',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1400&q=85',
    lightOrigin: { x: '52%', y: '38%' },
    fixtures: ['Bedside Fluted Sconces', 'Arc Floor Luminaire'],
  },
];

export const LightingMoodStudio = ({ section }) => {
  const [activePreset, setActivePreset] = useState(LIGHTING_PRESETS[1]);
  const [kelvin, setKelvin] = useState(2700);
  const [brightness, setBrightness] = useState(70);
  const [activeRoom, setActiveRoom] = useState(ROOM_SCENES[0]);

  // Calculate dynamic color from Kelvin
  const currentColor = useMemo(() => {
    // Map kelvin (1800K - 5000K) to hex color
    if (kelvin < 2400) return '#ff8822';
    if (kelvin < 2800) return '#ffad5a';
    if (kelvin < 3200) return '#ffd28e';
    if (kelvin < 3800) return '#ffebd0';
    if (kelvin < 4500) return '#f4f7ff';
    return '#e6f0ff';
  }, [kelvin]);

  const currentGlowRgba = useMemo(() => {
    const alpha = (brightness / 100) * 0.75;
    if (kelvin < 2400) return `rgba(255, 136, 34, ${alpha})`;
    if (kelvin < 2800) return `rgba(255, 173, 90, ${alpha})`;
    if (kelvin < 3200) return `rgba(255, 210, 142, ${alpha})`;
    if (kelvin < 3800) return `rgba(255, 235, 208, ${alpha})`;
    return `rgba(230, 240, 255, ${alpha})`;
  }, [kelvin, brightness]);

  // Calculated approximate Lux
  const calculatedLux = Math.round((brightness / 100) * 850 + 120);

  const applyPreset = (preset) => {
    setActivePreset(preset);
    setKelvin(preset.kelvin);
    setBrightness(preset.brightness);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#08090b] text-white relative overflow-hidden border-t border-neutral-900 select-none">
      {/* Dynamic ambient background diffusion matching active lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-25"
        style={{ backgroundColor: currentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#CC1F1F]" />
            <span className="text-[11px] uppercase font-mono tracking-widest text-neutral-300">
              Interactive Lumens & Kelvin Studio
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white font-serif-luxury leading-tight">
            The Architecture of <span className="italic font-normal text-amber-200/90">Illumination</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Light is not merely visibility — it is atmosphere, emotion, and sculptural depth.
            Control color temperature and luminous flux in real-time to witness the spatial transformation.
          </p>
        </div>

        {/* ════════════════════════════════════════════════════════
            INTERACTIVE STUDIO STAGE
        ════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Dynamic Room Visualizer Canvas (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Room Scene Tabs */}
            <div className="flex items-center justify-between px-2">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#CC1F1F]" /> Environment:
              </span>
              <div className="flex items-center gap-1.5 bg-neutral-900/80 p-1 rounded-lg border border-neutral-800">
                {ROOM_SCENES.map((scene) => (
                  <button
                    key={scene.id}
                    onClick={() => setActiveRoom(scene)}
                    className={`px-3 py-1 text-xs rounded-md transition-all duration-200 ${
                      activeRoom.id === scene.id
                        ? 'bg-neutral-800 text-white shadow-sm font-medium'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {scene.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Viewport Frame */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-white/10 shadow-2xl group bg-neutral-950">
              {/* Architectural Photography */}
              <motion.img
                key={activeRoom.id}
                initial={{ opacity: 0.4, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={activeRoom.image}
                alt={activeRoom.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Dynamic Base Dark Ambient Layer */}
              <div 
                className="absolute inset-0 bg-black/60 transition-opacity duration-500" 
                style={{ opacity: Math.max(0.2, 0.85 - (brightness / 100) * 0.55) }}
              />

              {/* Dynamic Radial Light Cones / Glow from Fixture Origin */}
              <motion.div
                className="absolute pointer-events-none rounded-full blur-[85px] sm:blur-[110px] transition-all duration-500 mix-blend-screen"
                style={{
                  top: activeRoom.lightOrigin.y,
                  left: activeRoom.lightOrigin.x,
                  transform: 'translate(-50%, -50%)',
                  width: `${300 + (brightness / 100) * 380}px`,
                  height: `${300 + (brightness / 100) * 380}px`,
                  backgroundColor: currentColor,
                  opacity: (brightness / 100) * 0.9,
                }}
              />

              {/* Secondary Fixture Soft Floor Spill */}
              <div
                className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none blur-[90px] transition-all duration-500 mix-blend-screen"
                style={{
                  backgroundColor: currentColor,
                  opacity: (brightness / 100) * 0.35,
                }}
              />

              {/* Room Telemetry HUD (Overlaid on Room) */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-md bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-neutral-200 flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentColor }} />
                  <span>{activeRoom.name}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-amber-300">{kelvin}K</span>
                  <span className="text-neutral-500">•</span>
                  <span>{brightness}% Lux</span>
                </div>
              </div>

              {/* Active Fixture Badges */}
              <div className="absolute bottom-4 inset-x-4 z-20 flex flex-wrap gap-1.5 items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {activeRoom.fixtures.map((fx, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-neutral-300 font-sans tracking-wide"
                    >
                      {fx}
                    </span>
                  ))}
                </div>

                <div className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-neutral-300 font-mono">
                  Ra &gt; 98.2 (Full Spectrum)
                </div>
              </div>
            </div>

            {/* Live Recommendation Bar */}
            <div className="p-4 rounded-xl bg-neutral-900/60 border border-white/5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border border-white/10 shadow-inner"
                  style={{ backgroundColor: currentGlowRgba }}
                >
                  <Sun className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 font-mono">Recommended Fixture Profile:</div>
                  <div className="text-sm font-medium text-white">{activePreset.recommendedFixture}</div>
                </div>
              </div>

              <Link
                to={`/category/${activePreset.recommendedCategory}`}
                className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium tracking-wide transition-colors"
              >
                <span>View Range</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* RIGHT: Interactive Controls & Preset Moods (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 bg-neutral-900/40 p-6 sm:p-7 rounded-2xl border border-white/10 backdrop-blur-md">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#CC1F1F]" />
                <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-200">
                  Luminous Control Panel
                </h3>
              </div>
              <button
                onClick={() => applyPreset(LIGHTING_PRESETS[1])}
                title="Reset to 2700K"
                className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* PRESET MOOD SELECTORS */}
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 block">
                Atmospheric Presets
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {LIGHTING_PRESETS.map((preset) => {
                  const isSelected = activePreset.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => applyPreset(preset)}
                      className={`p-3 rounded-xl text-left border transition-all duration-200 relative overflow-hidden group ${
                        isSelected
                          ? 'bg-neutral-800/90 border-amber-400/50 shadow-lg'
                          : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: preset.color }}
                        />
                        <span className="text-[10px] font-mono text-neutral-400">
                          {preset.kelvin}K
                        </span>
                      </div>
                      <div className="text-xs font-medium text-white group-hover:text-amber-200 transition-colors">
                        {preset.name}
                      </div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 line-clamp-1">
                        {preset.tag}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SLIDER 1: Correlated Color Temperature (Kelvin) */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-neutral-300 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" /> Color Temperature (CCT)
                </span>
                <span className="font-mono font-semibold px-2 py-0.5 rounded bg-neutral-800 text-amber-200 border border-white/5">
                  {kelvin} K
                </span>
              </div>

              <div className="relative pt-1">
                <input
                  type="range"
                  min="2000"
                  max="5000"
                  step="50"
                  value={kelvin}
                  onChange={(e) => {
                    setKelvin(Number(e.target.value));
                    setActivePreset({ id: 'custom' });
                  }}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  style={{
                    background: 'linear-gradient(to right, #ff8822 0%, #ffbe6b 30%, #ffd28e 50%, #f4f7ff 80%, #d8e5ff 100%)',
                  }}
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1.5">
                  <span>2000K Candlelight</span>
                  <span>3000K Neutral Warm</span>
                  <span>5000K Daylight</span>
                </div>
              </div>
            </div>

            {/* SLIDER 2: Brightness / Dimmer (Lux Output) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-neutral-300 flex items-center gap-1.5">
                  <Moon className="w-3.5 h-3.5 text-blue-300" /> Luminous Dimmer (Flux)
                </span>
                <span className="font-mono font-semibold px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-white/5">
                  {brightness}% • ~{calculatedLux} Lux
                </span>
              </div>

              <div className="relative pt-1">
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={brightness}
                  onChange={(e) => {
                    setBrightness(Number(e.target.value));
                    setActivePreset({ id: 'custom' });
                  }}
                  className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#CC1F1F]"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1.5">
                  <span>10% Midnight Glow</span>
                  <span>50% Ambient Comfort</span>
                  <span>100% Full Lumens</span>
                </div>
              </div>
            </div>

            {/* Real-time Optical Metrics Grid */}
            <div className="pt-4 border-t border-neutral-800 grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800">
                <div className="text-[10px] font-mono text-neutral-400">Color Fidelity</div>
                <div className="text-sm font-semibold text-white mt-0.5">Ra &gt; 98</div>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800">
                <div className="text-[10px] font-mono text-neutral-400">Strobe / Flicker</div>
                <div className="text-sm font-semibold text-emerald-400 mt-0.5">&lt; 0.01 %</div>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-950/60 border border-neutral-800">
                <div className="text-[10px] font-mono text-neutral-400">MacAdam Step</div>
                <div className="text-sm font-semibold text-white mt-0.5">&le; 2 SDCM</div>
              </div>
            </div>

            {/* Explanatory Quote */}
            <p className="text-xs text-neutral-400 font-light italic leading-relaxed pt-1">
              &ldquo;{activePreset.description || 'Custom light tuning enables architectural depth, accentuating surface textures while minimizing glare.'}&rdquo;
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
