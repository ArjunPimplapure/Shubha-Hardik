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

  const mandalaY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -24]);

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
      className="relative min-h-[86dvh] sm:min-h-[92dvh] flex flex-col items-center justify-center pt-12 pb-10 sm:pt-20 sm:pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Parallax Rotating Royal Mandala Backdrop */}
      <motion.div
        style={{ y: mandalaY }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <MandalaWatermark className="w-[420px] h-[420px] sm:w-[760px] sm:h-[760px] text-[#C59B38]/24 animate-slow-spin" />
      </motion.div>

      {/* Luminous Warm Golden Halo */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[620px] sm:h-[620px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,250,228,0.88) 0%, rgba(241,217,138,0.22) 48%, transparent 74%)',
        }}
      />

      {/* Open Editorial Sanctuary */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-3xl w-full mx-auto text-center flex flex-col items-center"
      >
        {/* Top Ornamental Crown Line */}
        <div
          className="w-36 sm:w-56 h-[1px] bg-gradient-to-r from-transparent via-[#C59B38] to-transparent mb-4 sm:mb-5"
          aria-hidden="true"
        />

        {/* Sacred Devanagari Invocation */}
        <p className="font-devanagari text-xl sm:text-3xl md:text-4xl font-semibold text-[#8E6B23] tracking-wide">
          {WEDDING_DATA.religiousHeading}
        </p>

        {/* Official Wedding Monogram */}
        <div className="my-4 sm:my-7 flex justify-center">
          <WeddingLogo sizeClass="w-24 h-24 sm:w-44 sm:h-44" />
        </div>

        {/* Blessings Lead Copy */}
        <div className="max-w-lg mx-auto space-y-1.5 sm:space-y-2">
          <p className="font-serif-royal italic text-base sm:text-2xl text-[#4A2E2A] leading-relaxed">
            {WEDDING_DATA.invitationLead}
          </p>
          <p className="text-[11px] sm:text-sm uppercase tracking-[0.22em] text-[#7D5A18] font-medium pt-0.5">
            {WEDDING_DATA.invitationPrompt}
          </p>
        </div>

        {/* BRIDE'S DETAILS — Prominent Editorial Typography */}
        <div className="mt-6 sm:mt-10 px-2">
          <h1
            className="font-serif-royal text-4xl sm:text-7xl font-semibold tracking-wide text-[#5C1622] leading-[1.06]"
            style={{ textWrap: 'balance' }}
          >
            {WEDDING_DATA.bride.name}
          </h1>
          <div className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1 text-xs sm:text-base text-[#3D2522]">
            <p className="font-medium text-[#4B2327]">{WEDDING_DATA.bride.parents}</p>
            <p className="font-serif-royal italic text-sm sm:text-xl text-[#6E4943]">
              {WEDDING_DATA.bride.grandparents}
            </p>
          </div>
        </div>

        {/* Intertwined Heart & Floral Separator */}
        <div className="my-5 sm:my-9 w-full">
          <IntertwinedHeartDivider />
        </div>

        {/* GROOM'S DETAILS */}
        <div className="px-2">
          <h2
            className="font-serif-royal text-3xl sm:text-6xl font-semibold tracking-wide text-[#5C1622] leading-[1.1]"
            style={{ textWrap: 'balance' }}
          >
            {WEDDING_DATA.groom.name}
          </h2>
          <p className="mt-2 sm:mt-2.5 text-xs sm:text-base text-[#3D2522] font-medium">
            {WEDDING_DATA.groom.parents}
          </p>
        </div>

        {/* Scroll Down Cue visible immediately on mobile & desktop */}
        <button
          type="button"
          onClick={scrollToNext}
          className="mt-7 sm:mt-12 inline-flex flex-col items-center gap-1 text-[11px] sm:text-xs uppercase tracking-[0.24em] text-[#8E6B23] hover:text-[#5C1622] transition-colors min-h-[44px] px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg"
        >
          <span>Scroll to Explore</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </motion.span>
        </button>
      </motion.div>
    </section>
  );
};
