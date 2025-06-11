'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import { saleFromAPI } from "@/actions/sales/adapter/sales-adapters";
import type { IFilters } from "@/interfaces/components";
import type { SaleFromAPI } from "@/interfaces/models/sales.interface";


export async function getSalesUser(params: IFilters) {
    try {
        const response = await service.getAll<SaleFromAPI[]>(
            "/sales/list", params, 
            {
                isProtected: true,
                error: "Fallo la carga de las ventas del usuario",
                cache: "no-store",
            }
        );

        return {
            result: true,
            count: response.length,
            data: response.map(saleFromAPI),
        };

    } catch (error) {
        console.error("Error en GetSalesUser", error);
        
        return {
            result: false,
            error: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}