'use server'

import { revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { UpdateProductSchema } from "@/actions/products/validations/products-schema";
import { productFormatAPI } from "@/actions/products/adapters/product-adapters";


export async function updateProduct(id: number, formData: FormData) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }

        const fields = Object.fromEntries(formData.entries());
        const { data, success } = await UpdateProductSchema.safeParseAsync(fields);
        
        if (!success) throw new BadRequestException();

        await service.update(`/store/products/update/${id}`, 
            productFormatAPI(data), 
            { error: "Fallo la actualización del producto" }
        );

        revalidateTag("products-data");

        return {
            result: true,
            message: "Producto actualizado",
        };
        
    } catch (error) {
        console.error("Error en UpdateProduct", error);
        
        return { 
            result: false, 
            message: (error instanceof HttpException) ? error.message : "Error desconocido", 
        };
    }
}