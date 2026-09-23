import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  Zap,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Building2,
  Compass,
  Hammer,
  Eye,
  Truck,
  MessageCircle,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const About = () => {
  const { settings } = useSettings();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = `About Us, Heritage & Craftsmanship | ${settings.companyName || 'Lighting Studio'}`;
  }, [settings.companyName]);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const whatsappNumber = (settings.whatsapp || '+919811000000').replace(/[^0-9]/g, '');

  const craftsmanshipPillars = [
    {
      icon: <Hammer className="w-6 h-6 text-[#DC2626]" />,
      title: 'PVD Solid Metallurgy',
      subtitle: 'Pure Brass & Aircraft Alloys',
      description:
        'Every fixture begins with high-density solid brass and marine-grade aluminum. Finished with aerospace PVD (Physical Vapor Deposition) and multi-stage hand buffing to ensure anti-tarnish protection against tropical humidity.',
      specs: 'Solid Brass • Hand-Brushed Champagne Gold • Anti-Oxidation Seal',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-[#DC2626]" />,
      title: 'K9 Optical Crystal & Fluted Glass',
      subtitle: 'Diamond Facets & Mouth-Blown Glass',
      description:
        'We select optical-grade K9 crystal with high refractive indices that split warm light into shimmering diamond highlights without harsh glare. Complemented by mouth-blown fluted borosilicate glass for diffuse, velvety illumination.',
      specs: 'Zero Blemishes • 99.2% Clarity • Hand-Beveled Prisms',
    },
    {
      icon: <Eye className="w-6 h-6 text-[#DC2626]" />,
      title: 'Circadian Eye-Comfort LEDs',
      subtitle: 'Ra > 95 True Color Fidelity',
      description:
        'We engineer lighting for biological wellbeing. Using flicker-free constant-current drivers and warm 2700K–3000K diodes with a Color Rendering Index exceeding Ra > 95, your interiors retain their authentic natural richness.',
      specs: 'Flicker-Free Driver • 2700K Warm White • Triac & DALI Dimming',
    },
    {
      icon: <Layers className="w-6 h-6 text-[#DC2626]" />,
      title: 'Bespoke Suspension Engineering',
      subtitle: 'Tailored Drops up to 10 Meters',
      description:
        'From high-ceiling stairwells to monumental double-height foyers, our in-house structural engineers customize suspension cables, multi-tiered ceiling plates, and reinforced weight-bearing canopies for flawless alignment.',
      specs: 'Reinforced Steel Cables • Custom Rod Lengths • Seismic Brackets',
    },
  ];

  const qualitySteps = [
    {
      step: '01',
      title: 'Spatial Blueprint Review',
      description:
        'Our design team evaluates your room dimensions, ceiling height, and natural lighting angles to recommend the ideal scale and suspension drop.',
    },
    {
      step: '02',
      title: 'Photometric Simulation',
      description:
        'We model beam angles, lux distribution, and ambient layering to eliminate shadows and prevent uncomfortable glare across living and dining areas.',
    },
    {
      step: '03',
      title: 'Master Artisan Handcrafting',
      description:
        'Skilled artisans turn brass components, hand-polish crystal facets, and wire high-performance LED circuits according to strict architectural tolerances.',
    },
    {
      step: '04',
      title: '48-Hour Burn-In Stress Test',
      description:
        'Every luminaire undergoes a continuous 48-hour burn-in thermal test, voltage surge analysis, and driver stability check before receiving quality certification.',
    },
    {
      step: '05',
      title: 'Triple-Layer Crated Dispatch',
      description:
        'Protected by high-density custom-molded foam and reinforced wooden outer crates with 100% transit breakage replacement insurance across India.',
    },
  ];

  const faqs = [
    {
      q: 'How do I choose the right chandelier size for my double-height ceiling or living room?',
      a: 'A proven architectural rule of thumb is: Room Width (ft) + Room Length (ft) = Chandelier Diameter in inches. For example, a 16ft × 20ft living room ideally suits a 36-inch diameter luminaire. For double-height ceilings (18ft to 24ft+), we recommend multi-tiered or cascading drops that fill the vertical volume while keeping the bottom of the chandelier at least 8 to 9 feet above floor level. Our team provides complimentary scale consultations via WhatsApp.',
    },
    {
      q: 'Are your chandeliers and hanging lights dimmable with home automation?',
      a: 'Yes. Most of our LED luminaires and pendant collections are engineered with dimmable constant-current drivers compatible with Triac wall dimmers, 0-10V systems, and smart home automation protocols including DALI-2, Lutron, and KNX. Please specify your automation system when ordering so we configure the matching driver.',
    },
    {
      q: 'How do you guarantee safe delivery of delicate crystals and glass across India?',
      a: 'We ship nationwide using a specialized triple-layer packaging protocol: each crystal and glass shade is individually nested in precision-cut high-density EPE foam, packed inside heavy-duty corrugated cartons, and encased in a shock-absorbing reinforced wooden crate. Every shipment is 100% insured—if any component is damaged in transit, we dispatch a replacement part immediately at zero charge.',
    },
    {
      q: 'Can wire drops and suspension rods be customized for specific ceiling heights?',
      a: 'Absolutely. Every home and villa is unique. We provide custom suspension wire lengths (up to 10 meters) and segmented metal extension rods upon request. Simply provide your floor-to-ceiling height during consultation, and we will tailor the drop to perfection.',
    },
    {
      q: 'Are your outdoor and gate lights rust-proof in heavy coastal or monsoon climates?',
      a: 'Yes. Our outdoor luminaires are cast from marine-grade die-cast aluminum with multi-layer thermoset powder coating and silicone weather-gaskets rated IP65/IP66. They are chemically resistant to saline air, UV degradation, and heavy monsoon rains.',
    },
    {
      q: 'Do you offer replacement bulbs, extra crystals, and spare drivers?',
      a: 'Yes. We maintain a dedicated inventory of replacement optical crystals, spare drivers, E27/E14 vintage warm filament LED bulbs, and mounting hardware for all current and legacy collections. You can order spares directly through our catalog or concierge team.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen text-neutral-900">
      {/* ── HEADER BANNER ── */}
      <section className="border-b border-neutral-200 bg-[#f8fafc] py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-[#DC2626] text-xs font-bold uppercase tracking-luxury">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Heritage & Architectural Vision</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-neutral-900 tracking-tight leading-tight">
              Illuminating India's Finest Homes With Artistry & Warmth
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal pt-2">
              For over a decade, we have dedicated ourselves to the mastery of light. We blend timeless craftsmanship, pure metals, hand-cut optical crystals, and flicker-free circadian LEDs to transform living spaces into sanctuaries of luxury and comfort.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 1: THE STORY & VALUES ── */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden border border-neutral-200 shadow-xl aspect-[4/3] bg-neutral-100 group">
              <img
                src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85"
                alt="Master Artisan Crafting Chandelier"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-3 sm:bottom-6 sm:right-6 bg-white/95 border border-neutral-200 rounded-2xl p-5 shadow-xl backdrop-blur-md max-w-[260px]">
              <div className="flex items-center gap-2.5 mb-1">
                <Award className="w-5 h-5 text-[#DC2626]" />
                <span className="font-serif-luxury text-2xl font-bold text-neutral-900">10,000+</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Penthouses, villas, and boutique spaces illuminated across 28 Indian states.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block mb-2">
                Our Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-neutral-900 leading-snug">
                Lighting is Not Merely Utility; It is the Soul of an Interior
              </h2>
            </div>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Based in Delhi, our studio was born from a singular passion: creating fixtures that honor the delicate relationship between architecture, shadow, and warm illumination. Where mass-produced fixtures prioritize speed, we commit to slow, meticulous perfection.
            </p>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
              Every curve of hand-spun brass, every facet of optical crystal, and every LED diode is calibrated to emit light that soothes the eyes, flatters natural materials, and brings people together around dinner tables and living rooms.
            </p>

            {/* Quick Metrics */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-neutral-200">
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#DC2626] block">500+</span>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mt-0.5">Fixtures in Catalog</span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#DC2626] block">100%</span>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mt-0.5">Insured Safe Transit</span>
              </div>
              <div>
                <span className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#DC2626] block">Ra &gt; 95</span>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mt-0.5">High Color Fidelity</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: 4 PILLARS OF CRAFTSMANSHIP ── */}
      <section className="py-20 bg-[#f8fafc] border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-neutral-900">
              The 4 Pillars of Our Craftsmanship
            </h2>
            <p className="text-sm text-neutral-600 leading-relaxed font-normal">
              From raw metallurgy to optical refraction, discover how every luminaire is engineered to provide decades of luminous beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {craftsmanshipPillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm hover:border-[#DC2626] hover:shadow-md transition-all duration-300 space-y-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg font-bold text-neutral-900">
                      {pillar.title}
                    </h3>
                    <span className="text-xs text-[#DC2626] font-medium tracking-wide">
                      {pillar.subtitle}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {pillar.description}
                </p>

                <div className="pt-2 border-t border-neutral-100 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                  <span>{pillar.specs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: 5-STEP QUALITY & ZERO-BREAKAGE CRATING LIFECYCLE ── */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block">
            Precision Execution
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-neutral-900">
            Our 5-Step Quality & Crating Protocol
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed font-normal">
            Every luminaire is tracked from architectural design drawings to shockproof wooden crating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {qualitySteps.map((s, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm relative flex flex-col justify-between hover:border-[#DC2626]/50 transition-colors"
            >
              <div>
                <span className="font-mono text-3xl font-bold text-red-600/30 block mb-3">
                  {s.step}
                </span>
                <h3 className="font-serif-luxury text-base font-bold text-neutral-900 mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {s.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-1 text-[10.5px] font-semibold text-[#DC2626]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Audited Step</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: ARCHITECT & DESIGNER TRADE PROGRAM ── */}
      <section className="py-16 bg-neutral-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 px-6 sm:px-12 relative overflow-hidden my-8">
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            <span>Architect & Interior Designer Trade Partnership</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
            Partner With Us For Your Luxury Projects
          </h2>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl font-normal">
            We collaborate closely with leading interior designers, architects, and builders across India. From providing 3D CAD/IES lighting files to custom ceiling drop calculations and tiered volume pricing, our dedicated trade desk ensures seamless specification.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <FileCheck2 className="w-5 h-5 text-red-400 mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Photometric & CAD</h4>
              <p className="text-[11px] text-neutral-400 mt-1">IES lighting files & high-res models for 3D renderings.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Compass className="w-5 h-5 text-red-400 mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Custom Scaling</h4>
              <p className="text-[11px] text-neutral-400 mt-1">Bespoke wire drops, canopy plates, and finish swatches.</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <Truck className="w-5 h-5 text-red-400 mb-2" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Priority Site Crating</h4>
              <p className="text-[11px] text-neutral-400 mt-1">Staggered delivery matched to your project handover timeline.</p>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'Hello! I am an architect / interior designer and would like to inquire about your Trade Partnership program and project catalog.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury inline-flex items-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect With Trade Desk</span>
            </a>
            <Link
              to="/projects"
              className="px-6 py-3.5 rounded-xl border border-white/20 hover:border-white text-xs font-bold uppercase tracking-luxury text-white hover:bg-white/10 transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Installed Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: FREQUENTLY ASKED QUESTIONS (FAQ) ── */}
      <section className="py-20 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-neutral-900">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed font-normal">
            Helpful answers to common inquiries regarding sizing, dimmers, transit protection, and installation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif-luxury text-base font-bold text-neutral-900">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-red-50 text-[#DC2626]' : 'text-neutral-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECTION 6: DIRECT CONSULTATION CTA ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#f8fafc] border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block">
              Personalized Assistance
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-neutral-900">
              Need Expert Advice for Your Space?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-xl">
              Share your room dimensions, floor plan, or ceiling photos with our lighting specialists for complimentary luminaire recommendations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                'Hi team, I would like to consult with a lighting expert for my home/project.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury text-center inline-flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Consultation</span>
            </a>
            <Link
              to="/catalog"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-neutral-300 hover:border-neutral-900 text-neutral-800 hover:text-neutral-950 bg-white text-xs font-bold uppercase tracking-luxury text-center transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
