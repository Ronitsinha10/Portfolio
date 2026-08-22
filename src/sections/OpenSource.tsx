import React from 'react';
import { motion } from 'framer-motion';
import { GitPullRequest, GitFork, GitMerge, Star, Terminal } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { GitHubCalendar } from 'react-github-calendar';
import { useTheme } from '../context/ThemeContext';

export const OpenSource: React.FC = () => {
  const { theme } = useTheme();

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
                I actively contribute to open-source projects by improving code quality, collaborating with developers, reviewing issues, and building scalable software solutions using modern development practices.
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
                    A visual overview of my GitHub activity and continuous learning journey as a developer.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">
                  @Ronitsinha10
                </div>
              </div>

              {/* Grid Scroll container */}
              <div className="overflow-x-auto pb-2 relative select-none calendar-scrollbar">
                <div className="min-w-[960px] flex justify-center">
                  <GitHubCalendar 
                    username="Ronitsinha10"
                    colorScheme={theme}
                    theme={{
                      light: ['#FAF3E8', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                      dark: ['#292524', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    }}
                    blockSize={15}
                    blockMargin={3}
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
