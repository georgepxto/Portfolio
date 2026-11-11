import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site';

const siteUrl = /^https?:\/\//.test(site.siteUrl) ? site.siteUrl : 'http://localhost:4321';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [sitemap()],
});
