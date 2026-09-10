export interface Tratamento {
  id: string;
  nome: string;
  descricao: string;
  destaque: boolean;
  cta: string;
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

  header: {
    cta: 'Agendar avaliação',
  },

  /** Textos de moldura de seção (olho, título, CTA, rótulos) para seções cujo
   *  namespace principal já é ocupado por outra coisa (ex.: um array de itens)
   *  ou que não tinham campo próprio para esse texto. */
  secoes: {
    tratamentos: {
      olho: 'O que eu faço',
      titulo: 'Tratamentos',
    },
    resultados: {
      olho: 'Casos',
      ariaLabel: 'Galeria de casos clínicos',
    },
    sobre: {
      olho: 'Sobre',
      rotulos: {
        registro: 'Registro',
        atuacao: 'Atuação',
        formacao: 'Formação',
      },
    },
    primeiraConsulta: {
      olho: 'Sem surpresa',
    },
    faq: {
      olho: 'Perguntas frequentes',
      titulo: 'O que as pessoas mais me perguntam',
      mais: 'Ficou outra dúvida?',
      cta: 'Me pergunte no WhatsApp',
    },
    localizacao: {
      olho: 'Onde me encontrar',
      rotulos: {
        endereco: 'Endereço',
        horarios: 'Horários',
        cidade: 'Cidade',
      },
      cta: 'Combinar um horário',
      mapaTitulo: 'Mapa do consultório',
    },
    rodape: {
      ariaLabel: 'Links do rodapé',
      instagramLabel: 'Instagram',
      whatsappLabel: 'WhatsApp',
      direitos: 'Todos os direitos reservados.',
      responsavelTecnico: 'Responsável técnico:',
    },
    whatsFlutuante: {
      ariaLabel: 'Falar com o Dr. Adzo no WhatsApp',
    },
  },

  hero: {
    titulo: 'Tratamento de canal com anestesia e explicação clara, por quem é especialista.',
    subtitulo:
      'Atendimento em Recife com foco em endodontia. Avaliação cuidadosa, explicação clara do que você tem e do que vai ser feito — antes de começar.',
    ctaPrimario: 'Falar no WhatsApp',
    ctaSecundario: 'Ver tratamentos',
    alt: 'Dr. Adzo Pereira, cirurgião-dentista, no consultório',
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
        'Remoção da polpa inflamada ou infectada, limpeza e selamento do canal. Feito sob anestesia, com acompanhamento cuidadoso em cada etapa.',
      destaque: true,
      cta: 'Falar sobre tratamento de canal',
    },
    {
      id: 'retratamento',
      nome: 'Retratamento Endodôntico',
      descricao:
        'Para dentes que já passaram por canal e voltaram a incomodar. Reabertura, nova limpeza e novo selamento do sistema de canais.',
      destaque: false,
      cta: 'Falar sobre retratamento endodôntico',
    },
    {
      id: 'urgencia',
      nome: 'Urgência e Dor de Dente',
      descricao:
        'Atendimento para quadros de dor aguda. O foco é aliviar a dor primeiro e planejar o tratamento em seguida.',
      destaque: false,
      cta: 'Falar sobre urgência e dor de dente',
    },
    {
      id: 'clareamento',
      nome: 'Clareamento Dental',
      descricao:
        'Clareamento supervisionado, avaliado conforme o tipo de mancha antes de indicar o procedimento.',
      destaque: false,
      cta: 'Falar sobre clareamento dental',
    },
    {
      id: 'restauracao',
      nome: 'Restauração',
      descricao:
        'Devolve forma e função ao dente com resina, respeitando a cor e a anatomia original. Indicada após cárie, fratura ou desgaste.',
      destaque: false,
      cta: 'Falar sobre restauração dentária',
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
      'Sou o Adzo, cirurgião-dentista com especialização em endodontia, e atendo em Recife. Trabalho com um princípio simples: você entende o que está acontecendo com o seu dente antes de qualquer coisa ser feita. Explico o diagnóstico e só então falamos sobre tratamento.',
    formacao: '[[PENDENTE]] formação e ano de conclusão',
    alt: 'Dr. Adzo Pereira, cirurgião-dentista, no consultório',
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
        titulo: 'Avaliação no consultório',
        texto:
          'Eu examino o dente com calma e te explico exatamente qual é a situação, antes de decidirmos qualquer coisa.',
      },
      {
        numero: '03',
        titulo: 'Você sabe o valor antes de começar',
        texto:
          'Combinamos o valor com você antes de qualquer procedimento começar. Sem surpresa.',
      },
    ],
  },

  faq: [
    {
      pergunta: 'Tratamento de canal dói?',
      resposta:
        'O procedimento é feito sob anestesia local, então durante o tratamento você não deve sentir dor. O que dói é o dente inflamado antes do tratamento — o canal é justamente o que resolve isso. Algum incômodo nos primeiros dias depois é normal.',
    },
    {
      pergunta: 'Quantas sessões são necessárias?',
      resposta:
        'Depende do dente e do quadro clínico. Isso é avaliado e combinado com você antes de qualquer procedimento começar.',
    },
    {
      pergunta: 'Quanto custa um tratamento de canal?',
      resposta:
        'O valor depende de qual dente é e da complexidade do caso, então não existe preço único. Na avaliação eu fecho o valor com você antes de iniciar qualquer procedimento — você não começa sem saber.',
    },
    {
      pergunta: 'Você atende convênio?',
      resposta: '[[PENDENTE]] confirmar convênios atendidos com o Dr. Adzo.',
    },
    {
      pergunta: 'Estou com muita dor hoje. Consigo ser atendido?',
      resposta:
        'Me chame no WhatsApp explicando a situação que eu vejo a primeira janela possível na agenda.',
    },
    {
      pergunta: 'Preciso levar alguma coisa na primeira consulta?',
      resposta:
        'Se você tiver, traga radiografias ou laudos de tratamentos anteriores no mesmo dente. Se não tiver, sem problema — a gente resolve na consulta.',
    },
  ] as ItemFaq[],

  localizacao: {
    titulo: 'Onde fica o consultório',
    endereco: '[[PENDENTE]] endereço completo',
    horarios: '[[PENDENTE]] horários de atendimento',
    mapaEmbed: '[[PENDENTE]] URL de embed do Google Maps',
    alt: 'Recepção do consultório do Dr. Adzo Pereira',
  },

  /** Caminhos dentro deste objeto que ainda dependem de informação do cliente (spec §8). */
  pendentes: [
    'sobre.formacao',
    'faq.3.resposta',
    'localizacao.endereco',
    'localizacao.horarios',
    'localizacao.mapaEmbed',
  ],

  /** Conteúdo ainda pendente do cliente que não existe como caminho neste objeto. */
  pendentesExternos: ['depoimentos', 'logo em vetor'],
};

/**
 * Deriva se ainda existe conteúdo pendente do cliente a partir do próprio
 * conteúdo serializado — nunca de uma flag mantida à mão, que é exatamente
 * o tipo de coisa que alguém esquece de desligar. Aceita um parâmetro
 * opcional (em vez de sempre ler `site`) para permitir testar os dois
 * estados — pendente e completo — sem precisar mutar o objeto real.
 */
export function temConteudoPendente(dados: unknown = site): boolean {
  return JSON.stringify(dados).includes('[[PENDENTE]]');
}
