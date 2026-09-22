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
    'Hello NiceLamp! I would like recommendations and pricing for decorative lighting for my home.'
  )}`;

  return (
    <>
      <section className="py-20 sm:py-24 bg-[#0b0f17] relative overflow-hidden border-t border-white/5">
        {/* Warm Amber Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-[#161e2c] border border-[#D4AF37]/30 p-8 sm:p-12 shadow-2xl text-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-xs uppercase tracking-wider text-[#FDE68A] font-bold">
                {subtitle}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto mb-4">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed mb-8">
              {description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setInquiryOpen(true)}
                className="btn-gold px-7 py-3.5 rounded-xl text-xs font-bold uppercase tracking-luxury flex items-center gap-2 shadow-xl hover:brightness-110 transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>{primaryBtnText}</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/20 hover:border-[#D4AF37]/60 bg-[#0b0f17]/60 hover:bg-[#0b0f17] text-white text-xs font-bold uppercase tracking-luxury transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#F59E0B]" />
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
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Instant WhatsApp Quotes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Custom Sizing Available
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Safe Pan-India Delivery
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
};
