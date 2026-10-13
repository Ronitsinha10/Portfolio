import type { IncomingMessage, ServerResponse } from 'http';

export interface LeetCodeStatsResult {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

/**
 * Serverless API handler (e.g., Vercel / Netlify serverless functions).
 * Queries LeetCode's official GraphQL API directly on the server (avoiding browser CORS).
 */
export async function getLeetCodeStats(username: string): Promise<LeetCodeStatsResult> {
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
        const easyItem = acList.find((item: { difficulty: string; count: number }) => item.difficulty === 'Easy');
        const mediumItem = acList.find((item: { difficulty: string; count: number }) => item.difficulty === 'Medium');
        const hardItem = acList.find((item: { difficulty: string; count: number }) => item.difficulty === 'Hard');

        if (allItem && typeof allItem.count === 'number') {
          return {
            totalSolved: allItem.count,
            easySolved: typeof easyItem?.count === 'number' ? easyItem.count : 0,
            mediumSolved: typeof mediumItem?.count === 'number' ? mediumItem.count : 0,
            hardSolved: typeof hardItem?.count === 'number' ? hardItem.count : 0
          };
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
    return {
      totalSolved: data.totalSolved,
      easySolved: typeof data.easySolved === 'number' ? data.easySolved : 0,
      mediumSolved: typeof data.mediumSolved === 'number' ? data.mediumSolved : 0,
      hardSolved: typeof data.hardSolved === 'number' ? data.hardSolved : 0
    };
  }

  throw new Error('Invalid response received from LeetCode sources');
}

export async function getLeetCodeSolvedCount(username: string): Promise<number> {
  const stats = await getLeetCodeStats(username);
  return stats.totalSolved;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
  const username = url.searchParams.get('username') || 'IHuDORGnqv';

  try {
    const stats = await getLeetCodeStats(username);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    res.end(JSON.stringify({ username, ...stats }));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: message }));
  }
}
