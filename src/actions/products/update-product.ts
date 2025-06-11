'use server'

import { revalidatePath, revalidateTag } from "next/cache";
import { service } from "@/config/api";
import { BadRequestException, HttpException } from "@/lib/error-adapter";
import { UpdateProductSchema } from "@/actions/products/validations/products-schema";
import { productJsonFormatAPI } from "@/actions/products/adapters/product-adapters";


export async function updateProduct(id: number, formData: FormData) {
    try {
        if (typeof id !== "number" || id <= 0) {
            throw new BadRequestException("ID invalido");
        }

        const fields = Object.fromEntries(formData.entries());
        const { data, success } = await UpdateProductSchema.safeParseAsync(fields);
        
        if (!success) throw new BadRequestException();

        await service.update(`/store/products/update/${id}`, 
            productJsonFormatAPI(data), 
            { error: "Fallo la actualización del producto" }
        );

        revalidateTag("products-data");
        revalidatePath(`/admin/products/${id}/`);

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