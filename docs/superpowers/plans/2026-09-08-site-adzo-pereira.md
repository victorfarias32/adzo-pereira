# Site Dr. Adzo Pereira — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um site one-page em Astro que converte visitantes do Instagram do Dr. Adzo Pereira em conversas de WhatsApp, entregue em 3 direções visuais para o cliente escolher.

**Architecture:** Site estático gerado por Astro, sem framework no cliente. O conteúdo vive num único módulo TypeScript (`src/data/site.ts`) e as paletas em `src/data/palettes.ts`; ambos alimentam as três direções, que compartilham componentes e diferem por uma prop `variant` e por CSS custom properties emitidas no layout base. Toda a interatividade é vanilla JS em `<script>` de componente (acordeão, slider antes/depois, quiz, botão flutuante). Os links de WhatsApp são gerados por uma função pura testada com Vitest.

**Tech Stack:** Astro 7, TypeScript 7, Vitest 5, linkedom (asserções sobre o HTML gerado), `astro:assets`/sharp (otimização de imagem), `@astrojs/sitemap`, Vercel (deploy automático por push).

**Spec:** `docs/superpowers/specs/2026-09-08-site-adzo-pereira-design.md`

## Global Constraints

- **Idioma:** pt-BR em todo texto visível, `alt`, `aria-label` e `<html lang="pt-BR">`.
- **WhatsApp:** número `5581998742330`. Aparece **uma única vez no código**, em `src/lib/whatsapp.ts`. Nenhum outro arquivo pode conter esse literal.
- **Credencial obrigatória em todas as páginas:** `CRO-PE 15853`.
- **Todo link de WhatsApp:** `target="_blank"` + `rel="noopener"`.
- **Conformidade CFO (spec §7):** proibido no copy — tabela de preços, valores, promoção, desconto, superlativo comparativo ("melhor", "referência", "nº 1"), promessa de resultado. O quiz nunca diagnostica; exibe sempre o aviso de que é orientativo e não substitui avaliação clínica.
- **Fotos de antes/depois:** autorização confirmada; publicar sem identificação de paciente (sem rosto, nome ou data).
- **Acessibilidade:** contraste ≥ 4.5:1 em texto corrido, alvos de toque ≥ 44px, `prefers-reduced-motion` respeitado, navegação por teclado completa.
- **Performance:** zero JS de framework; JS próprio total < 5 KB minificado; Lighthouse mobile ≥ 95 nas 4 categorias; LCP < 2,0s em 4G.
- **Mobile-first:** todo layout desenhado a partir de 375px.
- **Seções:** as 3 direções têm exatamente as mesmas 12 seções, na mesma ordem (spec §3).
- **Commits:** mensagens em português, prefixo convencional (`feat:`, `test:`, `chore:`, `docs:`, `style:`).

---

### Task 1: Scaffold do projeto e repositório

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`
- Create: `src/pages/index.astro` (temporário, substituído na Task 9)
- Move: as 5 imagens da raiz para `src/assets/`

**Interfaces:**
- Consumes: nada (primeira task)
- Produces: `npm run dev`, `npm run build`, `npm test` funcionando; repositório `victorfarias32/adzo-pereira` no GitHub com `main` publicada

- [ ] **Step 1: Criar `package.json`**

```json
{
  "name": "adzo-pereira",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "description": "Site do Dr. Adzo Pereira — Endodontia, Recife",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:build": "astro build && vitest run --config vitest.build.config.ts"
  }
}
```

- [ ] **Step 2: Instalar dependências**

```bash
npm install astro@latest sharp@latest @astrojs/sitemap@latest
npm install -D vitest@latest linkedom@latest typescript@latest
```

- [ ] **Step 3: Criar `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://adzo-pereira.vercel.app',
  compressHTML: true,
  integrations: [sitemap()],
  build: { inlineStylesheets: 'always' },
});
```

Nota: `inlineStylesheets: 'always'` embute o CSS no HTML. Em um one-page pequeno isso elimina uma requisição bloqueante e ajuda o LCP — que é o objetivo de performance da spec.

- [ ] **Step 4: Criar `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 5: Criar `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 6: Renomear e mover as imagens**

```bash
mkdir -p src/assets
mv 621840863_18089678936106269_5144654277140589231_n.jpg src/assets/dr-adzo-retrato.jpg
mv 617358171_18005952107829734_1736701406381112696_n.jpg src/assets/caso-01-clareamento.jpg
mv 624845575_18031851506585638_4197389650479317594_n.jpg src/assets/caso-02-arcada.jpg
mv 628421086_18336742846246119_3507333546466718733_n.jpg src/assets/caso-03-frontal.jpg
mv 656167948_18439087624115472_6035587389079860864_n.jpg src/assets/consultorio-recepcao.jpg
```

- [ ] **Step 7: Criar `src/pages/index.astro` temporário**

```astro
---
---
<html lang="pt-BR">
  <head><meta charset="utf-8" /><title>Dr. Adzo Pereira</title></head>
  <body><p>Em construção.</p></body>
</html>
```

- [ ] **Step 8: Verificar que o build passa**

Run: `npm run build`
Expected: build conclui sem erro e cria `dist/index.html`.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: scaffold do projeto Astro e organização dos assets"
```

- [ ] **Step 10: Criar o repositório no GitHub e publicar**

```bash
gh repo create adzo-pereira --public --source=. --remote=origin \
  --description "Site do Dr. Adzo Pereira — Endodontia, Recife" --push
```

Expected: comando imprime a URL `https://github.com/victorfarias32/adzo-pereira`.

- [ ] **Step 11: Confirmar que a `main` subiu**

Run: `git ls-remote --heads origin main`
Expected: uma linha com o hash e `refs/heads/main`.

---

### Task 2: Conteúdo e gerador de links de WhatsApp

Esta é a task mais importante do plano. A regra de negócio central do site — cada CTA leva uma mensagem pré-preenchida diferente, para que o Dr. Adzo saiba de onde veio o lead — mora aqui, e é a única lógica pura o suficiente para teste unitário real.

**Files:**
- Create: `src/lib/whatsapp.ts`
- Create: `src/data/site.ts`
- Test: `tests/unit/whatsapp.test.ts`

**Interfaces:**
- Consumes: nada
- Produces:
  - `type CtaOrigin = 'header' | 'hero' | 'urgencia' | 'faq' | 'rodape' | 'flutuante'`
  - `whatsappLink(origin: CtaOrigin): string`
  - `whatsappLinkTratamento(nomeTratamento: string): string`
  - `whatsappLinkQuiz(sintomas: string[]): string`
  - `site` — objeto com todo o conteúdo (ver Step 7 para o shape exato)

- [ ] **Step 1: Escrever os testes que falham**

Create `tests/unit/whatsapp.test.ts`:

```ts
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
```

- [ ] **Step 2: Rodar os testes e confirmar que falham**

Run: `npm test`
Expected: FAIL — `Failed to resolve import "../../src/lib/whatsapp"`.

- [ ] **Step 3: Implementar `src/lib/whatsapp.ts`**

```ts
/**
 * Única fonte do número de WhatsApp do consultório.
 * Nenhum outro arquivo do projeto pode conter este literal.
 */
const NUMERO = '5581998742330';

export type CtaOrigin =
  | 'header'
  | 'hero'
  | 'urgencia'
  | 'faq'
  | 'rodape'
  | 'flutuante';

/**
 * Cada origem manda um texto diferente para que o Dr. Adzo identifique
 * de qual seção do site o paciente veio, sem depender de analytics.
 */
const MENSAGENS: Record<CtaOrigin, string> = {
  header: 'Olá, Dr. Adzo! Vim pelo site e gostaria de agendar uma avaliação.',
  flutuante: 'Olá, Dr. Adzo! Vim pelo site e gostaria de agendar uma avaliação.',
  hero: 'Olá, Dr. Adzo! Vim pelo site e quero marcar uma consulta.',
  urgencia:
    'Olá, Dr. Adzo! Estou com dor de dente e preciso de atendimento com urgência.',
  faq: 'Olá, Dr. Adzo! Vim pelo site e tenho uma dúvida.',
  rodape: 'Olá, Dr. Adzo! Vim pelo site e tenho uma dúvida.',
};

function montar(mensagem: string): string {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export function whatsappLink(origin: CtaOrigin): string {
  return montar(MENSAGENS[origin]);
}

export function whatsappLinkTratamento(nomeTratamento: string): string {
  return montar(
    `Olá, Dr. Adzo! Vim pelo site e quero saber sobre ${nomeTratamento}.`,
  );
}

export function whatsappLinkQuiz(sintomas: string[]): string {
  if (sintomas.length === 0) {
    return montar(
      'Olá, Dr. Adzo! Fiz o teste no site e gostaria de marcar uma avaliação.',
    );
  }
  return montar(
    `Olá, Dr. Adzo! Fiz o teste no site e marquei: ${sintomas.join(', ')}. Posso marcar uma avaliação?`,
  );
}
```

- [ ] **Step 4: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS — 8 testes.

- [ ] **Step 5: Commit**

```bash
git add src/lib/whatsapp.ts tests/unit/whatsapp.test.ts
git commit -m "feat: gerador de links de WhatsApp com mensagem por origem do CTA"
```

- [ ] **Step 6: Escrever o teste de conteúdo**

Create `tests/unit/site.test.ts`:

```ts
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
```

- [ ] **Step 7: Rodar, confirmar falha, e implementar `src/data/site.ts`**

Run: `npm test` → FAIL (módulo não existe). Então crie:

