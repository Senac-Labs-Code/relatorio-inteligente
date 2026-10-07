import { Artigo, Chip } from "@/types/artigo";
import { Segmento } from "@/types/filtro";
import { rotuloMaturidade } from "./rotulos";

export function Chips(artigo: Artigo, segmentos: Segmento[]): Chip[] {
  const segmento = segmentos.find((s) => s.id === artigo.segmento);
	const tendencia = segmento?.tendencia.find((t) => t.id === artigo.tendencia);

	const chips: Chip[] = [];

	if (segmento) {
		chips.push({ id: segmento.id, texto: segmento.texto, categoria: 'segmento' });
	};

	if (tendencia) {
		chips.push({ id: tendencia.id, texto: tendencia.texto, categoria: 'tendencia' });
	};

	chips.push({
		id: artigo.maturidade,
		texto: rotuloMaturidade(artigo.maturidade),
		categoria: 'maturidade'
	});

	return chips;
}