import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Code2 } from 'lucide-react';
import { Github, Linkedin, X } from '../components/SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { fadeInUp, staggerContainer } from '../animations/variants';
import profileImg from '../assets/profile.jpg';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { name, typingRoles, socials } = portfolioData.personalInfo;
  
  // Custom typing animation
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Mouse parallax motion states
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / (height / 2)) * 3; // max 3 degrees tilt
    const rY = (mouseX / (width / 2)) * 3;
    const tX = (mouseX / (width / 2)) * 5; // max 5px translation
    const tY = (mouseY / (height / 2)) * 5;

    setRotateX(rX);
    setRotateY(rY);
    setTranslateX(tX);
    setTranslateY(tY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setTranslateX(0);
    setTranslateY(0);
  };

  useEffect(() => {
    const currentFullText = typingRoles[roleIndex];
    
    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));
        setTypingSpeed(100);

        if (displayedText === currentFullText) {
          // Pause at the end before deleting
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // Deleting characters
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        setTypingSpeed(50);

        if (displayedText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % typingRoles.length);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, typingRoles, typingSpeed]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[95vh] flex items-center justify-center py-20 px-6 overflow-hidden"
    >
      {/* Abstract floating shapes behind */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 dark:opacity-15">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 w-24 h-24 rounded-3xl border border-lightAccent/20 dark:border-darkAccent/30"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -15, 0],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-1/4 right-10 w-32 h-32 rounded-[40px] border border-purple-500/20 dark:border-darkBorder/30"
        />
        <motion.div
          animate={{
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-cyan-500/10 dark:bg-transparent blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        {/* Left column: Text */}
        <motion.div 
          variants={staggerContainer(0.12, 0.3)}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left gap-6"
        >
          {/* Welcome Badge */}
          <motion.div
            variants={fadeInUp(0, 0.6)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-lightAccent/10 dark:border-darkAccent/20 bg-lightAccent/5 dark:bg-darkAccent/10 text-xs font-semibold text-lightAccent dark:text-darkAccent uppercase tracking-widest"
          >
            <span className="w-2 h-2 rounded-full bg-lightAccent dark:bg-darkAccent animate-pulse" />
            Welcome to my space
          </motion.div>

          {/* Heading */}
          <motion.div variants={fadeInUp(0.1, 0.6)} className="space-y-3">
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-lightHeading dark:text-darkHeading leading-[1.1]">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-lightAccent via-lightSecondaryAccent to-lightHighlightAccent dark:from-darkAccent dark:to-darkSecondaryAccent bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            
            {/* Animated Typing Role */}
            <div className="h-8 sm:h-10 flex items-center justify-center lg:justify-start">
              <p className="font-display font-medium text-lg sm:text-2xl text-gray-500 dark:text-gray-400">
                I am a{' '}
                <span className="text-lightAccent dark:text-darkAccent font-semibold border-r-2 border-lightAccent dark:border-darkAccent pr-1 animate-pulse">
                  {displayedText}
                </span>
              </p>
            </div>
          </motion.div>

          {/* Short introduction */}
          <motion.p
            variants={fadeInUp(0.2, 0.6)}
            className="max-w-xl text-sm sm:text-base text-lightText dark:text-darkText font-sans leading-relaxed"
          >
            {portfolioData.personalInfo.tagline} Currently pursuing Computer Science, actively contributing to open-source systems, and solving complex problems with clean architectures.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp(0.3, 0.6)}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={() => handleScrollTo('projects')}
              className="group flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full bg-lightAccent dark:bg-gradient-to-r dark:from-darkAccent dark:to-darkSecondaryAccent text-white font-semibold text-sm cursor-pointer shadow-lg shadow-lightAccent/10 hover:shadow-lightAccent/20 dark:shadow-black/20 dark:hover:shadow-black/30 hover:translate-y-[-2px] transition-all duration-300"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenResume}
              className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-full border border-gray-200/20 dark:border-darkAccent bg-white/50 dark:bg-gray-900 text-lightText dark:text-darkAccent font-semibold text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-darkAccent dark:hover:text-white hover:translate-y-[-2px] transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </motion.div>

          {/* Social Icons Links */}
          <motion.div
            variants={fadeInUp(0.4, 0.6)}
            className="flex items-center justify-center gap-3 mt-4"
          >
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border border-gray-200/20 dark:border-gray-800 bg-white/50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 hover:border-lightAccent dark:hover:border-darkAccent hover:text-lightAccent dark:hover:text-darkAccent cursor-pointer transition-all duration-300 hover:scale-110"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border border-gray-200/20 dark:border-gray-800 bg-white/50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 hover:border-lightAccent dark:hover:border-darkAccent hover:text-lightAccent dark:hover:text-darkAccent cursor-pointer transition-all duration-300 hover:scale-110"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={socials.x}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border border-gray-200/20 dark:border-gray-800 bg-white/50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 hover:border-lightAccent dark:hover:border-darkAccent hover:text-lightAccent dark:hover:text-darkAccent cursor-pointer transition-all duration-300 hover:scale-110"
              title="X"
            >
              <X className="w-4 h-4" />
            </a>
            <a
              href={socials.leetcode}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-full border border-gray-200/20 dark:border-gray-800 bg-white/50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 hover:border-lightAccent dark:hover:border-darkAccent hover:text-lightAccent dark:hover:text-darkAccent cursor-pointer transition-all duration-300 hover:scale-110"
              title="LeetCode"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href={socials.email}
              className="p-3 rounded-full border border-gray-200/20 dark:border-gray-800 bg-white/50 dark:bg-gray-900/40 text-gray-500 dark:text-gray-400 hover:border-lightAccent dark:hover:border-darkAccent hover:text-lightAccent dark:hover:text-darkAccent cursor-pointer transition-all duration-300 hover:scale-110"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right column: Avatar with Floating and Parallax Interaction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 flex items-center justify-center relative"
        >
          {/* Subtle dark shadow radial glow behind */}
          <div className="absolute w-72 h-72 rounded-full bg-black/5 dark:bg-black/25 blur-3xl pointer-events-none" />

          {/* Outer floating wrapper (Y-axis only) */}
          <motion.div
            animate={{
              y: [0, -6, 0]
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="flex flex-col items-center gap-5 relative z-10"
          >
            {/* Interactive Parallax Frame */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full p-[3px] bg-gradient-to-br from-[#D97706] via-[#EA580C] to-[#FBBF24] shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.4)] cursor-grab active:cursor-grabbing"
            >
              {/* Dark inner container */}
              <div 
                className="w-full h-full rounded-full bg-white dark:bg-[#1E1E1E] flex items-center justify-center overflow-hidden"
                style={{ transform: 'translateZ(10px)' }}
              >
                <img
                  src={profileImg}
                  alt="Ronit Sinha portrait"
                  className="w-full h-full object-cover select-none pointer-events-none scale-105"
                />
              </div>
            </motion.div>

            {/* Premium centered status badge sitting naturally below */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-stone-200 dark:border-[#292524] bg-white dark:bg-[#171717] shadow-sm select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 tracking-wide">
                Full Stack Developer
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
