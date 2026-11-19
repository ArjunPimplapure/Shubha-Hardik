import React from 'react';
import { motion } from 'motion/react';

export const CornerFiligree: React.FC<{
  className?: string;
  flipX?: boolean;
  flipY?: boolean;
}> = ({ className = '', flipX = false, flipY = false }) => {
  const transform = `${flipX ? 'scaleX(-1)' : ''} ${flipY ? 'scaleY(-1)' : ''}`.trim() || undefined;
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      style={transform ? { transform } : undefined}
      className={className}
    >
      <path
        d="M8 112V40C8 22.327 22.327 8 40 8H112"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeOpacity="0.65"
      />
      <path
        d="M16 112V44C16 28.536 28.536 16 44 16H112"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.4"
      />
      <path
        d="M24 24C34 24 41 31 41 41C31 41 24 34 24 24Z"
        stroke="currentColor"
        strokeWidth="1.1"
        fill="currentColor"
        fillOpacity="0.14"
      />
      <path
        d="M45 20C53 16 62 19 66 26C58 28 50 26 45 20Z"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path
        d="M20 45C16 53 19 62 26 66C28 58 26 50 20 45Z"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" fillOpacity="0.7" />
      <circle cx="76" cy="12" r="1.5" fill="currentColor" fillOpacity="0.55" />
      <circle cx="12" cy="76" r="1.5" fill="currentColor" fillOpacity="0.55" />
    </svg>
  );
};

export const MandalaWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" className={className}>
    <g stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35">
      <circle cx="200" cy="200" r="185" strokeDasharray="3 5" />
      <circle cx="200" cy="200" r="158" />
      <circle cx="200" cy="200" r="120" strokeDasharray="2 4" />
      <circle cx="200" cy="200" r="78" />
      <circle cx="200" cy="200" r="36" />
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        return (
          <g key={i} transform={`rotate(${angle} 200 200)`}>
            <path
              d="M200 18C212 46 212 72 200 94C188 72 188 46 200 18Z"
              fill="currentColor"
              fillOpacity="0.06"
            />
            <path d="M200 94C207 112 207 128 200 144C193 128 193 112 200 94Z" />
            <circle cx="200" cy="14" r="2" fill="currentColor" fillOpacity="0.4" />
          </g>
        );
      })}
    </g>
  </svg>
);

export const IntertwinedHeartDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-4 w-full max-w-md mx-auto ${className}`} aria-hidden="true">
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -20px 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="h-[1px] flex-1 origin-right bg-gradient-to-r from-transparent via-[#C59B38]/70 to-[#8E6B23]"
    />
    <motion.svg
      initial={{ scale: 0.65, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -20px 0px' }}
      transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewBox="0 0 96 42"
      className="w-20 h-9 text-[#9E7B2F] shrink-0"
      fill="none"
    >
      {/* Left heart */}
      <path
        d="M39 14C34.5 9.5 27 11 25.5 17C24 23 32 29.5 39 34C46 29.5 54 23 52.5 17C51 11 43.5 9.5 39 14Z"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="#F4DCE0"
        fillOpacity="0.55"
      />
      {/* Intertwined right heart */}
      <path
        d="M57 14C52.5 9.5 45 11 43.5 17C42 23 50 29.5 57 34C64 29.5 72 23 70.5 17C69 11 61.5 9.5 57 14Z"
        stroke="#5C1622"
        strokeOpacity="0.72"
        strokeWidth="1.35"
        fill="#D4AF37"
        fillOpacity="0.14"
      />
      {/* Delicate floral leaves */}
      <path d="M18 21C14 18 10 19 8 21C10 23 14 24 18 21Z" fill="currentColor" fillOpacity="0.45" />
      <path d="M78 21C82 18 86 19 88 21C86 23 82 24 78 21Z" fill="currentColor" fillOpacity="0.45" />
      <circle cx="48" cy="21" r="2" fill="#5C1622" fillOpacity="0.7" />
    </motion.svg>
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -20px 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="h-[1px] flex-1 origin-left bg-gradient-to-l from-transparent via-[#C59B38]/70 to-[#8E6B23]"
    />
  </div>
);

export const RoyalSectionDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 w-full max-w-xs mx-auto ${className}`} aria-hidden="true">
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -30px 0px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="h-[1px] flex-1 origin-right bg-gradient-to-r from-transparent to-[#C59B38]/80"
    />
    <motion.svg
      initial={{ scale: 0.4, rotate: -45, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -30px 0px' }}
      transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      viewBox="0 0 36 24"
      className="w-7 h-5 text-[#9E7B2F] shrink-0"
      fill="none"
    >
      <path
        d="M18 3C20.5 8 24 10.5 29 12C24 13.5 20.5 16 18 21C15.5 16 12 13.5 7 12C12 10.5 15.5 8 18 3Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="currentColor"
        fillOpacity="0.18"
      />
      <circle cx="18" cy="12" r="2" fill="currentColor" />
    </motion.svg>
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -30px 0px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="h-[1px] flex-1 origin-left bg-gradient-to-l from-transparent to-[#C59B38]/80"
    />
  </div>
);
