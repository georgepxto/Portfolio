import { navigate } from 'astro:transitions/client';
import { onPage } from './page';

type Dir = 'next' | 'prev';

const root = document.documentElement;
const PROJECT = /^\/trabalhos\/([^/]+)\/?$/;
const RETURN_GAP = 96;
const HIGHLIGHT = 1400;

const slugOf = (url: URL) => url.pathname.match(PROJECT)?.[1];
const isHome = (url: URL) => url.pathname === '/';
const isDir = (value: unknown): value is Dir => value === 'next' || value === 'prev';
const closest = (element: Element | undefined, selector: string) =>
  element instanceof Element ? element.closest<HTMLElement>(selector) : null;

let token = 0;
let returnTo: string | undefined;

document.addEventListener('astro:before-preparation', (event) => {
  token++;
  const from = slugOf(event.from);
  const to = slugOf(event.to);
  let dir: unknown = closest(event.sourceElement, '[data-dir]')?.dataset.dir ?? event.info?.dir;

  if (!dir && event.navigationType === 'traverse' && from && to) {
    dir = event.direction === 'back' ? 'prev' : 'next';
  }

  if (from && to && from !== to && isDir(dir)) root.dataset.dir = dir;
  else delete root.dataset.dir;

  const returning = Boolean(from) && isHome(event.to);
  if (returning) {
    root.dataset.return = '';
    document
      .querySelectorAll('[data-astro-transition-scope]')
      .forEach((element) => element.removeAttribute('data-astro-transition-scope'));
  } else {
    delete root.dataset.return;
  }

  const back =
    closest(event.sourceElement, '[data-back]') !== null ||
    (event.navigationType === 'traverse' && event.direction === 'back');
  returnTo = returning && back ? from : undefined;
});

document.addEventListener('astro:before-swap', (event) => {
  const current = token;
  const next = event.newDocument;
  const dir = root.dataset.dir;
  const from = slugOf(event.from);

  if (root.hasAttribute('data-return')) next.documentElement.dataset.return = '';

  if (dir) {
    next.documentElement.dataset.dir = dir;
    next.querySelector('[data-pd-cover]')?.setAttribute('data-pd-enter', '');
    next.querySelectorAll('[data-pd]').forEach((block) => block.setAttribute('data-pd-shown', ''));
  }

  if (from && isHome(event.to)) {
    next.querySelector(`[data-card="${CSS.escape(from)}"]`)?.setAttribute('data-revealed', '');
  }

  event.viewTransition.finished
    .catch(() => {})
    .finally(() => {
      if (current !== token) return;
      delete root.dataset.dir;
      delete root.dataset.return;
      document.querySelectorAll('[data-pd-enter]').forEach((cover) => cover.removeAttribute('data-pd-enter'));
    });
});

const highlight = (card: HTMLElement) => {
  const styles = getComputedStyle(root);
  const surface = styles.getPropertyValue('--surface').trim();
  const accent = styles.getPropertyValue('--accent').trim();
  const border = styles.getPropertyValue('--border').trim();
  const timing = { duration: HIGHLIGHT, easing: 'ease-out' };
  const animations = [
    card.animate(
      [
        { backgroundColor: surface },
        { backgroundColor: surface, offset: 0.4 },
        { backgroundColor: 'transparent' },
      ],
      timing,
    ),
  ];
  const cover = card.querySelector('.cover');
  if (cover) {
    animations.push(
      cover.animate(
        [{ borderColor: accent }, { borderColor: accent, offset: 0.45 }, { borderColor: border }],
        timing,
      ),
    );
  }
  animations.forEach((animation) => animation.finished.then(() => animation.cancel()).catch(() => {}));
};

document.addEventListener('astro:after-swap', () => {
  if (!returnTo) return;
  const card = document.querySelector<HTMLElement>(`[data-card="${CSS.escape(returnTo)}"]`);
  returnTo = undefined;
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const offset = Math.max(RETURN_GAP, (innerHeight - rect.height) / 2);
  scrollTo({ top: rect.top + scrollY - offset, behavior: 'instant' });
  highlight(card);
});

const typing = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable || target.closest('input, textarea, select') !== null);

onPage((signal) => {
  const project = document.querySelector<HTMLElement>('[data-project]');
  if (!project) return;

  const back = document.querySelector<HTMLAnchorElement>('a[data-back]');
  const next = document.querySelector<HTMLAnchorElement>('a[data-dir="next"]');
  const prev = project.dataset.prev;

  addEventListener(
    'keydown',
    (event) => {
      if (event.defaultPrevented || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return;
      if (root.classList.contains('is-menu-open') || typing(event.target)) return;

      if (event.key === 'ArrowRight' && next) {
        event.preventDefault();
        next.click();
      } else if (event.key === 'ArrowLeft' && prev) {
        event.preventDefault();
        void navigate(prev, { history: 'push', info: { dir: 'prev' } });
      } else if (event.key === 'Escape' && back) {
        event.preventDefault();
        back.click();
      }
    },
    { signal, capture: true },
  );
});
