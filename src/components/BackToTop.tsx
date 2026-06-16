import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      
      if (scrollHeight > 0) {
        setScrollPercentage(scrolled / scrollHeight);
      }

      setIsVisible(scrolled > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG parameters for scroll path circle
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - scrollPercentage * circumference;

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
          className="fixed bottom-6 right-6 z-[40] flex items-center justify-center w-12 h-12 rounded-full border border-gray-200/20 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md text-lightAccent dark:text-darkAccent shadow-lg cursor-pointer"
          aria-label="Back to Top"
        >
          {/* Radial progress ring */}
          <svg className="absolute w-full h-full -rotate-90" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-gray-200/30 dark:stroke-gray-800/30"
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
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </svg>

          <ArrowUp className="w-5 h-5 pointer-events-none" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};
