"use client";

import { useState } from "react";
import { Search } from "lucide-react";

interface BarraPesquisaProps {
  placeholder?: string;
	className?: string;
}

export default function BarraPesquisa({
	placeholder = "Buscar tendências, segmentos, autores, fontes...",
	className = "",
}: BarraPesquisaProps) {
	const [valor, setValor] = useState("");

	return (
		<div className={`relative flex items-center ${className}`}>
			<Search className="absolute left-3 h-4 w-4 text-[rgba(133,150,164)]"/>
			<input 
				type="text"
				value={valor}
				onChange={(e) => setValor(e.target.value)}
				placeholder={placeholder}
				className="w-full rounded-full border border-(--tinta-4) bg-(--tinta-2) py-2.5 pl-9 pr-4 text-sm text-primaria-tint outline-none placeholder:text-(--tinta-3) focus:(--color-primaria)"
			/>
		</div>
	)
}