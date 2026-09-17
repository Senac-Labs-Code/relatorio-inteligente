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
      className="h-8 w-8 rounded-full bg-(--color-primaria) text-[14px] font-medium text-(--color-texto-sobre-escuro)"
    >
      {iniciais}
    </button>
  );
}
