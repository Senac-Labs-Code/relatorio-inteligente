import SeletorOrdenacao from "../Filtro/ordernarFiltro";
import type { Ordenacao } from "@/types/filtro";
import { X } from "lucide-react";

interface BarraArtigoProps {
  filtro: string;
  insight: number;
  ordenacao: Ordenacao;
  aoMudarOrdenacao: (valor: Ordenacao) => void;
  podeLimpar: boolean;
  aoLimpar: () => void;
}

export default function BarraArtigo({
  filtro,
  insight,
  ordenacao,
  aoMudarOrdenacao,
  podeLimpar,
  aoLimpar,
}: BarraArtigoProps) {
  return (
    <div className="flex items-end justify-between gap-10">
      <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-2">
        <span className="font-manrope text-[13px] text-(--tinta-3)">
          Exibindo:
        </span>

        <div className="flex items-center gap-3">
          <span className="text-primaria-hover flex items-center gap-2 rounded-full border border-(--color-primaria) px-4 py-1 text-[12px] font-medium">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-(--color-primaria)"
            />
            {filtro}

            {podeLimpar && (
              <button
                type="button"
                onClick={aoLimpar}
                aria-label={`Remover filtro ${filtro}`}
              >
                <X aria-hidden="true" className="h-3 w-3" />
              </button>
            )}
          </span>

          <span className="font-mono-jb text-center text-[11px] text-(--tinta-3)">
            {insight} artigos
          </span>
        </div>
      </div>

      <SeletorOrdenacao valor={ordenacao} aoMudar={aoMudarOrdenacao} />
    </div>
  );
}
