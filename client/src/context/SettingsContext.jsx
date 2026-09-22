import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsService } from '../services/api';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    companyName: 'NiceLamp',
    tagline: 'Luxury Designer Lamps & Premium Home Lighting',
    logo: '',
    favicon: '/favicon.svg',
    email: 'info@nicelamp.com',
    phone: '+91 8045811438',
    address: 'Industrial Area Phase II, Delhi, India',
    whatsapp: '+91 9811000000',
    socialLinks: {
      instagram: 'https://instagram.com/nicelamp',
      facebook: 'https://facebook.com/nicelamp',
      linkedin: 'https://linkedin.com/company/nicelamp',
      pinterest: 'https://pinterest.com/nicelamp',
    },
    footerContent: {
      copyrightText: '© 2026 NiceLamp. All Rights Reserved.',
      aboutText: 'Crafting luxury designer lamps, ambient pendants, chandeliers, and premium lighting fixtures to elevate modern homes across India.',
      gstNumber: '07BSYPK8425N1ZP',
    },
    defaultSeoTitle: 'NiceLamp | Luxury Designer Lamps & Home Lighting',
    defaultSeoDescription: 'Explore luxury designer lamps, ambient pendant lights, modern chandeliers, and artisanal fixtures for elegant living spaces.',
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
