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
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const Footer = () => {
  const { settings } = useSettings();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600 text-sm">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand & Craftsmanship */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif-luxury text-xl text-slate-900 font-bold block tracking-wider">
                {settings.companyName}
              </span>
              <span className="text-[10px] uppercase tracking-luxury text-[#9a7442] font-semibold block">
                {settings.tagline || 'Decorative Solutions'}
              </span>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              {settings.footerContent?.aboutText ||
                'Pioneering contemporary architectural lighting solutions, precision engineered luminaires, and tailored illumination for luxury spaces.'}
            </p>
            {settings.footerContent?.gstNumber && (
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-700 shadow-sm">
                  GSTIN: {settings.footerContent.gstNumber}
                </span>
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-xs uppercase tracking-luxury text-slate-900 font-bold">
              Explore & Portfolios
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/catalog" className="hover:text-[#9a7442] transition-colors flex items-center gap-1 group text-slate-600">
                  <span>Product Catalog</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#9a7442] transition-colors flex items-center gap-1 group text-slate-600">
                  <span>Categories Overview</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#9a7442] transition-colors flex items-center gap-1 group text-slate-600">
                  <span>Architectural Projects</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#9a7442] transition-colors flex items-center gap-1 group text-slate-600">
                  <span>Company Profile</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#9a7442] transition-colors flex items-center gap-1 group text-slate-600">
                  <span>Contact & Showroom</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1 text-[11px]"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Lighting Categories */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-xs uppercase tracking-luxury text-slate-900 font-bold">
              Core Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/category/wall-light" className="text-slate-600 hover:text-[#9a7442] transition-colors">
                  Architectural Wall Lamps
                </Link>
              </li>
              <li>
                <Link to="/category/hanging-lights" className="text-slate-600 hover:text-[#9a7442] transition-colors">
                  Pendant & Cluster Chandeliers
                </Link>
              </li>
              <li>
                <Link to="/category/table-lamp" className="text-slate-600 hover:text-[#9a7442] transition-colors">
                  Sculptural Table Luminaires
                </Link>
              </li>
              <li>
                <Link to="/category/italian-lights" className="text-slate-600 hover:text-[#9a7442] transition-colors">
                  Artisanal Italian Glass
                </Link>
              </li>
              <li>
                <Link to="/category/track-lights" className="text-slate-600 hover:text-[#9a7442] transition-colors">
                  48V Magnetic Track Systems
                </Link>
              </li>
              <li>
                <Link to="/category/outdoor-lighting" className="text-slate-600 hover:text-[#9a7442] transition-colors">
                  IP65 Facade Grazers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Headquarters & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-xs uppercase tracking-luxury text-slate-900 font-bold">
              Headquarters & Inquiries
            </h4>
            <div className="space-y-3 text-xs">
              {settings.address && (
                <div className="flex items-start gap-2.5 text-slate-600">
                  <MapPin className="w-4 h-4 text-[#b58d57] shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
              )}
              {settings.phone && (
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Phone className="w-4 h-4 text-[#b58d57] shrink-0" />
                  <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="hover:text-slate-900 transition-colors">
                    {settings.phone}
                  </a>
                </div>
              )}
              {settings.email && (
                <div className="flex items-center gap-2.5 text-slate-600">
                  <Mail className="w-4 h-4 text-[#b58d57] shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-slate-900 transition-colors">
                    {settings.email}
                  </a>
                </div>
              )}
              {settings.whatsapp && (
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-700 hover:underline font-semibold"
                  >
                    WhatsApp Chat: {settings.whatsapp}
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
                  className="w-8 h-8 rounded-lg bg-white hover:bg-amber-50 hover:text-[#9a7442] border border-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
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
                  className="w-8 h-8 rounded-lg bg-white hover:bg-amber-50 hover:text-[#9a7442] border border-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
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
                  className="w-8 h-8 rounded-lg bg-white hover:bg-amber-50 hover:text-[#9a7442] border border-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-200 bg-slate-200/60 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{settings.footerContent?.copyrightText || '© 2026 LightHut. All Rights Reserved.'}</p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-400">Architectural Luminaire Manufacturer</span>
            <button
              onClick={scrollToTop}
              className="text-[#9a7442] hover:text-slate-900 transition-colors text-xs uppercase tracking-luxury flex items-center gap-1 font-semibold"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
