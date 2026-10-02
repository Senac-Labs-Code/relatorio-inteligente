import BolinhaStatus from "../bolinhaStatus";
import Divisor from "../Divisor/divisor";

interface BarraStatusProps {
  dataAtualizacao: string;
  horaAtualizacao: string;
  edicao: number;
}

export default function BarraStatus({
  dataAtualizacao,
  horaAtualizacao,
  edicao,
}: BarraStatusProps) {
  return (
    <div className="flex flex-nowrap gap-3 py-2">
      <BolinhaStatus />

      <span className="font-mono-jb text-center text-[11px] tracking-[1px] text-(--tinta-3)">
        ATUALIZADO • {dataAtualizacao} • {horaAtualizacao}
      </span>

      <Divisor variant="filtro" />

      <span className="font-mono-jb text-center text-[11px] tracking-[1px] text-(--tinta-3)">
        EDIÇÃO #{edicao}
      </span>

      <Divisor variant="filtro" />

      <span className="font-mono-jb text-center text-[11px] tracking-[1px] text-(--tinta-3)">
        CURADORIA IA + VALIDAÇÃO HUMANA
      </span>
    </div>
  );
}
