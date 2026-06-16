import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

export const BackgroundEffects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [stars, setStars] = useState<Star[]>([]);

  // Generate stars on mount
  useEffect(() => {
    const starList: Star[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.0 + 2.0, // 2.0px to 4.0px
      delay: Math.random() * 6,
      duration: Math.random() * 6 + 7, // 7s to 13s twinkling
    }));
    setStars(starList);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      containerRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
      containerRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none transition-colors duration-700 bg-lightBg dark:bg-darkBg"
      style={{
        // Pre-initialize variables so they are centered initially
        ['--mouse-x' as any]: '50vw',
        ['--mouse-y' as any]: '50vh',
      }}
    >
      {/* 1. Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          backgroundImage: theme === 'dark' 
            ? `linear-gradient(to right, rgba(217, 119, 6, 0.012) 1px, transparent 1px), 
               linear-gradient(to bottom, rgba(217, 119, 6, 0.012) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(79, 70, 229, 0.03) 1px, transparent 1px), 
               linear-gradient(to bottom, rgba(79, 70, 229, 0.03) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      {/* 2. Interactive Spotlight */}
      <div
        className="absolute inset-0 opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: theme === 'dark'
            ? `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(217, 119, 6, 0.025), transparent 80%)`
            : `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(79, 70, 229, 0.05), transparent 80%)`
        }}
      />

      {/* 3. Floating Aurora Blobs (Refined to be extremely subtle amber gradients in dark mode) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 dark:opacity-100">
        {/* Blob 1: Top Leftish */}
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[120px] mix-blend-screen dark:mix-blend-normal animate-pulse-glow"
          style={{
            background: theme === 'dark' 
              ? 'radial-gradient(circle, rgba(217, 119, 6, 0.03) 0%, rgba(217, 119, 6, 0) 80%, transparent 100%)'
              : 'radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, rgba(167, 139, 250, 0.03) 70%, transparent 100%)',
            animationDuration: '8s'
          }}
        />
        {/* Blob 2: Bottom Rightish */}
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px] mix-blend-screen dark:mix-blend-normal animate-pulse-glow"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(217, 119, 6, 0.02) 0%, rgba(217, 119, 6, 0) 80%, transparent 100%)'
              : 'radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.02) 70%, transparent 100%)',
            animationDuration: '12s'
          }}
        />
        {/* Blob 3: Centerish */}
        <div 
          className="absolute top-[30%] left-[40%] w-[45vw] h-[45vw] rounded-full blur-[130px] mix-blend-screen dark:mix-blend-normal animate-pulse-glow"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(217, 119, 6, 0.02) 0%, rgba(217, 119, 6, 0) 80%, transparent 100%)'
              : 'radial-gradient(circle, rgba(236, 72, 153, 0.06) 0%, rgba(217, 70, 239, 0.01) 70%, transparent 100%)',
            animationDuration: '10s'
          }}
        />
      </div>

      {/* 4. Subtle Stars (Only shown in dark mode for aesthetic polish) */}
      {theme === 'dark' && (
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute rounded-full bg-white opacity-0"
              style={{
                top: `${star.y}%`,
                left: `${star.x}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `star-fade ${star.duration}s infinite ease-in-out`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* 5. Analog Noise Texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='noiseFilter'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.65'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Global CSS for star animations */}
      <style>{`
        @keyframes star-fade {
          0%, 100% { opacity: 0.05; transform: scale(0.85); }
          50% { opacity: 0.85; transform: scale(1.25); }
        }
      `}</style>
    </div>
  );
};
