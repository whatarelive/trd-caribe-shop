'use server'

import { isAxiosError } from "axios";
import { auth } from "@/auth.config"
import { backend } from "@/config/api";
import type { IPromotions } from "@/interfaces/models/promotions.interface";


export async function getPromotionInfo(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");
        
        const session = await auth();

        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        }

        const { data } = await backend.get<IPromotions>(`/store/discounts/${id}/`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        return { result: true, data };
        
    } catch (error) {
        console.error("Error en GetPromotions", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message; 
        if (isAxiosError(error)) message = "Fallo la carga de la promoción";
        
        return { result: false, error: message };
    }
}