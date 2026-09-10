import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { parseHTML } from 'linkedom';
import { site } from '../../src/data/site';

function doc() {
  return parseHTML(readFileSync('dist/index.html', 'utf-8')).document;
}

describe('estratégia de conversão', () => {
  it('tem pelo menos 8 links de WhatsApp', () => {
    const links = doc().querySelectorAll('a[href*="wa.me/5581998742330"]');
    expect(links.length).toBeGreaterThanOrEqual(8);
  });

  it('todo link de WhatsApp abre em nova aba com rel noopener', () => {
    const links = doc().querySelectorAll('a[href*="wa.me"]');
    for (const a of links) {
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toContain('noopener');
    }
  });

  it('usa mensagens pré-preenchidas distintas por origem', () => {
    const hrefs = Array.from(doc().querySelectorAll('a[href*="wa.me"]'))
      .map((a) => a.getAttribute('href')!);
    const textos = new Set(hrefs.map((h) => h.split('?text=')[1]));
    // header, hero, urgência, 5 tratamentos, quiz, faq, rodapé → bem mais que 4 distintas
    expect(textos.size).toBeGreaterThanOrEqual(6);
  });

  it('o CTA de urgência menciona urgência', () => {
    const hrefs = Array.from(doc().querySelectorAll('a[href*="wa.me"]'))
      .map((a) => decodeURIComponent(a.getAttribute('href')!));
    expect(hrefs.some((h) => h.includes('urgência'))).toBe(true);
  });

  it('tem as 12 seções da spec, na ordem', () => {
    const esperadas = [
      'topo', 'inicio', 'credenciais', 'urgencia', 'tratamentos', 'quiz',
      'resultados', 'sobre', 'primeira-consulta', 'duvidas', 'localizacao', 'rodape',
    ];
    const d = doc();
    const encontradas = Array.from(d.querySelectorAll('[id]'))
      .map((el) => el.id)
      .filter((id) => esperadas.includes(id));
    expect(encontradas).toEqual(esperadas);
  });

  it('toda imagem tem alt descritivo', () => {
    for (const img of doc().querySelectorAll('img')) {
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(10);
    }
  });

  it('tem exatamente um h1', () => {
    expect(doc().querySelectorAll('h1').length).toBe(1);
  });

  it('publica o aviso do quiz (disclaimer exigido pelo CFO) no HTML final', () => {
    // Valida o data object não basta: alguém poderia apagar {site.quiz.aviso}
    // do template e a suíte de unidade continuaria verde.
    expect(doc().body.textContent).toContain(site.quiz.aviso);
  });

  it('publica a legenda de resultados (disclaimer exigido pelo CFO) no HTML final', () => {
    expect(doc().body.textContent).toContain(site.resultados.legenda);
  });

  it('o número de WhatsApp aparece só em whatsapp.ts no código-fonte', () => {
    const encontrados: string[] = [];
    const varrer = (dir: string) => {
      for (const entrada of readdirSync(dir, { withFileTypes: true })) {
        const caminho = `${dir}/${entrada.name}`;
        if (entrada.isDirectory()) { varrer(caminho); continue; }
        if (!/\.(ts|astro|js|mjs)$/.test(entrada.name)) continue;
        if (readFileSync(caminho, 'utf-8').includes('5581998742330')) {
          encontrados.push(caminho);
        }
      }
    };
    varrer('src');
    expect(encontrados).toEqual(['src/lib/whatsapp.ts']);
  });
});
