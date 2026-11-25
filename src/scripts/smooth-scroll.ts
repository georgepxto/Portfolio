import Lenis from 'lenis';

export const NAV_OFFSET = 88;

const root = document.documentElement;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

let lenis: Lenis | undefined;
let frame = 0;

const loop = (time: number) => {
  lenis?.raf(time);
  frame = requestAnimationFrame(loop);
};

const mount = () => {
  if (lenis || reducedMotion.matches) return;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -NAV_OFFSET } });
  frame = requestAnimationFrame(loop);
};

const unmount = () => {
  cancelAnimationFrame(frame);
  frame = 0;
  lenis?.destroy();
  lenis = undefined;
};

const settle = (instance: Lenis) => {
  instance.resize();
  if (instance.isStopped) return;
  instance.stop();
  instance.start();
};

export const getLenis = () => lenis;

export const scrollToY = (top: number, immediate = false) => {
  if (lenis) {
    if (immediate) settle(lenis);
    lenis.scrollTo(top, { immediate, force: true });
    return;
  }
  scrollTo({ top, behavior: immediate || reducedMotion.matches ? 'instant' : 'smooth' });
};

export const scrollToHash = (hash: string) => {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!lenis || !target) return;
  settle(lenis);
  lenis.scrollTo(target, { offset: -NAV_OFFSET, immediate: true, force: true });
};

const samePageHash = (event: MouseEvent) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
    return null;
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!(link instanceof HTMLAnchorElement) || (link.target && link.target !== '_self')) return null;
  const url = new URL(link.href);
  const same = url.origin === location.origin && url.pathname === location.pathname && url.search === location.search;
  return same && url.hash ? url : null;
};

const focusTarget = (target: HTMLElement) => {
  const temporary = !target.hasAttribute('tabindex');
  if (temporary) target.tabIndex = -1;
  target.dataset.scrollTarget = '';
  target.addEventListener(
    'blur',
    () => {
      if (temporary) target.removeAttribute('tabindex');
      delete target.dataset.scrollTarget;
    },
    { once: true },
  );
  target.focus({ preventScroll: true });
};

document.addEventListener(
  'click',
  (event) => {
    if (!lenis) return;
    const url = samePageHash(event);
    if (!url) return;
    event.preventDefault();
    if (url.href !== location.href) history.replaceState(history.state, '', url.href);
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (target) setTimeout(() => focusTarget(target));
  },
  { capture: true },
);

document.addEventListener('astro:before-swap', (event) => {
  if (!lenis) return;
  settle(lenis);
  root.classList.forEach((name) => {
    if (name === 'lenis' || name.startsWith('lenis-')) event.newDocument.documentElement.classList.add(name);
  });
});

document.addEventListener('astro:after-swap', () => {
  if (lenis) settle(lenis);
});

reducedMotion.addEventListener('change', () => (reducedMotion.matches ? unmount() : mount()));
addEventListener('pagehide', unmount);
addEventListener('pageshow', (event) => {
  if (event.persisted) mount();
});

mount();
