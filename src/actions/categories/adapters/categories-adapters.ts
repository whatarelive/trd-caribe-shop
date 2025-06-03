import { format } from "@/lib/format-date";
import type { ICategories } from "@/interfaces/models/categorie.interface";

// Adapter para mapear datos de una categoría recibidos desde la API.
export const categoriesFromAPI = (categorie: any): ICategories => ({
    id: categorie.id,
    name: categorie.name,
    created: format(categorie.created),
    updated: format(categorie.updated),
});
