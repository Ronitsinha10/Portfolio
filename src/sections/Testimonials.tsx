import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal } from '../components/ScrollReveal';

export const Testimonials: React.FC = () => {
  const { testimonials } = portfolioData;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const slideVariants: any = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 }
      }
    })
  };

  const startAutoplay = () => {
    stopAutoplay();
    timerRef.current = setInterval(() => {
      handleNext();
    }, 5000);
  };

  const stopAutoplay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(idx);
  };

  const current = testimonials[activeIndex];

  return (
    <section id="testimonials" ref={containerRef} className="py-24 px-6 relative overflow-hidden">
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: y1 }}
        className="absolute right-[-5%] top-1/4 w-44 h-44 rounded-full bg-lightAccent/5 dark:bg-darkAccent/3 blur-3xl pointer-events-none select-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute left-[-5%] bottom-1/4 w-32 h-32 rounded-full bg-lightAccent/5 dark:bg-darkAccent/3 blur-2xl pointer-events-none select-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Endorsements
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText">
              Client & Mentor Feedback
            </h2>
            <div className="w-12 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Carousel Slider Card */}
        <ScrollReveal animation="fade-up" duration={0.8} delay={0.15}>
          <div 
            className="relative max-w-3xl mx-auto"
            onMouseEnter={stopAutoplay}
            onMouseLeave={startAutoplay}
          >
            {/* Main slide frame */}
            <div className="min-h-[280px] sm:min-h-[220px] rounded-3xl border border-gray-200/25 dark:border-gray-800/85 bg-white dark:bg-gray-900 shadow-sm p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between">
              {/* Quote watermark icon */}
              <Quote className="absolute right-6 top-6 w-20 h-20 text-gray-200/40 dark:text-gray-800/15 pointer-events-none select-none" />

              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Five star indicator */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  {/* Testimony narrative */}
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-sans italic leading-relaxed">
                    "{current.text}"
                  </p>

                  {/* Author profile row */}
                  <div className="flex items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                    <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-lightAccent to-lightSecondaryAccent dark:from-darkAccent dark:to-darkSecondaryAccent">
                      <img
                        src={current.avatar}
                        alt={current.name}
                        className="w-full h-full object-cover rounded-full select-none"
                      />
                    </div>
                    <div>
                      <h4 className="font-display font-extrabold text-xs sm:text-sm text-lightText dark:text-darkText">
                        {current.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-semibold font-sans mt-0.5">
                        {current.role} at <span className="text-lightAccent dark:text-darkAccent">{current.company}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Controls Left/Right Arrow Buttons (Shown on tablet+) */}
            <button
              onClick={handlePrev}
              className="absolute left-[-20px] sm:left-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full border border-gray-200/20 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md text-gray-500 dark:text-gray-400 hover:border-lightAccent dark:hover:border-darkAccent hover:text-lightAccent dark:hover:text-darkAccent cursor-pointer transition-colors shadow-sm"
              aria-label="Previous Review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-[-20px] sm:right-[-60px] top-1/2 -translate-y-1/2 p-3 rounded-full border border-gray-200/20 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md text-gray-500 dark:text-gray-400 hover:border-lightAccent dark:hover:border-darkAccent hover:text-lightAccent dark:hover:text-darkAccent cursor-pointer transition-colors shadow-sm"
              aria-label="Next Review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom Dot indicators */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx 
                      ? 'bg-lightAccent dark:bg-darkAccent w-6' 
                      : 'bg-gray-300 dark:bg-gray-800 hover:bg-lightAccent/45 dark:hover:bg-darkAccent/45'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
