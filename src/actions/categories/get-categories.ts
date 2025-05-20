"use server"

import { API_URL } from "@/config/constants";
import type { CategoriesResponse } from "@/interfaces/models/categorie.interface";


export async function getCategories() {
    try {
        const response = await fetch(`${API_URL}/store/categories/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            next: {
                revalidate: 900,
                tags: ["categories-data"],
            }
        });

        if (!response.ok) {
            throw new Error("Fallo la carga de las categorías", { cause: "Fetch Error" });
        }

        const data: CategoriesResponse = await response.json();

        return { data: data.results };

    } catch (error) {
        return {
            error: (error as Error).cause === "Fetch Error" 
                ? (error as Error).message 
                : "Error de conexión"
        }
    }
}
