const TAU = Math.PI * 2;
const WAVE_AMPLITUDE = 0.4;
const WAVE_SPEED = 0.0016;
const FOLLOW = 0.2;
const MAX_RATIO = 2;

interface Point {
  x: number;
  y: number;
}

interface Zone {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

const ZONE_REFRESH = 1000;

const number = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const influence = (distance: number, radius: number) => {
  if (radius <= 0 || distance >= radius) return 0;
  const t = 1 - Math.max(0, distance) / radius;
  return t * t * (3 - 2 * t);
};

export const mountDotField = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');
  if (!context) return () => {};

  const gap = Math.max(4, number(canvas.dataset.gap, 24));
  const radius = Math.max(0, number(canvas.dataset.radius, 140));
  const dotSize = Math.max(0.1, number(canvas.dataset.dotSize, 1));
  const grow = Math.max(0, number(canvas.dataset.grow, 3.5));
  const corner = canvas.dataset.origin === 'corner';
  const avoid = canvas.dataset.avoid;
  const margin = dotSize + grow + 4;

  const controller = new AbortController();
  const { signal } = controller;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const noHover = matchMedia('(hover: none)');

  let width = 0;
  let height = 0;
  let ratio = 1;
  let visible = false;
  let frame = 0;
  let pending = 0;
  let pointer: Point | null = null;
  let focus: Point | null = null;
  let strength = 0;
  let zones: Zone[] = [];
  let zonesAt = -Infinity;

  const measureZones = () => {
    zonesAt = performance.now();
    if (!avoid) return;
    const origin = canvas.getBoundingClientRect();
    const range = document.createRange();
    const next: Zone[] = [];
    const add = (rect: DOMRect) => {
      if (rect.width < 1 || rect.height < 1) return;
      next.push({
        left: rect.left - origin.left - margin,
        top: rect.top - origin.top - margin,
        right: rect.right - origin.left + margin,
        bottom: rect.bottom - origin.top + margin,
      });
    };
    document.querySelectorAll<HTMLElement>(avoid).forEach((element) => {
      if (!element.getClientRects().length) return;
      if (element.textContent?.trim()) {
        range.selectNodeContents(element);
        for (const rect of range.getClientRects()) add(rect);
      } else {
        add(element.getBoundingClientRect());
      }
    });
    zones = next;
  };

  const covered = (x: number, y: number) =>
    zones.some((zone) => x >= zone.left && x <= zone.right && y >= zone.top && y <= zone.bottom);

  const still = () => reducedMotion.matches || noHover.matches;
  const revealing = () => 'vt' in document.documentElement.dataset;
  const animating = () => visible && document.visibilityState !== 'hidden' && !still() && !revealing();

  const resize = () => {
    const nextWidth = canvas.clientWidth;
    const nextHeight = canvas.clientHeight;
    const nextRatio = Math.min(MAX_RATIO, Math.max(1, window.devicePixelRatio || 1));
    if (nextWidth === width && nextHeight === height && nextRatio === ratio) return;
    width = nextWidth;
    height = nextHeight;
    ratio = nextRatio;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
  };

  const draw = (time: number, frozen: boolean) => {
    if (!width || !height) return;
    const rect = canvas.getBoundingClientRect();
    const inside =
      pointer !== null &&
      pointer.x >= rect.left &&
      pointer.x <= rect.right &&
      pointer.y >= rect.top &&
      pointer.y <= rect.bottom;

    if (inside && pointer) focus = { x: pointer.x - rect.left, y: pointer.y - rect.top };
    const target = inside ? 1 : 0;
    strength = frozen ? target : strength + (target - strength) * FOLLOW;
    if (!inside && strength < 0.002) {
      strength = 0;
      focus = null;
    }

    if (avoid && time - zonesAt > ZONE_REFRESH) measureZones();
    const styles = getComputedStyle(canvas);
    const columns = Math.floor((width - (corner ? gap / 2 : 0)) / gap) + 1;
    const rows = Math.floor((height - (corner ? gap / 2 : 0)) / gap) + 1;
    const startX = corner ? gap / 2 : (width - (columns - 1) * gap) / 2;
    const startY = corner ? gap / 2 : (height - (rows - 1) * gap) / 2;
    const wave = frozen ? 0 : WAVE_AMPLITUDE * (1 - strength);
    const phase = time * WAVE_SPEED;
    const active: { x: number; y: number; size: number; power: number }[] = [];

    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    context.beginPath();

    for (let row = 0; row < rows; row++) {
      const baseY = startY + row * gap;
      for (let column = 0; column < columns; column++) {
        const x = startX + column * gap;
        const y = wave ? baseY + wave * Math.sin(phase + x * 0.045 + baseY * 0.03) : baseY;
        let power = focus && strength > 0 ? influence(Math.hypot(x - focus.x, y - focus.y), radius) * strength : 0;
        if (power > 0 && covered(x, y)) power = 0;
        const size = dotSize + grow * power;
        context.moveTo(x + size, y);
        context.arc(x, y, size, 0, TAU);
        if (power > 0.002) active.push({ x, y, size, power });
      }
    }

    context.fillStyle = styles.color;
    context.fill();

    if (active.length) {
      context.fillStyle = styles.outlineColor;
      for (const dot of active) {
        context.globalAlpha = 0.3 + 0.7 * Math.min(1, dot.power);
        context.beginPath();
        context.arc(dot.x, dot.y, dot.size, 0, TAU);
        context.fill();
      }
      context.globalAlpha = 1;
    }
  };

  const loop = (time: number) => {
    frame = 0;
    if (!animating()) return;
    draw(time, false);
    frame = requestAnimationFrame(loop);
  };

  const drawOnce = () => {
    if (pending || !visible || document.visibilityState === 'hidden') return;
    pending = requestAnimationFrame((time) => {
      pending = 0;
      draw(time, true);
    });
  };

  const refresh = () => {
    if (animating()) {
      if (!frame) frame = requestAnimationFrame(loop);
      return;
    }
    cancelAnimationFrame(frame);
    frame = 0;
    drawOnce();
  };

  const wake = () => {
    if (!animating()) drawOnce();
  };

  const track = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse' || still()) return;
    pointer = { x: event.clientX, y: event.clientY };
    wake();
  };

  const clear = () => {
    pointer = null;
    wake();
  };

  document.addEventListener('pointermove', track, { passive: true, signal });
  document.documentElement.addEventListener('pointerleave', clear, { passive: true, signal });
  window.addEventListener('blur', clear, { signal });
  window.addEventListener('scroll', wake, { passive: true, signal });
  document.addEventListener('visibilitychange', refresh, { signal });
  reducedMotion.addEventListener('change', refresh, { signal });
  noHover.addEventListener('change', refresh, { signal });

  const theme = new MutationObserver(refresh);
  theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-vt'] });

  const sizes = new ResizeObserver(() => {
    resize();
    measureZones();
    refresh();
  });
  sizes.observe(canvas);

  const observer = new IntersectionObserver((entries) => {
    visible = entries.some((entry) => entry.isIntersecting);
    refresh();
  });
  observer.observe(canvas);

  resize();
  measureZones();
  void document.fonts?.ready.then(() => {
    measureZones();
    wake();
  });
  canvas.dataset.ready = '';

  return () => {
    controller.abort();
    theme.disconnect();
    sizes.disconnect();
    observer.disconnect();
    cancelAnimationFrame(frame);
    cancelAnimationFrame(pending);
    delete canvas.dataset.ready;
  };
};
