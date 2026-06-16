import type { Variants } from 'framer-motion';

export const fadeInUp = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1] // cubic-bezier matching Apple/Linear
    }
  }
});

export const fadeInDown = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const fadeInLeft = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const fadeInRight = (delay = 0, duration = 0.6): Variants => ({
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

export const scaleUp = (delay = 0, duration = 0.5): Variants => ({
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1]
    }
  }
});

export const float: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const hoverSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 15
};
