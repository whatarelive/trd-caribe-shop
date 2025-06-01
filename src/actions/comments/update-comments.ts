'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { commentsFormatAPI } from "@/actions/comments/adapters/comments-adapters";
import { UpdateCommentsSchema } from "@/actions/comments/validation/comments-schema";


export async function updateComments(id: number, formData: FormData) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        } 
        
        const fields = Object.fromEntries(formData.entries());
        const { data, success } = await UpdateCommentsSchema.safeParseAsync(fields);
    
        if (!success) throw new BadRequestException();
        
        await service.update(`/store/complaints-suggestions/${id}/`, 
            commentsFormatAPI(data), 
            { error: "Fallo la edición del comentario" },
        );

        revalidateTag("comments-data");

        return {
            result: true,
            message: "Comentario editado",
        };

    } catch (error) {
        console.error("Error en UpdateComments", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconcocido", 
        };
    }
}