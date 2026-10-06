export function formatarDataPublicacao(dataIso: string): string {
  const partes = new Intl.DateTimeFormat('pt-BR', {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC',
	}).formatToParts(new Date(dataIso));

	const pegar = (tipo: Intl.DateTimeFormatPartTypes) =>
		partes.find((p) => p.type === tipo)?.value ?? '';

	return `${pegar('day')} ${pegar('month').replace('.', '')} ${pegar('year')}`;
}