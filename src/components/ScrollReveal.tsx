import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Variants } from 'framer-motion';

export type AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in' | 'blur-in';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  threshold?: number; // viewport visibility fraction, e.g. 0.2 to 0.3
  once?: boolean;
  className?: string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  duration = 0.8,
  delay = 0,
  threshold = 0.25,
  once = true,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const getVariants = (): Variants => {
    switch (animation) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 }
        };
      case 'fade-left':
        return {
          hidden: { opacity: 0, x: -40 },
          visible: { opacity: 1, x: 0 }
        };
      case 'fade-right':
        return {
          hidden: { opacity: 0, x: 40 },
          visible: { opacity: 1, x: 0 }
        };
      case 'scale-in':
        return {
          hidden: { opacity: 0, scale: 0.93 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'blur-in':
        return {
          hidden: { opacity: 0, filter: 'blur(12px)', scale: 0.98 },
          visible: { opacity: 1, filter: 'blur(0px)', scale: 1 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariants()}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScrollStaggerProps {
  children: React.ReactNode;
  staggerChildren?: number;
  delayChildren?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export const ScrollStagger: React.FC<ScrollStaggerProps> = ({
  children,
  staggerChildren = 0.12,
  delayChildren = 0,
  threshold = 0.25,
  once = true,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren,
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ScrollStaggerItemProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  className?: string;
}

export const ScrollStaggerItem: React.FC<ScrollStaggerItemProps> = ({
  children,
  animation = 'fade-up',
  duration = 0.6,
  className = '',
}) => {
  const getVariants = (): Variants => {
    switch (animation) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 25 },
          visible: { opacity: 1, y: 0, transition: { duration, ease: [0.16, 1, 0.3, 1] } }
        };
      case 'fade-left':
        return {
          hidden: { opacity: 0, x: -25 },
          visible: { opacity: 1, x: 0, transition: { duration, ease: [0.16, 1, 0.3, 1] } }
        };
      case 'fade-right':
        return {
          hidden: { opacity: 0, x: 25 },
          visible: { opacity: 1, x: 0, transition: { duration, ease: [0.16, 1, 0.3, 1] } }
        };
      case 'scale-in':
        return {
          hidden: { opacity: 0, scale: 0.95 },
          visible: { opacity: 1, scale: 1, transition: { duration, ease: [0.16, 1, 0.3, 1] } }
        };
      case 'blur-in':
        return {
          hidden: { opacity: 0, filter: 'blur(8px)' },
          visible: { opacity: 1, filter: 'blur(0px)', transition: { duration, ease: [0.16, 1, 0.3, 1] } }
        };
      default:
        return {
          hidden: { opacity: 0, y: 25 },
          visible: { opacity: 1, y: 0, transition: { duration, ease: [0.16, 1, 0.3, 1] } }
        };
    }
  };

  return (
    <motion.div variants={getVariants()} className={className}>
      {children}
    </motion.div>
  );
};
