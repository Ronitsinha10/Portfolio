import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { BookOpen, Compass, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from '../components/ScrollReveal';

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

  const cards = [
    {
      icon: <BookOpen className="w-5 h-5 text-indigo-500" />,
      title: 'Academic Path',
      description: 'Pursuing a Bachelor of Technology in Computer Science & Engineering. Maintaining an aggregate CGPA of 9.1/10 while diving deep into system structures and algorithms.',
    },
    {
      icon: <Compass className="w-5 h-5 text-purple-500" />,
      title: 'Career Journey',
      description: 'Progressed from writing basic scripts to engineering modern full-stack applications, building scalable web solutions, and contributing to open-source projects through GitHub collaboration.',
    },
    {
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      title: 'Core Philosophy',
      description: 'Focusing on clean, readable codebases, responsive design aesthetics, high concurrency standards, and sharing knowledge through developer community networks.',
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
              <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                <h3 className="font-display font-bold text-xl text-lightText dark:text-darkText">
                  Hi, I'm Ronit Sinha. I engineer solutions.
                </h3>
                <p>
                  I am a dedicated Computer Science student and software engineer who thrives at the intersection of developer experience, system design, and open-source software. With a strong foundation in data structures, concurrent patterns, and database layouts, I enjoy building tools that solve real problems.
                </p>
                <p>
                  My journey took a major leap forward when I started contributing to open-source project ecosystems under The Linux Foundation. Working on production-level architectures, I learned how to coordinate with global teams, perform systematic refactoring, and maintain code standards.
                </p>
              </div>
            </ScrollReveal>

            {/* Stats Counters Grid */}
            <ScrollStagger className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                let suffix = '+';
                if (stat.label.includes('Solved')) suffix = '+';
                return (
                  <ScrollStaggerItem key={stat.label} animation="scale-in">
                    <div className="p-5 rounded-2xl border border-gray-200/20 dark:border-gray-800/80 bg-white/50 dark:bg-gray-900/40 backdrop-blur-md flex flex-col gap-1.5">
                      <AnimatedCounter value={stat.value} suffix={suffix} />
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 font-sans tracking-wide uppercase">
                        {stat.label}
                      </span>
                    </div>
                  </ScrollStaggerItem>
                );
              })}
            </ScrollStagger>
          </div>

          {/* Right Panel: Feature Narrative Cards */}
          <ScrollStagger className="lg:col-span-5 space-y-4">
            {cards.map((card) => (
              <ScrollStaggerItem key={card.title} animation="fade-right">
                <div className="p-6 rounded-2xl border border-gray-200/25 dark:border-gray-800/85 bg-white dark:bg-gray-900 shadow-sm flex gap-4 items-start hover:border-lightAccent/30 dark:hover:border-darkAccent/30 hover:shadow-md transition-all duration-300 group">
                  <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 group-hover:bg-lightAccent/10 dark:group-hover:bg-darkAccent/10 transition-colors">
                    {card.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm text-lightText dark:text-darkText">
                      {card.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans leading-relaxed">
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
