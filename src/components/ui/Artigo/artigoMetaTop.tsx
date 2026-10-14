import type { Idioma, TipoFonte } from '../../../types/artigo';
import { formatarDataPublicacao } from '../../../utils/formatarData';
import { rotuloTipo, siglaIdioma } from '../../../utils/rotulos';
import Divisor from '../Divisor/divisor';

interface ArticleMetaTopProps {
  fonte: string;
  tipo: TipoFonte;
  idioma: Idioma;
  dataPublicacao: string;
}

function Separador() {
  return <span aria-hidden="true">·</span>;
}

export function ArtigoMetaTop({ fonte, tipo, idioma, dataPublicacao }: ArticleMetaTopProps) {
  return (
    <div className="flex items-center gap-1 mb-2">
      <span className="h-1 w-1 shrink-0 rounded-full bg-(--color-primaria) mr-1" aria-hidden="true"  />
      <span className="font-mono-jb box-border text-center text-[10px] text-(-tinta-2) tracking-wide font-semibold uppercase">
        {fonte}
      </span>
      <Divisor variant='ponto' />
      <span className="font-mono-jb text-[10px] text-[#17415f] tracking-wide uppercase">{rotuloTipo(tipo)}</span>
      <Divisor variant='ponto' />
      <span className="text-(--tinta-2) text-[10px] font-mono-jb tracking-wide bg-(--azul-senac-suave)/35 px-1">
        {siglaIdioma(idioma)}
      </span>
      <Divisor variant='ponto' />
      <time
        className="text-[10px] text-(--tinta-3) text-center font-mono-jb tracking-wide uppercase"
        dateTime={dataPublicacao}
      >
        {formatarDataPublicacao(dataPublicacao)}
      </time>
    </div>
  );
}