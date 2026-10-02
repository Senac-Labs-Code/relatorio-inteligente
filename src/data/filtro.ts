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
      { id: "tipo-1", texto: "Notícia", total: 512 },
      { id: "tipo-2", texto: "Paper acadêmico", total: 318 },
      { id: "tipo-3", texto: "Relatório setorial", total: 156 },
      { id: "tipo-4", texto: "Caso de uso", total: 261 },
    ],
  },
  {
    id: "fontes",
    texto: "FONTES UTILIZADAS",
    itens: [
      { id: "fontes-1", texto: "Natural Medicine", total: 14 },
      { id: "fontes-2", texto: "Folha de S.Paulo", total: 82 },
      { id: "fontes-3", texto: "MIT Sloan Review", total: 35 },
      { id: "fontes-4", texto: "Panrotas", total: 19 },
      { id: "fontes-5", texto: "Revista Pesquisa Fapesp", total: 28 },
      { id: "fontes-6", texto: "Valor Econômico", total: 94 },
      { id: "fontes-7", texto: "Meio & Mensagem", total: 27 },
      { id: "fontes-8", texto: "Eater", total: 12 },
      { id: "fontes-9", texto: "Food Network", total: 9 },
    ],
  },
  {
    id: "periodo",
    texto: "PERÍODO",
    itens: [
      { id: "periodo-1", texto: "Últimas 24h", total: 42 },
      { id: "periodo-2", texto: "Últimos 7 dias", total: 198 },
      { id: "periodo-3", texto: "Últimos 30 dias", total: 724 },
      { id: "periodo-4", texto: "Últimos 90 dias", total: 1247 },
    ],
  },
  {
    id: "idioma",
    texto: "IDIOMA",
    itens: [
      { id: "idioma-1", texto: "Português", total: 683 },
      { id: "idioma-2", texto: "Inglês", total: 521 },
      { id: "idioma-3", texto: "Espanhol", total: 43 },
    ],
  },
  {
    id: "tendencia",
    texto: "MATURIDADE DA TENDÊNCIA",
    itens: [
      { id: "tendencia-1", texto: "Emergente", total: 312 },
      { id: "tendencia-2", texto: "Em crrescimento", total: 498 },
      { id: "tendencia-3", texto: "Consolidada", total: 437 },
    ],
  },
  {
    id: "relevancia",
    texto: "RELEVÂNCIA PEDAGÓGICA",
    itens: [
      { id: "relevancia-1", texto: "Alta • usar em curso", total: 198 },
      { id: "relevancia-2", texto: "Média • acompanhar", total: 543 },
      { id: "relevancia-3", texto: "Baixa • monitorar", total: 518 },
    ],
  },
];
