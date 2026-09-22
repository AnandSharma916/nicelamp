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
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Building2,
  ShieldCheck,
  Layers,
  ArrowDown,
  ExternalLink,
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

  useEffect(() => {
    document.title = `Contact & Architectural Showroom | ${settings.companyName || 'LightHut'}`;
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
      addToast('Inquiry received. Our engineering consultant will respond shortly.', 'success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      addToast('Failed to submit message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#090a0d] min-h-screen">
      {/* ── HERO BANNER SECTION ── */}
      <section className="relative pt-28 pb-16 lg:pt-32 lg:pb-20 border-b border-white/10 overflow-hidden bg-[#0a0c10]">
        {/* Architectural Background Photography with Cinematic Lighting */}
        <div className="absolute inset-0 z-0">
          <img
            src={settings?.contactBannerImage || '/contact-banner.jpg'}
            alt={`${settings.companyName || 'LightHut'} Architectural Experience Center & Lighting Showroom`}
            className="w-full h-full object-cover object-center transform scale-105 filter brightness-[0.75] contrast-[1.08] transition-transform duration-1000"
          />
          {/* Multi-layered Gradients & Dark Glass Tint */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#090a0d] via-[#090a0d]/85 to-[#090a0d]/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/35 to-black/65" />
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#CC1F1F]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 right-1/4 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
          {/* Geometric Architectural Blueprint Grid Accent */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Live Experience Center Status */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-8"
          >
            <nav className="flex items-center gap-2 text-xs font-medium text-neutral-400 tracking-wide">
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
              <span className="text-[#CC1F1F] font-semibold">Contact & Architectural Showroom</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-medium shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Experience Center Active • New Delhi</span>
            </div>
          </motion.div>

          {/* Banner Main Headline & Copy */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-[#CC1F1F] font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#CC1F1F]" />
                Architectural Consultation & Trade Liaison
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-luxury font-bold text-white tracking-tight leading-[1.15]">
                Let’s Illuminate Your Architectural Vision
              </h1>
              <p className="text-sm sm:text-base text-neutral-300 mt-4 leading-relaxed font-light max-w-2xl">
                Visit our dedicated lighting experience center to inspect physical luminaires, evaluate chromatic precision, or collaborate with our optical engineers for custom Dialux photometric calculations and bespoke fixture engineering.
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
                  document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-gold px-6 py-3 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 shadow-xl hover:shadow-[#CC1F1F]/30 transition-all cursor-pointer"
              >
                <span>Request Consultation</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              {settings.phone && (
                <a
                  href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#CC1F1F]" />
                  <span>Direct Line</span>
                </a>
              )}

              {settings.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-950/70 border border-emerald-500/30 text-emerald-200 text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 transition-all backdrop-blur-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Desk</span>
                </a>
              )}
            </motion.div>
          </div>

          {/* 4 Architectural Feature Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-white/10"
          >
            <div className="p-4 rounded-xl bg-[#14171d]/70 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-1 text-white">
                <Building2 className="w-4 h-4 text-[#CC1F1F]" />
                <span className="font-serif-luxury font-bold text-xs">Flagship Showroom</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Physical luminaires, material finishes & mockup displays in Delhi.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#14171d]/70 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-1 text-white">
                <Clock className="w-4 h-4 text-[#CC1F1F]" />
                <span className="font-serif-luxury font-bold text-xs">24h Turnaround</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Rapid technical review & trade quotations within 1 business day.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#14171d]/70 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-1 text-white">
                <Layers className="w-4 h-4 text-[#CC1F1F]" />
                <span className="font-serif-luxury font-bold text-xs">Dialux & IES</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Full photometric files and lux-level layout assistance for projects.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#14171d]/70 border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-1 text-white">
                <ShieldCheck className="w-4 h-4 text-[#CC1F1F]" />
                <span className="font-serif-luxury font-bold text-xs">Trade Volume Rates</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-snug">
                Direct manufacturing volume rates for architects & builders.
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
            <div className="p-8 rounded-2xl bg-[#14171d] border border-white/10 space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-luxury text-[#CC1F1F] font-bold block mb-1">
                  Experience Center
                </span>
                <h3 className="font-serif-luxury text-xl text-white font-bold">
                  {settings.companyName}
                </h3>
              </div>

              {settings.address && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                  <MapPin className="w-5 h-5 text-[#CC1F1F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Showroom & Manufacturing Works</strong>
                    <span className="leading-relaxed">{settings.address}</span>
                  </div>
                </div>
              )}

              {settings.phone && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                  <Phone className="w-5 h-5 text-[#CC1F1F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Direct Line</strong>
                    <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              )}

              {settings.email && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                  <Mail className="w-5 h-5 text-[#CC1F1F] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Engineering Inquiries</strong>
                    <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                <Clock className="w-5 h-5 text-[#CC1F1F] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Showroom Operating Hours</strong>
                  <span>Monday – Saturday: 10:00 AM – 7:30 PM (IST)</span>
                  <span className="text-neutral-500 block mt-0.5">Closed on Sundays & National Holidays</span>
                </div>
              </div>

              {settings.whatsapp && (
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-950/70 border border-emerald-700/50 hover:bg-emerald-900 text-emerald-200 text-xs font-semibold uppercase tracking-luxury flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Direct WhatsApp Consultation</span>
                  </a>
                </div>
              )}

              {/* Showroom Interactive Map Preview */}
              {settings.address && (
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-luxury text-neutral-400 font-medium">
                      Location & Works
                    </span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#CC1F1F] hover:text-white transition-colors"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-white/10 h-44 relative bg-[#090a0d]">
                    <iframe
                      title="Showroom Location Map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(settings.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full filter invert-[0.9] hue-rotate-[180deg] contrast-125 opacity-85"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Contact & Project Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#14171d] border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#CC1F1F]/15 border border-[#CC1F1F]/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#CC1F1F]" />
                  </div>
                  <h3 className="text-2xl font-serif-luxury text-white font-bold mb-2">Message Dispatched</h3>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for contacting {settings.companyName || 'LightHut'}. Our team will review your specifications and get back to you within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline-gold px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-luxury"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif-luxury text-2xl text-white font-bold mb-2">
                    Request Technical Consultation
                  </h3>
                  <p className="text-xs text-neutral-400 mb-8 leading-relaxed">
                    Please provide your project context, luminaire quantities, or specific requirements below.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Vikram Singhania"
                          className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#CC1F1F] text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. vikram@studio.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#CC1F1F] text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                          Telephone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98000 00000"
                          className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#CC1F1F] text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                          Studio / Architecture Firm
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Studio Architects LLP"
                          className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#CC1F1F] text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                        Project Details / Required Luminaires *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Specify fixture models (e.g. LH-6031W), project location, finishes, and quantities required..."
                        className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#CC1F1F] text-sm resize-none"
                      />
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-gold w-full sm:w-auto px-10 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center justify-center gap-2 shadow-2xl disabled:opacity-50"
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
