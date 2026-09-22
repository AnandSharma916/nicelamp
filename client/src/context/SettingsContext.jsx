import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsService } from '../services/api';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    companyName: 'LightHut',
    tagline: 'Decorative Solutions — Luxury Architectural Luminaires',
    logo: '',
    favicon: '/favicon.svg',
    email: 'info@lighthutcatalog.com',
    phone: '+91 8045811438',
    address: 'Plot No. 42, Industrial Area Phase II, Delhi, India',
    whatsapp: '+91 9811000000',
    socialLinks: {
      instagram: 'https://instagram.com/lighthut',
      facebook: 'https://facebook.com/lighthut',
      linkedin: 'https://linkedin.com/company/lighthut',
      pinterest: 'https://pinterest.com/lighthut',
    },
    footerContent: {
      copyrightText: '© 2026 LightHut Decorative Solutions. All Rights Reserved.',
      aboutText: 'Pioneering contemporary architectural lighting solutions, precision engineered luminaires, and tailored illumination for luxury residential and commercial environments across India.',
      gstNumber: '07BSYPK8425N1ZP',
    },
    defaultSeoTitle: 'LightHut | Decorative Solutions & Architectural Lighting',
    defaultSeoDescription: 'Discover high-performance architectural wall lamps, pendant luminaires, modern chandeliers, and custom lighting fixtures.',
  });
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsService.getSettings();
      if (data.success && data.settings) {
        setSettings(data.settings);
      }
    } catch (err) {
      console.warn('Could not fetch remote site settings, using defaults.', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
