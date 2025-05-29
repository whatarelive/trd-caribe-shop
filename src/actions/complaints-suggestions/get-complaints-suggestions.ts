'use server'

import { auth } from "@/auth.config";
import { API_URL } from "@/config/constants";
import type { IFilters } from "@/interfaces/components";
import type { ComplaintsResponse } from "@/interfaces/models/complaints-suggestions.interface";


export async function getComplaints({ limit, page, search, ordering }: IFilters) {
    const session = await auth();

    try {
        if (!session || !session.accessToken) throw new Error("Usuario no Autorizado");

        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: ((page - 1) * limit).toString(),
            ...(search && { search }),
            ...(ordering && { ordering }),
        })

        const response = await fetch(`${API_URL}/store/complaints-suggestions?${params}`, {
            method: "GET",
            cache: "force-cache",
            headers: { 'Authorization': `Bearer ${session.accessToken}` },
            next: {
                revalidate: 900,
                tags: ["complaints-data"],
            }
        });

        if (!response.ok) throw new Error("Fallo la carga de los comentarios");

        const data: ComplaintsResponse = await response.json();

        return {
            result: true,
            count: data.count,
            data: data.results,
        };

    } catch (error) {
        console.error("Error en GetComplaints", error);

        return { 
            result: false, 
            error: (error instanceof Error) ? error.message : "Error desconocido", 
        };
    }   
}