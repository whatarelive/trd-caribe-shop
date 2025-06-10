'use server'

import { revalidatePath } from "next/cache";
import { service } from "@/config/api";
import { CkeckoutSaleSckema } from "@/actions/cart/validation/cart-schema";
import { BadRequestException, HttpException } from "@/lib/error-adapter";


export async function checkoutCartSale(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());
    const { data, success } = await CkeckoutSaleSckema.safeParseAsync(fields);

    try {
        if (!success) throw new BadRequestException("Método de pago incorrecto");

        await service.post("/sales/cart/checkout/", 
            { payment_method: data.method }, 
            {
                isProtected: true,
                error: "Fallo la confirmación de la compra",  
            },
        );

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