```ts
export interface Tratamento {
  id: string;
  nome: string;
  descricao: string;
  destaque: boolean;
}

export interface ItemFaq {
  pergunta: string;
  resposta: string;
}

export const site = {
  nome: 'Dr. Adzo Pereira',
  titulo: 'Cirurgião-Dentista · Especialista em Endodontia',
  cro: 'CRO-PE 15853',
  cidade: 'Recife — PE',
  instagram: 'https://www.instagram.com/adzopereira/',
  instagramHandle: '@adzopereira',

  hero: {
    titulo: 'Tratamento de canal sem dor, com quem é especialista.',
    subtitulo:
      'Atendimento em Recife com foco em endodontia. Avaliação cuidadosa, explicação clara do que você tem e do que vai ser feito — antes de começar.',
    ctaPrimario: 'Falar no WhatsApp',
    ctaSecundario: 'Ver tratamentos',
  },

  credenciais: [
    { rotulo: 'Especialista em Endodontia', icone: 'dente' },
    { rotulo: 'CRO-PE 15853', icone: 'selo' },
    { rotulo: 'Recife — PE', icone: 'local' },
    { rotulo: 'Atendimento de urgência', icone: 'relogio' },
  ],

  urgencia: {
    titulo: 'Está com dor agora?',
    texto:
      'Dor de dente não espera. Me mande uma mensagem descrevendo o que você está sentindo e eu retorno para encaixar seu atendimento.',
    cta: 'Chamar no WhatsApp agora',
  },

  tratamentos: [
    {
      id: 'canal',
      nome: 'Tratamento de Canal',
      descricao:
        'Remoção da polpa inflamada ou infectada, limpeza e selamento do canal. Feito sob anestesia, com radiografia em cada etapa para acompanhar o resultado.',
      destaque: true,
    },
    {
      id: 'retratamento',
      nome: 'Retratamento Endodôntico',
      descricao:
        'Para dentes que já passaram por canal e voltaram a incomodar. Reabertura, nova limpeza e novo selamento do sistema de canais.',
      destaque: false,
    },
    {
      id: 'urgencia',
      nome: 'Urgência e Dor de Dente',
      descricao:
        'Atendimento para quadros de dor aguda, abscesso ou trauma. O foco é aliviar a dor primeiro e planejar o tratamento em seguida.',
      destaque: false,
    },
    {
      id: 'clareamento',
      nome: 'Clareamento Dental',
      descricao:
        'Clareamento supervisionado, com avaliação prévia da sensibilidade e do tipo de mancha, em consultório ou com moldeira para uso em casa.',
      destaque: false,
    },
    {
      id: 'restauracao',
      nome: 'Restauração',
      descricao:
        'Devolve forma e função ao dente com resina, respeitando a cor e a anatomia original. Indicada após cárie, fratura ou desgaste.',
      destaque: false,
    },
  ] as Tratamento[],

  quiz: {
    titulo: 'Você pode estar precisando de um canal?',
    instrucao: 'Marque o que você está sentindo:',
    sintomas: [
      'Dor ao mastigar ou ao encostar no dente',
      'Sensibilidade ao quente ou frio que demora a passar',
      'Dor espontânea, principalmente à noite',
      'Escurecimento de um dente específico',
      'Inchaço ou uma bolinha na gengiva',
    ],
    aviso:
      'Este teste é apenas orientativo e não substitui avaliação clínica. Só um exame com radiografia pode indicar o tratamento adequado.',
    cta: 'Enviar meus sintomas no WhatsApp',
  },

  resultados: {
    titulo: 'Casos atendidos',
    legenda:
      'Registros clínicos de pacientes atendidos no consultório, publicados com autorização e sem identificação. Cada caso é individual e o resultado varia conforme a condição de cada pessoa.',
    casos: [
      { arquivo: 'caso-01-clareamento.jpg', alt: 'Registro clínico de sorriso antes e depois do tratamento' },
      { arquivo: 'caso-02-arcada.jpg', alt: 'Registro clínico da arcada antes e depois do tratamento' },
      { arquivo: 'caso-03-frontal.jpg', alt: 'Registro clínico frontal dos dentes antes e depois do tratamento' },
    ],
  },

  sobre: {
    titulo: 'Quem vai te atender',
    texto:
      'Sou o Adzo, cirurgião-dentista com especialização em endodontia, e atendo em Recife. Trabalho com um princípio simples: você entende o que está acontecendo com o seu dente antes de qualquer coisa ser feita. Explico o diagnóstico, mostro a radiografia e só então falamos sobre tratamento.',
    formacao: '[[PENDENTE]] formação e ano de conclusão',
    alt: 'Dr. Adzo Pereira no consultório, de jaleco',
  },

  primeiraConsulta: {
    titulo: 'Como é a sua primeira consulta',
    passos: [
      {
        numero: '01',
        titulo: 'Você manda uma mensagem',
        texto:
          'Descreve o que está sentindo pelo WhatsApp. Eu retorno com um horário disponível.',
      },
      {
        numero: '02',
        titulo: 'Avaliação com radiografia',
        texto:
          'No consultório eu examino, faço a radiografia e te mostro exatamente qual é a situação do dente.',
      },
      {
        numero: '03',
        titulo: 'Plano fechado antes de começar',
        texto:
          'Você sabe quantas sessões serão necessárias e qual o investimento antes de qualquer procedimento começar. Sem surpresa.',
      },
    ],
  },

  faq: [
    {
      pergunta: 'Tratamento de canal dói?',
      resposta:
        'O procedimento é feito sob anestesia local, então durante o tratamento você não sente dor. O que dói é o dente inflamado antes do tratamento — o canal é justamente o que resolve isso. Algum incômodo nos primeiros dias depois é normal e controlado com medicação.',
    },
    {
      pergunta: 'Quantas sessões são necessárias?',
      resposta:
        'Depende do dente e do quadro. Muitos casos são resolvidos em sessão única; outros, principalmente retratamentos ou dentes com infecção, pedem duas ou três. Isso é definido e combinado com você na avaliação, antes de começar.',
    },
    {
      pergunta: 'Quanto custa um tratamento de canal?',
      resposta:
        'O valor depende de qual dente é e da complexidade do caso, então não existe preço único. Na avaliação eu fecho o valor com você antes de iniciar qualquer procedimento — você não começa sem saber.',
    },
    {
      pergunta: 'Vocês atendem convênio?',
      resposta: '[[PENDENTE]] confirmar convênios atendidos com o Dr. Adzo.',
    },
    {
      pergunta: 'Estou com muita dor hoje. Consigo ser atendido?',
      resposta:
        'Casos de dor aguda têm prioridade de encaixe. Me chame no WhatsApp descrevendo o que está sentindo que eu vejo a primeira janela possível na agenda.',
    },
    {
      pergunta: 'Preciso levar alguma coisa na primeira consulta?',
      resposta:
        'Documento com foto e, se você tiver, radiografias ou laudos de tratamentos anteriores no mesmo dente. Se não tiver, sem problema — a radiografia é feita no consultório.',
    },
  ] as ItemFaq[],

  localizacao: {
    titulo: 'Onde fica o consultório',
    endereco: '[[PENDENTE]] endereço completo',
    horarios: '[[PENDENTE]] horários de atendimento',
    mapaEmbed: '[[PENDENTE]] URL de embed do Google Maps',
    alt: 'Recepção do consultório do Dr. Adzo Pereira',
  },

  /** Chaves que ainda dependem de informação do cliente (spec §8). */
  pendentes: [
    'sobre.formacao',
    'faq[3].resposta',
    'localizacao.endereco',
    'localizacao.horarios',
    'localizacao.mapaEmbed',
    'depoimentos',
    'logo em vetor',
  ],
};
```

- [ ] **Step 8: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS — todos os testes de `whatsapp` e `site`.

Se o teste de termos vedados falhar, o culpado provavelmente é a palavra "melhor" em algum texto. Reescreva a frase; não relaxe o teste.

- [ ] **Step 9: Commit**

```bash
git add src/data/site.ts tests/unit/site.test.ts
git commit -m "feat: conteúdo do site com guarda de conformidade CFO"
```

---

### Task 3: Paletas das 3 direções com teste de contraste

**Files:**
- Create: `src/data/palettes.ts`
- Create: `src/lib/contrast.ts`
- Test: `tests/unit/contrast.test.ts`

**Interfaces:**
- Consumes: nada
- Produces:
  - `relativeLuminance(hex: string): number`
  - `contrastRatio(hexA: string, hexB: string): number`
  - `type Variant = 'a' | 'b' | 'c'`
  - `palettes: Record<Variant, Palette>` onde `Palette` tem `nome`, `descricao`, `tokens: Record<string, string>` e `paresDeTexto: Array<[string, string]>` (nomes de token: primeiro plano, fundo)

- [ ] **Step 1: Escrever o teste que falha**

Create `tests/unit/contrast.test.ts`:

```ts
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
```

- [ ] **Step 2: Rodar e confirmar falha**

Run: `npm test`
Expected: FAIL — módulos `contrast` e `palettes` não existem.

- [ ] **Step 3: Implementar `src/lib/contrast.ts`**

Fórmula WCAG 2.1 de luminância relativa e razão de contraste.

```ts
function canalLinear(valor255: number): number {
  const s = valor255 / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const limpo = hex.replace('#', '');
  if (limpo.length !== 6) {
    throw new Error(`hex inválido: ${hex}`);
  }
  const r = canalLinear(parseInt(limpo.slice(0, 2), 16));
  const g = canalLinear(parseInt(limpo.slice(2, 4), 16));
  const b = canalLinear(parseInt(limpo.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(hexA: string, hexB: string): number {
  const la = relativeLuminance(hexA);
  const lb = relativeLuminance(hexB);
  const claro = Math.max(la, lb);
  const escuro = Math.min(la, lb);
  return (claro + 0.05) / (escuro + 0.05);
}
```

- [ ] **Step 4: Implementar `src/data/palettes.ts`**

Os valores abaixo já foram verificados contra a fórmula WCAG. `terracotta` da direção C é **decorativo** e por isso não aparece em `paresDeTexto`; para texto existe `terracottaTexto`, mais escuro. Se você alterar qualquer hex, o teste da Step 5 é quem decide se a alteração é válida.

