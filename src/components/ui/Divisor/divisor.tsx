type DivisorVariante = "header" | "secao" | "filtro";

const variantes: Record<DivisorVariante, string> = {
  header: "w-px min-[537px]:bg-[rgba(246,250,253,0.18)] min-[537px]:h-6 sm:h-7 lg:h-8",
  secao: "block h-px w-full my-4 bg-[rgba(0,82,143,0.14)]",
  filtro:
    "border-l-2 border-[rgba(0,82,143,0.26)] h-3 mt-2 max-[359px]:mt-2 min-[360px]:max-[673px]:mt-2 min-[674px]:mt-0 flex-shrink-0 flex-grow-0",
};

interface DivisorProps {
  variant: DivisorVariante;
}

export default function Divisor({ variant }: DivisorProps) {
  return <span className={variantes[variant]} />;
}
