import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import type { ExperienceItem } from '../data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

export const Experience: React.FC = () => {
  const { experience } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic scroll tracker for the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const getIcon = (type: ExperienceItem['type']) => {
    switch (type) {
      case 'Education':
        return <GraduationCap className="w-4 h-4 text-indigo-500 dark:text-darkAccent" />;
      case 'Internship':
      case 'Freelance':
        return <Briefcase className="w-4 h-4 text-purple-500 dark:text-darkAccent" />;
      case 'Open Source':
        return (
          <svg className="w-4 h-4 text-cyan-500 dark:text-darkAccent" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M50 15 L25 30 L25 70 L50 85 L75 70 L75 30 Z"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return <Briefcase className="w-4 h-4 text-indigo-500 dark:text-darkAccent" />;
    }
  };

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Milestones
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText">
              Experience & Education
            </h2>
            <div className="w-12 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Timeline container */}
        <div ref={containerRef} className="relative max-w-3xl mx-auto pl-8 sm:pl-12">
          {/* 1. Underlying timeline background line */}
          <div className="absolute left-4 sm:left-6 top-3 bottom-3 w-[2px] bg-white/10 pointer-events-none rounded-full" />

          {/* 2. Scroll-connected line overlay */}
          <motion.div
            className="absolute left-4 sm:left-6 top-3 bottom-3 w-[2px] bg-gradient-to-b from-lightAccent to-lightSecondaryAccent dark:from-darkAccent dark:to-darkSecondaryAccent origin-top pointer-events-none rounded-full"
            style={{ scaleY }}
          />

          {/* Milestones list */}
          <ScrollStagger className="space-y-12">
            {experience.map((exp) => (
              <ScrollStaggerItem key={exp.id} animation="fade-right">
                <div className="relative flex flex-col gap-3">
                  {/* Milestone Node Badge */}
                  <div className="absolute left-[-32px] sm:left-[-48px] top-1.5 z-10 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/10 glass-subtle shadow-xs">
                    {getIcon(exp.type)}
                  </div>

                {/* Experience & Education Info Card (Light Glass) */}
                <div className="p-6 rounded-lg glass-light-interactive">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-sm sm:text-base text-lightHeading dark:text-darkHeading">
                        {exp.role}
                      </h3>
                      <p className="text-xs text-lightAccent dark:text-darkAccent font-semibold mt-0.5">
                        {exp.company}
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1 text-[10px] sm:text-xs font-mono text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 sm:justify-end">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Bullet points achievements */}
                  <ul className="list-disc pl-4 text-xs text-gray-500 dark:text-gray-400 space-y-2 leading-relaxed">
                    {exp.description.map((desc, itemIdx) => (
                      <li key={itemIdx}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
        </div>
      </div>
    </section>
  );
};
