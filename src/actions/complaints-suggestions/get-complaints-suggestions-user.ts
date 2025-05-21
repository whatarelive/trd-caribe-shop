'use server'

import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import type { ComplaintsResponse } from "@/interfaces/models/complaints-suggestions.interface";

interface Props {
    limit: number;
    page: number;
    search?: string;
}

export async function getComplaintsUser({ limit, page, search }: Props) {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken) throw new Error("Usuario no Autorizado");
        
        const searchParams = {
            limit: limit.toString(),
            offset: ((page - 1) * limit).toString(),
            ...(search && { search }),
        };

        const { data } = await backend.get<ComplaintsResponse>(`/store/complaints-suggestions/user`, {
            params: searchParams,
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        return {
            result: true,
            count: data.count,
            data: data.results,
        };

    } catch (error) {
        console.error("Error en GetComplaintsUser", error);

        let message = "Error desconocido";
        
        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la carga de los comentarios del usuario";
        
        return { result: false, error: message };
    }   
}