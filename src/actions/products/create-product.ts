'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { productFormatAPI } from "@/actions/products/adapters/product-adapters";
import { CreateProductSchema } from "@/actions/products/validations/products-schema";


export async function createProduct(formData: FormData) {
    const fields = Object.fromEntries(formData.entries());       
    const { data, success } = await CreateProductSchema.safeParseAsync(fields);
    
    try {    
        if (!success) throw new BadRequestException();
 
        await service.post("/store/products/", 
            productFormatAPI(data), 
            {
                isProtected: true,
                error: "Fallo la creación del producto",
            }
        );

        revalidateTag("products-data");

        return {
            result: true,
            message: "Producto creado exitosamente",
        };
        
    } catch (error) {
        console.error("Error en CreateProduct", error);

        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido",  
        };
    }    
}