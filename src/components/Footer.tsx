import React from 'react';
import { Mail, Code2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Github, Linkedin, X } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { scrollToSection } from '../utils/navigation';

export const Footer: React.FC = () => {
  const { name, socials } = portfolioData.personalInfo;
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollTo = (id: string) => {
    const targetPath = id === 'home' ? '/' : `/${id}`;
    if (location.pathname === targetPath) {
      scrollToSection(id);
    } else {
      navigate(targetPath);
      scrollToSection(id);
    }
  };

  const footerLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Open Source', id: 'opensource' },
    { label: 'My Presence', id: 'mypresence' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="border-t border-white/12 bg-[rgba(15,18,24,0.32)] backdrop-blur-[5px] py-12 px-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[100px] bg-gradient-to-t from-darkAccent/5 to-transparent blur-2xl pointer-events-none" />

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
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 max-w-2xl text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider select-none">
          {footerLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className="hover:text-darkAccent cursor-pointer transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Social media connections */}
        <div className="flex items-center gap-3">
          <a href={socials.github} target="_blank" rel="noreferrer" className="p-2 rounded-full glass-subtle-interactive text-stone-300 hover:text-white transition-colors" title="GitHub">
            <Github className="w-3.5 h-3.5" />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full glass-subtle-interactive text-stone-300 hover:text-white transition-colors" title="LinkedIn">
            <Linkedin className="w-3.5 h-3.5" />
          </a>
          <a href={socials.x} target="_blank" rel="noreferrer" title="X" className="p-2 rounded-full glass-subtle-interactive text-stone-300 hover:text-white transition-colors">
            <X className="w-3.5 h-3.5" />
          </a>
          <a href={socials.leetcode} target="_blank" rel="noreferrer" className="p-2 rounded-full glass-subtle-interactive text-stone-300 hover:text-white transition-colors" title="LeetCode">
            <Code2 className="w-3.5 h-3.5" />
          </a>
          <a href={socials.email} className="p-2 rounded-full glass-subtle-interactive text-stone-300 hover:text-white transition-colors" title="Email">
            <Mail className="w-3.5 h-3.5" />
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
