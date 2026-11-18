import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AmbientParticles } from './AmbientParticles';
import { WeddingLogo } from './WeddingLogo';

interface OpeningCurtainsProps {
  onCurtainTap: () => void;
  onComplete: () => void;
}

type CurtainPhase = 'closed' | 'unclasping' | 'parting';

interface Spark {
  id: number;
  angle: number;
  distance: number;
  size: number;
  delay: number;
}

const CLASP_SPARKS: Spark[] = Array.from({ length: 32 }).map((_, i) => ({
  id: i,
  angle: (i * 360) / 32 + ((i % 3) - 1) * 5,
  distance: 68 + (i % 5) * 28,
  size: 2.5 + (i % 4) * 1.6,
  delay: (i % 4) * 0.03,
}));

const VELVET_PLEATS_STYLE: React.CSSProperties = {
  backgroundImage: `
    repeating-linear-gradient(
      90deg,
      rgba(22, 2, 7, 0.72) 0%,
      rgba(92, 22, 34, 0.92) 7%,
      rgba(138, 33, 52, 0.95) 12%,
      rgba(86, 18, 30, 0.94) 17%,
      rgba(28, 4, 10, 0.78) 23%
    ),
    radial-gradient(ellipse at 50% 35%, rgba(168, 46, 68, 0.38) 0%, rgba(45, 7, 15, 0.92) 80%)
  `,
  backgroundColor: '#3B0B14',
};

