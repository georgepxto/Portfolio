import { navigate } from 'astro:transitions/client';
import { onPage } from './page';

type Dir = 'next' | 'prev';

const root = document.documentElement;
const PROJECT = /^\/trabalhos\/([^/]+)\/?$/;

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

  const back = closest(event.sourceElement, '[data-back]') !== null;
  returnTo = from && isHome(event.to) && event.navigationType !== 'traverse' && back ? from : undefined;
});

document.addEventListener('astro:before-swap', (event) => {
  const current = token;
  const next = event.newDocument;
  const dir = root.dataset.dir;
  const from = slugOf(event.from);

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
      document.querySelectorAll('[data-pd-enter]').forEach((cover) => cover.removeAttribute('data-pd-enter'));
    });
});

document.addEventListener('astro:after-swap', () => {
  if (!returnTo) return;
  const card = document.querySelector(`[data-card="${CSS.escape(returnTo)}"]`);
  returnTo = undefined;
  card?.scrollIntoView({ block: 'center', behavior: 'instant' });
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
