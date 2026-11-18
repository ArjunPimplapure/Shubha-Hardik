import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingConfig';
import { IntertwinedHeartDivider, MandalaWatermark } from './RoyalOrnaments';
import { WeddingLogo } from './WeddingLogo';

export const HeroInvitation: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mandalaY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -28]);

  const scrollToNext = () => {
    const next = document.getElementById('countdown');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="invitation"
      className="relative min-h-[92dvh] flex flex-col items-center justify-center pt-16 pb-14 sm:pt-20 sm:pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Parallax Rotating Royal Mandala Backdrop */}
      <motion.div
        style={{ y: mandalaY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <MandalaWatermark className="w-[460px] h-[460px] sm:w-[760px] sm:h-[760px] text-[#C59B38]/24 animate-slow-spin" />
      </motion.div>

      {/* Luminous Warm Golden Halo */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[620px] sm:h-[620px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,250,228,0.85) 0%, rgba(241,217,138,0.22) 48%, transparent 74%)',
        }}
      />

      {/* Open Editorial Sanctuary (No boxy PDF frame) */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-3xl w-full mx-auto text-center flex flex-col items-center"
      >
        {/* Top Ornamental Mughal Crown Line */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.7 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-40 sm:w-56 h-[1px] bg-gradient-to-r from-transparent via-[#C59B38] to-transparent mb-5"
          aria-hidden="true"
        />

        {/* Sacred Devanagari Invocation */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
        >
          <p className="font-devanagari text-2xl sm:text-3xl md:text-4xl font-semibold text-[#8E6B23] tracking-wide">
            {WEDDING_DATA.religiousHeading}
          </p>
        </motion.div>

        {/* Official Wedding Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.22 }}
          className="my-6 sm:my-7 flex justify-center"
        >
          <WeddingLogo sizeClass="w-32 h-32 sm:w-44 sm:h-44" />
        </motion.div>

        {/* Blessings Lead Copy */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.34 }}
          className="max-w-lg mx-auto space-y-2"
        >
          <p className="font-serif-royal italic text-lg sm:text-2xl text-[#4A2E2A] leading-relaxed">
            {WEDDING_DATA.invitationLead}
          </p>
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-[#7D5A18] font-medium pt-1">
            {WEDDING_DATA.invitationPrompt}
          </p>
        </motion.div>

        {/* BRIDE'S DETAILS — Prominent Editorial Typography */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.85, delay: 0.44 }}
          className="mt-8 sm:mt-10 px-2"
        >
          <h1
            className="font-serif-royal text-5xl sm:text-7xl font-semibold tracking-wide text-[#5C1622] leading-[1.06]"
            style={{ textWrap: 'balance' }}
          >
            {WEDDING_DATA.bride.name}
          </h1>
          <div className="mt-3 space-y-1 text-sm sm:text-base text-[#3D2522]">
            <p className="font-medium text-[#4B2327]">{WEDDING_DATA.bride.parents}</p>
            <p className="font-serif-royal italic text-base sm:text-xl text-[#6E4943]">
              {WEDDING_DATA.bride.grandparents}
            </p>
          </div>
        </motion.div>

        {/* Intertwined Heart & Floral Separator */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.65 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="my-7 sm:my-9 w-full"
        >
          <IntertwinedHeartDivider />
        </motion.div>

        {/* GROOM'S DETAILS */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, delay: 0.18 }}
          className="px-2"
        >
          <h2
            className="font-serif-royal text-4xl sm:text-6xl font-semibold tracking-wide text-[#5C1622] leading-[1.1]"
            style={{ textWrap: 'balance' }}
          >
            {WEDDING_DATA.groom.name}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#3D2522] font-medium">
            {WEDDING_DATA.groom.parents}
          </p>
        </motion.div>

        {/* Scroll Down Cue */}
        <motion.button
          type="button"
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="mt-10 sm:mt-12 inline-flex flex-col items-center gap-1.5 text-xs uppercase tracking-[0.24em] text-[#8E6B23] hover:text-[#5C1622] transition-colors min-h-[44px] px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg"
        >
          <span>Scroll to Explore</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
};
