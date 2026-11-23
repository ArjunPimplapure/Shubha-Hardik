import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Clock, Crown, Music, Sparkles, Sun, Flame } from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingConfig';
import { CornerFiligree, RoyalSectionDivider } from './RoyalOrnaments';
import { WeddingLogo } from './WeddingLogo';

type EventTheme = 'haldi' | 'sangeet' | 'barat' | 'vivah' | 'reception';

const THEME_STYLES: Record<
  EventTheme,
  {
    cardClass: string;
    borderClass: string;
    titleClass: string;
    taglineClass: string;
    timeClass: string;
    dividerClass: string;
    fallbackGradient: string;
    icon: React.ReactNode;
  }
> = {
  haldi: {
    cardClass: 'bg-gradient-to-b from-[#FFFDF4] via-[#FFF8E1] to-[#FDF0C4]',
    borderClass: 'border-[#D4AF37]/70',
    titleClass: 'text-[#6A3F08]',
    taglineClass: 'text-[#8C5A12]',
    timeClass: 'text-[#5C3405]',
    dividerClass: 'via-[#D99B26]/70',
    fallbackGradient: 'from-[#F8D568] via-[#FCE79C] to-[#F3B941]',
    icon: <Sun className="w-4 h-4 text-[#B87A14]" aria-hidden="true" />,
  },
  sangeet: {
    cardClass: 'bg-gradient-to-b from-[#4B101B] via-[#3C0B14] to-[#2B070E]',
    borderClass: 'border-[#D4AF37]/65',
    titleClass: 'text-[#F6E1A1]',
    taglineClass: 'text-[#F0CCD4]',
    timeClass: 'text-[#FAF6EE]',
    dividerClass: 'via-[#D4AF37]/65',
    fallbackGradient: 'from-[#5C1622] via-[#3D0D15] to-[#28060C]',
    icon: <Music className="w-4 h-4 text-[#E9C46A]" aria-hidden="true" />,
  },
  barat: {
    cardClass: 'bg-gradient-to-b from-[#FFFDF9] via-[#FDF5E6] to-[#F7E5C8]',
    borderClass: 'border-[#C59B38]/75',
    titleClass: 'text-[#5C1622]',
    taglineClass: 'text-[#8E6B23]',
    timeClass: 'text-[#4A121C]',
    dividerClass: 'via-[#C59B38]/65',
    fallbackGradient: 'from-[#F5E09D] via-[#FAF0E6] to-[#E7C76B]',
    icon: <Crown className="w-4 h-4 text-[#9E7B2F]" aria-hidden="true" />,
  },
  vivah: {
    cardClass: 'bg-gradient-to-b from-[#FFFDF9] via-[#FCF2EF] to-[#F7E1DB]',
    borderClass: 'border-[#C59B38]/70',
    titleClass: 'text-[#5C1622]',
    taglineClass: 'text-[#8A2937]',
    timeClass: 'text-[#4A121C]',
    dividerClass: 'via-[#B23A48]/55',
    fallbackGradient: 'from-[#F4D3CD] via-[#FAF0E6] to-[#E9B5AC]',
    icon: <Flame className="w-4 h-4 text-[#9E2A3B]" aria-hidden="true" />,
  },
  reception: {
    cardClass: 'bg-gradient-to-b from-[#3A0C16] via-[#2C0811] to-[#1F050B]',
    borderClass: 'border-[#D4AF37]/70',
    titleClass: 'text-[#F7E3A7]',
    taglineClass: 'text-[#F3D8DE]',
    timeClass: 'text-[#FFFDF8]',
    dividerClass: 'via-[#D4AF37]/70',
    fallbackGradient: 'from-[#4E1320] via-[#330A13] to-[#1C040A]',
    icon: <Sparkles className="w-4 h-4 text-[#F1D98A]" aria-hidden="true" />,
  },
};

