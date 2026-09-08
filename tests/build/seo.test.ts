import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';

const PAGINAS = ['a', 'b', 'c'] as const;

function carregar(variant: string) {
  const html = readFileSync(`dist/prototipo/${variant}/index.html`, 'utf-8');
  return parseHTML(html).document;
}

describe('SEO e head', () => {
  for (const v of PAGINAS) {
    describe(`protótipo ${v}`, () => {
      let doc: Document;
      beforeAll(() => { doc = carregar(v) as unknown as Document; });

      it('declara pt-BR', () => {
        expect(doc.documentElement.getAttribute('lang')).toBe('pt-BR');
      });

      it('tem title e meta description não vazios', () => {
        expect(doc.title.length).toBeGreaterThan(10);
        const desc = doc.querySelector('meta[name="description"]');
        expect(desc?.getAttribute('content')?.length ?? 0).toBeGreaterThan(50);
      });

      it('tem canonical e Open Graph', () => {
        expect(doc.querySelector('link[rel="canonical"]')).not.toBeNull();
        expect(doc.querySelector('meta[property="og:title"]')).not.toBeNull();
        expect(doc.querySelector('meta[property="og:image"]')).not.toBeNull();
      });

      it('publica JSON-LD do tipo Dentist com o Instagram', () => {
        const bloco = doc.querySelector('script[type="application/ld+json"]');
        expect(bloco).not.toBeNull();
        const dados = JSON.parse(bloco!.textContent!);
        expect(dados['@type']).toBe('Dentist');
        expect(dados.sameAs).toContain('https://www.instagram.com/adzopereira/');
      });

      it('exibe o CRO exigido pelo CFO', () => {
        expect(doc.body.textContent).toContain('CRO-PE 15853');
      });
    });
  }
});
