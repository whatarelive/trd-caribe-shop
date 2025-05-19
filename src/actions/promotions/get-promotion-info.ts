"use server"

import { auth } from "@/auth.config"
import { backend } from "@/config/api";
import type { IPromotions } from "@/interfaces/models/promotions.interface";


export async function getPromotionInfo(id: number) {
    const session = await auth();

    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unatorized User 401" });
        }

        const { data } = await backend.get<IPromotions>(
            `/store/discounts/${id}/`, 
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                }
            }
        );

        return { data };
        
    } catch (error) {
        return {
            error: (error as Error).cause !== "Unatorized User 401" 
                ? "Fallo la carga de la promoción" 
                : (error as Error).cause,
        }
    }
}