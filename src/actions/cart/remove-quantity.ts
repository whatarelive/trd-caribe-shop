'use server'

import { revalidatePath } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { AddCartSchema } from "@/actions/cart/validation/cart-schema";
import { productAddFormatAPI } from "@/actions/cart/adapters/cart-adapters";

interface ProductInfo {
    id: number;
    quantity: number;
}

export async function removeQuantity(formData: ProductInfo) {    
    const { data, success } = await AddCartSchema.safeParseAsync(formData);
    
    try {    
        if (!success) throw new BadRequestException();
        
        await service.post(`/sales/cart/remove-quantity/${data.id}/`,
            productAddFormatAPI(data), 
            {
                isProtected: true,
                error: "Fallo al disminuir la cantidad del producto",
            }
        );

        revalidatePath("/shop/cart/");

        return {
            result: true,
            message: "Cantidad disminuida",
        };
        
    } catch (error) {
        console.error("Error en RemoveQuantity", error);
        
        return { 
            result: true, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}