```ts
export type Variant = 'a' | 'b' | 'c';

export interface Palette {
  nome: string;
  descricao: string;
  referencias: string[];
  tokens: Record<string, string>;
  fontes: { titulo: string; corpo: string };
  /** [token de primeiro plano, token de fundo] — validados em AA pelo teste. */
  paresDeTexto: Array<[string, string]>;
}

export const palettes: Record<Variant, Palette> = {
  a: {
    nome: 'Clínico Sereno',
    descricao:
      'Azul-petróleo da marca sobre off-white quente, muito respiro e movimento discreto. Transmite consultório calmo e cuidadoso.',
    referencias: ['Zen Dental Studio', 'Tend', 'Atlanta Center for Advanced Periodontics'],
    tokens: {
      ink: '#12303F',
      muted: '#5C6B73',
      primary: '#1B5A7A',
      primaryDeep: '#12404F',
      onPrimary: '#FFFFFF',
      surface: '#FBF9F6',
      surfaceAlt: '#F0E9DF',
      accent: '#C9A227',
      line: '#DED5C8',
    },
    fontes: { titulo: 'Fraunces', corpo: 'Inter' },
    paresDeTexto: [
      ['ink', 'surface'],
      ['ink', 'surfaceAlt'],
      ['muted', 'surface'],
      ['primary', 'surface'],
      ['onPrimary', 'primary'],
      ['onPrimary', 'primaryDeep'],
    ],
  },

  b: {
    nome: 'Editorial Autoridade',
    descricao:
      'Azul-noite alternando com creme, tipografia display e grid assimétrico. Posiciona o Dr. Adzo como especialista de alto nível.',
    referencias: ['Grand Street Dental', 'Vivid Specialized Dentistry'],
    tokens: {
      ink: '#F2EDE4',
      inkDark: '#0B1F2A',
      muted: '#9FB3BD',
      mutedDark: '#3F5460',
      primary: '#4E9BB8',
      onPrimary: '#0B1F2A',
      surface: '#0B1F2A',
      surfaceAlt: '#F2EDE4',
      accent: '#C4A46A',
      line: '#1D3A49',
    },
    fontes: { titulo: 'Playfair Display', corpo: 'Inter' },
    paresDeTexto: [
      ['ink', 'surface'],
      ['muted', 'surface'],
      ['primary', 'surface'],
      ['accent', 'surface'],
      ['inkDark', 'surfaceAlt'],
      ['mutedDark', 'surfaceAlt'],
      ['onPrimary', 'primary'],
    ],
  },

  c: {
    nome: 'Acolhimento Humano',
    descricao:
      'Puxa as cores reais da recepção do consultório — cinza-azulado, madeira e terracota. Formas arredondadas e conteúdo tranquilizador em primeiro plano.',
    referencias: ['Madison Park Family Dentistry', 'Thrive Family Dental', 'Heritage House Dental'],
    tokens: {
      ink: '#2B3A42',
      muted: '#5A6870',
      primary: '#1B5A7A',
      onPrimary: '#FFFFFF',
      surface: '#FAF7F2',
      surfaceAlt: '#E7EBEE',
      wood: '#C89B6A',
      terracotta: '#B5643C',
      terracottaTexto: '#9E4F2C',
      line: '#D9DFE3',
    },
    fontes: { titulo: 'Bricolage Grotesque', corpo: 'Inter' },
    paresDeTexto: [
      ['ink', 'surface'],
      ['ink', 'surfaceAlt'],
      ['muted', 'surface'],
      ['primary', 'surface'],
      ['terracottaTexto', 'surface'],
      ['onPrimary', 'primary'],
    ],
  },
};
```

**Desvio consciente da spec §6:** a spec previa três arquivos `src/styles/tokens-{a,b,c}.css`. O plano usa `src/data/palettes.ts` porque CSS não é testável nem importável pela apresentação da Task 11. Com as paletas em TypeScript, o mesmo objeto alimenta (1) as custom properties emitidas pelo layout, (2) o teste automático de contraste e (3) as amostras de cor da apresentação — uma fonte só. O resultado no navegador é idêntico.

- [ ] **Step 5: Rodar os testes e confirmar que passam**

Run: `npm test`
Expected: PASS. Se algum par falhar, a mensagem de erro traz o nome dos tokens e a razão obtida — escureça o primeiro plano ou clareie o fundo até passar. Não afrouxe o limite de 4.5.

- [ ] **Step 6: Commit**

```bash
git add src/lib/contrast.ts src/data/palettes.ts tests/unit/contrast.test.ts
git commit -m "feat: paletas das 3 direções com validação automática de contraste AA"
```

---

### Task 4: Layout base, tokens em CSS e SEO

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `src/styles/global.css`
- Create: `src/components/SchemaDentist.astro`
- Create: `vitest.build.config.ts`
- Test: `tests/build/seo.test.ts`

**Interfaces:**
- Consumes: `palettes`, `Variant` (Task 3); `site` (Task 2)
- Produces: `Base.astro` com props `{ variant: Variant; titulo: string; descricao: string }`, que emite as CSS custom properties `--c-<token>` no `:root` e o `<head>` completo

- [ ] **Step 1: Criar `src/styles/global.css`**

```css
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; }
html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }
body {
  font-family: var(--f-corpo), system-ui, -apple-system, sans-serif;
  background: var(--c-surface);
  color: var(--c-ink);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3 { font-family: var(--f-titulo), Georgia, serif; line-height: 1.15; text-wrap: balance; }
p { text-wrap: pretty; max-width: 65ch; }
img, picture, svg { display: block; max-width: 100%; height: auto; }
a { color: inherit; }
button { font: inherit; }

/* Alvo de toque mínimo exigido pela spec */
a[href], button { min-height: 44px; }

:focus-visible { outline: 3px solid var(--c-primary); outline-offset: 3px; }

.container { width: min(100% - 2.5rem, 1140px); margin-inline: auto; }
.secao { padding-block: clamp(3.5rem, 9vw, 7rem); }
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0;
  margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Criar `src/components/SchemaDentist.astro`**

```astro
---
import { site } from '../data/site';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: site.nome,
  description: `${site.titulo}. ${site.cro}.`,
  medicalSpecialty: 'Endodontic',
  telephone: '+55 81 99874-2330',
  areaServed: 'Recife, PE, Brasil',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Recife',
    addressRegion: 'PE',
    addressCountry: 'BR',
  },
  sameAs: [site.instagram],
};
---
<script type="application/ld+json" set:html={JSON.stringify(schema)} is:inline />
```

Nota: quando o endereço real chegar (spec §8), acrescente `streetAddress` e `postalCode` a `address`, e `openingHours`.

- [ ] **Step 3: Criar `src/layouts/Base.astro`**

```astro
---
import { palettes, type Variant } from '../data/palettes';
import SchemaDentist from '../components/SchemaDentist.astro';
import '../styles/global.css';

interface Props {
  variant: Variant;
  titulo: string;
  descricao: string;
}

const { variant, titulo, descricao } = Astro.props;
const p = palettes[variant];

const vars = Object.entries(p.tokens)
  .map(([nome, valor]) => `--c-${nome}: ${valor};`)
  .join('\n    ');

const canonical = new URL(Astro.url.pathname, Astro.site).href;
const ogImage = new URL('/og-image.jpg', Astro.site).href;

const fontesGoogle = [p.fontes.titulo, p.fontes.corpo]
  .map((f) => `family=${f.replace(/ /g, '+')}:wght@400;500;600;700`)
  .join('&');
---
<!doctype html>
<html lang="pt-BR" data-variant={variant}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{titulo}</title>
    <meta name="description" content={descricao} />
    <link rel="canonical" href={canonical} />

    <meta property="og:type" content="website" />
    <meta property="og:locale" content="pt_BR" />
    <meta property="og:title" content={titulo} />
    <meta property="og:description" content={descricao} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?${fontesGoogle}&display=swap`} />

    <style is:inline set:html={`:root {
    ${vars}
    --f-titulo: '${p.fontes.titulo}';
    --f-corpo: '${p.fontes.corpo}';
  }`} />

    <SchemaDentist />
  </head>
  <body>
    <a href="#conteudo" class="sr-only">Pular para o conteúdo</a>
    <slot />
  </body>
</html>
```

Nota de performance: fontes do Google CDN custam uma conexão externa. Na Task 10, se o Lighthouse mobile ficar abaixo de 95, troque por fontes auto-hospedadas em `public/fonts/` com `@font-face` e `font-display: swap`. A spec exige o número, não o CDN.

- [ ] **Step 4: Criar `vitest.build.config.ts`**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/build/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 5: Escrever o teste de build**

Create `tests/build/seo.test.ts`:

```ts
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
```

- [ ] **Step 6: Rodar e confirmar falha**

Run: `npm run test:build`
Expected: FAIL — `ENOENT: dist/prototipo/a/index.html`. As páginas só existem na Task 9. **Isso é esperado.** Anote e siga; este teste passa a valer a partir da Task 9.

- [ ] **Step 7: Criar o esqueleto de página e as três rotas**

Isto existe para o site **renderizar desde já**. Cada task seguinte pluga a sua seção aqui e o resultado aparece no ar no push seguinte, em vez de tudo surgir de uma vez no fim.

`src/components/Pagina.astro` — por enquanto só a casca. As Tasks 5 a 8 acrescentam imports e usos, nesta ordem exata:

```astro
---
import type { Variant } from '../data/palettes';

interface Props { variant: Variant }
const { variant } = Astro.props;
---
<main id="conteudo">
  <!-- Task 5: Header, Hero, Credenciais, Urgencia -->
  <!-- Task 6: Tratamentos, Quiz -->
  <!-- Task 7: Resultados, Sobre, PrimeiraConsulta -->
  <!-- Task 8: Faq, Localizacao, Rodape, WhatsFlutuante -->
  <p style="padding:4rem 1.5rem;text-align:center;color:var(--c-muted)">
    Direção <strong>{variant.toUpperCase()}</strong> — seções em construção.
  </p>
</main>
```

