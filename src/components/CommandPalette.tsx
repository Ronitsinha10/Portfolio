import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Hash, Download, Code2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Github, Linkedin, X } from './SocialIcons';
import { scrollToSection } from '../utils/navigation';

interface CommandPaletteProps {
  onOpenResume: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Navigation' | 'Actions' | 'Socials';
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onOpenResume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const sections = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Open Source', id: 'opensource' },
    { label: 'My Presence', id: 'mypresence' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const targetPath = id === 'home' ? '/' : `/${id}`;
    if (location.pathname === targetPath) {
      scrollToSection(id);
    } else {
      navigate(targetPath);
      scrollToSection(id);
    }
  };

  const commands: CommandItem[] = [
    // Navigation
    ...sections.map((sec) => ({
      id: `nav-${sec.id}`,
      title: `Go to ${sec.label}`,
      category: 'Navigation' as const,
      icon: <Hash className="w-4 h-4 text-gray-400" />,
      action: () => handleScrollTo(sec.id),
      shortcut: sec.label.substring(0, 1).toUpperCase()
    })),
    // Actions
    {
      id: 'action-resume',
      title: 'View & Download Resume',
      category: 'Actions',
      icon: <Download className="w-4 h-4 text-gray-400" />,
      action: () => {
        onOpenResume();
        setIsOpen(false);
      },
      shortcut: 'R'
    },
    // Social links
    {
      id: 'social-github',
      title: 'View GitHub Profile',
      category: 'Socials',
      icon: <Github className="w-4 h-4 text-gray-400" />,
      action: () => {
        window.open('https://github.com/Ronitsinha10', '_blank');
        setIsOpen(false);
      },
      shortcut: 'G'
    },
    {
      id: 'social-linkedin',
      title: 'View LinkedIn Connection',
      category: 'Socials',
      icon: <Linkedin className="w-4 h-4 text-gray-400" />,
      action: () => {
        window.open('https://www.linkedin.com/in/ronit-sinha-5b3b16329/', '_blank');
        setIsOpen(false);
      }
    },
    {
      id: 'social-x',
      title: 'View X Profile',
      category: 'Socials',
      icon: <X className="w-4 h-4 text-gray-400" />,
      action: () => {
        window.open('https://x.com/Ronit_Sinha10', '_blank');
        setIsOpen(false);
      },
      shortcut: 'X'
    },
    {
      id: 'social-leetcode',
      title: 'View LeetCode Profile',
      category: 'Socials',
      icon: <Code2 className="w-4 h-4 text-gray-400" />,
      action: () => {
        window.open('https://leetcode.com/u/IHuDORGnqv/', '_blank');
        setIsOpen(false);
      },
      shortcut: 'L'
    }
  ];

  // Filtering based on search
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Listen to Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setSearch('');
            setSelectedIndex(0);
            return true;
          }
          return false;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto focus input when opened
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (filteredCommands.length > 0) {
          setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (filteredCommands.length > 0) {
          setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [isOpen, selectedIndex, filteredCommands]);

  // Scroll active command into view
  useEffect(() => {
    if (selectedIndex === 0) {
      listRef.current?.scrollTo({ top: 0 });
    } else {
      const activeEl = listRef.current?.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        const parent = listRef.current;
        if (parent) {
          const activeTop = activeEl.offsetTop;
          const activeHeight = activeEl.offsetHeight;
          const parentHeight = parent.offsetHeight;
          const parentScroll = parent.scrollTop;

          if (activeTop + activeHeight > parentScroll + parentHeight) {
            parent.scrollTo({ top: activeTop + activeHeight - parentHeight });
          } else if (activeTop < parentScroll) {
            parent.scrollTo({ top: activeTop });
          }
        }
      }
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Floating help tip on desktop */}
      <div className="hidden lg:flex fixed bottom-6 left-6 z-[39] items-center gap-1.5 px-3 py-1.5 rounded-full glass-subtle text-[10px] font-semibold text-stone-300 uppercase tracking-widest pointer-events-none select-none">
        <span>Press</span>
        <kbd className="px-1.5 py-0.5 rounded glass-subtle text-[9px] font-mono">Ctrl</kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 rounded glass-subtle text-[9px] font-mono">K</kbd>
        <span>for Menu</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[5000] flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Main Command Bar Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-lg glass-primary shadow-2xl overflow-hidden z-10"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 border-b border-white/10">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full py-4 text-sm bg-transparent border-0 outline-none ring-0 text-stone-100 placeholder-stone-500"
                />
                <kbd className="px-2 py-0.5 rounded glass-subtle text-[10px] font-mono text-gray-400">ESC</kbd>
              </div>

              {/* Items List */}
              <div
                ref={listRef}
                className="max-h-[340px] overflow-y-auto py-2 divide-y divide-white/5"
              >
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((cmd, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors cursor-pointer ${isSelected
                          ? 'bg-darkAccent/15 text-darkAccent font-medium'
                          : 'text-stone-300 hover:text-white'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          {cmd.icon}
                          <span className="text-xs">{cmd.title}</span>
                          <span className="text-[10px] uppercase font-semibold tracking-wider text-stone-300 glass-subtle px-2 py-0.5 rounded-full">
                            {cmd.category}
                          </span>
                        </div>
                        {cmd.shortcut && (
                          <div className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 text-[9px] rounded font-mono glass-subtle text-gray-400">
                              {cmd.shortcut}
                            </kbd>
                          </div>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-xs text-gray-500">
                    No commands found matching "{search}"
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
