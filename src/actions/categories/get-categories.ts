'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import type { CategoriesResponse } from "@/interfaces/models/categorie.interface";


export async function getCategories() {
    try {
        const response = await service.getAll<CategoriesResponse>(
            `/store/categories/`, null,
            {
                isProtected: false,
                error: "Fallo la carga de las categorías",
                cache: "force-cache",
                next: {
                    revalidate: 900,
                    tags: ["categories-data"],
                }
            }
        );

        return { 
            result: true, 
            data: response.results,
        };

    } catch (error) {
        console.error("Error en GetCategories", error);

        return { 
            result: false, 
            error: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}
