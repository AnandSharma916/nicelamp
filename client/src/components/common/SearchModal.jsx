import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Lightbulb, Loader2 } from 'lucide-react';
import { productService } from '../../services/api';

export const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setSearchTerm('');
      setResults([]);
    }
  }, [isOpen]);

  // Debounced search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts({ search: searchTerm, limit: 6 });
        if (data.success) {
          setResults(data.products || []);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSelectProduct = (slug) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleViewAll = () => {
    onClose();
    navigate(`/catalog?search=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-6 py-4 border-b border-slate-200 bg-slate-50">
              <Search className="w-5 h-5 text-[#b58d57] mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search luminaires by name, SKU (e.g. LH-6031W), material..."
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none text-base font-medium"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchTerm.trim()) {
                    handleViewAll();
                  } else if (e.key === 'Escape') {
                    onClose();
                  }
                }}
              />
              {loading && <Loader2 className="w-5 h-5 text-[#b58d57] animate-spin mr-3 shrink-0" />}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results Area */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2 modal-scrollbar">
              {results.length > 0 ? (
                <div>
                  <div className="text-xs uppercase tracking-luxury text-[#9a7442] px-3 py-2 font-bold">
                    Matching Luminaires ({results.length})
                  </div>
                  <div className="divide-y divide-slate-100">
                    {results.map((product) => (
                      <div
                        key={product._id}
                        onClick={() => handleSelectProduct(product.slug)}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          <img
                            src={product.images?.[0]?.url || 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=200&q=80'}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-semibold text-[#9a7442] bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                              {product.sku}
                            </span>
                            {product.category?.name && (
                              <span className="text-xs text-slate-500 truncate">
                                {product.category.name}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-semibold text-slate-900 truncate mt-1 group-hover:text-[#9a7442] transition-colors">
                            {product.name}
                          </h4>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#9a7442] group-hover:translate-x-1 transition-all shrink-0" />
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 mt-2 border-t border-slate-200 px-2">
                    <button
                      onClick={handleViewAll}
                      className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-luxury text-[#9a7442] hover:bg-amber-50 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      View all results in catalog <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : searchTerm.trim() ? (
                <div className="py-12 text-center text-slate-600">
                  <Lightbulb className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-800">No luminaires found matching "{searchTerm}"</p>
                  <p className="text-xs text-slate-400 mt-1">Try searching by category, finish, or generic name</p>
                </div>
              ) : (
                <div className="py-8 px-4 text-center">
                  <p className="text-xs uppercase tracking-luxury text-slate-500 font-bold mb-3">Popular Searches</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Wall Light', 'Italian Lights', 'LH-6031W', 'Gold Wall Lamp', 'Pendant', 'IP65 Facade', 'Brass Table Lamp'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchTerm(tag)}
                        className="px-3 py-1.5 rounded-full text-xs bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-[#9a7442] border border-slate-200 transition-all font-medium"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
