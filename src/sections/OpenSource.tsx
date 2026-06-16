import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, GitFork, GitMerge, Star, Terminal } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

// Generate contributions data representing one year
const generateContributionGrid = () => {
  const grid: { count: number; date: string; level: number }[][] = [];
  
  for (let row = 0; row < 7; row++) {
    const dayRow: { count: number; date: string; level: number }[] = [];
    for (let col = 0; col < 26; col++) {
      // Create random contribution weights
      const level = Math.random() > 0.6 ? Math.floor(Math.random() * 5) : 0;
      const count = level === 0 ? 0 : Math.floor(Math.random() * 8) + 1;
      const date = `May ${col + 1}, 2025`;
      dayRow.push({ count, date, level });
    }
    grid.push(dayRow);
  }
  return grid;
};

export const OpenSource: React.FC = () => {
  const [gridData] = useState(() => generateContributionGrid());
  const [activeTooltip, setActiveTooltip] = useState<{ count: number; date: string } | null>(null);

  const stats = [
    { label: 'PRs Merged', value: 42, icon: <GitMerge className="w-4 h-4 text-emerald-500" /> },
    { label: 'Open Issues Resolved', value: 28, icon: <Terminal className="w-4 h-4 text-cyan-500" /> },
    { label: 'Starred Repositories', value: 180, icon: <Star className="w-4 h-4 text-amber-500" /> },
    { label: 'Forked Contributions', value: 15, icon: <GitFork className="w-4 h-4 text-purple-500" /> }
  ];

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
          {/* Left Block: Description & Stats Cards */}
          <ScrollReveal animation="fade-left" duration={0.8} className="lg:col-span-5 space-y-6">
            <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
              <h3 className="font-display font-bold text-lg text-lightText dark:text-darkText flex items-center gap-2">
                <GitPullRequest className="w-5 h-5 text-lightAccent dark:text-darkAccent" />
                Empowering the Community
              </h3>
              <p>
                I strongly believe in the open-source philosophy. From fixing minor typos to optimizing core latency structures, I contribute code to public platforms to make things better for everyone.
              </p>
              <p>
                My Google Summer of Code project under **The Linux Foundation** involved modular Java refactoring, writing concurrent parsing systems, and collaborating via GitHub pull requests with project maintainers worldwide.
              </p>
            </div>

            {/* Contribution Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl border border-gray-200/20 dark:border-gray-800/80 bg-white/50 dark:bg-gray-900/40 backdrop-blur-md flex items-center gap-3.5"
                >
                  <div className="p-2 rounded bg-gray-100 dark:bg-gray-800">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="font-display font-extrabold text-lg text-lightText dark:text-darkText leading-none">
                      {stat.value}
                    </p>
                    <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 font-sans tracking-wide uppercase mt-1 inline-block">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Right Block: Heatmap Graph Grid Card */}
          <ScrollReveal animation="fade-right" duration={0.8} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-3xl border border-gray-200/25 dark:border-gray-800/85 bg-white dark:bg-gray-900 shadow-sm flex flex-col gap-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800/50">
                <div>
                  <h4 className="font-display font-bold text-sm text-lightText dark:text-darkText">
                    GitHub Activity Visualizer
                  </h4>
                  <p className="text-[10px] text-gray-500 font-sans mt-0.5">
                    120 commits submitted in open source repositories
                  </p>
                </div>
                <div className="text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">
                  @ronitsinha
                </div>
              </div>

              {/* Grid Scroll container */}
              <div className="overflow-x-auto pb-2 relative select-none">
                <div className="min-w-[500px] flex flex-col gap-1.5 justify-center">
                  {gridData.map((row, rIdx) => (
                    <div key={rIdx} className="flex gap-1.5">
                      {row.map((cell, cIdx) => {
                        // Class naming helper for contribution heat map levels
                        const getLevelColor = (lvl: number) => {
                          switch (lvl) {
                            case 1:
                              return 'bg-emerald-900/30 dark:bg-emerald-500/10 border-emerald-500/10';
                            case 2:
                              return 'bg-emerald-900/60 dark:bg-emerald-500/30 border-emerald-500/20';
                            case 3:
                              return 'bg-emerald-700 dark:bg-emerald-500/60 border-emerald-500/35';
                            case 4:
                              return 'bg-emerald-500 dark:bg-emerald-400 border-emerald-400/50';
                            default:
                              return 'bg-gray-100 dark:bg-gray-950 border-gray-200/20 dark:border-gray-900';
                          }
                        };

                        return (
                          <motion.div
                            key={cIdx}
                            initial={{ scale: 0.2, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: (rIdx + cIdx) * 0.008,
                              type: 'spring',
                              stiffness: 300,
                              damping: 20
                            }}
                            onMouseEnter={() => setActiveTooltip({ count: cell.count, date: cell.date })}
                            onMouseLeave={() => setActiveTooltip(null)}
                            className={`w-3.5 h-3.5 rounded-[3px] border cursor-pointer transition-colors duration-150 ${getLevelColor(
                              cell.level
                            )}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Contribution details tooltip overlay */}
                {activeTooltip && (
                  <div className="absolute top-[-30px] right-2 bg-gray-900 text-white px-2.5 py-1 rounded text-[9px] font-mono shadow-md border border-gray-800 pointer-events-none">
                    {activeTooltip.count} commits on {activeTooltip.date}
                  </div>
                )}
              </div>

              {/* Heatmap legend guide */}
              <div className="flex justify-between items-center text-[10px] text-gray-500 font-sans">
                <span>Jan - Jun Activity</span>
                <div className="flex items-center gap-1">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-sm bg-gray-100 dark:bg-gray-950 border border-gray-200/15" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-900/30 dark:bg-emerald-500/10 border border-emerald-500/10" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-900/60 dark:bg-emerald-500/30 border border-emerald-500/20" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-700 dark:bg-emerald-500/60 border border-emerald-500/30" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500 dark:bg-emerald-400 border border-emerald-400/50" />
                  <span>More</span>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
