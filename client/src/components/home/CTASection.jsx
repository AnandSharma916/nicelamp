import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, FileText, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { InquiryModal } from '../common/InquiryModal';
import { useSettings } from '../../context/SettingsContext';

export const CTASection = ({ section }) => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const { settings } = useSettings();

  const title = section?.title || 'Need Help Choosing the Right Light?';
  const subtitle = section?.subtitle || 'PERSONALIZED LIGHTING ADVICE';
  const description =
    section?.description ||
    'Whether you are decorating a single room or planning lighting for an entire home or project, our lighting specialists are here to guide you with styles, sizes, and direct prices.';
  const primaryBtnText = section?.buttonText || 'Send Quick Inquiry';
  const secondaryBtnText = section?.secondaryButtonText || 'Browse Full Catalog';
  const secondaryBtnLink = section?.secondaryButtonLink || '/catalog';

  const whatsappNumber = (settings?.whatsapp || '+919999000000').replace(/[^\d]/g, '');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello! I would like recommendations and pricing for decorative lighting for my home.'
  )}`;

  return (
    <>
      <section className="py-20 sm:py-24 bg-[#f8fafc] relative overflow-hidden border-t border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-white border border-neutral-200 p-8 sm:p-12 shadow-xl text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#DC2626]" />
              <span className="text-xs uppercase tracking-wider text-[#DC2626] font-bold">
                {subtitle}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-neutral-900 tracking-tight leading-tight max-w-2xl mx-auto mb-4">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed mb-8">
              {description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setInquiryOpen(true)}
                className="btn-gold px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center gap-2 shadow-md hover:brightness-105 transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>{primaryBtnText}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-neutral-300 hover:border-[#DC2626] bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold uppercase tracking-luxury shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#DC2626]" />
                <span>Chat on WhatsApp</span>
              </a>

              <Link
                to={secondaryBtnLink}
                className="btn-outline-gold px-6 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{secondaryBtnText}</span>
              </Link>
            </div>

            {/* Simple Assurance Points */}
            <div className="mt-10 pt-6 border-t border-neutral-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-600">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626]" /> Instant WhatsApp Quotes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626]" /> Custom Sizing Available
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626]" /> Doorstep Safe Delivery
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
};
