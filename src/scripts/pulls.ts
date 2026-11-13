const ENDPOINT = '/api/pulls';
const REFRESH = 30_000;
const LIVE_REFRESH = 3_000;
const BATCH_WINDOW = 2_000;
const RETRY = 30_000;
const MAX_BATCH = 5;
const MAX_PENDING = 60;
const CONFIRMED_TTL = 120_000;
const PENDING_TTL = 600_000;
const STORAGE_KEY = 'pulls';
const EASE = 'cubic-bezier(.2, .7, .2, 1)';

const format = new Intl.NumberFormat('pt-BR');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const toInt = (value: unknown) => (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value : 0);

const restore = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Record<string, unknown> | null;
    const now = Date.now();
    return {
      confirmed: now - toInt(stored?.confirmedAt) < CONFIRMED_TTL ? toInt(stored?.confirmed) : 0,
      pending: now - toInt(stored?.pendingAt) < PENDING_TTL ? Math.min(MAX_PENDING, toInt(stored?.pending)) : 0,
    };
  } catch {
    return { confirmed: 0, pending: 0 };
  }
};

let { confirmed, pending } = restore();
let available = false;
let inflight = false;
let lastFetch = 0;
let refreshTimer = 0;
let flushTimer = 0;
let badges = 0;
let inView = false;
const onScreen = new Set<Element>();

const persist = () => {
  try {
    const now = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ confirmed, confirmedAt: now, pending, pendingAt: now }));
  } catch {}
};

const render = (animate: boolean) => {
  const count = available ? confirmed + pending : null;
  document.querySelectorAll<HTMLElement>('[data-pulls]').forEach((element) => {
    element.hidden = count === null;
    if (count === null) return;

    const value = element.querySelector<HTMLElement>('[data-pulls-value]');
    const unit = element.querySelector<HTMLElement>('[data-pulls-unit]');
    const text = format.format(count);

    if (unit) unit.textContent = (count === 1 ? unit.dataset.one : unit.dataset.other) ?? unit.textContent;
    if (!value || value.textContent === text) return;
    const changed = value.textContent !== '';
    value.textContent = text;

    if (animate && changed && !reducedMotion.matches && element.offsetParent !== null) {
      value.animate(
        [
          { opacity: 0, transform: 'translateY(-8px)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 380, easing: EASE },
      );
    }
  });
};

const accept = (value: unknown) => {
  if (typeof value === 'number' && Number.isSafeInteger(value) && value >= 0) {
    available = true;
    confirmed = Math.max(confirmed, value);
    persist();
  } else {
    available = false;
  }
  render(true);
};

const scheduleFlush = (delay = BATCH_WINDOW) => {
  if (flushTimer || inflight || pending === 0) return;
  flushTimer = window.setTimeout(flush, delay);
};

const flush = async () => {
  flushTimer = 0;
  if (inflight || pending === 0) return;
  inflight = true;
  const batch = Math.min(MAX_BATCH, pending);
  let retry = BATCH_WINDOW;

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      cache: 'no-store',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ pulls: batch }),
    });
    const body = (await response.json().catch(() => null)) as { count?: unknown } | null;

    if (response.ok) {
      pending = Math.max(0, pending - batch);
      accept(body?.count);
    } else if (response.status === 429) {
      const wait = Number(response.headers.get('Retry-After')) * 1000;
      if (!Number.isFinite(wait) || wait > 60_000) pending = 0;
      else retry = Math.max(BATCH_WINDOW, wait);
      accept(body?.count);
    } else if (response.status === 403) {
      pending = 0;
    } else {
      retry = RETRY;
    }
  } catch {
    retry = RETRY;
  } finally {
    inflight = false;
    persist();
    render(true);
    scheduleFlush(retry);
  }
};

const refresh = async () => {
  if (document.visibilityState !== 'visible') return;
  lastFetch = Date.now();
  try {
    const response = await fetch(ENDPOINT, { cache: 'no-store', headers: { Accept: 'application/json' } });
    const body = (await response.json()) as { count?: unknown } | null;
    accept(body?.count);
  } catch {
    accept(null);
  }
  if (available) scheduleFlush(0);
};

const schedule = () => {
  window.clearTimeout(refreshTimer);
  refreshTimer = 0;
  if (document.visibilityState !== 'visible') return;
  const wait = Math.max(0, lastFetch + (inView ? LIVE_REFRESH : REFRESH) - Date.now());
  refreshTimer = window.setTimeout(async () => {
    await refresh();
    schedule();
  }, wait);
};

const observer =
  'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        const next = onScreen.size > 0;
        if (next === inView) return;
        inView = next;
        schedule();
      })
    : null;

const observe = () => {
  if (!observer) return;
  observer.disconnect();
  onScreen.clear();
  document.querySelectorAll('[data-pulls]').forEach((element) => observer.observe(element));
};

const restingPill = () => {
  const cord = document.querySelector<HTMLElement>('[data-pull-cord]');
  const handle = cord?.querySelector<HTMLElement>('[data-cord-handle]');
  const pill = handle?.querySelector<HTMLElement>('[data-cord-pill]');
  if (!cord || !handle || !pill || !pill.offsetWidth) return null;
  const box = cord.getBoundingClientRect();
  const left = box.left + handle.offsetLeft + pill.offsetLeft;
  const top = box.top + handle.offsetTop + pill.offsetTop;
  return { left, top, right: left + pill.offsetWidth };
};

const counterAnchor = () => {
  const counter = document.querySelector<HTMLElement>('[data-cord-count]');
  const value = counter?.querySelector<HTMLElement>('[data-pulls-value]');
  if (!counter || !value || counter.hidden || !counter.getClientRects().length) return null;
  const box = counter.getBoundingClientRect();
  return { left: value.getBoundingClientRect().left, top: box.top - 4 };
};

const floatUp = () => {
  if (reducedMotion.matches) return;
  const anchor = counterAnchor();
  const rect = anchor ? null : restingPill();
  if (!anchor && !rect) return;

  const badge = document.createElement('span');
  badge.className = 'pull-plus mono';
  badge.textContent = '+1';
  badge.setAttribute('aria-hidden', 'true');
  badge.style.viewTransitionName = `pull-plus-${++badges}`;
  document.body.append(badge);

  if (anchor) {
    badge.style.left = `${anchor.left}px`;
    badge.style.top = `${anchor.top - badge.offsetHeight}px`;
  } else if (rect) {
    const width = badge.offsetWidth;
    const right = rect.right + 6;
    badge.style.left = `${right + width <= innerWidth - 4 ? right : rect.left - 6 - width}px`;
    badge.style.top = `${rect.top - 14}px`;
  }

  const animation = badge.animate(
    [
      { opacity: 0, transform: 'translateY(0)', offset: 0 },
      { opacity: 1, offset: 0.15 },
      { opacity: 1, offset: 0.6 },
      { opacity: 0, transform: 'translateY(-28px)', offset: 1 },
    ],
    { duration: 1100, easing: 'cubic-bezier(.2, .7, .2, 1)', fill: 'forwards' },
  );
  animation.finished.catch(() => {}).finally(() => badge.remove());
};

document.addEventListener('cord:pull', () => {
  if (!available) return;
  pending = Math.min(MAX_PENDING, pending + 1);
  persist();
  render(true);
  floatUp();
  scheduleFlush();
});

document.addEventListener('visibilitychange', schedule);
document.addEventListener('astro:page-load', () => {
  render(false);
  observe();
});

render(false);
observe();
schedule();
