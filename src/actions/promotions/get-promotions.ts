"use server"

import { auth } from "@/auth.config";
import type { PromotionsResponse } from "@/interfaces/models/promotions.interface";

interface Props {
    page: number;
    limit: number;
    search?: string;
}

export async function getPromotions({ page, limit, search }: Props) {
    const url = search ? `&search=${search}` : "";
    const session = await auth();

    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unatorized User 401" });
        }

        const response = await fetch(`/store/discounts?limit=${limit}&offset=${page}${url}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${session.accessToken}`,
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 15,
            }
        });

        const data: PromotionsResponse = await response.json();

        return {
            count: data.count,
            results: data.results,
        };

    } catch (error) {
        return {
            error: (error as Error).cause !== "Unatorized User 401" 
                ? "Fallo la carga de las promociones" 
                : (error as Error).message,
        }
    }
}