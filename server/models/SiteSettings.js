import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: 'LightHut Decorative Solutions',
    },
    tagline: {
      type: String,
      default: 'Architectural & Luxury Decorative Luminaires',
    },
    logo: {
      type: String,
      default: '',
    },
    favicon: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: 'info@lighthutcatalog.com',
    },
    phone: {
      type: String,
      default: '+91 8045811438',
    },
    address: {
      type: String,
      default: 'Plot No. 42, Industrial Area Phase II, Delhi, India',
    },
    whatsapp: {
      type: String,
      default: '+91 9811000000',
    },
    socialLinks: {
      instagram: { type: String, default: 'https://instagram.com' },
      facebook: { type: String, default: 'https://facebook.com' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      pinterest: { type: String, default: 'https://pinterest.com' },
      youtube: { type: String, default: '' },
    },
    footerContent: {
      copyrightText: {
        type: String,
        default: '© 2026 LightHut Decorative Solutions. All Rights Reserved.',
      },
      aboutText: {
        type: String,
        default: 'Pioneering contemporary architectural lighting solutions, precision engineered luminaires, and tailored illumination for luxury residential and commercial environments.',
      },
      gstNumber: {
        type: String,
        default: '07BSYPK8425N1ZP',
      }
    },
    defaultSeoTitle: {
      type: String,
      default: 'LightHut | Premium Architectural & Decorative Lighting Manufacturer',
    },
    defaultSeoDescription: {
      type: String,
      default: 'Discover high-performance architectural wall lamps, pendant luminaires, modern table lamps, and custom lighting fixtures engineered for premier spaces.',
    },
  },
  {
    timestamps: true,
  }
);

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);
export default SiteSettings;
