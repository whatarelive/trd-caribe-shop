'use server'

import { revalidatePath } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";


export async function removeFromCart(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) throw new Error("ID invalido");
        
        const session = await auth();
        
        if (!session || !session.accessToken) throw new Error("Usuario no Autorizado");

        await backend.delete(`/sales/car/delete/${id}/`, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        revalidatePath("/shop/cart/");

        return {
            result: true,
            message: "Producto eliminado del carrito",
        };
        
    } catch (error) {
        console.error("Error en RemoveFromCart", error);

        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la eliminación del producto del carrito";

        return { result: false, message };
    }
}