import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles } from 'lucide-react';
import { WEDDING_DATA } from '../config/weddingConfig';
import { RoyalSectionDivider } from './RoyalOrnaments';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

function getTimeRemaining(targetIso: string): TimeRemaining {
  const targetTime = new Date(targetIso).getTime();
  const now = Date.now();
  const diff = targetTime - now;

  if (Number.isNaN(targetTime) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isComplete: false };
}

function padTwo(val: number): string {
  return String(val).padStart(2, '0');
}

/**
 * Draws a symmetric, well-proportioned heart path directly in Canvas 2D coordinates (w x h)
 * so scratching works identically across all desktop and mobile browsers without CSS clip-path bugs.
 */
function traceHeartPath(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.beginPath();
  ctx.moveTo(w * 0.5, h * 0.21);
  ctx.bezierCurveTo(w * 0.5, h * 0.13, w * 0.415, h * 0.03, w * 0.275, h * 0.03);
  ctx.bezierCurveTo(w * 0.115, h * 0.03, w * 0.02, h * 0.165, w * 0.02, h * 0.34);
  ctx.bezierCurveTo(w * 0.02, h * 0.575, w * 0.245, h * 0.77, w * 0.5, h * 0.965);
  ctx.bezierCurveTo(w * 0.755, h * 0.77, w * 0.98, h * 0.575, w * 0.98, h * 0.34);
  ctx.bezierCurveTo(w * 0.98, h * 0.165, w * 0.885, h * 0.03, w * 0.725, h * 0.03);
  ctx.bezierCurveTo(w * 0.585, h * 0.03, w * 0.5, h * 0.13, w * 0.5, h * 0.21);
  ctx.closePath();
}

