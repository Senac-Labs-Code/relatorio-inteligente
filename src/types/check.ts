export interface FiltroCheck {
    id: string;
    texto: string;
    total: number;
}

export interface GrupoFiltroCheck {
    id: string;
    texto: string;
    itens: FiltroCheck[];
}