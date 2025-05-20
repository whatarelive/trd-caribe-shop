"use server"

import { auth } from "@/auth.config"
import { API_URL } from "@/config/constants";
import type { IPromotions } from "@/interfaces/models/promotions.interface";


export async function getPromotionInfo(id: number) {
    const session = await auth();

    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unauthorized_Access" });
        }

        const response = await fetch(`${API_URL}/store/discounts/${id}/`, {
            headers: {
                'Content-type': 'application/json',
                'Autorization': `Bearer ${session.accessToken}`
            },
            cache: "no-store",
            next: {
                revalidate: 86400, // 24 horas en cache
                tags: [`promotion-detail-${id}`],
            }
        });

        const data: IPromotions = await response.json();

        return { data };
        
    } catch (error) {
        return {
            error: (error as Error).cause !== "Unauthorized_Access" 
                ? "Fallo la carga de la promoción" 
                : (error as Error).cause,
        }
    }
}