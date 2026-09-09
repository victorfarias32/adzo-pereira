import { describe, it, expect } from 'vitest';
import { site, temConteudoPendente } from '../../src/data/site';

describe('temConteudoPendente', () => {
  it('detecta pendência no conteúdo real do site (estado atual)', () => {
    // O site de verdade ainda tem [[PENDENTE]] hoje — se este teste
    // começar a falhar, é sinal de que o conteúdo foi completado e a
    // suíte deve ser atualizada, não que o helper quebrou.
    expect(temConteudoPendente(site)).toBe(true);
  });

  it('acusa pendência em conteúdo arbitrário que contenha o marcador', () => {
    expect(temConteudoPendente({ campo: '[[PENDENTE]] algo qualquer' })).toBe(true);
    expect(
      temConteudoPendente({ a: { b: ['ok', '[[PENDENTE]] endereço'] } }),
    ).toBe(true);
  });

  it('não acusa pendência quando o marcador já foi substituído', () => {
    // Simula o estado "completo": os mesmos campos, mas com o [[PENDENTE]]
    // já trocado por conteúdo real. Sem isso, um teste que só observa o
    // estado pendente não provaria que o desligamento automático funciona.
    const siteCompleto = JSON.parse(
      JSON.stringify(site).replaceAll(/\[\[PENDENTE\]\][^"]*/g, 'Conteúdo definitivo'),
    );
    expect(temConteudoPendente(siteCompleto)).toBe(false);
  });

  it('não acusa pendência em conteúdo sem nenhum marcador', () => {
    expect(temConteudoPendente({ nome: 'Dr. Adzo Pereira', cro: 'CRO-PE 15853' })).toBe(false);
  });

  it('usa o site real como padrão quando chamado sem argumento', () => {
    expect(temConteudoPendente()).toBe(temConteudoPendente(site));
  });
});
