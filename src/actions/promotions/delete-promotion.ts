'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";


export async function deletePromotion(id: number) {
    const session = await auth();

    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        }

        await backend.delete(`/store/discounts/delete/${id}/`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        
        revalidateTag("promotions-data");
        
        return {
            result: true,
            message: "Promoción eliminada",
        };

    } catch (error) {
        console.log("Error en DeletePromotion", error);
        
        let message = "Error desconocido";
        
        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la eliminación de la promoción";

        return { result: false, message };
    }
}