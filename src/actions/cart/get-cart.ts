'use server'

import { isAxiosError } from "axios";
import { auth } from "@/auth.config"
import { backend } from "@/config/api";
import { CartResponse } from "@/interfaces/models/cart.interace";


export async function getCart() {
    const session = await auth();

    try {
        if (!session || !session.accessToken) throw new Error("Usuario no autorizado");

        const { data } = await backend.get<CartResponse>("/sales/cart/", {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        return { 
            result: true,
            count: data.count,
            data: data.results,
        }
        
    } catch (error) {
        console.error("Error en GetCart", error);
        
        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo la carga del carrito";
        
        return { result: false, message };
    }
}