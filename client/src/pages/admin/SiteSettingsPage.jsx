import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Loader2,
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';
import { settingsService } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';
import { ImageUploader } from '../../components/admin/ImageUploader';

export const SiteSettingsPage = () => {
  const { settings, refreshSettings } = useSettings();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    companyName: '',
    tagline: '',
    logo: '',
    favicon: '',
    email: '',
    phone: '',
    address: '',
    whatsapp: '',
    socialLinks: {
      instagram: '',
      facebook: '',
      linkedin: '',
      pinterest: '',
    },
    footerContent: {
      copyrightText: '',
      aboutText: '',
      gstNumber: '',
    },
    defaultSeoTitle: '',
    defaultSeoDescription: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        companyName: settings.companyName || '',
        tagline: settings.tagline || '',
        logo: settings.logo || '',
        favicon: settings.favicon || '',
        email: settings.email || '',
        phone: settings.phone || '',
        address: settings.address || '',
        whatsapp: settings.whatsapp || '',
        socialLinks: {
          instagram: settings.socialLinks?.instagram || '',
          facebook: settings.socialLinks?.facebook || '',
          linkedin: settings.socialLinks?.linkedin || '',
          pinterest: settings.socialLinks?.pinterest || '',
        },
        footerContent: {
          copyrightText: settings.footerContent?.copyrightText || '',
          aboutText: settings.footerContent?.aboutText || '',
          gstNumber: settings.footerContent?.gstNumber || '',
        },
        defaultSeoTitle: settings.defaultSeoTitle || '',
        defaultSeoDescription: settings.defaultSeoDescription || '',
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (group, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const res = await settingsService.updateSettings(formData);
      if (res.success) {
        addToast('Site settings updated across the application.', 'success');
        if (refreshSettings) refreshSettings();
      }
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to save settings.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-[#9a7442] font-bold block mb-1">
            Global Metadata & Branding
          </span>
          <h1 className="text-2xl font-serif-luxury font-bold text-slate-900 tracking-wide">
            Site Architecture Settings
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure enterprise brand typography, contact channels, legal registration, and global SEO meta declarations.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="btn-gold px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 self-start sm:self-auto shadow-md disabled:opacity-50"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Global Settings</span>
            </>
          )}
        </button>
      </div>

      <form noValidate onSubmit={handleSubmit} className="space-y-6">
        {/* 1. Brand Identity */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="text-base font-serif-luxury font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#9a7442]" />
            <span>Brand Identity & Logo</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="LightHut Decorative Solutions"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#b58d57] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
                Official Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                placeholder="Architectural & Luxury Decorative Luminaires"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-[#b58d57] focus:bg-white"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
              Storefront Header Brand Logo
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <ImageUploader
                  label="Upload Brand Logo Asset (PNG, SVG, WebP)"
                  onUploadSuccess={(url) => setFormData((p) => ({ ...p, logo: url }))}
                />
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="Or direct logo URL (/uploads, CDN, SVG)..."
                  className="w-full px-3 py-2 mt-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 font-mono focus:bg-white focus:border-[#b58d57]"
                />
              </div>

              <div className="h-28 rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-center">
                {formData.logo ? (
                  <img src={formData.logo} alt="Logo" className="max-h-16 w-auto object-contain" />
                ) : (
                  <span className="text-xs text-slate-400">Default SVG icon in use</span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200">
            <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
              Browser Favicon Icon
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <div>
                <ImageUploader
                  label="Upload Favicon Icon (PNG, SVG, ICO)"
                  onUploadSuccess={(url) => setFormData((p) => ({ ...p, favicon: url }))}
                />
                <input
                  type="text"
                  name="favicon"
                  value={formData.favicon}
                  onChange={handleChange}
                  placeholder="Or direct favicon URL (/uploads, ICO, PNG)..."
                  className="w-full px-3 py-2 mt-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 font-mono focus:bg-white focus:border-[#b58d57]"
                />
              </div>

              <div className="h-28 rounded-xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-center">
                {formData.favicon ? (
                  <img src={formData.favicon} alt="Favicon" className="w-8 h-8 object-contain" />
                ) : (
                  <span className="text-xs text-slate-400">Default favicon in use</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Direct Contact Details */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="text-base font-serif-luxury font-bold text-slate-900 flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#9a7442]" />
            <span>Consultation & Contact Channels</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
                Direct Telephone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 8045811438"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono focus:bg-white focus:border-[#b58d57]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
                WhatsApp Business Link
              </label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="+91 9811000000"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono focus:bg-white focus:border-[#b58d57]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
                Sales & Inquiries Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="info@lighthutcatalog.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#b58d57]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
              Physical Showroom / Headquarters Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Plot No. 42, Industrial Area Phase II, Delhi, India"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#b58d57]"
            />
          </div>
        </div>

        {/* 3. Legal & Social Links */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="text-base font-serif-luxury font-bold text-slate-900 flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#9a7442]" />
            <span>Digital Footprint & Regulatory</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
                GST Number
              </label>
              <input
                type="text"
                value={formData.footerContent.gstNumber}
                onChange={(e) => handleNestedChange('footerContent', 'gstNumber', e.target.value)}
                placeholder="07BSYPK8425N1ZP"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono focus:bg-white focus:border-[#b58d57]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.socialLinks.instagram}
                onChange={(e) => handleNestedChange('socialLinks', 'instagram', e.target.value)}
                placeholder="https://instagram.com/lighthut"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-mono focus:bg-white focus:border-[#b58d57]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
              Footer About Snippet
            </label>
            <textarea
              rows={3}
              value={formData.footerContent.aboutText}
              onChange={(e) => handleNestedChange('footerContent', 'aboutText', e.target.value)}
              placeholder="Pioneering contemporary architectural lighting solutions..."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#b58d57]"
            />
          </div>
        </div>

        {/* 4. Default Search Engine Optimization */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <h2 className="text-base font-serif-luxury font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#9a7442]" />
            <span>Search Engine Optimization (SEO) Defaults</span>
          </h2>

          <div>
            <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
              Default HTML Title Tag
            </label>
            <input
              type="text"
              name="defaultSeoTitle"
              value={formData.defaultSeoTitle}
              onChange={handleChange}
              placeholder="LightHut | Architectural & Decorative Lighting Solutions"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#b58d57]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-luxury text-slate-700 mb-1.5 font-medium">
              Default Meta Description
            </label>
            <textarea
              rows={2}
              name="defaultSeoDescription"
              value={formData.defaultSeoDescription}
              onChange={handleChange}
              placeholder="Discover high-performance architectural wall lamps, pendant luminaires, and custom fixtures."
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-[#b58d57]"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="btn-gold px-8 py-3 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving to Database...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Site Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
