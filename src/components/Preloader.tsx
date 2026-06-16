import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Randomized increment timing to simulate reading assets
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.floor(Math.random() * 8) + 4; // increment 4 to 12
        return Math.min(prev + diff, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const exitTimer = setTimeout(() => {
        setIsDone(true);
        // Delay onComplete to let slide animation finish
        setTimeout(onComplete, 600);
      }, 500);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: '-100vh',
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-gray-950 text-white select-none"
        >
          {/* Subtle noise grid filter just for the preloader */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='noise'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.65'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23noise)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Logo Animation */}
          <div className="relative mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [0.9, 1.05, 1], 
                opacity: 1,
                boxShadow: ['0 0 20px rgba(99, 102, 241, 0.1)', '0 0 40px rgba(99, 102, 241, 0.3)', '0 0 20px rgba(99, 102, 241, 0.1)']
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }}
              className="flex items-center justify-center w-24 h-24 rounded-2xl border border-indigo-500/30 bg-gray-900/50 backdrop-blur-xl"
            >
              <svg className="w-12 h-12 text-indigo-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M25 75 L25 25 L50 25 C65 25, 65 45, 50 45 L35 45 M45 45 L65 75"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
                <motion.path
                  d="M75 35 C65 30, 55 35, 55 45 C55 55, 75 50, 75 60 C75 70, 60 75, 50 70"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
                />
              </svg>
            </motion.div>
            
            {/* Pulsing ring outer glow */}
            <div className="absolute inset-0 w-24 h-24 rounded-2xl border border-indigo-500/10 scale-125 animate-ping opacity-25" />
          </div>

          {/* Loading Percentage */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-3xl font-light tracking-widest text-gray-200">
              {progress}%
            </span>
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-gray-500">
              Initializing Core Subsystems
            </span>
          </div>

          {/* Loading Progress Bar */}
          <div className="mt-8 w-64 h-1.5 rounded-full bg-gray-900 overflow-hidden border border-gray-800">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
