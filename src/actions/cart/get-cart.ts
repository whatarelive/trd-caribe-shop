'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import { cartFromAPI } from "@/actions/cart/adapters/cart-adapters";
import type { CartFromAPI } from "@/interfaces/models/cart.interace";


export async function getCart() {
    try {
        const response = await service.getAll<CartFromAPI>(
            "/sales/cart/", null, 
            {
                isProtected: true,
                error: "Fallo la carga del carrito",
            },
        );

        return { 
            result: true,
            data: cartFromAPI(response),
        };
        
    } catch (error) {
        console.error("Error en GetCart", error);
        
        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconcocido",
        };
    }
}