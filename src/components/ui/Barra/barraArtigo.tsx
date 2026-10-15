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
    <div className="flex items-end justify-between gap-4 pb-2">
      <div className="my-2 flex flex-col items-start sm:flex-row sm:items-center sm:gap-2">
        <span className="font-manrope text-[13px] text-(--tinta-3)">
          Exibindo:
        </span>

        <div className="flex min-w-0 items-center gap-3">
          <span className="text-primaria-hover flex min-w-0 max-w-[180px] items-center gap-2 rounded-full border border-(--color-primaria) px-2 py-1 text-[12px] font-medium min-[550px]:max-w-none">
            <span
              aria-hidden="true"
              className="h-2 w-2 shrink-0 rounded-full bg-(--color-primaria)"
            />

            <span className="min-w-0 truncate min-[550px]:overflow-visible min-[550px]:text-clip min-[550px]:whitespace-nowrap">
              {filtro}
            </span>

            {podeLimpar && (
              <button
                type="button"
                onClick={aoLimpar}
                aria-label={`Remover filtro ${filtro}`}
                className="shrink-0"
              >
                <X aria-hidden="true" className="h-3 w-3" />
              </button>
            )}
          </span>

          <span className="font-mono-jb flex shrink-0 items-center gap-1 text-center text-[11px] text-(--tinta-3) max-[430px]:flex-col max-[430px]:gap-0">
            <span>{insight}</span>
            <span className="max-[430px]:leading-tight">artigos</span>
          </span>
        </div>
      </div>

      <div className="my-2 min-w-0">
        <SeletorOrdenacao valor={ordenacao} aoMudar={aoMudarOrdenacao} />
      </div>
    </div>
  );
}
