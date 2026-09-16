export interface Tendencia {
  id: string;
  texto: string;
}

export interface Filtro {
  id: string;
  texto: string;
  insight: number;
  tendencia: Tendencia[];
}
