"use client";

import Image from "next/image";
import Perfil from "./Perfil";
import IconeCircular from "../ui/IconeCircular";
import { Bell, Download } from "lucide-react";
import BarraPesquisa from "../ui/BarraPesquisa";
import { useState } from "react";

export default function Header() {
  const [notificaoAtiva, setNotificacaoAtiva] = useState(false);
  return (
		// <header className="bg-(--color-fundo-header) px-6  py-2 sm:px-10">
		// 	<div className="flex flex-wrap items-center justify-between gap-3 min-[1000px]:flex-nowrap">
		// 		<div className="flex flex-col min-[500px]:flex-row min-[500px]:items-center min-[500px]:gap-3 ">
		// 			<div className="py-1.5 sm:py-4 lg:py-5">
		// 				<Image
		// 					src="/RadarIA-logo.svg"
		// 					alt="Radar IA"
		// 					width={140}
		// 					height={32}
		// 					className="h-7 w-auto sm:h-10 lg:h-12 "
		// 				/>
		// 			</div>

		// 			<span className="min-[500px]:bg-[rgba(246,250,253,0.18)] min-[500px]:h-6 min-[500px]:w-px lg:h-8" />

		// 			<div className="py-0.5 sm:py-6 leading-3 min-[440px]:leading-3.5 sm:leading-4">
		// 				<h1 className="text-(--color-texto-sobre-escuro) text-[8px] min-[440px]:text-[10px] sm:text-[11px] font-mono-jb font-medium tracking-[2px]">
		// 					SENAC • OBSERVATÓRIO DE IA
		// 					<br className="min-[440px]:hidden"/>
		// 					{" "} 
		// 				</h1>
		// 				<p className="text-[rgba(246,250,253,0.6)] text-[7px] min-[440px]:text-[9px] sm:text-[11px] font-mono-jb tracking-[2px]">
		// 					CURADORIA AUTOMATIZADA
		// 				</p>
		// 			</div>
		// 		</div>

		// 		<BarraPesquisa className="order-3 w-full min-[1000px]:order-0 min-[1000px]:w-150 py-2"/>

		// 		<div className="flex items-center gap-2 sm:gap-3">
		// 			<IconeCircular ariel-label="Notificações" className="hover:bg-(--tinta-2) hover:border-(--color-border-clara)">
		// 				<Bell className="text-amber-50 h-4 w-4"/>
		// 			</IconeCircular>
		// 			<IconeCircular ariel-label="Download" className="hover:bg-(--tinta-2) hover:border-(--color-border-clara)">
		// 				<Download className="text-amber-50 h-4 w-4"/>
		// 			</IconeCircular>
		// 			<Perfil nome="Marcos" sobrenome="Santos"/>
		// 		</div>
		// 	</div>
		// </header>

		<header className="bg-(--color-fundo-header) px-8 py-3 sm:px-10 sm:py-1">
      <div className="flex flex-wrap items-center justify-between gap-x-3 min-[1000px]:flex-nowrap">

        {/* Grupo 1: logo/título + ícones (sempre juntos abaixo de 1000px) */}
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

            <span className="min-[500px]:bg-[rgba(246,250,253,0.18)] min-[500px]:h-6 min-[500px]:w-px lg:h-8" />

            <div className="py-0.5 sm:py-6 leading-3 min-[440px]:leading-3.5 sm:leading-4">
              <h1 className="text-(--color-texto-sobre-escuro) text-[9px] min-[440px]:text-[10px] sm:text-[11px] font-mono-jb font-medium tracking-[2px]">
                SENAC • OBSERVATÓRIO DE IA
                <br className="min-[440px]:hidden" />
                {" "}
              </h1>
              <p className="text-[rgba(246,250,253,0.6)] text-[8px] min-[440px]:text-[9px] sm:text-[11px] font-mono-jb tracking-[2px]">
                CURADORIA AUTOMATIZADA
              </p>
            </div>
          </div>

          {/* Ícones - só aparecem aqui (junto da logo) abaixo de 1000px */}
          <div className="flex items-center gap-2 sm:gap-3 min-[1000px]:hidden">
            <IconeCircular
              aria-label="Notificações"
              onClick={() => setNotificacaoAtiva(!notificaoAtiva)}
              className="hover:bg-(--tinta-2) hover:border-(--color-border-clara)"
            >
              <Bell
                fill={notificaoAtiva ? "currentColor" : "none"}
                className={`h-4 w-4 ${notificaoAtiva ? "text-(--color-primaria-tint)" : "text-white"}`}
              />
            </IconeCircular>
            <IconeCircular aria-label="Download" className="hover:bg-(--tinta-2) hover:border-(--color-border-clara)">
              <Download className="text-amber-50 h-4 w-4" />
            </IconeCircular>
            <Perfil nome="Marcos" sobrenome="Santos" />
          </div>
        </div>

        {/* Barra de pesquisa: linha própria abaixo de 1000px, no meio acima disso */}
        <BarraPesquisa className="w-full pt-5 min-[1000px]:w-100 sm:py-3" />

        {/* Ícones - só aparecem aqui (depois da busca) a partir de 1000px */}
        <div className="hidden items-center gap-2 sm:gap-3 min-[1000px]:flex">
          <IconeCircular
            aria-label="Notificações"
            onClick={() => setNotificacaoAtiva(!notificaoAtiva)}
            className="hover:bg-(--tinta-2) hover:border-(--color-border-clara)"
          >
            <Bell
              fill={notificaoAtiva ? "currentColor" : "none"}
              className={`h-4 w-4 ${notificaoAtiva ? "text-(--color-primaria-tint)" : "text-white"}`}
            />
          </IconeCircular>
          <IconeCircular aria-label="Download" className="hover:bg-(--tinta-2) hover:border-(--color-border-clara)">
            <Download className="text-amber-50 h-4 w-4" />
          </IconeCircular>
          <Perfil nome="Marcos" sobrenome="Santos" />
        </div>

      </div>
    </header>
	)
}