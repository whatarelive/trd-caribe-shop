'use server'

import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import type { ISalesDetail } from "@/interfaces/models/sales.interface";


export async function getSaleInfo(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }

        const response = await service.getById<ISalesDetail>(`/sales/detail/${id}`, { 
            isProtected: true,
            error: "Fallo la carga de los detalles de la venta"
        });
    
        return { 
            result: true, 
            data: response, 
        };        
        
    } catch (error) {
        console.error("Error en GetSalesInfo", error);

        return {
            result: false,
            error: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}