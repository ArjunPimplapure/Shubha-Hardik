import React, { useEffect, useRef } from 'react';

interface AmbientParticlesProps {
  intensity?: 'subtle' | 'rich';
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  type: 'gold' | 'petal';
  rotation: number;
  rotSpeed: number;
  swayPhase: number;
}

export const AmbientParticles: React.FC<AmbientParticlesProps> = ({
  intensity = 'subtle',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const isMobile = window.innerWidth < 640;
    const count = intensity === 'rich' ? (isMobile ? 24 : 40) : isMobile ? 16 : 26;

    const particles: Particle[] = Array.from({ length: count }).map((_, idx) => {
      const isPetal = idx % 4 === 0;
      return {
        x: Math.random() * (width || 400),
        y: Math.random() * (height || 800),
        vx: (Math.random() - 0.5) * 0.22,
        vy: isPetal ? 0.25 + Math.random() * 0.35 : -0.15 - Math.random() * 0.25,
        size: isPetal ? 4.5 + Math.random() * 4 : 1.2 + Math.random() * 2.1,
        alpha: isPetal ? 0.26 + Math.random() * 0.26 : 0.28 + Math.random() * 0.45,
        type: isPetal ? 'petal' : 'gold',
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.015,
        swayPhase: Math.random() * Math.PI * 2,
      };
    });

    let tick = 0;
    const render = () => {
      tick += 0.016;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx + Math.sin(tick + p.swayPhase) * (p.type === 'petal' ? 0.25 : 0.08);
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        if (p.type === 'petal') {
          if (p.y > height + 16) {
            p.y = -12;
            p.x = Math.random() * width;
          }
        } else {
          if (p.y < -12) {
            p.y = height + 12;
            p.x = Math.random() * width;
          }
        }
        if (p.x < -16) p.x = width + 16;
        if (p.x > width + 16) p.x = -16;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'petal') {
          ctx.globalAlpha = p.alpha;
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
          grad.addColorStop(0, '#E9BFC7');
          grad.addColorStop(1, '#C98B83');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.58, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const twinkle = 0.65 + 0.35 * Math.sin(tick * 2.2 + p.swayPhase);
          ctx.globalAlpha = p.alpha * twinkle;
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.4);
          grad.addColorStop(0, '#F8E7A6');
          grad.addColorStop(0.5, 'rgba(212, 175, 55, 0.55)');
          grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none w-full h-full ${className}`}
    />
  );
};
