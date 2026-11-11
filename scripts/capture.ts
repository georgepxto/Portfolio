import { chromium, type Browser } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

interface Target {
  slug: string;
  url: string;
  storageState?: string;
}

const targets: Target[] = [
  { slug: 'gestao-assistencia-social', url: '' },
  { slug: 'plataforma-de-videos', url: '' },
  { slug: 'takeone', url: '' },
  { slug: 'lunna-pijama', url: 'https://lunnapijama.com.br' },
];

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = resolve(root, 'src/assets/projects');

const hideOverlays = `
  [id*="cookie" i], [class*="cookie" i],
  [id*="consent" i], [class*="consent" i],
  [id*="preloader" i], [class*="preloader" i],
  [id*="loading-screen" i], [class*="loading-screen" i],
  #onetrust-banner-sdk, #onetrust-consent-sdk, .cc-window, .cky-consent-container,
  astro-dev-toolbar, vite-error-overlay {
    display: none !important;
  }
`;

async function launch(): Promise<Browser> {
  try {
    return await chromium.launch({ channel: 'chrome' });
  } catch {
    return await chromium.launch();
  }
}

async function capture(browser: Browser, target: Target): Promise<void> {
  const output = resolve(outputDir, `${target.slug}.png`);

  if (!target.url) {
    const status = existsSync(output) ? 'mantido o PNG manual' : 'sem PNG manual';
    console.log(`- ${target.slug}: sem URL, ${status}`);
    return;
  }

  if (target.storageState && !existsSync(resolve(root, target.storageState))) {
    console.log(`- ${target.slug}: storage state ${target.storageState} não encontrado, pulado`);
    return;
  }

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
    reducedMotion: 'reduce',
    storageState: target.storageState ? resolve(root, target.storageState) : undefined,
  });

  try {
    const page = await context.newPage();
    await page.goto(target.url, { waitUntil: 'networkidle', timeout: 60_000 });
    await page.addStyleTag({ content: hideOverlays });
    await page.evaluate(async () => {
      await document.fonts.ready;
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await page.screenshot({ path: output, fullPage: false, animations: 'disabled' });
    console.log(`- ${target.slug}: ${output}`);
  } finally {
    await context.close();
  }
}

async function main(): Promise<void> {
  const only = process.argv.slice(2);
  const selected = only.length ? targets.filter((target) => only.includes(target.slug)) : targets;

  if (!selected.length) {
    console.error(`Nenhum projeto com os slugs: ${only.join(', ')}`);
    process.exit(1);
  }

  mkdirSync(outputDir, { recursive: true });
  const browser = await launch();

  try {
    for (const target of selected) {
      await capture(browser, target);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
