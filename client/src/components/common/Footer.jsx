import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  Instagram,
  Facebook,
  Linkedin,
  MessageSquare,
  Lock,
  ShieldCheck,
  Truck,
  Sparkles,
  Layers,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const Footer = () => {
  const { settings } = useSettings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = (settings.whatsapp || '+919811000000').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#f8fafc] border-t border-neutral-200 text-neutral-600 text-sm">
      {/* ── PRE-FOOTER: TRUST & CLIENT ASSURANCES STRIP ── */}
      <div className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-[#DC2626]" />
              </div>
              <div>
                <h5 className="font-serif-luxury text-sm font-bold text-neutral-900">
                  100% Transit Insured
                </h5>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  Triple-layer wooden crating with free instant replacement for any transit damage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#DC2626]" />
              </div>
              <div>
                <h5 className="font-serif-luxury text-sm font-bold text-neutral-900">
                  Pure Metallurgy & Crystal
                </h5>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  Solid brass, hand-buffed champagne gold, and genuine K9 diamond-cut optical crystals.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                <Layers className="w-5 h-5 text-[#DC2626]" />
              </div>
              <div>
                <h5 className="font-serif-luxury text-sm font-bold text-neutral-900">
                  Custom Ceiling Drops
                </h5>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  Tailored suspension rods and cables up to 10m for high ceilings and duplex foyers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#DC2626]" />
              </div>
              <div>
                <h5 className="font-serif-luxury text-sm font-bold text-neutral-900">
                  Architect Trade Concierge
                </h5>
                <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                  Dedicated assistance with 3D CAD/IES photometric files and site scale matching.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN FOOTER GRID ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Column 1: Brand Heritage & Craftsmanship (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={settings.logo || '/categories/logo.png'}
                alt="Lighting Studio"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/categories/logo.png';
                }}
              />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-luxury text-[#DC2626] font-semibold">
                  {settings.tagline || 'Architectural & Decorative Lighting'}
                </span>
              </div>
            </Link>

            <p className="text-xs text-neutral-600 leading-relaxed max-w-sm">
              {settings.footerContent?.aboutText && !settings.footerContent.aboutText.toLowerCase().includes('nicelamp')
                ? settings.footerContent.aboutText
                : 'Crafting luxury designer lamps, ambient chandeliers, and bespoke architectural luminaires. Engineered with solid brass, K9 optical crystal, and eye-friendly warm circadian illumination for India’s finest residences.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              {settings.footerContent?.gstNumber && (
                <span className="text-[11px] font-mono uppercase bg-neutral-100 border border-neutral-200 px-2.5 py-1 rounded text-neutral-700">
                  GSTIN: {settings.footerContent.gstNumber}
                </span>
              )}
              <span className="text-[11px] font-mono bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>BIS & CE Compliant</span>
              </span>
            </div>
          </div>

          {/* Column 2: Core Lighting Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury text-xs uppercase tracking-luxury text-neutral-900 font-bold">
              Lighting Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/category/chandelier" className="text-neutral-600 hover:text-[#DC2626] transition-colors">
                  Chandelier (Modern, Ring & Crystal)
                </Link>
              </li>
              <li>
                <Link to="/category/pendant-lamp" className="text-neutral-600 hover:text-[#DC2626] transition-colors">
                  Pendant Lamp (Fluted Glass Suspensions)
                </Link>
              </li>
              <li>
                <Link to="/category/wall-lamp" className="text-neutral-600 hover:text-[#DC2626] transition-colors">
                  Wall Lamp (Bi-Directional Sconces)
                </Link>
              </li>
              <li>
                <Link to="/category/double-height" className="text-neutral-600 hover:text-[#DC2626] transition-colors">
                  Double Height (Duplex & Foyer Drops)
                </Link>
              </li>
              <li>
                <Link to="/category/dining-table-lamp" className="text-neutral-600 hover:text-[#DC2626] transition-colors">
                  Dining Table Lamps (Cordless & Linear)
                </Link>
              </li>
              <li>
                <Link to="/category/outdoor-light" className="text-neutral-600 hover:text-[#DC2626] transition-colors">
                  Outdoor Lights (IP65 Gate & Facade)
                </Link>
              </li>
              <li>
                <Link to="/category/table-lamp" className="text-neutral-600 hover:text-[#DC2626] transition-colors">
                  Table & Floor Lamps (Italian Marble)
                </Link>
              </li>
              <li>
                <Link to="/category/spare-part" className="text-neutral-600 hover:text-[#DC2626] transition-colors">
                  Spare Parts, Drivers & Bulbs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links & Trade (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif-luxury text-xs uppercase tracking-luxury text-neutral-900 font-bold">
              Explore & Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/catalog" className="text-neutral-600 hover:text-[#DC2626] transition-colors flex items-center gap-1 group">
                  <span>Product Catalog</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-neutral-600 hover:text-[#DC2626] transition-colors flex items-center gap-1 group">
                  <span>Categories Overview</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-neutral-600 hover:text-[#DC2626] transition-colors flex items-center gap-1 group">
                  <span>Installed Projects</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-600 hover:text-[#DC2626] transition-colors flex items-center gap-1 group">
                  <span>Our Heritage & Craft</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-600 hover:text-[#DC2626] transition-colors flex items-center gap-1 group">
                  <span>Showroom & Contact</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="text-neutral-400 hover:text-neutral-700 transition-colors flex items-center gap-1 text-[11px]"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Headquarters & Experience Center (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif-luxury text-xs uppercase tracking-luxury text-neutral-900 font-bold">
              Showroom & Concierge
            </h4>
            <div className="space-y-3 text-xs">
              {settings.address && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                  <span className="text-neutral-600">{settings.address}</span>
                </div>
              )}
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <span className="text-neutral-600">
                  Mon – Sat: 10:00 AM – 7:30 PM<br />
                  <span className="text-neutral-400 text-[11px]">Sunday by Appointment</span>
                </span>
              </div>
              {settings.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                  <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    {settings.phone}
                  </a>
                </div>
              )}
              {settings.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#DC2626] shrink-0" />
                  <a href={`mailto:${settings.email}`} className="text-neutral-600 hover:text-neutral-900 transition-colors">
                    {settings.email}
                  </a>
                </div>
              )}
              {settings.whatsapp && (
                <div className="pt-1">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi team, I would like to consult on architectural lighting for my project.')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="pt-2 flex items-center gap-3">
              {settings.socialLinks?.instagram && (
                <a
                  href={settings.socialLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white hover:bg-red-50 hover:text-[#DC2626] border border-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks?.facebook && (
                <a
                  href={settings.socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white hover:bg-red-50 hover:text-[#DC2626] border border-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {settings.socialLinks?.linkedin && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-white hover:bg-red-50 hover:text-[#DC2626] border border-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM COPYRIGHT & COMPLIANCE BAR ── */}
      <div className="border-t border-neutral-200 bg-white py-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            {settings.footerContent?.copyrightText && !settings.footerContent.copyrightText.toLowerCase().includes('nicelamp')
              ? settings.footerContent.copyrightText
              : '© 2026 Lighting Studio. All Rights Reserved.'}
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="text-[11px] text-neutral-500">
              BIS & CE Certified Drivers • High CRI &gt; 95 LEDs • Pan-India Insured Dispatch
            </span>
            <button
              onClick={scrollToTop}
              className="text-[#DC2626] hover:text-neutral-900 transition-colors text-xs uppercase tracking-luxury flex items-center gap-1 font-semibold"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
