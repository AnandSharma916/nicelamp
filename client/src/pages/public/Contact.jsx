import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Send,
  Clock,
  Loader2,
  Checimport React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Send,
  Clock,
  Loader2,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Building2,
  ShieldCheck,
  Layers,
  ArrowDown,
  ExternalLink,
  Compass,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { inquiryService } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const Contact = () => {
  const { settings } = useSettings();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cleanPhone = (settings.phone || '+91 8045811438').replace(/[^\d+]/g, '');
  const cleanWhatsapp = (settings.whatsapp || '+91 9811000000').replace(/[^\d]/g, '');
  const whatsappGreeting = encodeURIComponent(
    `Hello ${settings.companyName || 'NiceLamp'}, I would like to schedule an architectural consultation and inquire about showroom luminaires.`
  );

  useEffect(() => {
    document.title = `Contact Us & Lighting Showroom | ${settings.companyName || 'Lighting Studio'}`;
  }, [settings.companyName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await inquiryService.createInquiry(formData);
      setSubmitted(true);
      addToast('Inquiry received! Our team will get back to you shortly.', 'success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      addToast('Failed to submit message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* ── HERO BANNER SECTION ── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-neutral-200 overflow-hidden bg-neutral-950">
        {/* Architectural Background Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings?.contactBannerImage || '/contact-banner-new.jpg'}
            onError={(e) => {
              if (e.target.src !== '/contact-banner.jpg') {
                e.target.src = '/contact-banner.jpg';
              }
            }}
            alt="NiceLamp Flagship Experience Center & Showroom"
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000"
          />
          {/* Subtle multi-layer cinematic gradient for pristine legibility while preserving showroom architecture */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/65 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/50" />
          {/* Warm Golden & Amber Ambient Orbs */}
          <div className="absolute -top-28 -right-28 w-[32rem] h-[32rem] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Live Experience Center Status */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10"
          >
            <nav className="flex items-center gap-2 text-xs font-medium text-neutral-300 tracking-wide">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-[#D4AF37] font-semibold">Contact & Showroom</span>
            </nav>

            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-lg backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Experience Center Open • Mon – Sat 10:00 AM – 7:30 PM</span>
            </div>
          </motion.div>

          {/* Banner Main Headline & Copy */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#D4AF37] text-xs font-bold uppercase tracking-luxury mb-4 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Architectural Consultation & Trade Liaison</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-white tracking-tight leading-[1.12]">
                Experience Architectural <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#D4AF37] to-[#FDE68A]">
                  Illumination in Person
                </span>
              </h1>
              <p className="text-sm sm:text-base text-neutral-200 mt-4 leading-relaxed font-normal max-w-2xl">
                Step inside our dedicated lighting experience center to inspect physical luminaires, evaluate chromatic precision (Ra &gt; 95), or collaborate with our architectural lighting team for bespoke fixtures tailored to your space.
              </p>
            </motion.div>

            {/* Quick Action Touchpoints in Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#inquiry-form"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('inquiry-form');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    const firstInput = target.querySelector('input');
                    if (firstInput) setTimeout(() => firstInput.focus(), 500);
                  }
                }}
                className="btn-gold px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center gap-2 shadow-xl hover:shadow-2xl cursor-pointer transition-all"
              >
                <span>Request Consultation</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              {cleanPhone && (
                <a
                  href={`tel:${cleanPhone}`}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm shadow-md"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Direct Line</span>
                </a>
              )}

              {cleanWhatsapp && (
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${whatsappGreeting}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </a>
              )}

              <Link
                to="/catalog"
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* 4 Architectural Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-white/15"
          >
            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5 text-white">
                <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-serif-luxury font-bold text-xs sm:text-sm">Flagship Showroom</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                Physical luminaires, material finishes & live 2700K–4000K CCT tuning displays.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5 text-white">
                <Compass className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-serif-luxury font-bold text-xs sm:text-sm">Architectural Liaison</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                Dedicated project review, photometric calculations & trade quotations in 1 business day.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5 text-white">
                <Layers className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-serif-luxury font-bold text-xs sm:text-sm">Custom Engineering</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                Bespoke sizing, multi-tier drops up to 10m & custom metal finishes.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5 text-white">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-serif-luxury font-bold text-xs sm:text-sm">Direct Trade Pricing</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                Preferential manufacturing rates & 100% insured crated transit across India.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT: CONTACT DETAILS & INQUIRY FORM ── */}
      <div id="inquiry-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 space-y-6 shadow-sm">
              <div>
                <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block mb-1">
                  Experience Center
                </span>
                <h3 className="font-serif-luxury text-xl text-neutral-900 font-bold">
                  {settings.companyName || 'Lighting Studio'}
                </h3>
              </div>

              {settings.address && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-600">
                  <MapPin className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block mb-0.5">Showroom & Works</strong>
                    <span className="leading-relaxed">{settings.address}</span>
                  </div>
                </div>
              )}

              {settings.phone && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-600">
                  <Phone className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block mb-0.5">Direct Line</strong>
                    <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="hover:text-neutral-900 transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              )}

              {settings.email && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-600">
                  <Mail className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block mb-0.5">Inquiries</strong>
                    <a href={`mailto:${settings.email}`} className="hover:text-neutral-900 transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3.5 text-xs text-neutral-600">
                <Clock className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block mb-0.5">Showroom Operating Hours</strong>
                  <span>Monday – Saturday: 10:00 AM – 7:30 PM</span>
                  <span className="text-neutral-400 block mt-0.5">Closed on Sundays & Holidays</span>
                </div>
              </div>

              {settings.whatsapp && (
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-luxury flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Direct WhatsApp Consultation</span>
                  </a>
                </div>
              )}

              {/* Showroom Interactive Map Preview */}
              {settings.address && (
                <div className="pt-4 border-t border-neutral-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-luxury text-neutral-500 font-semibold">
                      Location & Works
                    </span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#DC2626] hover:text-neutral-900 font-semibold transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-neutral-200 h-44 relative bg-neutral-100">
                    <iframe
                      title="Showroom Location Map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact & Project Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#DC2626]" />
                  </div>
                  <h3 className="text-2xl font-serif-luxury text-neutral-900 font-bold mb-2">Message Dispatched</h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for contacting us. Our team will review your message and get back to you within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline-gold px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-luxury"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif-luxury text-2xl text-neutral-900 font-bold mb-2">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-neutral-500 mb-8 leading-relaxed font-normal">
                    Share your requirements, desired lamp designs, or questions below. Our team is happy to assist you!
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-600 mb-1 font-semibold">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikram Singhania"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#DC2626] text-sm shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-600 mb-1 font-semibold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. vikram@studio.com"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#DC2626] text-sm shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-600 mb-1 font-semibold">
                          Telephone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98000 00000"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#DC2626] text-sm shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-600 mb-1 font-semibold">
                          Studio / Architecture Firm
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Studio Architects LLP"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#DC2626] text-sm shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-neutral-600 mb-1 font-semibold">
                        Project Details / Required Luminaires *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Specify fixture models, project location, finishes, and quantities required..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#DC2626] text-sm resize-none shadow-sm"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-gold w-full sm:w-auto px-10 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Transmitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Dispatch Inquiry
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
kCircle2,
  ChevronRight,
  Sparkles,
  Building2,
  ShieldCheck,
  Layers,
  ArrowDown,
  ExternalLink,
  Compass,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { inquiryService } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const Contact = () => {
  const { settings } = useSettings();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cleanPhone = (settings.phone || '+91 8045811438').replace(/[^\d+]/g, '');
  const cleanWhatsapp = (settings.whatsapp || '+91 9811000000').replace(/[^\d]/g, '');
  const whatsappGreeting = encodeURIComponent(
    `Hello ${settings.companyName || 'NiceLamp'}, I would like to schedule an architectural consultation and inquire about showroom luminaires.`
  );

  useEffect(() => {
    document.title = `Contact Us & Lighting Showroom | ${settings.companyName || 'Lighting Studio'}`;
  }, [settings.companyName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please complete all required fields.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await inquiryService.createInquiry(formData);
      setSubmitted(true);
      addToast('Inquiry received! Our team will get back to you shortly.', 'success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      addToast('Failed to submit message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* ── HERO BANNER SECTION ── */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 border-b border-neutral-200 overflow-hidden bg-neutral-950">
        {/* Architectural Background Photography */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings?.contactBannerImage || '/contact-banner-new.jpg'}
            onError={(e) => {
              if (e.target.src !== '/contact-banner.jpg') {
                e.target.src = '/contact-banner.jpg';
              }
            }}
            alt="NiceLamp Flagship Experience Center & Showroom"
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.88] contrast-[1.08] transition-transform duration-1000"
          />
          {/* Subtle multi-layer cinematic gradient for pristine legibility while preserving showroom architecture */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/65 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/50" />
          {/* Warm Golden & Amber Ambient Orbs */}
          <div className="absolute -top-28 -right-28 w-[32rem] h-[32rem] bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Live Experience Center Status */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-10"
          >
            <nav className="flex items-center gap-2 text-xs font-medium text-neutral-300 tracking-wide">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-[#D4AF37] font-semibold">Contact & Showroom</span>
            </nav>

            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium shadow-lg backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Experience Center Open • Mon – Sat 10:00 AM – 7:30 PM</span>
            </div>
          </motion.div>

          {/* Banner Main Headline & Copy */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#D4AF37] text-xs font-bold uppercase tracking-luxury mb-4 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Architectural Consultation & Trade Liaison</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-white tracking-tight leading-[1.12]">
                Experience Architectural <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#D4AF37] to-[#FDE68A]">
                  Illumination in Person
                </span>
              </h1>
              <p className="text-sm sm:text-base text-neutral-200 mt-4 leading-relaxed font-normal max-w-2xl">
                Step inside our dedicated lighting experience center to inspect physical luminaires, evaluate chromatic precision (Ra &gt; 95), or collaborate with our architectural lighting team for bespoke fixtures tailored to your space.
              </p>
            </motion.div>

            {/* Quick Action Touchpoints in Banner */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <a
                href="#inquiry-form"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('inquiry-form');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    const firstInput = target.querySelector('input');
                    if (firstInput) setTimeout(() => firstInput.focus(), 500);
                  }
                }}
                className="btn-gold px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center gap-2 shadow-xl hover:shadow-2xl cursor-pointer transition-all"
              >
                <span>Request Consultation</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              {cleanPhone && (
                <a
                  href={`tel:${cleanPhone}`}
                  className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm shadow-md"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Direct Line</span>
                </a>
              )}

              {cleanWhatsapp && (
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${whatsappGreeting}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/90 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Concierge</span>
                </a>
              )}

              <Link
                to="/catalog"
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-xs font-bold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* 4 Architectural Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-white/15"
          >
            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5 text-white">
                <Building2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-serif-luxury font-bold text-xs sm:text-sm">Flagship Showroom</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                Physical luminaires, material finishes & live 2700K–4000K CCT tuning displays.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5 text-white">
                <Compass className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-serif-luxury font-bold text-xs sm:text-sm">Architectural Liaison</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                Dedicated project review, photometric calculations & trade quotations in 1 business day.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5 text-white">
                <Layers className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-serif-luxury font-bold text-xs sm:text-sm">Custom Engineering</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                Bespoke sizing, multi-tier drops up to 10m & custom metal finishes.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-white/15 backdrop-blur-md hover:border-[#D4AF37]/50 transition-colors">
              <div className="flex items-center gap-2.5 mb-1.5 text-white">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-serif-luxury font-bold text-xs sm:text-sm">Direct Trade Pricing</span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed">
                Preferential manufacturing rates & 100% insured crated transit across India.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MAIN CONTENT: CONTACT DETAILS & INQUIRY FORM ── */}
      <div id="inquiry-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-white border border-neutral-200 space-y-6 shadow-sm">
              <div>
                <span className="text-xs uppercase tracking-luxury text-[#DC2626] font-bold block mb-1">
                  Experience Center
                </span>
                <h3 className="font-serif-luxury text-xl text-neutral-900 font-bold">
                  {settings.companyName || 'Lighting Studio'}
                </h3>
              </div>

              {settings.address && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-600">
                  <MapPin className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block mb-0.5">Showroom & Works</strong>
                    <span className="leading-relaxed">{settings.address}</span>
                  </div>
                </div>
              )}

              {settings.phone && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-600">
                  <Phone className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block mb-0.5">Direct Line</strong>
                    <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="hover:text-neutral-900 transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              )}

              {settings.email && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-600">
                  <Mail className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 block mb-0.5">Inquiries</strong>
                    <a href={`mailto:${settings.email}`} className="hover:text-neutral-900 transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3.5 text-xs text-neutral-600">
                <Clock className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900 block mb-0.5">Showroom Operating Hours</strong>
                  <span>Monday – Saturday: 10:00 AM – 7:30 PM</span>
                  <span className="text-neutral-400 block mt-0.5">Closed on Sundays & Holidays</span>
                </div>
              </div>

              {settings.whatsapp && (
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-luxury flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Direct WhatsApp Consultation</span>
                  </a>
                </div>
              )}

              {/* Showroom Interactive Map Preview */}
              {settings.address && (
                <div className="pt-4 border-t border-neutral-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-luxury text-neutral-500 font-semibold">
                      Location & Works
                    </span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#DC2626] hover:text-neutral-900 font-semibold transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-neutral-200 h-44 relative bg-neutral-100">
                    <iframe
                      title="Showroom Location Map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact & Project Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-neutral-200 shadow-sm">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#DC2626]" />
                  </div>
                  <h3 className="text-2xl font-serif-luxury text-neutral-900 font-bold mb-2">Message Dispatched</h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for contacting us. Our team will review your message and get back to you within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline-gold px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-luxury"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif-luxury text-2xl text-neutral-900 font-bold mb-2">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-neutral-500 mb-8 leading-relaxed font-normal">
                    Share your requirements, desired lamp designs, or questions below. Our team is happy to assist you!
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-600 mb-1 font-semibold">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikram Singhania"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#DC2626] text-sm shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-600 mb-1 font-semibold">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. vikram@studio.com"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#DC2626] text-sm shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-600 mb-1 font-semibold">
                          Telephone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98000 00000"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#DC2626] text-sm shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-600 mb-1 font-semibold">
                          Studio / Architecture Firm
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Studio Architects LLP"
                          className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#DC2626] text-sm shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-neutral-600 mb-1 font-semibold">
                        Project Details / Required Luminaires *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Specify fixture models, project location, finishes, and quantities required..."
                        className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#DC2626] text-sm resize-none shadow-sm"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-gold w-full sm:w-auto px-10 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Transmitting...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Dispatch Inquiry
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
