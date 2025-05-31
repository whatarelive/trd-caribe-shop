'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";


export async function deleteComplaints(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }

        await service.delete(`/store/complaints-suggestions/${id}/`, {
            error: "Fallo la eliminación del comentario",
        });

        revalidateTag("complaints-data");

        return {
            result: true,
            message: "Comentario eliminado exitosamente",
        };
        
    } catch (error) {
        console.error("Error en DeleteComplaints", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido" 
        };
    }
}