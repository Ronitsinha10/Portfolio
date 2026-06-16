import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal } from '../components/ScrollReveal';
import { TechIcon } from '../components/TechIcon';

export const Skills: React.FC = () => {
  const { skills } = portfolioData;

  const categories = [
    { 
      id: 'Frontend', 
      name: 'Frontend', 
      icon: <Layout className="w-4 h-4 text-gray-500 dark:text-stone-400 group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors duration-300" /> 
    },
    { 
      id: 'Backend', 
      name: 'Backend', 
      icon: <Server className="w-4 h-4 text-gray-500 dark:text-stone-400 group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors duration-300" /> 
    },
    { 
      id: 'Database', 
      name: 'Database', 
      icon: <Database className="w-4 h-4 text-gray-500 dark:text-stone-400 group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors duration-300" /> 
    },
    { 
      id: 'Tools', 
      name: 'Tools & Technologies', 
      icon: <Terminal className="w-4 h-4 text-gray-500 dark:text-stone-400 group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors duration-300" /> 
    }
  ];

  return (
    <section id="skills" className="py-16 px-6 relative bg-gray-50/50 dark:bg-darkBg transition-colors duration-700">
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Expertise
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-lightText dark:text-darkHeading">
              Technology Stack
            </h2>
            <div className="w-8 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Single Premium Container */}
        <ScrollReveal animation="scale-in" duration={0.8} delay={0.1}>
          <div className="rounded-3xl border border-gray-200/50 dark:border-darkBorder bg-white dark:bg-darkCard shadow-sm p-6 sm:p-8 space-y-6 sm:space-y-8">
            {categories.map((cat, idx) => {
              const catSkills = skills.filter(
                (s) => s.category.toLowerCase() === cat.id.toLowerCase()
              );

              return (
                <div 
                  key={cat.id} 
                  className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 ${
                    idx !== categories.length - 1 ? 'border-b border-gray-100 dark:border-darkBorder/40 pb-6 sm:pb-8' : ''
                  }`}
                >
                  {/* Category Header Label */}
                  <div className="flex items-center gap-3 w-full md:w-56 shrink-0 group">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-darkBg border border-gray-200/10 dark:border-darkBorder/50 flex items-center justify-center transition-colors duration-300 group-hover:border-lightAccent/30 dark:group-hover:border-darkAccent/30">
                      {cat.icon}
                    </div>
                    <span className="font-display font-semibold text-sm text-gray-700 dark:text-darkHeading group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors duration-300">
                      {cat.name}
                    </span>
                  </div>

                  {/* Chips Flex Group */}
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="group/chip flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-darkBorder/60 bg-stone-50 dark:bg-darkBg hover:bg-white dark:hover:bg-darkCard hover:border-lightAccent/50 dark:hover:border-darkAccent/50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.03)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] transition-all duration-300 cursor-default"
                      >
                        {/* Logo */}
                        <TechIcon 
                          name={skill.name} 
                          className="text-gray-500 dark:text-stone-400 group-hover/chip:text-lightAccent dark:group-hover/chip:text-darkAccent transition-colors duration-300"
                          size={14} 
                        />
                        {/* Name */}
                        <span className="text-xs font-semibold text-gray-600 dark:text-stone-300 group-hover/chip:text-gray-900 dark:group-hover/chip:text-white transition-colors duration-300">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
