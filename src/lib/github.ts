import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { site } from '../config/site';

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  date: string;
  count: number;
  level: ContributionLevel;
  weekday: number;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface Contributions {
  total: number;
  weeks: ContributionWeek[];
  from: string;
  to: string;
}

export interface ContributionStats {
  total: number;
  longestStreak: number;
  busiestWeekday: number | null;
}

type ApiLevel = 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';

interface ApiResponse {
  data?: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: ApiLevel;
              weekday: number;
            }[];
          }[];
        };
      };
    } | null;
  };
  errors?: { message: string }[];
}

const endpoint = 'https://api.github.com/graphql';
const cachePath = resolve(process.cwd(), 'src/data/contributions.json');

const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount contributionLevel weekday } }
        }
      }
    }
  }
`;

const levels: Record<ApiLevel, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

async function fetchContributions(token: string): Promise<Contributions> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': 'portfolio-build',
    },
    body: JSON.stringify({ query, variables: { login: site.github } }),
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const json = (await response.json()) as ApiResponse;
  if (json.errors?.length) throw new Error(json.errors.map((error) => error.message).join('; '));

  const calendar = json.data?.user?.contributionsCollection.contributionCalendar;
  if (!calendar) throw new Error('usuário não encontrado');

  const weeks = calendar.weeks
    .map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levels[day.contributionLevel] ?? 0,
        weekday: day.weekday,
      })),
    }))
    .filter((week) => week.days.length > 0);

  const days = weeks.flatMap((week) => week.days);
  if (days.length === 0) throw new Error('calendário vazio');

  return {
    total: calendar.totalContributions,
    weeks,
    from: days[0].date,
    to: days[days.length - 1].date,
  };
}

function isContributions(value: unknown): value is Contributions {
  const data = value as Contributions;
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.total === 'number' &&
    typeof data.from === 'string' &&
    typeof data.to === 'string' &&
    Array.isArray(data.weeks) &&
    data.weeks.length > 0
  );
}

async function readCache(): Promise<Contributions | null> {
  if (!existsSync(cachePath)) return null;
  try {
    const data: unknown = JSON.parse(await readFile(cachePath, 'utf8'));
    return isContributions(data) ? data : null;
  } catch {
    return null;
  }
}

async function writeCache(data: Contributions): Promise<void> {
  try {
    await mkdir(dirname(cachePath), { recursive: true });
    await writeFile(cachePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  } catch (error) {
    console.warn(`[github] não foi possível salvar ${cachePath}: ${(error as Error).message}`);
  }
}

let pending: Promise<Contributions | null> | undefined;

async function load(): Promise<Contributions | null> {
  const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;

  if (token) {
    try {
      const data = await fetchContributions(token);
      await writeCache(data);
      return data;
    } catch (error) {
      console.warn(`[github] falha ao buscar contribuições: ${(error as Error).message}. Usando o último resultado salvo.`);
    }
  } else {
    console.warn('[github] GITHUB_TOKEN ausente. Usando o último resultado salvo.');
  }

  const cached = await readCache();
  if (!cached) console.warn('[github] sem dados salvos; o gráfico de contribuições não será renderizado.');
  return cached;
}

export function getContributionStats(weeks: ContributionWeek[]): ContributionStats {
  const byWeekday = Array<number>(7).fill(0);
  let total = 0;
  let streak = 0;
  let longestStreak = 0;

  for (const day of weeks.flatMap((week) => week.days)) {
    total += day.count;
    byWeekday[day.weekday] += day.count;
    streak = day.count > 0 ? streak + 1 : 0;
    longestStreak = Math.max(longestStreak, streak);
  }

  const busiest = Math.max(...byWeekday);

  return {
    total,
    longestStreak,
    busiestWeekday: busiest > 0 ? byWeekday.indexOf(busiest) : null,
  };
}

interface RepoCommitCount {
  repo: string;
  total: number;
}

const commitCachePath = resolve(process.cwd(), 'src/data/repo-commits.json');

async function fetchRepoCommitCount(owner: string, repo: string, branch: string, token?: string): Promise<number> {
  const url = new URL(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits`);
  url.searchParams.set('per_page', '1');
  url.searchParams.set('sha', branch);

  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'portfolio-build',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const last = response.headers.get('link')?.match(/[?&]page=(\d+)[^>]*>;\s*rel="last"/);
  if (last) return Number(last[1]);

  const commits: unknown = await response.json();
  if (!Array.isArray(commits)) throw new Error('resposta inesperada');
  return commits.length;
}

async function readCommitCache(repo: string): Promise<number | null> {
  if (!existsSync(commitCachePath)) return null;
  try {
    const { repo: cachedRepo, total } = JSON.parse(await readFile(commitCachePath, 'utf8')) as Partial<RepoCommitCount>;
    return cachedRepo === repo && typeof total === 'number' && Number.isInteger(total) && total > 0 ? total : null;
  } catch {
    return null;
  }
}

async function writeCommitCache(data: RepoCommitCount): Promise<void> {
  try {
    await mkdir(dirname(commitCachePath), { recursive: true });
    await writeFile(commitCachePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  } catch (error) {
    console.warn(`[github] não foi possível salvar ${commitCachePath}: ${(error as Error).message}`);
  }
}

const commitCounts = new Map<string, Promise<number | null>>();

async function loadRepoCommitCount(owner: string, repo: string, branch: string): Promise<number | null> {
  const key = `${owner}/${repo}`;
  const token = import.meta.env.GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;

  try {
    const total = await fetchRepoCommitCount(owner, repo, branch, token);
    if (total > 0) {
      await writeCommitCache({ repo: key, total });
      return total;
    }
    throw new Error('nenhum commit encontrado');
  } catch (error) {
    console.warn(`[github] falha ao contar commits de ${key}: ${(error as Error).message}. Usando o último resultado salvo.`);
  }

  const cached = await readCommitCache(key);
  if (cached === null) console.warn('[github] sem contagem salva; a faixa de commits do site não será renderizada.');
  return cached;
}

export async function getRepoCommitCount(
  owner: string = site.repo.owner,
  repo: string = site.repo.name,
  branch: string = site.repo.branch,
): Promise<number | null> {
  const key = `${owner}/${repo}@${branch}`;
  let pendingCount = commitCounts.get(key);
  if (!pendingCount) {
    pendingCount = loadRepoCommitCount(owner, repo, branch);
    commitCounts.set(key, pendingCount);
  }
  const total = await pendingCount;
  if (total === null) commitCounts.delete(key);
  return total;
}

export async function getContributions(): Promise<Contributions | null> {
  pending ??= load();
  const data = await pending;
  if (!data) pending = undefined;
  return data;
}
