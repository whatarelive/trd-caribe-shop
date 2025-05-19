"use server"

import { revalidatePath } from "next/cache";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";


export async function deletePromotion(id: number) {
    const session = await auth();

    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unatorized User 401" });
        }

        await backend.delete(`/store/discounts/delete/${id}/`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
        
    } catch (error) {
        const message = (error as Error).cause !== "Unatorized User 401" 
            ? "Fallo la eliminación de la promoción"
            : (error as Error).message;

        return { result: false, message };
    }

    revalidatePath("/admin/promotions");

    return {
        result: true,
        message: "Promoción eliminada exitosamente",
    };
}