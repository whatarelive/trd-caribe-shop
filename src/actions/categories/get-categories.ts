'use server'

import { API_URL } from "@/config/constants";
import type { CategoriesResponse } from "@/interfaces/models/categorie.interface";


export async function getCategories() {
    try {
        const response = await fetch(`${API_URL}/store/categories/`, {
            method: "GET",
            cache: "force-cache",
            next: {
                revalidate: 900,
                tags: ["categories-data"],
            }
        });

        if (!response.ok) throw new Error("Fallo la carga de las categorías");

        const data: CategoriesResponse = await response.json();

        return { 
            result: true, 
            data: data.results,
        };

    } catch (error) {
        console.error("Error en GetCategories", error);

        return { 
            result: false, 
            error: (error instanceof Error) ? error.message : "Error desconocido", 
        };
    }
}
