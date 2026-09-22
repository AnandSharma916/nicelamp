import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, MessageSquare, Send, Clock, Loader2, Sparkles } from 'lucide-react';
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

  const title = section?.title || 'Visit or Contact Us';
  const subtitle = section?.subtitle || 'WE ARE HERE TO HELP';
  const description =
    section?.description ||
    'Have questions about lamp specifications, custom sizes, or delivery? Our lighting team is happy to assist you.';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please provide your name, email, and message.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await inquiryService.createInquiry(formData);
      addToast('Message sent successfully! Our team will contact you soon.', 'success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (err) {
      addToast('Failed to submit message. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#0b0f17] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161e2c] border border-[#D4AF37]/30 text-[10px] uppercase tracking-wider text-[#FDE68A] font-bold mb-3">
            <Sparkles className="w-3 h-3 text-[#F59E0B]" />
            <span>{subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Contact Details & Showroom */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#161e2c] border border-white/10 space-y-5 shadow-xl">
              <h3 className="font-serif-luxury text-lg text-white font-bold">
                Direct Contact
              </h3>

              {settings.address && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                  <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block mb-0.5">Showroom & Store</span>
                    <span>{settings.address}</span>
                  </div>
                </div>
              )}

              {settings.phone && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                  <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block mb-0.5">Phone & Call</span>
                    <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`} className="hover:text-white transition-colors">
                      {settings.phone}
                    </a>
                  </div>
                </div>
              )}

              {settings.email && (
                <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                  <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-semibold block mb-0.5">Email</span>
                    <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                      {settings.email}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3.5 text-xs text-neutral-300">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block mb-0.5">Opening Hours</span>
                  <span>Monday – Saturday: 10:00 AM – 8:00 PM</span>
                </div>
              </div>

              {settings.whatsapp && (
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-emerald-950/60 border border-emerald-600/40 hover:bg-emerald-900/80 text-emerald-200 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>Quick WhatsApp Chat</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Simple Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#161e2c] border border-white/10 shadow-2xl">
              <h3 className="font-serif-luxury text-xl text-white font-bold mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-neutral-300 mb-6">
                Fill in your details below and our team will get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98000 00000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1 font-medium">
                      City / Area
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Delhi, Mumbai, Bengaluru"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1 font-medium">
                    What lights are you looking for? *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the room, preferred style (chandeliers, wall lights, pendants), or any specific models you liked..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0f17] border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:border-[#D4AF37] text-sm resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-gold w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
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
