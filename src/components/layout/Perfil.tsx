interface PerfilProps {
	nome: string;
	sobrenome: string;
}

export default function Perfil({ nome, sobrenome }: PerfilProps) {
	const iniciais = `${nome.charAt(0)}${sobrenome.charAt(0)}`.toUpperCase();

  return (
		<button
		type="button" 
		arial-label={`Perfil de ${nome} ${sobrenome}`}
		className="text-(--color-texto-sobre-escuro) bg-(--color-primaria) h-8 w-8 rounded-full text-[14px] font-medium">
			{iniciais}
		</button>
	);
}