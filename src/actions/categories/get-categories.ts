"use server"

import { unstable_cache } from "next/cache";
import { backend } from "@/config/api";
import { CategoriesResponse } from "@/interfaces/models/categorie.interface";


export const getCategories = unstable_cache(
    async () => {
        const { data } = await backend.get<CategoriesResponse>("/store/categories/");
        return { data: data.results };
    },

    // Clave única para esta consulta.
    ["all-categories"],
    // Opciones de caché con etiquetas.
    { tags: ["categories-data"] },    
);
