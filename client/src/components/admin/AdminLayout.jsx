import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Sliders,
  Image as ImageIcon,
  MessageSquare,
  Settings as SettingsIcon,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Plus,
  ShieldAlert,
  SunMedium,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

export const AdminLayout = () => {
  const { admin, isAuthenticated, loading, logout } = useAuth();
  const { settings } = useSettings();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] text-slate-800">
        <div className="w-10 h-10 rounded-full border-2 border-[#b58d57] border-t-transparent animate-spin" />
      </div>
    );
  }

  // Route protection
  if (!isAuthenticated) {
    // Redirect to login preserving intended URL
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 text-center">
        <div className="max-w-md bg-white border border-slate-200 p-8 rounded-2xl shadow-xl">
          <ShieldAlert className="w-12 h-12 text-[#b58d57] mx-auto mb-4" />
          <h2 className="text-xl font-serif-luxury text-slate-900 font-bold mb-2">
            Authentication Required
          </h2>
          <p className="text-xs text-slate-600 mb-6">
            The administrative management console is restricted to authenticated managers.
          </p>
          <button
            onClick={() => navigate('/admin/login')}
            className="btn-gold w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-luxury shadow-md"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products Catalog', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Homepage CMS', path: '/admin/homepage', icon: Sliders },
    { name: 'Media Library', path: '/admin/media', icon: ImageIcon },
    { name: 'Client Inquiries', path: '/admin/inquiries', icon: MessageSquare },
    { name: 'Site Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 shadow-sm ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-300/80 flex items-center justify-center shadow-xs">
                <SunMedium className="w-5 h-5 text-[#b58d57]" />
              </div>
              <div>
                <span className="font-serif-luxury text-sm font-bold text-slate-900 block tracking-wider">
                  {settings.companyName || 'LightHut'}
                </span>
                <span className="text-[9px] uppercase tracking-luxury text-[#9a7442] font-semibold block">
                  Admin CMS
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-400 hover:text-slate-800 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items List */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-luxury transition-all ${
                      isActive
                        ? 'bg-[#b58d57] text-white shadow-md shadow-[#b58d57]/20 font-bold'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 space-y-2 bg-slate-50/60">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-xs transition-all border border-transparent hover:border-slate-200"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#b58d57]" />
              <span className="font-medium">Live Website</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">↗</span>
          </a>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Stage */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:text-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs uppercase tracking-luxury text-[#9a7442] font-semibold hidden sm:inline-block">
              Administrative Control Hub
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/products/new"
              className="btn-gold px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-luxury flex items-center gap-1.5 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </Link>

            <div className="flex items-center gap-2.5 pl-4 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-xs font-bold text-[#8a6534]">
                {admin.name?.[0] || 'A'}
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-xs font-semibold text-slate-900 block leading-tight">
                  {admin.name}
                </span>
                <span className="text-[10px] text-slate-500 block font-mono">
                  {admin.email}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
