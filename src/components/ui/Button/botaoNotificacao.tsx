"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

interface Props {
  ativoInicial?: boolean;
	onChange?: (ativo: boolean) => void;
}

export default function BotaoNotificacao({ ativoInicial = false, onChange }: Props) {
	const [ativo, setAtivo] = useState(ativoInicial);

	function ativar() {
		const novo = !ativo;
		setAtivo(novo);
		onChange?.(novo);
	}

  return (
    <button
      type="button"
      aria-label={ativo ? "Desativar notificações" : "Ativar notificações"}
      aria-pressed={ativo}
      onClick={ativar}
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-(--tinta-4) bg-(--color-fundo-header) text-white transition-colors hover:border-(--color-border-clara) hover:bg-(--tinta-2) sm:h-9 sm:w-9"
    >
      <Bell
        fill={ativo ? "currentColor" : "none"}
        className={`h-4 w-4 ${ativo ? "text-(--color-primaria-tint)" : ""}`}
      />
    </button>
  );
}