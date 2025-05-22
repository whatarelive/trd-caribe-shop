'use server'

import type { ProductResponse } from "@/interfaces/models/product.interface";

interface Props {
    limit: number;
    page: number;
    search?: string;
}

export async function getProducts({ limit, page, search }: Props) {
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: ((page - 1) * limit).toString(),
        ...(search && { search }),
    });

    try {
        const response = await fetch(`/store/products?${params}`, {
            method: "GET",
            cache: "force-cache",
            next: {
                revalidate: 900,
                tags: ["products-data"],
            }
        });

        if (!response.ok) throw new Error("Error en el servidor");

        const data: ProductResponse = await response.json();

        return {
            result: true,
            count: data.count,
            results: data.results,
        };
        
    } catch (error) {
        console.error("Error en GetProducts", error);

        return { 
            result: false, 
            error: (error instanceof Error) ? error.message : "Fallo la carga de los productos",
        };   
    }
}