import type { Artigo } from "@/types/artigo";

export const artigos: Artigo[] = [
  {
    id: "1",
    titulo:
      "Modelos de visão multimodais superam radiologistas em detecção precoce de cancêr de mama em mamografias",
    resumo:
    "Estudo com 92 mil exames mostra que sistema de IA combinando imagem e histórico clínico atinge sensibilidade de 94,3%, contra 88,1% de seniores",
    url: "https://radar-ia.com/artigo-1",
    fonte: "nature-med",
    tipo: "paper",
    idioma: "en",
    dataPublicacao: "2026-05-15T00:00:00.000Z",
    segmento: "saude",
    tendencia: "diagnostico-imagem",
    maturidade: "consolidada",
    relevancia: 95,
  },
  {
    id: "2",
    titulo: "Universidades testam correção automática de redações",
    resumo:
      "Três instituições paulistas usam modelos de linguagem para dar feedback preliminar em provas dissertativas.",
    url: "https://radar-ia.com/artigo-2",
    fonte: "folha-sp",
    tipo: "noticia",
    idioma: "pt",
    dataPublicacao: "2026-09-30T00:00:00.000Z",
    segmento: "educacao",
    tendencia: "avaliacao-auto",
    maturidade: "emergente",
    relevancia: 81,
  },
  {
    id: "3",
    titulo: "Plataformas de ensino adotam avaliação contínua com IA",
    resumo:
      "Relatório mapeia como empresas de educação usam modelos para acompanhar o progresso dos alunos em tempo real.",
    url: "https://radar-ia.com/artigo-3",
    fonte: "mit",
    tipo: "relatorio",
    idioma: "en",
    dataPublicacao: "2026-08-02T00:00:00.000Z",
    segmento: "educacao",
    tendencia: "avaliacao-auto",
    maturidade: "consolidada",
    relevancia: 67,
  },
]