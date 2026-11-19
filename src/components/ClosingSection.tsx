import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { RotateCcw } from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingConfig';
import { AmbientParticles } from './AmbientParticles';
import { RoyalSectionDivider } from './RoyalOrnaments';
import { WeddingLogo } from './WeddingLogo';

interface ClosingSectionProps {
  onReplayCurtains: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ onReplayCurtains }) => {
  const footerRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.78, 1.15]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.25, 0.75, 1]);

  return (
    <footer
      ref={footerRef}
      className="relative pt-14 pb-28 sm:pt-20 sm:pb-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Soft closing ambient glow + floating petals/sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <AmbientParticles intensity="rich" />
      </div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          scale: glowScale,
          opacity: glowOpacity,
          background:
            'radial-gradient(ellipse at center, rgba(244,220,224,0.42) 0%, rgba(241,217,138,0.22) 45%, transparent 75%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 34, filter: 'blur(4px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center"
      >
        <RoyalSectionDivider className="mb-9" />

        <p
          className="font-serif-royal italic text-2xl sm:text-4xl text-[#4A2E2A] max-w-xl leading-relaxed"
          style={{ textWrap: 'balance' }}
        >
          {WEDDING_DATA.closing.message}
        </p>

        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0.94, letterSpacing: '0.16em' }}
          whileInView={{ opacity: 1, y: 0, scale: 1, letterSpacing: '0.05em' }}
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 font-serif-royal text-4xl sm:text-6xl font-semibold text-[#5C1622]"
        >
          {WEDDING_DATA.closing.couple}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.86, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="my-8"
        >
          <WeddingLogo sizeClass="w-28 h-28 sm:w-36 sm:h-36" />
        </motion.div>

        <RoyalSectionDivider className="mb-7" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -30px 0px' }}
          transition={{ duration: 0.75, delay: 0.18 }}
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-[#8E6B23] font-medium">
            {WEDDING_DATA.closing.regards}
          </p>
          <p className="mt-2 font-serif-royal text-2xl sm:text-3xl font-semibold text-[#5C1622]">
            {WEDDING_DATA.closing.hostLine}
          </p>
        </motion.div>

        {/* Discreet Replay Opening Curtains option */}
        <div className="mt-10 pt-6 border-t border-[#D4AF37]/25 w-full max-w-xs flex justify-center">
          <button
            type="button"
            onClick={onReplayCurtains}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#7D5A18] hover:text-[#5C1622] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="whitespace-nowrap">Replay Opening Curtains</span>
          </button>
        </div>
      </motion.div>
    </footer>
  );
};