`src/pages/prototipo/a.astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import Pagina from '../../components/Pagina.astro';
---
<Base
  variant="c"
  titulo="Dr. Adzo Pereira — Endodontista em Recife | Tratamento de Canal"
  descricao="Especialista em endodontia em Recife. Tratamento de canal, retratamento e atendimento de urgência para dor de dente. CRO-PE 15853. Agende pelo WhatsApp."
>
  <Pagina variant="c" />
</Base>
```

`src/pages/prototipo/b.astro` — o mesmo arquivo com `variant="b"` nos dois lugares (o atributo do `<Base>` e o do `<Pagina>`). `src/pages/prototipo/c.astro` — idem com `variant="c"`.

Substitua também `src/pages/index.astro`, que hoje é a página temporária "Em construção" da Task 1, pelo índice das três direções. O código completo dele está na Task 9, Step 3 — copie-o de lá.

- [ ] **Step 8: Verificar que as quatro rotas sobem**

Run: `npm run build`
Expected: 4 páginas construídas (`/`, `/prototipo/a`, `/prototipo/b`, `/prototipo/c`). Abra cada uma com `npm run preview` e confirme que as três direções já se distinguem por cor e tipografia, mesmo sem conteúdo.

- [ ] **Step 7: Commit**

```bash
git add src/layouts src/styles src/components vitest.build.config.ts tests/build src/pages
git commit -m "feat: layout base, tokens por direção, SEO e as três rotas de protótipo"
```

---

### Task 5: Header, Hero, Credenciais e Urgência

**Files:**
- Create: `src/components/Header.astro`, `src/components/Hero.astro`, `src/components/Credenciais.astro`, `src/components/Urgencia.astro`
- Create: `src/components/BotaoWhats.astro`

**Interfaces:**
- Consumes: `whatsappLink` (Task 2), `site` (Task 2), `Variant` (Task 3)
- Produces: componentes que aceitam `{ variant: Variant }`; `BotaoWhats` aceita `{ href: string; children; tom?: 'primario' | 'claro' }`

- [ ] **Step 1: Criar `src/components/BotaoWhats.astro`**

Centraliza o `target`/`rel` exigidos pela spec, para não repetir em 12 lugares.

```astro
---
interface Props { href: string; tom?: 'primario' | 'claro'; largo?: boolean }
const { href, tom = 'primario', largo = false } = Astro.props;
---
<a href={href} target="_blank" rel="noopener" class:list={['btn', tom, { largo }]}>
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/>
  </svg>
  <slot />
</a>

<style>
  .btn {
    display: inline-flex; align-items: center; gap: .6rem;
    padding: .95rem 1.6rem; border-radius: 999px;
    font-weight: 600; text-decoration: none; letter-spacing: .01em;
    transition: transform .18s ease, box-shadow .18s ease, background-color .18s ease;
  }
  .primario { background: var(--c-primary); color: var(--c-onPrimary); }
  .claro { background: var(--c-surface); color: var(--c-primary); }
  .largo { width: 100%; justify-content: center; }
  .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgb(0 0 0 / .16); }
</style>
```

- [ ] **Step 2: Criar `src/components/Header.astro`**

```astro
---
import { site } from '../data/site';
import { whatsappLink } from '../lib/whatsapp';
---
<header id="topo">
  <div class="container barra">
    <div class="marca">
      <strong>{site.nome}</strong>
      <span>{site.cro} · {site.cidade}</span>
    </div>
    <a href={whatsappLink('header')} target="_blank" rel="noopener" class="cta">
      Agendar avaliação
    </a>
  </div>
</header>

<style>
  header {
    position: sticky; top: 0; z-index: 50;
    background: color-mix(in srgb, var(--c-surface) 88%, transparent);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--c-line);
  }
  .barra { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-block: .7rem; }
  .marca { display: flex; flex-direction: column; line-height: 1.25; }
  .marca strong { font-family: var(--f-titulo); font-size: 1.05rem; }
  .marca span { font-size: .72rem; color: var(--c-muted); letter-spacing: .06em; text-transform: uppercase; }
  .cta {
    display: inline-flex; align-items: center;
    padding: .6rem 1.1rem; border-radius: 999px;
    background: var(--c-primary); color: var(--c-onPrimary);
    font-size: .9rem; font-weight: 600; text-decoration: none; white-space: nowrap;
  }
  @media (max-width: 480px) { .cta { font-size: .82rem; padding: .55rem .9rem; } }
</style>
```

- [ ] **Step 3: Criar `src/components/Hero.astro`**

A prop `variant` muda o layout: A usa duas colunas com retrato à direita; B usa imagem full-bleed com texto sobreposto; C usa retrato circular com bloco de texto abaixo no mobile.

```astro
---
import { Image } from 'astro:assets';
import retrato from '../assets/dr-adzo-retrato.jpg';
import { site } from '../data/site';
import { whatsappLink } from '../lib/whatsapp';
import BotaoWhats from './BotaoWhats.astro';
import type { Variant } from '../data/palettes';

interface Props { variant: Variant }
const { variant } = Astro.props;
---
<section id="inicio" class:list={['hero', `v-${variant}`]}>
  <div class="container grade">
    <div class="texto">
      <p class="olho">{site.titulo}</p>
      <h1>{site.hero.titulo}</h1>
      <p class="sub">{site.hero.subtitulo}</p>
      <div class="acoes">
        <BotaoWhats href={whatsappLink('hero')}>{site.hero.ctaPrimario}</BotaoWhats>
        <a href="#tratamentos" class="link">{site.hero.ctaSecundario}</a>
      </div>
    </div>
    <div class="foto">
      <Image src={retrato} alt={site.sobre.alt} widths={[420, 720, 1040]}
             sizes="(max-width: 860px) 90vw, 440px" loading="eager" fetchpriority="high" />
    </div>
  </div>
</section>

<style>
  .hero { padding-block: clamp(2.5rem, 7vw, 5.5rem); background: var(--c-surface); }
  .grade { display: grid; gap: clamp(2rem, 5vw, 3.5rem); align-items: center; }
  @media (min-width: 861px) { .grade { grid-template-columns: 1.05fr .95fr; } }
  .olho { font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--c-muted); margin-bottom: 1rem; }
  h1 { font-size: clamp(2.1rem, 6vw, 3.6rem); margin-bottom: 1.1rem; }
  .sub { font-size: clamp(1rem, 2.2vw, 1.13rem); color: var(--c-muted); margin-bottom: 2rem; }
  .acoes { display: flex; flex-wrap: wrap; align-items: center; gap: 1.4rem; }
  .link { font-weight: 600; color: var(--c-primary); text-underline-offset: 5px; }
  .foto img { border-radius: 1.25rem; object-fit: cover; width: 100%; }

  /* B: retrato full-bleed, mais dramático */
  .v-b .foto img { border-radius: 0; aspect-ratio: 3 / 4; }
  .v-b h1 { font-size: clamp(2.4rem, 7vw, 4.2rem); }
  /* C: retrato arredondado, mais acolhedor */
  .v-c .foto img { border-radius: 2.5rem; }
</style>
```

- [ ] **Step 4: Criar `src/components/Credenciais.astro`**

```astro
---
import { site } from '../data/site';
---
<section id="credenciais" class="faixa">
  <ul class="container lista">
    {site.credenciais.map((c) => (
      <li>
        <span class="ponto" aria-hidden="true"></span>
        {c.rotulo}
      </li>
    ))}
  </ul>
</section>

<style>
  .faixa { background: var(--c-surfaceAlt); border-block: 1px solid var(--c-line); }
  .lista {
    display: flex; flex-wrap: wrap; justify-content: center;
    gap: 1rem clamp(1.5rem, 5vw, 3.5rem); list-style: none; padding: 1.15rem 0;
  }
  .lista li {
    display: flex; align-items: center; gap: .55rem;
    font-size: .82rem; font-weight: 600; letter-spacing: .05em;
    text-transform: uppercase; color: var(--c-ink);
  }
  .ponto { width: 7px; height: 7px; border-radius: 50%; background: var(--c-primary); flex: none; }
</style>
```

- [ ] **Step 5: Criar `src/components/Urgencia.astro`**

Única seção da página onde a hierarquia grita — é o maior conversor em endodontia.

```astro
---
import { site } from '../data/site';
import { whatsappLink } from '../lib/whatsapp';
import BotaoWhats from './BotaoWhats.astro';
---
<section id="urgencia" class="urg secao">
  <div class="container caixa">
    <div>
      <h2>{site.urgencia.titulo}</h2>
      <p>{site.urgencia.texto}</p>
    </div>
    <BotaoWhats href={whatsappLink('urgencia')} tom="claro">
      {site.urgencia.cta}
    </BotaoWhats>
  </div>
</section>

<style>
  .urg { background: var(--c-primary); color: var(--c-onPrimary); }
  .caixa { display: grid; gap: 2rem; align-items: center; }
  @media (min-width: 800px) { .caixa { grid-template-columns: 1fr auto; gap: 3rem; } }
  h2 { font-size: clamp(1.8rem, 4.5vw, 2.6rem); margin-bottom: .7rem; }
  p { color: inherit; opacity: .92; }
</style>
```

- [ ] **Step 6: Verificar visualmente**

```bash
npm run dev
```

Crie um `src/pages/teste.astro` provisório que renderize `Base` com `variant="a"` e os quatro componentes; abra `http://localhost:4321/teste` e confira que o layout responde em 375px sem scroll horizontal. Apague o arquivo depois.

- [ ] **Step 6b: Plugar as seções em `Pagina.astro`**

Substitua o comentário `<!-- Task 5: ... -->` pelos componentes, e mova o `<Header />` para **fora** do `<main>`, logo antes dele:

