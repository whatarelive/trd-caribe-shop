'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import type { IFilters } from "@/interfaces/components";
import type { PromotionsResponse } from "@/interfaces/models/promotions.interface";


export async function getPromotions(params: IFilters) {
    try {
        const response = await service.getAll<PromotionsResponse>(
            "/store/discounts", params, 
            {
                isProtected: true,
                error: "Fallo la carga de las promociones",
                cache: "force-cache",
                next: {
                    revalidate: 900,
                    tags: ["promotions-data"],
                },
            }
        );

        return { 
            result: true, 
            count: response.count,
            data: response.results, 
        };
    
    } catch (error) {
        console.error("Error en GetPromotions", error);

        return {
            result: false,
            error: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}
