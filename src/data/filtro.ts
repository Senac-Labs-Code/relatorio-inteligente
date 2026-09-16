import { Filtro } from "@/types/filtro";

export const filtragem: Filtro[] = [
  { id: "todos", texto: "Todos os segmentos", insight: 0, tendencia: [] },
  {
    id: "saude",
    texto: "Saúde",
    insight: 187,
    tendencia: [
      { id: "diagnostico-imagem", texto: "Diagnóstico por Imagem" },
      { id: "med-preditiva", texto: "Medicina Preditiva" },
    ],
  },
  {
    id: "gestao-comercio",
    texto: "Gestão e Comércio",
    insight: 224,
    tendencia: [
      { id: "agente-autonomos", texto: "Agentes Autônomos" },
      { id: "analise-preditiva", texto: "Análise Preditiva" },
    ],
  },
  {
    id: "ti",
    texto: "TI",
    insight: 156,
    tendencia: [
      { id: "recomendacao-inteligente", texto: "Recomendação Inteligente" },
      { id: "forecasting-demanda", texto: "Forecasting de Demanda" },
    ],
  },
  {
    id: "educacao",
    texto: "Educação",
    insight: 198,
    tendencia: [
      { id: "tutores-adaptativos", texto: "Tutores Adaptativos" },
      { id: "avaliacao-auto", texto: "Avaliação Automatizada" },
    ],
  },
  {
    id: "idiomas",
    texto: "Idiomas",
    insight: 142,
    tendencia: [
      { id: "manutencao-preditiva", texto: "Manutenção Preditiva" },
      { id: "visao-computacional", texto: "Visão Computacional" },
    ],
  },
  {
    id: "comunicacao-artes-design",
    texto: "Comunicação, Artes e Design",
    insight: 112,
    tendencia: [
      { id: "conteudo-generativo", texto: "Conteúdo Generativo" },
      { id: "analise-sentimento", texto: "Análise de Sentimento" },
    ],
  },
  {
    id: "gastronomia",
    texto: "Gastronomia",
    insight: 84,
    tendencia: [
      { id: "receita-generativa", texto: "Receitas Generativas" },
      { id: "otimizacao-operacaional", texto: "Otimização Operacional" },
    ],
  },
  {
    id: "turismo",
    texto: "Turismo",
    insight: 144,
    tendencia: [
      { id: "roteiro-personalizado", texto: "Roteiros Personalizados" },
      { id: "traducao-tempo-real", texto: "Tradução em Tempo Real" },
    ],
  },
];
