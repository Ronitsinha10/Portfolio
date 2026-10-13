import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function statsApiPlugin(): Plugin {
  return {
    name: 'stats-dev-api',
    configureServer(server) {
      // 1. Contributions API route
      server.middlewares.use('/api/github-contributions', async (req, res) => {
        const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
        const username = url.searchParams.get('username') || 'Ronitsinha10';
        try {
          // Try native GitHub contributions HTML snippet
          try {
            const ghRes = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, {
              headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
            });
            if (ghRes.ok) {
              const html = await ghRes.text();
              const match = html.match(/(\d+[\d,]*)\s+contributions\s+in\s+the\s+last\s+year/i);
              if (match) {
                const count = parseInt(match[1].replace(/,/g, ''), 10);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ username, count }));
                return;
              }
            }
          } catch {
            // fallback
          }

          // Fallback to contributions API
          const apiRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`);
          const data = (await apiRes.json()) as { total?: { lastYear?: number }; contributions?: Array<{ count?: number }> };
          const count =
            data.total?.lastYear ??
            (Array.isArray(data.contributions)
              ? data.contributions.reduce((acc, c) => acc + (c.count || 0), 0)
              : null);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ username, count }));
        } catch (e: unknown) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          const message = e instanceof Error ? e.message : 'Error fetching contributions';
          res.end(JSON.stringify({ error: message }));
        }
      });

      // 2. Repositories API route (filtering out forked repos)
      server.middlewares.use('/api/github-repos', async (req, res) => {
        const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
        const username = url.searchParams.get('username') || 'Ronitsinha10';
        try {
          const apiRes = await fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&type=owner`,
            {
              headers: {
                'User-Agent': 'Portfolio-Dev-Server',
                'Accept': 'application/vnd.github.v3+json'
              }
            }
          );
          if (!apiRes.ok) {
            throw new Error(`GitHub API returned status ${apiRes.status}`);
          }
          const repos = (await apiRes.json()) as Array<{ fork?: boolean }>;
          const count = repos.filter((r) => !r.fork).length;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ username, count, totalOwned: repos.length }));
        } catch (e: unknown) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          const message = e instanceof Error ? e.message : 'Error fetching repositories';
          res.end(JSON.stringify({ error: message }));
        }
      });

      // 3. LeetCode solved problems API route
      server.middlewares.use('/api/leetcode-stats', async (req, res) => {
        const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
        const username = url.searchParams.get('username') || 'IHuDORGnqv';
        try {
          // 1. Direct LeetCode GraphQL
          try {
            const lcRes = await fetch('https://leetcode.com/graphql/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
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
            if (lcRes.ok) {
              const json = (await lcRes.json()) as {
                data?: {
                  matchedUser?: {
                    submitStatsGlobal?: {
                      acSubmissionNum?: Array<{ difficulty: string; count: number }>;
                    };
                  };
                };
              };
              const acList = json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
              if (Array.isArray(acList)) {
                const allItem = acList.find((item) => item.difficulty === 'All');
                const easyItem = acList.find((item) => item.difficulty === 'Easy');
                const mediumItem = acList.find((item) => item.difficulty === 'Medium');
                const hardItem = acList.find((item) => item.difficulty === 'Hard');

                if (allItem && typeof allItem.count === 'number') {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      username,
                      totalSolved: allItem.count,
                      easySolved: typeof easyItem?.count === 'number' ? easyItem.count : 0,
                      mediumSolved: typeof mediumItem?.count === 'number' ? mediumItem.count : 0,
                      hardSolved: typeof hardItem?.count === 'number' ? hardItem.count : 0,
                    })
                  );
                  return;
                }
              }
            }
          } catch {
            // fallback
          }

          // 2. Fallback to public CORS-enabled API
          const apiRes = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${encodeURIComponent(username)}`);
          if (apiRes.ok) {
            const data = (await apiRes.json()) as {
              totalSolved?: number;
              easySolved?: number;
              mediumSolved?: number;
              hardSolved?: number;
            };
            if (typeof data.totalSolved === 'number') {
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  username,
                  totalSolved: data.totalSolved,
                  easySolved: typeof data.easySolved === 'number' ? data.easySolved : 0,
                  mediumSolved: typeof data.mediumSolved === 'number' ? data.mediumSolved : 0,
                  hardSolved: typeof data.hardSolved === 'number' ? data.hardSolved : 0,
                })
              );
              return;
            }
          }

          throw new Error('Could not retrieve LeetCode statistics');
        } catch (e: unknown) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          const message = e instanceof Error ? e.message : 'Error fetching LeetCode stats';
          res.end(JSON.stringify({ error: message }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    statsApiPlugin(),
  ],
})
