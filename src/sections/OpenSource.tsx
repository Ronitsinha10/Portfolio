import React from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, GitBranch, BookOpen, Search, Users } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { GitHubCalendar } from 'react-github-calendar';

export const OpenSource: React.FC = () => {

  const cards = [
    { 
      title: 'Git & GitHub', 
      description: 'Version control and collaboration', 
      icon: <GitBranch className="w-4 h-4 text-lightAccent dark:text-darkAccent" /> 
    },
    { 
      title: 'Learning', 
      description: 'Understanding open-source workflows', 
      icon: <BookOpen className="w-4 h-4 text-lightAccent dark:text-darkAccent" /> 
    },
    { 
      title: 'Exploring Projects', 
      description: 'Finding projects to contribute to', 
      icon: <Search className="w-4 h-4 text-lightAccent dark:text-darkAccent" /> 
    },
    { 
      title: 'Community Learning', 
      description: 'Learning through developer communities, code reviews, and shared projects', 
      icon: <Users className="w-4 h-4 text-lightAccent dark:text-darkAccent" /> 
    }
  ];

  // Ensure the current month is always fully represented so react-activity-calendar
  // does not filter out the current month label (which requires >= 3 weeks).
  // Automatically pads with empty days through the end of the current month.
  const padToCurrentMonthEnd = (
    data: Array<{ date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }>
  ) => {
    if (!data || data.length === 0) return data;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    // Last day of current month (e.g. Oct 31, Nov 30)
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const existingDates = new Set(data.map((d) => d.date));
    const lastItem = data[data.length - 1];
    const lastDate = new Date(lastItem.date + 'T00:00:00');

    const extra: Array<{ date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }> = [];
    if (lastDate < endOfMonth) {
      const cursor = new Date(lastDate);
      cursor.setDate(cursor.getDate() + 1);

      while (cursor <= endOfMonth) {
        const yearStr = cursor.getFullYear();
        const monthStr = String(cursor.getMonth() + 1).padStart(2, '0');
        const dayStr = String(cursor.getDate()).padStart(2, '0');
        const dateStr = `${yearStr}-${monthStr}-${dayStr}`;

        if (!existingDates.has(dateStr)) {
          extra.push({
            date: dateStr,
            count: 0,
            level: 0,
          });
        }
        cursor.setDate(cursor.getDate() + 1);
      }
    }

    return [...data, ...extra];
  };

  return (
    <section id="opensource" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Collaboration
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText">
              Open Source Contributions
            </h2>
            <div className="w-12 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Block: Description & Cards */}
          <ScrollReveal animation="fade-left" duration={0.8} className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-lg glass-subtle space-y-3 text-stone-300 font-sans leading-relaxed">
              <h3 className="font-display font-bold text-lg text-lightHeading dark:text-darkHeading flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-lightAccent dark:text-darkAccent" />
                Empowering the Community
              </h3>
              <p className="text-xs sm:text-sm text-stone-300">
                I strongly believe in the open-source philosophy and the power of developers learning and building together. I&apos;m exploring open-source projects, learning collaborative development practices, and preparing to contribute to software that makes a difference.
              </p>
              <p className="text-xs sm:text-sm text-stone-300">
                I&apos;m focused on understanding open-source workflows, improving my coding skills, and learning from the developer community. My goal is to start contributing through documentation improvements, bug fixes, and meaningful code enhancements while building clean, maintainable, and scalable software.
              </p>
            </div>

            {/* Open Source Pillars Grid (Light Glass - Supporting information cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="p-3.5 sm:p-4 rounded-lg glass-light-interactive flex flex-col justify-start"
                >
                  <div className="w-8 h-8 rounded-lg glass-subtle flex items-center justify-center mb-2.5 text-darkAccent">
                    {card.icon}
                  </div>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-lightHeading dark:text-darkHeading mb-1">
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-gray-400 dark:text-stone-400 font-sans leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Block: Heatmap Graph Grid Card (Light Glass - Secondary content panel) */}
          <ScrollReveal animation="fade-right" duration={0.8} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-lg glass-light flex flex-col gap-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div>
                  <h4 className="font-display font-bold text-sm text-lightHeading dark:text-darkHeading">
                    GitHub Activity Visualizer
                  </h4>
                  <p className="text-[10px] text-gray-400 font-sans mt-0.5">
                    A visual overview of my GitHub activity and continuous learning journey as a developer.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-stone-300 glass-subtle px-2.5 py-0.5 rounded-full">
                  @Ronitsinha10
                </div>
              </div>

              {/* Grid Scroll container */}
              <div className="overflow-x-auto pb-2 relative select-none calendar-scrollbar">
                <div className="w-max min-w-full flex justify-center">
                  <GitHubCalendar 
                    username="Ronitsinha10"
                    colorScheme="dark"
                    theme={{
                      light: ['#181a20', '#0e4429', '#006d32', '#26a641', '#39d353'],
                      dark: ['#181a20', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                    blockSize={15}
                    blockMargin={3}
                    transformData={padToCurrentMonthEnd}
                  />
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
