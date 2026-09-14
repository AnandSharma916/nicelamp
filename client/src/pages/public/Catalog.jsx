import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Lightbulb,
} from 'lucide-react';
import { productService, categoryService } from '../../services/api';
import { ProductCard } from '../../components/catalog/ProductCard';

export const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Filters state from URL query or defaults
  const currentCategory = searchParams.get('category') || 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('sort') || 'sortOrder';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentFeatured = searchParams.get('featured') || '';

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    document.title = 'Luminaires Catalog | LightHut Decorative Solutions';
  }, []);

  // Fetch categories for sidebar filter
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        if (data.success) {
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    loadCategories();
  }, []);

  // Fetch products from backend whenever URL filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = {
          page: currentPage,
          limit: 12,
          sort: currentSort,
          category: currentCategory !== 'all' ? currentCategory : undefined,
          search: currentSearch.trim() !== '' ? currentSearch.trim() : undefined,
          featured: currentFeatured !== '' ? currentFeatured : undefined,
        };

        const data = await productService.getProducts(params);
        if (data.success) {
          setProducts(data.products || []);
          setTotalProducts(data.total || 0);
          setTotalPages(data.totalPages || 1);
        }
      } catch (err) {
        console.error('Error fetching catalog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory, currentSearch, currentSort, currentPage, currentFeatured]);

  // Update query params helper
  const updateQuery = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, val]) => {
      if (val === undefined || val === '' || val === 'all') {
        newParams.delete(key);
      } else {
        newParams.set(key, val);
      }
    });
    // Reset to page 1 on filter/search change unless page is explicitly changed
    if (!updates.page) {
      newParams.delete('page');
    }
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateQuery({ search: searchInput });
  };

  const clearAllFilters = () => {
    setSearchInput('');
    setSearchParams({});
  };

  return (
    <div className="pt-24 pb-20 bg-[#090a0d] min-h-screen">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-white/10 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-semibold block mb-2">
              Architectural Lighting Collection
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
              Product Catalog
            </h1>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Precision-machined sconces, suspended chandeliers, and modular architectural systems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#c5a880] bg-[#c5a880]/10 border border-[#c5a880]/20 px-3 py-1.5 rounded-lg">
              {totalProducts} {totalProducts === 1 ? 'Fixture Found' : 'Fixtures Found'}
            </span>
          </div>
        </div>

        {/* Search Bar & Top Filter Controls */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by SKU, model, finish, or material..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#14171d] border border-white/10 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-[#c5a880] transition-colors"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  updateQuery({ search: '' });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden px-4 py-2.5 rounded-xl bg-[#14171d] border border-white/10 text-xs font-semibold uppercase tracking-luxury text-neutral-300 flex items-center gap-2"
            >
              <Filter className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#c5a880]" />
              <select
                value={currentSort}
                onChange={(e) => updateQuery({ sort: e.target.value })}
                className="bg-[#14171d] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold uppercase tracking-luxury text-neutral-300 focus:outline-none focus:border-[#c5a880]"
              >
                <option value="sortOrder">Featured & Order</option>
                <option value="newest">Newest First</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="sku_asc">SKU Order</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filter Badges */}
        {(currentCategory !== 'all' || currentSearch || currentFeatured) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-500 uppercase tracking-luxury font-semibold mr-1">
              Active Filters:
            </span>
            {currentCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 font-medium">
                Category: {categories.find((c) => c.slug === currentCategory)?.name || currentCategory}
                <button onClick={() => updateQuery({ category: 'all' })}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            {currentSearch && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 font-medium">
                Query: "{currentSearch}"
                <button
                  onClick={() => {
                    setSearchInput('');
                    updateQuery({ search: '' });
                  }}
                >
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            {currentFeatured && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-[#c5a880]/15 text-[#c5a880] border border-[#c5a880]/30 font-medium">
                Featured Only
                <button onClick={() => updateQuery({ featured: '' })}>
                  <X className="w-3 h-3 hover:text-white" />
                </button>
              </span>
            )}
            <button
              onClick={clearAllFilters}
              className="text-xs text-neutral-400 hover:text-white underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-28">
            <div className="p-6 rounded-2xl bg-[#14171d] border border-white/10 space-y-6 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-luxury text-white font-bold flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#c5a880]" />
                  Categories
                </span>
                {currentCategory !== 'all' && (
                  <button
                    onClick={() => updateQuery({ category: 'all' })}
                    className="text-[11px] text-[#c5a880] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Category Radio List */}
              <div className="space-y-1">
                <button
                  onClick={() => updateQuery({ category: 'all' })}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    currentCategory === 'all'
                      ? 'bg-[#c5a880] text-black font-semibold shadow'
                      : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>All Categories</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => updateQuery({ category: cat.slug })}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      currentCategory === cat.slug
                        ? 'bg-[#c5a880] text-black font-semibold shadow'
                        : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="truncate text-left">{cat.name}</span>
                    {cat.productsCount !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                          currentCategory === cat.slug ? 'bg-black/20 text-black' : 'text-neutral-500 bg-black/40'
                        }`}
                      >
                        {cat.productsCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Featured Only Filter Toggle */}
              <div className="pt-4 border-t border-white/10">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={currentFeatured === 'true'}
                    onChange={(e) => updateQuery({ featured: e.target.checked ? 'true' : '' })}
                    className="rounded bg-[#090a0d] border-white/20 text-[#c5a880] focus:ring-0 focus:ring-offset-0 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-xs text-neutral-300 group-hover:text-white transition-colors flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                    Featured Fixtures Only
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <div key={n} className="h-96 rounded-2xl bg-[#14171d] animate-pulse" />
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-14 pt-8 border-t border-white/10 flex items-center justify-between">
                    <button
                      disabled={currentPage <= 1}
                      onClick={() => updateQuery({ page: currentPage - 1 })}
                      className="px-4 py-2 rounded-xl bg-[#14171d] border border-white/10 text-xs uppercase tracking-luxury text-neutral-300 hover:text-white flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <button
                          key={p}
                          onClick={() => updateQuery({ page: p })}
                          className={`w-9 h-9 rounded-xl text-xs font-mono font-medium transition-all ${
                            currentPage === p
                              ? 'bg-[#c5a880] text-black font-bold shadow-lg'
                              : 'bg-[#14171d] text-neutral-400 hover:text-white border border-white/10'
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>

                    <button
                      disabled={currentPage >= totalPages}
                      onClick={() => updateQuery({ page: currentPage + 1 })}
                      className="px-4 py-2 rounded-xl bg-[#14171d] border border-white/10 text-xs uppercase tracking-luxury text-neutral-300 hover:text-white flex items-center gap-1.5 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="py-20 text-center rounded-2xl bg-[#14171d] border border-white/10 p-8">
                <Lightbulb className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
                <h3 className="text-xl font-serif-luxury text-white font-semibold">No Fixtures Found</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto mt-2 leading-relaxed">
                  We couldn't find any luminaires matching your criteria. Try resetting your search filters or browse all categories.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-gold px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-luxury mt-6"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
