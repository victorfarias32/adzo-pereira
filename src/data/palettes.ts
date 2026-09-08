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
