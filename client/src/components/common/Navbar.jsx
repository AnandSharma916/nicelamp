import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Phone,
  ArrowRight,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { categoryService } from '../../services/api';
import { SearchModal } from './SearchModal';
import { InquiryModal } from './InquiryModal';

export const Navbar = () => {
  const { settings } = useSettings();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch categories for dropdown
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        if (data.success) {
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.warn('Navbar category fetch error:', err);
      }
    };
    loadCategories();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/catalog' },
    { name: 'Categories', path: '/categories', hasDropdown: true },
    { name: 'Projects', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090a0d]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#090a0d]/90 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            {settings.logo ? (
              <img src={settings.logo} alt={settings.companyName} className="h-9 w-auto object-contain" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1c2028] to-[#111318] border border-[#c5a880]/30 flex items-center justify-center group-hover:border-[#c5a880] transition-colors shadow-lg">
                <svg className="w-6 h-6 text-[#c5a880]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
              </div>
            )}
            <div>
              <span className="font-serif-luxury text-lg tracking-wider text-white font-semibold block leading-tight group-hover:text-[#c5a880] transition-colors">
                {settings.companyName || 'LightHut'}
              </span>
              <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] font-medium block">
                Decorative Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group py-2"
                    onMouseEnter={() => setCategoriesOpen(true)}
                    onMouseLeave={() => setCategoriesOpen(false)}
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-luxury transition-all rounded-lg ${
                          isActive
                            ? 'text-[#c5a880] bg-white/5'
                            : 'text-neutral-300 hover:text-white hover:bg-white/5'
                        }`
                      }
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#c5a880] transition-transform group-hover:rotate-180" />
                    </NavLink>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {categoriesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-64 bg-[#14171d]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl p-2 z-50 divide-y divide-white/5"
                        >
                          <div className="py-1">
                            {categories.map((cat) => (
                              <Link
                                key={cat._id}
                                to={`/category/${cat.slug}`}
                                className="flex items-center justify-between px-3 py-2 text-xs text-neutral-300 hover:text-[#c5a880] hover:bg-white/5 rounded-lg transition-colors"
                              >
                                <span>{cat.name}</span>
                                {cat.productsCount !== undefined && (
                                  <span className="text-[10px] font-mono text-neutral-500 bg-black/40 px-1.5 py-0.5 rounded">
                                    {cat.productsCount}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                          <div className="pt-1">
                            <Link
                              to="/catalog"
                              className="flex items-center justify-between px-3 py-2 text-[11px] uppercase tracking-luxury text-[#c5a880] font-semibold hover:bg-[#c5a880]/10 rounded-lg transition-colors"
                            >
                              <span>View Entire Catalog</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 text-xs font-semibold uppercase tracking-luxury transition-all rounded-lg ${
                      isActive
                        ? 'text-[#c5a880] bg-white/5 font-bold'
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 text-xs uppercase tracking-luxury"
              aria-label="Search luminaires"
            >
              <Search className="w-4 h-4 text-[#c5a880]" />
              <span>Search</span>
            </button>

            {/* Quick Inquiry Button */}
            <button
              onClick={() => setInquiryOpen(true)}
              className="btn-gold px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 shadow-lg"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Inquiry</span>
            </button>
          </div>

          {/* Mobile Actions & Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-neutral-300 hover:text-white"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-[#c5a880]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-[#111318] border-l border-white/10 p-6 flex flex-col justify-between overflow-y-auto shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-serif-luxury text-lg text-white font-semibold">
                      {settings.companyName}
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      <NavLink
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `block px-4 py-3 text-sm font-semibold uppercase tracking-luxury rounded-lg transition-colors ${
                            isActive
                              ? 'text-[#c5a880] bg-white/5 font-bold'
                              : 'text-neutral-300 hover:text-white hover:bg-white/5'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </div>
                  ))}
                </div>

                {/* Mobile Categories Quick Links */}
                {categories.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <span className="text-[10px] uppercase tracking-luxury text-[#c5a880] font-bold block mb-3 px-4">
                      Lighting Categories
                    </span>
                    <div className="space-y-1 px-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat._id}
                          to={`/category/${cat.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-3 py-1.5 text-xs text-neutral-400 hover:text-white rounded transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Drawer Bottom Info */}
              <div className="pt-6 border-t border-white/10 mt-6 space-y-4">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setInquiryOpen(true);
                  }}
                  className="w-full btn-gold py-3 rounded-lg text-xs font-semibold uppercase tracking-luxury flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Inquiry</span>
                </button>

                {settings.phone && (
                  <a
                    href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                    className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Call: {settings.phone}</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Modals */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
};