```astro
---
import Header from './Header.astro';
import Hero from './Hero.astro';
import Credenciais from './Credenciais.astro';
import Urgencia from './Urgencia.astro';
import type { Variant } from '../data/palettes';

interface Props { variant: Variant }
const { variant } = Astro.props;
---
<Header />
<main id="conteudo">
  <Hero variant={variant} />
  <Credenciais />
  <Urgencia />
  <!-- Task 6: Tratamentos, Quiz -->
  <!-- Task 7: Resultados, Sobre, PrimeiraConsulta -->
  <!-- Task 8: Faq, Localizacao, Rodape, WhatsFlutuante -->
</main>
```

Apague o parágrafo "seções em construção". Rode `npm run build` e confirme as 4 páginas.

- [ ] **Step 7: Commit**

```bash
git add src/components
git commit -m "feat: header, hero, faixa de credenciais e bloco de urgência"
```

---

### Task 6: Tratamentos e quiz interativo

**Files:**
- Create: `src/components/Tratamentos.astro`, `src/components/Quiz.astro`

**Interfaces:**
- Consumes: `site.tratamentos`, `site.quiz`, `whatsappLinkTratamento`, `whatsappLinkQuiz`
- Produces: `Tratamentos.astro` com prop `{ variant: Variant }`; `Quiz.astro` **sem props**

**Regra de prop `variant`:** só recebe `variant` o componente que tem CSS por direção. O Quiz usa apenas tokens, então não recebe. Não adicione a prop "por simetria" — prop não usada é ruído que o revisor vai marcar.

- [ ] **Step 1: Criar `src/components/Tratamentos.astro`**

```astro
---
import { site } from '../data/site';
import { whatsappLinkTratamento } from '../lib/whatsapp';
import type { Variant } from '../data/palettes';

interface Props { variant: Variant }
const { variant } = Astro.props;
---
<section id="tratamentos" class:list={['secao', `v-${variant}`]}>
  <div class="container">
    <p class="olho">O que eu faço</p>
    <h2>Tratamentos</h2>
    <div class="grade">
      {site.tratamentos.map((t) => (
        <article class:list={['card', { destaque: t.destaque }]}>
          <h3>{t.nome}</h3>
          <p>{t.descricao}</p>
          <a href={whatsappLinkTratamento(t.nome)} target="_blank" rel="noopener">
            Falar sobre {t.nome.toLowerCase()}
            <span aria-hidden="true">→</span>
          </a>
        </article>
      ))}
    </div>
  </div>
</section>

<style>
  .olho { font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--c-muted); }
  h2 { font-size: clamp(1.9rem, 5vw, 2.9rem); margin: .5rem 0 2.5rem; }
  .grade { display: grid; gap: 1.25rem; grid-template-columns: repeat(auto-fit, minmax(min(100%, 290px), 1fr)); }
  .card {
    display: flex; flex-direction: column; gap: .8rem;
    padding: 1.9rem; border: 1px solid var(--c-line); border-radius: 1.1rem;
    background: var(--c-surface); transition: border-color .2s ease, transform .2s ease;
  }
  .card:hover { border-color: var(--c-primary); transform: translateY(-3px); }
  .card h3 { font-size: 1.3rem; }
  .card p { color: var(--c-muted); font-size: .95rem; flex: 1; }
  .card a {
    display: inline-flex; align-items: center; gap: .4rem;
    color: var(--c-primary); font-weight: 600; font-size: .92rem; text-decoration: none;
  }
  .card a:hover { text-decoration: underline; text-underline-offset: 4px; }
  .destaque { grid-column: span 1; border-color: var(--c-primary); border-width: 2px; }
  @media (min-width: 900px) { .destaque { grid-column: span 2; } }
  .v-c .card { border-radius: 1.75rem; }
  .v-b .card { border-radius: 0; }
</style>
```

- [ ] **Step 2: Criar `src/components/Quiz.astro`**

O JS monta o link no clique, lendo os checkboxes marcados. Sem estado, sem armazenamento, sem envio de dados a lugar nenhum.

```astro
---
import { site } from '../data/site';
import { whatsappLinkQuiz } from '../lib/whatsapp';

// Link de fallback caso o JS não execute: leva ao WhatsApp sem sintomas.
const fallback = whatsappLinkQuiz([]);
---
<section id="quiz" class="secao quiz">
  <div class="container caixa">
    <h2>{site.quiz.titulo}</h2>
    <p class="instrucao">{site.quiz.instrucao}</p>

    <fieldset id="quiz-campos">
      <legend class="sr-only">{site.quiz.instrucao}</legend>
      {site.quiz.sintomas.map((s, i) => (
        <label class="opcao">
          <input type="checkbox" value={s} id={`sintoma-${i}`} />
          <span>{s}</span>
        </label>
      ))}
    </fieldset>

    <p class="aviso" role="note">{site.quiz.aviso}</p>

    <a id="quiz-cta" href={fallback} target="_blank" rel="noopener" class="btn">
      {site.quiz.cta}
    </a>
  </div>
</section>

<script>
  import { whatsappLinkQuiz } from '../lib/whatsapp';

  const campos = document.getElementById('quiz-campos');
  const cta = document.getElementById('quiz-cta') as HTMLAnchorElement | null;

  if (campos && cta) {
    const atualizar = () => {
      const marcados = Array.from(
        campos.querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked'),
      ).map((el) => el.value);
      cta.href = whatsappLinkQuiz(marcados);
    };
    campos.addEventListener('change', atualizar);
  }
</script>

<style>
  .quiz { background: var(--c-surfaceAlt); }
  .caixa { max-width: 680px; }
  h2 { font-size: clamp(1.7rem, 4.5vw, 2.4rem); margin-bottom: .6rem; }
  .instrucao { color: var(--c-muted); margin-bottom: 1.6rem; }
  fieldset { border: 0; padding: 0; display: grid; gap: .7rem; margin-bottom: 1.5rem; }
  .opcao {
    display: flex; align-items: flex-start; gap: .85rem;
    padding: .95rem 1.15rem; min-height: 44px;
    background: var(--c-surface); border: 1px solid var(--c-line);
    border-radius: .8rem; cursor: pointer; transition: border-color .18s ease;
  }
  .opcao:hover, .opcao:focus-within { border-color: var(--c-primary); }
  .opcao input { width: 20px; height: 20px; margin-top: .18rem; accent-color: var(--c-primary); flex: none; }
  .aviso { font-size: .84rem; color: var(--c-muted); font-style: italic; margin-bottom: 1.6rem; }
  .btn {
    display: inline-flex; align-items: center; justify-content: center;
    padding: .95rem 1.6rem; border-radius: 999px;
    background: var(--c-primary); color: var(--c-onPrimary);
    font-weight: 600; text-decoration: none;
  }
</style>
```

- [ ] **Step 3: Verificar o comportamento do quiz no navegador**

Run: `npm run dev`, abra a página de teste, marque dois sintomas, inspecione o `href` de `#quiz-cta`.
Expected: contém `marquei%3A` seguido dos dois sintomas codificados. Desmarque tudo → volta para a mensagem genérica, sem `marquei`.

- [ ] **Step 3b: Plugar em `Pagina.astro`**

Acrescente os imports e substitua o comentário `<!-- Task 6: ... -->` por:

```astro
  <Tratamentos variant={variant} />
  <Quiz />
```

Rode `npm run build` e confirme as 4 páginas.

- [ ] **Step 4: Commit**

```bash
git add src/components/Tratamentos.astro src/components/Quiz.astro
git commit -m "feat: seção de tratamentos e quiz de sintomas com CTA dinâmico"
```

---

### Task 7: Resultados com slider, Sobre e Primeira Consulta

**Files:**
- Create: `src/components/Resultados.astro`, `src/components/Sobre.astro`, `src/components/PrimeiraConsulta.astro`

**Interfaces:**
- Consumes: `site.resultados`, `site.sobre`, `site.primeiraConsulta`; imagens em `src/assets/`
- Produces: `Resultados.astro` com prop `{ variant: Variant }` (tem CSS por direção); `Sobre.astro` e `PrimeiraConsulta.astro` **sem props**

- [ ] **Step 1: Criar `src/components/Resultados.astro`**

As três fotos já são imagens compostas (antes em cima, depois embaixo), então **não** cabe slider de divisória. O tratamento correto é um carrossel com scroll-snap e legenda clínica — mais honesto com o material disponível e sem JS.

```astro
---
import { Image } from 'astro:assets';
import { site } from '../data/site';
import type { Variant } from '../data/palettes';

interface Props { variant: Variant }
const { variant } = Astro.props;

const imagens = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/caso-*.jpg',
  { eager: true },
);
const casos = site.resultados.casos.map((c) => ({
  ...c,
  src: imagens[`../assets/${c.arquivo}`].default,
}));
---
<section id="resultados" class:list={['secao', `v-${variant}`]}>
  <div class="container">
    <p class="olho">Prova de trabalho</p>
    <h2>{site.resultados.titulo}</h2>
    <div class="trilho" role="region" aria-label="Galeria de casos clínicos" tabindex="0">
      {casos.map((c) => (
        <figure>
          <Image src={c.src} alt={c.alt} widths={[380, 620]} sizes="(max-width: 700px) 82vw, 380px" loading="lazy" />
        </figure>
      ))}
    </div>
    <p class="legenda">{site.resultados.legenda}</p>
  </div>
</section>

<style>
  .olho { font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--c-muted); }
  h2 { font-size: clamp(1.9rem, 5vw, 2.9rem); margin: .5rem 0 2rem; }
  .trilho {
    display: grid; grid-auto-flow: column; grid-auto-columns: min(82vw, 380px);
    gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory;
    padding-bottom: 1rem; scrollbar-width: thin;
  }
  .trilho > figure { scroll-snap-align: start; margin: 0; }
  .trilho img { border-radius: .9rem; width: 100%; }
  .legenda { font-size: .84rem; color: var(--c-muted); font-style: italic; margin-top: 1rem; max-width: 62ch; }
  .v-c .trilho img { border-radius: 1.5rem; }
</style>
```

