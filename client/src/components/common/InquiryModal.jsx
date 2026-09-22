import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, Phone, Mail, Building } from 'lucide-react';
import { inquiryService } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const InquiryModal = ({ isOpen, onClose, product = null }) => {
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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: product
          ? `Hello, I would like to enquire about the technical specifications, lead times, and trade pricing for ${product.name} (SKU: ${product.sku}).`
          : 'Hello, I would like to request technical specifications and a consultation regarding your architectural lighting solutions.',
      });
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    try {
      setSubmitting(true);
      await inquiryService.createInquiry({
        ...formData,
        productId: product?._id,
      });
      setSubmitted(true);
      addToast('Your inquiry has been sent to our lighting consultants.', 'success');
    } catch (err) {
      addToast(err.response?.data?.message || 'Failed to submit inquiry. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-[#14171d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] my-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="p-6 md:p-8 py-12 text-center overflow-y-auto modal-scrollbar">
                <div className="w-16 h-16 rounded-full bg-[#CC1F1F]/10 border border-[#CC1F1F]/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#CC1F1F]" />
                </div>
                <h3 className="text-2xl font-serif-luxury text-white mb-2">Inquiry Received</h3>
                <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
                  Thank you, <span className="text-white font-medium">{formData.name}</span>. An architectural lighting specialist will review your request and get in touch within 24 hours.
                </p>
                <button
                  onClick={onClose}
                  className="btn-gold px-8 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-luxury"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="p-6 md:p-8 overflow-y-auto modal-scrollbar">
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-luxury text-[#CC1F1F] font-semibold">
                    Product & Technical Enquiry
                  </span>
                  <h3 className="text-2xl font-serif-luxury text-white mt-1">
                    {product ? product.name : 'Request Luminaire Specification'}
                  </h3>
                  {product && (
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#CC1F1F]/10 text-[#CC1F1F] border border-[#CC1F1F]/20">
                        SKU: {product.sku}
                      </span>
                      {product.category?.name && (
                        <span className="text-xs text-neutral-400">Category: {product.category.name}</span>
                      )}
                    </div>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#CC1F1F] text-sm"
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
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#CC1F1F] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98000 00000"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#CC1F1F] text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                        Company / Architectural Studio
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Studio Design Ltd."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#CC1F1F] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-neutral-400 mb-1 font-medium">
                      Inquiry Details / Project Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#0b0c10] border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-[#CC1F1F] text-sm resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-5 py-2.5 text-xs uppercase tracking-luxury text-neutral-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-gold px-7 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-luxury flex items-center gap-2 disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" /> Send Inquiry
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
