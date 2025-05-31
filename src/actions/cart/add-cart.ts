'use server'

import { revalidatePath } from "next/cache";
import { service } from "@/config/api";
import { AddCartSchema } from "@/actions/cart/validation/cart-schema";
import { BadRequestException, HttpException } from "@/lib/error-adapter";

interface ProductInfo {
    id: number;
    quantity: number;
}

export async function addCart(formData: ProductInfo) {    
    const { data, success } = await AddCartSchema.safeParseAsync(formData);
    
    try {    
        if (!success) throw new BadRequestException();
        
        await service.post(`/sales/car/add/${data.id}/`, 
            { quantity: data.quantity }, 
            {
                isProtected: true,
                error: "Fallo al agregar el producto al carrito",
            }
        );

        revalidatePath("/shop/cart/");

        return {
            result: true,
            message: "Producto agregado al carrito",
        };
        
    } catch (error) {
        console.error("Error en AddCart", error);
        
        return { 
            result: true, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}