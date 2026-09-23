import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Package,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { productService, categoryService } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { ProductPreviewModal } from '../../components/admin/ProductPreviewModal';

export const ProductList = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [publishFilter, setPublishFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Deletion Modal & Action States
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [togglingId, setTogglingId] = useState(null);
  const [duplicatingId, setDuplicatingId] = useState(null);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);

  // Fetch Categories for Filter Dropdown
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await categoryService.getCategories();
        if (res.success) {
          setCategories(res.categories || []);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    loadCategories();
  }, []);

  // Fetch Products
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: 10,
        search: searchTerm || undefined,
        category: selectedCategory || undefined,
        published: publishFilter === 'all' ? undefined : publishFilter === 'published',
        admin: 'true',
      };

      const res = await productService.getProducts(params);
      if (res.success) {
        setProducts(res.products || []);
        setTotalPages(res.totalPages || res.pagination?.pages || 1);
        setTotalCount(res.total || res.pagination?.total || 0);
      }
    } catch (err) {
      addToast('Failed to load products list.', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, searchTerm, selectedCategory, publishFilter, addToast]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Handle Search Input with debounce or on Enter
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadProducts();
  };

  // Toggle Publish Status
  const handleTogglePublish = async (prod) => {
    if (togglingId) return;
    try {
      setTogglingId(prod._id);
      const res = await productService.togglePublish(prod._id);
      if (res.success) {
        const nextStatus = res.product?.isPublished !== undefined ? res.product.isPublished : res.isPublished;
        const prodName = prod.name || prod.title || 'Luminaire';
        addToast(
          `"${prodName}" is now ${nextStatus ? 'Live on Storefront' : 'saved as Draft'}.`,
          'success'
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === prod._id ? { ...p, isPublished: nextStatus } : p))
        );
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update product publish status.';
      addToast(msg, 'error');
    } finally {
      setTogglingId(null);
    }
  };

  // Duplicate Product
  const handleDuplicate = async (prod) => {
    if (duplicatingId) return;
    try {
      setDuplicatingId(prod._id);
      const res = await productService.duplicateProduct(prod._id);
      if (res.success) {
        const prodName = prod.name || prod.title || 'Luminaire';
        addToast(`"${prodName}" successfully duplicated as draft.`, 'success');
        await loadProducts();
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to duplicate product.';
      addToast(msg, 'error');
    } finally {
      setDuplicatingId(null);
    }
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      setActionLoading(true);
      const res = await productService.deleteProduct(productToDelete._id);
      if (res.success) {
        addToast('Luminaire removed from catalog.', 'info');
        setDeleteModalOpen(false);
        setProductToDelete(null);
        loadProducts();
      }
    } catch (err) {
      addToast('Error removing product from database.', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-[#D4AF37] font-semibold block mb-1">
            Catalog Management
          </span>
          <h1 className="text-2xl font-serif-luxury font-bold text-white tracking-wide">
            Product Catalog
          </h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage your lighting collection, specifications, imagery, and pricing across {totalCount} catalog products.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="btn-gold px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 self-start sm:self-auto shadow-lg"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Catalog</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#14171d] border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-lg">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, SKU, finish, or wattage..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] text-xs transition-colors"
          />
        </form>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Published Filter */}
          <select
            value={publishFilter}
            onChange={(e) => {
              setPublishFilter(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2.5 rounded-xl bg-[#090a0d] border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-[#D4AF37] transition-colors"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0e1014] text-neutral-400 uppercase tracking-luxury font-semibold border-b border-white/10 text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Luminaire</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">SKU / Model</th>
                <th className="py-3.5 px-4">List Price</th>
                <th className="py-3.5 px-4">Highlights</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-neutral-300">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-neutral-500">
                    Loading architectural luminaires...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <Package className="w-8 h-8 text-neutral-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-neutral-300">No products match criteria</p>
                    <p className="text-xs text-neutral-500 mt-0.5">Try clearing your search filters</p>
                  </td>
                </tr>
              ) : (
                products.map((prod) => (
                  <tr key={prod._id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Luminaire Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-[#090a0d] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
                          {(() => {
                            const coverImg =
                              prod.mainImage ||
                              prod.images?.find((img) => img.isCover)?.url ||
                              prod.images?.[0]?.url ||
                              (typeof prod.images?.[0] === 'string' ? prod.images[0] : '');
                            return coverImg ? (
                              <img
                                src={coverImg}
                                alt={prod.name || prod.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Package className="w-5 h-5 text-neutral-600" />
                            );
                          })()}
                        </div>
                        <div className="max-w-[220px]">
                          <Link
                            to={`/admin/products/edit/${prod._id}`}
                            className="font-semibold text-white hover:text-[#D4AF37] transition-colors truncate block text-xs"
                          >
                            {prod.name || prod.title}
                          </Link>
                          <span className="text-[10px] text-neutral-500 font-mono block">
                            /{prod.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-neutral-300 text-[11px] font-medium">
                        {prod.category?.name || 'Unassigned'}
                      </span>
                    </td>

                    {/* SKU */}
                    <td className="py-3 px-4 font-mono text-neutral-400">
                      {prod.sku || '—'}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-mono font-semibold text-white">
                      {prod.price > 0 ? `₹${prod.price.toLocaleString()}` : 'Custom Quote'}
                    </td>

                    {/* Badges */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {prod.isFeatured && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                            Featured
                          </span>
                        )}
                        {prod.isNewArrival && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
                            New
                          </span>
                        )}
                        {!prod.isFeatured && !prod.isNewArrival && (
                          <span className="text-[11px] text-neutral-600">—</span>
                        )}
                      </div>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleTogglePublish(prod)}
                        disabled={togglingId === prod._id}
                        title={
                          prod.isPublished
                            ? 'Currently Live — click to switch to Draft'
                            : 'Currently Draft — click to publish Live'
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                          prod.isPublished
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                            : 'bg-neutral-800/80 text-neutral-400 border border-white/10 hover:bg-neutral-700/80 hover:text-neutral-200'
                        }`}
                      >
                        {togglingId === prod._id ? (
                          <Loader2 className="w-3 h-3 animate-spin text-current" />
                        ) : prod.isPublished ? (
                          <Eye className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <EyeOff className="w-3 h-3 text-neutral-400" />
                        )}
                        <span>{prod.isPublished ? 'Live' : 'Draft'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewProduct(prod);
                            setPreviewModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
                          title="Quick in-app preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`/product/${prod.slug || prod._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
                          title="View on storefront (opens in new tab)"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDuplicate(prod)}
                          disabled={duplicatingId === prod._id}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors disabled:opacity-50"
                          title="Duplicate luminaire as draft"
                        >
                          {duplicatingId === prod._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <Link
                          to={`/admin/products/edit/${prod._id}`}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                          title="Edit luminaire"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => {
                            setProductToDelete(prod);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete luminaire"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-[#0e1014] border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
          <span>
            Showing {products.length} of {totalCount} total fixtures
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Previous
            </button>
            <span className="font-mono text-neutral-300">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Luminaire?"
        message={`Are you sure you want to remove "${productToDelete?.name || productToDelete?.title || 'this fixture'}" from the catalog? This will delete all associated specifications and technical records.`}
        confirmText="Delete Luminaire"
        confirmVariant="danger"
        loading={actionLoading}
        onConfirm={confirmDelete}
        onClose={() => {
          setDeleteModalOpen(false);
          setProductToDelete(null);
        }}
      />

      {/* In-App Live Preview Modal */}
      <ProductPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        product={previewProduct}
        categoryName={previewProduct?.category?.name}
      />
    </div>
  );
};
