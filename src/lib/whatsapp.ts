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
  flutuante:
    'Olá, Dr. Adzo! Estava navegando no site e quero agendar uma avaliação.',
  hero: 'Olá, Dr. Adzo! Vim pelo site e quero marcar uma consulta.',
  urgencia:
    'Olá, Dr. Adzo! Estou com dor de dente e preciso de atendimento com urgência.',
  faq: 'Olá, Dr. Adzo! Li as perguntas frequentes do site e ficou uma dúvida.',
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
