import type { idiomas, maturidade, tipos_fontes } from '../constants/artigo';

export type TipoFonte = (typeof tipos_fontes)[number]['chave'];
export type Idioma = (typeof idiomas)[number]['chave'];
export type Maturidade = (typeof maturidade)[number]['chave'];

export interface Artigo {
	id: string;
	titulo: string;
	resumo: string;
	url: string;
	fonte: string;
	tipo: TipoFonte;
	idioma: Idioma;
	dataPublicacao: string;
	segmento: string;
	tendencia: string;
	maturidade: Maturidade;
	relevancia: number;
}
