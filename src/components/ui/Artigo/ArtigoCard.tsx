import { Artigo } from "@/types/artigo";
import { FiltroCheck } from "@/types/check";
import { ArtigoMetaTop } from "./artigoMetaTop";
import { nomeFonte } from "../../../utils/rotulos";
import { ArtigoChips } from "./ArtigoChips";
import { Chips } from "@/utils/chips";
import { Segmento } from "@/types/filtro";
import Divisor from "../Divisor/divisor";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import BotaoSalvar from "../Button/botaoSalvar";
import BotaoCompartilhar from "../Button/botaoCompartilhar";
import MenuAcoes from "../Menu/menuAcoes";

interface ArtigoCardProps {
  artigo: Artigo;
  fontes: FiltroCheck[];
  segmento: Segmento[];
	posicao: number;
}

export function ArtigoCard({ artigo, fontes, segmento, posicao }: ArtigoCardProps) {
  const [salvo, setSalvo] = useState(false);
	const numero = String(posicao).padStart(3, '0');

  function alterarSalvo() {
    setSalvo((atual) => {
      const novo = !atual;
      return novo;
    });
  }

  return (
    <div className="mt-5">
			<span className="font-mono-jb text-[10px] text-(--tinta-3) tracking-wider">
				Nº {numero}
			</span>

      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <ArtigoMetaTop
            fonte={nomeFonte(artigo.fonte, fontes)}
            tipo={artigo.tipo}
            idioma={artigo.idioma}
            dataPublicacao={artigo.dataPublicacao}
          />
        </div>

      	<div className="shrink-0 sm:hidden mb-2">
        	<MenuAcoes>
          	<BotaoSalvar salvo={salvo} aoAlterar={alterarSalvo} mostrarNome />
          	<BotaoCompartilhar url={artigo.url} mostrarNome />
        	</MenuAcoes>
      	</div>
      </div>

      {/* <Divisor variant="secaoMini" /> */}

      <div className="mb-3 min-w-0">
        <h3 className="font-manrope pt-1 text-[18px] leading-5 font-bold text-(--color-texto-principal)">
          {artigo.titulo}
        </h3>

        <p className="line-clamp-1 hidden text-[14px] font-light text-(--color-texto-secundario) sm:block">
          {artigo.resumo}
        </p>
      </div>

      {/* chips da notícia */}
			<div className="flex items-start justify-between gap-2">
      	<div className="min-w-0">
        	<ArtigoChips chips={Chips(artigo, segmento)} />
      	</div>

				<div className="hidden shrink-0 items-center gap-2 sm:flex">
					<BotaoSalvar salvo={salvo} aoAlterar={alterarSalvo} />
					<BotaoCompartilhar url={artigo.url} />
				</div>
			</div>


      {/* relevância da notícia */}
      {/* <div className="mt-4 flex items-center gap-2">
        <span className="flex items-center gap-1.5">
          <TrendingUp className="size-5 text-(--azul-senac)"/>
          <strong className="font-manrope text-[22px] leading-none font-normal text-(--azul-senac-escuro)">
            {artigo.relevancia}
          </strong>

          <span className="font-mono-jb mt-2 text-[9px]/2 tracking-wider text-(--tinta-3) uppercase">
            relevância
          </span>
        </span>
      </div> */}


    </div>
  );
}
