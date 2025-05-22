'use server'

import { revalidatePath } from "next/cache";
import { isAxiosError } from "axios";
import { auth } from "@/auth.config";
import { backend } from "@/config/api";
import { AddCartSchema } from "@/actions/cart/validation/cart-schema";


interface ProductInfo {
    id: number;
    quantity: number;
}

export async function addCart(data: ProductInfo) {
    const session = await auth();
    
    try {
        if (!session || !session.accessToken) throw new Error("Usuario no autorizado");
        
        const validation = await AddCartSchema.safeParseAsync(data);

        if (!validation.success) throw new Error("Información incorrecta");
        
        const { id, quantity } = validation.data;

        await backend.post(`/sales/car/add/${id}/`, { quantity }, {
            headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        revalidatePath("/shop/cart/");

        return {
            result: true,
            message: "Producto agregado al carrito",
        };
        
    } catch (error) {
        console.error("Error en AddCart", error);
        
        let message = "Error desconocido";

        if (error instanceof Error) message = error.message;
        if (isAxiosError(error)) message = "Fallo al agregar el producto al carrito";

        return { result: true, message };
    }
}