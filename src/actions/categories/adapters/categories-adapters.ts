import { format } from "@/lib/format-date";
import type { ICategories, ICategoriesAPI } from "@/interfaces/models/categorie.interface";

// Adapter para mapear datos de una categoría recibidos desde la API.
export const categoriesFromAPI = (categorie: any): ICategories => ({
    id: categorie.id,
    name: categorie.name,
    created: format(categorie.created),
    updated: format(categorie.updated),
});

// Adapter para mapear datos de una categoría que se va a enviar a la API.
export const categoriesFormatAPI = (categorie: any): ICategoriesAPI => ({
    name: categorie.name,
});
