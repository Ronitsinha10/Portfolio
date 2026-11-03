import { useEffect, useRef, useState } from 'react';
import { isProgrammaticScrollActive } from '../utils/navigation';

export const useActiveSection = (sectionIds: string[], offset = 150) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const activeRef = useRef<string>('home');
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;

    const determineSection = () => {
      const scrollPosition = window.scrollY + offset;

      // Find the section that matches current scroll position
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            if (activeRef.current !== id) {
              activeRef.current = id;
              setActiveSection(id);
            }
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafIdRef.current = window.requestAnimationFrame(determineSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial evaluation
    determineSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [sectionIds, offset]);

  // Sync browser address bar with the actively viewed section during manual scroll
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Do not alter path if user is browsing a standalone project case study
    if (window.location.pathname.startsWith('/project/')) {
      return;
    }

    // Do not overwrite URL during programmatic smooth scrolling
    if (isProgrammaticScrollActive()) {
      return;
    }

    const targetPath = activeSection === 'home' ? '/' : `/${activeSection}`;
    if (window.location.pathname !== targetPath) {
      window.history.replaceState(null, '', targetPath);
    }
  }, [activeSection]);

  return activeSection;
};