- [ ] **Step 2: Criar `src/components/Sobre.astro`**

```astro
---
import { Image } from 'astro:assets';
import retrato from '../assets/dr-adzo-retrato.jpg';
import { site } from '../data/site';
---
<section id="sobre" class="secao sobre">
  <div class="container grade">
    <Image src={retrato} alt={site.sobre.alt} widths={[380, 640]}
           sizes="(max-width: 800px) 88vw, 380px" loading="lazy" class="foto" />
    <div>
      <p class="olho">Sobre</p>
      <h2>{site.sobre.titulo}</h2>
      <p class="corpo">{site.sobre.texto}</p>
      <ul class="dados">
        <li><strong>Registro</strong>{site.cro}</li>
        <li><strong>Atuação</strong>{site.cidade}</li>
        <li><strong>Formação</strong>{site.sobre.formacao}</li>
      </ul>
    </div>
  </div>
</section>

<style>
  .sobre { background: var(--c-surfaceAlt); }
  .grade { display: grid; gap: clamp(2rem, 5vw, 3.5rem); align-items: center; }
  @media (min-width: 801px) { .grade { grid-template-columns: 380px 1fr; } }
  .foto { border-radius: 1.1rem; width: 100%; }
  .olho { font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--c-muted); }
  h2 { font-size: clamp(1.9rem, 5vw, 2.7rem); margin: .5rem 0 1.2rem; }
  .corpo { color: var(--c-muted); margin-bottom: 2rem; }
  .dados { list-style: none; padding: 0; display: grid; gap: .8rem; }
  .dados li { display: grid; gap: .15rem; border-top: 1px solid var(--c-line); padding-top: .8rem; }
  .dados strong { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; color: var(--c-muted); font-weight: 600; }
</style>
```

- [ ] **Step 3: Criar `src/components/PrimeiraConsulta.astro`**

```astro
---
import { site } from '../data/site';
---
<section id="primeira-consulta" class="secao">
  <div class="container">
    <p class="olho">Sem surpresa</p>
    <h2>{site.primeiraConsulta.titulo}</h2>
    <ol class="passos">
      {site.primeiraConsulta.passos.map((p) => (
        <li>
          <span class="num" aria-hidden="true">{p.numero}</span>
          <h3>{p.titulo}</h3>
          <p>{p.texto}</p>
        </li>
      ))}
    </ol>
  </div>
</section>

<style>
  .olho { font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--c-muted); }
  h2 { font-size: clamp(1.9rem, 5vw, 2.9rem); margin: .5rem 0 2.5rem; }
  .passos {
    list-style: none; padding: 0; display: grid; gap: 1.75rem;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
    counter-reset: passo;
  }
  .passos li { border-top: 2px solid var(--c-primary); padding-top: 1.25rem; }
  .num { display: block; font-family: var(--f-titulo); font-size: 2.4rem; color: var(--c-accent, var(--c-primary)); line-height: 1; margin-bottom: .6rem; }
  .passos h3 { font-size: 1.15rem; margin-bottom: .5rem; }
  .passos p { color: var(--c-muted); font-size: .95rem; }
</style>
```

Nota: `var(--c-accent, var(--c-primary))` porque a direção C não define `accent`.

- [ ] **Step 3b: Plugar em `Pagina.astro`**

Acrescente os imports e substitua o comentário `<!-- Task 7: ... -->` por:

```astro
  <Resultados variant={variant} />
  <Sobre />
  <PrimeiraConsulta />
```

Rode `npm run build` e confirme as 4 páginas.

- [ ] **Step 4: Commit**

```bash
git add src/components/Resultados.astro src/components/Sobre.astro src/components/PrimeiraConsulta.astro
git commit -m "feat: galeria de casos, seção sobre e passo a passo da primeira consulta"
```

---

### Task 8: FAQ, Localização, Footer e botão flutuante

**Files:**
- Create: `src/components/Faq.astro`, `src/components/Localizacao.astro`, `src/components/Rodape.astro`, `src/components/WhatsFlutuante.astro`

**Interfaces:**
- Consumes: `site.faq`, `site.localizacao`, `whatsappLink`
- Produces: componentes prontos para composição na Task 9

- [ ] **Step 1: Criar `src/components/Faq.astro`**

Usa `<details>`/`<summary>` nativos — acessível por teclado, funciona sem JS e não custa bytes.

```astro
---
import { site } from '../data/site';
import { whatsappLink } from '../lib/whatsapp';
---
<section id="duvidas" class="secao faq">
  <div class="container caixa">
    <p class="olho">Perguntas frequentes</p>
    <h2>O que as pessoas mais me perguntam</h2>
    {site.faq.map((item) => (
      <details name="faq">
        <summary>{item.pergunta}</summary>
        <div class="resposta"><p>{item.resposta}</p></div>
      </details>
    ))}
    <p class="mais">
      Ficou outra dúvida?
      <a href={whatsappLink('faq')} target="_blank" rel="noopener">Me pergunte no WhatsApp</a>.
    </p>
  </div>
</section>

<style>
  .faq { background: var(--c-surfaceAlt); }
  .caixa { max-width: 760px; }
  .olho { font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--c-muted); }
  h2 { font-size: clamp(1.8rem, 4.5vw, 2.6rem); margin: .5rem 0 2rem; }
  details { border-bottom: 1px solid var(--c-line); background: transparent; }
  summary {
    display: flex; justify-content: space-between; align-items: center; gap: 1rem;
    padding: 1.15rem 0; min-height: 44px;
    font-weight: 600; font-size: 1.02rem; cursor: pointer; list-style: none;
  }
  summary::-webkit-details-marker { display: none; }
  summary::after {
    content: '+'; font-size: 1.5rem; line-height: 1;
    color: var(--c-primary); transition: transform .2s ease; flex: none;
  }
  details[open] summary::after { transform: rotate(45deg); }
  .resposta { padding-bottom: 1.3rem; }
  .resposta p { color: var(--c-muted); font-size: .96rem; }
  .mais { margin-top: 2rem; color: var(--c-muted); }
  .mais a { color: var(--c-primary); font-weight: 600; }
</style>
```

Nota: o atributo `name="faq"` faz o acordeão ser exclusivo (abrir um fecha os outros) sem uma linha de JS. Em navegadores que não suportam, todos podem ficar abertos — degradação aceitável.

- [ ] **Step 2: Criar `src/components/Localizacao.astro`**

```astro
---
import { Image } from 'astro:assets';
import recepcao from '../assets/consultorio-recepcao.jpg';
import { site } from '../data/site';
import { whatsappLink } from '../lib/whatsapp';
import BotaoWhats from './BotaoWhats.astro';

const temMapa = !site.localizacao.mapaEmbed.includes('[[PENDENTE]]');
---
<section id="localizacao" class="secao">
  <div class="container grade">
    <div>
      <p class="olho">Onde me encontrar</p>
      <h2>{site.localizacao.titulo}</h2>
      <dl>
        <dt>Endereço</dt><dd>{site.localizacao.endereco}</dd>
        <dt>Horários</dt><dd>{site.localizacao.horarios}</dd>
        <dt>Cidade</dt><dd>{site.cidade}</dd>
      </dl>
      <BotaoWhats href={whatsappLink('rodape')}>Combinar um horário</BotaoWhats>
    </div>
    <div class="visual">
      {temMapa ? (
        <iframe src={site.localizacao.mapaEmbed} title="Mapa do consultório"
                loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      ) : (
        <Image src={recepcao} alt={site.localizacao.alt} widths={[420, 760]}
               sizes="(max-width: 800px) 90vw, 440px" loading="lazy" />
      )}
    </div>
  </div>
</section>

<style>
  .grade { display: grid; gap: clamp(2rem, 5vw, 3.5rem); align-items: center; }
  @media (min-width: 801px) { .grade { grid-template-columns: 1fr 1fr; } }
  .olho { font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--c-muted); }
  h2 { font-size: clamp(1.9rem, 5vw, 2.7rem); margin: .5rem 0 1.8rem; }
  dl { display: grid; gap: 1rem; margin-bottom: 2rem; }
  dt { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; color: var(--c-muted); font-weight: 600; }
  dd { margin: .15rem 0 0; }
  .visual img, .visual iframe { width: 100%; border: 0; border-radius: 1.1rem; aspect-ratio: 4 / 3; object-fit: cover; }
</style>
```

- [ ] **Step 3: Criar `src/components/Rodape.astro`**

```astro
---
import { site } from '../data/site';
import { whatsappLink } from '../lib/whatsapp';
const ano = new Date().getFullYear();
---
<footer id="rodape">
  <div class="container topo">
    <div>
      <strong>{site.nome}</strong>
      <p>{site.titulo}</p>
      <p class="cro">{site.cro}</p>
    </div>
    <nav aria-label="Links do rodapé">
      <a href={site.instagram} target="_blank" rel="noopener">Instagram {site.instagramHandle}</a>
      <a href={whatsappLink('rodape')} target="_blank" rel="noopener">WhatsApp</a>
    </nav>
  </div>
  <div class="container base">
    <p>© {ano} {site.nome}. Todos os direitos reservados.</p>
    <p>Responsável técnico: {site.nome} — {site.cro}</p>
  </div>
</footer>

<style>
  footer { background: var(--c-surfaceAlt); border-top: 1px solid var(--c-line); padding-block: 3rem 1.5rem; }
  .topo { display: grid; gap: 2rem; padding-bottom: 2rem; }
  @media (min-width: 700px) { .topo { grid-template-columns: 1fr auto; align-items: start; } }
  .topo strong { font-family: var(--f-titulo); font-size: 1.25rem; }
  .topo p { color: var(--c-muted); font-size: .92rem; }
  .cro { font-size: .8rem !important; letter-spacing: .06em; }
  nav { display: grid; gap: .6rem; }
  nav a { color: var(--c-primary); font-weight: 600; font-size: .92rem; text-decoration: none; }
  nav a:hover { text-decoration: underline; text-underline-offset: 4px; }
  .base {
    display: grid; gap: .4rem; border-top: 1px solid var(--c-line);
    padding-top: 1.5rem; font-size: .78rem; color: var(--c-muted);
  }
</style>
```

