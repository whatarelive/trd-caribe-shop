'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { UpdateComplaintsSchema } from "./validation/complaints-suggestions-schema";


export async function updateComplaints(id: number, formData: FormData) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        } 
        
        const fields = Object.fromEntries(formData.entries());
        const { data, success } = await UpdateComplaintsSchema.safeParseAsync(fields);
    
        if (!success) throw new BadRequestException();
        
        await service.update(`/store/complaints-suggestions/${id}/`, data, {
            error: "Fallo la edición del comentario",
        });

        revalidateTag("complaints-data");

        return {
            result: true,
            message: "Comentario editado",
        };

    } catch (error) {
        console.error("Error en UpdateComplaints", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconcocido", 
        };
    }
}