'use server'

import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { saleDetailFromAPI } from "@/actions/sales/adapter/sales-adapters";
import type { SaleDetailFromAPI } from "@/interfaces/models/sales.interface";


export async function getSaleInfo(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }

        const response = await service.getById<SaleDetailFromAPI>(
            `/sales/detail/${id}`, 
            { 
                isProtected: true,
                error: "Fallo la carga de los detalles de la venta"
            }
        );
    
        return { 
            result: true, 
            data: saleDetailFromAPI(response), 
        };        
        
    } catch (error) {
        console.error("Error en GetSalesInfo", error);

        return {
            result: false,
            error: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}