"use client";

import Image from "next/image";
import Perfil from "./Perfil";
import BarraPesquisa from "../ui/Barra/barraPesquisa";
import { useState } from "react";
import Divisor from "../ui/Divisor/divisor";
import BotaoNotificacao from "../ui/Button/botaoNotificacao";
import BotaoDownload from "../ui/Button/botaoDownload";

export default function Header() {

  return (
    <header className="bg-(--color-fundo-header) px-6 py-4 sm:px-10 sm:py-5 md:px-14 lg:px-18 xl:px-22">
    <div className="flex flex-wrap items-center justify-between gap-x-6 min-[900px]:flex-nowrap">
      <div className="flex w-full items-center justify-between  pb-5 min-[900px]:contents">
        <div className="flex min-w-0 flex-col gap-1 min-[537px]:min-w-auto min-[537px]:flex-row min-[537px]:items-center min-[537px]:gap-3 min-[900px]:shrink-0">
          <div className="">
            <Image
              src="/RadarIA-logo.svg"
              alt="Radar IA"
              width={140}
              height={32}
              className="h-9 w-auto sm:h-10 md:h-11 lg:h-12"
            />
          </div>

          <Divisor variant="header" />

          <div className="leading-4 min-[440px]:leading-3.5 sm:leading-4">
            <h1 className="font-mono-jb text-[10px] sm:text-[11px] lg:text-[12px] font-medium tracking-[2px] whitespace-nowrap text-(--color-texto-sobre-escuro)  min-[500px]:whitespace-normal ">
              SENAC • OBSERVATÓRIO DE IA
              <br className="min-[440px]:hidden" />{" "}
            </h1>
            <p className="font-mono-jb text-[10px] sm:text-[11px] lg:text-[12px] tracking-[2px] text-[rgba(246,250,253,0.6)] ">
              CURADORIA AUTOMATIZADA
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 self-start min-[537px]:h-auto min-[537px]:self-auto sm:gap-3 min-[900px]:order-last">
          <BotaoNotificacao />
          <BotaoDownload />
          <Perfil nome="Marcos" sobrenome="Santos" />
        </div>
      </div>

      <BarraPesquisa className="w-full  min-[900px]:w-auto min-[900px]:min-w-0 min-[900px]:flex-1 min-[900px]:max-w-100" />
    </div>
  </header>
    // <header className="bg-(--color-fundo-header) px-8 py-3 sm:px-32 sm:py-1">
    //   <div className="flex flex-wrap items-center justify-between gap-x-3 min-[1000px]:flex-nowrap">
    //     <div className="flex w-full items-center justify-between gap-3 min-[1000px]:w-auto">
    //       <div className="flex min-w-0 flex-col min-[500px]:min-w-auto min-[500px]:flex-row min-[500px]:items-center min-[500px]:gap-3">
    //         <div className="py-1.5 sm:py-4 lg:py-5">
    //           <Image
    //             src="/RadarIA-logo.svg"
    //             alt="Radar IA"
    //             width={140}
    //             height={32}
    //             className="h-9 w-auto sm:h-11 md:h-12 lg:h-12"
    //           />
    //         </div>

    //         <Divisor variant="header" />

    //         <div className="py-0.5 leading-3 min-[440px]:leading-3.5 sm:py-6 sm:leading-4">
    //           <h1 className="font-mono-jb text-[9px] font-medium tracking-[2px] whitespace-nowrap text-(--color-texto-sobre-escuro)  min-[500px]:whitespace-normal sm:text-[11px]">
    //             SENAC • OBSERVATÓRIO DE IA
    //             <br className="min-[440px]:hidden" />{" "}
    //           </h1>
    //           <p className="font-mono-jb text-[8px] tracking-[2px] text-[rgba(246,250,253,0.6)] sm:text-[11px]">
    //             CURADORIA AUTOMATIZADA
    //           </p>
    //         </div>
    //       </div>

    //       <div className="flex h-12 items-center gap-2 self-start min-[500px]:h-auto min-[500px]:self-auto min-[1000px]:hidden sm:gap-3">
    //         <IconeCircular
    //           aria-label="Notificações"
    //           onClick={() => setNotificacaoAtiva(!notificaoAtiva)}
    //           className="hover:border-(--color-border-clara) hover:bg-(--tinta-2)"
    //         >
    //           <Bell
    //             fill={notificaoAtiva ? "currentColor" : "none"}
    //             className={`h-4 w-4 ${
    //               notificaoAtiva ? "text-(--color-primaria-tint)" : "text-white"
    //             }`}
    //           />
    //         </IconeCircular>
    //         <IconeCircular
    //           aria-label="Download"
    //           className="hover:border-(--color-border-clara) hover:bg-(--tinta-2)"
    //         >
    //           <Download className="h-4 w-4 text-amber-50" />
    //         </IconeCircular>
    //         <Perfil nome="Marcos" sobrenome="Santos" />
    //       </div>
    //     </div>

    //     <BarraPesquisa className="w-full pt-5 min-[1000px]:w-100 sm:py-3" />
    //   </div>
    // </header>
  );
}
