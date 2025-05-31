'use client'

import { revalidatePath } from "next/cache";
import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";


export async function checkoutCartSale() {
    try {
        await service.post("/sales/cart/checkout/", undefined, {
            isProtected: true,
            error: "Fallo la confirmación de la compra",  
        });

        revalidatePath("/shop/cart");

        return {
            result: true,
            message: "Compra realizada",
        };
        
    } catch (error) {
        console.error("Error en CheckoutCartSale", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido",
        };
    }
}