import { Artigo } from "@/types/artigo";
import { FiltroCheck } from "@/types/check";
import { ArtigoMetaTop } from "./artigoMetaTop";
import { nomeFonte } from '../../../utils/rotulos';
import { ArtigoChips } from "./ArtigoChips";
import { Chips } from "@/utils/chips";
import { Segmento } from "@/types/filtro";
import Divisor from '../Divisor/divisor'
import { TrendingUp } from 'lucide-react';


interface ArtigoCardProps {
	artigo: Artigo;
	fontes: FiltroCheck[];
	segmento: Segmento[];
};

export function ArtigoCard({ artigo, fontes, segmento }: ArtigoCardProps) {
	return (
		<div className="my-5">
			<ArtigoMetaTop 
			  fonte={nomeFonte(artigo.fonte, fontes)}
				tipo={artigo.tipo}
				idioma={artigo.idioma}
				dataPublicacao={artigo.dataPublicacao}
			/>

			{/* <Divisor variant="secaoMini" /> */}

			<div className="mb-3 flex items-start justify-between gap-4">
				<div className="min-w-0">
					<h3 className="text-[18px] text-(--color-texto-principal) font-manrope font-bold leading-5 pt-1"
					>
						{artigo.titulo}
					</h3>

					<p className="hidden sm:block text-[14px] text-(--color-texto-secundario) font-light line-clamp-1">
					{artigo.resumo}
				</p>
				</div>

				<span className="flex shrink-0 flex-col items-end">
					<TrendingUp className="size-5 text-(--azul-senac)"/>
					<strong className="leading-none font-manrope text-(--azul-senac-escuro) text-[22px] font-normal ">
						{artigo.relevancia}
					</strong>

					{/* <span className=" uppercase text-[9px]/2 text-(--tinta-3) tracking-wider font-mono-jb ">
						relevância
					</span> */}
				</span>
			</div>

			<ArtigoChips chips={Chips(artigo, segmento)}/>
		</div>
	)
}