export const OpeningCurtains: React.FC<OpeningCurtainsProps> = ({
  onCurtainTap,
  onComplete,
}) => {
  const [phase, setPhase] = useState<CurtainPhase>('closed');
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleOpen = () => {
    if (phase !== 'closed') return;

    // Trigger wedding audio directly inside the user click/tap gesture
    onCurtainTap();

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setPhase('parting');
      timersRef.current.push(window.setTimeout(onComplete, 550));
      return;
    }

    setPhase('unclasping');
    timersRef.current.push(
      window.setTimeout(() => setPhase('parting'), 420),
      window.setTimeout(() => onComplete(), 2750),
    );
  };

  const isParting = phase === 'parting';

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Royal Wedding Curtains Opening"
    >
      {/* Golden backlit glow sweeping across as curtains part */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: isParting ? [0, 0.85, 0] : 0 }}
        transition={{ duration: 2.1, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(255,250,224,0.85) 0%, rgba(241,217,138,0.35) 40%, transparent 72%)',
        }}
      />

      {/* LEFT FULL-HEIGHT ROYAL VELVET CURTAIN */}
      <motion.div
        initial={{ x: '0%' }}
        animate={
          isParting
            ? { x: '-106%', skewY: -2.2 }
            : { x: '0%', skewY: 0 }
        }
        transition={{
          duration: 2.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={VELVET_PLEATS_STYLE}
        className="absolute inset-y-0 left-0 w-[51.5vw] z-20 shadow-[18px_0_50px_rgba(20,2,6,0.75)] origin-top-left"
      >
        {/* Subtle ambient shimmer over left velvet */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            background:
              'linear-gradient(135deg, rgba(241,217,138,0.12) 0%, transparent 50%, rgba(0,0,0,0.45) 100%)',
          }}
        />

        {/* Ornate Antique-Gold Zari Vertical Trim along inner edge */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-3 sm:w-5 border-l border-[#F5E09D]/60 shadow-[-4px_0_16px_rgba(212,175,55,0.35)]"
          style={{
            background:
              'linear-gradient(90deg, #7D5A18 0%, #D4AF37 38%, #F7E3A7 60%, #9E7B2F 100%)',
          }}
        />
        {/* Delicate inner Mughal diamond lace stripe */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-4 sm:right-6 w-[2px] bg-[#EBD282]/45"
        />
      </motion.div>

      {/* RIGHT FULL-HEIGHT ROYAL VELVET CURTAIN */}
      <motion.div
        initial={{ x: '0%' }}
        animate={
          isParting
            ? { x: '106%', skewY: 2.2 }
            : { x: '0%', skewY: 0 }
        }
        transition={{
          duration: 2.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={VELVET_PLEATS_STYLE}
        className="absolute inset-y-0 right-0 w-[51.5vw] z-20 shadow-[-18px_0_50px_rgba(20,2,6,0.75)] origin-top-right"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            background:
              'linear-gradient(225deg, rgba(241,217,138,0.12) 0%, transparent 50%, rgba(0,0,0,0.45) 100%)',
          }}
        />

        {/* Ornate Antique-Gold Zari Vertical Trim along inner edge */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-3 sm:w-5 border-r border-[#F5E09D]/60 shadow-[4px_0_16px_rgba(212,175,55,0.35)]"
          style={{
            background:
              'linear-gradient(90deg, #9E7B2F 0%, #F7E3A7 40%, #D4AF37 62%, #7D5A18 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-4 sm:left-6 w-[2px] bg-[#EBD282]/45"
        />
      </motion.div>

      {/* TOP SCALLOPED ROYAL VELVET VALANCE / PELMET WITH GOLD TASSELS */}
      <motion.div
        animate={isParting ? { y: '-110%', opacity: 0 } : { y: '0%', opacity: 1 }}
        transition={{ duration: 1.5, delay: isParting ? 0.35 : 0, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
        className="absolute top-0 inset-x-0 z-30 pointer-events-none"
      >
        <svg
          viewBox="0 0 1200 130"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-24 drop-shadow-[0_12px_24px_rgba(18,2,6,0.65)]"
        >
          <defs>
            <linearGradient id="pelmetVelvet" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A050C" />
              <stop offset="55%" stopColor="#5C1622" />
              <stop offset="100%" stopColor="#3B0B14" />
            </linearGradient>
            <linearGradient id="pelmetGoldTrim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#9E7B2F" />
              <stop offset="25%" stopColor="#F5E09D" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="75%" stopColor="#F5E09D" />
              <stop offset="100%" stopColor="#9E7B2F" />
            </linearGradient>
          </defs>
          {/* Scalloped velvet swags across full width */}
          <path
            d="M0 0 H1200 V48 Q1050 118 900 48 Q750 118 600 48 Q450 118 300 48 Q150 118 0 48 Z"
            fill="url(#pelmetVelvet)"
          />
          <path
            d="M0 48 Q150 118 300 48 Q450 118 600 48 Q750 118 900 48 Q1050 118 1200 48"
            fill="none"
            stroke="url(#pelmetGoldTrim)"
            strokeWidth="4.5"
          />
          {/* Decorative gold tassels at swag valleys */}
          {[150, 450, 750, 1050].map((cx) => (
            <g key={cx}>
              <circle cx={cx} cy="83" r="4.5" fill="url(#pelmetGoldTrim)" />
              <path
                d={`M${cx - 3} 87 L${cx - 6} 112 M${cx} 87 L${cx} 115 M${cx + 3} 87 L${cx + 6} 112`}
                stroke="url(#pelmetGoldTrim)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Ambient golden dust sparkles over the curtains */}
      <motion.div
        animate={{ opacity: isParting ? 0 : 0.7 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 z-30 pointer-events-none"
      >
        <AmbientParticles intensity="subtle" />
      </motion.div>

      {/* CENTER INVITATION PROMPT & ROYAL GOLD MEDALLION CLASP */}
      <AnimatePresence>
        {(phase === 'closed' || phase === 'unclasping') && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
            {/* Heading above clasp */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{
                opacity: phase === 'closed' ? 1 : 0,
                y: phase === 'closed' ? 0 : -18,
              }}
              transition={{ duration: 0.55 }}
              className="mb-6 sm:mb-8"
            >
              <p className="font-serif-royal italic text-3xl sm:text-5xl text-[#F7E3A7] tracking-wide drop-shadow-[0_4px_18px_rgba(0,0,0,0.65)]">
                You&rsquo;re Cordially Invited
              </p>
              <div className="mt-2 mx-auto w-28 h-[1px] bg-gradient-to-r from-transparent via-[#F1D98A] to-transparent" />
            </motion.div>

            {/* Clickable Royal Gold Clasp Medallion */}
            <motion.button
              type="button"
              onClick={handleOpen}
              aria-label="Tap to part the wedding curtains and unveil the celebration"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={
                phase === 'unclasping'
                  ? { scale: [1, 1.18, 0.6], opacity: [1, 1, 0] }
                  : { scale: 1, opacity: 1 }
              }
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: phase === 'unclasping' ? 0.4 : 0.6 }}
              whileHover={phase === 'closed' ? { scale: 1.06 } : undefined}
              whileTap={phase === 'closed' ? { scale: 0.95 } : undefined}
              className={`pointer-events-auto relative w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F5E09D] ${
                phase === 'closed' ? 'animate-seal-pulse' : ''
              }`}
              style={{
                background:
                  'radial-gradient(circle at 32% 28%, #FAF0BE 0%, #D9B14C 32%, #9A701C 72%, #593E0A 100%)',
                boxShadow:
                  '0 14px 40px rgba(0,0,0,0.65), inset 0 2px 8px rgba(255,250,220,0.55)',
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-1.5 rounded-full border border-[#FFF6D6]/60"
              />
              <span
                aria-hidden="true"
                className="absolute inset-3 rounded-full border border-[#593E0A]/45"
              />
              <WeddingLogo
                sizeClass="w-20 h-20 sm:w-24 sm:h-24"
                framed
                alt="Shubha & Hardik Royal Crest"
              />
            </motion.button>

            {/* Golden sparkle burst on clasp */}
            {phase === 'unclasping' && (
              <div className="relative flex items-center justify-center">
                {CLASP_SPARKS.map((spark) => {
                  const rad = (spark.angle * Math.PI) / 180;
                  const tx = Math.cos(rad) * spark.distance;
                  const ty = Math.sin(rad) * spark.distance;
                  return (
                    <motion.span
                      key={spark.id}
                      initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
                      animate={{ x: tx, y: ty, scale: [0.4, 1.35, 0], opacity: [1, 1, 0] }}
                      transition={{ duration: 0.65, delay: spark.delay, ease: 'easeOut' }}
                      style={{
                        width: spark.size,
                        height: spark.size,
                        background: 'radial-gradient(circle, #FFFDF0 0%, #D4AF37 70%)',
                      }}
                      className="absolute rounded-full shadow-[0_0_10px_#F6E2A0]"
                    />
                  );
                })}
              </div>
            )}

            {/* Prompt below clasp */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: phase === 'closed' ? 1 : 0,
                y: phase === 'closed' ? 0 : 12,
              }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-7 sm:mt-9"
            >
              <p className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#F5E09D] font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.75)]">
                Tap to open the curtains
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
