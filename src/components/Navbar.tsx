import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { useActiveSection } from '../hooks/useActiveSection';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
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

  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-darkBg/80 backdrop-blur-md py-3 shadow-md border-b border-gray-200/10 dark:border-gray-800/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Title */}
        <motion.button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-pointer font-display font-extrabold text-xl tracking-tight text-lightText dark:text-darkText"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-lightText dark:text-darkHeading">
            Ronit
            <span className="bg-gradient-to-r from-lightAccent via-lightSecondaryAccent to-lightHighlightAccent dark:from-darkAccent dark:via-darkSecondaryAccent dark:to-darkHighlightAccent bg-clip-text text-transparent">
              .dev
            </span>
          </span>
        </motion.button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                  isActive ? 'text-lightAccent dark:text-darkAccent' : 'text-gray-600 dark:text-gray-400 hover:text-lightAccent dark:hover:text-darkAccent'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-lightAccent/5 dark:bg-darkAccent/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Items */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-lightAccent/20 dark:border-darkAccent/30 hover:border-lightAccent dark:hover:border-darkAccent bg-lightAccent/5 dark:bg-darkAccent/10 hover:bg-lightAccent dark:hover:bg-darkAccent text-lightAccent dark:text-darkText hover:text-white transition-all duration-300 font-medium text-xs tracking-wider uppercase cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </motion.button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full border border-gray-200/20 dark:border-gray-800/60 bg-white/10 dark:bg-gray-900/40 text-gray-800 dark:text-gray-200 hover:bg-gray-100/30 dark:hover:bg-gray-800/30 cursor-pointer transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden border-t border-gray-200/10 dark:border-gray-800/40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl overflow-hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6 max-h-[80vh] overflow-y-auto">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-display text-sm font-semibold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-lightAccent/5 dark:bg-darkAccent/10 text-lightAccent dark:text-darkAccent border-l-4 border-lightAccent dark:border-darkAccent' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-900/50'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                );
              })}

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                onClick={() => {
                  setIsOpen(false);
                  onOpenResume();
                }}
                className="mt-4 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-lightAccent dark:bg-darkAccent text-white text-sm font-semibold cursor-pointer shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 dark:shadow-none"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
