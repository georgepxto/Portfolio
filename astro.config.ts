import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
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
  adapter: vercel(),
  integrations: [sitemap()],
  env: {
    schema: {
      KV_REST_API_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      KV_REST_API_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
      UPSTASH_REDIS_REST_URL: envField.string({ context: 'server', access: 'secret', optional: true }),
      UPSTASH_REDIS_REST_TOKEN: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
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
