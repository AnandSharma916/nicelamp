import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
  ExternalLink,
  Sliders,
  ShieldCheck,
} from 'lucide-react';
import { productService, categoryService, inquiryService } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';

export const Dashboard = () => {
  const { settings } = useSettings();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalInquiries: 0,
    newInquiries: 0,
    featuredCount: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes, inqRes] = await Promise.allSettled([
          productService.getProducts({ limit: 6, sort: '-createdAt', admin: 'true' }),
          categoryService.getCategories({ admin: 'true' }),
          inquiryService.getInquiries({ limit: 5 }),
        ]);

        let prodCount = 0;
        let featured = 0;
        if (prodRes.status === 'fulfilled' && prodRes.value.success) {
          const prods = prodRes.value.products || [];
          setRecentProducts(prods);
          prodCount = prodRes.value.total || prodRes.value.pagination?.total || prods.length;
          featured = prods.filter((p) => p.isFeatured).length;
        }

        let catCount = 0;
        if (catRes.status === 'fulfilled' && catRes.value.success) {
          catCount = catRes.value.categories?.length || 0;
        }

        let inqCount = 0;
        let newCount = 0;
        if (inqRes.status === 'fulfilled' && inqRes.value.success) {
          const inqs = inqRes.value.inquiries || [];
          setRecentInquiries(inqs);
          inqCount = inqRes.value.total || inqRes.value.pagination?.total || inqs.length;
          newCount = inqs.filter((i) => i.status === 'new').length;
        }

        setStats({
          totalProducts: prodCount,
          totalCategories: catCount,
          totalInquiries: inqCount,
          newInquiries: newCount,
          featuredCount: featured,
        });
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: 'Active Products',
      value: stats.totalProducts,
      subtitle: `${stats.featuredCount} Featured in Showroom`,
      icon: Package,
      path: '/admin/products',
      color: 'from-amber-50/90 to-amber-100/40',
      borderColor: 'border-amber-200/90',
      iconColor: 'text-[#8a6534]',
      iconBg: 'bg-amber-100/80 border-amber-300',
    },
    {
      title: 'Catalog Categories',
      value: stats.totalCategories,
      subtitle: 'Design Collections & Systems',
      icon: Layers,
      path: '/admin/categories',
      color: 'from-blue-50/90 to-blue-100/40',
      borderColor: 'border-blue-200/90',
      iconColor: 'text-blue-700',
      iconBg: 'bg-blue-100/80 border-blue-300',
    },
    {
      title: 'Client Inquiries',
      value: stats.totalInquiries,
      subtitle: `${stats.newInquiries} Awaiting Review`,
      icon: MessageSquare,
      path: '/admin/inquiries',
      color: 'from-orange-50/90 to-orange-100/40',
      borderColor: 'border-orange-200/90',
      iconColor: 'text-orange-700',
      iconBg: 'bg-orange-100/80 border-orange-300',
    },
    {
      title: 'Live Experience',
      value: 'Online',
      subtitle: 'Synchronized REST Storefront',
      icon: Sparkles,
      path: '/',
      external: true,
      color: 'from-emerald-50/90 to-emerald-100/40',
      borderColor: 'border-emerald-200/90',
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-100/80 border-emerald-300',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-[#9a7442] font-semibold block mb-1">
            Executive Overview
          </span>
          <h1 className="text-2xl lg:text-3xl font-serif-luxury font-bold text-slate-900 tracking-wide">
            {settings.companyName || 'LightHut'} Management
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Control center for luxury luminaires, architectural collections, homepage displays, and client project inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/admin/products/new"
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Luminaire</span>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="btn-outline-gold px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.path}
              target={card.external ? '_blank' : undefined}
              className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} border ${card.borderColor} transition-all hover:-translate-y-0.5 hover:shadow-md group flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl border ${card.iconBg} ${card.iconColor} shadow-xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <span className="text-xs font-medium text-slate-600 block mb-1">
                  {card.title}
                </span>
                <div className="text-2xl font-serif-luxury font-bold text-slate-900 tracking-tight">
                  {loading ? '...' : card.value}
                </div>
                <span className="text-[11px] text-slate-500 font-mono mt-1 block">
                  {card.subtitle}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Products */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-serif-luxury font-bold text-slate-900 tracking-wide">
                Recent Catalog Additions
              </h2>
              <p className="text-xs text-slate-500">
                Latest luminaires added to the product repository
              </p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs text-[#9a7442] hover:underline font-semibold uppercase tracking-luxury flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-12 text-center text-xs text-slate-400">
                Loading products...
              </div>
            ) : recentProducts.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-sm text-slate-800 font-medium">No products registered yet.</p>
                <p className="text-xs text-slate-500 mt-1 mb-4">Add your first architectural luminaire.</p>
                <Link to="/admin/products/new" className="btn-gold px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-luxury">
                  Add First Luminaire
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentProducts.map((prod) => (
                  <div
                    key={prod._id}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
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
                      <div className="min-w-0">
                        <Link
                          to={`/admin/products/edit/${prod._id}`}
                          className="text-sm font-semibold text-slate-900 hover:text-[#b58d57] transition-colors truncate block"
                        >
                          {prod.name || prod.title}
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                          <span className="font-mono text-slate-500">{prod.sku || 'NO-SKU'}</span>
                          <span>•</span>
                          <span>{prod.category?.name || 'Uncategorized'}</span>
                          {prod.price > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-[#9a7442] font-semibold font-mono">₹{prod.price.toLocaleString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          prod.isPublished
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {prod.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <Link
                        to={`/admin/products/edit/${prod._id}`}
                        className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                        title="Edit Luminaire"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Inquiries & Quick Links */}
        <div className="space-y-6">
          {/* Recent Inquiries Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-serif-luxury font-bold text-slate-900 tracking-wide flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#b58d57]" />
                <span>Client Inquiries</span>
              </h3>
              <Link
                to="/admin/inquiries"
                className="text-[11px] text-[#9a7442] hover:underline uppercase tracking-luxury font-semibold"
              >
                All Inquiries
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading inquiries...</div>
            ) : recentInquiries.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                No recent inquiries from storefront visitors.
              </div>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((inq) => (
                  <div
                    key={inq._id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-slate-900">{inq.name}</span>
                      <span
                        className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                          inq.status === 'new'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : inq.status === 'contacted'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1 mb-1">
                      {inq.message || inq.subject || 'Specification Request'}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{inq.email}</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Management Shortcuts Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <h3 className="text-sm font-serif-luxury font-bold text-slate-900 tracking-wide mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#b58d57]" />
              <span>Catalog Operations</span>
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/admin/homepage"
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 transition-all text-left group"
              >
                <Sliders className="w-4 h-4 text-[#b58d57] mb-2" />
                <span className="text-xs font-semibold text-slate-900 block group-hover:text-[#9a7442]">
                  Homepage CMS
                </span>
                <span className="text-[10px] text-slate-500">Hero & Banners</span>
              </Link>

              <Link
                to="/admin/categories"
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 transition-all text-left group"
              >
                <Layers className="w-4 h-4 text-[#b58d57] mb-2" />
                <span className="text-xs font-semibold text-slate-900 block group-hover:text-[#9a7442]">
                  Categories
                </span>
                <span className="text-[10px] text-slate-500">Organize Grid</span>
              </Link>

              <Link
                to="/admin/media"
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 transition-all text-left group"
              >
                <Eye className="w-4 h-4 text-[#b58d57] mb-2" />
                <span className="text-xs font-semibold text-slate-900 block group-hover:text-[#9a7442]">
                  Media Assets
                </span>
                <span className="text-[10px] text-slate-500">Upload Photos</span>
              </Link>

              <Link
                to="/admin/settings"
                className="p-3 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-200 transition-all text-left group"
              >
                <TrendingUp className="w-4 h-4 text-[#b58d57] mb-2" />
                <span className="text-xs font-semibold text-slate-900 block group-hover:text-[#9a7442]">
                  Site Settings
                </span>
                <span className="text-[10px] text-slate-500">Brand & Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
