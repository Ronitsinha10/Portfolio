import { useState, useEffect, useCallback } from 'react';
import { extractGitHubUsername } from './useGitHubContributions';

const REPOS_CACHE_PREFIX = 'gh_repos_cache_';
const REPOS_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes cache

interface CacheData {
  count: number;
  timestamp: number;
}

/**
 * Fetches the actual number of public, non-forked repositories owned by the user.
 * 1. Attempts the backend/serverless endpoint `/api/github-repos` first.
 * 2. Falls back to the public GitHub REST API directly (`/users/${username}/repos?per_page=100&type=owner`).
 * 3. Filters out forked repositories (`!repo.fork`).
 */
export const fetchPublicRepoCount = async (username: string): Promise<number> => {
  // 1. Try serverless API route if available
  try {
    const apiRes = await fetch(`/api/github-repos?username=${encodeURIComponent(username)}`);
    if (apiRes.ok) {
      const data = await apiRes.json();
      if (typeof data.count === 'number') {
        return data.count;
      }
    }
  } catch {
    // Backend endpoint not reachable (e.g. static host); proceed to direct fallback
  }

  // 2. Direct fetch from public GitHub REST API
  let page = 1;
  let ownReposCount = 0;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&type=owner`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    if (!res.ok) {
      throw new Error(`GitHub API request failed with status ${res.status}`);
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      throw new Error('Invalid response received from GitHub API');
    }

    // Exclude forked repositories: count only public repositories owned by the user
    const nonForked = repos.filter((r: { fork?: boolean }) => !r.fork);
    ownReposCount += nonForked.length;

    if (repos.length < 100 || page >= 10) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return ownReposCount;
};

export const useGitHubRepos = () => {
  const username = extractGitHubUsername();
  const cacheKey = `${REPOS_CACHE_PREFIX}${username}`;

  const [repos, setRepos] = useState<number | null>(() => {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed: CacheData = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < REPOS_CACHE_TTL_MS && typeof parsed.count === 'number') {
          return parsed.count;
        }
      }
    } catch {
      // localStorage error or corrupted cache
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(() => repos === null);
  const [error, setError] = useState<string | null>(null);

  const loadRepos = useCallback(
    async (force = false) => {
      if (!force) {
        try {
          const cached = localStorage.getItem(cacheKey);
          if (cached) {
            const parsed: CacheData = JSON.parse(cached);
            if (Date.now() - parsed.timestamp < REPOS_CACHE_TTL_MS && typeof parsed.count === 'number') {
              setRepos(parsed.count);
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
        const count = await fetchPublicRepoCount(username);
        setRepos(count);

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
        const msg = err instanceof Error ? err.message : 'Failed to fetch GitHub repositories';
        setError(msg);
        setRepos(null); // Never fabricate
      } finally {
        setLoading(false);
      }
    },
    [username, cacheKey]
  );

  useEffect(() => {
    loadRepos();
  }, [loadRepos]);

  return {
    repos,
    loading,
    error,
    refresh: () => loadRepos(true)
  };
};
