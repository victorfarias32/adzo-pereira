import { describe, it, expect } from 'vitest';
import {
  whatsappLink,
  whatsappLinkTratamento,
  whatsappLinkQuiz,
} from '../../src/lib/whatsapp';

const BASE = 'https://wa.me/5581998742330?text=';

describe('whatsappLink', () => {
  it('aponta para o número do Dr. Adzo', () => {
    expect(whatsappLink('hero').startsWith(BASE)).toBe(true);
  });

  it('codifica acentos para URL', () => {
    // "Olá" precisa virar "Ol%C3%A1", senão o WhatsApp quebra a mensagem
    expect(whatsappLink('hero')).toContain('Ol%C3%A1');
  });

  it('manda mensagem de urgência diferente da mensagem padrão', () => {
    expect(whatsappLink('urgencia')).not.toBe(whatsappLink('hero'));
    expect(decodeURIComponent(whatsappLink('urgencia'))).toContain('urgência');
  });

  it('cobre todas as origens sem retornar mensagem vazia', () => {
    const origens = ['header', 'hero', 'urgencia', 'faq', 'rodape', 'flutuante'] as const;
    for (const o of origens) {
      const texto = decodeURIComponent(whatsappLink(o).replace(BASE, ''));
      expect(texto.length).toBeGreaterThan(20);
      expect(texto).toContain('Dr. Adzo');
    }
  });

  it('gera mensagem distinta para cada origem', () => {
    const origens = ['header', 'hero', 'urgencia', 'faq', 'rodape', 'flutuante'] as const;
    const links = origens.map((o) => whatsappLink(o));
    expect(new Set(links).size).toBe(origens.length);
  });
});

describe('whatsappLinkTratamento', () => {
  it('interpola o nome do tratamento na mensagem', () => {
    const url = whatsappLinkTratamento('Tratamento de Canal');
    expect(decodeURIComponent(url)).toContain('Tratamento de Canal');
  });

  it('gera links diferentes para tratamentos diferentes', () => {
    expect(whatsappLinkTratamento('Clareamento')).not.toBe(
      whatsappLinkTratamento('Restauração'),
    );
  });
});

describe('whatsappLinkQuiz', () => {
  it('lista os sintomas marcados separados por vírgula', () => {
    const url = whatsappLinkQuiz(['dor ao mastigar', 'inchaço na gengiva']);
    const texto = decodeURIComponent(url);
    expect(texto).toContain('dor ao mastigar, inchaço na gengiva');
  });

  it('cai numa mensagem genérica quando nenhum sintoma foi marcado', () => {
    const texto = decodeURIComponent(whatsappLinkQuiz([]));
    expect(texto).toContain('Dr. Adzo');
    expect(texto).not.toContain('marquei:');
  });
});
