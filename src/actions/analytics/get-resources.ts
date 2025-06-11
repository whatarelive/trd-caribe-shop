'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import { resourceFromApi } from "@/actions/analytics/adapters/analytics-adapters";
import type { ResourceSummaryFromAPI } from "@/interfaces/models/analytics.interface";


export async function getResourceSummary() {
    try {
        const response = await service.getAll<ResourceSummaryFromAPI>(
            "/analytics/resource-summary/", null, 
            {
                isProtected: true,
                error: "Fallo la carga de las estadisticas de las ventas",
            }
        )

        return {
            result: true,
            data: resourceFromApi(response),
        };

    } catch (error) {
        console.error("Error en GetResourceSummary", error);
        
        return { 
            result: false, 
            error: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}