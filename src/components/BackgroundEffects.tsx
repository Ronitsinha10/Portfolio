import React, { useEffect, useRef } from 'react';
import backgroundImage from '../assets/background-image.webp';

/**
 * PARALLAX INTENSITY MULTIPLIER
 * -------------------------------------------------------------
 * Adjust this value to control how fast the background shifts:
 * - Recommended range: 0.04 to 0.06
 * - Default: 0.05 (subtle, natural movement)
 * - Higher (e.g. 0.08): More noticeable movement
 * - Lower (e.g. 0.02): Extremely faint movement
 */
export const PARALLAX_FACTOR = 0.05;

export const BackgroundEffects: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect accessibility preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      return;
    }

    let ticking = false;
    let latestScrollY = window.scrollY;

    const updateParallax = () => {
      if (bgRef.current) {
        // Move the background vertically by a small subtle amount as user scrolls
        const yPos = -(Math.max(0, latestScrollY) * PARALLAX_FACTOR);
        bgRef.current.style.transform = `translate3d(0, ${yPos.toFixed(2)}px, 0)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      latestScrollY = window.scrollY;
      if (!ticking) {
        rafIdRef.current = window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial positioning
    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden isolate"
      aria-hidden="true"
    >
      {/* 1. Underlying dark fallback color */}
      <div className="absolute inset-0 bg-darkBg -z-10" />

      {/* 2. Parallax Fantasy Landscape Image Layer */}
      <div
        ref={bgRef}
        className="absolute left-0 w-full pointer-events-none select-none will-change-transform"
        style={{
          top: '-40px',
          height: 'calc(100vh + 500px)',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* 3. Subtle Dark Gradient Overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(15, 15, 15, 0.72) 0%, rgba(15, 15, 15, 0.58) 45%, rgba(15, 15, 15, 0.78) 100%)',
        }}
      />

      {/* 4. Ambient Charcoal & Warm Amber Glow (Harmonizes with sunset & theme) */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-30"
        style={{
          background:
            'radial-gradient(ellipse at 85% 35%, rgba(217, 119, 6, 0.4) 0%, transparent 65%)',
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
