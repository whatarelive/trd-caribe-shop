'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";


export async function deleteProduct(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }

        await service.delete(`/store/products/delete/${id}/`, {
            error: "Fallo la eliminación del producto",
        });
        
        revalidateTag("products-data");
        
        return {
            result: true,
            message: "Producto eliminado",
        };

    } catch (error) {
        console.error("Error en DeleteProduct", error);
        
        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}