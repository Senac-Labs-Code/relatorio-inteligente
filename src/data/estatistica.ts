import type { Estatisticas } from "@/types/estatistica";

export const estatisticasMock: Estatisticas = {
  insightsAtivos: {
    valor: 1247,
    tendencia: "up",
    rotulo: "8.2% · 7 dias",
  },
  fontesMonitoradas: {
    valor: 386,
    tendencia: "up",
    rotulo: "12 novas",
  },
  tendenciasEmergentes: {
    valor: 23,
    tendencia: "up",
    rotulo: "4 esta semana",
  },
  segmentosCobertos: {
    valor: 8,
    tendencia: "neutral",
    rotulo: "estável",
  },
};
