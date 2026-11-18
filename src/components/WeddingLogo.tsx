import React, { useState } from 'react';
import { WEDDING_LOGO_SRC } from '../config/weddingConfig';

interface WeddingLogoProps {
  className?: string;
  sizeClass?: string;
  framed?: boolean;
  alt?: string;
}

/**
 * Renders the official wedding logo/monogram framed in an ornate antique-gold
 * circular border without altering the logo's proportions, colours, or transparency.
 */
export const WeddingLogo: React.FC<WeddingLogoProps> = ({
  className = '',
  sizeClass = 'w-28 h-28 sm:w-36 sm:h-36',
  framed = true,
  alt = 'Shubha & Hardik Official Wedding Monogram',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${sizeClass} ${
        framed
          ? 'rounded-full p-[3px] shadow-[0_10px_28px_rgba(92,22,34,0.14)]'
          : ''
      } ${className}`}
      style={
        framed
          ? {
              background:
                'linear-gradient(135deg, #9E7B2F 0%, #F4DE9A 35%, #D4AF37 65%, #7D5A18 100%)',
            }
          : undefined
      }
    >
      <div
        className={`w-full h-full flex items-center justify-center overflow-hidden ${
          framed
            ? 'rounded-full bg-[#FAF6EE] p-1.5 sm:p-2 ring-1 ring-[#8E6B23]/35'
            : ''
        }`}
      >
        {!hasError ? (
          <img
            src={WEDDING_LOGO_SRC}
            alt={alt}
            referrerPolicy="no-referrer"
            onError={() => setHasError(true)}
            className={`w-full h-full object-contain select-none ${
              framed ? 'rounded-full' : ''
            }`}
          />
        ) : (
          <div
            aria-label={alt}
            className="w-full h-full rounded-full border border-[#D4AF37]/60 bg-[#FAF6EE] flex items-center justify-center font-serif-royal text-2xl sm:text-3xl font-semibold text-[#8E6B23]"
          >
            S &amp; H
          </div>
        )}
      </div>
    </div>
  );
};