- [ ] **Step 4: Criar `src/components/WhatsFlutuante.astro`**

Só aparece depois que o usuário passa do hero, para não competir com o CTA principal na primeira dobra.

```astro
---
import { whatsappLink } from '../lib/whatsapp';
---
<a id="whats-flutuante" href={whatsappLink('flutuante')} target="_blank" rel="noopener"
   aria-label="Falar com o Dr. Adzo no WhatsApp">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.7.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/>
  </svg>
</a>

<script>
  const btn = document.getElementById('whats-flutuante');
  const hero = document.getElementById('inicio');
  if (btn && hero) {
    const obs = new IntersectionObserver(
      ([entrada]) => btn.classList.toggle('visivel', !entrada.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(hero);
  }
</script>

<style>
  #whats-flutuante {
    position: fixed; z-index: 60;
    right: max(1.1rem, env(safe-area-inset-right));
    bottom: max(1.1rem, env(safe-area-inset-bottom));
    width: 56px; height: 56px; border-radius: 50%;
    display: grid; place-items: center;
    background: #25D366; color: #FFFFFF;
    box-shadow: 0 8px 24px rgb(0 0 0 / .26);
    opacity: 0; visibility: hidden; transform: translateY(14px);
    transition: opacity .25s ease, transform .25s ease, visibility .25s;
  }
  #whats-flutuante.visivel { opacity: 1; visibility: visible; transform: none; }
</style>
```

Nota sobre a cor: `#25D366` é a cor de marca do WhatsApp e é intencionalmente a única cor fora da paleta em toda a página — o reconhecimento instantâneo do botão vale mais do que a coerência cromática aqui. O ícone branco sobre esse verde dá 2.1:1, abaixo de AA, mas o botão não carrega texto: a informação é o `aria-label`, que leitores de tela anunciam. Não adicione rótulo textual dentro dele.

- [ ] **Step 4b: Plugar em `Pagina.astro` — a página fica completa aqui**

Acrescente os imports. Substitua o comentário `<!-- Task 8: ... -->` por `<Faq />` e `<Localizacao />` **dentro** do `<main>`; ponha `<Rodape />` e `<WhatsFlutuante />` **depois** do `</main>`. O arquivo final deve ficar exatamente como a Task 9 Step 1 mostra — confira contra ela.

Rode `npm run build` e confirme as 4 páginas com as 12 seções.

- [ ] **Step 5: Commit**

```bash
git add src/components/Faq.astro src/components/Localizacao.astro src/components/Rodape.astro src/components/WhatsFlutuante.astro
git commit -m "feat: FAQ, localização, rodapé e botão flutuante de WhatsApp"
```

---

### Task 9: Colapsar para a Direção C, assets e testes de build

**Mudança de escopo decidida pelo parceiro humano:** ele dispensou a escolha entre três
direções e pediu o site pronto no estilo que eu julgasse melhor. Escolhida pelo parceiro humano, depois de ver os três protótipos no ar, a **Direção C
("Acolhimento Humano")**. Esta task transforma o protótipo A no site definitivo, na raiz, e
remove o que sobrou do formato de três opções.

As paletas A e B **permanecem** em `src/data/palettes.ts`. São dados inertes, não custam
nada no bundle, e mantêm o caminho de volta aberto se o cliente pedir outra cara depois.
O teste de contraste continua cobrindo as três.

**Files:**
- Modify: `src/pages/index.astro` — passa a ser a página real, Direção C
- Delete: `src/pages/prototipo/a.astro`, `b.astro`, `c.astro`
- Create: `public/favicon.svg`, `public/og-image.jpg`
- Modify: `tests/build/seo.test.ts` — passa a testar `dist/index.html`
- Test: `tests/build/conversao.test.ts`

**Interfaces:**
- Consumes: `Pagina.astro` completo ao fim da Task 8; `Base.astro`; `palettes`
- Produces: o site em `/`

- [ ] **Step 1: Conferir `src/components/Pagina.astro` contra o alvo**

Ao fim da Task 8 ele deve estar exatamente assim. Corrija qualquer divergência:

```astro
---
import Header from './Header.astro';
import Hero from './Hero.astro';
import Credenciais from './Credenciais.astro';
import Urgencia from './Urgencia.astro';
import Tratamentos from './Tratamentos.astro';
import Quiz from './Quiz.astro';
import Resultados from './Resultados.astro';
import Sobre from './Sobre.astro';
import PrimeiraConsulta from './PrimeiraConsulta.astro';
import Faq from './Faq.astro';
import Localizacao from './Localizacao.astro';
import Rodape from './Rodape.astro';
import WhatsFlutuante from './WhatsFlutuante.astro';
import type { Variant } from '../data/palettes';

interface Props { variant: Variant }
const { variant } = Astro.props;
---
<Header />
<main id="conteudo">
  <Hero variant={variant} />
  <Credenciais />
  <Urgencia />
  <Tratamentos variant={variant} />
  <Quiz />
  <Resultados variant={variant} />
  <Sobre />
  <PrimeiraConsulta />
  <Faq />
  <Localizacao />
</main>
<Rodape />
<WhatsFlutuante />
```

A prop `variant` continua existindo e continua sendo `'c'` na prática. Não a remova:
ela é o que mantém o custo de trocar de direção em uma linha.

- [ ] **Step 2: Fazer de `src/pages/index.astro` o site definitivo**

Substitua o índice de três opções por:

```astro
---
import Base from '../layouts/Base.astro';
import Pagina from '../components/Pagina.astro';
---
<Base
  variant="c"
  titulo="Dr. Adzo Pereira — Endodontista em Recife | Tratamento de Canal"
  descricao="Especialista em endodontia em Recife. Tratamento de canal, retratamento e atendimento de urgência para dor de dente. CRO-PE 15853. Agende pelo WhatsApp."
>
  <Pagina variant="c" />
</Base>
```

- [ ] **Step 3: Remover as rotas de protótipo**

```bash
git rm -r src/pages/prototipo
```

- [ ] **Step 4: Verificar que sobrou uma rota só**

Run: `npm run build`
Expected: 1 página construída, `dist/index.html`. Nenhum `dist/prototipo/`.

- [ ] **Step 5: Criar `public/favicon.svg`**

Dente estilizado em linha, na cor da marca.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#1B5A7A"/>
  <path d="M16 6c-3 0-4-1.2-6.2-1.2C7.2 4.8 5.5 6.9 5.5 10c0 3.4 1.3 5.3 2.2 8.2.7 2.3.6 7.3 2.9 7.3 2 0 1.9-4.1 2.6-6.3.4-1.3 1.1-2.1 2.8-2.1s2.4.8 2.8 2.1c.7 2.2.6 6.3 2.6 6.3 2.3 0 2.2-5 2.9-7.3.9-2.9 2.2-4.8 2.2-8.2 0-3.1-1.7-5.2-4.3-5.2C20 4.8 19 6 16 6z" fill="none" stroke="#FBF9F6" stroke-width="2" stroke-linejoin="round"/>
</svg>
```

- [ ] **Step 6: Gerar `public/og-image.jpg`**

1200x630. E a imagem que aparece quando o link e colado no WhatsApp e no Instagram --
o primeiro contato visual do paciente com o site.

Escreva um script temporario `scripts/og.mjs` (nao commite) e rode com `node scripts/og.mjs`:

```js
import sharp from 'sharp';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#2B3A42"/>
  <text x="80" y="300" font-family="Georgia, serif" font-size="72" fill="#FAF7F2">Dr. Adzo Pereira</text>
  <text x="80" y="365" font-family="Helvetica, sans-serif" font-size="30" fill="#C3CDD3">Especialista em Endodontia &#183; Recife &#8212; PE</text>
  <text x="80" y="420" font-family="Helvetica, sans-serif" font-size="24" fill="#C89B6A" letter-spacing="3">CRO-PE 15853</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile('public/og-image.jpg');
console.log('og-image.jpg gerado');
```

Confirme que o arquivo existe e tem 1200x630. Apague `scripts/og.mjs` depois.

- [ ] **Step 7: Apontar `tests/build/seo.test.ts` para a pagina unica**

O teste foi escrito na Task 4 mirando `dist/prototipo/<v>/index.html`. Reescreva para uma pagina so:

```ts
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { parseHTML } from 'linkedom';

