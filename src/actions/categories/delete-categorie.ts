'use server'

import { revalidatePath, revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";


export async function deleteCategorie(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");
        
        const session = await auth();    

        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        }

        await backend.delete(`/store/categories/delete/${id}/`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        
        revalidateTag("categories-data");
        revalidatePath("/admin/products/");
    
        return {
            result: true,
            message: "Categoría eliminada",
        };

    } catch (error) {
        console.error("Error en DeleteCategorie", error);
        
        let message = "Error desconocido"; 
        
        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la eliminación de la categoría";

        return { result: false, message };
    }   
}