import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://victorfarias32.github.io',
  base: '/adzo-pereira',
  compressHTML: true,
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
});
