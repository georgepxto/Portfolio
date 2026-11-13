import type { APIContext, APIRoute } from 'astro';
import { Redis } from '@upstash/redis';
import { KV_REST_API_TOKEN, KV_REST_API_URL, UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from 'astro:env/server';

export const prerender = false;

const KEY = 'pulls';
const READ_CACHE = 's-maxage=2, stale-while-revalidate=2';
const BURST_MS = 2_000;
const HOURLY_LIMIT = 60;
const HOUR_S = 3_600;
const MAX_BATCH = 5;

const url = UPSTASH_REDIS_REST_URL ?? KV_REST_API_URL;
const token = UPSTASH_REDIS_REST_TOKEN ?? KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token, retry: { retries: 1 } }) : null;

const json = (body: { count: number | null }, status: number, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...headers },
  });

const toCount = (value: unknown) => {
  const count = Number(value ?? 0);
  return Number.isSafeInteger(count) && count >= 0 ? count : 0;
};

const read = async () => (redis ? toCount(await redis.get(KEY)) : null);

const clientId = async ({ request, clientAddress }: APIContext) => {
  let ip = '';
  try {
    ip = clientAddress;
  } catch {
    ip = request.headers.get('x-real-ip') ?? request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '';
  }
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip || 'unknown'));
  return Array.from(new Uint8Array(digest).slice(0, 16), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

const batchSize = async (request: Request) => {
  try {
    const body: unknown = await request.json();
    const pulls = typeof body === 'object' && body !== null ? (body as { pulls?: unknown }).pulls : undefined;
    return typeof pulls === 'number' && Number.isInteger(pulls) ? Math.min(MAX_BATCH, Math.max(1, pulls)) : 1;
  } catch {
    return 1;
  }
};

const limited = async (client: Redis, id: string, pulls: number): Promise<number | null> => {
  const burst = await client.set(`pulls:rl:burst:${id}`, 1, { nx: true, px: BURST_MS });
  if (burst === null) return Math.ceil(BURST_MS / 1000);

  const hourKey = `pulls:rl:hour:${id}`;
  const [used] = await client.multi().incrby(hourKey, pulls).expire(hourKey, HOUR_S, 'NX').exec<[number, number]>();
  if (used <= HOURLY_LIMIT) return null;

  const ttl = await client.ttl(hourKey);
  return ttl > 0 ? ttl : HOUR_S;
};

const sameOrigin = ({ request, url: requestUrl, site }: APIContext) => {
  const origin = request.headers.get('origin');
  if (!origin) return false;
  return origin === requestUrl.origin || (site !== undefined && origin === site.origin);
};

export const GET: APIRoute = async () => {
  try {
    return json({ count: await read() }, 200, { 'Cache-Control': READ_CACHE });
  } catch (error) {
    console.error('[pulls] read failed:', (error as Error).message);
    return json({ count: null }, 200, { 'Cache-Control': READ_CACHE });
  }
};

export const POST: APIRoute = async (context) => {
  if (!sameOrigin(context)) return json({ count: null }, 403, { 'Cache-Control': 'no-store' });
  if (!redis) return json({ count: null }, 503, { 'Cache-Control': 'no-store' });

  try {
    const pulls = await batchSize(context.request);
    const retryAfter = await limited(redis, await clientId(context), pulls);
    if (retryAfter !== null) {
      return json({ count: await read() }, 429, { 'Cache-Control': 'no-store', 'Retry-After': String(retryAfter) });
    }

    return json({ count: toCount(await redis.incrby(KEY, pulls)) }, 200, { 'Cache-Control': 'no-store' });
  } catch (error) {
    console.error('[pulls] increment failed:', (error as Error).message);
    return json({ count: null }, 503, { 'Cache-Control': 'no-store' });
  }
};
