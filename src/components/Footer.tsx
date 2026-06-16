import React from 'react';
import { Mail, Code2, Globe } from 'lucide-react';
import { Github, Linkedin, Twitter } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const { name, socials } = portfolioData.personalInfo;
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const footerLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Open Source', id: 'opensource' },
    { label: 'Achievements', id: 'achievements' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="border-t border-gray-200/10 dark:border-gray-800/40 bg-white/30 dark:bg-darkBg/30 backdrop-blur-md py-12 px-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[100px] bg-gradient-to-t from-lightAccent/5 dark:from-darkAccent/3 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 z-10 relative">
        {/* Brand */}
        <button
          onClick={() => handleScrollTo('home')}
          className="font-display font-extrabold text-xl tracking-tight text-lightText dark:text-darkText cursor-pointer"
        >
          <span className="text-lightText dark:text-darkHeading">
            Ronit
            <span className="bg-gradient-to-r from-lightAccent via-lightSecondaryAccent to-lightHighlightAccent dark:from-darkAccent dark:via-darkSecondaryAccent dark:to-darkHighlightAccent bg-clip-text text-transparent">
              .dev
            </span>
          </span>
        </button>

        {/* Quick links row */}
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-w-2xl text-[10px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider select-none">
          {footerLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className="hover:text-lightAccent dark:hover:text-darkAccent cursor-pointer transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Social media connections */}
        <div className="flex items-center gap-4 text-gray-400">
          <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={socials.twitter} target="_blank" rel="noreferrer" className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">
            <Twitter className="w-4 h-4" />
          </a>
          <a href={socials.leetcode} target="_blank" rel="noreferrer" className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">
            <Code2 className="w-4 h-4" />
          </a>
          <a href={socials.codeforces} target="_blank" rel="noreferrer" className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">
            <Globe className="w-4 h-4" />
          </a>
          <a href={socials.email} className="hover:text-lightAccent dark:hover:text-darkAccent transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Copyright banner */}
        <p className="text-[10px] text-gray-400 font-mono tracking-wide">
          &copy; {currentYear} {name}. All rights reserved. Designed with premium aesthetics.
        </p>
      </div>
    </footer>
  );
};
