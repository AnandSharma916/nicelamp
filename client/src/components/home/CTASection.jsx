import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { InquiryModal } from '../common/InquiryModal';

export const CTASection = ({ section }) => {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const title = section?.title || 'Consult With An Architectural Lighting Specialist';
  const subtitle = section?.subtitle || 'Tailored Luminaire Solutions For Your Project';
  const description =
    section?.description ||
    'Have a bespoke requirement or need comprehensive photometric spec sheets, IES files, or commercial volume pricing? Our engineering team is ready to assist.';
  const primaryBtnText = section?.buttonText || 'Request Technical Consultation';
  const secondaryBtnText = section?.secondaryButtonText || 'Explore Catalog Specifications';
  const secondaryBtnLink = section?.secondaryButtonLink || '/catalog';

  return (
    <>
      <section className="py-24 bg-[#0d0f14] relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#CC1F1F]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-br from-[#181b22] to-[#111318] border border-[#CC1F1F]/30 p-8 sm:p-14 shadow-2xl text-center"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#CC1F1F]/10 border border-[#CC1F1F]/20 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#CC1F1F]" />
              <span className="text-xs uppercase tracking-luxury text-[#CC1F1F] font-semibold">
                {subtitle}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-6">
              {title}
            </h2>

            <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              {description}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setInquiryOpen(true)}
                className="btn-gold px-8 py-4 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2.5 shadow-2xl"
              >
                <Send className="w-4 h-4" />
                <span>{primaryBtnText}</span>
              </button>

              <Link
                to={secondaryBtnLink}
                className="btn-outline-gold px-8 py-4 rounded-xl text-xs font-semibold uppercase tracking-luxury flex items-center gap-2.5"
              >
                <FileText className="w-4 h-4" />
                <span>{secondaryBtnText}</span>
              </Link>
            </div>

            {/* Specifier Assurance Points */}
            <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-neutral-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#CC1F1F]" /> 48-Hour Technical Quotes
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#CC1F1F]" /> Photometric & IES Data
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#CC1F1F]" /> Bespoke Custom Finishes
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <InquiryModal isOpen={inquiryOpen} onClose={() => setInquiryOpen(false)} />
    </>
  );
};
