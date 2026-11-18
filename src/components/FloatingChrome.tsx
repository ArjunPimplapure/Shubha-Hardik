import React, { useEffect, useState } from 'react';
import { Music, Pause, Play, RotateCcw } from 'lucide-react';

interface FloatingChromeProps {
  isPlaying: boolean;
  onToggleMusic: () => void;
  onReplayCurtains: () => void;
}

const NAV_ITEMS = [
  { id: 'invitation', label: 'Invitation' },
  { id: 'countdown', label: 'Countdown' },
  { id: 'celebrations', label: 'Celebrations' },
  { id: 'venue', label: 'Venue' },
  { id: 'rsvp', label: 'RSVP' },
] as const;

export const FloatingChrome: React.FC<FloatingChromeProps> = ({
  isPlaying,
  onToggleMusic,
  onReplayCurtains,
}) => {
  const [activeId, setActiveId] = useState<string>('invitation');

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.05 },
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
  };

  return (
    <>
      {/* Top-Right Discreet Music & Replay Curtains Controls */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={onReplayCurtains}
          aria-label="Replay opening curtains animation"
          title="Replay Curtains"
          className="h-11 px-3 rounded-full bg-[#FFFDF8]/90 backdrop-blur-md border border-[#D4AF37]/60 text-[#7D5A18] shadow-[0_6px_20px_rgba(92,22,34,0.12)] inline-flex items-center justify-center gap-1.5 transition-all duration-200 hover:bg-[#FAF1DB] hover:text-[#5C1622] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.14em] font-medium whitespace-nowrap">
            Replay
          </span>
        </button>

        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
          aria-pressed={isPlaying}
          title={isPlaying ? 'Pause Music' : 'Play Music'}
          className="h-11 px-3.5 rounded-full bg-[#FFFDF8]/90 backdrop-blur-md border border-[#D4AF37]/70 text-[#5C1622] shadow-[0_6px_20px_rgba(92,22,34,0.14)] inline-flex items-center justify-center gap-2 transition-all duration-200 hover:bg-[#FAF1DB] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <Music className="w-4 h-4 text-[#9E7B2F] shrink-0" aria-hidden="true" />
          {isPlaying ? (
            <span className="inline-flex items-end gap-[2.5px] h-3.5 w-3.5" aria-hidden="true">
              <span className="w-[2.5px] h-full bg-[#8E6B23] rounded-full origin-bottom music-bar-1" />
              <span className="w-[2.5px] h-full bg-[#C59B38] rounded-full origin-bottom music-bar-2" />
              <span className="w-[2.5px] h-full bg-[#8E6B23] rounded-full origin-bottom music-bar-3" />
            </span>
          ) : (
            <Play className="w-3.5 h-3.5 text-[#8E6B23] shrink-0" aria-hidden="true" />
          )}
          <span className="sr-only">{isPlaying ? 'Playing' : 'Paused'}</span>
          {isPlaying && <Pause className="w-3 h-3 text-[#7D5A18] hidden sm:inline shrink-0" aria-hidden="true" />}
        </button>
      </div>

      {/* Minimal Floating Editorial Navigation Dock */}
      <nav
        aria-label="Wedding sections"
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[calc(100vw-16px)] rounded-full bg-[#FFFDF8]/92 backdrop-blur-md border border-[#D4AF37]/55 shadow-[0_10px_30px_rgba(59,11,20,0.14)] px-2 sm:px-4"
      >
        <ul className="flex items-center justify-center gap-0.5 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`relative min-h-[44px] px-2 sm:px-3.5 flex items-center justify-center text-[11px] sm:text-xs tracking-[0.06em] sm:tracking-[0.12em] uppercase whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-full ${
                    isActive
                      ? 'text-[#5C1622] font-semibold'
                      : 'text-[#6E4F46] hover:text-[#5C1622] font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-2 left-2.5 right-2.5 h-[1.5px] bg-gradient-to-r from-transparent via-[#C59B38] to-transparent"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
