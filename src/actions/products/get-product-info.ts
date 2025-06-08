'use server'

import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { productFromAPI } from "@/actions/products/adapters/product-adapters";
import type { ProductFromAPI } from "@/interfaces/models/product.interface";


export async function getProductsInfo(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }

        const response = await service.getById<ProductFromAPI>(
            `/store/products/${id}/`, 
            {
                isProtected: false,
                error: "Fallo la carga del producto",
            }
        );

        return { 
            result: true, 
            data: productFromAPI(response), 
        };
        
    } catch (error) {
        console.error("Error en GetProductsInfo", error);

        return { 
            result: false, 
            error: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}