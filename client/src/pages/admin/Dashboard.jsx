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
      color: 'from-[#CC1F1F]/20 to-[#CC1F1F]/5',
      borderColor: 'border-[#CC1F1F]/30',
      iconColor: 'text-[#CC1F1F]',
    },
    {
      title: 'Catalog Categories',
      value: stats.totalCategories,
      subtitle: 'Design Collections & Systems',
      icon: Layers,
      path: '/admin/categories',
      color: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Client Inquiries',
      value: stats.totalInquiries,
      subtitle: `${stats.newInquiries} Awaiting Review`,
      icon: MessageSquare,
      path: '/admin/inquiries',
      color: 'from-amber-500/20 to-amber-500/5',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
    {
      title: 'Live Experience',
      value: 'Online',
      subtitle: 'Synchronized REST Storefront',
      icon: Sparkles,
      path: '/',
      external: true,
      color: 'from-emerald-500/20 to-emerald-500/5',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome & Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#14171d] to-[#181b22] p-6 lg:p-8 rounded-2xl border border-white/10 shadow-xl">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-[#CC1F1F] font-semibold block mb-1">
            Executive Overview
          </span>
          <h1 className="text-2xl lg:text-3xl font-serif-luxury font-bold text-white tracking-wide">
            {settings.companyName || 'LightHut'} Management
          </h1>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            Control center for luxury luminaires, architectural collections, homepage displays, and client project inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/admin/products/new"
            className="btn-gold px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 shadow-lg"
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
              className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} border ${card.borderColor} transition-all hover:-translate-y-1 hover:shadow-xl group flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 rounded-xl bg-black/40 border border-white/5 ${card.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-400 block mb-1">
                  {card.title}
                </span>
                <div className="text-2xl font-serif-luxury font-bold text-white tracking-tight">
                  {loading ? '...' : card.value}
                </div>
                <span className="text-[11px] text-neutral-400 font-mono mt-1 block">
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
              <h2 className="text-lg font-serif-luxury font-bold text-white tracking-wide">
                Recent Catalog Additions
              </h2>
              <p className="text-xs text-neutral-400">
                Latest luminaires added to the product repository
              </p>
            </div>
            <Link
              to="/admin/products"
              className="text-xs text-[#CC1F1F] hover:underline font-semibold uppercase tracking-luxury flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="bg-[#14171d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
            {loading ? (
              <div className="p-12 text-center text-xs text-neutral-500">
                Loading products...
              </div>
            ) : recentProducts.length === 0 ? (
              <div className="p-12 text-center">
                <Package className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                <p className="text-sm text-neutral-300 font-medium">No products registered yet.</p>
                <p className="text-xs text-neutral-500 mt-1 mb-4">Add your first architectural luminaire.</p>
                <Link to="/admin/products/new" className="btn-gold px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-luxury">
                  Add First Luminaire
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {recentProducts.map((prod) => (
                  <div
                    key={prod._id}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-[#0b0c10] border border-white/10 overflow-hidden shrink-0 flex items-center justify-center">
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
                      <div className="min-w-0">
                        <Link
                          to={`/admin/products/edit/${prod._id}`}
                          className="text-sm font-semibold text-white hover:text-[#CC1F1F] transition-colors truncate block"
                        >
                          {prod.name || prod.title}
                        </Link>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-neutral-400">
                          <span className="font-mono text-neutral-500">{prod.sku || 'NO-SKU'}</span>
                          <span>•</span>
                          <span>{prod.category?.name || 'Uncategorized'}</span>
                          {prod.price > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-[#CC1F1F] font-mono">₹{prod.price.toLocaleString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                          prod.isPublished
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-neutral-800 text-neutral-400 border border-white/5'
                        }`}
                      >
                        {prod.isPublished ? 'Published' : 'Draft'}
                      </span>
                      <Link
                        to={`/admin/products/edit/${prod._id}`}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
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
          <div className="bg-[#14171d] border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-serif-luxury font-bold text-white tracking-wide flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#CC1F1F]" />
                <span>Client Inquiries</span>
              </h3>
              <Link
                to="/admin/inquiries"
                className="text-[11px] text-[#CC1F1F] hover:underline uppercase tracking-luxury font-semibold"
              >
                All Inquiries
              </Link>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-neutral-500">Loading inquiries...</div>
            ) : recentInquiries.length === 0 ? (
              <div className="py-8 text-center text-xs text-neutral-500">
                No recent inquiries from storefront visitors.
              </div>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((inq) => (
                  <div
                    key={inq._id}
                    className="p-3 rounded-xl bg-black/30 border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-white">{inq.name}</span>
                      <span
                        className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                          inq.status === 'new'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            : inq.status === 'contacted'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {inq.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 mb-1">
                      {inq.message || inq.subject || 'Specification Request'}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                      <span>{inq.email}</span>
                      <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Management Shortcuts Card */}
          <div className="bg-gradient-to-br from-[#1c2028] to-[#111318] border border-white/10 rounded-2xl p-5 shadow-xl">
            <h3 className="text-sm font-serif-luxury font-bold text-white tracking-wide mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#CC1F1F]" />
              <span>Catalog Operations</span>
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/admin/homepage"
                className="p-3 rounded-xl bg-white/5 hover:bg-[#CC1F1F]/10 border border-white/5 hover:border-[#CC1F1F]/30 transition-all text-left group"
              >
                <Sliders className="w-4 h-4 text-[#CC1F1F] mb-2" />
                <span className="text-xs font-semibold text-white block group-hover:text-[#CC1F1F]">
                  Homepage CMS
                </span>
                <span className="text-[10px] text-neutral-400">Hero & Banners</span>
              </Link>

              <Link
                to="/admin/categories"
                className="p-3 rounded-xl bg-white/5 hover:bg-[#CC1F1F]/10 border border-white/5 hover:border-[#CC1F1F]/30 transition-all text-left group"
              >
                <Layers className="w-4 h-4 text-[#CC1F1F] mb-2" />
                <span className="text-xs font-semibold text-white block group-hover:text-[#CC1F1F]">
                  Categories
                </span>
                <span className="text-[10px] text-neutral-400">Organize Grid</span>
              </Link>

              <Link
                to="/admin/media"
                className="p-3 rounded-xl bg-white/5 hover:bg-[#CC1F1F]/10 border border-white/5 hover:border-[#CC1F1F]/30 transition-all text-left group"
              >
                <Eye className="w-4 h-4 text-[#CC1F1F] mb-2" />
                <span className="text-xs font-semibold text-white block group-hover:text-[#CC1F1F]">
                  Media Assets
                </span>
                <span className="text-[10px] text-neutral-400">Upload Photos</span>
              </Link>

              <Link
                to="/admin/settings"
                className="p-3 rounded-xl bg-white/5 hover:bg-[#CC1F1F]/10 border border-white/5 hover:border-[#CC1F1F]/30 transition-all text-left group"
              >
                <TrendingUp className="w-4 h-4 text-[#CC1F1F] mb-2" />
                <span className="text-xs font-semibold text-white block group-hover:text-[#CC1F1F]">
                  Site Settings
                </span>
                <span className="text-[10px] text-neutral-400">Brand & Contact</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
