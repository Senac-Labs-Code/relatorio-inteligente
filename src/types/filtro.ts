export interface Tendencia {
  id: string;
  texto: string;
}

export interface Segmento {
  id: string;
  texto: string;
  insight: number;
  tendencia: Tendencia[];
}

export type Ordenacao = 'relevancia' | 'recentes' | 'citados' | 'impacto';