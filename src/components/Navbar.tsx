import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToSection } from '../utils/navigation';

interface NavbarProps {
  onOpenResume: () => void;
}

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Open Source', id: 'opensource' },
  { label: 'My Presence', id: 'mypresence' },
  { label: 'Contact', id: 'contact' },
] as const;

const SECTION_IDS = NAV_ITEMS.map((item) => item.id);

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const activeSection = useActiveSection(SECTION_IDS as unknown as string[]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    const targetPath = id === 'home' ? '/' : `/${id}`;

    if (location.pathname === targetPath) {
      scrollToSection(id);
    } else {
      navigate(targetPath);
      scrollToSection(id);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(15,18,24,0.32)] backdrop-blur-[5px] py-3 shadow-md border-b border-white/12'
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
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors cursor-pointer ${
                  isActive ? 'text-lightAccent dark:text-darkAccent font-semibold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-darkAccent/15 border border-darkAccent/30"
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenResume}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass-subtle-interactive text-stone-200 hover:text-white font-medium text-xs tracking-wider uppercase cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-darkAccent" />
            Resume
          </motion.button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full glass-subtle-interactive text-stone-200 hover:text-white cursor-pointer"
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
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden border-t border-white/10 bg-[rgba(15,18,24,0.92)] backdrop-blur-2xl overflow-hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-6 max-h-[80vh] overflow-y-auto">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-display text-sm font-semibold transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-darkAccent/15 text-darkAccent border-l-2 border-darkAccent' 
                          : 'text-stone-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.04 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenResume();
                  }}
                  className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 rounded-lg bg-lightAccent dark:bg-darkAccent text-white text-sm font-semibold cursor-pointer shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 dark:shadow-none"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
