import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Serverless API handler (e.g., Vercel / Netlify serverless functions).
 * Safely accesses process.env.GITHUB_TOKEN if present to query GitHub's official
 * GraphQL API, or falls back to GitHub's native contribution graph endpoint and
 * the public contribution graph API without exposing tokens.
 */
export async function getContributions(username: string): Promise<number> {
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  // 1. Official GitHub GraphQL API (if token provided in environment)
  if (token) {
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Portfolio-Contributions-Service'
        },
        body: JSON.stringify({
          query: `
            query($login: String!) {
              user(login: $login) {
                contributionsCollection {
                  contributionCalendar {
                    totalContributions
                  }
                }
              }
            }
          `,
          variables: { login: username }
        })
      });

      if (response.ok) {
        const json = await response.json();
        const total = json?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions;
        if (typeof total === 'number') {
          return total;
        }
      }
    } catch {
      // Fall through to next method
    }
  }

  // 2. GitHub's native public contributions page (exact graph total rendered on GitHub profile)
  try {
    const ghRes = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (ghRes.ok) {
      const html = await ghRes.text();
      const match = html.match(/(\d+[\d,]*)\s+contributions\s+in\s+the\s+last\s+year/i);
      if (match) {
        return parseInt(match[1].replace(/,/g, ''), 10);
      }
    }
  } catch {
    // Fall through to public API
  }

  // 3. Fallback to CORS-enabled contribution graph API
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`);
  if (!res.ok) {
    throw new Error(`Contribution API request failed: ${res.status}`);
  }

  const data = await res.json();
  const count =
    data.total?.lastYear ??
    (Array.isArray(data.contributions)
      ? data.contributions.reduce((acc: number, c: { count?: number }) => acc + (c.count || 0), 0)
      : null);

  if (typeof count !== 'number') {
    throw new Error('Invalid data returned from contribution API');
  }

  return count;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const username = url.searchParams.get('username') || 'Ronitsinha10';

  try {
    const count = await getContributions(username);
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
