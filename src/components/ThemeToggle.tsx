import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-full border border-gray-200/20 dark:border-gray-800/60 bg-white/10 dark:bg-gray-900/40 backdrop-blur-md text-gray-800 dark:text-gray-200 hover:border-lightAccent/40 dark:hover:border-darkAccent/40 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 focus:outline-none cursor-pointer shadow-sm"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -15, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 15, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-lightAccent" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};
