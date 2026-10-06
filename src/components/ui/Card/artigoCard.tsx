import type { Idioma, TipoFonte } from '../../../types/artigo';
import { formatarDataPublicacao } from '../../../utils/formatarData';
import { rotuloTipo, siglaIdioma } from '../../../utils/rotulos';

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
    <div className="artigo-meta-top">
      <span className="source-tag" aria-hidden="true" />
      <span className="source">{fonte}</span>
      <Separador />
      <span className="type">{rotuloTipo(tipo)}</span>
      <Separador />
      <span className="lang">{siglaIdioma(idioma)}</span>
      <Separador />
      <time dateTime={dataPublicacao}>{formatarDataPublicacao(dataPublicacao)}</time>
    </div>
  );
}