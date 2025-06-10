'use server'

import { revalidatePath } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";


export async function removeFromCart(id: number) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }

        await service.delete(`/sales/cart/delete/${id}/`, {
            error: "Fallo la eliminación del producto del carrito",    
        });

        revalidatePath("/shop/cart/");

        return {
            result: true,
            message: "Producto eliminado del carrito",
        };
        
    } catch (error) {
        console.error("Error en RemoveFromCart", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconcocido", 
        };
    }
}