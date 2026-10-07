import { Chip } from "@/types/artigo";

const style: Record<Chip['categoria'], string> = {
	segmento: "bg-(--tinta) text-white px-2 text-[12px] pt-1 rounded-full",
	tendencia: "",
	maturidade: "",
};

interface ArtigosChipsProps {
  chips: Chip[];
};

export function ArtigoChips({ chips }: ArtigosChipsProps) {
	return (
		<ul className="flex flex-wrap gap-2">
			{chips.map((chip) => (
				<li key={`${chip.categoria}-${chip.id}`} className={style[chip.categoria]}>
					{chip.texto}
				</li>
			))}
		</ul>
	)
}