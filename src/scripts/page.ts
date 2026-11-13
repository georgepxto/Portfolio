type Cleanup = void | (() => void);

const lifecycle = <T>(
  resolve: () => T | null,
  setup: (target: T, signal: AbortSignal) => Cleanup,
  teardownOnSwap: boolean,
) => {
  let current: T | null = null;
  let controller: AbortController | undefined;
  let cleanup: Cleanup;

  const teardown = () => {
    controller?.abort();
    if (typeof cleanup === 'function') cleanup();
    controller = undefined;
    cleanup = undefined;
    current = null;
  };

  const run = () => {
    const target = resolve();
    if (target === current) return;
    teardown();
    if (!target) return;
    current = target;
    controller = new AbortController();
    cleanup = setup(target, controller.signal);
  };

  if (teardownOnSwap) document.addEventListener('astro:before-swap', teardown);
  document.addEventListener('astro:page-load', run);
  run();
};

export const onPage = (setup: (signal: AbortSignal) => Cleanup) =>
  lifecycle(() => document.body, (_, signal) => setup(signal), true);

export const onElement = <T extends Element>(selector: string, setup: (element: T, signal: AbortSignal) => Cleanup) =>
  lifecycle(() => document.querySelector<T>(selector), setup, false);
