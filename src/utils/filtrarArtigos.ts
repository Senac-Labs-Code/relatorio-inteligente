import type { Artigo } from '@/types/artigo';
import type { Ordenacao } from '@/types/filtro';

export function filtrarPorSegmento(artigos: Artigo[], segmento: string): Artigo[] {
  if (segmento === 'todos') return artigos;
  return artigos.filter((artigo) => artigo.segmento === segmento);
}

export function ordenarArtigos(artigos: Artigo[], ordenacao: Ordenacao): Artigo[] {
  const copia = [...artigos];

  switch (ordenacao) {
    case 'relevancia':
      return copia.sort((a, b) => b.relevancia - a.relevancia);

    case 'recentes':
      return copia.sort(
        (a, b) =>
          new Date(b.dataPublicacao).getTime() - new Date(a.dataPublicacao).getTime(),
      );

    default:
      // 'citados' e 'impacto' ainda não têm campo no Artigo
      return copia;
  }
}