import { Chip } from "@/types/artigo";

// estilização individual agrupada junto com a base (que é aplicada em todos)
const style: Record<Chip['categoria'] | 'base', string> = {
	base: "flex items-center text-[11px] font-medium font-manrope rounded-full px-2 py-0.5 py-",
	segmento: "bg-(--tinta) text-(--color-texto-sobre-escuro)",
	tendencia: "border border-(--azul-senac) text-(--azul-senac) bg-(--azul-senac-tint)",
	maturidade: "bg-(--fundo) border border-[rgba(0,82,143,0.14)] text-[#17415F]",
};

interface ArtigosChipsProps {
  chips: Chip[];
};

export function ArtigoChips({ chips }: ArtigosChipsProps) {
	return (
		<ul className="flex flex-wrap gap-2">
			{chips.map((chip) => (
				<li key={`${chip.categoria}-${chip.id}`} className={`${style.base} ${style[chip.categoria]}`}>
					{chip.texto}
				</li>
			))}
		</ul>
	)
}