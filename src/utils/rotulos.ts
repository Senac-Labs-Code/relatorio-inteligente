import { idiomas, maturidade, tipos_fontes } from '../constants/artigo';
import type { Idioma, Maturidade, TipoFonte } from '../types/artigo';
import type { FiltroCheck } from '../types/check';

export function rotuloTipo(chave: TipoFonte): string {
  return tipos_fontes.find((t) => t.chave === chave)?.curto ?? chave;
}

export function siglaIdioma(chave: Idioma): string {
  return idiomas.find((i) => i.chave === chave)?.curto ?? chave;
}

export function rotuloMaturidade(chave: Maturidade): string {
  return maturidade.find((m) => m.chave === chave)?.filtro ?? chave;
}

export function nomeFonte(id: string, fontes: FiltroCheck[]): string {
  return fontes.find((f) => f.id === id)?.texto ?? id;
}