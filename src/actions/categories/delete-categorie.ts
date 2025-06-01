'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";


export async function deleteCategorie(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }
        
        await service.delete(`/store/categories/delete/${id}/`, {
            error: "Fallo la eliminación de la categoría",
        });
        
        revalidateTag("categories-data");
        revalidateTag("products-data");
    
        return {
            result: true,
            message: "Categoría eliminada",
        };

    } catch (error) {
        console.error("Error en DeleteCategorie", error);
        
        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconcocido",
        };
    }   
}