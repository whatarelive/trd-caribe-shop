'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import { saleFromAPI } from "@/actions/sales/adapter/sales-adapters";
import type { IFilters } from "@/interfaces/components";
import type { SalesResponse } from "@/interfaces/models/sales.interface";


export async function getSales(params: IFilters) {
    try {
        const response = await service.getAll<SalesResponse>(
            "/sales/list", params, 
            {
                isProtected: true,
                error: "Fallo la carga de las ventas",
                cache: "force-cache",
                next: {
                    revalidate: 900,
                    tags: ["sales-data"],
                }
            }
        );

        return {
            result: true,
            count: response.count,
            data: response.results.map(saleFromAPI),
        };

    } catch (error) {
        console.error("Error en GetSales", error);
        
        return {
            result: false,
            error: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}