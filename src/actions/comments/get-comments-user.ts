'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import { commentsFromAPI } from "@/actions/comments/adapters/comments-adapters";
import type { IFilters } from "@/interfaces/components";
import type { CommentsResponse } from "@/interfaces/models/comments.interface";


export async function getCommentsUser(params: IFilters) {
    try {
        const response = await service.getAll<CommentsResponse>(
            "/store/complaints-suggestions/user/", params,
            {
                isProtected: true,
                error: "Fallo la carga de los comentarios del usuario",
                cache: "no-store",
            }
        );

        return {
            result: true,
            count: response.count,
            data: response.results.map(commentsFromAPI),
        };

    } catch (error) {
        console.error("Error en GetCommentsUser", error);

        return { 
            result: false, 
            error: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }   
}