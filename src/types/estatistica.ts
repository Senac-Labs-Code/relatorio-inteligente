export type Tendencia = "up" | "neutral" | "down";

export interface DadosEstatisticas {
  valor: number;
  tendencia: Tendencia;
  rotulo: string;
}

export interface Estatisticas {
  insightsAtivos: DadosEstatisticas;
  fontesMonitoradas: DadosEstatisticas;
  tendenciasEmergentes: DadosEstatisticas;
  segmentosCobertos: DadosEstatisticas;
}
