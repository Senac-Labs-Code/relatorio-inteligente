"use client";
import { useMemo, useState } from "react";

import BarraStatus from "@/components/ui/Barra/barraStatus";
import BotaoFiltro from "@/components/ui/Button/botaoFiltro";
import CardEstatisticas from "@/components/ui/Estatistica/cardEstatistica";
import Sobre from "./_components/sobre";
import RedeIA from "./_components/redeIA";
import Divisor from "@/components/ui/Divisor/divisor";
import ArtigosPublicacoes from "./_components/artigosPublicacoes";
import { FiltrosCheck } from "@/components/ui/Check/filtroCheck";
import BotaoSalvar from "../components/ui/Button/botaoSalvar";
import BarraArtigo from "@/components/ui/Barra/barraArtigo";
import BotaoCompartilhar from "@/components/ui/Button/botaoCompartilhar";
import { ArtigoMetaTop } from "@/components/ui/Card/artigoCard";

import { estatisticasMock } from "@/data/estatistica";
import { filtragem, filtragemCheck } from "@/data/filtro";
import { artigos } from '../data/artigo';

import { Ordenacao } from "@/types/filtro";

import { nomeFonte } from '../utils/rotulos';
import { filtrarPorSegmento, ordenarArtigos } from '@/utils/filtrarArtigos';

export default function Home() {
  const [filtroSelecionado, setFiltroSelecionado] = useState("todos");
  const [clicado, setClicado] = useState(false);
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("relevancia");

  const fontes = filtragemCheck.find((g) => g.id === 'fontes')?.itens ?? [];
  const filtroAtual = filtragem.find((filtro) => filtro.id === filtroSelecionado)!;

  const artigosVisiveis = useMemo(
    () => ordenarArtigos(filtrarPorSegmento(artigos, filtroSelecionado), ordenacao),
    [filtroSelecionado, ordenacao],
  );

  function alternarFiltro(id: string) {
    setFiltroSelecionado((atual) => (atual === id ? 'todos' : id));
  };

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
            onClick={() => alternarFiltro(filtro.id)}
          />
        ))}
      </div>

      <ArtigosPublicacoes />

      <Divisor variant="secao"/>

      <FiltrosCheck filtros={filtragemCheck}/>

      {/* finalizar botão de salvar os artigos */}
      <BotaoSalvar />
      <BotaoCompartilhar />

      {/* refinar campo de filtro acima dos artigos */}
      <BarraArtigo
        filtro={filtroAtual.texto} 
        insight={filtroAtual.insight}
        ordenacao={ordenacao}
        aoMudarOrdenacao={setOrdenacao}
        podeLimpar={filtroSelecionado !== "todos"}
        aoLimpar={() => setFiltroSelecionado("todos")}
      />

      {artigosVisiveis.map((artigo) => (
        <ArtigoMetaTop
          key={artigo.id}
          fonte={nomeFonte(artigo.fonte, fontes)}
          tipo={artigo.tipo}
          idioma={artigo.idioma}
          dataPublicacao={artigo.dataPublicacao}
        />
      ))}
    </div>
  );
}