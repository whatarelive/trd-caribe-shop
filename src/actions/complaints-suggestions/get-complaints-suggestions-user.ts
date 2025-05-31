'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import type { IFilters } from "@/interfaces/components";
import type { ComplaintsResponse } from "@/interfaces/models/complaints-suggestions.interface";


export async function getComplaintsUser(params: IFilters) {
    try {
        const response = await service.getAll<ComplaintsResponse>(
            `/store/complaints-suggestions/user/`, params,
            {
                isProtected: true,
                error: "Fallo la carga de los comentarios del usuario",
                cache: "no-store",
            }
        );

        return {
            result: true,
            count: response.count,
            data: response.results,
        };

    } catch (error) {
        console.error("Error en GetComplaintsUser", error);

        return { 
            result: false, 
            error: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }   
}