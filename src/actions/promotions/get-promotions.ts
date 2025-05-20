"use server"

import { auth } from "@/auth.config";
import type { PromotionsResponse } from "@/interfaces/models/promotions.interface";

interface Props {
    page: number;
    limit: number;
    search?: string;
}

export async function getPromotions({ page, limit, search }: Props) {
    const session = await auth();
    
    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unauthorized_Access" });
        }

        const url = search ? `&search=${search}` : "";
        const offset = (page - 1) * limit;

        const response = await fetch(`/store/discounts?limit=${limit}&offset=${offset}${url}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`,
            },
            cache: "no-store",
            next: {
                revalidate: 900,
                tags: ["promotions-data"],
            }
        });

        const data: PromotionsResponse = await response.json();

        return {
            count: data.count,
            results: data.results,
        };

    } catch (error) {
        return {
            error: (error as Error).cause !== "Unauthorized_Access" 
                ? "Fallo la carga de las promociones" 
                : (error as Error).message,
        }
    }
}