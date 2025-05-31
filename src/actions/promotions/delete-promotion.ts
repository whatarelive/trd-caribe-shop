'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";


export async function deletePromotion(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }
        
        await service.delete(`/store/discounts/delete/${id}`, {
            error: "Fallo la eliminación de la promoción",
        });
        
        revalidateTag("promotions-data");
        
        return {
            result: true,
            message: "Promoción eliminada",
        };

    } catch (error) {
        console.error("Error en DeletePromotion", error);
        
        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}