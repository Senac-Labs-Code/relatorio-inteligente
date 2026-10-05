"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

interface Props {
  salvoInicial?: boolean;
  onChange?: (salvo: boolean) => void;
}

export default function BotaoSalvar({ salvoInicial = false, onChange }: Props) {
  const [salvo, setSalvo] = useState(salvoInicial);

  function alternar() {
    const novo = !salvo;
    setSalvo(novo);
    onChange?.(novo);
  }

  return (
    <button
      type="button"
      aria-label={salvo ? "Remover dos salvos" : "Salvar artigo"}
      aria-pressed={salvo}
      onClick={alternar}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-sm transition-colors ${
        salvo
          ? "bg-(--tinta-2) text-white"
          : "bg-(--fundo) border-[rgba(0,82,143,0.14)] border text-(--azul-senac-escuro) hover:text-primaria-tint hover:bg-(--tinta-2)"
      }`}
    >
      <Bookmark className="h-4 w-4" fill={salvo ? "currentColor" : "none"} />
    </button>
  );
}