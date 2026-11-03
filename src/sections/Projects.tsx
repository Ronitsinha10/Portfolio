import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight, FileText, Mic, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

// Sleek, compact visual preview representing each project
const ProjectVisual: React.FC<{ projectId: string }> = ({ projectId }) => {
  switch (projectId) {
    case 'proj1': // B.Tech Resume Builder
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/40 p-3 flex flex-col justify-between text-white font-sans select-none relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-sky-500/15 rounded-full blur-xl pointer-events-none" />

          {/* Top miniature status bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 relative z-10">
            <span className="text-[9px] font-bold text-sky-400 flex items-center gap-1.5">
              <FileText className="w-3 h-3 text-sky-400" />
              Resume Builder
            </span>
            <span className="text-[8px] font-mono bg-sky-500/15 text-sky-300 px-1.5 py-0.5 rounded border border-sky-500/20">
              ATS-Optimized
            </span>
          </div>

          {/* Mini document mock representation */}
          <div className="flex items-center gap-2.5 py-1 relative z-10">
            {/* Left mini sheet */}
            <div className="w-16 h-14 bg-white text-slate-900 rounded-md p-1.5 shadow-sm flex flex-col justify-between text-[5px] shrink-0">
              <div>
                <div className="w-8 h-1 bg-sky-600 rounded-xs mb-1" />
                <div className="w-12 h-0.5 bg-slate-300 rounded-xs my-0.5" />
                <div className="w-10 h-0.5 bg-slate-200 rounded-xs" />
              </div>
              <div className="flex justify-between items-center text-[4.5px] text-sky-700 font-bold border-t border-slate-100 pt-0.5">
                <span>ATS 100%</span>
                <span>PDF</span>
              </div>
            </div>

            {/* Right mini features list */}
            <div className="flex-1 space-y-1 font-mono text-[7.5px] text-slate-300">
              <div className="flex items-center gap-1 text-slate-400">
                <span className="w-1 h-1 rounded-full bg-sky-400" />
                <span>Live Split Preview</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span>Multi-Theme Export</span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="w-1 h-1 rounded-full bg-blue-400" />
                <span>Client Persistence</span>
              </div>
            </div>
          </div>

          {/* Bottom subtle bar */}
          <div className="flex items-center justify-between text-[7px] text-slate-500 font-mono pt-1 border-t border-slate-800/60">
            <span>Client-side SPA</span>
            <span className="text-sky-400 font-medium">1-Click PDF</span>
          </div>
        </div>
      );

    case 'proj2': // Virtual Interview Coach
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950/40 p-3 flex flex-col justify-between text-white font-sans select-none relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-violet-500/15 rounded-full blur-xl pointer-events-none" />

          {/* Top miniature status bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 relative z-10">
            <span className="text-[9px] font-bold text-violet-400 flex items-center gap-1.5">
              <Mic className="w-3 h-3 text-violet-400" />
              AI Interview Coach
            </span>
            <span className="text-[8px] font-mono bg-violet-500/15 text-violet-300 px-1.5 py-0.5 rounded border border-violet-500/20">
              ElevenLabs Voice
            </span>
          </div>

          {/* Audio Waveform miniature visualization */}
          <div className="flex items-center justify-center gap-1 py-1.5 relative z-10">
            {[25, 45, 80, 50, 95, 70, 35, 75, 90, 60, 40].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-full bg-gradient-to-t from-violet-600 to-indigo-400"
                style={{ height: `${h * 0.22}px` }}
              />
            ))}
          </div>

          {/* Bottom metrics row */}
          <div className="flex items-center justify-between text-[7.5px] font-mono bg-slate-900/80 px-2 py-1 rounded border border-slate-800 text-slate-300">
            <span className="text-violet-400">AI Feedback:</span>
            <span className="text-emerald-400 font-bold">Clarity 94%</span>
            <span className="text-cyan-400 font-bold">Confidence 91%</span>
          </div>
        </div>
      );

    case 'proj3': // Developer Portfolio
      return (
        <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-3 flex flex-col justify-between text-white font-sans select-none relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-cyan-500/15 rounded-full blur-xl pointer-events-none" />

          {/* Top miniature status bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-1.5 relative z-10">
            <span className="text-[9px] font-bold text-cyan-400 flex items-center gap-1.5">
              <Terminal className="w-3 h-3 text-cyan-400" />
              Developer Portfolio
            </span>
            <span className="text-[8px] font-mono bg-cyan-500/15 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/20">
              React 19 • Vite
            </span>
          </div>

          {/* Mini command bar mockup */}
          <div className="bg-slate-900/90 rounded-md p-1.5 border border-slate-800 flex items-center justify-between text-[7px] font-mono text-slate-400 relative z-10">
            <span className="text-cyan-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              ⌘K Navigation
            </span>
            <span className="bg-slate-800 text-slate-300 px-1 rounded text-[6.5px]">Active</span>
          </div>

          {/* Bottom live stats tags */}
          <div className="flex items-center justify-between text-[7px] text-slate-400 font-mono pt-1 border-t border-slate-800/60">
            <span>Live GitHub API</span>
            <span className="text-cyan-400">LeetCode Stats</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="w-full h-full bg-gradient-to-r from-lightAccent to-lightSecondaryAccent flex items-center justify-center text-white font-semibold">
          Portfolio Project
        </div>
      );
  }
};

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

        {/* Refined Compact Project Cards Grid */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => {
              const isFeatured = Boolean(proj.featured);
              return (
                <ScrollStaggerItem key={proj.id} animation="scale-in">
                  <Link
                    to={`/project/${proj.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-darkAccent rounded-lg"
                    title={`Open ${proj.title} case study in a new page`}
                  >
                    <motion.div
                      layout
                      className="flex flex-col h-full rounded-lg overflow-hidden glass-primary-interactive"
                    >
                      {/* Compact Visual Header (h-[135px]) */}
                      <div className="h-[135px] w-full border-b border-white/10 overflow-hidden relative">
                        <ProjectVisual projectId={proj.id} />
                        
                        {/* Category Pill Tag & Featured Indicator */}
                        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="glass-subtle text-stone-200 px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider font-bold shadow-xs">
                            {proj.category}
                          </span>
                          {isFeatured && (
                            <span className="px-1.5 py-0.5 rounded bg-darkAccent/90 text-white font-mono text-[8.5px] uppercase tracking-wider font-extrabold shadow-xs">
                              Featured
                            </span>
                          )}
                        </div>

                        {/* External Arrow Quick Cue */}
                        <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full glass-subtle flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-darkAccent transition-all shadow-xs">
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>

                      {/* Compact Content Area */}
                      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                        <div className="space-y-1.5">
                          <h3 className="font-display font-bold text-sm sm:text-base text-lightHeading dark:text-darkHeading group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors">
                            {proj.title}
                          </h3>
                          <p className="text-xs text-gray-400 dark:text-stone-300 font-sans leading-relaxed line-clamp-2">
                            {proj.description}
                          </p>
                        </div>

                        {/* Tech Chips & Explanatory Link */}
                        <div className="space-y-2.5 pt-2 border-t border-white/10">
                          <div className="flex flex-wrap gap-1.5">
                            {proj.techStack.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="glass-subtle text-stone-300 px-2 py-0.5 rounded text-[10px] font-mono font-medium"
                              >
                                {tech}
                              </span>
                            ))}
                            {proj.techStack.length > 3 && (
                              <span className="glass-subtle text-stone-400 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium">
                                +{proj.techStack.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[11px] font-semibold text-lightAccent dark:text-darkAccent pt-0.5">
                            <span>View Full Explanation</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
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
