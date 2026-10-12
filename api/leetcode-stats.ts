import type { IncomingMessage, ServerResponse } from 'http';

/**
 * Serverless API handler (e.g., Vercel / Netlify serverless functions).
 * Queries LeetCode's official GraphQL API directly on the server (avoiding browser CORS).
 */
export async function getLeetCodeSolvedCount(username: string): Promise<number> {
  // 1. Direct LeetCode official GraphQL query
  try {
    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify({
        query: `
          query userProblemsSolved($username: String!) {
            matchedUser(username: $username) {
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username }
      })
    });

    if (response.ok) {
      const json = await response.json();
      const acList = json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
      if (Array.isArray(acList)) {
        const allItem = acList.find((item: { difficulty: string; count: number }) => item.difficulty === 'All');
        if (allItem && typeof allItem.count === 'number') {
          return allItem.count;
        }
      }
    }
  } catch {
    // Fall through to fallback
  }

  // 2. Fallback to public CORS-enabled API
  const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(username)}`);
  if (!res.ok) {
    throw new Error(`LeetCode API request failed with status ${res.status}`);
  }

  const data = await res.json();
  if (typeof data.totalSolved === 'number') {
    return data.totalSolved;
  }

  throw new Error('Invalid response received from LeetCode sources');
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const username = url.searchParams.get('username') || 'IHuDORGnqv';

  try {
    const totalSolved = await getLeetCodeSolvedCount(username);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    res.end(JSON.stringify({ username, totalSolved }));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: message }));
  }
}
