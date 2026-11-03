import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { BookOpen, Compass, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';
import { useGitHubContributions } from '../hooks/useGitHubContributions';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { useLeetCodeStats } from '../hooks/useLeetCodeStats';

const AnimatedCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ 
  value, 
  suffix = '', 
  duration = 1.5 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMs = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMs / end), 20);
    const increment = Math.ceil(end / (totalMs / stepTime));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref} className="font-display font-extrabold text-3xl sm:text-4xl text-lightAccent dark:text-darkAccent">
      {count}
      {suffix}
    </span>
  );
};

export const About: React.FC = () => {
  const { stats } = portfolioData;
  const { contributions: ghContributions, loading: ghLoading, error: ghError } = useGitHubContributions();
  const { repos: ghRepos, loading: reposLoading, error: reposError } = useGitHubRepos();
  const { solved: leetCodeSolved, loading: leetCodeLoading, error: leetCodeError } = useLeetCodeStats();

  const cards = [
    {
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
      title: 'Academic Path',
      description: 'Pursuing a Bachelor of Technology in Computer Science & Engineering, building a strong academic foundation in computing principles and exploring the evolving world of technology and software engineering.',
    },
    {
      icon: <Compass className="w-5 h-5 text-purple-500" />,
      title: 'Career Journey',
      description: 'Progressed from writing basic scripts to developing full-stack web applications, exploring AI integration, and continuously improving my software development skills through hands-on projects and GitHub collaboration.',
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: 'Core Philosophy',
      description: 'Focusing on clean, readable codebases, responsive design aesthetics, practical AI integration, efficient and scalable systems, and knowledge sharing within the developer community.',
    },
  ];

  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <ScrollReveal animation="blur-in" duration={0.8}>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest">
              Biography
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-lightText dark:text-darkText">
              About Me
            </h2>
            <div className="w-12 h-1 bg-lightAccent dark:bg-darkAccent mx-auto rounded-full" />
          </div>
        </ScrollReveal>

        {/* Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Panel: Intro Narrative & Stats Grid */}
          <div className="lg:col-span-7 space-y-8">
            <ScrollReveal animation="fade-up" duration={0.8} delay={0.1}>
              <div className="p-6 rounded-lg glass-subtle space-y-4 text-stone-300 text-sm sm:text-base leading-relaxed">
                <h3 className="font-display font-bold text-xl text-lightHeading dark:text-darkHeading">
                  Hi, I'm Ronit Sinha. I engineer solutions.
                </h3>
                <p className="text-stone-300 font-sans leading-relaxed">
                  I'm a Computer Science student and aspiring full-stack developer passionate about building modern web applications and exploring AI integration. I enjoy working with the MERN stack, experimenting with AI-powered solutions, and strengthening my understanding of software architecture, design patterns, and core software engineering principles.
                </p>
                <p className="text-stone-300 font-sans leading-relaxed">
                  I'm constantly learning, building projects, and exploring new technologies to write clean, efficient, and maintainable code. My goal is to turn creative ideas into practical solutions and grow as a software engineer.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats Counters Grid - Borderless Content */}
            <ScrollStagger className="grid grid-cols-2 gap-6 pt-2">
              {stats.map((stat) => {
                const isContributions = stat.label === 'GitHub Contributions';
                const isRepos = stat.label === 'GitHub Repositories';
                const isLeetCode = stat.label === 'Coding Problems Solved';
                let suffix = '+';
                if (stat.label.includes('Solved')) suffix = '+';
                return (
                  <ScrollStaggerItem key={stat.label} animation="scale-in">
                    <div className="py-2 px-1 flex flex-col gap-1 content-borderless">
                      {isContributions ? (
                        ghLoading && ghContributions === null ? (
                          <span className="font-display font-extrabold text-3xl sm:text-4xl text-lightAccent/40 dark:text-darkAccent/40 animate-pulse">
                            ...
                          </span>
                        ) : ghError && ghContributions === null ? (
                          <span
                            className="font-display font-extrabold text-3xl sm:text-4xl text-gray-400"
                            title="Unable to load GitHub contributions graph"
                          >
                            —
                          </span>
                        ) : (
                          <AnimatedCounter value={ghContributions ?? 0} suffix={suffix} />
                        )
                      ) : isRepos ? (
                        reposLoading && ghRepos === null ? (
                          <span className="font-display font-extrabold text-3xl sm:text-4xl text-lightAccent/40 dark:text-darkAccent/40 animate-pulse">
                            ...
                          </span>
                        ) : reposError && ghRepos === null ? (
                          <span
                            className="font-display font-extrabold text-3xl sm:text-4xl text-gray-400"
                            title="Unable to load GitHub repositories"
                          >
                            —
                          </span>
                        ) : (
                          <AnimatedCounter value={ghRepos ?? 0} suffix={suffix} />
                        )
                      ) : isLeetCode ? (
                        leetCodeLoading && leetCodeSolved === null ? (
                          <span className="font-display font-extrabold text-3xl sm:text-4xl text-lightAccent/40 dark:text-darkAccent/40 animate-pulse">
                            ...
                          </span>
                        ) : leetCodeError && leetCodeSolved === null ? (
                          <span
                            className="font-display font-extrabold text-3xl sm:text-4xl text-gray-400"
                            title="Unable to load LeetCode solved problems"
                          >
                            —
                          </span>
                        ) : (
                          <AnimatedCounter value={leetCodeSolved ?? 0} suffix={suffix} />
                        )
                      ) : (
                        <AnimatedCounter value={stat.value} suffix={suffix} />
                      )}
                      <span className="text-xs font-semibold text-gray-400 font-sans tracking-wide uppercase">
                        {stat.label}
                      </span>
                    </div>
                  </ScrollStaggerItem>
                );
              })}
            </ScrollStagger>
          </div>

          {/* Right Panel: Important About Information Cards (Primary Glass) */}
          <ScrollStagger className="lg:col-span-5 space-y-4">
            {cards.map((card) => (
              <ScrollStaggerItem key={card.title} animation="fade-right">
                <div className="p-6 rounded-lg glass-primary-interactive flex gap-4 items-start group">
                  <div className="p-3 rounded-lg glass-subtle flex items-center justify-center flex-shrink-0 group-hover:border-darkAccent/40 transition-colors">
                    {card.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm text-lightHeading dark:text-darkHeading group-hover:text-darkAccent transition-colors">
                      {card.title}
                    </h4>
                    <p className="text-xs text-gray-400 dark:text-stone-300 font-sans leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </div>
    </section>
  );
};
