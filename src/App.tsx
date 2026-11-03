import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BackgroundEffects } from './components/BackgroundEffects';
import { CustomCursor } from './components/CustomCursor';
import { ProgressBar } from './components/ProgressBar';
import { BackToTop } from './components/BackToTop';
import { Navbar } from './components/Navbar';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

// Sections
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { OpenSource } from './sections/OpenSource';
import { MyPresence } from './sections/Achievements';
import { Contact } from './sections/Contact';
import { ProjectDetailPage } from './sections/ProjectDetailPage';

// Confetti for Easter Egg
import confetti from 'canvas-confetti';

// Valid single-page portfolio section paths and navigation helper
import { VALID_SECTIONS, scrollToSection, type ValidSection } from './utils/navigation';
export { VALID_SECTIONS } from './utils/navigation';

// Automatically reset window scroll position when switching to a standalone project page
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith('/project/')) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
};

// Gracefully redirect legacy ?project=projId query parameters to clean /project/:id routes
const LegacyQueryRedirect: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const projectId = params.get('project');
    if (projectId) {
      navigate(`/project/${projectId}`, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

// Main Single-Page Portfolio Home View with section routing & auto-scroll
const PortfolioHome: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [typedSequence, setTypedSequence] = useState('');
  const [isEasterEggActive, setIsEasterEggActive] = useState(false);
  const { section } = useParams<{ section?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to section when route matches /about, /skills, /projects, etc.
  useEffect(() => {
    const rawSection = (section || location.pathname.replace(/^\/+|\/+$/g, '')).toLowerCase();

    // If an unknown section is visited in the URL, redirect back to root
    if (rawSection && !VALID_SECTIONS.includes(rawSection as ValidSection)) {
      navigate('/', { replace: true });
      return;
    }

    if (!rawSection || rawSection === 'home') {
      if (window.scrollY > 0 && !location.hash) {
        scrollToSection('home');
      }
      return;
    }

    let attempts = 0;
    let cancelled = false;

    const tryScroll = () => {
      if (cancelled) return;
      const success = scrollToSection(rawSection);
      if (!success && attempts < 25) {
        attempts++;
        setTimeout(tryScroll, 50);
      }
    };

    // Allow DOM to settle, especially on direct browser navigation / page reload
    const timer = setTimeout(tryScroll, 60);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [section, location.pathname, navigate]);

  // Easter Egg keyboard sequence tracker ("sinha")
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Capture letter keys only
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        const nextSeq = (typedSequence + e.key.toLowerCase()).slice(-5);
        setTypedSequence(nextSeq);

        if (nextSeq === 'sinha') {
          // Trigger Easter Egg
          setIsEasterEggActive(true);
          
          // Blast Confetti multiple times
          const end = Date.now() + (3 * 1000);
          const interval = setInterval(() => {
            if (Date.now() > end) {
              return clearInterval(interval);
            }
            confetti({
              startVelocity: 30,
              spread: 360,
              ticks: 60,
              origin: { x: Math.random(), y: Math.random() - 0.2 },
              colors: ['#6366F1', '#EC4899', '#06B6D4', '#10B981', '#F59E0B']
            });
          }, 200);

          // Console greeting
          console.log(
            '%c🎉 EASTER EGG UNLOCKED 🎉\n%cGreetings from Ronit Sinha! Rainbow theme active for 8 seconds.',
            'color: #6366F1; font-size: 18px; font-weight: bold;',
            'color: #10B981; font-size: 12px; font-style: italic;'
          );

          // Turn off rainbow mode after 8 seconds
          setTimeout(() => {
            setIsEasterEggActive(false);
            setTypedSequence('');
          }, 8000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [typedSequence]);

  return (
    <div className={`min-h-screen relative selection:bg-darkAccent/30 ${isEasterEggActive ? 'rainbow-accent-mode' : ''}`}>
      {/* Visual background layers */}
      <BackgroundEffects />
      <CustomCursor />
      <ProgressBar />
      <BackToTop />
      
      {/* Overlay palette commands */}
      <CommandPalette onOpenResume={() => setIsResumeOpen(true)} />
      
      {/* Sticky glass headers */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main visual sections */}
      <main className="max-w-[100vw] overflow-x-hidden relative z-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <OpenSource />
        <MyPresence />
        <Contact />
      </main>

      {/* Interactive overlay resume previews */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Main footer layout */}
      <Footer />

      {/* Rainbow Mode Accent Overrides CSS style helper */}
      {isEasterEggActive && (
        <style>{`
          .rainbow-accent-mode {
            animation: hue-rotate-spin 8s linear infinite;
          }
          @keyframes hue-rotate-spin {
            from { filter: hue-rotate(0deg); }
            to { filter: hue-rotate(360deg); }
          }
        `}</style>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LegacyQueryRedirect />
      <Routes>
        <Route path="/" element={<PortfolioHome />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/:section" element={<PortfolioHome />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
