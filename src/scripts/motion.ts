const EASE = 'cubic-bezier(.2, .7, .2, 1)';
const LINE_EASE = 'cubic-bezier(.7, 0, .2, 1)';
const DURATION = 850;
const DISTANCE = 30;
const MAX_STEPS = 6;
const WAVE = 1100;
const COUNT = 1300;

const root = document.documentElement;

const settle = (animation: Animation) => {
  animation.finished.then(() => animation.cancel()).catch(() => {});
};

const fadeUp = (element: Element, delay: number, distance = DISTANCE, duration = DURATION) => {
  settle(
    element.animate(
      [
        { opacity: 0, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: 'none' },
      ],
      { duration, delay, easing: EASE, fill: 'backwards' },
    ),
  );
};

const wipe = (element: Element, duration: number, delay: number) => {
  settle(
    element.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }], {
      duration,
      delay,
      easing: LINE_EASE,
      fill: 'backwards',
    }),
  );
};

const count = (element: HTMLElement) => {
  const target = Number(element.dataset.count);
  if (!Number.isFinite(target)) return;
  const format = new Intl.NumberFormat('pt-BR');
  const unit = (value: number) => {
    const word = value === 1 ? element.dataset.unitOne : element.dataset.unitOther;
    return word ? ` ${word}` : '';
  };
  const render = (value: number) => {
    element.textContent = `${format.format(value)}${unit(value)}`;
  };
  const start = performance.now();

  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / COUNT);
    render(Math.round(target * (1 - (1 - progress) ** 3)));
    if (progress < 1) requestAnimationFrame(tick);
  };

  render(0);
  requestAnimationFrame(tick);
};

const reveal = (container: HTMLElement) => {
  const children = Array.from(container.children);
  const step = children.length > 3 ? 45 : 90;
  container.querySelectorAll<HTMLElement>('[data-count]').forEach(count);
  container.dataset.revealed = '';

  children.forEach((child, index) => {
    const delay = Math.min(index, MAX_STEPS) * step;

    if (child.hasAttribute('data-reveal-clip')) {
      settle(
        child.animate(
          [
            { opacity: 0, transform: `translateY(${DISTANCE}px)`, clipPath: 'inset(0 0 22% 0)' },
            { opacity: 1, transform: 'none', clipPath: 'inset(0 0 0 0)' },
          ],
          { duration: DURATION, delay, easing: EASE, fill: 'backwards' },
        ),
      );
      return;
    }

    fadeUp(child, delay);
  });
};

const timeline = (list: HTMLElement) => {
  list.dataset.revealed = '';

  Array.from(list.children).forEach((step, index) => {
    fadeUp(step, 120 + 300 * index);
    const fill = step.querySelector('[data-tl]');
    if (!fill) return;
    settle(
      fill.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
        duration: 520,
        delay: 200 + 300 * index,
        easing: 'cubic-bezier(.6, 0, .4, 1)',
        fill: 'backwards',
      }),
    );
  });
};

const words = (heading: HTMLElement) => {
  heading.dataset.revealed = '';
  Array.from(heading.children).forEach((word, index) => fadeUp(word, index * 70, 48, 1000));
};

const wave = (canvas: HTMLElement) => {
  const box = canvas.getBoundingClientRect();
  canvas.dataset.revealed = '';
  if (!box.width) return;

  canvas.querySelectorAll<HTMLElement>('.cell').forEach((cell) => {
    const rect = cell.getBoundingClientRect();
    if (!rect.width) return;
    const delay = ((rect.left - box.left) / box.width) * WAVE;
    settle(
      cell.animate(
        [
          { opacity: 0, transform: 'scale(.3)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 420, delay, easing: EASE, fill: 'backwards' },
      ),
    );
  });
};

const hero = () => {
  const find = (name: string) => document.querySelector<HTMLElement>(`[data-hero="${name}"]`);
  const avatar = find('avatar');
  const line = find('line');
  const line2 = find('line2');
  const list = find('list');
  const cta = find('cta');

  if (avatar) {
    settle(
      avatar.animate(
        [
          { opacity: 0, transform: 'scale(.82)' },
          { opacity: 1, transform: 'none' },
        ],
        { duration: 1050, easing: EASE, fill: 'backwards' },
      ),
    );
  }

  if (line) wipe(line, 1100, 150);
  if (line2) wipe(line2, 1000, 320);
  if (list) Array.from(list.children).forEach((item, index) => fadeUp(item, 450 + index * 60));
  if (cta) fadeUp(cta, 820);

  root.classList.add('hero-in');
};

const watch = () => {
  const targets = new Map<Element, () => void>();
  const add = (selector: string, run: (element: HTMLElement) => void) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => targets.set(element, () => run(element)));
  };

  add('[data-reveal]', reveal);
  add('[data-words]', words);
  add('[data-timeline]', timeline);
  add('[data-contrib-wave]', wave);

  if (!('IntersectionObserver' in window)) {
    targets.forEach((run) => run());
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) continue;
        observer.unobserve(entry.target);
        targets.get(entry.target)?.();
        targets.delete(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  );

  targets.forEach((_, element) => observer.observe(element));
};

const start = () => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.remove('motion');
    return;
  }

  root.dataset.motionReady = '';
  hero();
  watch();
};

start();
