import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Flame, Target, Trophy } from 'lucide-react';
import { Github } from '../components/SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

const CircularProgress: React.FC<{ value: number; max: number; label: string; colorClass: string }> = ({
  value,
  max,
  label,
  colorClass
}) => {
  const percentage = Math.min(value / max, 1);
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - percentage * circumference;

  return (
    <div className="flex items-center gap-3 bg-gray-50/50 dark:bg-gray-950/40 p-3 rounded-2xl border border-gray-200 dark:border-gray-800/60">
      <div className="relative w-14 h-14 rotate-[-90deg]">
        <svg className="w-full h-full" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r={radius}
            className="stroke-gray-200 dark:stroke-gray-800"
            strokeWidth="3.5"
            fill="transparent"
          />
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            className={colorClass}
            strokeWidth="3.5"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center rotate-[90deg] font-mono text-[10px] font-bold text-lightText dark:text-darkText">
          {value}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">
          {label}
        </p>
        <span className="text-[9px] text-gray-400 dark:text-gray-500 block mt-0.5">
          Benchmark: {max}
        </span>
      </div>
    </div>
  );
};

export const CodingProfiles: React.FC = () => {
  const { codingProfiles } = portfolioData;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-55, 55]);
  const y2 = useTransform(scrollYProgress, [0, 1], [55, -55]);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5 text-gray-800 dark:text-white" />;
      case 'leetcode':
        return <Flame className="w-5 h-5 text-orange-500" />;
      case 'codeforces':
        return <Trophy className="w-5 h-5 text-indigo-500" />;
      default:
        return <Target className="w-5 h-5 text-indigo-500" />;
    }
  };

  const getCircleColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return 'stroke-gray-800 dark:stroke-white';
      case 'leetcode':
        return 'stroke-orange-500';
      case 'codeforces':
        return 'stroke-indigo-500';
      default:
        return 'stroke-indigo-500';
    }
  };

  return (
    <section id="codingprofiles" ref={containerRef} className="py-24 px-6 relative overflow-hidden">
      {/* Parallax background shapes */}
      <motion.div
        style={{ y: y1 }}
        className="absolute right-[10%] top-1/4 w-36 h-36 rounded-full bg-lightAccent/5 dark:bg-cyan-500/10 blur-2xl pointer-events-none select-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute left-[10%] bottom-1/4 w-44 h-44 rounded-full bg-lightAccent/5 dark:bg-indigo-500/10 blur-3xl pointer-events-none select-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Metrics
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText">
              Coding Profiles & Ratings
            </h2>
            <div className="w-12 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Profiles Grid */}
        <ScrollStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {codingProfiles.map((profile) => (
            <ScrollStaggerItem key={profile.platform} animation="scale-in">
              <div className="p-6 sm:p-8 rounded-3xl border border-gray-200/25 dark:border-gray-800/85 bg-white dark:bg-gray-900 shadow-sm hover:border-lightAccent/25 dark:hover:border-darkAccent/25 hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-6">
                {/* Profile Card Header */}
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      {getPlatformIcon(profile.platform)}
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-sm sm:text-base text-lightText dark:text-darkText">
                        {profile.platform}
                      </h3>
                      <p className="text-[10px] font-mono text-gray-500 dark:text-gray-400 mt-0.5">
                        @{profile.username}
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href={profile.link}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl text-gray-400 hover:text-lightAccent dark:hover:text-darkAccent bg-gray-50 dark:bg-gray-800 hover:bg-lightAccent/10 dark:hover:bg-darkAccent/10 cursor-pointer transition-all"
                    title={`Open ${profile.platform}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Central Rating Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-indigo-50/30 dark:bg-indigo-950/20 px-4 py-3 rounded-2xl border border-indigo-500/10">
                    <span className="text-[10px] uppercase font-sans font-bold text-gray-500 dark:text-gray-400">
                      Platform Credential
                    </span>
                    <span className="text-xs font-mono font-extrabold text-lightAccent dark:text-darkAccent">
                      {profile.rating}
                    </span>
                  </div>

                  {/* SVG circular progress */}
                  {profile.maxSolvedCount && (
                    <CircularProgress
                      value={profile.solvedCount}
                      max={profile.maxSolvedCount}
                      label={profile.platform === 'GitHub' ? 'Contributions' : 'Solved Count'}
                      colorClass={getCircleColor(profile.platform)}
                    />
                  )}
                </div>

                {/* Sub Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-gray-800 pt-5">
                  {profile.stats.map((st) => (
                    <div key={st.label} className="text-center">
                      <span className="text-[9px] uppercase font-sans font-semibold text-gray-400 tracking-wider">
                        {st.label}
                      </span>
                      <p className="font-mono font-extrabold text-xs text-lightText dark:text-darkText mt-1">
                        {st.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollStaggerItem>
          ))}
        </ScrollStagger>
      </div>
    </section>
  );
};
