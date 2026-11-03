import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToSection } from '../utils/navigation';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Optimized Framer Motion scroll tracking (no React re-renders on scroll)
  const { scrollY, scrollYProgress } = useScroll();

  // SVG parameters for scroll path circle
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [circumference, 0]);

  // Only trigger a React state update when crossing the 400px threshold
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldBeVisible = latest > 400;
    setIsVisible((prev) => (prev !== shouldBeVisible ? shouldBeVisible : prev));
  });

  const scrollToTop = () => {
    if (location.pathname === '/') {
      scrollToSection('home');
    } else if (!location.pathname.startsWith('/project/')) {
      navigate('/');
      scrollToSection('home');
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-[40] flex items-center justify-center w-12 h-12 rounded-full glass-light-interactive text-lightAccent dark:text-darkAccent shadow-md cursor-pointer"
          aria-label="Back to Top"
        >
          {/* Radial progress ring */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-white/10"
              strokeWidth="3"
              fill="transparent"
            />
            <motion.circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-lightAccent dark:stroke-darkAccent"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={circumference}
              style={{ strokeDashoffset }}
            />
          </svg>

          <ArrowUp className="w-5 h-5 pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
