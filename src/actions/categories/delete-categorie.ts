"use server"

import { revalidatePath, revalidateTag } from "next/cache";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";


export async function deleteCategorie(id: number) {
    const session = await auth();    

    try {
        if (!session || !session.user || !session.user.isAdmin) {
            throw new Error("Usuario no Autorizado", { cause: "Unatorized User 401" });
        }

        await backend.delete(`/store/categories/delete/${id}/`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
                
    } catch (error) {
        const message = (error as Error).cause !== "Unatorized User 401" 
            ? "Fallo la eliminación de la categoría"
            : (error as Error).message;

        return { result: false, message };
    }
    
    revalidateTag("categories-data");
    revalidatePath("/admin/products/");

    return {
        result: true,
        message: "Categoría eliminada exitosamente",
    };
}