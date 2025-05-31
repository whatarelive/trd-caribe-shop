'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import type { IFilters } from "@/interfaces/components";
import type { ProductResponse } from "@/interfaces/models/product.interface";


export async function getProducts(params: IFilters) {
    try {
        const response = await service.getAll<ProductResponse>(
            `/store/products/`, params, 
            {
                isProtected: false,
                error: "Fallo la carga de los productos",
                cache: "force-cache",
                next: {
                    revalidate: 900,
                    tags: ["products-data"],
                }
            }
        );

        return {
            result: true,
            count: response.count,
            results: response.results,
        };
        
    } catch (error) {
        console.error("Error en GetProducts", error);

        return { 
            result: false, 
            error: (error instanceof HttpException) ? error.message : "Error desconocido",
        };   
    }
}