"use client";

import BarraStatus from "@/components/ui/Barra/barraStatus";
import BotaoFiltro from "@/components/ui/Button/botaoFiltro";
import { filtragem } from "@/data/filtro";
import { useState } from "react";

export default function Home() {
  const [filtroSelecionado, setFiltroSelecionado] = useState("todos");

  return (
    <div className="px-8 py-5 sm:px-10 sm:py-7">
      <section aria-label="Sobre o sistema">
        <BarraStatus
          dataAtualizacao="19 MAIO 2026"
          horaAtualizacao="14:32"
          edicao={142}
        />

        <div className="py-5">
          <h1 className="font-manrope box-border text-[29px] leading-none font-bold tracking-tighter text-(--color-texto-principal) sm:text-[40px] md:text-[50px] lg:text-[60px]">
            Onde a inteligência artificial está
            <em className="text-(--laranja-senac)"> chegando </em>
            nos setores em que você ensina.
          </h1>

          <p className="py-3 text-[16px] font-light text-[#17415F] md:text-[18px] lg:text-[22px]">
            Mapa vivo de tendências de IA por segmento profissional, alimentado
            por curadoria automatizada de notícias, publicações acadêmicas e
            relatórios setoriais — para decisões pedagógicas na educação
            profissional.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        {filtragem.map((filtro) => (
          <BotaoFiltro
            key={filtro.id}
            texto={filtro.texto}
            insight={filtro.insight}
            ativo={filtroSelecionado === filtro.id}
            onClick={() => setFiltroSelecionado(filtro.id)}
          />
        ))}
      </div>
    </div>
  );
}
