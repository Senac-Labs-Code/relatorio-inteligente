"use client";

import Image from "next/image";
import Perfil from "./Perfil";
import IconeCircular from "../ui/IconeCircular";
import { Bell, Download } from "lucide-react";
import BarraPesquisa from "../ui/Barra/barraPesquisa";
import { useState } from "react";
import Divisor from "../ui/Divisor/divisor";

export default function Header() {
  const [notificaoAtiva, setNotificacaoAtiva] = useState(false);

  return (
    <header className="bg-(--color-fundo-header) px-8 py-3 sm:px-10 sm:py-1">
      <div className="flex flex-wrap items-center justify-between gap-x-3 min-[1000px]:flex-nowrap">
        <div className="flex w-full items-center justify-between gap-3 min-[1000px]:w-auto">
          <div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center min-[500px]:gap-3">
            <div className="py-1.5 sm:py-4 lg:py-5">
              <Image
                src="/RadarIA-logo.svg"
                alt="Radar IA"
                width={140}
                height={32}
                className="h-9 w-auto sm:h-11 md:h-12 lg:h-12"
              />
            </div>

            <Divisor variant="header" />

            <div className="py-0.5 leading-3 min-[440px]:leading-3.5 sm:py-6 sm:leading-4">
              <h1 className="font-mono-jb text-[9px] font-medium tracking-[2px] text-(--color-texto-sobre-escuro) min-[440px]:text-[10px] sm:text-[11px]">
                SENAC • OBSERVATÓRIO DE IA
                <br className="min-[440px]:hidden" />{" "}
              </h1>
              <p className="font-mono-jb text-[8px] tracking-[2px] text-[rgba(246,250,253,0.6)] min-[440px]:text-[9px] sm:text-[11px]">
                CURADORIA AUTOMATIZADA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 min-[1000px]:hidden sm:gap-3">
            <IconeCircular
              aria-label="Notificações"
              onClick={() => setNotificacaoAtiva(!notificaoAtiva)}
              className="hover:border-(--color-border-clara) hover:bg-(--tinta-2)"
            >
              <Bell
                fill={notificaoAtiva ? "currentColor" : "none"}
                className={`h-4 w-4 ${
                  notificaoAtiva ? "text-(--color-primaria-tint)" : "text-white"
                }`}
              />
            </IconeCircular>
            <IconeCircular
              aria-label="Download"
              className="hover:border-(--color-border-clara) hover:bg-(--tinta-2)"
            >
              <Download className="h-4 w-4 text-amber-50" />
            </IconeCircular>
            <Perfil nome="Marcos" sobrenome="Santos" />
          </div>
        </div>

        <BarraPesquisa className="w-full pt-5 min-[1000px]:w-100 sm:py-3" />

        <div className="hidden items-center gap-2 min-[1000px]:flex sm:gap-3">
          <IconeCircular
            aria-label="Notificações"
            onClick={() => setNotificacaoAtiva(!notificaoAtiva)}
            className="hover:border-(--color-border-clara) hover:bg-(--tinta-2)"
          >
            <Bell
              fill={notificaoAtiva ? "currentColor" : "none"}
              className={`h-4 w-4 ${
                notificaoAtiva ? "text-(--color-primaria-tint)" : "text-white"
              }`}
            />
          </IconeCircular>
          <IconeCircular
            aria-label="Download"
            className="hover:border-(--color-border-clara) hover:bg-(--tinta-2)"
          >
            <Download className="h-4 w-4 text-amber-50" />
          </IconeCircular>
          <Perfil nome="Marcos" sobrenome="Santos" />
        </div>
      </div>
    </header>
  );
}
