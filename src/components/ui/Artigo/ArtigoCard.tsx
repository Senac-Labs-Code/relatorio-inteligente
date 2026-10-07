import { Artigo } from "@/types/artigo";
import { FiltroCheck } from "@/types/check";
import { ArtigoMetaTop } from "./artigoMetaTop";
import { nomeFonte } from '../../../utils/rotulos';
import { ArtigoChips } from "./ArtigoChips";
import { Chips } from "@/utils/chips";
import { Segmento } from "@/types/filtro";


interface ArtigoCardProps {
	artigo: Artigo;
	fontes: FiltroCheck[];
	segmento: Segmento[];
};

export function ArtigoCard({ artigo, fontes, segmento }: ArtigoCardProps) {
	return (
		<div>
			<ArtigoMetaTop 
			  fonte={nomeFonte(artigo.fonte, fontes)}
				tipo={artigo.tipo}
				idioma={artigo.idioma}
				dataPublicacao={artigo.dataPublicacao}
			/>

			<h3 className="text-[18px] text-(--color-texto-principal) font-manrope font-bold leading-5 pt-1"
			>
				{artigo.titulo}
			</h3>
			<p className="hidden sm:block text-[14px] text-(--color-texto-secundario) font-light line-clamp-1">
				{artigo.resumo}
			</p>

			<ArtigoChips chips={Chips(artigo, segmento)}/>
		</div>
	)
}