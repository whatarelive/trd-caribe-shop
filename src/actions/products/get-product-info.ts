'use server'

import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import type { IPromotionsAPI } from "@/interfaces/models/promotions.interface";


export async function getProductsInfo(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }

        const response = await service.getById<IPromotionsAPI>(
            `/store/products/${id}/`, 
            {
                isProtected: false,
                error: "Fallo la carga del producto",
            }
        );

        return { 
            result: true, 
            data: response, 
        };
        
    } catch (error) {
        console.error("Error en GetProductsInfo", error);

        return { 
            result: false, 
            error: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}