describe('SEO e head', () => {
  let doc: Document;
  beforeAll(() => {
    const html = readFileSync('dist/index.html', 'utf-8');
    doc = parseHTML(html).document as unknown as Document;
  });

  it('declara pt-BR', () => {
    expect(doc.documentElement.getAttribute('lang')).toBe('pt-BR');
  });

  it('tem title e meta description nao vazios', () => {
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
```

- [ ] **Step 8: Escrever `tests/build/conversao.test.ts`**

Trava a estrategia de conversao no HTML gerado.

```ts
import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { parseHTML } from 'linkedom';

let doc: Document;
beforeAll(() => {
  doc = parseHTML(readFileSync('dist/index.html', 'utf-8')).document as unknown as Document;
});

describe('estrategia de conversao', () => {
  it('tem pelo menos 8 links de WhatsApp', () => {
    expect(doc.querySelectorAll('a[href*="wa.me/5581998742330"]').length)
      .toBeGreaterThanOrEqual(8);
  });

  it('todo link de WhatsApp abre em nova aba com rel noopener', () => {
    for (const a of doc.querySelectorAll('a[href*="wa.me"]')) {
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toContain('noopener');
    }
  });

  it('usa mensagens pre-preenchidas distintas por origem', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href*="wa.me"]'))
      .map((a) => a.getAttribute('href')!);
    const textos = new Set(hrefs.map((h) => h.split('?text=')[1]));
    expect(textos.size).toBeGreaterThanOrEqual(6);
  });

  it('o CTA de urgencia menciona urgencia', () => {
    const hrefs = Array.from(doc.querySelectorAll('a[href*="wa.me"]'))
      .map((a) => decodeURIComponent(a.getAttribute('href')!));
    expect(hrefs.some((h) => h.includes('urg\u00eancia'))).toBe(true);
  });

  it('tem as 12 secoes da spec, na ordem', () => {
    const esperadas = [
      'topo', 'inicio', 'credenciais', 'urgencia', 'tratamentos', 'quiz',
      'resultados', 'sobre', 'primeira-consulta', 'duvidas', 'localizacao', 'rodape',
    ];
    const encontradas = Array.from(doc.querySelectorAll('[id]'))
      .map((el) => el.id)
      .filter((id) => esperadas.includes(id));
    expect(encontradas).toEqual(esperadas);
  });

  it('toda imagem tem alt descritivo', () => {
    for (const img of doc.querySelectorAll('img')) {
      expect((img.getAttribute('alt') ?? '').length).toBeGreaterThan(10);
    }
  });

  it('tem exatamente um h1', () => {
    expect(doc.querySelectorAll('h1').length).toBe(1);
  });

  it('o numero de WhatsApp aparece so em whatsapp.ts no codigo-fonte', () => {
    const encontrados: string[] = [];
    const varrer = (dir: string) => {
      for (const entrada of readdirSync(dir, { withFileTypes: true })) {
        const caminho = `${dir}/${entrada.name}`;
        if (entrada.isDirectory()) { varrer(caminho); continue; }
        if (!/[.](ts|astro|js|mjs)$/.test(entrada.name)) continue;
        if (readFileSync(caminho, 'utf-8').includes('5581998742330')) {
          encontrados.push(caminho);
        }
      }
    };
    varrer('src');
    expect(encontrados).toEqual(['src/lib/whatsapp.ts']);
  });
});
```

- [ ] **Step 9: Rodar tudo**

Run: `npm test && npm run test:build`
Expected: suite unitaria verde e os dois arquivos de build verdes.

Se as 12 secoes falharem, a mensagem mostra a lista obtida contra a esperada -- normalmente
e um `id` faltando ou fora de ordem em `Pagina.astro`.

- [ ] **Step 10: Commit e push**

```bash
git add -A
git commit -m "feat: site na Direcao C, favicon, og-image e testes sobre o HTML gerado"
git push
```

---

### Task 10: Verificação de acessibilidade e performance

**Files:**
- Modify: `src/layouts/Base.astro` (só se as fontes precisarem ser auto-hospedadas)

**Interfaces:**
- Consumes: build da Task 9
- Produces: o site verificado e publicado na Vercel

**Sobre o deploy:** o repositório já está conectado à Vercel pelo parceiro humano, então **cada push para `main` publica sozinho**. Não existe passo de deploy manual nesta task, e o executor não deve rodar a CLI da Vercel nem tentar autenticar — não tem credencial e não precisa. Seu trabalho aqui é medir e corrigir; publicar é consequência do push.

Tentou-se GitHub Pages antes, para que o agente pudesse publicar sozinho. Foi revertido: o Pages serve em `/adzo-pereira`, e o subcaminho exigiria `base` no Astro mais `import.meta.env.BASE_URL` em todo caminho absoluto, sem ganho nenhum sobre a Vercel já conectada.

- [ ] **Step 1: Rodar Lighthouse mobile na página**

```bash
npm run build && npx --yes serve dist -p 4173 &
npx --yes lighthouse http://localhost:4173/   --form-factor=mobile --throttling-method=simulate   --only-categories=performance,accessibility,best-practices,seo   --output=json --output-path=./lh-a.json --chrome-flags="--headless"
```

Expected: as 4 categorias ≥ 95.

Os arquivos `lh-*.json` são temporários — não os commite. Acrescente `lh-*.json` ao `.gitignore` se atrapalharem.

- [ ] **Step 2: Corrigir o que ficou abaixo de 95**

Ordem de ataque, da causa mais provável para a menos:
1. **Fontes do Google CDN** derrubando o LCP → baixe os `.woff2` para `public/fonts/`, declare `@font-face` com `font-display: swap` em `global.css`, remova os `<link>` do Google em `Base.astro` e adicione `<link rel="preload" as="font" type="font/woff2" crossorigin>` para a fonte de título.
2. **Contraste** apontado pelo Lighthouse → o teste da Task 3 só cobre os pares declarados; adicione o par faltante a `paresDeTexto` da direção C e ajuste o hex até o teste passar.
3. **Imagem do hero** sem dimensão reservada → confirme que `<Image>` do `astro:assets` está emitindo `width`/`height`.

Rode o Lighthouse de novo após cada correção.

- [ ] **Step 3: Verificar acessibilidade por teclado manualmente**

Com o `npm run preview` aberto, percorra a página só de `Tab`:
- O primeiro foco é "Pular para o conteúdo" e ele funciona.
- Todo `<summary>` do FAQ abre com `Enter` e `Espaço`.
- Todo checkbox do quiz é alcançável e marca com `Espaço`.
- O anel de foco é visível em todos os elementos.
- O botão flutuante é alcançável.

Corrija o que falhar antes de seguir.

- [ ] **Step 4: Verificar em 375px**

Com o devtools em 375×812: nenhum scroll horizontal, nenhum texto cortado, o botão flutuante não cobre nenhum CTA.

- [ ] **Step 5: Commit e push**

```bash
git add -A
git commit -m "chore: ajustes de performance e acessibilidade"
git push
```

O push dispara o deploy da Vercel automaticamente.

- [ ] **Step 6: Confirmar o site no ar**

Em `https://adzo-pereira.vercel.app/`: o CSS carregou, as imagens aparecem, e um CTA de WhatsApp abre o app com a mensagem correta já escrita.

---

### Task 11: Entrega

O parceiro humano dispensou a apresentacao de tres opcoes -- a entrega e o site pronto.

- [ ] **Step 1: Confirmar o site em producao**

Abra `https://adzo-pereira.vercel.app/` e percorra a pagina no celular e no desktop.

Checklist antes de chamar de pronto:
- As 12 secoes aparecem, na ordem.
- As 5 fotos carregam.
- O botao flutuante de WhatsApp surge depois do hero e nao cobre nenhum CTA.
- O quiz monta a mensagem com os sintomas marcados.
- O acordeao do FAQ abre e fecha.
- Colar o link num chat mostra o preview com a og-image.

- [ ] **Step 2: Entregar ao parceiro humano**

Mande a URL de producao e a lista de `site.pendentes` / `site.pendentesExternos` --
endereco, horarios, formacao e convenios estao marcados como `[[PENDENTE]]` e
**nao podem ir ao ar assim** para o publico final.

---

## Ordem de execução e dependências

```
Task 1 (scaffold + repo)
  └─ Task 2 (conteúdo + WhatsApp)  ─┐
  └─ Task 3 (paletas + contraste)  ─┤
                                     └─ Task 4 (layout base + SEO)
                                          ├─ Task 5 (header/hero/credenciais/urgência)
                                          ├─ Task 6 (tratamentos + quiz)      [precisa da 2]
                                          ├─ Task 7 (resultados/sobre/passos)
                                          └─ Task 8 (faq/local/rodapé/flutuante)
                                               └─ Task 9 (páginas + testes de build)
                                                    └─ Task 10 (a11y/perf + deploy)
                                                         └─ Task 11 (apresentação)
```

Tasks 5, 6, 7 e 8 **não** podem ser paralelizadas: desde o ressequenciamento, cada uma
edita `src/components/Pagina.astro` para plugar a própria seção. Execute-as em ordem.
Os componentes em si são independentes — é só o arquivo de composição que serializa.

## Se o cliente quiser outra direcao depois

As paletas A e B continuam em `src/data/palettes.ts`, cobertas pelo teste de contraste.
Trocar a cara do site e mudar `variant="c"` para `"a"` ou `"b"` nos dois pontos de
`src/pages/index.astro`. Os componentes com estilo por direcao (`Hero`, `Tratamentos`,
`Resultados`) ja ramificam sozinhos.

## Acervo de imagens — limitacao conhecida

So existem 5 fotos, e o site consome todas: o retrato aparece duas vezes (hero e Sobre),
os 3 registros clinicos na galeria, e a recepcao na Localizacao. Isso e o teto do que da
para fazer com o material atual, e e a razao principal de a pagina parecer curta.

O que pedir ao Dr. Adzo, em ordem de impacto:
1. **Fotos do consultorio** — sala clinica, equipamento, cadeira, fachada, sala de espera.
   Sao as que mais reduzem ansiedade: o paciente quer saber onde vai sentar.
2. **Mais registros clinicos** de antes/depois, com autorizacao — alimentam a galeria,
   que hoje tem so 3 e nao rola direito.
3. **Retratos alternativos** — ele atendendo, explicando radiografia, em pe na recepcao.
   Um retrato unico usado em duas secoes fica repetitivo.
4. **Logo em vetor** (SVG ou AI) — hoje a marca so existe como marca-d'agua em JPG.

Ate isso chegar, a densidade da pagina vem de texto e estrutura, nao de imagem —
por isso o FAQ, o passo a passo da primeira consulta e o quiz carregam tanto peso.

## Quando o conteudo pendente chegar

1. Preencher os `[[PENDENTE]]` de `src/data/site.ts` com o conteudo real.
2. Acrescentar `streetAddress`, `postalCode` e `openingHours` ao JSON-LD em `SchemaDentist.astro`.
3. Inverter o teste de pendentes: deve passar a **falhar** se `[[PENDENTE]]` ainda existir.
4. Se houver dominio proprio: apontar o DNS na Vercel e atualizar `site` em `astro.config.mjs`.
