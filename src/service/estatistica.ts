import type { Estatisticas } from "@/types/estatistica";
import { estatisticasMock } from "@/data/estatistica";

export async function buscarEstatistica() {
	return estatisticasMock;
}