export default function ArtigosPublicacoes() {
  return (
    <div className="pt-5">
      <h2 className="text-(--tinta) text-2xl sm:text-3xl md:text-4xl font-light">
				Artigos &
				<em className="text-primaria-hover"> publicações </em>
			</h2>
			<div className="flex justify-between gap-4 items-center">
				<p className="text-(--tinta-3) text-[14px] sm:text-[15px] md:text-[16px] font-light pt-1">
					Curadoria automatizada de notícias, papers e relatórios.
          Filtre pelos eixos à esquerda ou clique no mapa.
				</p>
				<div className="text-[11px] text-(--tinta-3) tracking font-mono-jb text-center">§ 02 / FONTES</div>
			</div>
    </div>
  )
}