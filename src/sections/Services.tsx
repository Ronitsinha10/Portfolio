import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Layers, Tv, Cpu, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

export const Services: React.FC = () => {
  const { services } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-45, 45]);
  const y2 = useTransform(scrollYProgress, [0, 1], [45, -45]);

  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'layers':
        return <Layers className="w-5 h-5 text-indigo-500 dark:text-darkAccent" />;
      case 'tv':
        return <Tv className="w-5 h-5 text-purple-500 dark:text-darkAccent" />;
      case 'cpu':
        return <Cpu className="w-5 h-5 text-cyan-500 dark:text-darkAccent" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-500 dark:text-darkAccent" />;
      default:
        return <Layers className="w-5 h-5 text-indigo-500 dark:text-darkAccent" />;
    }
  };

  return (
    <section id="services" ref={containerRef} className="py-24 px-6 relative overflow-hidden">
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: y1 }}
        className="absolute right-[-5%] top-1/4 w-40 h-40 rounded-full bg-lightAccent/5 dark:bg-darkAccent/3 blur-2xl pointer-events-none select-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute left-[-5%] bottom-1/4 w-36 h-36 rounded-full bg-lightAccent/5 dark:bg-darkAccent/3 blur-2xl pointer-events-none select-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Offerings
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText">
              Professional Services
            </h2>
            <div className="w-12 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Services Grid (Light Glass - Supporting information cards) */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((srv) => (
            <ScrollStaggerItem key={srv.title} animation="fade-up">
              <div className="p-6 sm:p-8 rounded-lg glass-light-interactive flex gap-5 items-start">
                {/* Service Icon */}
                <div className="p-3.5 rounded-lg glass-subtle flex items-center justify-center flex-shrink-0">
                  {getIcon(srv.icon)}
                </div>

                {/* Service Body */}
                <div className="space-y-2 flex-1">
                  <h3 className="font-display font-extrabold text-sm sm:text-base text-lightHeading dark:text-darkHeading">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 dark:text-stone-300 font-sans leading-relaxed">
                    {srv.description}
                  </p>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
};
