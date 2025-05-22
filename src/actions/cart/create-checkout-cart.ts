'use client'

import { revalidatePath } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";


export async function checkoutCartSale() {
    const session = await auth();

    try {
        if (!session || !session.accessToken) throw new Error("Usuario no autorizado");
        
        await backend.post("/sales/cart/checkout/", undefined, {
            headers: { Authorization: `Bearer ${session.accessToken}` },  
        });

        revalidatePath("/shop/cart");

        return {
            result: true,
            message: "Compra realizada",
        };
        
    } catch (error) {
        console.error("Error en CheckoutCartSale", error);
        
        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la confirmación de la compra";
        
        return { result: false, message };
    }
}