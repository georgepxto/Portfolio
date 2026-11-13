const ENDPOINT = '/api/pulls';
const REFRESH = 30_000;
const DEBOUNCE = 2_000;
const EASE = 'cubic-bezier(.2, .7, .2, 1)';

const format = new Intl.NumberFormat('pt-BR');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

let count: number | null = null;
let unsent = 0;
let sequence = 0;
let applied = 0;
let lastFetch = 0;
let refreshTimer = 0;
let sendTimer = 0;
let badges = 0;

const render = (animate: boolean) => {
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

const apply = (id: number, value: unknown) => {
  if (id < applied) return;
  applied = id;
  count = typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 ? value + unsent : null;
  render(true);
};

const request = async (method: 'GET' | 'POST', keepalive = false) => {
  const id = ++sequence;
  try {
    const response = await fetch(ENDPOINT, {
      method,
      keepalive,
      cache: 'no-store',
      headers: { Accept: 'application/json' },
    });
    const body: unknown = await response.json();
    apply(id, (body as { count?: unknown } | null)?.count);
  } catch {
    if (method === 'GET') apply(id, null);
  }
};

const refresh = () => {
  if (document.visibilityState !== 'visible') return;
  lastFetch = Date.now();
  void request('GET');
};

const schedule = () => {
  window.clearInterval(refreshTimer);
  refreshTimer = 0;
  if (document.visibilityState !== 'visible') return;
  if (Date.now() - lastFetch >= REFRESH) refresh();
  refreshTimer = window.setInterval(refresh, REFRESH);
};

const send = (keepalive = false) => {
  window.clearTimeout(sendTimer);
  sendTimer = 0;
  if (unsent === 0) return;
  unsent = 0;
  void request('POST', keepalive);
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

const floatUp = () => {
  if (reducedMotion.matches) return;
  const rect = restingPill();
  if (!rect) return;

  const badge = document.createElement('span');
  badge.className = 'pull-plus mono';
  badge.textContent = '+1';
  badge.setAttribute('aria-hidden', 'true');
  badge.style.viewTransitionName = `pull-plus-${++badges}`;
  document.body.append(badge);

  const width = badge.offsetWidth;
  const right = rect.right + 6;
  const left = right + width <= innerWidth - 4 ? right : rect.left - 6 - width;
  badge.style.left = `${left}px`;
  badge.style.top = `${rect.top - 14}px`;

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
  if (count === null) return;
  count += 1;
  unsent += 1;
  render(true);
  floatUp();
  window.clearTimeout(sendTimer);
  sendTimer = window.setTimeout(send, DEBOUNCE);
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') send(true);
  schedule();
});

addEventListener('pagehide', () => send(true));
document.addEventListener('astro:page-load', () => render(false));

render(false);
schedule();
