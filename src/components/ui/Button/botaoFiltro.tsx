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
          ? "flex items-center gap-2 rounded-full bg-(--color-destaque) px-4 py-1 text-white transition-colors duration-300"
          : "py-1 text-(--tinta-2) flex items-center gap-2 rounded-full bg-[#F6FAFD] border border-(--color-primaria-suave) px-4 transition-colors duration-300 hover:border-(--color-primaria)"
      }
    >
      <span className="h-1.5 w-1.5 rounded-full bg-(--color-primaria)" />
      <span className="font-manrope text-[13px]">{texto}</span>
      <span
        className={`font-mono-jb text-[11px] opacity-75 ${ativo ? "text-[rgba(246,250,253,0.89)]" : "text-[#475f73]"}`}
      >
        {insight}
      </span>
    </button>
  );
}
