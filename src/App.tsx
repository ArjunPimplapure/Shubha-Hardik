/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { WEDDING_MUSIC_SRC } from './config/weddingConfig';
import { AmbientParticles } from './components/AmbientParticles';
import { OpeningCurtains } from './components/OpeningCurtains';
import { HeroInvitation } from './components/HeroInvitation';
import { HeartScratchCountdown } from './components/HeartScratchCountdown';
import { EventsItinerary } from './components/EventsItinerary';
import { VenueSection } from './components/VenueSection';
import { FamilyAndRsvpSection } from './components/FamilyAndRsvpSection';
import { ClosingSection } from './components/ClosingSection';
import { FloatingChrome } from './components/FloatingChrome';

export default function App() {
  const [curtainsOpened, setCurtainsOpened] = useState(false);
  const [curtainInstanceKey, setCurtainInstanceKey] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const attemptStartMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.45;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Browser autoplay blocked; guest can start playback manually via top-right control
        setIsPlaying(false);
      });
    }
  };

  const handleToggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = 0.45;
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  };

  const handleReplayCurtains = () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setCurtainInstanceKey((k) => k + 1);
    setCurtainsOpened(false);
  };

  return (
    <div className="relative min-h-screen ivory-canvas-bg text-[#2B1B18] overflow-x-hidden">
      {/*
        Replaceable Background Wedding Audio Player.
        Update WEDDING_MUSIC_SRC in src/config/weddingConfig.ts or replace public/audio/wedding-music.wav
      */}
      <audio ref={audioRef} src={WEDDING_MUSIC_SRC} loop preload="auto" />

      {/* Main Wedding Invitation rendered underneath so parting curtains reveal it live */}
      <div className="relative min-h-screen">
        {/* Thin golden scroll-progress thread at top of viewport */}
        {curtainsOpened && (
          <motion.div
            aria-hidden="true"
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 h-[2.5px] origin-left z-50 bg-gradient-to-r from-[#8E6B23] via-[#F1D98A] to-[#C59B38] pointer-events-none"
          />
        )}

        {/* Subtle ambient gold dust & drifting rose petals across the page */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <AmbientParticles intensity="subtle" />
        </div>

        {curtainsOpened && (
          <FloatingChrome
            isPlaying={isPlaying}
            onToggleMusic={handleToggleMusic}
            onReplayCurtains={handleReplayCurtains}
          />
        )}

        <main className="relative z-10">
          <HeroInvitation />
          <HeartScratchCountdown />
          <EventsItinerary />
          <VenueSection />
          <FamilyAndRsvpSection />
        </main>

        <ClosingSection onReplayCurtains={handleReplayCurtains} />
      </div>

      {/* Full-Size Royal Velvet Curtains Opening Overlay */}
      {!curtainsOpened && (
        <OpeningCurtains
          key={curtainInstanceKey}
          onCurtainTap={attemptStartMusic}
          onComplete={() => setCurtainsOpened(true)}
        />
      )}
    </div>
  );
}
