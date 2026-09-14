import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageSquare, Send, Clock, Loader2, CheckCircle2 } from 'lucide-react';
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
    document.title = 'Contact & Architectural Showroom | LightHut Decorative Solutions';
  }, []);

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
    <div className="pt-24 pb-20 bg-[#090a0d] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-white/10 mb-12">
        <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-semibold block mb-2">
          Consultation & Trade Supply
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury font-bold text-white tracking-tight">
          Contact & Architectural Showroom
        </h1>
        <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
          Whether you require bespoke project engineering, photometrics, physical sample inspection, or trade volume quotes, our lighting engineers are at your disposal.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-[#14171d] border border-white/10 space-y-6 shadow-xl">
              <div>
                <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-bold block mb-1">
                  Experience Center
                </span>
                <h3 className="font-serif-luxury text-xl text-white font-bold">
                  {settings.companyName}
                </h3>
              </div>

              {settings.address && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                  <MapPin className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Showroom & Manufacturing Works</strong>
                    <span className="leading-relaxed">{settings.address}</span>
                  </div>
                </div>
              )}

              {settings.phone && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                  <Phone className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
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
                  <Mail className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Engineering Inquiries</strong>
                    <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                <Clock className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
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
            </div>
          </div>

          {/* Right Column: Contact & Project Request Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#14171d] border border-white/10 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#c5a880]" />
                  </div>
                  <h3 className="text-2xl font-serif-luxury text-white font-bold mb-2">Message Dispatched</h3>
                  <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you for contacting LightHut. Our architectural engineering team will review your specifications and get back to you within one business day.
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
                          className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5a880] text-sm"
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
                          className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5a880] text-sm"
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
                          className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5a880] text-sm"
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
                          className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5a880] text-sm"
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
                        className="w-full px-4 py-3 rounded-xl bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5a880] text-sm resize-none"
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
