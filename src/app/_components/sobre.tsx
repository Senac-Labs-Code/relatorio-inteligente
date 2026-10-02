import BarraStatus from "@/components/ui/Barra/barraStatus";

export default function Sobre() {
  return (
    <section aria-label="Sobre o sistema" className="pt-5">
      <BarraStatus
        dataAtualizacao="19 MAIO 2026"
        horaAtualizacao="14:32"
        edicao={142}
      />
    
      <div className="py-5">
        <h1 className="font-manrope box-border text-4xl sm:text-5xl lg:text-6xl leading-none font-bold tracking-tighter text-(--color-texto-principal)">
          Onde a inteligência artificial está
            <em className="text-(--laranja-senac)"> chegando </em>
          nos setores em que você ensina.
        </h1>
    
        <p className="pt-3 text-[16px] md:text-[18px] lg:text-[18px] font-light text-[#17415F]">
          Mapa vivo de tendências de IA por segmento profissional, alimentado
          por curadoria automatizada de notícias, publicações acadêmicas e
          relatórios setoriais — para decisões pedagógicas na educação
          profissional.
        </p>
      </div>
    </section>
  )
}