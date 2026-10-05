"use react";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

export default function BotaoCompartilhar({ url }: { url ?: string }) {
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
			aria-label={copiado ? "Link copiado" : "Copiar link"}
			onClick={compartilhar}
			className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-[rgba(0,82,143,0.14)]
				bg-(--fundo) text-(--azul-senac-escuro) transition-colors hover:bg-(--tinta-2) hover:text-primaria-tint"
		>
			{copiado ? <Check className="h-4 w-4"/> : <Share2 className="h-4 w-4" />}
		</button>
	)
}