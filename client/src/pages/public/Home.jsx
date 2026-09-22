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
import { AmbientLightExperience } from '../../components/common/AmbientLightExperience';
import { ExploreProductRangeSection } from '../../components/home/ExploreProductRangeSection';
import { LightingMoodStudio } from '../../components/home/LightingMoodStudio';
import { CuratedSpacesLookbook } from '../../components/home/CuratedSpacesLookbook';

export const Home = () => {
  const { settings } = useSettings();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Set document title
  useEffect(() => {
    document.title = settings.defaultSeoTitle || 'LightHut | Architectural & Decorative Lighting Solutions';
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

  // Component mapping by sectionKey
  const renderSection = (section) => {
    switch (section.sectionKey) {
      case 'hero':
        return <HeroSection key={section._id || 'hero'} section={section} />;
      case 'explore_range':
        return <ExploreProductRangeSection key={section._id || 'explore_range'} section={section} />;
      case 'lighting_studio':
        return <LightingMoodStudio key={section._id || 'lighting_studio'} section={section} />;
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
      <div className="min-h-screen flex items-center justify-center bg-[#090a0d]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#CC1F1F] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-luxury text-[#CC1F1F] font-semibold">
            Loading Architectural Catalog...
          </p>
        </div>
      </div>
    );
  }

  // Fallback default sections if database is clean before seed
  const fallbackSections = [
    { sectionKey: 'hero', name: 'Hero' },
    { sectionKey: 'explore_range', name: 'Explore Product Range' },
    { sectionKey: 'lighting_studio', name: 'Lighting Mood Studio' },
    { sectionKey: 'categories', name: 'Categories' },
    { sectionKey: 'spaces_lookbook', name: 'Curated Spaces Lookbook' },
    { sectionKey: 'about', name: 'About' },
    { sectionKey: 'featured_products', name: 'Featured Products' },
    { sectionKey: 'projects', name: 'Projects' },
    { sectionKey: 'cta', name: 'CTA' },
    { sectionKey: 'contact', name: 'Contact' },
  ];

  const baseSections = sections.length > 0 ? sections : fallbackSections;

  // Assemble sections to ensure new interactive animation experiences are always included
  const assembleSections = (inputSections) => {
    const list = [...inputSections];

    if (!list.some((s) => s.sectionKey === 'explore_range')) {
      const heroIdx = list.findIndex((s) => s.sectionKey === 'hero');
      list.splice(heroIdx !== -1 ? heroIdx + 1 : 1, 0, {
        sectionKey: 'explore_range',
        name: 'Explore Product Range',
      });
    }

    if (!list.some((s) => s.sectionKey === 'lighting_studio')) {
      const exploreIdx = list.findIndex((s) => s.sectionKey === 'explore_range');
      list.splice(exploreIdx !== -1 ? exploreIdx + 1 : 2, 0, {
        sectionKey: 'lighting_studio',
        name: 'Lighting Mood Studio',
      });
    }

    if (!list.some((s) => s.sectionKey === 'spaces_lookbook')) {
      const catIdx = list.findIndex((s) => s.sectionKey === 'categories');
      list.splice(catIdx !== -1 ? catIdx + 1 : list.length - 3, 0, {
        sectionKey: 'spaces_lookbook',
        name: 'Curated Spaces Lookbook',
      });
    }

    return list;
  };

  const sectionsToRender = assembleSections(baseSections);

  return (
    <AmbientLightExperience>
      <div className="relative">
        {sectionsToRender.map((section) => renderSection(section))}
      </div>
    </AmbientLightExperience>
  );
};
