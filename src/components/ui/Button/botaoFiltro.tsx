interface BotaoFiltroProps {
  texto: string;
  insight: number;
  ativo: boolean;
  onClick: () => void;
}

export default function BotaoFiltro({
  texto,
  insight,
  ativo,
  onClick,
}: BotaoFiltroProps) {
  return (
    <button
      onClick={onClick}
      className={
        ativo
          ? "flex items-center gap-2 rounded-full bg-(--color-destaque) px-4 py-2 text-white transition-colors duration-300"
          : "flex items-center gap-2 rounded-full border border-(--color-primaria-suave) px-4 py-2text-(--tinta-2) transition-colors duration-300 hover:border-(--color-primaria)"
      }
    >
      <span className="h-1.5 w-1.5 rounded-full bg-(--color-primaria)" />
      <span className="font-manrope text-[12px] font-medium">{texto}</span>
      <span
        className={`font-mono-jb text-[12px] font-semibold opacity-75 ${ativo ? "text-[rgba(246,250,253,0.89)]" : "text-[#4a657c]"}`}
      >
        {insight}
      </span>
    </button>
  );
}
