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
    <footer className="bg-[#0b0f17] border-t border-white/10 text-neutral-400 text-sm">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Brand & Craftsmanship */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-serif-luxury text-xl text-white font-semibold block tracking-wider">
                {settings.companyName || 'NiceLamp'}
              </span>
              <span className="text-[10px] uppercase tracking-luxury text-[#D4AF37] font-medium block">
                {settings.tagline || 'Decorative Lighting'}
              </span>
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {settings.footerContent?.aboutText ||
                'NiceLamp brings you premium decorative lighting, handcrafted chandeliers, and ambient wall lamps designed to illuminate your home with beauty and warmth.'}
            </p>
            {settings.footerContent?.gstNumber && (
              <div className="pt-2">
                <span className="text-[11px] font-mono uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded text-neutral-300">
                  GSTIN: {settings.footerContent.gstNumber}
                </span>
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-xs uppercase tracking-luxury text-white font-semibold">
              Explore & Portfolios
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/catalog" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
                  <span>Product Catalog</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
                  <span>Categories Overview</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
                  <span>Architectural Projects</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
                  <span>Company Profile</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 group">
                  <span>Contact & Showroom</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="text-neutral-500 hover:text-neutral-300 transition-colors flex items-center gap-1 text-[11px]"
                >
                  <Lock className="w-3 h-3" />
                  <span>Admin Portal</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Lighting Categories */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-xs uppercase tracking-luxury text-white font-semibold">
              Core Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/category/wall-lamp" className="hover:text-[#D4AF37] transition-colors">
                  Wall Lamp (LED & E27)
                </Link>
              </li>
              <li>
                <Link to="/category/pendant-lamp" className="hover:text-[#D4AF37] transition-colors">
                  Pendant Lamp (Hanging Lights)
                </Link>
              </li>
              <li>
                <Link to="/category/chandelier" className="hover:text-[#D4AF37] transition-colors">
                  Chandelier Collection
                </Link>
              </li>
              <li>
                <Link to="/category/double-height" className="hover:text-[#D4AF37] transition-colors">
                  Double Height Chandeliers
                </Link>
              </li>
              <li>
                <Link to="/category/dining-table-lamp" className="hover:text-[#D4AF37] transition-colors">
                  Dining Table Lamps
                </Link>
              </li>
              <li>
                <Link to="/category/outdoor-light" className="hover:text-[#D4AF37] transition-colors">
                  Outdoor Lights & Gate Lamps
                </Link>
              </li>
              <li>
                <Link to="/category/spare-part" className="hover:text-[#D4AF37] transition-colors">
                  Spare Parts & Filament Bulbs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Headquarters & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-xs uppercase tracking-luxury text-white font-semibold">
              Headquarters & Inquiries
            </h4>
            <div className="space-y-3 text-xs">
              {settings.address && (
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
              )}
              {settings.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
                    {settings.phone}
                  </a>
                </div>
              )}
              {settings.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                    {settings.email}
                  </a>
                </div>
              )}
              {settings.whatsapp && (
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-400 hover:underline"
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
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] border border-white/10 flex items-center justify-center transition-colors"
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
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] border border-white/10 flex items-center justify-center transition-colors"
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
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] border border-white/10 flex items-center justify-center transition-colors"
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
      <div className="border-t border-white/5 bg-[#07080a] py-6 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>{settings.footerContent?.copyrightText || '© 2026 NiceLamp. All Rights Reserved.'}</p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-neutral-500">Luxury Designer Lamps & Lighting</span>
            <button
              onClick={scrollToTop}
              className="text-[#D4AF37] hover:text-white transition-colors text-xs uppercase tracking-luxury flex items-center gap-1"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