export const HeartScratchCountdown: React.FC = () => {
  const [countdown, setCountdown] = useState<TimeRemaining>(() =>
    getTimeRemaining(WEDDING_DATA.countdownTargetIso),
  );
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const scratchCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparkleCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const moveCounterRef = useRef(0);
  const particlesRef = useRef<SparkParticle[]>([]);
  const sparkleRafRef = useRef<number>(0);
  const paintedWidthRef = useRef<number>(0);
  const isRevealedRef = useRef(false);

  useEffect(() => {
    isRevealedRef.current = isRevealed;
  }, [isRevealed]);

  // Live countdown ticker in Asia/Kolkata (+05:30 target timestamp)
  useEffect(() => {
    const update = () => setCountdown(getTimeRemaining(WEDDING_DATA.countdownTargetIso));
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, []);

  // Paint metallic champagne gold foil heart onto the scratch canvas
  const paintGoldFoil = useCallback((forceReset = true) => {
    const canvas = scratchCanvasRef.current;
    const sparkleCanvas = sparkleCanvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    paintedWidthRef.current = width;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    if (sparkleCanvas) {
      sparkleCanvas.width = Math.floor(width * dpr);
      sparkleCanvas.height = Math.floor(height * dpr);
    }

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    traceHeartPath(ctx, width, height);
    ctx.clip();

    // Rich metallic champagne gold foil fill
    const foilGrad = ctx.createLinearGradient(0, 0, width, height);
    foilGrad.addColorStop(0, '#C79F3F');
    foilGrad.addColorStop(0.24, '#EBD282');
    foilGrad.addColorStop(0.48, '#FFF0B8');
    foilGrad.addColorStop(0.72, '#D4AF37');
    foilGrad.addColorStop(1, '#A57D24');
    ctx.fillStyle = foilGrad;
    ctx.fillRect(0, 0, width, height);

    // Subtle brushed metallic sheen lines
    ctx.strokeStyle = 'rgba(255, 250, 224, 0.24)';
    ctx.lineWidth = 1;
    for (let i = -height; i < width + height; i += 9) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + height * 0.45, height);
      ctx.stroke();
    }

    // Delicate floral/foil dot embossing
    ctx.strokeStyle = 'rgba(92, 22, 34, 0.16)';
    ctx.lineWidth = 1.5;
    for (let x = 24; x < width; x += 42) {
      for (let y = 24; y < height; y += 42) {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Center prompt embossed onto the gold foil
    ctx.fillStyle = '#5C1622';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '600 24px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('Scratch Here', width / 2, height * 0.42);

    ctx.fillStyle = 'rgba(92, 22, 34, 0.8)';
    ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('DRAG TO REVEAL COUNTDOWN', width / 2, height * 0.51);

    ctx.restore();

    if (forceReset) {
      setIsRevealed(false);
      isRevealedRef.current = false;
      setScratchProgress(0);
      moveCounterRef.current = 0;
    }
  }, []);

  // Initialize canvas once on mount; only re-paint on real width change (never wipe on mobile scroll bar resize)
  useEffect(() => {
    paintGoldFoil(true);

    const handleResize = () => {
      const container = containerRef.current;
      if (!container || isRevealedRef.current) return;
      const newWidth = container.clientWidth;
      if (Math.abs(newWidth - paintedWidthRef.current) > 12) {
        paintGoldFoil(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [paintGoldFoil]);

  // Sparkle particle loop
  useEffect(() => {
    const sparkleCanvas = sparkleCanvasRef.current;
    if (!sparkleCanvas) return;
    const ctx = sparkleCanvas.getContext('2d');
    if (!ctx) return;

    const tick = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = sparkleCanvas.width / dpr;
      const height = sparkleCanvas.height / dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const list = particlesRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.life += 1;

        const alpha = Math.max(0, 1 - p.life / p.maxLife);
        if (alpha <= 0) {
          list.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#FFF6CE';
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      sparkleRafRef.current = requestAnimationFrame(tick);
    };

    sparkleRafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(sparkleRafRef.current);
  }, []);

  const spawnSparkles = useCallback((x: number, y: number) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    for (let i = 0; i < 4; i++) {
      particlesRef.current.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 14,
        vx: (Math.random() - 0.5) * 2.4,
        vy: -0.6 - Math.random() * 1.8,
        life: 0,
        maxLife: 22 + Math.random() * 14,
        size: 1.5 + Math.random() * 2.2,
      });
    }
  }, []);

  const evaluateScratchedRatio = useCallback(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas || isRevealedRef.current) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Sample pixels inside the heart's central active area (20%..80% X, 22%..72% Y)
    const startX = Math.floor(canvas.width * 0.2);
    const endX = Math.floor(canvas.width * 0.8);
    const startY = Math.floor(canvas.height * 0.22);
    const endY = Math.floor(canvas.height * 0.72);
    const sampleW = Math.max(1, endX - startX);
    const sampleH = Math.max(1, endY - startY);

    const imgData = ctx.getImageData(startX, startY, sampleW, sampleH).data;
    let transparentCount = 0;
    let totalSampled = 0;
    const step = 12;
    for (let i = 3; i < imgData.length; i += 4 * step) {
      totalSampled++;
      if (imgData[i] < 45) transparentCount++;
    }

    if (totalSampled > 0) {
      const ratio = transparentCount / totalSampled;
      const pct = Math.min(100, Math.round((ratio / 0.45) * 100));
      setScratchProgress(pct);
      if (ratio >= 0.45) {
        setIsRevealed(true);
        isRevealedRef.current = true;
      }
    }
  }, []);

  const scratchSegment = useCallback(
    (from: { x: number; y: number }, to: { x: number; y: number }) => {
      const canvas = scratchCanvasRef.current;
      if (!canvas || isRevealedRef.current) return;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = window.innerWidth < 640 ? 40 : 48;

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      spawnSparkles(to.x, to.y);

      moveCounterRef.current += 1;
      if (moveCounterRef.current % 6 === 0) {
        evaluateScratchedRatio();
      }
    },
    [evaluateScratchedRatio, spawnSparkles],
  );

  // Attach native mouse + non-passive touch events directly to canvas so touch never scrolls away
  useEffect(() => {
    const canvas = scratchCanvasRef.current;
    if (!canvas) return;

    const coordsFromClient = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const onMouseDown = (e: MouseEvent) => {
      if (isRevealedRef.current) return;
      isDrawingRef.current = true;
      const pt = coordsFromClient(e.clientX, e.clientY);
      lastPointRef.current = pt;
      scratchSegment(pt, { x: pt.x + 0.5, y: pt.y + 0.5 });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDrawingRef.current || isRevealedRef.current) return;
      const pt = coordsFromClient(e.clientX, e.clientY);
      const prev = lastPointRef.current ?? pt;
      scratchSegment(prev, pt);
      lastPointRef.current = pt;
    };

    const onMouseUp = () => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;
      lastPointRef.current = null;
      evaluateScratchedRatio();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isRevealedRef.current || e.touches.length === 0) return;
      e.preventDefault();
      isDrawingRef.current = true;
      const t = e.touches[0];
      const pt = coordsFromClient(t.clientX, t.clientY);
      lastPointRef.current = pt;
      scratchSegment(pt, { x: pt.x + 0.5, y: pt.y + 0.5 });
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDrawingRef.current || isRevealedRef.current || e.touches.length === 0) return;
      e.preventDefault();
      const t = e.touches[0];
      const pt = coordsFromClient(t.clientX, t.clientY);
      const prev = lastPointRef.current ?? pt;
      scratchSegment(prev, pt);
      lastPointRef.current = pt;
    };

    const onTouchEnd = () => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;
      lastPointRef.current = null;
      evaluateScratchedRatio();
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('touchcancel', onTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [evaluateScratchedRatio, scratchSegment]);

  return (
    <section id="countdown" className="relative py-16 sm:py-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-[#8E6B23] font-medium">
            25 December 2026
          </p>
          <h2
            className="mt-2 font-serif-royal text-3xl sm:text-5xl font-semibold text-[#5C1622]"
            style={{ textWrap: 'balance' }}
          >
            A Little Surprise for You!
          </h2>
          <p className="mt-2.5 font-serif-royal italic text-lg sm:text-xl text-[#5A3934]">
            Scratch to reveal the countdown to our special day
          </p>
          <RoyalSectionDivider className="mt-5 mb-9 sm:mb-12" />
        </motion.div>

        {/* Heart-Shaped Interactive Scratch Card Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center justify-center"
        >
          {/* Ambient golden-blush halo */}
          <div
            aria-hidden="true"
            className="absolute w-[310px] h-[290px] sm:w-[440px] sm:h-[400px] rounded-full pointer-events-none blur-2xl opacity-65"
            style={{
              background:
                'radial-gradient(circle, rgba(244,220,224,0.85) 0%, rgba(212,175,55,0.28) 55%, transparent 75%)',
            }}
          />

          {/* Heart Container */}
          <div
            ref={containerRef}
            className="relative w-[316px] h-[300px] sm:w-[430px] sm:h-[405px]"
            style={{
              filter: 'drop-shadow(0 20px 36px rgba(92, 22, 34, 0.2))',
            }}
          >
            {/* Blush Pink Heart Base SVG (Zero CSS clip-path hit-testing bugs) */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
            >
              <defs>
                <radialGradient id="blushHeartFill" cx="50%" cy="38%" r="62%">
                  <stop offset="0%" stopColor="#FFFDF9" />
                  <stop offset="58%" stopColor="#F9E3E8" />
                  <stop offset="100%" stopColor="#EFCCD4" />
                </radialGradient>
              </defs>
              <path
                d="M 50, 21 C 50, 13 41.5, 3 27.5, 3 C 11.5, 3 2, 16.5 2, 34 C 2, 57.5 24.5, 77 50, 96.5 C 75.5, 77 98, 57.5 98, 34 C 98, 16.5 88.5, 3 72.5, 3 C 58.5, 3 50, 13 50, 21 Z"
                fill="url(#blushHeartFill)"
              />
            </svg>

            {/* Underlying Live Countdown Content */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 pb-8 pt-6 text-center pointer-events-none">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-[#8E6B23] font-semibold mb-1.5">
                Counting Every Moment
              </p>

              {countdown.isComplete ? (
                <div className="py-4 px-4">
                  <p className="font-serif-royal text-2xl sm:text-4xl font-semibold text-[#5C1622] leading-tight">
                    The Celebrations Begin!
                  </p>
                </div>
              ) : (
                <div
                  className="grid grid-cols-4 gap-1.5 sm:gap-3 w-full max-w-[252px] sm:max-w-[325px] my-1"
                  aria-live="polite"
                >
                  {[
                    { label: 'DAYS', value: String(countdown.days) },
                    { label: 'HOURS', value: padTwo(countdown.hours) },
                    { label: 'MINUTES', value: padTwo(countdown.minutes) },
                    { label: 'SECONDS', value: padTwo(countdown.seconds) },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className="rounded-xl bg-[#FFFDF8]/90 border border-[#D4AF37]/45 py-2 sm:py-3 px-1 shadow-sm"
                    >
                      <div className="font-serif-royal text-2xl sm:text-4xl font-bold text-[#5C1622] tabular-nums leading-none">
                        {unit.value}
                      </div>
                      <div className="mt-1 text-[8px] sm:text-[10px] font-semibold tracking-[0.14em] text-[#7D5A18]">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-2 font-serif-royal italic text-sm sm:text-base text-[#5C1622]">
                Shubha &amp; Hardik · 25 Dec 2026
              </p>
            </div>

            {/* Real HTML5 Canvas Metallic Gold Heart Scratch Coating */}
            <canvas
              ref={scratchCanvasRef}
              aria-label="Heart-shaped scratch card coating. Drag across to reveal the live wedding countdown."
              className={`absolute inset-0 w-full h-full z-20 touch-none transition-opacity duration-700 ${
                isRevealed
                  ? 'opacity-0 pointer-events-none'
                  : 'opacity-100 cursor-grab active:cursor-grabbing'
              }`}
            />

            {/* Golden Sparkle Particle Overlay */}
            <canvas
              ref={sparkleCanvasRef}
              aria-hidden="true"
              className="absolute inset-0 w-full h-full z-30 pointer-events-none"
            />

            {/* Outer Gold Glowing Heart Border SVG */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none z-40"
            >
              <defs>
                <linearGradient id="heartGoldStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9E7B2F" />
                  <stop offset="35%" stopColor="#F4DE9A" />
                  <stop offset="70%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8E6B23" />
                </linearGradient>
              </defs>
              <path
                d="M 50, 21 C 50, 13 41.5, 3 27.5, 3 C 11.5, 3 2, 16.5 2, 34 C 2, 57.5 24.5, 77 50, 96.5 C 75.5, 77 98, 57.5 98, 34 C 98, 16.5 88.5, 3 72.5, 3 C 58.5, 3 50, 13 50, 21 Z"
                fill="none"
                stroke="url(#heartGoldStroke)"
                strokeWidth="1.65"
              />
            </svg>
          </div>

          {/* Helpful accessibility & replay controls below heart */}
          <div className="mt-6 flex items-center justify-center gap-4">
            {!isRevealed ? (
              <button
                type="button"
                onClick={() => {
                  setIsRevealed(true);
                  isRevealedRef.current = true;
                }}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#7D5A18] hover:text-[#5C1622] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>
                  {scratchProgress > 0 ? `Reveal Now (${scratchProgress}%)` : 'Reveal Countdown'}
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => paintGoldFoil(true)}
                className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 text-xs uppercase tracking-[0.18em] text-[#7D5A18] hover:text-[#5C1622] transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Scratch Again</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
