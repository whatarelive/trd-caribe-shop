'use server'

import { service } from "@/config/api";
import { HttpException } from "@/lib/error-adapter";
import { cartFromAPI } from "@/actions/cart/adapters/cart-adapters";
import type { CartResponse } from "@/interfaces/models/cart.interace";


export async function getCart() {
    try {
        const response = await service.getAll<CartResponse>(
            "/sales/cart/", null, 
            {
                isProtected: true,
                error: "Fallo la carga del carrito",
            },
        );

        return { 
            result: true,
            count: response.count,
            data: response.results.map(cartFromAPI),
        };
        
    } catch (error) {
        console.error("Error en GetCart", error);
        
        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconcocido",
        };
    }
}