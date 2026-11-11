import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site';

const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = /^https?:\/\//.test(site.siteUrl)
  ? site.siteUrl
  : vercelUrl
    ? `https://${vercelUrl}`
    : 'http://localhost:4321';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [sitemap()],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        webp: { quality: 90, smartSubsample: true, effort: 6 },
        jpeg: { quality: 90, mozjpeg: true, chromaSubsampling: '4:4:4' },
      },
    },
  },
});
