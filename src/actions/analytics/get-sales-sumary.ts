'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import { saleMonthFromApi } from "@/actions/analytics/adapters/analytics-adapters";
import type { SaleMonth } from "@/interfaces/models/analytics.interface";


export async function getSalesSummary() {
    try {
        const response = await service.getAll<SaleMonth[]>(
            "/analytics/sales-summary-by-month/", null, 
            {
                isProtected: true,
                error: "Fallo la carga de las estadisticas",
            }
        )

        return {
            result: true,
            data: response.map(saleMonthFromApi),
        };

    } catch (error) {
        console.error("Error en GetSalesSummary", error);
        
        return { 
            result: false, 
            error: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}