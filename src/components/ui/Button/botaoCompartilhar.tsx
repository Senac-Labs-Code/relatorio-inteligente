"use react";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

interface CompartilharProps {
	url?: string;
	mostrarNome?: boolean;
}

export default function BotaoCompartilhar({ url, mostrarNome = false }: CompartilharProps) {
  const [copiado, setCopiado] = useState(false);

	async function compartilhar() {
		const link = url ?? window.location.href;

		await navigator.clipboard.writeText(link);
		setCopiado(true);
		setTimeout(() => setCopiado(false), 2000);
	}

	return (
		<button
			type="button"
			aria-label={mostrarNome ? undefined : copiado ? "Copiado" : "Copiar link"}
			onClick={compartilhar}
			className={`inline-flex items-center ${
				mostrarNome
					? "h-9 w-full gap-2 px-2 pt-1 justify-start text-[13px]"
					: "h-8 w-8 rounded-sm justify-center"
			}`}
			// border border-[rgba(0,82,143,0.14)]bg-(--fundo) text-(--azul-senac-escuro) transition-colors hover:bg-(--tinta-2) -> parte removida temporariamente
		>
			{ copiado ? <Check className="h-4 w-4 " aria-hidden="true"/> : <Share2 className="h-4 w-4 mb-1" aria-hidden="true"/> }
			{ mostrarNome && <span>{copiado ? "Copiado" : "Compartilhar"}</span> }
		</button>
	)
}