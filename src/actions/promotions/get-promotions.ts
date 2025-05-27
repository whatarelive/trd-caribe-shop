'use server'

import { auth } from "@/auth.config";
import { API_URL } from "@/config/constants";
import type { IFilters } from "@/interfaces/components";
import type { PromotionsResponse } from "@/interfaces/models/promotions.interface";


export async function getPromotions({ page, limit, search }: IFilters) {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        }

        const params = new URLSearchParams({
            limit: limit.toString(),
            offset: ((page - 1) * limit).toString(),
            ...(search && { search }),
        });

        const response = await fetch(`${API_URL}/store/discounts?${params}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 900,
                tags: ["promotions-data"],
            }
        });

        if (!response.ok) throw new Error("Error en el servidor");

        const data: PromotionsResponse = await response.json();

        return {
            result: true,
            count: data.count,
            data: data.results,
        };

    } catch (error) {
        console.error("Error en GetPromotions", error);

        return {
            result: false,
            error: (error instanceof Error) ? error.message : "Fallo la carga de las promociones",
        }
    }
}