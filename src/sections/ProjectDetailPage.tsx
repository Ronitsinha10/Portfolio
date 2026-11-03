import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Share2, 
  Check, 
  Laptop, 
  Cpu, 
  ShieldCheck
} from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { TechIcon } from '../components/TechIcon';
import { BackgroundEffects } from '../components/BackgroundEffects';
import { CustomCursor } from '../components/CustomCursor';
import { ProgressBar } from '../components/ProgressBar';
import { BackToTop } from '../components/BackToTop';
import { Footer } from '../components/Footer';
import { portfolioData, type ProjectItem } from '../data/portfolioData';

interface ProjectDetailPageProps {
  project?: ProjectItem;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ project: propProject }) => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);

  // Look up project from props or router param
  const project = propProject || portfolioData.projects.find((p) => p.id === id);
  const otherProjects = portfolioData.projects.filter((p) => p.id !== project?.id);

  const handleShare = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // ignore
    }
  };

  // If no project matches the route parameter
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-darkBg text-darkText text-center relative">
        <BackgroundEffects />
        <CustomCursor />
        <div className="relative z-10 space-y-4 max-w-md p-8 rounded-lg glass-primary shadow-lg">
          <span className="text-4xl">🔍</span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-lightHeading dark:text-darkHeading">
            Project Not Found
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-stone-400">
            The project case study you requested does not exist or may have been updated.
          </p>
          <div className="pt-2">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lightAccent dark:bg-darkAccent text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Projects</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative selection:bg-lightAccent/20 dark:selection:bg-darkAccent/30 bg-lightBg dark:bg-darkBg text-lightText dark:text-darkText overflow-x-hidden">
      {/* Background Ambience & Controls */}
      <BackgroundEffects />
      <CustomCursor />
      <ProgressBar />
      <BackToTop />

      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-[rgba(15,18,24,0.32)] backdrop-blur-[5px] py-4 px-6 border-b border-white/12 transition-colors">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Back Button & Logo */}
          <div className="flex items-center gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-subtle-interactive text-xs font-semibold text-stone-200 hover:text-white transition-all shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Projects</span>
            </Link>

            <span className="hidden sm:inline-block text-gray-300 dark:text-gray-700">|</span>

            <Link
              to="/"
              className="hidden sm:flex items-center gap-1 font-display font-extrabold text-base tracking-tight text-lightText dark:text-darkHeading"
            >
              Ronit
              <span className="bg-gradient-to-r from-lightAccent via-lightSecondaryAccent to-lightHighlightAccent dark:from-darkAccent dark:to-darkSecondaryAccent bg-clip-text text-transparent">
                .dev
              </span>
            </Link>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-subtle-interactive text-xs font-medium text-stone-300 hover:text-white transition-colors cursor-pointer"
              title="Copy Case Study URL"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 text-[11px] font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Share</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-6 py-12 sm:py-16 space-y-14 relative z-10">
        {/* Breadcrumb row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-stone-400"
        >
          <Link to="/" className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/projects" className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">
            Projects
          </Link>
          <span>/</span>
          <span className="text-lightAccent dark:text-darkAccent font-semibold truncate">
            {project.title}
          </span>
        </motion.div>

        {/* Hero Section of Project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Badge & Category */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-bold font-mono uppercase tracking-wider bg-lightAccent/10 text-lightAccent dark:bg-darkAccent/15 dark:text-darkAccent border border-lightAccent/20 dark:border-darkAccent/30">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Production Ready
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-lightHeading dark:text-darkHeading tracking-tight leading-[1.1]">
            {project.title}
          </h1>

          {/* Tagline / Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 dark:text-stone-300 font-sans leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-lightAccent via-lightSecondaryAccent to-lightHighlightAccent dark:from-darkAccent dark:to-darkSecondaryAccent text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-lightAccent/25 dark:hover:shadow-darkAccent/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open Live Demo</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-subtle-interactive text-lightHeading dark:text-darkHeading hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </motion.div>

        {/* Project Meta Metrics Strip (Light Glass) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 p-4 sm:p-5 rounded-lg glass-light shadow-sm"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 dark:text-stone-500 block">
              Discipline
            </span>
            <p className="text-xs sm:text-sm font-bold text-lightHeading dark:text-darkHeading flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5 text-lightAccent dark:text-darkAccent" />
              {project.category}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 dark:text-stone-500 block">
              Core Tech
            </span>
            <p className="text-xs sm:text-sm font-bold text-lightHeading dark:text-darkHeading flex items-center gap-1.5 truncate">
              <Cpu className="w-3.5 h-3.5 text-lightAccent dark:text-darkAccent" />
              {project.techStack[0]}, {project.techStack[1]}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 dark:text-stone-500 block">
              Architecture
            </span>
            <p className="text-xs sm:text-sm font-bold text-lightHeading dark:text-darkHeading flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-lightAccent dark:text-darkAccent" />
              Client-Driven
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400 dark:text-stone-500 block">
              Code Access
            </span>
            <p className="text-xs sm:text-sm font-bold text-lightHeading dark:text-darkHeading flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Public GitHub
            </p>
          </div>
        </motion.div>

        {/* Detailed Case Study / Explanation */}
        <section className="space-y-12">
          {/* Executive Overview & Problem Solved (Primary Glass) */}
          <div className="p-6 sm:p-8 rounded-lg glass-primary space-y-4">
            <div className="flex items-center gap-2 text-lightAccent dark:text-darkAccent">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-lightHeading dark:text-darkHeading">
                Project Overview & Architecture
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Key Capabilities & Features Grid */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
                Capabilities
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-lightHeading dark:text-darkHeading">
                Key Engineered Features
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-lg glass-light-interactive flex items-start gap-3.5"
                >
                  <div className="p-2 rounded-lg glass-subtle text-darkAccent shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="font-mono text-[10px] font-bold text-gray-400 dark:text-stone-500 uppercase tracking-wider block">
                      Feature 0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                      {feature}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Technology Stack */}
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
                Technologies
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-lightHeading dark:text-darkHeading">
                Tools & Frameworks
              </h2>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {project.techStack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg glass-subtle-interactive"
                >
                  <TechIcon name={tech} size={15} />
                  <span className="text-xs font-semibold text-stone-300 font-mono">
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Card & Links (Light Glass) */}
          <div className="p-8 sm:p-10 rounded-lg glass-light flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-lightHeading dark:text-darkHeading">
                Interested in exploring the implementation?
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
                Check out the live deployment or browse the GitHub repository to inspect code structure, commits, and architecture.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lightAccent dark:bg-darkAccent text-white text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live App
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-subtle-interactive text-stone-200 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Explore Other Projects (Primary Glass) */}
          {otherProjects.length > 0 && (
            <div className="space-y-6 pt-4 border-t border-white/10">
              <h3 className="font-display font-bold text-lg text-lightHeading dark:text-darkHeading">
                Other Featured Projects
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {otherProjects.map((other) => (
                  <Link
                    key={other.id}
                    to={`/project/${other.id}`}
                    className="p-5 rounded-lg glass-primary-interactive flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-lightAccent dark:text-darkAccent">
                        {other.category}
                      </span>
                      <h4 className="font-display font-bold text-sm text-lightHeading dark:text-darkHeading group-hover:text-lightAccent dark:group-hover:text-darkAccent transition-colors">
                        {other.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-stone-400 line-clamp-2">
                        {other.description}
                      </p>
                    </div>

                    <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Project Case Study →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
