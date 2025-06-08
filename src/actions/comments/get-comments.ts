'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import { commentsFromAPI } from "@/actions/comments/adapters/comments-adapters";
import type { IFilters } from "@/interfaces/components";
import type { CommentsResponse } from "@/interfaces/models/comments.interface";


export async function getComments(params: IFilters) {
    try {
        const response = await service.getAll<CommentsResponse>(
            "/store/complaints-suggestions", params, 
            {
                isProtected: false,
                error: "Fallo la carga de los comentarios",
                cache: "force-cache",
                next: {
                    revalidate: 900,
                    tags: ["comments-data"],
                }
            }
        );

        return {
            result: true,
            count: response.count,
            data: response.results.map(commentsFromAPI),
        };

    } catch (error) {
        console.error("Error en GetComments", error);

        return { 
            result: false, 
            error: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }   
}