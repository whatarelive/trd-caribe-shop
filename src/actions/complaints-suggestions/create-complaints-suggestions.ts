'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { CreateComplaintsSchema } from "./validation/complaints-suggestions-schema";


export async function createComplaints(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());
    const { data, success } = await CreateComplaintsSchema.safeParseAsync(fields);

    try {
        if (!success) throw new BadRequestException();
    
        await service.post("/store/complaints-suggestions/create/", 
            { ...data, active: true }, 
            { 
                isProtected: true,
                error: "Fallo la publicación del comentario",
            },
        );

        revalidateTag("complaints-data");

        return {
            result: true,
            message: "Comentario publicado",
        };

    } catch (error) {
        console.error("Error en CreateComplaints", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}