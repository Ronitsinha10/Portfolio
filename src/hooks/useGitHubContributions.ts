import { useState, useEffect, useCallback } from 'react';
import { portfolioData } from '../data/portfolioData';

const CACHE_PREFIX = 'gh_contributions_cache_';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache

interface CacheData {
  count: number;
  timestamp: number;
}

/**
 * Extracts the GitHub username from the profile URL in the Home section
 * (portfolioData.personalInfo.socials.github) as the single source of truth.
 */
export const extractGitHubUsername = (): string => {
  const url = portfolioData.personalInfo.socials.github || '';
  const match = url.match(/github\.com\/([^/?#]+)/i);
  return match ? match[1] : 'Ronitsinha10';
};

/**
 * Fetches the exact total contribution count displayed on the GitHub contribution graph.
 * 1. Attempts the secure backend/serverless endpoint `/api/github-contributions` first.
 * 2. Falls back to the CORS-enabled public contribution graph API (same engine as react-github-calendar).
 */
export const fetchContributionTotal = async (username: string): Promise<number> => {
  // 1. Try serverless API route if available
  try {
    const apiRes = await fetch(`/api/github-contributions?username=${encodeURIComponent(username)}`);
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (typeof data.count === 'number') {
        return data.count;
      }
    }
  } catch {
    // Backend endpoint not reachable (e.g. static host); proceed to direct fallback
  }

  // 2. Direct fetch from CORS-enabled contribution graph API (trailing year / graph total)
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`);
  if (!res.ok) {
    throw new Error(`Contribution API request failed with status ${res.status}`);
  }

  const data = await res.json();
  const count =
    data.total?.lastYear ??
    (Array.isArray(data.contributions)
      ? data.contributions.reduce((acc: number, c: { count?: number }) => acc + (c.count || 0), 0)
      : null);

  if (typeof count !== 'number') {
    throw new Error('Invalid contribution data format received');
  }

  return count;
};

export const useGitHubContributions = () => {
  const username = extractGitHubUsername();
  const cacheKey = `${CACHE_PREFIX}${username}`;

  const [contributions, setContributions] = useState<number | null>(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed: CacheData = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS && typeof parsed.count === 'number') {
          return parsed.count;
        }
      }
    } catch {
      // localStorage error or corrupted cache
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(() => contributions === null);
  const [error, setError] = useState<string | null>(null);

  const loadContributions = useCallback(
    async (force = false) => {
      // Check cache if not forcing refresh
      if (!force) {
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const parsed: CacheData = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < CACHE_TTL_MS && typeof parsed.count === 'number') {
              setContributions(parsed.count);
              setLoading(false);
              setError(null);
              return;
            }
          }
        } catch {
          // ignore cache read failure
        }
      }

      setLoading(true);
      setError(null);

      try {
        const count = await fetchContributionTotal(username);
        setContributions(count);

        // Store in localStorage with timestamp
        try {
          const payload: CacheData = {
            count,
            timestamp: Date.now()
          };
          localStorage.setItem(cacheKey, JSON.stringify(payload));
        } catch {
          // localStorage write failure (e.g. incognito quota)
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch GitHub contributions';
        setError(msg);
        // Never fabricate a number on error
        setContributions(null);
      } finally {
        setLoading(false);
      }
    },
    [username, cacheKey]
  );

  useEffect(() => {
    loadContributions();
  }, [loadContributions]);

  return {
    contributions,
    loading,
    error,
    refresh: () => loadContributions(true)
  };
};
