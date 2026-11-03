import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  // Filter projects matching search and categories
  const filteredProjects = projects.filter((proj) => {
    const matchesSearch = 
      proj.title.toLowerCase().includes(search.toLowerCase()) ||
      proj.description.toLowerCase().includes(search.toLowerCase()) ||
      proj.techStack.some((tech) => tech.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory = 
      selectedCategory === 'All' || 
      proj.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="projects" className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Portfolio
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText">
              Featured Projects
            </h2>
            <div className="w-12 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10">
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stack or titles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full glass-subtle text-xs font-semibold outline-none text-lightText dark:text-darkText focus:border-darkAccent transition-colors"
            />
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap items-center gap-2 max-w-full overflow-x-auto pb-1 select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-lightAccent dark:bg-darkAccent text-white shadow-xs'
                    : 'glass-subtle-interactive text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Redesigned Text-Focused Project Cards Grid */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj, idx) => {
              const isFeatured = Boolean(proj.featured);
              const indexFormatted = String(idx + 1).padStart(2, '0');

              return (
                <ScrollStaggerItem key={proj.id} animation="scale-in">
                  <div className="h-full focus-within:ring-2 focus-within:ring-darkAccent/50 rounded-lg outline-none">
                    <motion.div
                      layout
                      className="flex flex-col justify-between h-full min-h-[310px] sm:min-h-[320px] rounded-lg glass-primary-interactive p-5 sm:p-6 transition-all duration-300 relative group"
                    >
                      {/* Top Header: Category, Featured Pill, and Index */}
                      <div className="flex items-center justify-between gap-3 mb-4 select-none">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="glass-subtle text-stone-300 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border border-white/5">
                            {proj.category}
                          </span>
                          {isFeatured && (
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-darkAccent/15 border border-darkAccent/30 text-darkAccent font-mono text-[9.5px] uppercase tracking-wider font-bold shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-darkAccent animate-pulse" />
                              Featured
                            </span>
                          )}
                        </div>

                        <span className="font-mono text-xs font-medium text-stone-500 tracking-wider">
                          {indexFormatted}
                        </span>
                      </div>

                      {/* Middle Body: Prominent Title & Informative Description */}
                      <div className="space-y-2.5 flex-1 mb-5">
                        <Link
                          to={`/project/${proj.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors focus:outline-none"
                          title={`Open ${proj.title} case study in a new tab`}
                        >
                          <h3 className="font-display font-extrabold text-lg sm:text-xl text-lightHeading dark:text-darkHeading tracking-tight leading-snug">
                            {proj.title}
                          </h3>
                        </Link>
                        <p className="text-xs sm:text-[13px] text-gray-400 dark:text-stone-300 font-sans leading-relaxed line-clamp-3">
                          {proj.description}
                        </p>
                      </div>

                      {/* Bottom Footer: Tech Stack Chips & Aligned Actions */}
                      <div className="mt-auto pt-4 border-t border-white/10 space-y-4">
                        {/* Tech Chips */}
                        <div className="flex flex-wrap gap-1.5 items-center">
                          {proj.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="glass-subtle text-stone-300 px-2 py-0.5 rounded text-[10px] font-mono font-medium border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                          {proj.techStack.length > 4 && (
                            <span
                              className="glass-subtle text-stone-400 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium border border-white/5"
                              title={proj.techStack.slice(4).join(', ')}
                            >
                              +{proj.techStack.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Aligned Bottom Actions */}
                        <div className="flex items-center justify-between gap-3 pt-1">
                          <Link
                            to={`/project/${proj.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-lightAccent dark:text-darkAccent hover:text-darkHighlightAccent group-hover:translate-x-0.5 transition-all focus:outline-none"
                            title={`Read ${proj.title} full breakdown`}
                          >
                            <span>Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </Link>

                          <div className="flex items-center gap-2">
                            {proj.githubUrl && (
                              <a
                                href={proj.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md glass-subtle-interactive text-stone-300 hover:text-white text-[11px] font-mono font-medium cursor-pointer transition-colors"
                                title="View Source on GitHub"
                                aria-label={`View ${proj.title} source code on GitHub`}
                              >
                                <Github className="w-3.5 h-3.5" />
                                <span>Code</span>
                              </a>
                            )}
                            {proj.liveUrl && (
                              <a
                                href={proj.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-darkAccent/15 hover:bg-darkAccent/25 text-amber-300 hover:text-amber-200 border border-darkAccent/30 text-[11px] font-mono font-medium cursor-pointer transition-colors"
                                title="Open Live Demonstration"
                                aria-label={`Open live demo for ${proj.title}`}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                <span>Live</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </ScrollStaggerItem>
              );
            })}
          </AnimatePresence>
        </ScrollStagger>

        {/* Empty state search fallback */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center font-sans text-xs text-gray-500">
            No projects found matching "{search}" under {selectedCategory} category.
          </div>
        )}
      </div>
    </section>
  );
};
