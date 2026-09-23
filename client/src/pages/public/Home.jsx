import React, { useState, useEffect } from 'react';
import { homepageService } from '../../services/api';
import { HeroSection } from '../../components/home/HeroSection';
import { CategoriesSection } from '../../components/home/CategoriesSection';
import { AboutSection } from '../../components/home/AboutSection';
import { FeaturedProductsSection } from '../../components/home/FeaturedProductsSection';
import { ProjectsSection } from '../../components/home/ProjectsSection';
import { CTASection } from '../../components/home/CTASection';
import { ContactSection } from '../../components/home/ContactSection';
import { useSettings } from '../../context/SettingsContext';
import { ExploreProductRangeSection } from '../../components/home/ExploreProductRangeSection';
import { CuratedSpacesLookbook } from '../../components/home/CuratedSpacesLookbook';

export const Home = () => {
  const { settings } = useSettings();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set document title
  useEffect(() => {
    document.title = settings.defaultSeoTitle || 'Luxury Designer Lamps & Architectural Lighting';
  }, [settings]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        setLoading(true);
        const data = await homepageService.getHomepage();
        if (data.success && data.sections) {
          setSections(data.sections);
        }
      } catch (err) {
        console.warn('Failed to load dynamic sections from backend, using defaults:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  // Component mapping by sectionKey (technical sections removed)
  const renderSection = (section) => {
    switch (section.sectionKey) {
      case 'hero':
        return <HeroSection key={section._id || 'hero'} section={section} />;
      case 'explore_range':
        return <ExploreProductRangeSection key={section._id || 'explore_range'} section={section} />;
      case 'categories':
        return <CategoriesSection key={section._id || 'categories'} section={section} />;
      case 'spaces_lookbook':
        return <CuratedSpacesLookbook key={section._id || 'spaces_lookbook'} section={section} />;
      case 'about':
        return <AboutSection key={section._id || 'about'} section={section} />;
      case 'featured_products':
        return <FeaturedProductsSection key={section._id || 'featured'} section={section} />;
      case 'projects':
        return <ProjectsSection key={section._id || 'projects'} section={section} />;
      case 'cta':
        return <CTASection key={section._id || 'cta'} section={section} />;
      case 'contact':
        return <ContactSection key={section._id || 'contact'} section={section} />;
      default:
        return null;
    }
  };

  if (loading && sections.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#DC2626] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-luxury text-[#DC2626] font-semibold">
            Loading Catalog...
          </p>
        </div>
      </div>
    );
  }

  // Streamlined homepage sections: concise luxury flow without duplicates or redundant forms
  const fallbackSections = [
    { sectionKey: 'hero', name: 'Hero' },
    { sectionKey: 'explore_range', name: 'Explore Product Range' },
    { sectionKey: 'featured_products', name: 'Featured Products' },
    { sectionKey: 'spaces_lookbook', name: 'Curated Spaces Lookbook' },
    { sectionKey: 'about', name: 'About' },
    { sectionKey: 'projects', name: 'Projects' },
    { sectionKey: 'cta', name: 'CTA' },
  ];

  const baseSections = sections.length > 0 ? sections : fallbackSections;

  // Filter out heavy contact form (dedicated /contact page exists), technical sections, and duplicate categories
  const hasExploreRange = baseSections.some((s) => s.sectionKey === 'explore_range');
  const sectionsToRender = baseSections.filter(
    (s) =>
      s.sectionKey !== 'lighting_studio' &&
      s.sectionKey !== 'contact' &&
      (!hasExploreRange || s.sectionKey !== 'categories')
  );

  return (
    <div className="relative bg-white text-neutral-900 min-h-screen">
      {sectionsToRender.map((section) => renderSection(section))}
    </div>
  );
};
