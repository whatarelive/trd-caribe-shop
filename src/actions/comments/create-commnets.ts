'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { commentsFormatAPI } from "@/actions/comments/adapters/comments-adapters";
import { CreateCommentsSchema } from "@/actions/comments/validation/comments-schema";


export async function createComments(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());
    const { data, success } = await CreateCommentsSchema.safeParseAsync(fields);

    try {
        if (!success) throw new BadRequestException();
    
        await service.post("/store/complaints-suggestions/create/", 
            commentsFormatAPI({ ...data, active: true }), 
            { 
                isProtected: true,
                error: "Fallo la publicación del comentario",
            },
        );

        revalidateTag("comments-data");

        return {
            result: true,
            message: "Comentario publicado",
        };

    } catch (error) {
        console.error("Error en CreateComments", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}