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
          <span className="text-[10px] uppercase tracking-luxury text-[#9a7442] font-semibold block mb-1">
            Inventory & Showroom
          </span>
          <h1 className="text-2xl font-serif-luxury font-bold text-slate-900 tracking-wide">
            Architectural Luminaires Catalog
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage specifications, photometrics, imagery, and pricing across {totalCount} fixtures.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="btn-gold px-5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Luminaire</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, SKU, finish, or wattage..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-[#b58d57] focus:ring-1 focus:ring-[#b58d57] text-xs transition-all"
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
            className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-[#b58d57] transition-all"
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
            className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-700 focus:bg-white focus:outline-none focus:border-[#b58d57] transition-all"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts Only</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase tracking-luxury font-semibold border-b border-slate-200 text-[10px]">
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
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    Loading architectural luminaires...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <Package className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-slate-800">No products match criteria</p>
                    <p className="text-xs text-slate-500 mt-0.5">Try clearing your search filters</p>
                  </td>
                </tr>
              ) : (
                products.map((prod) => (
                  <tr key={prod._id} className="hover:bg-slate-50/80 transition-colors group">
                    {/* Luminaire Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
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
                              <Package className="w-5 h-5 text-slate-400" />
                            );
                          })()}
                        </div>
                        <div className="max-w-[220px]">
                          <Link
                            to={`/admin/products/edit/${prod._id}`}
                            className="font-semibold text-slate-900 hover:text-[#b58d57] transition-colors truncate block text-xs"
                          >
                            {prod.name || prod.title}
                          </Link>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            /{prod.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 text-[11px] font-medium">
                        {prod.category?.name || 'Unassigned'}
                      </span>
                    </td>

                    {/* SKU */}
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {prod.sku || '—'}
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                      {prod.price > 0 ? `₹${prod.price.toLocaleString()}` : 'Custom Quote'}
                    </td>

                    {/* Badges */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {prod.isFeatured && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-[#8a6534] border border-amber-300">
                            Featured
                          </span>
                        )}
                        {prod.isNewArrival && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                            New
                          </span>
                        )}
                        {!prod.isFeatured && !prod.isNewArrival && (
                          <span className="text-[11px] text-slate-400">—</span>
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
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 shadow-xs'
                            : 'bg-slate-100 text-slate-600 border border-slate-300 hover:bg-slate-200 hover:text-slate-900'
                        }`}
                      >
                        {togglingId === prod._id ? (
                          <Loader2 className="w-3 h-3 animate-spin text-current" />
                        ) : prod.isPublished ? (
                          <Eye className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <EyeOff className="w-3 h-3 text-slate-500" />
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
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#b58d57] hover:bg-amber-50 transition-colors"
                          title="Quick in-app preview"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`/product/${prod.slug || prod._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                          title="View on storefront (opens in new tab)"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => handleDuplicate(prod)}
                          disabled={duplicatingId === prod._id}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-[#b58d57] hover:bg-amber-50 transition-colors disabled:opacity-50"
                          title="Duplicate luminaire as draft"
                        >
                          {duplicatingId === prod._id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-[#b58d57]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <Link
                          to={`/admin/products/edit/${prod._id}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit luminaire"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => {
                            setProductToDelete(prod);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
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
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <span>
            Showing {products.length} of {totalCount} total fixtures
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-xs"
            >
              Previous
            </button>
            <span className="font-mono text-slate-700 font-medium">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-40 disabled:pointer-events-none transition-colors shadow-xs"
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
