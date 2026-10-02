import type { DadosEstatisticas, Tendencia } from "@/types/estatistica";

const tendenciaStyle: Record<Tendencia, { simbolo: string; cor: string }> = {
  up: { simbolo: "▲", cor: "text-(--verde-destaque)"},
  neutral: {simbolo: "—", cor: "text-(--vermelho-destaque)"},
  down: { simbolo: "▼", cor: "text-(--vermelho-destaque)"},
};

// adicionar quando for criar o card do mapa de tendencias 
const layout = {};

interface CardEstatisticasProps {
  titulo: string;
  dado: DadosEstatisticas;
  variante?: keyof typeof layout;
}

export default function CardEstatisticas({
  titulo,
  dado,
}: CardEstatisticasProps) {
  const style = tendenciaStyle[dado.tendencia];

  return (
    <div className="flex flex-col gap-2 py-3 text-center">
      <span className="font-mono-jb text-center text-[11px] tracking-[1px] text-(--tinta-3)">
        {titulo}
      </span>
      <strong className="font-manrope text-4xl md:text-4xl font-normal text-tinta">
        {dado.valor}
      </strong>
      <div className={`text-[11px] font-mono-jb tracking ${style.cor}`}>
        <span aria-hidden="true" className="text-[8px] pr-1">
          {style.simbolo}
        </span>
        <span>{dado.rotulo}</span>
      </div>
    </div>
  );
}
