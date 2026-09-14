import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Building2, Hotel, Home } from 'lucide-react';

export const ProjectsSection = ({ section }) => {
  const [activeTab, setActiveTab] = useState('all');

  const title = section?.title || 'Architectural Lighting In Practice';
  const subtitle = section?.subtitle || 'Global Portfolios & Installed Excellence';
  const description =
    section?.description ||
    'From luxury seaside villas to prestigious hotel atriums, discover how our luminaires transform spatial aesthetics into immersive environments.';
  const btnText = section?.buttonText || 'View Complete Portfolio';
  const btnLink = section?.buttonLink || '/projects';

  const defaultProjects = [
    {
      id: 1,
      title: 'The Amanora Residence',
      location: 'New Delhi, India',
      category: 'residential',
      categoryLabel: 'Luxury Villa',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      description: 'Integrated 48V magnetic track lighting and perimeter wall grazers delivering warm ambient layers throughout a 14,000 sq ft private residence.',
    },
    {
      id: 2,
      title: 'Meridian Grand Atrium',
      location: 'Mumbai, India',
      category: 'hospitality',
      categoryLabel: 'Hospitality',
      image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1000&q=80',
      description: 'Custom cascading blown-glass chandeliers and glare-free downlights illuminating a multi-tier luxury hotel atrium.',
    },
    {
      id: 3,
      title: 'Horizon Corporate Pavilion',
      location: 'Bengaluru, India',
      category: 'commercial',
      categoryLabel: 'Commercial HQ',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
      description: 'Dynamic bi-directional exterior facade grazers creating sharp architectural reveals across a contemporary tech campus.',
    },
  ];

  const projects = section?.metadata?.portfolioItems || defaultProjects;

  const filteredProjects =
    activeTab === 'all'
      ? projects
      : projects.filter((p) => (p.category || '').toLowerCase() === activeTab);

  return (
    <section className="py-24 bg-[#090a0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-semibold block mb-2">
              {subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#14171d] p-1.5 rounded-xl border border-white/10 shrink-0">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'residential', label: 'Residential' },
              { id: 'hospitality', label: 'Hospitality' },
              { id: 'commercial', label: 'Commercial' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-luxury transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#c5a880] text-black shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.title || idx}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden bg-[#14171d] border border-white/10 hover:border-[#c5a880]/50 transition-all duration-500 shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14171d] via-[#14171d]/30 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-luxury text-[#c5a880] bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-semibold">
                    {project.categoryLabel || project.category || 'Architecture'}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="font-serif-luxury text-lg text-white font-bold group-hover:text-[#c5a880] transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <Link
            to={btnLink}
            className="btn-outline-gold inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-luxury"
          >
            <span>{btnText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
