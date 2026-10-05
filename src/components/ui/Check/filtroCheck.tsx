"use client";

import { Fragment, useState } from "react";
import type { GrupoFiltroCheck } from "@/types/check";
import Divisor from "../Divisor/divisor";

interface FiltrosCheckProps {
  filtros: GrupoFiltroCheck[];
}

export function FiltrosCheck({ filtros }: FiltrosCheckProps) {
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [abertos, setAbertos] = useState<string[]>([]);

  const alternarFiltro = (id: string) => {
    setSelecionados((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id],
    );
  };

  const alternarGrupoFiltro = (id: string) => {
    setAbertos((atual) =>
      atual.includes(id) ? atual.filter((item) => item !== id) : [...atual, id],
    );
  };

  return (
    <div className="flex flex-col gap-2">
      {filtros.map((grupo, i) => {
        const aberto = abertos.includes(grupo.id);
        const idConteudo = `filtro-grupo-${grupo.id}`;

        return (
          <Fragment key={grupo.id}>
            {i > 0 && <Divisor variant="secao" />}

            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => alternarGrupoFiltro(grupo.id)}
                aria-expanded={aberto}
                aria-controls={idConteudo}
                className="flex w-full items-center justify-between text-left lg:pointer-events-none lg:cursor-default"
              >
                <span className="font-mono-jb text-[10px] tracking-[1px] text-(--tinta-3)">
                  {grupo.texto}
                </span>

                <svg
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                  className={`size-3 text-(--tinta-3) transition-transform duration-300 ease-out lg:hidden ${
                    aberto ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M2.5 4.5 6 8l3.5-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div
                id={idConteudo}
                className={`grid transition-[grid-template-rows] duration-300 ease-out lg:grid-rows-[1fr] ${
                  aberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="flex flex-col gap-2 pt-3">
                    {grupo.itens.map((item) => {
                      const ativo = selecionados.includes(item.id);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => alternarFiltro(item.id)}
                          className="flex w-full items-center gap-2"
                        >
                          <span
                            className={`flex size-3 shrink-0 items-center justify-center rounded-xs border ${
                              ativo
                                ? "border-primaria-hover bg-primaria-hover"
                                : "border-(--tinta-3) bg-white"
                            }`}
                          >
                            {ativo && (
                              <span className="text-[9px] font-bold text-white">
                                ✓
                              </span>
                            )}
                          </span>

                          <span className="font-manrope min-w-0 flex-1 truncate text-left text-[13px] text-(--tinta-4)">
                            {item.texto}
                          </span>

                          <span className="font-mono-jb text-[11px] text-(--tinta-3)">
                            {item.total}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
