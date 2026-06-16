import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, X, Terminal as TermIcon, GitCommit, LineChart } from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { portfolioData } from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

// Inline Mock UI visuals representing each project, replacing generic placeholders
const ProjectVisual: React.FC<{ projectId: string }> = ({ projectId }) => {
  switch (projectId) {
    case 'proj1': // DevSphere SaaS
      return (
        <div className="w-full h-full bg-slate-900 flex flex-col p-4 text-white font-mono text-[9px] select-none">
          {/* Header */}
          <div className="flex justify-between border-b border-gray-800 pb-2 mb-3">
            <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              DevSphere Workspace
            </span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            </div>
          </div>
          {/* Kanban Board Representation */}
          <div className="grid grid-cols-3 gap-2 flex-1">
            <div className="bg-slate-800/40 p-2 rounded border border-gray-800">
              <p className="text-[8px] text-gray-400 font-bold mb-1">Todo</p>
              <div className="bg-slate-800 p-1.5 rounded border border-gray-700 mb-1 text-gray-300">Auth system</div>
              <div className="bg-slate-800 p-1.5 rounded border border-gray-700 text-gray-300">Stripe gateway</div>
            </div>
            <div className="bg-slate-800/40 p-2 rounded border border-gray-800">
              <p className="text-[8px] text-yellow-400 font-bold mb-1">Active</p>
              <div className="bg-indigo-950 p-1.5 rounded border border-indigo-800 text-indigo-300">Socket sync</div>
            </div>
            <div className="bg-slate-800/40 p-2 rounded border border-gray-800">
              <p className="text-[8px] text-emerald-400 font-bold mb-1">Done</p>
              <div className="bg-slate-800 p-1.5 rounded border border-gray-700 opacity-50 line-through text-gray-300">Setup repo</div>
            </div>
          </div>
        </div>
      );

    case 'proj2': // Aura UI Design Engine
      return (
        <div className="w-full h-full bg-zinc-950 flex flex-col p-4 text-zinc-300 font-sans select-none justify-center items-center relative overflow-hidden">
          {/* Gradient blobs in back */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-500/10 blur-xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-indigo-500/10 blur-xl animate-pulse" />
          {/* Interactive button layout mockup */}
          <div className="z-10 flex flex-col gap-3 items-center w-full max-w-[180px] p-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl backdrop-blur-md">
            <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Button Customizer</span>
            <div className="w-full h-8 flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-[10px] font-semibold text-white shadow-lg shadow-indigo-500/20">
              Interactive Preview
            </div>
            <div className="flex gap-1.5 w-full">
              <div className="flex-1 py-1 rounded bg-zinc-800 border border-zinc-700 text-center text-[7px] text-zinc-400">Border Radius</div>
              <div className="flex-1 py-1 rounded bg-zinc-800 border border-zinc-700 text-center text-[7px] text-zinc-400">Spring Damping</div>
            </div>
          </div>
        </div>
      );

    case 'proj3': // Concurrent Logs Processor
      return (
        <div className="w-full h-full bg-black flex flex-col p-4 text-emerald-400 font-mono text-[8px] select-none">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 mb-2">
            <TermIcon className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[8px]">LOG-PROCESSOR v1.02</span>
          </div>
          {/* Mock scrolling CLI logger */}
          <div className="space-y-1.5 overflow-hidden flex-1 flex flex-col justify-end">
            <div><span className="text-zinc-500">[17:20:10.051]</span> <span className="text-indigo-400">INFO</span> Initiating thread pool size 32...</div>
            <div><span className="text-zinc-500">[17:20:10.125]</span> <span className="text-emerald-400">INFO</span> Connected logs PostgreSQL buffer db.</div>
            <div><span className="text-zinc-500">[17:20:10.334]</span> <span className="text-yellow-400">WARN</span> Thread-22 buffer backlog exceeds 80%. Splitting task...</div>
            <div><span className="text-zinc-500">[17:20:10.450]</span> <span className="text-emerald-400">SUCCESS</span> Processed 104,250 server records in 980ms.</div>
            <div className="text-white animate-pulse">_</div>
          </div>
        </div>
      );

    case 'proj4': // OpenGit Visualizer
      return (
        <div className="w-full h-full bg-gray-950 flex flex-col p-4 text-gray-300 font-mono text-[9px] select-none">
          <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-3">
            <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1.5">
              <GitCommit className="w-4 h-4 text-emerald-500" />
              OpenGit Analyst
            </span>
            <span className="text-[8px] text-gray-500 uppercase">GraphQL API Connected</span>
          </div>
          {/* Commit Heatmap simulation */}
          <div className="flex-1 flex flex-col justify-center gap-1.5">
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 14 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3.5 h-3.5 rounded-sm ${
                    i % 3 === 0 ? 'bg-emerald-900' : i % 5 === 0 ? 'bg-emerald-600' : i % 7 === 0 ? 'bg-emerald-500' : 'bg-gray-900'
                  }`} 
                />
              ))}
            </div>
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 14 }).map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3.5 h-3.5 rounded-sm ${
                    i % 2 === 0 ? 'bg-emerald-700' : i % 4 === 0 ? 'bg-emerald-500' : i % 3 === 0 ? 'bg-emerald-950' : 'bg-gray-900'
                  }`} 
                />
              ))}
            </div>
            <div className="flex justify-between items-center px-4 mt-2 text-gray-500 text-[8px]">
              <span>PRs Accepted: 12</span>
              <span>Global Commit Rank: #3</span>
            </div>
          </div>
        </div>
      );

    case 'proj5': // Nova Commerce Hub
      return (
        <div className="w-full h-full bg-slate-950 flex flex-col p-4 text-white font-sans select-none justify-between">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-[10px] font-bold flex items-center gap-1 text-cyan-400">
              <LineChart className="w-3.5 h-3.5" />
              Nova Dashboard
            </span>
            <span className="bg-cyan-500/10 text-cyan-400 px-1.5 py-0.5 rounded text-[8px]">Live Staging</span>
          </div>
          {/* Dashboard metric layout */}
          <div className="grid grid-cols-2 gap-2 my-2">
            <div className="bg-slate-900 p-2 rounded border border-slate-800">
              <span className="text-[7px] text-gray-500 uppercase font-semibold">Total Revenue</span>
              <p className="text-xs font-bold font-mono text-emerald-400">$12,450.00</p>
            </div>
            <div className="bg-slate-900 p-2 rounded border border-slate-800">
              <span className="text-[7px] text-gray-500 uppercase font-semibold">Checkout Rate</span>
              <p className="text-xs font-bold font-mono text-cyan-400">92.4%</p>
            </div>
          </div>
          <div className="h-6 w-full rounded bg-indigo-600/10 border border-indigo-600/30 flex items-center justify-center text-[8px] text-indigo-400 font-semibold font-mono">
            Stripe Integration Secured
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
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'Full Stack', 'MERN', 'Open Source', 'Java', 'UI/UX'];

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

  // Scroll lock when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 px-6 relative bg-gray-50/50 dark:bg-gray-950/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Search bar */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stack or titles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200/20 dark:border-gray-800/80 bg-white/70 dark:bg-gray-900/60 backdrop-blur-md text-xs font-semibold outline-none text-lightText dark:text-darkText focus:border-lightAccent dark:focus:border-darkAccent transition-colors"
            />
          </div>

          {/* Category Pill Filters */}
          <div className="flex flex-wrap items-center gap-2 max-w-full overflow-x-auto pb-1 select-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-lightAccent dark:bg-darkAccent text-white'
                    : 'border border-gray-200/20 dark:border-gray-800/80 bg-white/40 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 hover:border-lightAccent/40 dark:hover:border-darkAccent/40 hover:text-lightAccent dark:hover:text-darkAccent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards Grid */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <ScrollStaggerItem key={proj.id} animation="scale-in">
                <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedProject(proj)}
                className="group flex flex-col h-full rounded-2xl border border-gray-200/25 dark:border-gray-800/85 bg-white dark:bg-gray-900 shadow-sm overflow-hidden cursor-pointer hover:border-lightAccent/30 dark:hover:border-darkAccent/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Visual Section Placeholder (Height 200px) */}
                <div className="h-[200px] w-full border-b border-gray-200 dark:border-gray-800/80 overflow-hidden relative">
                  <ProjectVisual projectId={proj.id} />
                  {/* Category overlay */}
                  <span className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-900/90 text-lightText dark:text-darkText px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider font-semibold border border-gray-200/10 shadow-sm">
                    {proj.category}
                  </span>
                </div>

                {/* Details Section */}
                <div className="p-6 flex-1 flex flex-col gap-3 justify-between">
                  <div className="space-y-1">
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-lightText dark:text-darkText group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed line-clamp-2">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech Tag Badges */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {proj.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded text-[10px] font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.techStack.length > 4 && (
                      <span className="bg-gray-100 dark:bg-gray-800 text-gray-400 px-2 py-0.5 rounded text-[10px] font-medium">
                        +{proj.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
                </ScrollStaggerItem>
            ))}
          </AnimatePresence>
        </ScrollStagger>

        {/* Empty state search fallback */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center font-sans text-xs text-gray-500">
            No projects found matching "{search}" under {selectedCategory} category.
          </div>
        )}

        {/* Detail Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
              {/* Backdrop blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 25 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-gray-200/20 dark:border-gray-800/80 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden z-10"
              >
                {/* Header close */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-gray-100/80 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700/80 text-gray-600 dark:text-gray-300 z-20 cursor-pointer transition-all"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Scrollable details panel */}
                <div className="overflow-y-auto flex-1">
                  {/* Top visual graphic */}
                  <div className="h-[240px] w-full relative border-b border-gray-200/20">
                    <ProjectVisual projectId={selectedProject.id} />
                  </div>

                  {/* Body description content */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-lightAccent dark:text-darkAccent font-bold">
                        {selectedProject.category} Project
                      </span>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-lightText dark:text-darkText">
                        {selectedProject.title}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                        Project Overview
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-sans leading-relaxed">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    {/* Features checklist */}
                    <div className="space-y-3">
                      <h4 className="font-display font-bold text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                        Key Features
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                        {selectedProject.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-lightAccent dark:bg-darkAccent mt-1.5 flex-shrink-0" />
                            <span className="font-sans leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech tag list */}
                    <div className="space-y-2">
                      <h4 className="font-display font-bold text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wider">
                        Technology Stack
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-[10px] font-semibold"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions links */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200/20 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-950/50">
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-medium text-xs uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lightAccent dark:bg-darkAccent text-white font-medium text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-lightAccent/10 hover:shadow-lightAccent/20 hover:bg-lightAccent/90 dark:hover:bg-darkAccent/90 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
