import { describe, it, expect } from 'vitest';
import { site } from '../../src/data/site';

const PROIBIDAS = [
  'melhor',
  'referência em',
  'nº 1',
  'promoção',
  'desconto',
  'R$',
  'garantimos',
];

function todoOTexto(): string {
  return JSON.stringify(site).toLowerCase();
}

describe('conteúdo do site', () => {
  it('declara a credencial exigida pelo CFO', () => {
    expect(site.cro).toBe('CRO-PE 15853');
  });

  it('não usa termos vedados pela publicidade odontológica', () => {
    const texto = todoOTexto();
    for (const termo of PROIBIDAS) {
      expect(texto).not.toContain(termo.toLowerCase());
    }
  });

  it('tem exatamente 5 sintomas no quiz', () => {
    expect(site.quiz.sintomas).toHaveLength(5);
  });

  it('o quiz avisa que não substitui avaliação clínica', () => {
    expect(site.quiz.aviso.toLowerCase()).toContain('não substitui');
  });

  it('todo tratamento tem nome e descrição preenchidos', () => {
    for (const t of site.tratamentos) {
      expect(t.nome.length).toBeGreaterThan(2);
      expect(t.descricao.length).toBeGreaterThan(20);
    }
  });

  it('todo item de FAQ tem pergunta e resposta', () => {
    expect(site.faq.length).toBeGreaterThanOrEqual(5);
    for (const f of site.faq) {
      expect(f.pergunta).toMatch(/\?$/);
      expect(f.resposta.length).toBeGreaterThan(30);
    }
  });

  it('marca explicitamente o conteúdo ainda pendente do cliente', () => {
    // Placeholders precisam ser detectáveis para não irem ao ar por engano
    expect(site.pendentes.length).toBeGreaterThan(0);
    for (const chave of site.pendentes) {
      expect(JSON.stringify(site)).toContain('[[PENDENTE]]');
      expect(typeof chave).toBe('string');
    }
  });
});
