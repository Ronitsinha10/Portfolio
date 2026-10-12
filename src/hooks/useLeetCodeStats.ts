import { useState, useEffect, useCallback } from 'react';
import { portfolioData } from '../data/portfolioData';

const LEETCODE_CACHE_PREFIX = 'leetcode_stats_cache_';
const LEETCODE_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache

interface CacheData {
  count: number;
  timestamp: number;
}

/**
 * Extracts the LeetCode username from the profile URL in the Home section
 * (portfolioData.personalInfo.socials.leetcode) as the single source of truth.
 */
export const extractLeetCodeUsername = (): string => {
  const url = portfolioData.personalInfo.socials.leetcode || '';
  const match = url.match(/leetcode\.com\/(?:u\/)?([^/?#]+)/i);
  return match ? match[1] : 'IHuDORGnqv';
};

/**
 * Fetches the actual number of unique problems solved from LeetCode across Easy, Medium, and Hard.
 * 1. Attempts the backend/serverless endpoint `/api/leetcode-stats` first (queries LeetCode GraphQL directly).
 * 2. Falls back to public CORS-enabled LeetCode user profile API.
 */
export const fetchLeetCodeSolvedCount = async (username: string): Promise<number> => {
  // 1. Try serverless / local dev backend endpoint first
  try {
    const apiRes = await fetch(`/api/leetcode-stats?username=${encodeURIComponent(username)}`);
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (typeof data.totalSolved === 'number') {
        return data.totalSolved;
      }
    }
  } catch {
    // Backend endpoint not reachable (e.g. static hosting); proceed to fallback
  }

  // 2. Fallback to public CORS-enabled API
  const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(username)}`);
  if (!res.ok) {
    throw new Error(`LeetCode API request failed with status ${res.status}`);
  }

  const data = await res.json();
  const count = typeof data.totalSolved === 'number' ? data.totalSolved : null;

  if (typeof count !== 'number') {
    throw new Error('Invalid response received from LeetCode API');
  }

  return count;
};

export const useLeetCodeStats = () => {
  const username = extractLeetCodeUsername();
  const cacheKey = `${LEETCODE_CACHE_PREFIX}${username}`;

  const [solved, setSolved] = useState<number | null>(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed: CacheData = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < LEETCODE_CACHE_TTL_MS && typeof parsed.count === 'number') {
          return parsed.count;
        }
      }
    } catch {
      // localStorage error or corrupted cache
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(() => solved === null);
  const [error, setError] = useState<string | null>(null);

  const loadSolved = useCallback(
    async (force = false) => {
      if (!force) {
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const parsed: CacheData = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < LEETCODE_CACHE_TTL_MS && typeof parsed.count === 'number') {
              setSolved(parsed.count);
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
        const count = await fetchLeetCodeSolvedCount(username);
        setSolved(count);

        try {
          const payload: CacheData = {
            count,
            timestamp: Date.now()
          };
          localStorage.setItem(cacheKey, JSON.stringify(payload));
        } catch {
          // localStorage write failure
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to fetch LeetCode solved problems';
        setError(msg);
        setSolved(null); // Never fabricate
      } finally {
        setLoading(false);
      }
    },
    [username, cacheKey]
  );

  useEffect(() => {
    loadSolved();
  }, [loadSolved]);

  return {
    solved,
    loading,
    error,
    refresh: () => loadSolved(true)
  };
};
