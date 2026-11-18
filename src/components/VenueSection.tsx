import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, MapPin } from 'lucide-react';
import { DECORATIVE_IMAGES, WEDDING_DATA } from '../config/weddingConfig';
import { CornerFiligree, RoyalSectionDivider } from './RoyalOrnaments';

export const VenueSection: React.FC = () => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section id="venue" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative parchment-texture rounded-2xl border border-[#C59B38]/60 shadow-[0_24px_60px_rgba(92,22,34,0.1)] overflow-hidden"
        >
          {/* Decorative Corner Filigrees */}
          <CornerFiligree className="absolute top-3 left-3 w-14 h-14 text-[#9E7B2F]/45 pointer-events-none z-20" />
          <CornerFiligree
            flipX
            className="absolute top-3 right-3 w-14 h-14 text-[#9E7B2F]/45 pointer-events-none z-20"
          />

          {/* Illustrated Palace Floral Venue Banner */}
          <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-[#C59B38]/40">
            {!imgFailed ? (
              <img
                src={DECORATIVE_IMAGES.venue}
                alt="Royal Indian wedding palace courtyard with floral arches"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#F4DCE0] via-[#FAF6EE] to-[#EBD282]/40 flex items-center justify-center">
                <MapPin className="w-12 h-12 text-[#8E6B23]/60" aria-hidden="true" />
              </div>
            )}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#FFFDF8] via-[#FFFDF8]/40 to-transparent"
            />
          </div>

          {/* Venue Details */}
          <div className="relative z-10 px-6 py-10 sm:px-12 sm:py-12 text-center">
            <p className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#8E6B23] font-semibold">
              {WEDDING_DATA.venue.heading}
            </p>

            <h2
              className="mt-3 font-serif-royal text-3xl sm:text-5xl font-semibold text-[#5C1622] tracking-wide"
              style={{ textWrap: 'balance' }}
            >
              {WEDDING_DATA.venue.name}
            </h2>

            <p className="mt-2 font-serif-royal italic text-xl sm:text-2xl text-[#4E302C]">
              {WEDDING_DATA.venue.address}
            </p>

            <RoyalSectionDivider className="my-6" />

            <div className="flex justify-center">
              <a
                href={WEDDING_DATA.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 min-h-[48px] px-7 py-3.5 rounded-xl font-medium text-sm sm:text-base tracking-[0.16em] uppercase text-[#FFFDF8] shadow-[0_12px_28px_rgba(92,22,34,0.22)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_16px_34px_rgba(212,175,55,0.35)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#D4AF37]"
                style={{
                  background:
                    'linear-gradient(135deg, #8E6B23 0%, #C59B38 45%, #8E6B23 100%)',
                }}
              >
                <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">Explore Venue</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-85 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
