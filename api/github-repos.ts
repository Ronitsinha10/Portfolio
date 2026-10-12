import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Serverless API handler (e.g., Vercel / Netlify serverless functions).
 * Safely accesses process.env.GITHUB_TOKEN if present to query GitHub's REST API
 * with higher rate limits, and counts only owned, non-forked public repositories.
 */
export async function getPublicRepoCount(username: string): Promise<number> {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Portfolio-Repos-Service'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  let page = 1;
  let count = 0;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&type=owner`,
      { headers }
    );

    if (!res.ok) {
      throw new Error(`GitHub API request failed: ${res.status}`);
    }

    const repos = (await res.json()) as Array<{ fork?: boolean }>;
    if (!Array.isArray(repos)) {
      throw new Error('Invalid response received from GitHub API');
    }

    const nonForked = repos.filter((r) => !r.fork);
    count += nonForked.length;

    if (repos.length < 100 || page >= 10) {
      hasMore = false;
    } else {
      page++;
    }
  }

  return count;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const username = url.searchParams.get('username') || 'Ronitsinha10';

  try {
    const count = await getPublicRepoCount(username);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    res.end(JSON.stringify({ username, count }));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: message }));
  }
}
