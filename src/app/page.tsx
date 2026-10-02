"use client";

import BarraStatus from "@/components/ui/Barra/barraStatus";
import BotaoFiltro from "@/components/ui/Button/botaoFiltro";
import CardEstatisticas from "@/components/ui/Estatistica/cardEstatistica";
import { estatisticasMock } from "@/data/estatistica";
import { filtragem, filtragemCheck } from "@/data/filtro";
import { useState } from "react";
import Sobre from "./_components/sobre";
import RedeIA from "./_components/redeIA";
import Divisor from "@/components/ui/Divisor/divisor";
import ArtigosPublicacoes from "./_components/artigosPublicacoes";
import { FiltrosCheck } from "@/components/ui/Check/filtroCheck";
import BotaoSalvar from "../components/ui/Button/botaoSalvar";
import { Bookmark } from "lucide-react"
import BarraArtigo from "@/components/ui/Barra/barraArtigo";
import { Ordenacao } from "@/types/filtro";


export default function Home() {
  const [filtroSelecionado, setFiltroSelecionado] = useState("todos");
  const [clicado, setClicado] = useState(false);
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("relevancia");

  const filtroAtual = filtragem.find((filtro) => filtro.id === filtroSelecionado)!

  return (
    // remover pb-30
    <div className="pb-30 px-6 sm:px-10 md:px-14 lg:px-18 xl:px-22 bg-primaria-tint">
      <section aria-label="Sobre o sistema">
        <Sobre />
      </section>

      <div className="mb-15 mt-7 grid grid-cols-2 border-t border-[rgba(0,82,143,0.14)] *:border-b *:border-[rgba(0,82,143,0.14)] md:grid-cols-4">
        <CardEstatisticas
          titulo="INSIGHTS ATIVOS"
          dado={estatisticasMock.insightsAtivos}
        />
        <CardEstatisticas
          titulo="FONTES MONITORADAS"
          dado={estatisticasMock.fontesMonitoradas}
        />
        <CardEstatisticas
          titulo="TENDÊNCIAS EMERGENTES"
          dado={estatisticasMock.tendenciasEmergentes}
        />
        <CardEstatisticas
          titulo="SEGMENTOS COBERTOS"
          dado={estatisticasMock.segmentosCobertos}
        />
      </div>

      <section aria-label="Rede de conhecimento em IA">
        <RedeIA />
      </section>

      <Divisor variant="secao"/>

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

      <ArtigosPublicacoes />

      <Divisor variant="secao"/>

      <FiltrosCheck filtros={filtragemCheck}/>

      {/* finalizar botão de salvar os artigos */}
      <BotaoSalvar />

      {/* refinar campo de filtro acima dos artigos */}
      <BarraArtigo
        filtro={filtroAtual.texto} 
        insight={filtroAtual.insight}
        ordenacao={ordenacao}
        aoMudarOrdenacao={setOrdenacao}
        podeLimpar={filtroSelecionado !== "todos"}
        aoLimpar={() => setFiltroSelecionado("todos")}
      />
    </div>
  );
}