const EventArtwork: React.FC<{
  src: string;
  alt: string;
  fallbackGradient: string;
  isDark: boolean;
}> = ({ src, alt, fallbackGradient, isDark }) => {
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <div ref={frameRef} className="relative w-full aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-t-xl">
      {!failed ? (
        <motion.img
          style={{ y: imgY, scale: 1.08 }}
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.11]"
        />
      ) : (
        <div
          className={`w-full h-full bg-gradient-to-br ${fallbackGradient} flex items-center justify-center`}
        >
          <Sparkles className="w-10 h-10 text-[#D4AF37]/70" aria-hidden="true" />
        </div>
      )}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 h-12 sm:h-14 bg-gradient-to-t ${
          isDark ? 'from-[#3C0B14] via-[#3C0B14]/45' : 'from-[#FFFDF8]/90 via-[#FFFDF8]/30'
        } to-transparent`}
      />
    </div>
  );
};

export const EventsItinerary: React.FC = () => {
  return (
    <section id="celebrations" className="relative py-14 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 36, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '0px 0px -60px 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16"
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.26em] text-[#8E6B23] font-medium">
            Wedding Celebrations
          </p>
          <h2
            className="mt-2 font-serif-royal text-3xl sm:text-5xl font-semibold text-[#5C1622]"
            style={{ textWrap: 'balance' }}
          >
            The Sacred Itinerary
          </h2>
          <RoyalSectionDivider className="mt-4 sm:mt-5" />
        </motion.div>

        <div className="space-y-14 sm:space-y-20">
          {WEDDING_DATA.days.map((day, dayIndex) => (
            <React.Fragment key={day.id}>
              {/* Individual Date Block */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 32, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center mb-7 sm:mb-10"
                >
                  <p className="text-xs uppercase tracking-[0.28em] text-[#8E6B23] font-semibold">
                    Day {dayIndex + 1}
                  </p>
                  <h3 className="mt-1.5 font-serif-royal text-3xl sm:text-4xl font-semibold tracking-wider text-[#5C1622]">
                    {day.dateDisplay}
                  </h3>
                  <p className="mt-1.5 font-serif-royal italic text-lg sm:text-2xl text-[#6E4943]">
                    &ldquo;{day.subtitle}&rdquo;
                  </p>
                </motion.div>

                {/* Event Cards Grid with 3D Perspective Unfold & Golden Sheen Sweep */}
                <div
                  className={`grid grid-cols-1 gap-6 items-stretch [perspective:1100px] mx-auto ${
                    day.events.length === 3
                      ? 'md:grid-cols-2 lg:grid-cols-3 sm:gap-7 max-w-6xl md:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1 md:[&>*:last-child]:max-w-md md:[&>*:last-child]:w-full md:[&>*:last-child]:mx-auto lg:[&>*:last-child]:max-w-none'
                      : 'md:grid-cols-2 sm:gap-9 max-w-5xl'
                  }`}
                >
                  {day.events.map((event, evIndex) => {
                    const styles = THEME_STYLES[event.theme];
                    const isDark = event.theme === 'sangeet' || event.theme === 'reception';

                    return (
                      <motion.article
                        key={event.id}
                        initial={{ opacity: 0, y: 48, rotateX: 9, scale: 0.94 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                        viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                        transition={{
                          duration: 0.85,
                          delay: evIndex * 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className={`group relative rounded-2xl border ${styles.borderClass} ${styles.cardClass} shadow-[0_18px_45px_rgba(43,27,24,0.12)] transition-transform duration-300 hover:-translate-y-1 flex flex-col overflow-hidden`}
                      >
                        {/* Diagonal metallic golden sheen gliding across card upon scroll reveal */}
                        <motion.div
                          aria-hidden="true"
                          initial={{ x: '-130%', opacity: 0 }}
                          whileInView={{ x: '160%', opacity: [0, 0.45, 0] }}
                          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                          transition={{
                            duration: 1.25,
                            delay: 0.28 + evIndex * 0.14,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-y-0 -left-1/3 w-2/3 pointer-events-none z-20 -skew-x-12"
                          style={{
                            background:
                              'linear-gradient(90deg, transparent 0%, rgba(255,248,214,0.38) 50%, transparent 100%)',
                          }}
                        />

                        <EventArtwork
                          src={event.image}
                          alt={event.imageAlt}
                          fallbackGradient={styles.fallbackGradient}
                          isDark={isDark}
                        />

                        {/* Ornamental corners on bottom of card */}
                        <CornerFiligree
                          flipY
                          className={`absolute bottom-2 left-2 w-10 h-10 sm:w-12 sm:h-12 pointer-events-none ${
                            isDark ? 'text-[#E7C76B]/35' : 'text-[#9E7B2F]/35'
                          }`}
                        />
                        <CornerFiligree
                          flipX
                          flipY
                          className={`absolute bottom-2 right-2 w-10 h-10 sm:w-12 sm:h-12 pointer-events-none ${
                            isDark ? 'text-[#E7C76B]/35' : 'text-[#9E7B2F]/35'
                          }`}
                        />

                        <div className="relative z-10 flex-1 flex flex-col items-center justify-between text-center px-5 py-5 sm:px-8 sm:py-8">
                          <div>
                            <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
                              {styles.icon}
                            </div>

                            <h4
                              className={`font-serif-royal text-2xl sm:text-3xl font-semibold tracking-wider ${styles.titleClass}`}
                            >
                              {event.title}
                            </h4>

                            <p
                              className={`mt-1 font-serif-royal italic text-base sm:text-xl ${styles.taglineClass}`}
                            >
                              {event.tagline}
                            </p>
                          </div>

                          <div className="w-full mt-4 sm:mt-6">
                            <div
                              className={`h-[1px] w-20 sm:w-24 mx-auto bg-gradient-to-r from-transparent ${styles.dividerClass} to-transparent mb-3 sm:mb-4`}
                            />
                            <div
                              className={`inline-flex items-center justify-center gap-2 text-sm sm:text-base font-medium tracking-[0.18em] ${styles.timeClass}`}
                            >
                              <Clock className="w-4 h-4 opacity-80" aria-hidden="true" />
                              <span className="tabular-nums">{event.time}</span>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </div>

              {/* Official Wedding Logo Crest nestled elegantly between Day 1 & Day 2 */}
              {dayIndex === 0 && (
                <div className="flex items-center justify-center gap-4 sm:gap-6 py-2">
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[1px] flex-1 max-w-[140px] origin-right bg-gradient-to-r from-transparent to-[#C59B38]/75"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.78, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <WeddingLogo
                      sizeClass="w-20 h-20 sm:w-24 sm:h-24"
                      framed
                      alt="Shubha & Hardik Monogram"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                    transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                    className="h-[1px] flex-1 max-w-[140px] origin-left bg-gradient-to-l from-transparent to-[#C59B38]/75"
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
