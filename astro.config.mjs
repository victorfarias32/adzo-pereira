import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { temConteudoPendente } from './src/data/site.ts';

/**
 * Enquanto houver [[PENDENTE]] no conteúdo, a mesma condição que liga o
 * <meta name="robots" content="noindex"> (ver src/layouts/Base.astro)
 * também tira a única página do sitemap — não faz sentido submeter ao
 * Google uma URL que a própria página está pedindo para não indexar.
 */
export default defineConfig({
  site: 'https://adzo-pereira.vercel.app',
  compressHTML: true,
  integrations: [sitemap({ filter: () => !temConteudoPendente() })],
  build: { inlineStylesheets: 'always' },
});
