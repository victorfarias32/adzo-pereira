# Site Dr. Adzo Pereira — Design Spec

**Data:** 2026-09-08
**Cliente:** Dr. Adzo Pereira — Cirurgião-Dentista, especialista em Endodontia
**Responsável técnico:** victorfarias32

---

## 1. Contexto

Dr. Adzo Pereira atende em Recife (CRO-PE 15853) e hoje capta pacientes exclusivamente
pelo Instagram [@adzopereira](https://www.instagram.com/adzopereira/) (1.069 seguidores),
cujo link da bio aponta direto para `wa.me/5581998742330`. Não existe site.

O gargalo é que o Instagram não sustenta prova de credibilidade nem responde às objeções
de quem chega com dor: quanto custa, dói, quantas sessões, onde fica. O paciente
de endodontia decide sob medo e sob dor — duas condições que exigem informação
imediata e caminho de contato sem atrito.

**Objetivo do site:** ser o destino do link da bio e dos anúncios, convertendo
visitante em conversa de WhatsApp. Não é um site institucional. É um funil.

**Métrica de sucesso:** taxa de cliques em CTA de WhatsApp. Referência de mercado
para odontologia bem executada: 12–16% dos visitantes tomam ação relevante.

### Ativos existentes

Na raiz do projeto há 5 imagens vindas do Instagram:

| Arquivo | Conteúdo | Uso |
|---|---|---|
| `621840863_...jpg` | Retrato do Dr. Adzo de corpo inteiro, jaleco cinza, muro verde | Hero, seção Sobre |
| `617358171_...jpg` | Antes/depois — clareamento, sorriso | Galeria |
| `624845575_...jpg` | Antes/depois — arcada completa | Galeria |
| `628421086_...jpg` | Antes/depois — close frontal | Galeria |
| `656167948_...jpg` | Recepção/consultório — mesa, quadros, plantas | Seção Estrutura/Localização |

**Marca já existente** (extraída da marca-d'água das fotos clínicas):
logotipo "Dr. Adzo Pereira / ODONTOLOGIA" com ícone de dente estilizado em
azul-petróleo, nome em script serifado, subtítulo em sans caixa-alta espaçada.
**O design system parte dessa marca — não a substitui.**

---

## 2. Decisões travadas

| Decisão | Escolha | Motivo |
|---|---|---|
| Stack | **Astro** | Gera HTML estático puro; sem JS de framework no cliente. Componentização e SEO built-in. |
| Hospedagem | **GitHub Pages** via GitHub Actions | Deploy automático por push, HTTPS e domínio grátis — e totalmente automatizável com o `gh` já autenticado nesta máquina, ao contrário da Vercel, que exige login interativo. |
| Escopo | **One-page de conversão** | Formato de maior conversão para profissional solo; sem menu que disperse. |
| Repositório | `adzo-pereira`, **público**, conta `victorfarias32` | GitHub não aceita espaço; slug minúsculo casa com domínio futuro. |
| Idioma | pt-BR único | Público 100% local (Recife). |
| Direção visual | **3 opções apresentadas ao cliente** | O Adzo escolhe. Recomendação técnica: A. |

---

## 3. Arquitetura de conteúdo

A página é uma sequência de objeções derrubadas, na ordem em que o paciente
de endodontia as levanta.

| # | Seção | ID | Objeção que derruba |
|---|---|---|---|
| 1 | Header fino fixo | `#topo` | — (CRO + botão WhatsApp sempre visível) |
| 2 | Hero | `#inicio` | "Quem é esse profissional?" |
| 3 | Faixa de credenciais | `#credenciais` | "É confiável?" |
| 4 | **Bloco de urgência — "Está com dor agora?"** | `#urgencia` | *Maior conversor em endodontia* |
| 5 | Tratamentos (Canal em destaque) | `#tratamentos` | "Ele faz o que eu preciso?" |
| 6 | **Quiz — "Você precisa de canal?"** | `#quiz` | Engaja quem ainda não decidiu |
| 7 | Antes & Depois (galeria com scroll-snap) | `#resultados` | "Funciona mesmo?" |
| 8 | Sobre o Dr. Adzo | `#sobre` | "É gente ou clínica de esteira?" |
| 9 | Como é sua 1ª consulta — 3 passos | `#primeira-consulta` | "Vou ser julgado?" |
| 10 | FAQ | `#duvidas` | Dor, preço, número de sessões |
| 11 | Localização, horários e estrutura | `#localizacao` | "Dá pra chegar?" |
| 12 | Footer + Instagram | `#rodape` | — |
| — | **Botão WhatsApp flutuante** | — | Persistente em toda a página |

### 3.1 Detalhamento por seção

**Hero.** Título com a proposta de valor em linguagem de paciente, não de dentista
("Tratamento de canal sem dor, com quem é especialista" — não "Endodontia de excelência").
Subtítulo com cidade e credencial. CTA primário WhatsApp + CTA secundário âncora para
`#tratamentos`. Retrato do Dr. Adzo.

**Faixa de credenciais.** Quatro selos horizontais: `Especialista em Endodontia` ·
`CRO-PE 15853` · `Recife — PE` · `Atendimento de urgência`. Sem ícones genéricos de
banco de imagem; ícones desenhados em linha, coerentes com o traço do logo.

**Bloco de urgência.** Visualmente destacado do resto (fundo contrastante). Copy curta,
direta, botão grande. É o único ponto da página onde a hierarquia grita.

**Tratamentos.** Cards: Tratamento de Canal (destaque, card maior), Retratamento
Endodôntico, Urgência / Dor de Dente, Clareamento, Restauração. Cada card tem
CTA próprio com mensagem pré-preenchida específica.

**Quiz.** 5 sintomas em checkboxes (dor ao mastigar, sensibilidade prolongada ao
quente/frio, dor espontânea à noite, escurecimento do dente, inchaço na gengiva).
Ao marcar, o botão de WhatsApp monta uma mensagem com os sintomas selecionados.
Sem back-end, sem armazenamento de dados. **Não emite diagnóstico** — o resultado
sempre orienta a procurar avaliação profissional (ver §7).

**Antes & Depois.** As 3 fotos clínicas disponíveis **já são imagens compostas**
(antes em cima, depois embaixo, com a marca-d'água do logo no meio), então não cabe
slider de divisória — não há duas imagens separadas para comparar. O tratamento é uma
galeria horizontal com scroll-snap, sem JavaScript. Legenda de caso genérica, sem
identificação de paciente, deixando claro que o resultado varia por pessoa.

**Sobre.** Foto real, texto em primeira pessoa, formação e CRO. Sem jargão.

**Primeira consulta.** Três passos numerados: (1) você manda mensagem e descreve
o que sente, (2) avaliação com raio-X no consultório, (3) plano de tratamento com
valor fechado antes de começar. Este último item resolve a objeção de preço sem
publicar tabela.

**FAQ.** Acordeão. Perguntas escritas com as palavras do paciente: "Tratamento de canal
dói?", "Quantas sessões precisa?", "Quanto custa um canal?", "Atende convênio?",
"E se eu estiver com muita dor hoje?".

**Localização.** Endereço, horários, mapa embutido e foto da recepção.

---

## 4. Estratégia de conversão para WhatsApp

**Número:** `5581998742330`
**Padrão de link:** `https://wa.me/5581998742330?text=<mensagem URL-encoded>`

Cada CTA envia uma **mensagem pré-preenchida diferente**. Isso resolve dois problemas
de uma vez: o paciente com dor não precisa formular texto, e o Dr. Adzo identifica
de qual seção veio o lead sem nenhuma ferramenta de analytics.

| Origem do clique | Mensagem pré-preenchida |
|---|---|
| Header / botão flutuante | `Olá, Dr. Adzo! Vim pelo site e gostaria de agendar uma avaliação.` |
| Hero | `Olá, Dr. Adzo! Vim pelo site e quero marcar uma consulta.` |
| Bloco de urgência | `Olá, Dr. Adzo! Estou com dor de dente e preciso de atendimento com urgência.` |
| Card de tratamento | `Olá, Dr. Adzo! Vim pelo site e quero saber sobre <tratamento>.` |
| Quiz | `Olá, Dr. Adzo! Fiz o teste no site e marquei: <sintomas>. Posso marcar uma avaliação?` |
| FAQ / rodapé | `Olá, Dr. Adzo! Vim pelo site e tenho uma dúvida.` |

**Regras de UX do CTA:**
- Todo link de WhatsApp abre em nova aba (`target="_blank" rel="noopener"`).
- O botão flutuante aparece após o usuário rolar além do hero, para não competir
  com o CTA principal na primeira dobra.
- O botão flutuante nunca cobre conteúdo clicável no mobile (respeita `safe-area-inset`).
- A geração dos links fica **centralizada numa única função utilitária** — o número
  aparece uma vez só no código.

---

## 5. As três direções visuais

Todas herdam a marca existente: dente azul-petróleo, nome em script serifado.
Todas usam a mesma arquitetura de conteúdo da §3. O que muda é paleta, tipografia,
densidade e temperatura.

### Direção A — "Clínico Sereno" *(recomendada)*
**Referências:** Zen Dental Studio, Tend, Atlanta Center for Advanced Periodontics.

- **Paleta:** azul-petróleo da marca como cor primária; off-white quente de fundo;
  areia como superfície secundária; dourado discreto só em detalhe.
- **Tipografia:** serifada elegante nos títulos, sans neutra no corpo.
- **Layout:** muito respiro, colunas largas, retrato em altura total no hero.
- **Movimento:** fade-up sutil na entrada de seção. Nada mais.
- **Sensação-alvo:** consultório caro e silencioso. "Não vai doer."
- **Por que é a recomendação:** é a direção que menos depende de volume de imagem —
  e hoje só existem 5 fotos. Também é a que envelhece melhor.

### Direção B — "Editorial Autoridade"
**Referências:** Grand Street Dental, Vivid Specialized Dentistry.

- **Paleta:** azul-noite profundo alternando com seções creme; acentos champagne.
- **Tipografia:** display serifada dramática, números em tamanho grande.
- **Layout:** grid assimétrico, antes/depois tratados como peça de galeria,
  legendas em caixa-alta espaçada.
- **Sensação-alvo:** o especialista referência de Recife.
- **Risco declarado:** o escuro pode soar frio para quem busca acolhimento, e as
  fotos clínicas de antes/depois ficam cruas sobre fundo escuro.

### Direção C — "Acolhimento Humano"
**Referências:** Madison Park Family Dentistry, Thrive Family Dental, Heritage House.

- **Paleta:** extraída das cores reais da recepção dele — cinza-azulado, madeira clara,
  terracota suave, dourado; azul-petróleo como acento estrutural.
- **Tipografia:** sans humanista, cantos arredondados generosos, cards suaves.
- **Layout:** mais denso em conteúdo tranquilizador; quiz e FAQ ganham peso.
- **Sensação-alvo:** "esse dentista é gente boa, não tenho medo dele."
- **Risco declarado:** menos premium; pode não sustentar percepção de ticket alto.

---

## 6. Requisitos técnicos

### Estrutura
```
adzo-pereira/
├── public/
│   ├── img/              # fotos otimizadas (webp + fallback)
│   ├── favicon.svg
│   └── og-image.jpg
├── src/
│   ├── components/       # um componente por seção
│   ├── layouts/
│   │   └── Base.astro
│   ├── pages/
│   │   ├── index.astro         # fase protótipo: índice com as 3 direções
│   │   │                       # fase final: a direção escolhida
│   │   └── prototipo/
│   │       ├── a.astro         # Direção A
│   │       ├── b.astro         # Direção B
│   │       └── c.astro         # Direção C
│   ├── data/
│   │   ├── site.ts       # ÚNICA fonte de conteúdo (textos, serviços, FAQ)
│   │   └── palettes.ts   # ÚNICA fonte das paletas e fontes das 3 direções
│   ├── lib/
│   │   ├── whatsapp.ts   # ÚNICO lugar com o número; monta os links por origem
│   │   └── contrast.ts   # razão de contraste WCAG, usada no teste das paletas
│   └── styles/
│       └── global.css    # reset e utilitários; tokens vêm de palettes.ts
├── docs/superpowers/specs/
└── astro.config.mjs
```

**Regra de arquitetura — o que é compartilhado e o que não é:**

- **Conteúdo (`src/data/site.ts`): 100% compartilhado.** Textos, número de WhatsApp,
  lista de tratamentos, perguntas do FAQ, sintomas do quiz. Nenhuma direção tem
  texto próprio. Corrigir uma vírgula corrige nas três.
- **Ordem e presença das seções: 100% compartilhada.** As três direções têm as
  mesmas 12 seções da §3, na mesma ordem.
- **Cor, tipografia, raio, sombra, escala de espaçamento: por direção**, declaradas
  em `src/data/palettes.ts` e emitidas como CSS custom properties pelo layout base.
  É aqui que mora a maior parte da diferença. Manter as paletas em TypeScript — e não
  em arquivos CSS — permite que o mesmo objeto alimente os tokens da página, o teste
  automático de contraste AA e as amostras de cor da apresentação ao cliente.
- **Layout interno de seção: por direção quando necessário.** As direções B e C
  não são reskins da A — B usa grid assimétrico no hero e nos resultados, C usa
  cards mais densos no quiz e no FAQ. Onde a estrutura realmente muda, o componente
  aceita uma prop `variant` (`'a' | 'b' | 'c'`) e ramifica **só o markup daquela
  seção**. Onde não muda, não existe ramificação.

O objetivo dessa regra é que as 3 opções nunca divirjam em conteúdo, e que a
escolha final do cliente seja fixar um `variant` e um arquivo de tokens — não
reescrever a página.

### Performance
- Lighthouse ≥ 95 em Performance, Acessibilidade, Best Practices e SEO no **mobile**.
- Zero JS de framework. JS manual apenas em: acordeão do FAQ (nativo, sem JS),
  quiz e visibilidade do botão flutuante. Total estimado < 5 KB.
- Imagens servidas em WebP, dimensionadas, `loading="lazy"` fora da primeira dobra.
- Fontes auto-hospedadas com `font-display: swap` e `preload` na fonte do título.
- Orçamento: LCP < 2,0 s em 4G simulado. O público está em rede móvel.

### Acessibilidade
- Contraste mínimo AA (4.5:1 em texto corrido). **A Direção B precisa ser validada
  explicitamente** por causa do fundo escuro.
- Navegação completa por teclado; acordeão e quiz com `aria-expanded` / `aria-controls`.
- Todas as imagens com `alt` descritivo em pt-BR.
- Respeitar `prefers-reduced-motion` — as animações de entrada são desligadas.
- Alvos de toque ≥ 44 px.

### SEO local
- `<title>` e meta description mirando "endodontista Recife" / "tratamento de canal Recife".
- Schema.org `Dentist` em JSON-LD: nome, especialidade, telefone, endereço,
  horário de funcionamento, `sameAs` do Instagram.
- Open Graph e Twitter Card — o link será colado em WhatsApp e Instagram, então o
  preview precisa estar correto.
- `sitemap.xml` e `robots.txt`.
- URL canônica.

### Mobile-first
O tráfego virá do link da bio do Instagram: **estimar > 90% mobile**. Todo layout é
desenhado primeiro em 375 px e depois expandido.

---

## 7. Conformidade — publicidade odontológica (CFO)

O Código de Ética Odontológica restringe publicidade. O site precisa respeitar:

- **CRO-PE 15853 visível** e nome do responsável técnico.
- **Antes/depois:** autorização de uso de imagem dos pacientes **confirmada pelo
  cliente em 2026-09-08**. As fotos serão publicadas mesmo assim **sem identificação
  do paciente** (apenas o enquadramento intraoral já existente, sem rosto, nome ou
  qualquer dado) e apresentadas como registro clínico, não como promessa de resultado.
  A seção está liberada.
- **Sem promessa de resultado**, sem "melhor de Recife", sem superlativo comparativo.
- **Sem tabela de preços** e sem promoção/desconto.
- **O quiz não diagnostica.** Texto obrigatório junto ao resultado: o teste é
  orientativo e não substitui avaliação clínica.

---

## 8. Conteúdo pendente do cliente

Estes itens entram como **placeholder marcado** no protótipo e precisam ser
substituídos antes do site ir ao ar:

- [ ] Endereço completo do consultório
- [ ] Horários de atendimento
- [ ] Ano de formatura / instituição / tempo de atuação
- [ ] Depoimentos de pacientes (com autorização)
- [x] ~~Autorização de uso de imagem para as fotos de antes/depois~~ — confirmada 2026-09-08
- [ ] Domínio próprio desejado
- [ ] Confirmação da lista de tratamentos oferecidos
- [ ] Logo em vetor (SVG/AI) — hoje só existe em marca-d'água de JPG

---

## 9. Entregáveis

1. **Repositório** `github.com/victorfarias32/adzo-pereira`, público, Astro configurado.
2. **Protótipo navegável** com as 3 direções em `/prototipo/a`, `/prototipo/b`, `/prototipo/c`,
   publicado no GitHub Pages em `https://victorfarias32.github.io/adzo-pereira/`.
3. **Apresentação em Artifact** — as 3 direções lado a lado com paleta, tipografia,
   justificativa e link para cada protótipo. Link colável no WhatsApp do Adzo.
4. **Site final** na direção escolhida, após decisão do cliente e entrega do conteúdo pendente.

---

## 10. Fora de escopo

- Agendamento online / integração com agenda
- Área do paciente, login
- Blog e CMS
- Pagamento online
- Múltiplos idiomas
- Chatbot
