import { Segmento, Ordenacao } from "@/types/filtro";
import { FiltroCheck, GrupoFiltroCheck } from "@/types/check"

export const opcoesOrdenacao: { valor: Ordenacao; texto: string }[] = [
  { valor: 'relevancia', texto: 'Relevância' },
  { valor: 'recentes', texto: 'Mais recentes' },
  { valor: 'citados', texto: 'Mais citados' },
  { valor: 'impacto', texto: 'Maior impacto' },
];

export const filtragem: Segmento[] = [
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
    id: "ti",
    texto: "TI",
    insight: 156,
    tendencia: [
      { id: "recomendacao-inteligente", texto: "Recomendação Inteligente" },
      { id: "forecasting-demanda", texto: "Forecasting de Demanda" },
    ],
  },
  {
    id: "gestao-comercio",
    texto: "Gestão e Comércio",
    insight: 224,
    tendencia: [
      { id: "agentes-autonomos", texto: "Agentes Autônomos" },
      { id: "analise-preditiva", texto: "Análise Preditiva" },
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
      { id: "otimizacao-operacional", texto: "Otimização Operacional" },
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

export const filtragemCheck: GrupoFiltroCheck[] = [
  {
    id: "tipo",
    texto: "TIPO DE FONTE",
    itens: [
      { id: "noticia", texto: "Notícia", total: 512 },
      { id: "paper", texto: "Paper acadêmico", total: 318 },
      { id: "relatorio", texto: "Relatório setorial", total: 156 },
      { id: "caso", texto: "Caso de uso", total: 261 },
    ],
  },
  {
    id: "fontes",
    texto: "FONTES UTILIZADAS",
    itens: [
      { id: "nature-med", texto: "Nature Medicine", total: 14 },
      { id: "folha-sp", texto: "Folha de S.Paulo", total: 82 },
      { id: "mit", texto: "MIT Sloan Review", total: 35 },
      { id: "panrotas", texto: "Panrotas", total: 19 },
      { id: "fapesp", texto: "Revista Pesquisa Fapesp", total: 28 },
      { id: "economico", texto: "Valor Econômico", total: 94 },
      { id: "meio-msg", texto: "Meio & Mensagem", total: 27 },
      { id: "eater", texto: "Eater", total: 12 },
      { id: "food", texto: "Food Network", total: 9 },
    ],
  },
  {
    id: "periodo",
    texto: "PERÍODO",
    itens: [
      { id: "24h", texto: "Últimas 24h", total: 42 },
      { id: "7d", texto: "Últimos 7 dias", total: 198 },
      { id: "30d", texto: "Últimos 30 dias", total: 724 },
      { id: "90d", texto: "Últimos 90 dias", total: 1247 },
    ],
  },
  {
    id: "idioma",
    texto: "IDIOMA",
    itens: [
      { id: "pt", texto: "Português", total: 683 },
      { id: "en", texto: "Inglês", total: 521 },
      { id: "es", texto: "Espanhol", total: 43 },
    ],
  },
  {
    id: "maturidade",
    texto: "MATURIDADE DA TENDÊNCIA",
    itens: [
      { id: "emergente", texto: "Emergente", total: 312 },
      { id: "crescimento", texto: "Em crescimento", total: 498 },
      { id: "consolidada", texto: "Consolidada", total: 437 },
    ],
  },
  {
    id: "relevancia",
    texto: "RELEVÂNCIA PEDAGÓGICA",
    itens: [
      { id: "alta", texto: "Alta • usar em curso", total: 198 },
      { id: "media", texto: "Média • acompanhar", total: 543 },
      { id: "baixa", texto: "Baixa • monitorar", total: 518 },
    ],
  },
];
