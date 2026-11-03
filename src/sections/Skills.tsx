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
      id: 'Databases', 
      name: 'Databases', 
      icon: <Database className="w-4 h-4 text-gray-500 dark:text-stone-400 group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors duration-300" /> 
    },
    { 
      id: 'Tools & Technologies', 
      name: 'Tools & Technologies', 
      icon: <Terminal className="w-4 h-4 text-gray-500 dark:text-stone-400 group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors duration-300" /> 
    }
  ];

  return (
    <section id="skills" className="py-16 px-6 relative">
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

        {/* Skill Category Container (Light Glass) */}
        <ScrollReveal animation="scale-in" duration={0.8} delay={0.1}>
          <div className="rounded-lg glass-light p-6 sm:p-8 space-y-6 sm:space-y-8">
            {categories.map((cat, idx) => {
              const catSkills = skills.filter((s) => {
                const sCat = s.category.toLowerCase();
                const cId = cat.id.toLowerCase();
                const cName = cat.name.toLowerCase();
                return (
                  sCat === cId ||
                  sCat === cName ||
                  (cId.startsWith('database') && sCat.startsWith('database')) ||
                  (cId.startsWith('tool') && sCat.startsWith('tool'))
                );
              });

              return (
                <div 
                  key={cat.id} 
                  className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 ${
                    idx !== categories.length - 1 ? 'border-b border-white/10 pb-6 sm:pb-8' : ''
                  }`}
                >
                  {/* Category Header Label */}
                  <div className="flex items-center gap-3 w-full md:w-56 shrink-0 group">
                    <div className="p-2 rounded-lg glass-subtle flex items-center justify-center transition-colors duration-300 group-hover:border-darkAccent/40">
                      {cat.icon}
                    </div>
                    <span className="font-display font-semibold text-sm text-gray-200 group-hover:text-darkAccent transition-colors duration-300">
                      {cat.name}
                    </span>
                  </div>

                  {/* Chips Flex Group */}
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="group/chip flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg glass-subtle-interactive cursor-default"
                      >
                        {/* Logo */}
                        <TechIcon 
                          name={skill.name} 
                          className="text-stone-400 group-hover/chip:text-darkAccent transition-colors duration-300"
                          size={14} 
                        />
                        {/* Name */}
                        <span className="text-xs font-semibold text-stone-300 group-hover/chip:text-white transition-colors duration-300">
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
