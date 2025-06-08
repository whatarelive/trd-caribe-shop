import { format } from "@/lib/format-date";
import type { Categorie } from "@/interfaces/models/categorie.interface";

// Adapter para mapear datos de una categoría recibidos desde la API.
export const categoriesFromAPI = (categorie: Categorie): Categorie => ({
    id: categorie.id,
    name: categorie.name,
    created: format(categorie.created),
    updated: format(categorie.updated),
});
