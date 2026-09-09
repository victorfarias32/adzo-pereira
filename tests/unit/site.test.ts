import { describe, it, expect } from 'vitest';
import { site } from '../../src/data/site';

const PROIBIDAS = [
  'melhor',
  'referência em',
  'nº 1',
  'promoção',
  'desconto',
  'garantimos',
];

const VALOR_MONETARIO = /R\$|\b\d{2,4}\s*(reais|conto)\b/i;

function todoOTexto(): string {
  return JSON.stringify(site).toLowerCase();
}

function resolver(caminho: string): unknown {
  return caminho.split('.').reduce<any>((atual, chave) => atual?.[chave], site);
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

  it('não divulga valores em dinheiro', () => {
    expect(JSON.stringify(site)).not.toMatch(VALOR_MONETARIO);
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

  it('todo caminho pendente resolve para um valor marcado', () => {
    expect(site.pendentes.length).toBeGreaterThan(0);
    for (const caminho of site.pendentes) {
      const valor = resolver(caminho);
      expect(typeof valor, `${caminho} não resolveu`).toBe('string');
      expect(String(valor), `${caminho} não está marcado`).toContain('[[PENDENTE]]');
    }
  });

  it('nenhum item externo é caminho do objeto', () => {
    for (const item of site.pendentesExternos) {
      expect(resolver(item)).toBeUndefined();
    }
  });

  it('todo marcador [[PENDENTE]] do conteúdo está registrado em site.pendentes', () => {
    // Garante que ninguém consegue adicionar um novo placeholder ao objeto
    // sem também listar o caminho em `pendentes` — se o número de
    // ocorrências do marcador divergir do tamanho da lista, ou sobrou um
    // marcador órfão (não registrado), ou sobrou um caminho registrado
    // que não resolve mais para um marcador.
    const ocorrencias = JSON.stringify(site).match(/\[\[PENDENTE\]\]/g) ?? [];
    expect(ocorrencias.length).toBe(site.pendentes.length);
  });
});
