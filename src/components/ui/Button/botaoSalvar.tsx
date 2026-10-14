"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

interface SalvarProps {
  salvo?: boolean;
  aoAlterar?: () => void;
  mostrarNome?: boolean;
  // onChange?: (salvo: boolean) => void;  !ORIGINAL!
}

// ! teste - código original commitado
// export default function BotaoSalvar({ salvo = false, onChange }: Props) {
export default function BotaoSalvar({ salvo, aoAlterar, mostrarNome = false }: SalvarProps) {

  // const [salvo, setSalvo] = useState(salvo);

  // function alternar() {
  //   const novo = !salvo;
  //   setSalvo(novo);
  //   onChange?.(novo);
  // }

  return (
    <button
      type="button"
      aria-label={mostrarNome ? undefined : salvo ? "Remover dos salvos" : "Salvar artigo"}
      aria-pressed={salvo}
      onClick={aoAlterar}
      // onClick={alternar}
      className={`inline-flex items-center transition-colors ${
        mostrarNome
          ? "h-9 w-full gap-2 px-2 justify-start"
          : "h-8 w-8 rounded-sm justify-center"
      } ${
        salvo
          ? "bg-(--tinta-2) text-white"
          : "hover:text-primaria-tint hover:bg-(--tinta-2)"
          // bg-(--fundo) border-[rgba(0,82,143,0.14)] border text-(--azul-senac-escuro) -> parte removida temporariamente
      }`}
    >
      <Bookmark className="h-4 w-4" fill={salvo ? "currentColor" : "none"} aria-hidden="true"/>
      {mostrarNome && (
        <span className="text-[13px]">{salvo ? "Salvo" : "Salvar"}</span>
      )}
    </button>
  );
}