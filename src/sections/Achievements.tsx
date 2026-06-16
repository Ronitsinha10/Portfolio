import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, ShieldCheck, Flame } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import type { AchievementItem } from '../data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

export const Achievements: React.FC = () => {
  const { achievements } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [65, -65]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-45, 45]);

  const getIcon = (category: AchievementItem['category']) => {
    switch (category) {
      case 'Award':
        return <Award className="w-5 h-5 text-purple-500" />;
      case 'Certification':
        return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'Coding':
        return <Flame className="w-5 h-5 text-orange-500" />;
      default:
        return <Award className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getCategoryClass = (category: AchievementItem['category']) => {
    switch (category) {
      case 'Award':
        return 'bg-purple-500/10 text-purple-500 dark:text-purple-400';
      case 'Certification':
        return 'bg-emerald-500/10 text-emerald-500 dark:text-emerald-400';
      case 'Coding':
        return 'bg-orange-500/10 text-orange-500 dark:text-orange-400';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-500';
    }
  };

  return (
    <section id="achievements" ref={containerRef} className="py-24 px-6 relative bg-gray-50/50 dark:bg-gray-950/20 overflow-hidden">
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: y1 }}
        className="absolute right-[-5%] top-1/4 w-48 h-48 rounded-full bg-lightAccent/5 dark:bg-purple-500/10 blur-3xl pointer-events-none select-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute left-[-5%] bottom-1/4 w-40 h-40 rounded-full bg-lightAccent/5 dark:bg-indigo-500/10 blur-3xl pointer-events-none select-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Recognitions
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText">
              Honors & Achievements
            </h2>
            <div className="w-12 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Achievements Grid */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {achievements.map((ach) => (
            <ScrollStaggerItem key={ach.id} animation="fade-up">
              <div className="group relative p-6 sm:p-8 rounded-3xl border border-gray-200/25 dark:border-gray-800/85 bg-white dark:bg-gray-900 shadow-sm hover:border-lightAccent/30 dark:hover:border-darkAccent/30 hover:shadow-md hover:translate-y-[-3px] transition-all duration-300 flex gap-5 items-start">
                {/* Category Icon */}
                <div className="p-3.5 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-lightAccent/10 dark:group-hover:bg-darkAccent/10 transition-colors">
                  {getIcon(ach.category)}
                </div>

                {/* Achievement Body */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold ${getCategoryClass(ach.category)}`}>
                      {ach.category}
                    </span>
                    <span className="text-[10px] font-mono font-semibold text-gray-400">
                      {ach.date}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-lightText dark:text-darkText group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors">
                      {ach.title}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold dark:text-gray-400">
                      {ach.issuer}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-sans border-t border-gray-100 dark:border-gray-800/80 pt-3 mt-2">
                    {ach.description}
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
