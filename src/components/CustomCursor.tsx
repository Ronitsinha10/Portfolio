import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClickable, setIsClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Position of mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for follow-ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports touch or is small screen
    const checkDevice = () => {
      const mobile =
        window.matchMedia('(max-width: 1024px)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible((prev) => (prev ? prev : true));
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== 'function') return;

      // Efficient combined check for interactive elements
      const isClickableElement = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')
      );
      setIsClickable((prev) => (prev !== isClickableElement ? isClickableElement : prev));

      // Special scale styling for specific elements
      const hasScale = Boolean(target.closest('[data-cursor-scale]'));
      setIsHovered((prev) => (prev !== hasScale ? hasScale : prev));
    };

    const handleMouseDown = () => setIsHovered(true);
    const handleMouseUp = () => setIsHovered(false);

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('mouseover', handleMouseOver, { passive: true });
      window.addEventListener('mousedown', handleMouseDown, { passive: true });
      window.addEventListener('mouseup', handleMouseUp, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* 1. Large Follow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-lightAccent dark:border-darkAccent pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isClickable ? 1.5 : isHovered ? 2 : 1,
          backgroundColor: isClickable ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
          boxShadow: isClickable 
            ? '0 0 12px rgba(99, 102, 241, 0.2)' 
            : 'none',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* 2. Inner Precise Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-lightAccent dark:bg-darkAccent pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isClickable ? 0.5 : 1,
        }}
      />
    </>
  );
};
