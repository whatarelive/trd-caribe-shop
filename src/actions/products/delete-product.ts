'use server'

import { revalidateTag } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";


export async function deleteProduct(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");
        
        const session = await auth();
        
        if (!session || !session.accessToken || !session.user?.isAdmin) {
            throw new Error("Usuario no Autorizado");
        }

        await backend.delete(`/store/products/delete/${id}/`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        
        revalidateTag("products-data");
        
        return {
            result: true,
            message: "Producto eliminado",
        };

    } catch (error) {
        console.error("Error en DeleteProduct", error);
        
        let message = "Error desconocido";
        
        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la eliminación del producto";

        return { result: false, message };
    }
}