export const VALID_SECTIONS = [
  'home',
  'about',
  'skills',
  'experience',
  'projects',
  'opensource',
  'mypresence',
  'achievements',
  'codingprofiles',
  'services',
  'contact',
] as const;

export type ValidSection = (typeof VALID_SECTIONS)[number];

export const SECTION_DOM_ID_MAP: Record<string, string> = {
  achievements: 'mypresence',
  mypresence: 'mypresence',
  codingprofiles: 'codingprofiles',
  services: 'services',
  home: 'home',
};

// Offset in pixels for sticky navbar so headers are not covered
export const NAVBAR_SCROLL_OFFSET = 80;

/**
 * Mark that a programmatic scroll is taking place so active-section URL syncing pauses momentarily.
 */
export const markProgrammaticScroll = (durationMs = 900): void => {
  if (typeof window !== 'undefined') {
    (window as unknown as { __portfolioScrollLockUntil?: number }).__portfolioScrollLockUntil =
      Date.now() + durationMs;
  }
};

/**
 * Checks whether an automated programmatic scroll is currently active.
 */
export const isProgrammaticScrollActive = (): boolean => {
  if (typeof window === 'undefined') return false;
  const lock = (window as unknown as { __portfolioScrollLockUntil?: number }).__portfolioScrollLockUntil;
  return typeof lock === 'number' && Date.now() < lock;
};

/**
 * Smoothly scroll to a section element by its target ID.
 */
export const scrollToSection = (id: string, options?: { behavior?: ScrollBehavior }): boolean => {
  if (typeof window === 'undefined') return false;

  const raw = id.toLowerCase();
  const targetId = SECTION_DOM_ID_MAP[raw] || raw;

  if (targetId === 'home') {
    markProgrammaticScroll();
    window.scrollTo({
      top: 0,
      behavior: options?.behavior || 'smooth',
    });
    return true;
  }

  const element = document.getElementById(targetId) || document.getElementById(raw);
  if (element) {
    markProgrammaticScroll();
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = Math.max(0, elementPosition + window.scrollY - NAVBAR_SCROLL_OFFSET);
    window.scrollTo({
      top: offsetPosition,
      behavior: options?.behavior || 'smooth',
    });
    return true;
  }

  return false;
};
