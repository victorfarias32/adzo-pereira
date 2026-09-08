import { describe, it, expect } from 'vitest';
import { contrastRatio, relativeLuminance } from '../../src/lib/contrast';
import { palettes } from '../../src/data/palettes';

describe('contrastRatio', () => {
  it('dá 21 para preto sobre branco', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
  });

  it('dá 1 para a mesma cor', () => {
    expect(contrastRatio('#1B5A7A', '#1B5A7A')).toBeCloseTo(1, 5);
  });

  it('é simétrico', () => {
    expect(contrastRatio('#123456', '#eeeeee')).toBeCloseTo(
      contrastRatio('#eeeeee', '#123456'),
      5,
    );
  });

  it('aceita hex com e sem #', () => {
    expect(relativeLuminance('ffffff')).toBeCloseTo(relativeLuminance('#ffffff'), 6);
  });
});

describe('paletas das 3 direções', () => {
  for (const variant of ['a', 'b', 'c'] as const) {
    it(`direção ${variant.toUpperCase()}: todo par de texto atinge AA (4.5:1)`, () => {
      const p = palettes[variant];
      for (const [fg, bg] of p.paresDeTexto) {
        const ratio = contrastRatio(p.tokens[fg], p.tokens[bg]);
        expect(
          ratio,
          `${variant}: ${fg} (${p.tokens[fg]}) sobre ${bg} (${p.tokens[bg]}) = ${ratio.toFixed(2)}:1`,
        ).toBeGreaterThanOrEqual(4.5);
      }
    });

    it(`direção ${variant.toUpperCase()}: todo token de par existe`, () => {
      const p = palettes[variant];
      for (const [fg, bg] of p.paresDeTexto) {
        expect(p.tokens[fg], `token ausente: ${fg}`).toBeDefined();
        expect(p.tokens[bg], `token ausente: ${bg}`).toBeDefined();
      }
    });
  }
});
