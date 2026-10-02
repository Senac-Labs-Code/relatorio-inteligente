import { ChevronDown } from "lucide-react";
import { opcoesOrdenacao } from "@/data/filtro";
import type { Ordenacao } from "@/types/filtro";

interface SeletorOrdenacaoProps {
  valor: Ordenacao;
  aoMudar: (valor: Ordenacao) => void;
}

export default function SeletorOrdenacao({ valor, aoMudar }: SeletorOrdenacaoProps) {
  return (
    <div className="flex flex-col items-start min-w-0 max-w-full sm:flex-row sm:items-center sm:gap-2">
      <label
				htmlFor="ordenacao"
				className="text-(--tinta-4) opacity-90 font-manrope text-[13px]"
			>
				Ordenar:
			</label>

      <div className="relative  min-w-0 max-w-full">
        <select
          id="ordenacao"
          value={valor}
          onChange={(e) => aoMudar(e.target.value as Ordenacao)}
          className="appearance-none max-w-full truncate bg-[#F6FAFD] border border-[rgba(0,82,143,0.14)] rounded-sm pl-3 pr-8 h-7 text-(--tinta-2) font-manrope text-[13px]"
        >
          {opcoesOrdenacao.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.texto}
            </option>
          ))}
        </select>

        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2"
        />
      </div>
    </div>
  );
}