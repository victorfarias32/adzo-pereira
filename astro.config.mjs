import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://adzo-pereira.vercel.app',
  compressHTML: true,
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
});
