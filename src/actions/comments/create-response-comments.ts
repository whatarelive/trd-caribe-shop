'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { responseFormatAPI } from "@/actions/comments/adapters/comments-adapters";
import { CreateResponseSchema } from "@/actions/comments/validation/comments-schema";


export async function createResponseComments(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());
    const { data, success } = await CreateResponseSchema.safeParseAsync(fields);
    
    try {
        if (!success) throw new BadRequestException();
        
        await service.post("/store/complaints-suggestions/response/", 
            responseFormatAPI(data), 
            {
                isProtected: true,
                error: "Fallo el envio de la respuesta del comentario",
            }
        );

        revalidateTag("comments-data");

        return {
            result: true,
            message: "Respuesta del comentario enviada",
        };

    } catch (error) {
        console.error("Error en CreateResponseComments", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}