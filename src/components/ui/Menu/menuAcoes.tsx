import { ReactNode, useEffect, useState, useRef } from "react";
import { MoreVertical } from "lucide-react";

interface MenuProps {
  children: ReactNode;
  atrasoFechamento?: number;
}

export default function MenuAcoes({ children, atrasoFechamento }: MenuProps) {
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gatilhoRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<number | undefined>(undefined);

	function fechar() {
		window.clearTimeout(timerRef.current);
		const focoDentro = containerRef.current?.contains(document.activeElement);
		setAberto(false);
		if (focoDentro) gatilhoRef.current?.focus();
	}

	function agendarFechamento() {
		window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(fechar, atrasoFechamento);
	}

	useEffect(() => {
		if (!aberto) return;

		function aoClicarFora(e: PointerEvent) {
			if (!containerRef.current?.contains(e.target as Node)) fechar();
		}

		function aoTeclar(e: KeyboardEvent) {
			if (e.key === "Escape") fechar();
		}

		document.addEventListener("pointerdown", aoClicarFora);
		document.addEventListener("keydown", aoTeclar);
		return () => {
			document.removeEventListener("pointerdown", aoClicarFora);
			document.removeEventListener("keydown", aoTeclar);
			window.clearTimeout(timerRef.current);
		};
	}, [aberto]);

	return (
		<div ref={containerRef} className="relative">
			<button
				ref={gatilhoRef}
				type="button"
				aria-label="Mais ações"
				aria-expanded={aberto}
				onClick={() => (aberto ? fechar() : setAberto(true))}
				className="-my-1 -mr-2 inline-flex h-8 w-6 items-center justify-center text-(--azul-senac-escuro) transition-colors hover:text-primaria-tint"
			>
				<MoreVertical className="h-4 w-4"/>
			</button>

			{aberto && (
				<div
					className="absolute right-0 top-full z-20 mt-1 flex w-32 flex-col divide-y divide-(--tinta-4)/20
            rounded-lg border border-(--tinta-4) bg-(--fundo) p-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"	
				>
					{children}
				</div>
			)}
		</div>
	);
}