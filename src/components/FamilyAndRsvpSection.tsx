import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Phone } from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingConfig';
import { RoyalSectionDivider } from './RoyalOrnaments';

export const FamilyAndRsvpSection: React.FC = () => {
  return (
    <div className="relative">
      {/* FAMILY COMPLEMENTS SECTION — Symmetrical 2-col layout across phone & desktop */}
      <section className="relative py-14 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#8E6B23] font-semibold">
              Warmest Wishes
            </p>
            <h2
              className="mt-2 font-serif-royal text-3xl sm:text-5xl font-semibold text-[#5C1622] tracking-wide"
              style={{ textWrap: 'balance' }}
            >
              WITH COMPLIMENTS FROM
            </h2>
            <RoyalSectionDivider className="mt-5 mb-9 sm:mb-10" />
          </motion.div>

          {/* Symmetrical 2-column grid on mobile & desktop so phone matches desktop layout */}
          <div className="grid grid-cols-2 gap-y-5 gap-x-4 sm:gap-y-6 sm:gap-x-10 max-w-xl mx-auto">
            {WEDDING_DATA.compliments.slice(0, 4).map((name, idx) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="py-2 border-b border-[#D4AF37]/25"
              >
                <p className="font-serif-royal text-base sm:text-3xl font-medium text-[#3B191E] tracking-wide">
                  {name}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -40px 0px' }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-[200px] sm:max-w-[260px] mx-auto py-2 border-b border-[#D4AF37]/25"
          >
            <p className="font-serif-royal text-base sm:text-3xl font-medium text-[#3B191E] tracking-wide">
              {WEDDING_DATA.compliments[4]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* RSVP SECTION */}
      <section id="rsvp" className="relative py-14 sm:py-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#8E6B23] font-semibold">
              RSVP
            </p>
            <h2
              className="mt-2 font-serif-royal text-3xl sm:text-5xl font-semibold text-[#5C1622]"
              style={{ textWrap: 'balance' }}
            >
              FOR YOUR KIND CONFIRMATION
            </h2>
            <p className="mt-3 font-serif-royal italic text-lg sm:text-xl text-[#5A3934] max-w-xl mx-auto">
              We would be delighted to have you celebrate these special moments with us.
            </p>
            <RoyalSectionDivider className="mt-5 mb-10 sm:mb-12" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {WEDDING_DATA.rsvpContacts.map((contact, idx) => (
              <motion.div
                key={contact.name}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                transition={{ duration: 0.75, delay: idx * 0.12 }}
                className="bg-[#FFFDF8]/80 backdrop-blur-sm rounded-2xl border border-[#C59B38]/55 shadow-[0_14px_38px_rgba(92,22,34,0.08)] px-6 py-7 sm:px-8 sm:py-9 flex flex-col items-center"
              >
                <h3 className="font-serif-royal text-2xl sm:text-3xl font-semibold text-[#5C1622]">
                  {contact.name}
                </h3>
                <p className="mt-1.5 text-base sm:text-lg font-medium text-[#7D5A18] tabular-nums tracking-wide">
                  {contact.displayPhone}
                </p>

                <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
                  <a
                    href={contact.telHref}
                    className="flex-1 min-w-[132px] inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl bg-[#5C1622] text-[#FAF6EE] text-xs sm:text-sm font-medium uppercase tracking-[0.14em] shadow-sm transition-all duration-200 hover:bg-[#430D16] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span className="whitespace-nowrap">Call Now</span>
                  </a>

                  <a
                    href={contact.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[132px] inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-2.5 rounded-xl border border-[#8E6B23] bg-[#FFFDF8] text-[#5C1622] text-xs sm:text-sm font-medium uppercase tracking-[0.14em] shadow-sm transition-all duration-200 hover:bg-[#F7EEDB] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0 text-[#8E6B23]" aria-hidden="true" />
                    <span className="whitespace-nowrap">WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
