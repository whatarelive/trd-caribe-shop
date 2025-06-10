// Estructura general del modelo de categorías
export interface Categorie {
    id: number;
    name: string;
    created: string;
    updated: string;
}

// Estructura del objeto de la petición de listar categorías desde la API.
export type CategoriesResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: Categories[];
}