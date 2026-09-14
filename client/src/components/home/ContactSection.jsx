import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageSquare, Send, Clock, Loader2 } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { inquiryService } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const ContactSection = ({ section }) => {
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

  const title = section?.title || 'Showroom & Headquarters';
  const subtitle = section?.subtitle || 'Experience Our Luminaires In Person';
  const description =
    section?.description ||
    'Visit our flagship architectural lighting experience center to inspect fixtures, evaluate color temperatures, and discuss custom engineering with our specialists.';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please provide your name, email, and message.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await inquiryService.createInquiry(formData);
      addToast('Inquiry sent successfully! Our lighting specialists will respond shortly.', 'success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      addToast('Failed to submit message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#090a0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-luxury text-[#c5a880] font-semibold block mb-2">
            {subtitle}
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact & Showroom Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#14171d] border border-white/10 space-y-4 shadow-xl">
              <h3 className="font-serif-luxury text-lg text-white font-semibold">
                Direct Communication
              </h3>

              {settings.address && (
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block mb-0.5">Showroom & Works</span>
                    <span>{settings.address}</span>
                  </div>
                </div>
              )}

              {settings.phone && (
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <Phone className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block mb-0.5">Telephone</span>
                    <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              )}

              {settings.email && (
                <div className="flex items-start gap-3 text-xs text-neutral-300">
                  <Mail className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block mb-0.5">Technical Inquiries</span>
                    <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 text-xs text-neutral-300">
                <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-medium block mb-0.5">Showroom Hours</span>
                  <span>Monday – Saturday: 10:00 AM – 7:30 PM (IST)</span>
                </div>
              </div>

              {settings.whatsapp && (
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-950/60 border border-emerald-700/50 hover:bg-emerald-900/80 text-emerald-200 text-xs font-semibold uppercase tracking-luxury flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Instant WhatsApp Consultation</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Direct Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#14171d] border border-white/10 shadow-2xl">
              <h3 className="font-serif-luxury text-xl text-white font-bold mb-2">
                Send Direct Message
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Fill in your project details and our senior lighting engineer will reach out promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajiv Kapoor"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5a880] text-sm"
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
                      placeholder="e.g. rajiv@studio.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5a880] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98000 00000"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5a880] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                      Company / Studio
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Architectural Studio"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5a880] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                    Message / Lighting Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your architectural project, schedule, quantities, or specific luminaire models..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#c5a880] text-sm resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold w-full sm:w-auto px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-luxury flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
