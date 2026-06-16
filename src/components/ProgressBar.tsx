import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-lightAccent via-lightSecondaryAccent to-lightHighlightAccent dark:from-darkAccent dark:via-darkSecondaryAccent dark:to-darkHighlightAccent transform-origin-0 z-[9999]"
      style={{ scaleX }}
    />
  );
};
